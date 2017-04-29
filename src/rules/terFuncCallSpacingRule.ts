import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-func-call-spacing';
const ALWAYS = 'always';

const MISSING_SPACE = 'Missing space between function name and paren.';
const UNEXPECTED_SPACE = 'Unexpected space between function name and paren.';

interface WalkerOptions {
  expectSpace: boolean;
  spacePattern: RegExp;
}

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
    const options = {
      expectSpace: false,
      spacePattern: /\s/
    };
    
    let userOptions = this.getOptions().ruleArguments;
    if (userOptions[0] === ALWAYS) {
      options.expectSpace = true;
      if (userOptions[1] !== undefined && userOptions[1].allowNewlines) {
        options.spacePattern = /[ \t\r\n\u2028\u2029]/;
      }
      else {
        options.spacePattern = /[ \t]/;
      }
    }
    
    const walker = new RuleWalker(sourceFile, RULE_NAME, options);
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.AbstractWalker<WalkerOptions> {
  sourceText: string;
  
  constructor(sourceFile: ts.SourceFile, ruleName: string, options: WalkerOptions) {
    super(sourceFile, ruleName, options);
    this.sourceText = sourceFile.getFullText();
  }
  
  public walk(sourceFile: ts.SourceFile) {
    const cb = (node: ts.Node) => {
      if (node.kind === ts.SyntaxKind.NewExpression) {
        this.visitNewExpression(node as ts.NewExpression);
      }
      else if(node.kind === ts.SyntaxKind.CallExpression) {
        this.visitCallExpression(node as ts.CallExpression);
      }
      else if (node.kind >= ts.SyntaxKind.FirstTypeNode && node.kind <= ts.SyntaxKind.LastTypeNode) {
        return;
      }

      return ts.forEachChild(node, cb);
    };

    return ts.forEachChild(sourceFile, cb);
  }

  private visitNewExpression(node: ts.NewExpression) {
    this.checkWhitespaceAfterExpression(node.expression, node.typeArguments, node.arguments);
  }

  private visitCallExpression(node: ts.CallExpression) {
    this.checkWhitespaceAfterExpression(node.expression, node.typeArguments, node.arguments);
  }

  private checkWhitespaceAfterExpression(expression: ts.LeftHandSideExpression, typeArguments?: ts.NodeArray<ts.TypeNode>, funcArguments?: ts.NodeArray<ts.Expression>) {
    if (funcArguments !== undefined) {
      let start;
      if (typeArguments !== undefined) {
        start = typeArguments.end + 1;
      }
      else {
        start = expression.getEnd();
      }
      this.checkWhitespaceBetween(start, funcArguments.pos - 1);
    }
  }

  private checkWhitespaceBetween(start: number, end: number) {
    let whitespace = this.sourceText.substring(start, end);
  
    if (this.options.spacePattern.test(whitespace)) {
      if (!this.options.expectSpace) {
        const fix = Lint.Replacement.deleteText(start, whitespace.length);
        this.addFailureAt(start, whitespace.length, UNEXPECTED_SPACE, fix);
      }
    }
    else if (this.options.expectSpace) {
      const fix = Lint.Replacement.appendText(start, ' ');
      this.addFailureAt(start, 1, MISSING_SPACE, fix);
    }
  }
}