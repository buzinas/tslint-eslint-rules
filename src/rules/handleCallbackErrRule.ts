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
      The rule takes a single string option: the name of the error parameter. The default is
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
  public static FAILURE_STRING = 'Expected error to be handled';

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

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const errorArgument = options.ruleArguments[0] || 'err';

    if (errorArgument.charAt(0) === '^') {
      this.errorCheck = RegExp.prototype.test.bind(new RegExp(errorArgument));
    } else {
      this.errorCheck = (name) => name === errorArgument;
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
      const failure = this.createFailure(
        name.getStart(this.getSourceFile()),
        name.getWidth(this.getSourceFile()),
        Rule.FAILURE_STRING
      );
      this.addFailure(failure);
    }
  }

  protected visitNode(node: ts.Node) {
    if (
      this.stack.length > 0 &&
      node.parent.kind !== ts.SyntaxKind.Parameter &&
      node.kind === ts.SyntaxKind.Identifier
    ) {
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
    super.visitNode(node);
  }
}
