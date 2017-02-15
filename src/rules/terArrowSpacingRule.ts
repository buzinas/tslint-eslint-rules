/**
 * Eslint port: https://github.com/eslint/eslint/blob/master/lib/rules/arrow-spacing.js
 * Github Commit Hash: 08fa538bbc130937635dd32cc85d9a26b3b90f0c
 *
 * NOTE: The error location points to the equals-greater-than token instead of the token before
 *       and after as in the original eslint rule.
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-arrow-spacing';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'require space before/after arrow function\'s arrow',
    rationale: Lint.Utils.dedent`
      This rule normalizes the style of spacing before/after an arrow function’s arrow(\`=>\`).
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule takes an object argument with \`before\` and \`after\` properties, each with a
      Boolean value.
      
      The default configuration is \`{ "before": true, "after": true }\`.
      
      \`true\` means there should be one or more spaces and \`false\` means no spaces.
      `,
    options: {
      type: 'array',
      items: [{
        type: 'object',
        properties: {
          before: {
            type: 'boolean'
          },
          after: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }],
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, {
          "before": false,
          "after": false
        }]
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.RuleWalker {
  private before: boolean = true;
  private after: boolean = true;
  private srcFile: ts.SourceFile;
  private srcText: string;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const opt = this.getOptions();
    if (opt[0]) {
      this.before = opt[0].before !== false;
      this.after = opt[0].after !== false;
    }
    this.srcFile = sourceFile;
    this.srcText = sourceFile.getFullText();
  }

  protected visitArrowFunction(node: ts.ArrowFunction) {
    const arrow = node.equalsGreaterThanToken;
    const arrowStart = arrow.getStart(this.srcFile);
    const bodyStart = node.body.getStart(this.srcFile);
    const space = {
      before: /\s/.test(this.srcText[arrowStart - 1]),
      after: /\s/.test(this.srcText[arrow.end])
    };
    if (this.before) {
      if (!space.before) {
        const fix = this.createFix(this.appendText(arrowStart, ' '));
        this.report(arrow, 'Missing', 'before', fix);
      }
    } else {
      if (space.before) {
        const spaces = arrowStart - arrow.getFullStart();
        const fix = this.createFix(this.deleteText(arrowStart - spaces, spaces));
        this.report(arrow, 'Unexpected', 'before', fix);
      }
    }
    if (this.after) {
      if (!space.after) {
        const fix = this.createFix(this.appendText(arrow.end, ' '));
        this.report(arrow, 'Missing', 'after', fix);
      }
    } else {
      if (space.after) {
        const fix = this.createFix(this.deleteText(arrow.end, bodyStart - arrow.end));
        this.report(arrow, 'Unexpected', 'after', fix);
      }
    }
    super.visitArrowFunction(node);
  }

  private report(arrowToken: ts.Node, status: string, place: string, fix: Lint.Fix) {
    const failure = this.createFailure(
      arrowToken.getStart(this.srcFile),
      arrowToken.getWidth(this.srcFile),
      `${status} space ${place} =>.`,
      fix
    );
    this.addFailure(failure);
  }
}
