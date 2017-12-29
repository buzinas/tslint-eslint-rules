import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME: string = 'ter-newline-after-var';

interface ITerNewlineAfterVarOptions {
  always: boolean;
}

const EXPECTED_BLANK_LINE_MESSAGE: string = 'Expected blank line after variable declarations.';
const UNEXPECTED_BLANK_LINE_MESSAGE: string = 'Unexpected blank line after variable declarations.';
const UNKNOWN_POSITION: number = -1;

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: true,
    description: 'require or disallow an empty line after variable declarations',
    rationale: Lint.Utils.dedent`
      This rule enforces a coding style where empty lines are required or disallowed after \`var\`, \`let\`, or \`const\`
      statements to achieve a consistent coding style across the project.
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule has a string option:

      * \`"always"\` (default) requires an empty line after \`var\`, \`let\`, or \`const\`.
        Comments on a line directly after var statements are treated like additional var statements.
      * \`"never"\` disallows empty lines after \`var\`, \`let\`, or \`const\`.
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

  private formatOptions ([alwaysOrNever]: string[]): ITerNewlineAfterVarOptions {
    return {
      always: alwaysOrNever !== 'never'
    };
  }

  public apply (sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const opt = this.formatOptions(this.ruleArguments);
    const walker = new RuleWalker(sourceFile, this.ruleName, opt);
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.AbstractWalker<ITerNewlineAfterVarOptions> {
  // last variable statement node
  private lastVariableStatementNode: ts.Node|undefined;
  private sourceFileText: string;

  private getTrailingLineBreakPosInText (text: string, { pos, end }: { pos: number; end: number; }): number {
    let firstLineBreakPos: number = UNKNOWN_POSITION;
    let lineBreaksCount: number = 0;

    for (let i = pos; i < end; i++) {
      const code: number = text.charCodeAt(i);

      if (code === 10) {
        if (firstLineBreakPos === UNKNOWN_POSITION) {
          firstLineBreakPos = i;
        }

        lineBreaksCount++;
      } else if (code !== 9 && code !== 13 && code !== 32) {
        break;
      }
    }

    return lineBreaksCount > 1 ? firstLineBreakPos : UNKNOWN_POSITION;
  }

  private getTrailingLineBreakPos ({ pos, end }: ts.Node): number {
    const nodeText: string = this.sourceFileText.slice(pos, end);
    const nodeTextLength: number = end - pos;
    let trailingLineBreakPos: number = this.getTrailingLineBreakPosInText(nodeText, {
      pos: 0,
      end: nodeTextLength
    });

    if (trailingLineBreakPos !== UNKNOWN_POSITION) {
      return pos + trailingLineBreakPos;
    }

    const leadingComments: ts.CommentRange[]|undefined = ts.getLeadingCommentRanges(nodeText, 0);
    const lastLeadingComment: ts.CommentRange|undefined = leadingComments && leadingComments.pop();

    if (lastLeadingComment) {
      const textStart = lastLeadingComment.end;

      trailingLineBreakPos = this.getTrailingLineBreakPosInText(nodeText, {
        pos: textStart,
        end: nodeTextLength
      });

      if (trailingLineBreakPos !== UNKNOWN_POSITION) {
        return pos + trailingLineBreakPos;
      }
    }

    return UNKNOWN_POSITION;
  }

  public walk (sourceFile: ts.SourceFile) {
    this.sourceFileText = sourceFile.getFullText();

    const onNode = (node: ts.Node): void => {
      const { lastVariableStatementNode } = this;

      // save the variable statement
      if (node.kind === ts.SyntaxKind.VariableStatement) {
        this.lastVariableStatementNode = node;
        return;
      }

      if (node.kind === ts.SyntaxKind.EndOfFileToken) {
        this.lastVariableStatementNode = undefined;
        return;
      }

      if (lastVariableStatementNode) {
        const trailingLineBreakPos: number = this.getTrailingLineBreakPos(node);
        const hasTrailingLineBreak: boolean = trailingLineBreakPos !== UNKNOWN_POSITION;

        if (this.options.always) {
          // check if a blank line is missing
          if (!hasTrailingLineBreak) {
            // add the an empty line after previous node
            this.addFailureAt(
              lastVariableStatementNode.getStart(),
              1,
              EXPECTED_BLANK_LINE_MESSAGE,
              Lint.Replacement.appendText(node.getStart(), '\n')
            );
          }
        } else if (hasTrailingLineBreak) {
          // check if a blank line exists
          this.addFailureAt(
            lastVariableStatementNode.getStart(),
            1,
            UNEXPECTED_BLANK_LINE_MESSAGE,
            Lint.Replacement.deleteText(trailingLineBreakPos, 1)
          );
        }

        this.lastVariableStatementNode = undefined;
      }

      return ts.forEachChild(node, onNode);
    };

    return ts.forEachChild(sourceFile, onNode);
  }
}
