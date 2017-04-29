import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-func-call-spacing';
const ALWAYS = 'always';

const MISSING_SPACE = 'Missing space between function name and paren.';
const UNEXPECTED_SPACE = 'Unexpected space between function name and paren.';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: true,
    description: 'require or disallow spacing between function identifiers and their invocations',
    rationale: Lint.Utils.dedent`
      This rule will enforce consistency of spacing in function calls,
      by disallowing or requiring one or more spaces before the open paren.
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule has a string option:

      * \`"never"\` (default) disallows space between the function name and the opening parenthesis.
      * \`"always"\` requires space between the function name and the opening parenthesis.

      Further, in \`"always"\` mode, a second object option is available that contains a single boolean \`allowNewlines\` property.
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
            allowNewlines: {
              type: 'boolean'
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
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "always"]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "always", { allowNewlines: true }]
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.RuleWalker {
  private sourceText: string;
  private expectSpace: boolean;
  private spacePattern: RegExp;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    this.sourceText = sourceFile.getFullText();
    this.expectSpace = false;

    let userOptions = options.ruleArguments;
    if (userOptions[0] === ALWAYS) {
      this.expectSpace = true;
      if (userOptions[1] !== undefined && userOptions[1].allowNewlines) {
        this.spacePattern = /[ \t\r\n\u2028\u2029]/;
      }
      else {
        this.spacePattern = /[ \t]/;
      }
    }
    else {
      this.spacePattern = /\s/;
    }
  }

  protected visitNewExpression(node: ts.NewExpression) {
    this.checkWhitespaceForNode(node);
    super.visitNewExpression(node);
  }

  protected visitCallExpression(node: ts.CallExpression) {
    this.checkWhitespaceForNode(node);
    super.visitCallExpression(node);
  }

  private checkWhitespaceForNode(node: ts.NewExpression | ts.CallExpression) {
    if (node.arguments !== undefined) {
      let start;
      if (node.typeArguments !== undefined) {
        start = node.typeArguments.end + 1;
      }
      else {
        start = node.expression.getEnd();
      }
      this.checkWhitespaceBetween(start, node.arguments.pos - 1);
    }
  }

  private checkWhitespaceBetween(start: number, end: number) {
    let whitespace = this.sourceText.substring(start, end);

    if (this.spacePattern.test(whitespace)) {
      if (!this.expectSpace) {
        const fix = Lint.Replacement.deleteText(start, whitespace.length);
        this.addFailureAt(start, whitespace.length, UNEXPECTED_SPACE, fix);
      }
    }
    else if (this.expectSpace) {
      const fix = Lint.Replacement.appendText(start, ' ');
      this.addFailureAt(start, 1, MISSING_SPACE, fix);
    }
  }
}
