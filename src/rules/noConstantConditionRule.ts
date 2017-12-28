import * as ts from 'typescript';
import * as Lint from 'tslint';
import { isAssignmentToken } from '../support/token';

const RULE_NAME = 'no-constant-condition';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'unexpected constant condition';

  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'disallow use of constant expressions in conditions (recommended)',
    rationale: Lint.Utils.dedent`
      A constant expression (for example, a literal) as a test condition might be a typo or
      development trigger for a specific behavior. For example, the following code looks as if it is
      not ready for production.
      `,
    optionsDescription: Lint.Utils.dedent`
      - \`"checkLoops"\` Setting this option to \`false\` allows constant expressions in loops (default: \`true\`).
      `,
    options: {
      type: 'object',
      properties: {
        checkLoops: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": true
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, { "checkLoops": false }]
        `
    ],
    typescriptOnly: false,
    type: 'functionality'
  };

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
    if (this.isConstant(expression)) {
      this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
    }
    // walk the children of the conditional expression for nested conditions
    this.walkChildren(expression);
  }

  private isConstant(node: ts.Node): boolean {
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
        if (isAssignmentToken((node as ts.BinaryExpression).operatorToken)) {
          return this.isConstant((node as ts.BinaryExpression).right);
        }
        return this.isConstant((node as ts.BinaryExpression).left) && this.isConstant((node as ts.BinaryExpression).right);
      case ts.SyntaxKind.ConditionalExpression:
        return this.isConstant((node as ts.ConditionalExpression).condition);
      case ts.SyntaxKind.PrefixUnaryExpression:
        return this.isConstant((node as ts.PrefixUnaryExpression).operand);
      case ts.SyntaxKind.ParenthesizedExpression:
        return this.isConstant((node as ts.ParenthesizedExpression).expression);
    }

    return false;
  }
}
