import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-no-self-compare';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Comparing to itself is potentially pointless.';

  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: 'disallow comparisons where both sides are exactly the same',
    rationale:
      'Comparing a variable against itself is usually an error, ' +
      'either a typo or refactoring error. It is confusing to the reader ' +
      'and may potentially introduce a runtime error.',
    optionsDescription: '',
    options: {},
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": true
        `
    ],
    typescriptOnly: false,
    type: 'maintainability'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NoSelfCompareWalker(
        sourceFile,
        this.ruleName,
        new Set(this.ruleArguments.map(String))
      )
    );
  }
}

class NoSelfCompareWalker extends Lint.AbstractWalker<Set<string>> {
  private isComparisonOperator(node: ts.BinaryExpression): boolean {
    const operators = new Set([
      ts.SyntaxKind.EqualsEqualsEqualsToken,
      ts.SyntaxKind.EqualsEqualsToken,
      ts.SyntaxKind.ExclamationEqualsEqualsToken,
      ts.SyntaxKind.ExclamationEqualsToken,
      ts.SyntaxKind.GreaterThanToken,
      ts.SyntaxKind.LessThanToken,
      ts.SyntaxKind.GreaterThanEqualsToken,
      ts.SyntaxKind.LessThanEqualsToken
    ]);
    return operators.has(node.operatorToken.kind);
  }

  private hasSameToken(left: ts.Node, right: ts.Node): boolean {
    return left.kind === right.kind && left.getText() === right.getText();
  }

  public walk(sourceFile: ts.SourceFile) {
    const cb = (node: ts.Node): void => {
      // Finds specific node types and do checking.
      if (ts.isBinaryExpression(node)) {
        const nodeExpr = node as ts.BinaryExpression;
        if (
          this.isComparisonOperator(nodeExpr) &&
          this.hasSameToken(nodeExpr.left, nodeExpr.right)
        ) {
          this.addFailureAt(
            nodeExpr.operatorToken.getStart(),
            nodeExpr.operatorToken.getWidth(),
            Rule.FAILURE_STRING
          );
        }
      } else {
        // Continue rescursion: call function `cb` for all children of the current node.
        return ts.forEachChild(node, cb);
      }
    };

    // Start recursion for all children of `sourceFile`.
    return ts.forEachChild(sourceFile, cb);
  }
}
