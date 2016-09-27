import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'unexpected constant condition';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoConstantConditionWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoConstantConditionWalker extends Lint.RuleWalker {
  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);

    const opts = this.getOptions();

    if (opts.length && opts[0].checkLoops === false) {
      this.checkLoops = false;
    }
  }

  private checkLoops = true;
  private isInConditional = false;

  protected visitIfStatement(node: ts.IfStatement) {
    this.validateCondition(node.expression);
    super.visitIfStatement(node);
  }

  protected visitWhileStatement(node: ts.WhileStatement) {
    if (this.checkLoops) {
      this.validateCondition(node.expression);
    }
    super.visitWhileStatement(node);
  }

  protected visitDoStatement(node: ts.DoStatement) {
    if (this.checkLoops) {
      this.validateCondition(node.expression);
    }
    super.visitDoStatement(node);
  }

  protected visitForStatement(node: ts.ForStatement) {
    if (this.checkLoops && node.condition) {
      this.validateCondition(node.condition);
    }
    super.visitForStatement(node);
  }

  protected visitConditionalExpression(node: ts.ConditionalExpression): void {
    this.validateCondition(node.condition);
    super.visitConditionalExpression(node);
  }

  private validateCondition(expression: ts.Expression) {
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
      case ts.SyntaxKind.PostfixUnaryExpression:
        return this.isConstant((node as ts.PostfixUnaryExpression).operand);
      // ESLint BinaryExpression / LogicalExpression
      case ts.SyntaxKind.BinaryExpression:
        // ESLint AssignmentExpression
        if (this.isAssignmentToken((node as ts.BinaryExpression).operatorToken)) {
          return this.isConstant((node as ts.BinaryExpression).right);
        }
        return this.isConstant((node as ts.BinaryExpression).left) && this.isConstant((node as ts.BinaryExpression).right);
      case ts.SyntaxKind.ConditionalExpression:
        return this.isConstant((node as ts.ConditionalExpression).condition);
      case ts.SyntaxKind.PrefixUnaryExpression:
        if (node.getFirstToken().kind === ts.SyntaxKind.ExclamationToken) {
          return this.isConstant((node as ts.PrefixUnaryExpression).operand);
        }
        return true;
      case ts.SyntaxKind.ParenthesizedExpression:
        return this.isConstant((node as ts.ParenthesizedExpression).expression);
    }

    return false;
  }

  private isAssignmentToken(token: ts.Node) {
    return token.kind >= ts.SyntaxKind.FirstAssignment && token.kind <= ts.SyntaxKind.LastAssignment;
  }
}
