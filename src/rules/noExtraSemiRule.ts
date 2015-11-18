/// <reference path='helper.d.ts' />
// import {ts, Lint} from './helper';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'unnecessary semicolon';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoExtraSemiWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoExtraSemiWalker extends Lint.RuleWalker {
  private ALLOWED_PARENT_TYPES = [
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.ForInStatement,
    ts.SyntaxKind.ForOfStatement,
    ts.SyntaxKind.WhileStatement,
    ts.SyntaxKind.DoStatement
  ];

  protected visitNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.EmptyStatement) {
      this.visitEmptyStatement(node as ts.Statement);
    }
    super.visitNode(node);
  }

  protected visitClassDeclaration(node: ts.ClassDeclaration) {
    this.checkClass(node);
    super.visitClassDeclaration(node);
  }

  private visitEmptyStatement(node: ts.Statement) {
    if (this.ALLOWED_PARENT_TYPES.indexOf(node.parent.kind) === -1) {
      this.validateNoExtraSemi(node);
    }
  }

  private checkClass(node: ts.ClassDeclaration) {
    const children = node.getChildren().slice(node.getChildren().indexOf(node.getChildren().find(child => child.kind === ts.SyntaxKind.FirstPunctuation)));
    this.checkClassChildren(children);
  }

  private checkClassChildren(children: Array<ts.Node>) {
    for (let child of children) {
      if ((child.kind === ts.SyntaxKind.SyntaxList || child.kind === ts.SyntaxKind.SemicolonClassElement) && child.getText() === ';') {
        this.validateNoExtraSemi(child);
      }
      else if (child.kind === ts.SyntaxKind.SyntaxList && child.getText().indexOf(';') !== -1) {
        this.checkClassChildren(child.getChildren());
      }
    }
  }

  private validateNoExtraSemi(node: ts.Node) {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
  }
}
