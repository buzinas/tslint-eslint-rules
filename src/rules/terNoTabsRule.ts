/**
 * This rule is a port of eslint:
 *
 * source file: https://github.com/eslint/eslint/blob/master/lib/rules/no-tabs.js
 * git commit hash: 2b1eba221ba7d978c298d0ad7cd4de50f2c796b6
 *
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-no-tabs';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Unexpected tab character.';
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: 'disallow all tabs',
    rationale: Lint.Utils.dedent`
      This rule looks for tabs anywhere inside a file: code, comments or anything else, and disallows their usage.
      `,
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
    return this.applyWithFunction(sourceFile, walk);
  }
}

function walk(ctx: Lint.WalkContext<void>) {
  const TAB_REGEX = /\t/;
  const lines = ctx.sourceFile.text.split(/\n/g);

  lines.forEach((line, i) => {
    const match = TAB_REGEX.exec(line);
    if (match) {
      ctx.addFailureAt(
        ctx.sourceFile.getPositionOfLineAndCharacter(i, match.index),
        1,
        Rule.FAILURE_STRING
      );
    }
  });
}
