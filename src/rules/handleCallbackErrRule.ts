import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
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
