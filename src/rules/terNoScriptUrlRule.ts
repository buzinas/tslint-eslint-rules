/**
 * This rule is a port of eslint
 * source file: https://github.com/eslint/eslint/blob/0cf081ef7249c8e3b9e2cba4710f6205ef996b02/lib/rules/no-script-url.js
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-no-script-url';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Script URL is a form of eval.';

  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: 'disallow use of `javascript:` urls.',
    rationale:
      'Using `javascript:` URLs is considered by some as a form of `eval`. ' +
      'Code passed in `javascript:` URLs has to be parsed and evaluated by the browser ' +
      'in the same way that eval is processed.',
    optionsDescription: '',
    options: {},
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": true
        `
    ],
    typescriptOnly: false,
    type: 'functionality'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk);
  }
}

function walk(ctx: Lint.WalkContext<void>) {
  return ts.forEachChild(ctx.sourceFile, cb);

  function cb(node: ts.Node): void {
    if (node.kind === ts.SyntaxKind.StringLiteral) {
      const value = (node as ts.StringLiteral).text.toLowerCase();
      if (value.indexOf('javascript:') === 0) {
        return ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
      }
    }
    return ts.forEachChild(node, cb);
  }
}
