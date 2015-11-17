/// <reference path='helper.d.ts' />
// import {ts, Lint} from './helper';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoInvalidRegexpWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoInvalidRegexpWalker extends Lint.RuleWalker {
  protected visitNewExpression(node: ts.NewExpression) {
    this.validateInvalidRegExp(node);
    super.visitNewExpression(node);
  }

  protected visitCallExpression(node: ts.CallExpression) {
    this.validateInvalidRegExp(node);
    super.visitCallExpression(node);
  }

  private validateInvalidRegExp(node: ts.CallExpression) {
    if (node.expression.getText() === 'RegExp') {
      const args = node.arguments;
      if (args && args.length > 0 && args[0].kind === ts.SyntaxKind.StringLiteral) {
        const expr = (args[0] as ts.StringLiteral).text;
        const flags = args.length > 1 && args[1].kind === ts.SyntaxKind.StringLiteral ? (args[1] as ts.StringLiteral).text : undefined;

        try {
          const regex = new RegExp(expr, flags);
        }
        catch(e) {
          this.addFailure(this.createFailure(node.getStart(), node.getWidth(), e.message));
        }
      }
    }
  }
}
