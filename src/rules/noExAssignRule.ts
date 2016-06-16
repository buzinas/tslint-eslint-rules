import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'do not assign to the exception parameter.';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoExAssignWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoExAssignWalker extends Lint.RuleWalker {
  private isInCatchClause = false;
  private variableNode: ts.Identifier = null;

  protected visitCatchClause = function (node: ts.CatchClause) {
    this.variableNode    = node.variableDeclaration;
    this.isInCatchClause = true;

    super.visitCatchClause(node);

    this.isInCatchClause = false;
    this.variableNode    = null;
  };

  protected visitBinaryExpression = function (node: ts.CatchClause) {
    if (
      this.isInCatchClause &&
      node.left.kind === ts.SyntaxKind.Identifier &&
      this.variableNode.name.text === node.left.text
    ) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }

    super.visitIdentifier(node);
  }
}
