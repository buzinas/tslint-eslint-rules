/// <reference path='../../node_modules/tslint/typings/typescriptServices.d.ts' />
/// <reference path='../../node_modules/tslint/lib/tslint.d.ts' />

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = "Unexpected constant condition: ";

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
    super.visitWhileStatement(node);
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
    if (isConstant(expression)) {
      this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
    }
    // walk the children of the conditional expression for nested conditions
    this.walkChildren(expression);
    this.isInConditional = false;
  }
}

function isConstant(node: ts.Node) {
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
      return false; // TODO discover how to validate unary expression
    // ESLint BinaryExpression / LogicalExpression
    case ts.SyntaxKind.BinaryExpression:
      // ESLint AssignmentExpression
      if (isAssignmentToken((node as ts.BinaryExpression).operatorToken)) {
        return isConstant(node.getLastToken());
      }

      return isConstant(node.getFirstToken()) && isConstant(node.getLastToken());
    case ts.SyntaxKind.ConditionalExpression:
      return isConstant((node as ts.ConditionalExpression).condition);
  }

  return false;
}

function isAssignmentToken(token: ts.Node) {
  return token.kind >= ts.SyntaxKind.FirstAssignment && token.kind <= ts.SyntaxKind.LastAssignment;
}
