import * as ts from "tslint/node_modules/typescript";
import * as Lint from "tslint/lib/lint";

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Invalid typeof comparison value: ';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new ValidTypeofWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class ValidTypeofWalker extends Lint.RuleWalker {
  private VALID_TYPES = ['symbol', 'undefined', 'object', 'boolean', 'number', 'string', 'function'];
  private OPERATORS = [ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken];
  
  protected visitNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.TypeOfExpression) {
      this.validateTypeOf(node as ts.TypeOfExpression);
    }
    super.visitNode(node);
  }

  private validateTypeOf(node: ts.TypeOfExpression) {
    if (node.parent.kind === ts.SyntaxKind.BinaryExpression) {
      let parent = (node.parent as ts.BinaryExpression);
      if (this.OPERATORS.indexOf(parent.operatorToken.kind) !== -1) {
        let sibling = parent.left === node ? parent.right : parent.left;
        
        if (sibling.kind === ts.SyntaxKind.StringLiteral && this.VALID_TYPES.indexOf((sibling as ts.StringLiteral).text) === -1) {
          this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
      }
    }
  }
}
