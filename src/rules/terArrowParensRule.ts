/**
 * This rule is a port of eslint:
 *
 * source file: https://github.com/eslint/eslint/blob/master/lib/rules/arrow-parens.js
 * git commit hash: c0f49378f2d43c83065f85d5adff25ac24a9dc82
 *
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-arrow-parens';
const always = 'Expected parentheses around arrow function argument.';
const asNeeded = 'Unexpected parentheses around single function argument.';
const block = 'Unexpected parentheses around single function argument having a body with no curly braces.';
const blockNoParens = 'Expected parentheses around arrow function argument having a body with curly braces.';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'require parens in arrow function arguments',
    rationale: Lint.Utils.dedent`
      Arrow functions can omit parentheses when they have exactly one parameter. In all other cases
      the parameter(s) must be wrapped in parentheses. This rule enforces the consistent use of
      parentheses in arrow functions.
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule has a string option and an object one.

      String options are:

      - \`"always"\` (default) requires parentheses around arguments in all cases.
      - \`"as-needed"\` allows omitting parentheses when there is only one argument.

      Object properties for variants of the \`"as-needed"\` option:

      - \`"requireForBlockBody": true\` modifies the as-needed rule in order to require
        parentheses if the function body is in an instructions block (surrounded by braces).
      `,
    options: {
      type: 'array',
      items: [
        {
          enum: ['always', 'as-needed']
        },
        {
          type: 'object',
          properties: {
            requireForBlockBody: {
              type: 'boolean'
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
        "${RULE_NAME}": [true, "as-needed"]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, "as-needed", { "requireForBlockBody": true }]
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
  private srcFile: ts.SourceFile;
  private asNeeded: boolean;
  private requireForBlockBody: boolean;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    this.srcFile = sourceFile;
    const opt = this.getOptions();
    this.asNeeded = opt[0] === 'as-needed';
    this.requireForBlockBody = this.asNeeded && opt[1] && opt[1].requireForBlockBody === true;
  }

  protected visitArrowFunction(node: ts.ArrowFunction): void {
    super.visitArrowFunction(node);

    if (node.parameters.length === 1) {
      const skip = Lint.hasModifier(node.modifiers, ts.SyntaxKind.AsyncKeyword) ? 1 : 0;
      const parameter = node.parameters[0];
      const text = parameter.getText();
      const firstToken = node.getChildAt(skip);
      const lastToken = node.getChildAt(2 + skip);
      const position = parameter.getStart();
      const paramWidth = text.length;
      const parensWidth = lastToken.end - firstToken.getStart(this.srcFile);
      const isGenerics = firstToken.kind === ts.SyntaxKind.LessThanToken;
      const hasParens = firstToken.kind === ts.SyntaxKind.OpenParenToken;
      const bodyIsBlock = node.body.kind === ts.SyntaxKind.Block;
      const isIdentifier = parameter.name.kind === ts.SyntaxKind.Identifier;
      const hasAnnotations = parameter.initializer || parameter.dotDotDotToken || parameter.type;
      const isSingleIdentifier = isIdentifier && !hasAnnotations;

      if (this.requireForBlockBody) {
        if (isSingleIdentifier && !node.type && !bodyIsBlock) {
          if (hasParens) {
            this.report(position - 1, parensWidth, block);
          }
          return;
        }

        if (bodyIsBlock && !isGenerics) {
          if (!hasParens) {
            this.report(position, paramWidth, blockNoParens);
          }
          return;
        }
      }

      if (this.asNeeded && isSingleIdentifier && !node.type) {
        if (hasParens) {
          this.report(position - 1, parensWidth, asNeeded);
        }
        return;
      }

      if (!hasParens && !isGenerics) {
        this.report(position, paramWidth, always);
      }
    }
  }

  private report(position: number, width: number, message: string) {
    const failure = this.createFailure(position, width, message);
    this.addFailure(failure);
  }
}
