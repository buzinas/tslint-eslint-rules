/// <reference path='../../node_modules/tslint/typings/typescriptServices.d.ts' />
/// <reference path='../../node_modules/tslint/lib/tslint.d.ts' />

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Use the isNaN function to compare with NaN: ';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new UseIsnanWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class UseIsnanWalker extends Lint.RuleWalker {
  private OPERATORS = [ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken];
  
  protected visitBinaryExpression(node: ts.BinaryExpression) {
    // TODO
    if (this.OPERATORS.indexOf(node.operatorToken.kind) !== -1 && node.left.getText() === 'NaN' && node.right.getText() === 'NaN') {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
    
    super.visitBinaryExpression(node);
  }
}
