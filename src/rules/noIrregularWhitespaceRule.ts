import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static RULE_NAME = 'no-irregular-whitespace';
  public static FAILURE_STRING = 'irregular whitespace not allowed';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoIrregularWhitespaceWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoIrregularWhitespaceWalker extends Lint.RuleWalker {
  private IRREGULAR_WHITESPACE = /[\u0085\u00A0\ufeff\f\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u202f\u205f\u3000]+/mg;
  private IRREGULAR_LINE_TERMINATORS = /[\u2028\u2029]/mg;

  protected visitSourceFile(node: ts.SourceFile) {
    // validate all the errors once when starting
    this.validateIrregularWhitespace(node);
    super.visitSourceFile(node);
  }

  protected visitNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.StringLiteral) {
      // remove the errors previously created inside strings
      this.removeStringError(node as ts.StringLiteral);
    }
    super.visitNode(node);
  }

  private removeStringError(node: ts.StringLiteral) {
    const start = node.getStart();
    const end = node.getEnd();

    const failures = this.getFailures();

    for (let i = failures.length - 1; i >= 0; i--) {
      let failure = failures[i];

      if (failure.getRuleName() === Rule.RULE_NAME) {
        if (failure.getStartPosition().getPosition() >= start && failure.getEndPosition().getPosition() <= end) {
          failures.splice(i, 1);
        }
      }
    }
  }

  private validateIrregularWhitespace(node: ts.SourceFile) {
    const lines = node.text.split(/\n/g);

    lines.forEach((line, i) => {
      let match = this.IRREGULAR_WHITESPACE.exec(line);
      while (match) {
        this.addFailure(this.createFailure(node.getPositionOfLineAndCharacter(i, match.index), 1, Rule.FAILURE_STRING));
        match = this.IRREGULAR_WHITESPACE.exec(line);
      }

      match = this.IRREGULAR_LINE_TERMINATORS.exec(line);
      while (match) {
        this.addFailure(this.createFailure(node.getPositionOfLineAndCharacter(i, match.index), 1, Rule.FAILURE_STRING));
        match = this.IRREGULAR_LINE_TERMINATORS.exec(line);
      }
    });
  }
}
