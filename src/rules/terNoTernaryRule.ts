import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'ternary operator used';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoTernaryWalker(sourceFile, 'ter-no-ternary', this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoTernaryWalker extends Lint.AbstractWalker<{}> {
  protected readonly visitNode = (node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.ConditionalExpression) {
      this.addFailure(node.getStart(), node.getEnd(), Rule.FAILURE_STRING);
    }
    ts.forEachChild(node, this.visitNode);
  }

  public walk(sourceFile: ts.SourceFile) {
    ts.forEachChild(sourceFile, this.visitNode);
  }
}
