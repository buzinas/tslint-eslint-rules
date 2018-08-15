/**
 * This rule is a port of eslint:
 *
 * source file: https://github.com/eslint/eslint/blob/master/lib/rules/prefer-arrow-callback.js
 * git commit hash: 0b85004acdca863873d5e3cdcfcbe6fe4ac106b6
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-prefer-arrow-callback';
let OPTIONS: any;

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'require arrow functions as callbacks',
    rationale: Lint.Utils.dedent`
      Arrow functions are suited to callbacks, because:

      * \`this\` keywords in arrow functions bind to the upper scope’s.
      * The notation of the arrow function is shorter than function expression’s.
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule takes one optional argument, an object which is an options object. This object
      may specify the following properties:

      * \`"allowNamedFunctions"\` (default false) When set to \`true\`, the rule doesn't warn on
                                  named functions used as callback.
      * \`"allowUnboundThis"\` (default true) When set to \`false\`, this option allows the use of
                               \`this\` without restriction and checks for dynamically assigned
                               \`this\` values such as when using \`Array.prototype.map\` with a
                               \`context\` argument. Normally, the rule will flag the use of this
                               whenever a function does not use \`bind()\` to specify the value of
                               \`this\` constantly.
      `,
    options: {
      type: 'array',
      items: [{
        type: 'object',
        properties: {
          allowNamedFunctions: {
            type: 'boolean'
          },
          allowUnboundThis: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }],
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, {
          "allowNamedFunctions": true
        }]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, {
          "allowUnboundThis": false
        }]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, {
          "allowNamedFunctions": true,
          "allowUnboundThis": false
        }]
        `
    ],
    typescriptOnly: false,
    type: 'typescript'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

function checkMetaProperty(node: ts.PropertyAccessExpression, name: string, prop: string) {
  // TODO: I hate cheating the compiler, help me remove the `!`
  return node.parent && node.parent.getFirstToken()!.getText() === name && node.name.text === prop;
}

interface ICallbackInfo {
  isCallback: boolean;
  isLexicalThis: boolean;
}

function getCallbackInfo(func: ts.FunctionExpression): ICallbackInfo {
  const retv = { isCallback: false, isLexicalThis: false };
  let node = func as ts.Node;
  let parent = node.parent;

  while (node && parent) {
    switch (parent.kind) {
      case ts.SyntaxKind.BinaryExpression:
      case ts.SyntaxKind.ConditionalExpression:
        break;
      case ts.SyntaxKind.PropertyAccessExpression:
        if (
          (parent as ts.PropertyAccessExpression).name.kind === ts.SyntaxKind.Identifier &&
          (parent as ts.PropertyAccessExpression).name.text === 'bind' &&
          parent.parent &&
          parent.parent.kind === ts.SyntaxKind.CallExpression &&
          (parent.parent as ts.CallExpression).expression === parent
        ) {
          retv.isLexicalThis = (
            (parent.parent as ts.CallExpression).arguments.length === 1 &&
            (parent.parent as ts.CallExpression).arguments[0].kind === ts.SyntaxKind.ThisKeyword
          );
          node = parent;
          parent = parent.parent;
        } else {
          return retv;
        }
        break;
      case ts.SyntaxKind.CallExpression:
      case ts.SyntaxKind.NewExpression:
        if ((parent as ts.CallExpression).expression !== node) {
          retv.isCallback = true;
        }
        return retv;
      default:
        return retv;
    }

    node = parent;
    parent = node.parent;
  }

  throw new Error('unreachable');
}

interface IFunctionScope {
  functionName: string | undefined;
  isRecursive: boolean;
  hasArguments: boolean;
  hasThis: boolean;
  hasSuper: boolean;
  hasMeta: boolean;
}

class RuleWalker extends Lint.RuleWalker {
  private stack: IFunctionScope[] = [];

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    OPTIONS = {
      allowUnboundThis: true,
      allowNamedFunctions: null
    };
    const userOptions = this.getOptions()[0];
    if (userOptions) {
      OPTIONS.allowUnboundThis = userOptions.allowUnboundThis !== false;
      OPTIONS.allowNamedFunctions = userOptions.allowNamedFunctions;
    }
  }

  /**
   * Pushes new function scope with all `false` flags.
   */
  private enterScope(functionName?: string): void {
    this.stack.push({
      functionName,
      isRecursive: false,
      hasThis: false,
      hasSuper: false,
      hasMeta: false,
      hasArguments: false
    });
  }

  /**
   * Pops a function scope from the stack.
   */
  private exitScope(): IFunctionScope {
    return this.stack.pop()!;
  }

  private exitFunctionExpression(node: ts.FunctionExpression) {
    const scopeInfo = this.exitScope();

    // Skip generators
    if (node.asteriskToken) {
      return;
    }

    // Skip named function expressions and recursive functions
    if (node.name && node.name.text) {
      if (OPTIONS.allowNamedFunctions || scopeInfo.isRecursive) {
        return;
      }
    }

    // Skip if using arguments
    const params = node.parameters.map(x => x.name.getText());
    const argumentsIsParam = params.indexOf('arguments') !== -1;
    if (!argumentsIsParam && scopeInfo.hasArguments) {
      return;
    }

    const callbackInfo = getCallbackInfo(node);
    if (
      callbackInfo.isCallback &&
      (!OPTIONS.allowUnboundThis || !scopeInfo.hasThis || callbackInfo.isLexicalThis) &&
      !scopeInfo.hasSuper &&
      !scopeInfo.hasMeta
    ) {
      const failure = this.createFailure(
        node.getStart(),
        node.getWidth(),
        'Unexpected function expression.'
      );
      this.addFailure(failure);
    }
  }

  protected visitSourceFile(node: ts.SourceFile) {
    // Reset internal state.
    this.stack = [];
    super.visitSourceFile(node);
  }

  protected visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    this.enterScope();
    super.visitFunctionDeclaration(node);
    this.exitScope();
  }

  protected visitFunctionExpression(node: ts.FunctionExpression) {
    this.enterScope(node.name ? node.name.text : undefined);
    super.visitFunctionExpression(node);
    this.exitFunctionExpression(node);
  }

  protected visitNode(node: ts.Node) {
    const info = this.stack[this.stack.length - 1];
    // Making sure we are in a function body
    if (info && node.parent && node.parent.kind !== ts.SyntaxKind.FunctionExpression) {
      if (node.kind === ts.SyntaxKind.ThisKeyword) {
        info.hasThis = true;
      } else if (node.kind === ts.SyntaxKind.SuperKeyword) {
        info.hasSuper = true;
      } else if (node.kind === ts.SyntaxKind.Identifier) {
        const text = (node as ts.Identifier).text;
        if (text === 'arguments') {
          info.hasArguments = true;
        } else if (text === info.functionName) {
          info.isRecursive = true;
        }
      } else if (
        (
          node.kind === ts.SyntaxKind.PropertyAccessExpression ||
          node.kind === ts.SyntaxKind.MetaProperty
        ) &&
        checkMetaProperty(node as ts.PropertyAccessExpression, 'new', 'target')
      ) {
        info.hasMeta = true;
      }
    }
    super.visitNode(node);
  }
}
