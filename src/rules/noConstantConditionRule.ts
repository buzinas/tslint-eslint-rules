import * as ts from "tslint/node_modules/typescript";
import * as Lint from "tslint/lib/lint";

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Unexpected constant condition: ';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoConstantConditionWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoConstantConditionWalker extends Lint.RuleWalker {
  private isInConditional = false;

  protected visitIfStatement(node: ts.IfStatement) {
    this.validateConditionalExpression(node.expression);
    super.visitIfStatement(node);
  }

  protected visitWhileStatement(node: ts.WhileStatement) {
    this.validateConditionalExpression(node.expression);
    super.visitWhileStatement(node);
  }

  protected visitDoStatement(node: ts.DoStatement) {
    this.validateConditionalExpression(node.expression);
    super.visitDoStatement(node);
  }

  protected visitForStatement(node: ts.ForStatement) {
    if (node.condition != null) {
      this.validateConditionalExpression(node.condition);
    }
    super.visitForStatement(node);
  }

  protected visitConditionalExpression(node: ts.ConditionalExpression): void {
    this.validateConditionalExpression(node.condition);
    super.visitConditionalExpression(node);
  }

  private validateConditionalExpression(expression: ts.Expression) {
    this.isInConditional = true;
    if (this.isConstant(expression)) {
      this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
    }
    // walk the children of the conditional expression for nested conditions
    this.walkChildren(expression);
    this.isInConditional = false;
  }
  
  private isConstant(node: ts.Node) {
    switch (node.kind) {
      // ESLint Literal
      case ts.SyntaxKind.StringLiteral:
      case ts.SyntaxKind.NumericLiteral:
      case ts.SyntaxKind.TrueKeyword:
      case ts.SyntaxKind.FalseKeyword:
      // ESLint ArrowFunctionExpression
      case ts.SyntaxKind.ArrowFunction:
      // ESLint FunctionExpression
      case ts.SyntaxKind.FunctionExpression:
      // ESLint ObjectExpression
      case ts.SyntaxKind.ObjectLiteralExpression:
      // ESLint ArrayExpression
      case ts.SyntaxKind.ArrayLiteralExpression:
        return true;
      // ESLint UnaryExpression
      case ts.SyntaxKind.PrefixUnaryExpression:
      case ts.SyntaxKind.PostfixUnaryExpression:
        return true;
      // ESLint BinaryExpression / LogicalExpression
      case ts.SyntaxKind.BinaryExpression:
        // ESLint AssignmentExpression
        if (this.isAssignmentToken((node as ts.BinaryExpression).operatorToken)) {
          return this.isConstant(node.getLastToken());
        }
        return this.isConstant(node.getFirstToken()) && this.isConstant(node.getLastToken());
      case ts.SyntaxKind.ConditionalExpression:
        return this.isConstant((node as ts.ConditionalExpression).condition);
    }
  
    return false;
  }
  
  private isAssignmentToken(token: ts.Node) {
    return token.kind >= ts.SyntaxKind.FirstAssignment && token.kind <= ts.SyntaxKind.LastAssignment;
  }
}
