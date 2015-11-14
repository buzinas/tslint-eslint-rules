/// <reference path='helper.d.ts' />
// import {ts, Lint} from './helper';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'unexpected comma in middle of array';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoSparseArraysWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoSparseArraysWalker extends Lint.RuleWalker {
  protected visitNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
      this.visitArrayLiteralExpression(node as ts.ArrayLiteralExpression);
    }
    super.visitNode(node);
  }
  
  protected visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    this.validateNoSparseArray(node);
    // super.visitArrayLiteralExpression(node);
  }

  private validateNoSparseArray(node: ts.ArrayLiteralExpression) {
    const hasEmptySlot = node.elements.filter(el => el.getText().trim() === '');
    
    if (hasEmptySlot.length > 0) {
       this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
  }
}
