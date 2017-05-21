import * as ts from 'typescript';
import * as Lint from 'tslint';
import { isAssignmentToken } from '../support/token';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'do not assign to the exception parameter';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoExAssignWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoExAssignWalker extends Lint.RuleWalker {
  private isInCatchClause = false;
  private variableNode?: ts.VariableDeclaration;

  protected visitCatchClause(node: ts.CatchClause) {
    this.variableNode = node.variableDeclaration;
    this.isInCatchClause = true;
    super.visitCatchClause(node);
    this.isInCatchClause = false;
    delete this.variableNode;
  }

  protected visitBinaryExpression(node: ts.BinaryExpression) {
    if (this.isInCatchClause) {
      if (!isAssignmentToken(node.operatorToken)) {
        return;
      }

      if (
        this.variableNode &&
        this.variableNode.name.getText() === node.left.getText() &&
        node.left.kind === ts.SyntaxKind.Identifier
      ) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
      } else if (node.left.kind === ts.SyntaxKind.ArrayLiteralExpression) {
        const els = (node.left as ts.ArrayLiteralExpression).elements;
        if (els.some(el => !!this.variableNode && el.getText() === this.variableNode.getText())) {
          this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
      }
    }
    super.visitBinaryExpression(node);
  }
}
