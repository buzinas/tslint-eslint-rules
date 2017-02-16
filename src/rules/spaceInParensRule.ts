import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'space-in-parens';
const ALWAYS = 'always';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'require or disallow spaces inside parentheses',
    rationale: Lint.Utils.dedent`
      This rule will enforce consistency of spacing directly inside of parentheses,
      by disallowing or requiring one or more spaces to the right of (and to the
      left of). In either case, () will still be allowed. 
      `,
    optionsDescription: Lint.Utils.dedent`
      There are two options for this rule:

      - \`"never"\` (default) enforces zero spaces inside of parentheses
      - \`"always"\` enforces a space inside of parentheses

      Depending on your coding conventions, you can choose either option by specifying
      it in your configuration.
      `,
    options: {
      type: 'array',
      items: [
        {
          enum: ['always', 'never']
        },
        {
          type: 'object',
          properties: {
            exceptions: {
              type: 'array',
              items: [
                {
                  enum: ['{}', '[]', '()', 'empty']
                }
              ],
              uniqueItems: true
            }
          },
          additionalProperties: false
        }
      ],
      minItems: 0,
      maxItems: 2
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "always"]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "never"]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "always", { "exceptions": [ "{}", "[]", "()", "empty" ] }]
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  public static MISSING_SPACE_MESSAGE = 'there must be a space inside this paren.';
  public static REJECTED_SPACE_MESSAGE = 'there should be no spaces inside this paren.';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new SpaceInParensWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class SpaceInParensWalker extends Lint.RuleWalker {
  private spaced: boolean;
  private exceptionsArrayOptions = [];
  private braceException: boolean;
  private bracketException: boolean;
  private parenException: boolean;
  private empty: boolean;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const ruleOptions = this.getOptions();
    this.spaced = this.hasOption(ALWAYS) || (ruleOptions && ruleOptions.length === 0);

    if (ruleOptions[1]) {
      this.exceptionsArrayOptions = (ruleOptions.length === 2) ? ruleOptions[1].exceptions : [] ;
      if (this.exceptionsArrayOptions.length) {
        this.braceException = this.exceptionsArrayOptions.indexOf('{}') !== -1;
        this.bracketException = this.exceptionsArrayOptions.indexOf('[]') !== -1;
        this.parenException = this.exceptionsArrayOptions.indexOf('()') !== -1;
        this.empty = this.exceptionsArrayOptions.indexOf('empty') !== -1;
      }
    }
  }

  private getExceptions() {
    const openers = [];
    const closers = [];

    if (this.braceException) {
      openers.push(ts.SyntaxKind.OpenBraceToken);
      closers.push(ts.SyntaxKind.CloseBraceToken);
    }

    if (this.bracketException) {
      openers.push(ts.SyntaxKind.OpenBracketToken);
      closers.push(ts.SyntaxKind.CloseBracketToken);
    }

    if (this.parenException) {
      openers.push(ts.SyntaxKind.OpenParenToken);
      closers.push(ts.SyntaxKind.CloseParenToken);
    }

    if (this.empty) {
      openers.push(ts.SyntaxKind.CloseParenToken);
      closers.push(ts.SyntaxKind.OpenParenToken);
    }

    return {
      openers,
      closers
    };
  }

  protected findParenNodes(node: ts.Node): ts.Node[] {
    const children = node.getChildren();
    let first: ts.Node;
    let second: ts.Node;
    let penultimate: ts.Node;
    let last: ts.Node;
    for (let i = 0; i < children.length; i++) {
      if (children[i].kind === ts.SyntaxKind.OpenParenToken) {
        first = children[i];
        second = children[i + 1];
      }
      if (children[i].kind === ts.SyntaxKind.CloseParenToken) {
        penultimate = children[i - 1];
        last = children[i];
      }
    }
    return [ first, second, penultimate, last ];
  }

  protected visitNode(node: ts.Node): void {
    const parenNodes = this.findParenNodes(node);
    this.checkParanSpace(parenNodes[0], parenNodes[1], parenNodes[2], parenNodes[3]);
    super.visitNode(node);
  }

  private checkParanSpace(first: ts.Node, second: ts.Node, penultimate: ts.Node, last: ts.Node) {
    if (!first && !second && !penultimate && !last) return;

    if (this.shouldOpenerHaveSpace(first, second)) {
      const fix = this.createFix(this.appendText(first.getEnd(), ' '));
      this.addFailure(this.createFailure(first.getEnd(), 0, Rule.MISSING_SPACE_MESSAGE, fix));
    }
    if (this.shouldOpenerRejectSpace(first, second)) {
      const width = second.getStart() - first.getEnd();
      const fix = this.createFix(this.deleteText(first.getEnd(), width));
      this.addFailure(this.createFailure(first.getEnd(), 0, Rule.REJECTED_SPACE_MESSAGE, fix));
    }
    if (this.shouldCloserHaveSpace(penultimate, last)) {
      const fix = this.createFix(this.appendText(penultimate.getEnd(), ' '));
      this.addFailure(this.createFailure(last.getStart(), 0, Rule.MISSING_SPACE_MESSAGE, fix));
    }
    if (this.shouldCloserRejectSpace(penultimate, last)) {
      const width = last.getStart() - penultimate.getEnd();
      const fix = this.createFix(this.deleteText(penultimate.getEnd(), width));
      this.addFailure(this.createFailure(last.getStart(), 0, Rule.REJECTED_SPACE_MESSAGE, fix));
    }
  }

  private shouldOpenerHaveSpace(left: ts.Node, right: ts.Node) {
    if (this.isSpaceBetween(left, right)) return false;
    if (this.spaced) {
      if (right.getText().trim() === '') return false;
      return !this.isOpenerException(right.getFirstToken());
    }
    return this.isOpenerException(right.getFirstToken());
  }

  protected shouldCloserHaveSpace(left: ts.Node, right: ts.Node) {
    if (left.getText().trim() === '') return false;
    if (this.isSpaceBetween(left, right)) return false;
    if (this.spaced) return !this.isCloserException(left.getLastToken());
    return this.isCloserException(left.getLastToken());
  }

  private shouldOpenerRejectSpace(left: ts.Node, right: ts.Node) {
    if (right.getText().trim() === '') return false;
    if (this.isLineBreakBetween(left, right)) return false;
    if (!this.isSpaceBetween(left, right)) return false;
    if (this.spaced) return this.isOpenerException(right.getFirstToken());
    return !this.isOpenerException(right.getFirstToken());
  }

  private shouldCloserRejectSpace(left: ts.Node, right: ts.Node) {
    if (left.getText().trim() === '') return false;
    if (this.isLineBreakBetween(left, right)) return false;
    if (!this.isSpaceBetween(left, right)) return false;
    if (this.spaced) return this.isCloserException(left.getLastToken());
    return !this.isCloserException(left.getLastToken());
  }

  protected isOpenerException(token: ts.Node) {
    if (!token) return false;
    return this.getExceptions().openers.indexOf(token.kind) >= 0;
  }

  protected isCloserException(token: ts.Node) {
    if (!token) return false;
    return this.getExceptions().closers.indexOf(token.kind) >= 0;
  }

  // space/line break detection helpers
  private isSpaceBetween(node: ts.Node, nextNode: ts.Node): boolean {
    return nextNode.getStart() - node.getEnd() > 0;
  }

  private isLineBreakBetween(node: ts.Node, nextNode: ts.Node): boolean {
    return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
  }

  private getStartPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
  }

  private getEndPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
  }

}
