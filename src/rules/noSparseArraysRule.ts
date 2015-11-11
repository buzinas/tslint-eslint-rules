import * as ts from "tslint/node_modules/typescript";
import * as Lint from "tslint/lib/lint";

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Unexpected comma in middle of array: ';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoSparseArraysWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoSparseArraysWalker extends Lint.RuleWalker {
  protected visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    this.validateNoSparseArray(node);
    super.visitArrayLiteralExpression(node);
  }

  private validateNoSparseArray(node: ts.ArrayLiteralExpression) {
    const hasEmptySlot = node.elements.filter(el => el.getText().trim() === '');
    
    if (hasEmptySlot.length > 0) {
       this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
  }
}
