import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME: string = 'ter-newline-after-var';
const EXPECTED_BLANK_LINE_MESSAGE: string = 'Expected blank line after variable declarations.';
const UNEXPECTED_BLANK_LINE_MESSAGE: string = 'Unexpected blank line after variable declarations.';
const enum SymbolCodes {
  TAB = 9,
  NEWLINE = 10,
  CARRIAGE_RETURN = 13,
  WHITESPACE = 32
}
const enum Symbols {
  NEWLINE = '\n'
}

interface ITerNewlineAfterVarOptions {
  always: boolean;
}

function formatOptions ([alwaysOrNever]: string[]): ITerNewlineAfterVarOptions {
  return {
    always: alwaysOrNever !== 'never'
  };
}

function getNextSiblingNode (node: ts.Node): ts.Node|void {
  let breakOnSibling: boolean = false;

  return ts.forEachChild(node.parent, (sibling: ts.Node): ts.Node|void => {
    if (breakOnSibling) {

      // stop looking for a next node
      return sibling;
    }

    breakOnSibling = sibling === node;
  });
}

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

  public apply (sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const opt = formatOptions(this.ruleArguments);
    const walker = new RuleWalker(sourceFile, this.ruleName, opt);

    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.AbstractWalker<ITerNewlineAfterVarOptions> {
  public walk (sourceFile: ts.SourceFile) {
    const isNewLineAlwaysRequired: boolean = this.options.always;
    const sourceFileText: string = sourceFile.getFullText();
    const onNode = (node: ts.Node): ts.Node|void => {
      if (node.kind === ts.SyntaxKind.VariableStatement) {
        const nextSibling: ts.Node|void = getNextSiblingNode(node);
        const nextSiblingKind: number|void = nextSibling && nextSibling.kind;

        if (
          !(isNewLineAlwaysRequired && nextSiblingKind === ts.SyntaxKind.VariableStatement) &&

          // prevent a conflict with "eofline" rule
          !(nextSibling && nextSiblingKind === ts.SyntaxKind.EndOfFileToken)
        ) {
          const isNewLineRequired: boolean = isNewLineAlwaysRequired && nextSiblingKind !== ts.SyntaxKind.VariableStatement;
          const unexpectedLineFixes: Lint.Replacement[] = [];
          const expectedLineFixes: Lint.Replacement[] = [];
          const parentNodeEnd: number = node.parent.end;
          const nodeEnd: number = node.end;
          const trailingComments: ts.CommentRange[]|undefined = ts.getTrailingCommentRanges(
            sourceFileText.slice(nodeEnd, parentNodeEnd),
            0
          );
          const lastTrailingComment: ts.CommentRange|undefined = trailingComments && trailingComments.pop();
          const newLinesSearchStart: number = lastTrailingComment
            ? nodeEnd + lastTrailingComment.end
            : nextSibling
              ? nextSibling.pos
              : node.end;
          const newLinesSearchEnd: number = nextSibling ? nextSibling.getStart() : parentNodeEnd;
          let expectedLinePos: number = newLinesSearchStart;
          let newLinesCount: number = 0;

          if (isNewLineRequired && newLinesSearchStart === newLinesSearchEnd) {
            expectedLineFixes.push(Lint.Replacement.appendText(expectedLinePos, Symbols.NEWLINE));
          }

          for (let i = newLinesSearchStart; i <= newLinesSearchEnd; i++) {
            const code: number = sourceFileText.charCodeAt(i);

            if (code === SymbolCodes.NEWLINE) {
              newLinesCount++;

              if (!isNewLineRequired && newLinesCount > 1) {
                unexpectedLineFixes.push(Lint.Replacement.deleteText(i, 1));
              }
            } else if (
              code !== SymbolCodes.TAB &&
              code !== SymbolCodes.CARRIAGE_RETURN &&
              code !== SymbolCodes.WHITESPACE
            ) {
              const leadingComments: ts.CommentRange[]|undefined = ts.getLeadingCommentRanges(
                `\n${ sourceFileText.slice(i, newLinesSearchEnd) }`,
                0
              );
              const lastLeadingComment: ts.CommentRange|undefined = leadingComments && leadingComments.pop();

              if (lastLeadingComment && (!isNewLineRequired || (isNewLineRequired && newLinesCount < 2))) {
                newLinesCount = 0;
                expectedLinePos = i - 1 + lastLeadingComment.end;
                i = expectedLinePos - 1;
              } else {
                if (isNewLineRequired && newLinesCount < 2) {
                  expectedLineFixes.push(Lint.Replacement.appendText(expectedLinePos, Symbols.NEWLINE));
                }

                break;
              }
            }
          }

          if (isNewLineRequired && expectedLineFixes[0]) {
            // add the an empty line after previous node
            this.addFailureAt(
              node.getStart(),
              1,
              EXPECTED_BLANK_LINE_MESSAGE,
              expectedLineFixes
            );
          } else if (unexpectedLineFixes[0]) {
            this.addFailureAt(
              node.getStart(),
              1,
              UNEXPECTED_BLANK_LINE_MESSAGE,
              unexpectedLineFixes
            );
          }
        }
      }

      ts.forEachChild(node, onNode);
    };

    ts.forEachChild(sourceFile, onNode);
  }
}
