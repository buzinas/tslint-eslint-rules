import * as ts from 'typescript';
import * as Lint from 'tslint';

const OPTION_ALWAYS = 'always';
const RULE_NAME = 'array-bracket-spacing';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'enforce consistent spacing inside array brackets',
    rationale: Lint.Utils.dedent`
      A number of style guides require or disallow spaces between array brackets and other tokens.
      This rule applies to both array literals and destructuring assignments (ECMAScript 6).
      `,
    optionsDescription: Lint.Utils.dedent`
      The rule takes one or two options. The first is a string, which can be:

      - \`"never"\` (default) disallows spaces inside array brackets
      - \`"always"\`requires one or more spaces or newlines inside array brackets

      The second option is an object for exceptions to the \`"never"\` option:

      - \`"singleValue": true\` requires one or more spaces or newlines inside brackets of array
                                literals that contain a single element
      - \`"objectsInArrays": true\` requires one or more spaces or newlines between brackets of
                                    array literals and braces of their object literal elements
                                    \`[ {\` or \`} ]\`
      - \`"arraysInArrays": true\` requires one or more spaces or newlines between brackets of
                                   array literals and brackets of their array literal elements
                                   \`[ [\` or \`] ]\`

      When using the \`"always"\` option the second option takes on these exceptions:

      - \`"singleValue": false\` disallows spaces inside brackets of array literals that contain a
                                 single element
      - \`"objectsInArrays": false\` disallows spaces between brackets of array literals and braces
                                     of their object literal elements \`[ {\` or \`} ]\`
      - \`"arraysInArrays": false\` disallows spaces between brackets of array literals and brackets
                                    of their array literal elements \`[ [\` or \`] ]\`

      This rule has build-in exceptions:

      - \`"never"\` (and also the exceptions to the \`"always"\` option) allows newlines inside
                    array brackets, because this is a common pattern
      - \`"always"\` does not require spaces or newlines in empty array literals \`[]\`
      `,
    options: {
      anyOf: [
        {
          type: 'array',
          items: [
            {
              enum: ['always', 'never']
            }
          ],
          minItems: 0,
          maxItems: 1
        },
        {
          type: 'object',
          properties: {
            singleValue: {
              type: 'boolean'
            },
            objectsInArrays: {
              type: 'boolean'
            },
            arraysInArrays: {
              type: 'boolean'
            }
          },
          additionalProperties: false
        }

      ]
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "always"]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "never"]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "never", {
          "arraysInArrays": true
        }]
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new ArrayBracketSpacingWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class ArrayBracketSpacingWalker extends Lint.RuleWalker {
  private spaced: boolean;
  private singleValueException: boolean = false;
  private objectsInArraysException: boolean = false;
  private arraysInArraysException: boolean = false;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const ruleOptions = this.getOptions();
    this.spaced = this.hasOption(OPTION_ALWAYS) || (ruleOptions && ruleOptions.length === 0);

    const opt = ruleOptions[1];
    const isDef = (x: any) => typeof x !== 'undefined';
    if (opt) {
      this.singleValueException = isDef(opt.singleValue) && opt.singleValue !== this.spaced;
      this.objectsInArraysException = isDef(opt.objectsInArrays) && opt.objectsInArrays !== this.spaced;
      this.arraysInArraysException = isDef(opt.arraysInArrays) && opt.arraysInArrays !== this.spaced;
    }
  }

  private report(start: number, msg: string, fix: Lint.Fix): void {
    this.addFailure(this.createFailure(start, 1, msg, fix));
  }

  private reportNoBeginningSpace(token: ts.Node, space: number) {
    const start = token.getStart(this.getSourceFile());
    const fix = Lint.Replacement.deleteText(start + 1, space);
    this.report(start, 'There should be no space after "["', fix);
  }

  private reportRequiredBeginningSpace(token: ts.Node) {
    const start = token.getStart(this.getSourceFile());
    const fix = Lint.Replacement.appendText(start + 1, ' ');
    this.report(start, 'A space is required after "["', fix);
  }

  private reportRequiredEndingSpace(token: ts.Node) {
    const start = token.getStart(this.getSourceFile());
    const fix = Lint.Replacement.appendText(start, ' ');
    this.report(start, 'A space is required before "]"', fix);
  }

  private reportNoEndingSpace(token: ts.Node, space: number) {
    const start = token.getStart(this.getSourceFile());
    const fix = Lint.Replacement.deleteText(start - space, space);
    this.report(start, 'There should be no space before "]"', fix);
  }

  protected visitNode(node: ts.Node): void {
    if (node.kind === ts.SyntaxKind.ArrayBindingPattern) {
      this.validateArraySpacing(node, (node as ts.ArrayBindingPattern).elements);
    }
    super.visitNode(node);
  }

  protected visitArrayLiteralExpression(node: ts.ArrayLiteralExpression): void {
    this.validateArraySpacing(node, node.elements);
    super.visitArrayLiteralExpression(node);
  }

  private isObjectType(node: ts.Node): boolean {
    return node && node.kind === ts.SyntaxKind.ObjectLiteralExpression;
  }

  private isArrayType(node: ts.Node): boolean {
    if (node) {
      if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
        return true;
      }
      const firstChild = node.getChildAt(0);
      if (firstChild && firstChild.kind === ts.SyntaxKind.ArrayBindingPattern) {
        return true;
      }
    }
    return false;
  }

  private validateArraySpacing(node: ts.Node, elements: ts.NodeArray<ts.Node>): void {
    if (this.spaced && elements.length === 0) {
      return;
    }

    // An array only contains 3 children: `[`, `SyntaxList`, `]`
    const first = node.getChildAt(0);
    const last = node.getChildAt(2);
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];
    let second = firstElement || last;
    let penultimate: ts.TextRange = lastElement || first;

    if (second.pos === second.end) {
      // Special case when we skip the first element. This is to make the second token be the
      // CommaToken which is contained in the SyntaxList
      second = node.getChildAt(1).getChildAt(1);
    }

    if (elements.hasTrailingComma) {
      // Making sure that the penultimate marks the trailing comma and not the element before
      // the trailing comma
      penultimate = elements;
    }

    const mustBeSpaced = (token: ts.Node): boolean => (
      this.singleValueException && elements.length === 1 ||
      this.objectsInArraysException && this.isObjectType(token) ||
      this.arraysInArraysException && this.isArrayType(token)
    ) ? !this.spaced : this.spaced;

    const openingBracketMustBeSpaced = mustBeSpaced(firstElement);
    const closingBracketMustBeSpaced = mustBeSpaced(lastElement);

    const spaceAfterOpeningBracket = this.getSpaceBetween(first, second, false);
    const isBreakAfterOpeningBracket = this.isLineBreakBetween(first, second);
    const spaceBeforeClosingBracket = this.getSpaceBetween(penultimate, last, true);
    const isBreakBeforeClosingBracket = this.isLineBreakBetween(penultimate, last);

    if (!isBreakAfterOpeningBracket) {
      if (openingBracketMustBeSpaced && !spaceAfterOpeningBracket) {
        this.reportRequiredBeginningSpace(first);
      } else if (!openingBracketMustBeSpaced && spaceAfterOpeningBracket) {
        this.reportNoBeginningSpace(first, spaceAfterOpeningBracket);
      }
    }

    if (first !== penultimate && !isBreakBeforeClosingBracket) {
      if (closingBracketMustBeSpaced && !spaceBeforeClosingBracket) {
        this.reportRequiredEndingSpace(last);
      } else if (!closingBracketMustBeSpaced && spaceBeforeClosingBracket) {
        this.reportNoEndingSpace(last, spaceBeforeClosingBracket);
      }
    }
  }

  // space/line break detection helpers
  private getSpaceBetween(node: ts.TextRange, nextNode: ts.Node, trailing: boolean): number {
    const end = nextNode.getStart(this.getSourceFile());
    const start = node.end;
    const text = this.getSourceFile().text.substring(start, end);
    const m = text.match(/\/\*.*\*\//);
    if (m && typeof m.index === 'number') {
      const len = m[0].length;
      return trailing ? end - (start + m.index + len) : m.index;
    }
    return end - start;
  }

  private isLineBreakBetween(node: ts.TextRange, nextNode: ts.Node): boolean {
    return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
  }

  private getStartPosition(node: ts.Node) {
    const srcFile = this.getSourceFile();
    return srcFile.getLineAndCharacterOfPosition(node.getStart(srcFile));
  }

  private getEndPosition(node: ts.TextRange) {
    return this.getSourceFile().getLineAndCharacterOfPosition(node.end);
  }
}
