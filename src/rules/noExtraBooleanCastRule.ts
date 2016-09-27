import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    if: 'redundant double negation in an if statement condition',
    do: 'redundant double negation in a do while loop condition',
    while: 'redundant double negation in a while loop condition',
    ternaryif: 'redundant double negation in a ternary condition',
    for: 'redundant double negation in a for loop condition',
    unaryCast: 'redundant multiple negation',
    objectCast: 'redundant double negation in call to Boolean()',
    newCast: 'redundant double negation in Boolean constructor call'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoExtraBooleanCastWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoExtraBooleanCastWalker extends Lint.RuleWalker {

  protected visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
    this.validateNoExtraBoolean(node);
    super.visitPrefixUnaryExpression(node);
  }

  private validateNoExtraBoolean(node: ts.PrefixUnaryExpression) {
    const parent = node.parent;
    let grandparent = parent.parent;

    // Exit early if it's guaranteed not to match
    if (node.operator !== ts.SyntaxKind.ExclamationToken ||
      parent.kind !== ts.SyntaxKind.PrefixUnaryExpression ||
      (parent as ts.PrefixUnaryExpression).operator !== ts.SyntaxKind.ExclamationToken) {
      return;
    }

    // sometimes the grandparent is not a condition, but something like `if (!!x || !!y)`
    if (grandparent.kind === ts.SyntaxKind.BinaryExpression) {
      grandparent = grandparent.parent;
    }

    if (grandparent.kind === ts.SyntaxKind.IfStatement) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.if));
    }
    else if (grandparent.kind === ts.SyntaxKind.DoStatement) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.do));
    }
    else if (grandparent.kind === ts.SyntaxKind.WhileStatement) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.while));
    }
    else if (grandparent.kind === ts.SyntaxKind.ConditionalExpression && parent === (grandparent as ts.ConditionalExpression).condition) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.ternaryif));
    }
    else if (grandparent.kind === ts.SyntaxKind.ForStatement && parent === (grandparent as ts.ForStatement).condition) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.for));
    }
    else if (grandparent.kind === ts.SyntaxKind.PrefixUnaryExpression && (grandparent as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.ExclamationToken) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.unaryCast));
    }
    else if (grandparent.kind === ts.SyntaxKind.CallExpression && grandparent.getText().startsWith('Boolean')) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.objectCast));
    }
    else if (grandparent.kind === ts.SyntaxKind.NewExpression && grandparent.getText().startsWith('new Boolean')) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.newCast));
    }
  }
}
