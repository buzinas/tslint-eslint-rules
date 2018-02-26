/**
 * This rule is a port of eslint:
 *
 * source file: https://github.com/eslint/eslint/blob/master/lib/rules/no-proto.js
 * git commit hash: 75b7ba4113db4d9bc1661a4600c8728cf3bfbf2b
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-no-proto';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'The `__proto__` property is deprecated.';

  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: 'disallow the use of `__proto__` property',
    rationale:
      '`__proto__` property has been deprecated as of ECMAScript 3.1 and shouldn’t be used in the code. Use getPrototypeOf method instead.',
    optionsDescription: '',
    options: {},
    optionExamples: [Lint.Utils.dedent`
      "${RULE_NAME}": true
      `],
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
    if (
      (node.kind === ts.SyntaxKind.Identifier &&
        (node as ts.Identifier).text === '__proto__' &&
        node.parent &&
        node.parent.kind === ts.SyntaxKind.PropertyAccessExpression) ||
      (node.kind === ts.SyntaxKind.StringLiteral &&
        (node as ts.StringLiteral).text === '__proto__')
    ) {
      return ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
    }
    return ts.forEachChild(node, cb);
  }
}
