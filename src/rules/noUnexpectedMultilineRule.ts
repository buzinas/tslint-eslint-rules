import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    func: 'unexpected newline between function and ( of function call',
    prop: 'unexpected newline between object and [ of property access'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoUnexpectedMultilineWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoUnexpectedMultilineWalker extends Lint.RuleWalker {
  protected visitNode(node: ts.Node) {
    this.validateMultiline(node);
    super.visitNode(node);
  }

  private getMessage(node: ts.Node) {
    return node.kind === ts.SyntaxKind.CallExpression ? Rule.FAILURE_STRING.func : Rule.FAILURE_STRING.prop;
  }

  private getPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
  }

  private validateMultiline(node: ts.Node) {
    const parent = node.parent;

    if (parent) {
      const before = parent.getChildAt(parent.getChildren().indexOf(node) - 1);
      const paren = parent.getChildAt(parent.getChildren().indexOf(node) - 2);

      if (before && paren) {
        if (this.getPosition(before).line !== this.getPosition(paren).line) {
          this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
      }
    }
  }
}
