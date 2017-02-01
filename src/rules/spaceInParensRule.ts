import * as ts from 'typescript';
import * as Lint from 'tslint';

const ALWAYS = 'always';

export class Rule extends Lint.Rules.AbstractRule {

  public static MISSING_SPACE_MESSAGE = "There must be a space inside this paren.";
  public static REJECTED_SPACE_MESSAGE = "There should be no spaces inside this paren.";
  
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new SpaceInParensWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class SpaceInParensWalker extends Lint.RuleWalker {
  // ** RULE IMPLEMENTATION HERE **
  private spaced: boolean;
  private exceptionsArrayOptions = [];
  private braceException: boolean;
  private bracketException: boolean;
  private parenException: boolean;
  private empty: boolean;
  
  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    let ruleOptions = this.getOptions();
    this.spaced = this.hasOption(ALWAYS) || ( ruleOptions && ruleOptions.length === 0);

    if ( ruleOptions[1] ) {
      this.exceptionsArrayOptions = (ruleOptions.length === 2) ? ruleOptions[1].exceptions : [] ;
      if (this.exceptionsArrayOptions.length) {
        this.braceException = this.exceptionsArrayOptions.indexOf("{}") !== -1;
        this.bracketException = this.exceptionsArrayOptions.indexOf("[]") !== -1;
        this.parenException = this.exceptionsArrayOptions.indexOf("()") !== -1;
        this.empty = this.exceptionsArrayOptions.indexOf("empty") !== -1;
      }
    }
  }  

  private getExceptions() {
    let openers = [];
    let closers = [];

    if (this.braceException) {
      openers.push( ts.SyntaxKind.OpenBraceToken );
      closers.push( ts.SyntaxKind.CloseBraceToken );
    }

    if (this.bracketException) {
      openers.push( ts.SyntaxKind.OpenBracketToken );
      closers.push( ts.SyntaxKind.CloseBracketToken );
    }

    if (this.parenException) {
      openers.push( ts.SyntaxKind.OpenParenToken );
      closers.push( ts.SyntaxKind.CloseParenToken );
    }

    if (this.empty) {
      openers.push( ts.SyntaxKind.CloseParenToken );
      closers.push( ts.SyntaxKind.OpenParenToken );
    }

    return {
      openers,
      closers
    };
  }  
  
  protected visitNode(node: ts.Node): void {
    super.visitNode(node);
    if( node.kind === ts.SyntaxKind.CallExpression || 
        node.kind === ts.SyntaxKind.IfStatement ||
        node.kind === ts.SyntaxKind.CatchClause ||
        node.kind === ts.SyntaxKind.ForStatement ||
        node.kind === ts.SyntaxKind.ForOfStatement ||
        node.kind === ts.SyntaxKind.WhileStatement ) {
      this.checkParanSpace( node.getChildren()[1] , node.getChildren()[2] , node.getChildren()[3] );
    }
    if( node.kind === ts.SyntaxKind.ParenthesizedExpression || 
        node.kind === ts.SyntaxKind.ParenthesizedType ) {
      this.checkParanSpace( node.getChildren()[0] , node.getChildren()[1] , node.getChildren()[2] );
    }
  }
  
  private checkParanSpace( first: ts.Node , middle: ts.Node, last: ts.Node ){
    if( !first && !middle && !last ) return
    if ( this.shouldOpenerHaveSpace( first, middle ) ) {
      this.addFailure(this.createFailure(1, 1, Rule.MISSING_SPACE_MESSAGE ));
    } else if ( this.shouldOpenerRejectSpace( first, middle )) {
      this.addFailure(this.createFailure(1, 1, Rule.REJECTED_SPACE_MESSAGE ));
    } else if ( this.shouldCloserHaveSpace( middle, last )) {
      this.addFailure(this.createFailure(1, 1, Rule.MISSING_SPACE_MESSAGE ));
    } else if ( this.shouldCloserRejectSpace( middle, last )) {
      this.addFailure(this.createFailure(1, 1, Rule.REJECTED_SPACE_MESSAGE ));
    }
  }

  private shouldOpenerHaveSpace( left: ts.Node, right: ts.Node ) {
    if ( this.isSpaceBetween( left, right) )  return false;
    if (this.spaced) {
      if ( right.getText().trim() === ''  ) return false;
      return !this.isOpenerException( right.getFirstToken() );
    }
    return this.isOpenerException( right.getFirstToken() );
  }  

  protected shouldCloserHaveSpace(left: ts.Node, right: ts.Node ) {
    if ( left.getText().trim() == ''  ) return false;
    if (this.isSpaceBetween(left, right)) return false;
    if (this.spaced) return !this.isCloserException( left.getLastToken() );
    return this.isCloserException( left.getLastToken() );
  }

  private shouldOpenerRejectSpace(left: ts.Node, right: ts.Node) {
    if (right.getText().trim() =='' ) return false;
    if (this.isLineBreakBetween(left, right)) return false;
    if (!this.isSpaceBetween(left, right)) return false;
    if (this.spaced) return this.isOpenerException( right.getFirstToken() );
    return !this.isOpenerException( right.getFirstToken() );
  }

  private shouldCloserRejectSpace(left: ts.Node, right: ts.Node) {
    if (  left.getText().trim() == ''  ) return false;
    if (this.isLineBreakBetween(left, right)) return false;
    if (!this.isSpaceBetween(left, right))  return false;
    if (this.spaced)  return this.isCloserException( left.getLastToken() );
    return !this.isCloserException( left.getLastToken() );
  }

  protected isOpenerException(token: ts.Node) {
    if( !token ) return false;
    return  this.getExceptions().openers.indexOf( token.kind ) >= 0;
  }

  protected isCloserException(token: ts.Node) {
    if( !token ) return false;
    return  this.getExceptions().closers.indexOf( token.kind ) >= 0;
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
