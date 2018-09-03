import * as ts from 'typescript';
import * as Lint from 'tslint';

import { forEachComment } from 'tsutils';

const RULE_NAME = 'ter-padded-blocks';
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
    }

    return {
      blocks: config['blocks'] && config['blocks'] === OPTION_ALWAYS,
      classes: config['classes'] && config['classes'] === OPTION_ALWAYS,
      switches: config['switches'] && config['switches'] === OPTION_ALWAYS
    };
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const opt = this.formatOptions(this.ruleArguments);
    const walker = new RuleWalker(sourceFile, this.ruleName, opt);
    return this.applyWithWalker(walker);
  }
}

interface IBraceParts {
  openBrace: ts.Node;
  body: ts.Node;
  closeBrace: ts.Node;
}

interface IPositions {
  openPosition: number;
  openLine: number;
  firstChildPosition?: number;
  firstChildLine?: number;
  lastChildPosition?: number;
  lastChildLine?: number;
  closePosition: number;
  closeLine: number;
}

interface IReplace {
  from: number;
  to: number;
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

  private getParts(node: ts.Node): IBraceParts {
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

  private getPositions(node: ts.Node): IPositions {
    const { openBrace, body, closeBrace } = this.getParts(node);
    const firstChild = body.getChildAt(0);
    const lastChild = body.getChildAt(body.getChildCount() - 1);
    const positions: IPositions = {
      openPosition: openBrace.getStart(this.sourceFile),
      openLine: this.getLine(openBrace.getStart(this.sourceFile)),
      closePosition: closeBrace.getEnd(),
      closeLine: this.getLine(closeBrace.getEnd())
    };

    if (firstChild) {
      positions.firstChildPosition = firstChild.getStart(this.sourceFile);
      positions.firstChildLine = this.getLine(positions.firstChildPosition);
    }

    if (lastChild) {
      positions.lastChildPosition = lastChild.getEnd();
      positions.lastChildLine = this.getLine(positions.lastChildPosition);
    }

    return positions;
  }

  private checkPadding(node: ts.Node): void {
    let paddingAllowed = this.options.blocks;

    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      paddingAllowed = this.options.classes;
    } else if (node.parent && node.parent.kind === ts.SyntaxKind.SwitchStatement) {
      paddingAllowed = this.options.switches;
    }

    if (paddingAllowed === undefined) {
      return;
    }

    const positions = this.getPositions(node);
    const openBraceReplacement: IReplace = {
      from: positions.openPosition + 1,
      to: positions.firstChildPosition || positions.closePosition
    };
    const closeBraceReplacement: IReplace = {
      from: positions.lastChildPosition || positions.openPosition,
      to: positions.closePosition - 1
    };

    const comments: ts.CommentRange[] = [];
    forEachComment(node, (_fullText, comment) => {
      // Only using comments that are inside the body
      if (comment.pos > positions.openPosition && comment.pos < positions.closePosition) {
        const commentLineEnd = this.getLine(comment.end);
        if (commentLineEnd > positions.openLine) {
          comments.push(comment);
        } else if (commentLineEnd === positions.openLine) {
          openBraceReplacement.from = comment.end;
        }
      }
    });

    if (comments.length > 0) {
      const firstCommentLine = this.getLine(comments[0].pos);
      const lastCommentLine = this.getLine(comments[comments.length - 1].end);

      if (!positions.firstChildLine || firstCommentLine < positions.firstChildLine) {
        positions.firstChildLine = firstCommentLine;
        positions.firstChildPosition = comments[0].pos;
        openBraceReplacement.to = positions.firstChildPosition;
      }

      if (!positions.lastChildLine || lastCommentLine >= positions.lastChildLine) {
        positions.lastChildLine = lastCommentLine;
        positions.lastChildPosition = comments[comments.length - 1].end;
        closeBraceReplacement.from = positions.lastChildPosition;
      }
    }

    if (this.getLine(openBraceReplacement.from) !== this.getLine(openBraceReplacement.to)) {
      openBraceReplacement.to = this.getPosition(this.getLine(openBraceReplacement.to));
    }
    if (this.getLine(closeBraceReplacement.from) !== this.getLine(closeBraceReplacement.to)) {
      closeBraceReplacement.to = this.getPosition(this.getLine(closeBraceReplacement.to));
    }

    // Ignore empty blocks
    if (positions.firstChildLine === undefined && positions.lastChildLine === undefined) {
      return;
    }

    let openPadded = false;
    if (positions.firstChildLine !== undefined) {
      openPadded = positions.firstChildLine - positions.openLine > 1;
    } else {
      openPadded = positions.closeLine - positions.openLine > 1;
    }

    let closePadded = false;
    if (positions.lastChildLine !== undefined) {
      closePadded = positions.closeLine - positions.lastChildLine > 1;
    } else {
      closePadded = positions.closeLine - positions.openLine > 1;
    }

    if (paddingAllowed ? !openPadded : openPadded) {
      const openFix = Lint.Replacement.replaceFromTo(
        openBraceReplacement.from,
        openBraceReplacement.to,
        paddingAllowed ? '\n\n' : '\n'
      );
      this.addFailure(
        positions.openPosition,
        positions.openPosition + 1,
        paddingAllowed ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never,
        openFix
      );
    }
    if (paddingAllowed ? !closePadded : closePadded) {
      const closeFix = Lint.Replacement.replaceFromTo(
        closeBraceReplacement.from,
        closeBraceReplacement.to,
        paddingAllowed ? '\n\n' : '\n'
      );
      this.addFailure(
        positions.closePosition - 1,
        positions.closePosition,
        paddingAllowed ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never,
        closeFix
      );
    }
  }

  private getLine(pos: number): number {
    return this.sourceFile.getLineAndCharacterOfPosition(pos).line;
  }

  private getPosition(line: number): number {
    return this.sourceFile.getPositionOfLineAndCharacter(line, 0);
  }
}
