import * as ts from 'typescript';
import * as Lint from 'tslint';

import {forEachComment} from 'tsutils';

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
        this.checkPadding(node.thenStatement);
        if (node.elseStatement) this.checkPadding(node.elseStatement);
      } else if (ts.isClassDeclaration(node) || ts.isSwitchStatement(node) || ts.isBlock(node)) {
        this.checkPadding(node);
      }
    });
  }

  private getParts(node: ts.Node): { openBrace: ts.Node, body: ts.Node, closeBrace: ts.Node } {
    let openBrace: ts.Node, body: ts.Node, closeBrace: ts.Node;

    node.getChildren().forEach(child => {
      if (child.kind === ts.SyntaxKind.OpenBraceToken) {
        openBrace = child;
      } else if (child.kind === ts.SyntaxKind.SyntaxList) {
        body = child;
      } else if (child.kind === ts.SyntaxKind.CloseBraceToken) {
        closeBrace = child;
      }
    });

    return {
      openBrace: openBrace!,
      body: body!,
      closeBrace: closeBrace!
    };
  }

  private checkPadding(node: ts.Node): void {
    const {openBrace, body, closeBrace} = this.getParts(node);

    const firstChild = body.getChildAt(0);
    const lastChild = body.getChildAt(body.getChildCount() - 1);

    const openPosition = openBrace.getStart();
    const closePosition = closeBrace.getEnd();
    let firstChildPosition = firstChild && firstChild.getStart();
    let lastChildPosition = lastChild && lastChild.getEnd();
    const openLine = this.sourceFile.getLineAndCharacterOfPosition(openPosition).line;
    const closeLine = this.sourceFile.getLineAndCharacterOfPosition(closePosition).line;
    let firstChildLine = firstChild && this.sourceFile.getLineAndCharacterOfPosition(firstChildPosition).line;
    let lastChildLine = lastChild && this.sourceFile.getLineAndCharacterOfPosition(lastChildPosition).line;

    const comments: ts.CommentRange[] = [];
    forEachComment(node, (_fullText, comment) => {
      comments.push(comment);
    });

    if (comments.length > 0) {
      const firstCommentLine = this.sourceFile.getLineAndCharacterOfPosition(comments[0].pos).line;
      const lastCommentLine = this.sourceFile.getLineAndCharacterOfPosition(comments[comments.length - 1].end).line;

      // tslint:disable-next-line triple-equals
      if (firstChildLine == undefined || firstCommentLine < firstChildLine) {
        firstChildLine = firstCommentLine;
        firstChildPosition = comments[0].pos;
      }

      // tslint:disable-next-line triple-equals
      if (lastChildLine == undefined || lastChildLine < lastChildLine) {
        lastChildLine = lastCommentLine;
        lastChildPosition = comments[comments.length - 1].end;
      }
    }

    // tslint:disable triple-equals
    const openPadded = openLine !== firstChildLine && (firstChildLine == undefined ? (closeLine - openLine > 1) : (firstChildLine! - 1) !== openLine);
    const closePadded = closeLine !== lastChildLine && (lastChildLine == undefined ? (closeLine - openLine > 1) : (lastChildLine! + 1) !== closeLine);
    // tslint:enable triple-equals

    // this.sourceFile.getText().split('\n').forEach((line, i) => console.log(`${i}| ${line}`));
    // console.log(openLine);
    // console.log(firstChildLine);
    // console.log(lastChildLine);
    // console.log(closeLine);
    // console.log(openPadded);
    // console.log(closePadded);
    // console.log('--');

    if (openPadded === closePadded) {
      if (this.options.blocks && !openPadded) {
        this.addFailure(openPosition, closePosition, Rule.FAILURE_STRING.always);
      } else if (!this.options.blocks && openPadded) {
        this.addFailure(openPosition, closePosition, Rule.FAILURE_STRING.never);
      }
    } else {
      // tslint:disable triple-equals
      if (this.options.blocks ? !openPadded : openPadded) {
        this.addFailure(openPosition, firstChildPosition != undefined ? firstChildPosition : closePosition, this.options.blocks ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never);
      } else if (this.options.blocks ? !closePadded : closePadded) {
        this.addFailure(lastChildPosition != undefined ? lastChildPosition : closePosition, closePosition - 1, this.options.blocks ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never);
      }
      // tslint:enable triple-equals
    }
  }
}
