import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = `don't use empty classes in regular expressions`;

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoEmptyCharacterClassWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoEmptyCharacterClassWalker extends Lint.RuleWalker {
  protected visitRegularExpressionLiteral(node: ts.LiteralExpression) {
    this.validateEmptyCharacterClass(node);
    super.visitRegularExpressionLiteral(node);
  }

  private validateEmptyCharacterClass(node: ts.LiteralExpression) {
    if (!(/^\/([^\\[]|\\.|\[([^\\\]]|\\.)+\])*\/[gim]*$/.test(node.text))) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
  }
}
