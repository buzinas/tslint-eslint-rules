import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

const OPTION_1TBS = '1tbs';
const OPTION_ALLMAN = 'allman';
const OPTION_STROUSTRUP = 'stroustrup';

enum BraceStyle {
  OneTBS,
  Allman,
  Stroustrup
}

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    open: 'Opening curly brace does not appear on the same line as controlling statement.',
    openAllman: 'Opening curly brace appears on the same line as controlling statement.',
    body: 'Statement inside of curly braces should be on next line.',
    close: 'Closing curly brace does not appear on the same line as the subsequent block.',
    closeSingle: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
    closeStroustrupAllman: 'Closing curly brace appears on the same line as the subsequent block.'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new BraceStyleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class BraceStyleWalker extends Lint.RuleWalker {
  private braceStyle: BraceStyle;
  private allowSingleLine: boolean = false;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);

    if (this.hasOption(OPTION_1TBS)) {
      this.braceStyle = BraceStyle.OneTBS;
    } else if (this.hasOption(OPTION_ALLMAN)) {
      this.braceStyle = BraceStyle.Allman;
    } else if (this.hasOption(OPTION_STROUSTRUP)) {
      this.braceStyle = BraceStyle.Stroustrup;
    } else {
      // what do we do if the user doesn't provide a valid option?
    }

    this.allowSingleLine = this.getOptions()[1] && this.getOptions()[1].allowSingleLine;
  }

  // check that the "catch" and "finally" keyword are on the correct line.
  // all other checks regarding try/catch statements will be covered in the "visitBlock" callback
  protected visitTryStatement(tryStatement: ts.TryStatement): void {
    super.visitTryStatement(tryStatement);

    const checkTryStatementError = (node: ts.Node): void => {
      const previousNode = this.getPreviousNode(tryStatement.getChildren(), node);
      const openingBracketError = this.areOnSameLine(previousNode, node) !== (this.braceStyle === BraceStyle.OneTBS);

      if (this.allowSingleLine && this.getStartPosition(node).line === this.getEndPosition(tryStatement).line) {
        return;
      }

      if (openingBracketError) {
        const failureString = this.braceStyle === BraceStyle.OneTBS ? Rule.FAILURE_STRING.open : Rule.FAILURE_STRING.openAllman;
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureString));
      }
    };

    // check catch
    const catchClause = tryStatement.catchClause;
    if (catchClause) {
      checkTryStatementError(catchClause);
    }

    // check finally
    const finallyBlock = tryStatement.finallyBlock;
    if (finallyBlock) {
      checkTryStatementError(finallyBlock);
    }
  }

  // check that the "else" keyword is on the correct line.
  // all other checks regarding if statements will be covered in the "visitBlock" callback
  protected visitIfStatement(ifStatement: ts.IfStatement): void {
    super.visitIfStatement(ifStatement);

    const elseKeyword = ifStatement.getChildren().filter(ch => ch.kind === ts.SyntaxKind.ElseKeyword).shift();

    if (!elseKeyword) {
      return;
    }

    const previousNode = ifStatement.getChildren()[ifStatement.getChildren().indexOf(elseKeyword) - 1];
    const openingBracketError = this.areOnSameLine(previousNode, elseKeyword) !== (this.braceStyle === BraceStyle.OneTBS);

    if (this.allowSingleLine && this.getStartPosition(elseKeyword).line === this.getEndPosition(ifStatement).line) {
      return;
    }

    // if the if statement doesn't have a "block" element, it means it has no braces,
    // and when there are no braces, there are no problems
    if (!ifStatement.getChildren().some(ch => ch.kind === ts.SyntaxKind.Block)) {
      return;
    }

    if (openingBracketError) {
      const failureString = this.braceStyle === BraceStyle.OneTBS ? Rule.FAILURE_STRING.open : Rule.FAILURE_STRING.openAllman;
      this.addFailure(this.createFailure(elseKeyword.getStart(), elseKeyword.getWidth(), failureString));
    }
  }

  protected visitBlock(block: ts.Block): void {
    super.visitBlock(block);

    if (this.allowSingleLine && this.getStartPosition(block).line === this.getEndPosition(block).line) {
      return;
    }

    const blockChildren = block.getChildren();
    const openingCurlyBrace = blockChildren.filter(ch => ch.kind === ts.SyntaxKind.OpenBraceToken).shift();
    const closingCurlyBrace = blockChildren.filter(ch => ch.kind === ts.SyntaxKind.CloseBraceToken).pop();
    const syntaxList = blockChildren.filter(ch => ch.kind === ts.SyntaxKind.SyntaxList).shift();
    const blockPreviousNode = block.parent.getChildren()[block.parent.getChildren().indexOf(block) - 1];

    if (!openingCurlyBrace || !closingCurlyBrace || !syntaxList || !blockPreviousNode) {
      return;
    }

    const openingBracketError = this.areOnSameLine(blockPreviousNode, block) === (this.braceStyle === BraceStyle.Allman);

    if (openingBracketError) {
      const failureString = this.braceStyle === BraceStyle.Allman ? Rule.FAILURE_STRING.openAllman : Rule.FAILURE_STRING.open;
      this.addFailure(this.createFailure(openingCurlyBrace.getStart(), openingCurlyBrace.getWidth(), failureString));
    }

    if (syntaxList.getChildCount() > 0) {

      const bodyError = this.areOnSameLine(openingCurlyBrace, syntaxList);
      if (bodyError) {
        this.addFailure(this.createFailure(syntaxList.getStart(), syntaxList.getWidth(), Rule.FAILURE_STRING.body));
      }

      const nodeBeforeClosingBracket = syntaxList.getChildren()[syntaxList.getChildren().length - 1];
      const closingBracketError = this.areOnSameLine(nodeBeforeClosingBracket, closingCurlyBrace);
      if (closingBracketError) {
        this.addFailure(this.createFailure(closingCurlyBrace.getStart(), closingCurlyBrace.getWidth(), Rule.FAILURE_STRING.closeSingle));
      }
    }
  }

  private areOnSameLine(node: ts.Node, nextNode: ts.Node): boolean {
    return this.getEndPosition(node).line === this.getStartPosition(nextNode).line;
  }

  private getStartPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
  }

  private getEndPosition(node: ts.Node) {
    return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
  }

  // returns previous node which is either block or catch clause (no keywords, etc).
  private getPreviousNode(children: ts.Node[], node: ts.Node): ts.Node {
    let position = children.indexOf(node) - 1;
    while (position >= 0) { // is first child always block or catch clause?
      if (children[position].kind === ts.SyntaxKind.Block || children[position].kind === ts.SyntaxKind.CatchClause) {
        return children[position];
      }
      position -= 1;
    }
  }
}
