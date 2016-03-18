import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'duplicate case label';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoDuplicateCaseWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoDuplicateCaseWalker extends Lint.RuleWalker {
  protected visitSwitchStatement(node: ts.SwitchStatement) {
    this.validateNoDupeCase(node);
    super.visitSwitchStatement(node);
  }

  private validateNoDupeCase(node: ts.SwitchStatement) {
    const cases = new Map<string, ts.CaseClause>();

    node.caseBlock.clauses.forEach(clause => {
      if (clause.kind === ts.SyntaxKind.CaseClause) {
        const key = clause.getText();
        if (cases.has(key)) {
          this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        else {
          cases.set(key, clause as ts.CaseClause);
        }
      }
    });
  }
}
