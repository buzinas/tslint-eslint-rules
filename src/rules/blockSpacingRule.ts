import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

const OPTION_ALWAYS = 'always';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    always: 'Requires a space',
    never: 'Unexpected space(s)'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new BlockSpacingWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class BlockSpacingWalker extends Lint.RuleWalker {

  private always: boolean;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    this.always = this.hasOption(OPTION_ALWAYS) || (this.getOptions() && this.getOptions().length === 0);
  }

  protected visitNode(node: ts.Node): void {
    if (node.kind === ts.SyntaxKind.Block || node.kind === ts.SyntaxKind.CaseBlock) {
      this.checkSpacingInsideBraces(node);
    }
    super.visitNode(node);
  }

  private checkSpacingInsideBraces(node: ts.Node): void {
    const blockChildren = node.getChildren();
    const syntaxList = blockChildren[1];
    const openBraceLocation = this.getStartPosition(blockChildren[0]);
    const closeBraceLocation = this.getStartPosition(blockChildren[blockChildren.length - 1]);

    if (syntaxList.getChildCount() > 0 && openBraceLocation.line === closeBraceLocation.line) {
      if (this.isSpaceBetween(blockChildren[0], blockChildren[1]) !== this.always
        || this.isSpaceBetween(blockChildren[blockChildren.length - 2], blockChildren[blockChildren.length - 1]) !== this.always) {

        let failureString = this.always ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never;
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureString));
      }
    }
  }

  private isSpaceBetween(node: ts.Node, nextNode: ts.Node): boolean {
    return nextNode.getStart() - node.getEnd() > 0;
  }

  private getStartPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
  }
}
