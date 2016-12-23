import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'handle-callback-err';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'enforce error handling in callbacks',
    rationale: Lint.Utils.dedent`
      In Node.js, a common pattern for dealing with asynchronous behavior is called the callback
      pattern. This pattern expects an Error object or null as the first argument of the callback.
      Forgetting to handle these errors can lead to some really strange behavior in your
      application.
      `,
    optionsDescription: Lint.Utils.dedent`
      The rule takes a string option: the name of the error parameter. The default is
      \`"err"\`.
      
      Sometimes the name of the error variable is not consistent across the project, so you need a
      more flexible configuration to ensure that the rule reports all unhandled errors.

      If the configured name of the error variable begins with a \`^\` it is considered to be a
      regexp pattern.

      - If the option is \`"^(err|error|anySpecificError)$"\`, the rule reports unhandled errors
        where the parameter name can be \`err\`, \`error\` or \`anySpecificError\`.
      - If the option is \`"^.+Error$"\`, the rule reports unhandled errors where the parameter
        name ends with \`Error\` (for example, \`connectionError\` or \`validationError\` will
        match).
      - If the option is \`"^.*(e|E)rr"\`, the rule reports unhandled errors where the parameter
        name matches any string that contains \`err\` or \`Err\` (for example, \`err\`, \`error\`,
        \`anyError\`, \`some_err\` will match).

      In addition to the string we may specify an options object with the following property:
      
      - \`allowProperties\`: (\`true\` by default) When this is set to \`false\` the rule will not
        report unhandled errors as long as the error object is handled without accessing any of its
        properties at least once. For instance, \`(err) => console.log(err.stack)\` would report an
        issue when \`allowProperties\` is set to \`false\` because \`err\` is not handled on its
        own.
      `,
    options: {
      type: 'array',
      items: [{
        type: 'string'
      }],
      minLength: 0,
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "error"]
      `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "^(err|error|anySpecificError)$"]
      `
    ],
    typescriptOnly: false,
    type: 'maintainability'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new ErrCallbackHandlerWalker(sourceFile, this.getOptions()));
  }
}

interface IFunctionScope {
  firstParamName: string | undefined;
  hasFirstParam: boolean;
}

class ErrCallbackHandlerWalker extends Lint.RuleWalker {
  private stack: IFunctionScope[] = [];
  private errorCheck: (name: string) => boolean;
  private firstParameterName: (node: ts.FunctionLikeDeclaration) => string | undefined;
  private allowProperties: boolean = true;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const opt = this.getOptions();
    const errorArgument = opt[0] || 'err';
    if (opt[1]) {
      this.allowProperties = !!opt[1].allowProperties;
    }

    if (errorArgument.charAt(0) === '^') {
      this.errorCheck = RegExp.prototype.test.bind(new RegExp(errorArgument));
    } else {
      this.errorCheck = (name => name === errorArgument);
    }
    this.firstParameterName = (node: ts.FunctionLikeDeclaration) => {
      const param = node.parameters[0];
      return param ? param.name.getText(sourceFile) : undefined;
    };
  }

  /**
   * Pushes new function scope with its first parameter name and the assumption that it is not
   * used in its body.
   */
  private enterScope(firstParamName?: string): void {
    this.stack.push({
      firstParamName,
      hasFirstParam: false
    });
  }

  /**
   * Pops a function scope from the stack.
   */
  private exitScope(): IFunctionScope {
    return this.stack.pop();
  }

  protected visitSourceFile(node: ts.SourceFile) {
    // Reset internal state.
    this.stack = [];
    super.visitSourceFile(node);
  }

  protected visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    this.enterScope(this.firstParameterName(node));
    super.visitFunctionDeclaration(node);
    this.exitFunction(node);
  }

  protected visitFunctionExpression(node: ts.FunctionExpression) {
    this.enterScope(this.firstParameterName(node));
    super.visitFunctionExpression(node);
    this.exitFunction(node);
  }

  public visitArrowFunction(node: ts.ArrowFunction) {
    this.enterScope(this.firstParameterName(node));
    super.visitArrowFunction(node);
    this.exitFunction(node);
  }

  protected visitCatchClause(node: ts.CatchClause) {
    // A catch clause creates another scope in which the first paramter of the parent function
    // may no longer be valid. Lets create another scope
    this.enterScope(node.variableDeclaration ? node.variableDeclaration.name.getText() : undefined);
    super.visitCatchClause(node);
    // Just exit the scope since this is not a function
    this.exitScope();
  }

  private exitFunction(node: ts.FunctionLikeDeclaration) {
    const scopeInfo = this.exitScope();
    const param = scopeInfo.firstParamName;
    if (param && this.errorCheck(param) && !scopeInfo.hasFirstParam) {
      const name = node.parameters[0].name;
      const strictMsg = !this.allowProperties ? ' without property access at least once' : '';
      const msg = `Expected error to be handled${strictMsg}`;
      const failure = this.createFailure(
        name.getStart(this.getSourceFile()),
        name.getWidth(this.getSourceFile()),
        msg
      );
      this.addFailure(failure);
    }
  }

  private isPropAccess(node: ts.Node): boolean {
    return node.kind === ts.SyntaxKind.PropertyAccessExpression;
  }

  protected visitNode(node: ts.Node) {
    // Only execute when inside a function scope and dealing with an identifier.
    if (
      this.stack.length > 0 &&
      node.parent.kind !== ts.SyntaxKind.Parameter &&
      node.kind === ts.SyntaxKind.Identifier
    ) {
      let doCheck = false;
      const inPropertyAccess = this.isPropAccess(node.parent);
      if (!this.allowProperties) {
        doCheck = !inPropertyAccess;
      } else if (inPropertyAccess) {
        // Make sure we are not in nested property access, i.e. caller.caller.error.prop
        const isCaller = (node.parent as ts.PropertyAccessExpression).expression === node;
        doCheck = isCaller && !this.isPropAccess(node.parent.parent);
      } else {
        doCheck = true;
      }

      if (doCheck) {
        const text = (node as ts.Identifier).text;
        // traverse through the function scopes (starting with the inner most)
        // until we see one function that uses the current identifier
        let i = this.stack.length;
        while (i--) {
          const info = this.stack[i];
          if (text === info.firstParamName) {
            info.hasFirstParam = true;
            break;
          }
        }
      }
    }

    super.visitNode(node);
  }
}
