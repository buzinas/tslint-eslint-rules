import * as ts from 'typescript';
import * as Lint from 'tslint';
import { equalTokens, isNullOrUndefined } from '../support/token';

const RULE_NAME = 'ter-prefer-spread';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: true,
    description: 'require spread operators instead of `.apply()`',
    rationale: Lint.Utils.dedent`
          This rule is aimed to flag usage of Function.prototype.apply() in situations where the spread operator could be used instead.
        `,
    optionsDescription: Lint.Utils.dedent`
      `,
    options: null,
    optionExamples: [],
    typescriptOnly: false,
    type: 'style'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

const isVariadicApplyCalling = (node: ts.CallExpression) => (
  node.expression.kind === ts.SyntaxKind.PropertyAccessExpression &&
  (node.expression as ts.PropertyAccessExpression).name.kind === ts.SyntaxKind.Identifier &&
  ((node.expression as ts.PropertyAccessExpression).name as ts.Identifier).text === 'apply' &&
  node.arguments.length === 2 &&
  node.arguments[1].kind !== ts.SyntaxKind.ArrayLiteralExpression &&
  node.arguments[1].kind !== ts.SyntaxKind.SpreadElement
);

const isValidThisArg = (expectedThis: null | ts.Node, thisArg: ts.Node) => {
  if (expectedThis === null) {
    return isNullOrUndefined(thisArg);
  }

  return equalTokens(expectedThis, thisArg);
};

class RuleWalker extends Lint.RuleWalker {
  protected visitCallExpression(node: ts.CallExpression) {
    if (!isVariadicApplyCalling(node)) {
      return;
    }

    const applied = (node.expression as ts.PropertyAccessExpression).expression;
    const expectedThis = applied.kind === ts.SyntaxKind.PropertyAccessExpression
        ? (applied as ts.PropertyAccessExpression).expression
        : applied.kind === ts.SyntaxKind.ElementAccessExpression
          ? (applied as ts.ElementAccessExpression).expression
          : null;
    const thisArg = node.arguments[0];

    if (isValidThisArg(expectedThis, thisArg)) {
      if (expectedThis !== null && expectedThis.kind !== ts.SyntaxKind.Identifier) {

        this.addFailureAtNode(
          node,
          'Use the spread operator instead of \'.apply()\''
        );
      } else {
        this.addFailureAtNode(
          node,
          'Use the spread operator instead of \'.apply()\'',
          Lint.Replacement.replaceFromTo(node.getStart(), node.getEnd(), `${applied.getText()}(...${node.arguments[1].getText()})`)
        );
      }
    }
  }
}
