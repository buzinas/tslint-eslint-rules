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
    this.validateControlRegex(node);
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
      this.validateControlRegex(node.arguments[0] as ts.StringLiteral);
    }
  }

  private validateControlRegex(node: ts.LiteralExpression) {
    if (/[\x00-\x1f]/.test(node.text)) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
  }
}
