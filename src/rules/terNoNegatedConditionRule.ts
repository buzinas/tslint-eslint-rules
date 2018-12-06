import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-no-negated-condition';
export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Unexpected negated condition.';
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: 'Disallows negated conditions for if statements with else branch and ternary expressions',
    rationale: Lint.Utils.dedent`
       Negated conditions are more difficult to understand.
       Code can be made more readable by inverting the condition instead.`,
    optionsDescription: '',
    options: {},
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": true
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new Walk(sourceFile, this.getOptions()));
  }
}

class Walk extends Lint.RuleWalker {
  protected visitIfStatement(node: ts.IfStatement) {
    if (this.hasElseWithoutCondition(node) && (
        this.isSingleOperatorNegatedCondition(node.expression) ? this.isConditionNegated(node.expression) : this.isConditionNotEqual(node.expression as ts.BinaryExpression)
      )) {
      this.addFailureAtNode(
        node,
        Rule.FAILURE_STRING
      );
    }
    super.visitIfStatement(node);
  }

  protected visitConditionalExpression(node: ts.ConditionalExpression) {
    if ((this.isSingleOperatorNegatedCondition(node.condition) && this.isConditionNegated(node.condition)) || (this.isConditionNotEqual(node.condition as ts.BinaryExpression))) {
      this.addFailureAtNode(
        node,
        Rule.FAILURE_STRING
      );
    }
    super.visitConditionalExpression(node);
  }

  private hasElseWithoutCondition(node: ts.IfStatement) {
    return node.elseStatement && node.elseStatement.getFirstToken() && node.elseStatement.getFirstToken()!.kind !== ts.SyntaxKind.IfKeyword;
  }

  private isSingleOperatorNegatedCondition(condition: ts.ConditionalExpression['condition']) {
    // Child count should be 2 so we can ensure that whole condition is negated(e.g. !(true && true) instead of !true && false)
    return condition.getChildCount() === 2;
  }

  private isConditionNegated(condition: ts.ConditionalExpression['condition']) {
    return condition.getFirstToken() && condition.getFirstToken()!.kind === ts.SyntaxKind.ExclamationToken;
  }

  private isConditionNotEqual(condition: ts.BinaryExpression) {
    return condition.operatorToken && (condition.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsToken ||
                                       condition.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken);
  }
}
