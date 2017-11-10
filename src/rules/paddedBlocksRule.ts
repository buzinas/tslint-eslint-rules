import * as ts from 'typescript';
import * as Lint from 'tslint';

import { forEachComment } from 'tsutils';

const RULE_NAME = 'padded-blocks';
const OPTION_ALWAYS = 'always';
interface ITerPaddedBlocksOptions {
  blocks?: boolean;
  switches?: boolean;
  classes?: boolean;
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
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

    if (typeof(config) === 'string') {
      const always = config === OPTION_ALWAYS;

      return {
        blocks: always,
        classes: always,
        switches: always
      };
    } else {
      return {
        blocks: config['blocks'] && config['blocks'] === OPTION_ALWAYS,
        classes: config['classes'] && config['classes'] === OPTION_ALWAYS,
        switches: config['switches'] && config['switches'] === OPTION_ALWAYS
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
    sourceFile.forEachChild(node => this.processNode(node));
  }

  private processNode(node: ts.Node): void {
    switch (node.kind) {
      case ts.SyntaxKind.Block:
      case ts.SyntaxKind.ClassDeclaration:
      case ts.SyntaxKind.CaseBlock:
        this.checkPadding(node);
    }

    node.forEachChild(child => this.processNode(child));
  }

  private getParts(node: ts.Node): { openBrace: ts.Node, body: ts.Node, closeBrace: ts.Node } {
    let openBrace: ts.Node, body: ts.Node, closeBrace: ts.Node;

    node.getChildren().forEach((child) => {
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
    let paddingAllowed = this.options.blocks;

    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      paddingAllowed = this.options.classes;
    } else if (node.parent && node.parent.kind === ts.SyntaxKind.SwitchStatement) {
      paddingAllowed = this.options.switches;
    }

    // tslint:disable-next-line triple-equals
    if (paddingAllowed == undefined) {
      return;
    }

    const { openBrace, body, closeBrace } = this.getParts(node);

    const firstChild = body.getChildAt(0);
    let firstChildPosition = firstChild && firstChild.getStart();
    let firstChildLine = firstChild && this.sourceFile.getLineAndCharacterOfPosition(firstChildPosition).line;

    const lastChild = body.getChildAt(body.getChildCount() - 1);
    let lastChildPosition = lastChild && lastChild.getEnd();
    let lastChildLine = lastChild && this.sourceFile.getLineAndCharacterOfPosition(lastChildPosition).line;

    let openPosition = openBrace.getStart();
    let openLine = this.sourceFile.getLineAndCharacterOfPosition(openPosition).line;

    let closePosition = closeBrace.getEnd();
    let closeLine = this.sourceFile.getLineAndCharacterOfPosition(closePosition).line;

    let comments: ts.CommentRange[] = [];
    forEachComment(node, (_fullText, comment) => {
      comments.push(comment);
    });

    // Ignore comments attached to start
    let splice: number | undefined;
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const line = this.sourceFile.getLineAndCharacterOfPosition(comment.pos).line;

      if (line === openLine || (line === openLine + 1 && line !== firstChildLine)) {
        openPosition = comment.pos;
        openLine = line;
        splice = i;
      } else {
        break;
      }
    }

    if (splice !== undefined) {
      comments = comments.splice(splice + 1);
    }

    // Ignore comments attached to end
    splice = undefined;
    for (let i = comments.length - 1; i >= 0; i--) {
      const comment = comments[i];
      const line = this.sourceFile.getLineAndCharacterOfPosition(comment.pos).line;

      if (line === closeLine || (line === closeLine - 1 && line !== lastChildLine)) {
        closePosition = comment.end;
        closeLine = line;
        splice = i;
      } else {
        break;
      }
    }

    if (splice !== undefined) {
      comments = comments.slice(0, splice);
    }

    if (comments.length > 0) {
      const firstCommentLine = this.sourceFile.getLineAndCharacterOfPosition(comments[0].pos).line;
      const lastCommentLine = this.sourceFile.getLineAndCharacterOfPosition(comments[comments.length - 1].end).line;

      // tslint:disable-next-line triple-equals
      if (firstChildLine == undefined || firstCommentLine < firstChildLine) {
        firstChildLine = firstCommentLine;
        firstChildPosition = comments[0].pos;
      }

      // tslint:disable-next-line triple-equals
      if (lastChildLine == undefined || lastCommentLine > lastChildLine) {
        lastChildLine = lastCommentLine;
        lastChildPosition = comments[comments.length - 1].end;
      }
    }

    // Ignore empty blocks
    // tslint:disable-next-line triple-equals
    if (openLine === closeLine && firstChildLine == undefined && lastChildLine == undefined) {
      return;
    }

    // tslint:disable triple-equals
    const openPadded = openLine !== firstChildLine && (firstChildLine == undefined ? (closeLine - openLine > 1) : (firstChildLine! - 1) !== openLine);
    const closePadded = closeLine !== lastChildLine && (lastChildLine == undefined ? (closeLine - openLine > 1) : (lastChildLine! + 1) !== closeLine);
    // tslint:enable triple-equals

    if (openPadded === closePadded) {
      if (paddingAllowed && !openPadded) {
        this.addFailure(openPosition, closePosition, Rule.FAILURE_STRING.always);
      } else if (!paddingAllowed && openPadded) {
        this.addFailure(openPosition, closePosition, Rule.FAILURE_STRING.never);
      }
    } else {
      // tslint:disable triple-equals
      if (paddingAllowed ? !openPadded : openPadded) {
        this.addFailure(
          openPosition,
          firstChildPosition != undefined ?
            firstChildPosition :
            closePosition,
          paddingAllowed ?
            Rule.FAILURE_STRING.always :
            Rule.FAILURE_STRING.never
        );
      } else if (paddingAllowed ? !closePadded : closePadded) {
        this.addFailure(
          lastChildPosition != undefined ?
            lastChildPosition :
            closePosition,
          closePosition - 1,
          paddingAllowed ?
            Rule.FAILURE_STRING.always :
            Rule.FAILURE_STRING.never
        );
      }
      // tslint:enable triple-equals
    }
  }
}
