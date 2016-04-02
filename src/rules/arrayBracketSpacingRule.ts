import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

const OPTION_ALWAYS = 'always';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    noBeginningSpace: 'There should be no space after "["',
    noEndingSpace: 'There should be no space before "]"',
    requiredBeginningSpace: 'A space is required after "["',
    requiredEndingSpace: 'A space is required before "]"'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new ArrayBracketSpacingWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class ArrayBracketSpacingWalker extends Lint.RuleWalker {

  private always: boolean;
  private never: boolean;
  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    this.always = this.hasOption(OPTION_ALWAYS) || (this.getOptions() && this.getOptions().length === 0);

    // this redundant variable is for readability below
    this.never = !this.always;
  }

  protected visitNode(node: ts.Node): void {
    if (node.kind === ts.SyntaxKind.ArrayBindingPattern) {
      this.validateSquareBrackets(node);
    }
    super.visitNode(node);
  }

  protected visitArrayLiteralExpression(node: ts.ArrayLiteralExpression): void {
    this.validateSquareBrackets(node);
    super.visitArrayLiteralExpression(node);
  }

  // note: this function assumes that the node will always have at
  // least two children: an opening bracket and a closing bracket
  private validateSquareBrackets(node: ts.Node): void {
    const children = node.getChildren();
    const isEmptyArrayLiteral = !this.isSpaceBetween(node.getFirstToken(), node.getLastToken());
    const isSpaceAfterOpeningBracket = this.isSpaceBetween(children[0], children[1]);
    const isBreakAfterOpeningBracket = this.isLineBreakBetween(children[0], children[1]);
    const isSpaceBeforeClosingBracket = this.isSpaceBetween(children[children.length - 2], children[children.length - 1]);
    const isBreakBeforeClosingBracket = this.isLineBreakBetween(children[children.length - 2], children[children.length - 1]);

    node.getChildren().forEach((child, index, parent) => {
      if (child.kind === ts.SyntaxKind.OpenBracketToken) {
        if (this.never && isSpaceAfterOpeningBracket && !isBreakAfterOpeningBracket) {
          this.addFailure(this.createFailure(child.getStart(), child.getWidth(), Rule.FAILURE_STRING.noBeginningSpace));
        }

        if (this.always && !isSpaceAfterOpeningBracket && !isEmptyArrayLiteral) {
          this.addFailure(this.createFailure(child.getStart(), child.getWidth(), Rule.FAILURE_STRING.requiredBeginningSpace));
        }
      }

      if (child.kind === ts.SyntaxKind.CloseBracketToken) {
        if (this.never && isSpaceBeforeClosingBracket && !isBreakBeforeClosingBracket) {
          this.addFailure(this.createFailure(child.getStart(), child.getWidth(), Rule.FAILURE_STRING.noEndingSpace));
        }

        if (this.always && !isSpaceBeforeClosingBracket && !isEmptyArrayLiteral) {
          this.addFailure(this.createFailure(child.getStart(), child.getWidth(), Rule.FAILURE_STRING.requiredEndingSpace));
        }
      }
    });
  }

  // space/line break detection helpers
  private isSpaceBetween(node: ts.Node, nextNode: ts.Node): boolean {
    return nextNode.getStart() - node.getEnd() > 0;
  }

  private isLineBreakBetween(node: ts.Node, nextNode: ts.Node): boolean {
    return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
  }

  private getStartPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
  }

  private getEndPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
  }
}
