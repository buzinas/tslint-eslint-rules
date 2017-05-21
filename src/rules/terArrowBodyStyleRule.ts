/**
 * Eslint port: https://github.com/eslint/eslint/blob/master/lib/rules/arrow-body-style.js
 * Github Commit Hash: 2bd1dd71c32d286cde10c52140a1d26f2a512a30
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-arrow-body-style';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'require braces in arrow function body',
    rationale: Lint.Utils.dedent`
      Arrow functions have two syntactic forms for their function bodies. They may be defined with
      a block body (denoted by curly braces) \`() => { ... }\` or with a single expression
      \`() => ...\`, whose value is implicitly returned.
      `,
    optionsDescription: Lint.Utils.dedent`
      The rule takes one or two options. The first is a string, which can be:

      - \`"always"\` enforces braces around the function body
      - \`"as-needed"\` enforces no braces where they can be omitted (default)
      - \`"never"\` enforces no braces around the function body (constrains arrow functions to the
                    role of returning an expression)

      The second one is an object for more fine-grained configuration when the first option is
      \`"as-needed"\`. Currently, the only available option is \`requireReturnForObjectLiteral\`, a
      boolean property. It’s false by default. If set to true, it requires braces and an explicit
      return for object literals.
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
          type: 'array',
          items: [
            {
              enum: ['as-needed']
            },
            {
              type: 'object',
              properties: {
                requireReturnForObjectLiteral: { type: 'boolean' }
              },
              additionalProperties: false
            }
          ],
          minItems: 0,
          maxItems: 2
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
        "${RULE_NAME}": [true, "as-needed", {
          "requireReturnForObjectLiteral": true
        }]
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
  private always: boolean;
  private asNeeded: boolean;
  private never: boolean;
  private requireReturnForObjectLiteral: boolean;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const opt = this.getOptions();
    this.always = opt[0] === 'always';
    this.asNeeded = !opt[0] || opt[0] === 'as-needed';
    this.never = opt[0] === 'never';
    this.requireReturnForObjectLiteral = opt[1] && opt[1].requireReturnForObjectLiteral;
  }

  protected visitArrowFunction(node: ts.ArrowFunction): void {
    const arrowBody = node.body;
    if (arrowBody.kind === ts.SyntaxKind.Block) {
      const blockBody = (arrowBody as ts.Block).statements;

      if (blockBody.length !== 1 && !this.never) {
        return;
      }

      const returnExpression = (blockBody[0] as ts.ReturnStatement).expression;
      if (
        this.asNeeded &&
        this.requireReturnForObjectLiteral &&
        blockBody[0].kind === ts.SyntaxKind.ReturnStatement &&
        (returnExpression && this.isObjectLiteral(returnExpression))
      ) {
        return;
      }

      if (this.never || this.asNeeded && blockBody[0].kind === ts.SyntaxKind.ReturnStatement) {
        this.report(arrowBody, false);
      }
    } else {
      if (this.always || (
        this.asNeeded &&
        this.requireReturnForObjectLiteral &&
        this.isObjectLiteral(arrowBody)
      )) {
        this.report(arrowBody, true);
      }
    }

    super.visitArrowFunction(node);
  }

  private isObjectLiteral(node: ts.Node) {
    let obj = node;
    while (obj.kind === ts.SyntaxKind.ParenthesizedExpression) {
      obj = (node as ts.ParenthesizedExpression).expression;
    }
    return obj.kind === ts.SyntaxKind.ObjectLiteralExpression;
  }

  private report(arrowBody: ts.Node, expected: boolean) {
    const val = expected ? 'Expected' : 'Unexpected';
    const failure = this.createFailure(
      arrowBody.getStart(),
      arrowBody.getWidth(),
      `${val} block statement surrounding arrow body.`
    );
    this.addFailure(failure);
  }
}
