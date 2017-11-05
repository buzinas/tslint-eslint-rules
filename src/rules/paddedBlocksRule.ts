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
      } else if (ts.isClassDeclaration(node)) {
        this.checkClass(node);
      } else if (ts.isSwitchStatement(node)) {
        this.checkStatement(node);
      } else if (ts.isBlock(node)) {
        this.checkStatement(node);
      }
    });
  }

  private checkClass(classNode: ts.ClassDeclaration): void {
    const openBrace = classNode.getChildren().find(child => child.kind === ts.SyntaxKind.OpenBraceToken)!;
    const body = classNode.getChildren().find(child => child.kind === ts.SyntaxKind.SyntaxList);
    const closeBrace = classNode.getChildren().find(child => child.kind === ts.SyntaxKind.CloseBraceToken)!;

    this.checkPadding(openBrace.getStart(), closeBrace.getEnd(), body, body);
  }

  private checkStatement(statement: ts.Statement): void {
    const firstChild = statement.getChildren()[1];
    const lastChild = statement.getChildren()[statement.getChildCount() - 2];

    this.checkPadding(statement.getStart(), statement.getEnd(), firstChild, lastChild);
  }

  private checkPadding(openPosition: number, closePosition: number, firstChild: ts.Node | undefined, lastChild: ts.Node | undefined): void {
    const openLine = this.sourceFile.getLineAndCharacterOfPosition(openPosition).line;
    const closeLine = this.sourceFile.getLineAndCharacterOfPosition(closePosition).line;
    const firstChildLine = firstChild && this.sourceFile.getLineAndCharacterOfPosition(firstChild.getStart()).line;
    const lastChildLine = lastChild && this.sourceFile.getLineAndCharacterOfPosition(lastChild.getEnd()).line;

    // tslint:disable triple-equals
    const openPadded = openLine !== firstChildLine && (firstChild == undefined || (firstChildLine! - 1) !== openLine);
    const closePadded = closeLine !== lastChildLine && (lastChild == undefined || (lastChildLine! + 1) !== closeLine);
    // tslint:enable triple-equals

    if (openPadded === closePadded) {
      if (this.options.blocks && !openPadded) {
        this.addFailure(openPosition, closePosition, Rule.FAILURE_STRING.always);
      } else if (!this.options.blocks && openPadded) {
        this.addFailure(openPosition, closePosition, Rule.FAILURE_STRING.never);
      }
    } else {
      if (this.options.blocks ? !openPadded : openPadded) {
        this.addFailure(openPosition, firstChild ? firstChild.getStart() : closePosition, this.options.blocks ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never);
      } else if (this.options.blocks ? !closePadded : closePadded) {
        this.addFailure(lastChild ? lastChild.getEnd() : closePosition, closePosition - 1, this.options.blocks ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never);
      }
    }
  }
}
