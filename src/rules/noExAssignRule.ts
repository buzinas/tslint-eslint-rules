import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'invalid typeof comparison value';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoExAssignWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoExAssignWalker extends Lint.RuleWalker {
  private isInCatchClause = false;
  private currentIdentifier: ts.Identifier = null;

  protected visitCatchClause(node: ts.CatchClause) {
    this.isInCatchClause = true;
    super.visitCatchClause(node);
    this.currentIdentifier = null;
    this.isInCatchClause = false;
  }

  protected visitIdentifier(node: ts.Identifier) {
    if (!this.currentIdentifier) {
      this.currentIdentifier = node;
    }
    else if (this.currentIdentifier.text === node.text) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
    super.visitIdentifier(node);
  }
}
