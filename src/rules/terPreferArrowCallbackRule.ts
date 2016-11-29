import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-prefer-arrow-callback';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'enforce a maximum line length',
    rationale: Lint.Utils.dedent`
      `,
    optionsDescription: Lint.Utils.dedent`
      `,
    options: {
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `
    ],
    typescriptOnly: false,
    type: ''
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new (sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.RuleWalker {
  // ** RULE IMPLEMENTATION HERE **
}
