import * as ts from 'typescript';
import * as Lint from 'tslint';

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
  private spaced: boolean;
  private singleValueException: boolean = false;
  private objectsInArraysException: boolean = false;
  private arraysInArraysException: boolean = false;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const ruleOptions = this.getOptions();
    this.spaced = this.hasOption(OPTION_ALWAYS) || (ruleOptions && ruleOptions.length === 0);

    if (ruleOptions[1]) {
      this.singleValueException = typeof ruleOptions[1].singleValue !== 'undefined' && ruleOptions[1].singleValue !== this.spaced;
      this.objectsInArraysException = typeof ruleOptions[1].objectsInArrays !== 'undefined' && ruleOptions[1].objectsInArrays !== this.spaced;
      this.arraysInArraysException = typeof ruleOptions[1].arraysInArrays !== 'undefined' && ruleOptions[1].arraysInArrays !== this.spaced;
    }
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

  private validateSquareBrackets(node: ts.Node): void {
    const children = node.getChildren();
    const isSpaceAfterOpeningBracket = this.isSpaceBetween(children[0], children[1]);
    const isBreakAfterOpeningBracket = this.isLineBreakBetween(children[0], children[1]);
    const isSpaceBeforeClosingBracket = this.isSpaceBetween(children[children.length - 2], children[children.length - 1]);
    const isBreakBeforeClosingBracket = this.isLineBreakBetween(children[children.length - 2], children[children.length - 1]);

    const syntaxList = node.getChildren()[1];
    const itemsInArrayPattern = syntaxList.getChildren().filter(child => child.kind !== ts.SyntaxKind.CommaToken);

    if (this.spaced && itemsInArrayPattern.length === 0) {
      return;
    }

    const openingBracketMustBeSpaced =
      (this.singleValueException && itemsInArrayPattern.length === 1) ||
        (this.arraysInArraysException && itemsInArrayPattern[0] && itemsInArrayPattern[0].kind === ts.SyntaxKind.ArrayLiteralExpression) ||
        (this.objectsInArraysException && itemsInArrayPattern[0] && itemsInArrayPattern[0].kind === ts.SyntaxKind.ObjectLiteralExpression)
        ? !this.spaced : this.spaced;

    const closingBracketMustBeSpaced =
      (this.singleValueException
        && itemsInArrayPattern.length === 1) ||
        (this.arraysInArraysException &&
          itemsInArrayPattern[itemsInArrayPattern.length - 1] &&
          itemsInArrayPattern[itemsInArrayPattern.length - 1].kind === ts.SyntaxKind.ArrayLiteralExpression) ||
        (this.objectsInArraysException
          && itemsInArrayPattern[itemsInArrayPattern.length - 1]
          && itemsInArrayPattern[itemsInArrayPattern.length - 1].kind === ts.SyntaxKind.ObjectLiteralExpression)
        ? !this.spaced : this.spaced;

    if (!isBreakAfterOpeningBracket) {
      if (openingBracketMustBeSpaced && !isSpaceAfterOpeningBracket) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.requiredBeginningSpace));
      }
      if (!openingBracketMustBeSpaced && isSpaceAfterOpeningBracket) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.noBeginningSpace));
      }
    }

    if (!isBreakBeforeClosingBracket) {
      if (closingBracketMustBeSpaced && !isSpaceBeforeClosingBracket) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.requiredEndingSpace));
      }
      if (!closingBracketMustBeSpaced && isSpaceBeforeClosingBracket) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.noEndingSpace));
      }
    }
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
