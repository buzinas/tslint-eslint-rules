import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME: string = 'ter-newline-after-var';

interface ITerNewlineAfterVarOptions {
  always: boolean;
}

const EXPECTED_BLANK_LINE_MESSAGE: string = 'Expected blank line after variable declarations.';
const UNEXPECTED_BLANK_LINE_MESSAGE: string = 'Unexpected blank line after variable declarations.';

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

  public walk (sourceFile: ts.SourceFile) {
    this.sourceFileText = sourceFile.getFullText();

    const onNode = (node: ts.Node): void => {
      const { lastVariableStatementNode, sourceFileText } = this;

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
        const trailingLineFixes: Lint.Replacement[] = [];
        const isNewLineRequired: boolean = this.options.always;
        const sourceTextStart: number = lastVariableStatementNode.end;
        const sourceText: string = sourceFileText.slice(sourceTextStart, node.end);
        const sourceTextLength: number = node.end - sourceTextStart;
        let newLinesCount: number = 0;
        let lastLeadingComment: ts.CommentRange|undefined;

        for (let i = 0; i < sourceTextLength; i++) {
          const code: number = sourceText.charCodeAt(i);

          if (code === 10) {
            newLinesCount++;

            if (!isNewLineRequired && newLinesCount > 1) {
              trailingLineFixes.push(Lint.Replacement.deleteText(sourceTextStart + i, 1));
            }
          } else if (code !== 9 && code !== 13 && code !== 32) {
            const leadingComments: ts.CommentRange[]|undefined = ts.getLeadingCommentRanges(sourceText, i - 1);

            lastLeadingComment = leadingComments && leadingComments.pop();

            if (lastLeadingComment && (!isNewLineRequired || (isNewLineRequired && newLinesCount <= 1))) {
              newLinesCount = 0;
              i = lastLeadingComment.end - 1;
            } else {
              break;
            }
          }
        }

        if (isNewLineRequired) {
          if (newLinesCount <= 1) {
            // add the an empty line after previous node
            this.addFailureAt(
              lastLeadingComment ? lastLeadingComment.end : lastVariableStatementNode.getStart(),
              1,
              EXPECTED_BLANK_LINE_MESSAGE,
              Lint.Replacement.appendText(node.getStart(), '\n')
            );
          }
        } else if (trailingLineFixes[0]) {
          this.addFailureAt(
            lastVariableStatementNode.getStart(),
            1,
            UNEXPECTED_BLANK_LINE_MESSAGE,
            trailingLineFixes
          );
        }

        this.lastVariableStatementNode = undefined;
      }

      return ts.forEachChild(node, onNode);
    };

    return ts.forEachChild(sourceFile, onNode);
  }
}
