import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoRegexSpacesWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoRegexSpacesWalker extends Lint.RuleWalker {
  protected visitRegularExpressionLiteral(node: ts.LiteralExpression) {
    this.validateMultipleSpaces(node);
    super.visitRegularExpressionLiteral(node);
  }

  private validateMultipleSpaces(node: ts.LiteralExpression) {
    const res = /( {2,})+?/.exec(node.text);
    if (res) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), `spaces are hard to count - use {${res[0].length}}`));
    }
  }
}
