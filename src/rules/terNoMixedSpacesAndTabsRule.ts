import * as ts from 'typescript';
import * as Lint from 'tslint';
import { getLineRanges, getTokenAtPosition, isPositionInComment } from 'tsutils';

const RULE_NAME = 'ter-no-mixed-spaces-and-tabs';
interface ITerNoMixedSpacesAndTabsRuleOptions {
  readonly tabs?: boolean;
  readonly smartTabs: boolean;
}

const OPTION_USE_TABS = 'tabs';
const OPTION_USE_SPACES = 'spaces';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'Enforces indentation with unmixed tabs or spaces.',
    rationale: Lint.Utils.dedent`
      Using only one of tabs or spaces for indentation leads to more consistent editor behavior,
      cleaner diffs in version control, and easier programmatic manipulation.`,
    optionsDescription: Lint.Utils.dedent`
      This rule takes an object argument with an optional \`type\` property which can be set to:

      * \`${OPTION_USE_SPACES}\` enforces consistent spaces for indentation.
      * \`${OPTION_USE_TABS}\` enforces consistent tabs for indentation.

      If the above is not provided, the rule will enforce either all tabs or all spaces on each
      line, although different lines may differ between tabs and spaces.

      Optionally, a \`smartTabs\` boolean property can be specified.  If set to true, smart tabs
      allow mixing tabs and spaces if tabs are used for indentation and spaces for alignment, eg.

          function main() {
          // --->const a = 1,
          // --->......b = 2;

              const a = 1,
                    b = 2;
          }
      `,
    options: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [OPTION_USE_TABS, OPTION_USE_SPACES]
            },
            smartTabs: {
              type: 'boolean'
            }
          },
          additionalProperties: false
        }
      ],
      minLength: 0,
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent`
      "${RULE_NAME}": { "type": "${OPTION_USE_TABS}" } ]
      `,
      Lint.Utils.dedent`
      "${RULE_NAME}": { "type": "${OPTION_USE_SPACES}" } ]
      `,
      Lint.Utils.dedent`
      "${RULE_NAME}": { "smartTabs": true } ]
      `,
      Lint.Utils.dedent`
      "${RULE_NAME}": { "type": "${OPTION_USE_TABS}", "smartTabs": true } ]
      `
    ],
    type: 'maintainability',
    typescriptOnly: false
  };

  public static FAILURE_STRING(expected: string, mixed?: boolean): string {
    if (!mixed) {
      return `${expected} indentation expected`;
    }

    return `indentation has mixed tabs and spaces`;
  }

  private formatOptions(ruleArguments: any[]): ITerNoMixedSpacesAndTabsRuleOptions {
    let tabs: boolean | undefined = undefined;
    let smartTabs = false;
    const options = ruleArguments[0];

    if (options !== undefined) {
      tabs = options.type === OPTION_USE_TABS ? true : options.type === OPTION_USE_SPACES ? false : undefined;
      smartTabs = options.smartTabs;
    }

    return {
      tabs: tabs,
      smartTabs: smartTabs
    };
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const options = this.formatOptions(this.ruleArguments);
    return this.applyWithFunction(sourceFile, walk, options);
  }
}

function walk(ctx: Lint.WalkContext<ITerNoMixedSpacesAndTabsRuleOptions>): void {
  const { sourceFile, options: { tabs, smartTabs } } = ctx;
  let regExp: RegExp;
  if (tabs === true) {
    regExp = new RegExp(`\ ${smartTabs ? '\\t' : ''}`);
  }
  else if (tabs === false) {
    regExp = new RegExp(`\\t`);
  }
  else {
    regExp = new RegExp(`${smartTabs ? '' : '\\t |'} \\t`);
  }
  const failure = Rule.FAILURE_STRING(tabs ? 'tab' : 'space', typeof tabs === 'undefined');

  for (const { pos, contentLength } of getLineRanges(sourceFile)) {
    if (contentLength === 0) { continue; }
    const line = sourceFile.text.substr(pos, contentLength);
    let indentEnd = line.search(/\S/);
    if (indentEnd === 0) { continue; }
    if (indentEnd === -1) {
      indentEnd = contentLength;
    }
    const indentSpace = line.slice(0, indentEnd);
    if (!regExp.test(indentSpace)) { continue; }
    const token = getTokenAtPosition(sourceFile, pos)!;
    if (token.kind !== ts.SyntaxKind.JsxText &&
      (pos >= token.getStart(sourceFile) || isPositionInComment(sourceFile, pos, token))) {
      continue;
    }
    ctx.addFailureAt(pos, indentEnd, failure);
  }
}
