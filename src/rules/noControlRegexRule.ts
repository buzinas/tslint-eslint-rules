import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'unexpected control character in regular expression';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoControlRegexWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoControlRegexWalker extends Lint.RuleWalker {
  protected visitRegularExpressionLiteral(node: ts.LiteralExpression) {
    this.validateControlRegex(node, true);
    super.visitRegularExpressionLiteral(node);
  }

  protected visitNewExpression(node: ts.NewExpression) {
    if (node.expression.getText() === 'RegExp') {
      this.visitRegularExpressionFunction(node);
    }
    super.visitNewExpression(node);
  }

  protected visitCallExpression(node: ts.CallExpression) {
    if (node.expression.getText() === 'RegExp') {
      this.visitRegularExpressionFunction(node);
    }
    super.visitCallExpression(node);
  }

  private visitRegularExpressionFunction(node: ts.CallExpression | ts.NewExpression) {
    if (node.arguments && node.arguments.length > 0 && node.arguments[0].kind === ts.SyntaxKind.StringLiteral) {
      this.validateControlRegex(node.arguments[0] as ts.StringLiteral, false);
    }
  }

  private validateControlRegex(node: ts.LiteralExpression, literal: boolean) {
    let regexValue = node.text;

    // if this is a regex literal, we need to evaluate the string
    // representation of the regex in order to search for control characters
    if (literal) {

      // turn double backslashes (\\) into single backslashes (\).
      // also remove any tags from the end of the regex string
      let escapedLiteral = regexValue.replace(/\\\\/g, '\\').replace(/\/[g|i|m|y]+$/, '/');

      /* tslint:disable */
      regexValue = eval('"' + escapedLiteral + '"').toString();
      /* tslint:enable */
    }

    if (/[\x00-\x1f]/.test(regexValue)) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
  }
}
