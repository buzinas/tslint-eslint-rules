import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-no-sparse-arrays';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'disallow sparse arrays (recommended)',
    rationale: Lint.Utils.dedent`
      Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code
      harder to debug in a similar nature to mixed tabs and spaces.
      `,
    optionsDescription: '',
    options: {},
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `
    ],
    typescriptOnly: false,
    type: 'typescript'
  };
  public static FAILURE_STRING = 'unexpected comma in middle of array';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoSparseArraysWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoSparseArraysWalker extends Lint.RuleWalker {
  protected visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    this.validateNoSparseArray(node);
    super.visitArrayLiteralExpression(node);
  }

  private validateNoSparseArray(node: ts.ArrayLiteralExpression) {
    const hasEmptySlot = node.elements.some(el => el.kind === ts.SyntaxKind.OmittedExpression);

    if (hasEmptySlot) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
  }
}
