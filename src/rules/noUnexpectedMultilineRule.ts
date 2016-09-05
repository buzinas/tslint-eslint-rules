import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    func: 'unexpected newline between function and ( of function call',
    prop: 'unexpected newline between object and [ of property access',
    template: 'unexpected newline between template tag and template literal'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoUnexpectedMultilineWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoUnexpectedMultilineWalker extends Lint.RuleWalker {
  protected visitCallExpression(node: ts.CallExpression): void {
    const firstLeftParen = node.getChildren().filter(ch => ch.kind === ts.SyntaxKind.OpenParenToken)[0];
    if (this.isBreakBefore(firstLeftParen)) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
    }

    super.visitCallExpression(node);
  }

  protected visitElementAccessExpression(node: ts.ElementAccessExpression): void {
    const firstLeftSquareBracket = node.getChildren().filter(ch => ch.kind === ts.SyntaxKind.OpenBracketToken)[0];
    if (this.isBreakBefore(firstLeftSquareBracket)) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
    }

    super.visitElementAccessExpression(node);
  }

  // it doesn't seem like there's a visitTaggedTemplateExpression() method,
  // so we'll looks for TaggedTemplateExpressions ourselves
  protected visitNode(node: ts.Node): void {
    if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
      const children = node.getChildren();
      const tag = children.filter(ch => ch.kind === ts.SyntaxKind.Identifier)[0];
      const tagIndex = children.indexOf(tag);

      if (tag && children[tagIndex + 1]) {
        // the template is always the next syntax element after the tag
        const template = children[tagIndex + 1];
        if (this.isBreakBefore(template)) {
          this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
      }
    }

    super.visitNode(node);
  }

  private isBreakBefore(node: ts.Node): boolean {
    if (node.parent) {
      const children = node.parent.getChildren();
      const nodeIndex = children.indexOf(node);

      if (nodeIndex > 0) {
        const nodeLine = this.getStartPosition(node).line;
        const previousNodeLine = this.getEndPosition(children[nodeIndex - 1]).line;

        if (nodeLine !== previousNodeLine) {
          return true;
        }
      }
    }

    return false;
  }

  private getMessage(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.CallExpression:
        return Rule.FAILURE_STRING.func;
      case ts.SyntaxKind.ElementAccessExpression:
        return Rule.FAILURE_STRING.prop;
      case ts.SyntaxKind.TaggedTemplateExpression:
        return Rule.FAILURE_STRING.template;
      default:
        throw 'Unexpected node type: ' + ts.SyntaxKind[node.kind];
    }
  }

  private getStartPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
  }

  private getEndPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
  }
}
