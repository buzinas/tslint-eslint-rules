import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-computed-property-spacing';
interface ITerComputedPropertySpacingOptions {
  always: boolean;
}

const ALWAYS_BEFORE_MESSAGE = "A space is required before ']'.";
const ALWAYS_AFTER_MESSAGE = "A space is required after '['.";
const NEVER_BEFORE_MESSAGE = "There should be no space before ']'.";
const NEVER_AFTER_MESSAGE = "There should be no space after '['.";

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: true,
    description: 'require or disallow padding inside computed properties',
    rationale: Lint.Utils.dedent`
      While formatting preferences are very personal, a number of style guides require or disallow spaces between computed properties in the following situations:
    `,
    optionsDescription: Lint.Utils.dedent`
      The rule takes in one option, which defines to require or forbid whitespace.

      * \`"never"\` (default) disallows spaces inside computed property brackets
      * \`"always"\` requires one or more spaces inside computed property brackets
    `,
    options: {
      type: 'array',
      items: [{
        enum: [ 'always', 'never' ]
      }],
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "always"]
      `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "never"]
      `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  private formatOptions([ alwaysOrNever ]: string[]): ITerComputedPropertySpacingOptions {
    // handle the ruleArguments
    return {
      always: alwaysOrNever === 'always'
    };
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const opt = this.formatOptions(this.ruleArguments);
    const walker = new RuleWalker(sourceFile, this.ruleName, opt);
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.AbstractWalker<ITerComputedPropertySpacingOptions> {
  public walk(sourceFile: ts.SourceFile) {
    const cb = (node: ts.Node): void => {
      if (node.kind === ts.SyntaxKind.ElementAccessExpression) {
        this.checkNode(
          node,
          node.getChildAt(1),
          node.getChildAt(3)
        );
      } else if (node.kind === ts.SyntaxKind.ComputedPropertyName) {
        this.checkNode(
          node,
          node.getChildAt(0),
          node.getChildAt(2)
        );
      }

      ts.forEachChild(node, cb);
    };

    ts.forEachChild(sourceFile, cb);
  }

  private checkNode(node: ts.Node, leftBracketNode: ts.Node, rightBracketNode: ts.Node): void {
    const nodeText = node.getText();

    const regex = /\[([\s\S]*)\]/;

    const match = regex.exec(nodeText);

    if (!match) {
      return;
    }

    const contentWithinBrackets = match[1];

    if (this.options.always) {
      const beforeWhitespaceLength = this.getBeforeWhitespaceLength(contentWithinBrackets, true);
      const afterWhitespaceLength = this.getAfterWhitespaceLength(contentWithinBrackets, true);

      if (beforeWhitespaceLength === 0) {
        this.addFailureAtNode(leftBracketNode, ALWAYS_AFTER_MESSAGE, Lint.Replacement.appendText(leftBracketNode.getEnd(), ' '));
      }

      if (afterWhitespaceLength === 0) {
        this.addFailureAtNode(rightBracketNode, ALWAYS_BEFORE_MESSAGE, Lint.Replacement.appendText(rightBracketNode.getStart(), ' '));
      }
    } else {
      // Newlines don't count as whitespace
      const contentWithinBracketsNoNewlines = contentWithinBrackets.replace('\n', '');
      const beforeWhitespaceLength = this.getBeforeWhitespaceLength(contentWithinBracketsNoNewlines, false);
      const afterWhitespaceLength = this.getAfterWhitespaceLength(contentWithinBracketsNoNewlines, false);

      if (beforeWhitespaceLength !== 0) {
        this.addFailureAtNode(leftBracketNode, NEVER_AFTER_MESSAGE, Lint.Replacement.deleteText(leftBracketNode.getEnd(), beforeWhitespaceLength));
      }

      if (afterWhitespaceLength !== 0) {
        this.addFailureAtNode(rightBracketNode, NEVER_BEFORE_MESSAGE, Lint.Replacement.deleteText(rightBracketNode.getStart() - afterWhitespaceLength, afterWhitespaceLength));
      }
    }
  }

  private getBeforeWhitespaceLength(content: string, newlinesCountAsWhitespace: boolean): number {
    const regex = newlinesCountAsWhitespace ? /^\s+/ : /^[^\S\n]+/;
    const match = regex.exec(content);

    if (match) {
      return match[0].length;
    } else {
      return 0;
    }
  }

  private getAfterWhitespaceLength(content: string, newlinesCountAsWhitespace: boolean): number {
    const regex = newlinesCountAsWhitespace ? /\s+$/ : /[^\S\n]+$/;
    const match = regex.exec(content);

    if (match) {
      return match[0].length;
    } else {
      return 0;
    }
  }
}
