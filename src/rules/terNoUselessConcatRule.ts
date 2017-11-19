import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-no-useless-concat';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Unexpected string concatenation of literals.';

  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: 'disallow unnecessary concatenation of strings',
    rationale:
      'This rule aims to flag the concatenation of 2 literals when ' +
      'they could be combined into a single literal. ' +
      'Literals can be strings or template literals.',
    optionsDescription: '',
    options: {},
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": true
        `
    ],
    typescriptOnly: false,
    type: 'functionality'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NoUselessConcatWalker(
        sourceFile,
        this.ruleName,
        new Set(this.ruleArguments.map(String))
      )
    );
  }
}

class NoUselessConcatWalker extends Lint.AbstractWalker<Set<string>> {
  // Checks whether or not a given BinaryExpression is a PlusToken.
  private isPlusToken(node: ts.BinaryExpression): boolean {
    return node.operatorToken.kind === ts.SyntaxKind.PlusToken;
  }

  private getLeft(node: ts.BinaryExpression): ts.Node {
    let left = node.left;
    while (
      ts.isBinaryExpression(left) &&
      this.isPlusToken(left as ts.BinaryExpression)
    ) {
      left = (left as ts.BinaryExpression).right;
    }
    return left;
  }

  private getRight(node: ts.BinaryExpression): ts.Node {
    let right = node.right;
    while (
      ts.isBinaryExpression(right) &&
      this.isPlusToken(right as ts.BinaryExpression)
    ) {
      right = (right as ts.BinaryExpression).left;
    }
    return right;
  }

  private getStartPosition(node: ts.Node): ts.LineAndCharacter {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
  }

  private getEndPosition(node: ts.Node): ts.LineAndCharacter {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
  }

  private areNodesOnSameLine(node: ts.Node, nextNode: ts.Node): boolean {
    return (
      this.getEndPosition(node).line === this.getStartPosition(nextNode).line
    );
  }

  private isStringLiteral(node: ts.Node) {
    return ts.isStringLiteral(node) || ts.isTemplateLiteral(node);
  }

  public walk(sourceFile: ts.SourceFile) {
    const cb = (node: ts.Node): void => {
      // Finds specific node types and do checking.
      if (
        ts.isBinaryExpression(node) &&
        this.isPlusToken(node as ts.BinaryExpression)
      ) {
        const nodeExpr = node as ts.BinaryExpression;
        const nodeExprLeft = this.getLeft(nodeExpr);
        const nodeExprRight = this.getRight(nodeExpr);
        if (
          this.isStringLiteral(nodeExprLeft) &&
          this.isStringLiteral(nodeExprRight) &&
          this.areNodesOnSameLine(nodeExprLeft, nodeExprRight)
        ) {
          this.addFailureAt(
            nodeExpr.operatorToken.getStart(),
            nodeExpr.operatorToken.getWidth(),
            Rule.FAILURE_STRING
          );
        }
      }
      // Continue rescursion: call function `cb` for all children of the current node.
      return ts.forEachChild(node, cb);
    };

    // Start recursion for all children of `sourceFile`.
    return ts.forEachChild(sourceFile, cb);
  }
}
