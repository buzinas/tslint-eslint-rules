import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'padded-blocks';
const OPTION_ALWAYS = 'always';
interface ITerPaddedBlocksOptions {
  blocks: boolean;
  switches: boolean;
  classes: boolean;
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: true,
    description: 'enforces consistent empty line padding within blocks',
    rationale: Lint.Utils.dedent`
      Some style guides require block statements to start and end with blank
      lines. The goal is to improve readability by visually separating the
      block content and the surrounding code.
      `,
    optionsDescription: 'This rule has one option, which can be a string option or an object option',
    options: {
      type: 'array',
      items: [
        {
          enum: ['always', 'never']
        },
        {
          type: 'object',
          properties: {
            blocks: {
              enum: ['always', 'never']
            },
            classes: {
              enum: ['always', 'never']
            },
            switches: {
              enum: ['always', 'never']
            }
          },
          additionalProperties: false
        }
      ],
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
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, { "blocks": "always" }]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, { "blocks": "never" }]
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };
  public static FAILURE_STRING = {
    always: 'Block must be padded by blank lines.',
    never: 'Block must not be padded by blank lines.'
  };

  private formatOptions(ruleArguments: any[]): ITerPaddedBlocksOptions {
    const config = ruleArguments[0] || OPTION_ALWAYS;

    if (config === OPTION_ALWAYS) {
      return {
        blocks: true,
        classes: true,
        switches: true
      };
    } else {
      return {
        blocks: config['blocks'] === OPTION_ALWAYS,
        classes: config['classes'] === OPTION_ALWAYS,
        switches: config['switches'] === OPTION_ALWAYS
      };
    }
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const opt = this.formatOptions(this.ruleArguments);
    const walker = new RuleWalker(sourceFile, this.ruleName, opt);
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.AbstractWalker<ITerPaddedBlocksOptions> {
  public walk(sourceFile: ts.SourceFile) {
    sourceFile.forEachChild(node => {
      if (ts.isIfStatement(node)) {
        this.checkStatement(node.thenStatement);
        if (node.elseStatement) this.checkStatement(node.elseStatement);
      }
    });
  }

  private checkStatement(statement: ts.Statement): void {
    const firstChild = statement.getChildren()[1];
    const lastChild = statement.getChildren()[statement.getChildCount() - 2];

    const openBrace = this.sourceFile.getLineAndCharacterOfPosition(statement.getStart()).line;
    const firstToken = firstChild && this.sourceFile.getLineAndCharacterOfPosition(firstChild.getStart()).line;
    const lastToken = lastChild && this.sourceFile.getLineAndCharacterOfPosition(lastChild.getStart()).line;
    const closeBrace = this.sourceFile.getLineAndCharacterOfPosition(statement.getEnd() - 1).line;

    // tslint:disable triple-equals
    const openPadded = openBrace !== firstToken && (firstToken == undefined || (firstToken - 1) !== openBrace);
    const closePadded = closeBrace !== lastToken && (lastToken == undefined || (lastToken + 1) !== closeBrace);
    // tslint:enable triple-equals

    if (openPadded === closePadded) {
      if (this.options.blocks && !openPadded) {
        this.addFailure(statement.getStart(), statement.getEnd() - 1, Rule.FAILURE_STRING.always);
      } else if (!this.options.blocks && openPadded) {
        this.addFailure(statement.getStart(), statement.getEnd() - 1, Rule.FAILURE_STRING.never);
      }
    } else {
      if (this.options.blocks ? !openPadded : openPadded) {
        this.addFailure(statement.getStart(), (firstChild || statement).getStart(), this.options.blocks ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never);
      } else if (this.options.blocks ? !closePadded : closePadded) {
        this.addFailure(lastChild ? lastChild.getStart() : (statement.getEnd() - 1), statement.getEnd() - 1, this.options.blocks ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never);
      }
    }
  }
}
