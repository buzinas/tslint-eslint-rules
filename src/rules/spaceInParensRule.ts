import * as ts from 'typescript';
import * as Lint from 'tslint';

//const RULE_NAME = 'space-in-parens';
const ALWAYS = 'always';

export class Rule extends Lint.Rules.AbstractRule {

  public static FAILURE_STRING = {
    always: {
      start: `A space is required after '('`,
      end: `A space is required before ')'`
    },
    never: {
      start: `There should be no space after '('`,
      end: `There should be no space before ')'`
    }
  };
  
  
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
  private bracketException:boolean;
  private parenException:boolean;
  private ruleOptions;
  //private options;
 //private exceptions;
  
  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    //sourceFile.
    this.ruleOptions = this.getOptions();
    this.spaced = this.hasOption(ALWAYS) || (this.ruleOptions && this.ruleOptions.length === 0);

    if (this.ruleOptions[1]) {
      //console.log( 'ruleOptions[1]' , ruleOptions[1] );
      this.exceptionsArrayOptions = (this.ruleOptions.length === 2) ? this.ruleOptions[1].exceptions : [] ;
     // console.log( 'exceptionsArrayOptions' , this.exceptionsArrayOptions );
      

      // this.options = {};
      if (this.exceptionsArrayOptions.length) {
          this.braceException = this.exceptionsArrayOptions.indexOf("{}") !== -1;
          this.bracketException = this.exceptionsArrayOptions.indexOf("[]") !== -1;
          this.parenException = this.exceptionsArrayOptions.indexOf("()") !== -1;
      //     this.options.empty = this.exceptionsArrayOptions.indexOf("empty") !== -1;
      } 
    }
  }  
  
  protected visitNode(node: ts.Node): void {
    super.visitNode(node);
    if(node.kind === ts.SyntaxKind.CallExpression) {
      this.checkCallExpressions(node);
    }
    if(node.kind === ts.SyntaxKind.ParenthesizedExpression) {
      this.checkParenSpaces(node);
    }
    if(node.kind === ts.SyntaxKind.ParenthesizedExpression) {
      this.checkParenSpaces(node);
    }    

  //   // if (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
  //   //   this.checkParenSpaces(node);
  //   // }
  //   const parenKind = [
  //     ts.SyntaxKind.CallExpression,
  //     ts.SyntaxKind.MethodDeclaration,
  //     ts.SyntaxKind.ParenthesizedExpression,
  //     ts.SyntaxKind.ParenthesizedType,
  //     ts.SyntaxKind.ArrowFunction,
  //     ts.SyntaxKind.FunctionDeclaration,
  //     ts.SyntaxKind.FunctionExpression,
  //     ts.SyntaxKind.CatchClause,
  //     ts.SyntaxKind.IfStatement,
  //     ts.SyntaxKind.ForStatement,
  //     ts.SyntaxKind.ForInStatement,
  //     ts.SyntaxKind.ForOfStatement,
  //     ts.SyntaxKind.WhileStatement,
  //   ];
  //  if (parenKind.indexOf(node.kind) > -1) {
  //     this.checkParenSpaces(node);
  //   }
  }
  
  private checkCallExpressions(node: ts.Node): void {
      const text = node.getText();
      console.log( 'childrens1 :' , node.getChildren()[0].getFullText() );
      console.log( 'childrens2 :' , node.getChildren()[1].getFullText() );
      console.log( 'childrens3 :' , node.getChildren()[2].getFullText() );
      console.log( 'childrens4 :' , node.getChildren()[3].getFullText() );
      console.log('checkCallExpressions.text:', text);
      let children = node.getChildren();

      if( children[2].getChildren().length === 0 ) return;
      let isSpaceAfterOpening = this.isSpaceBetween(children[1], children[2]);
      let isSpaceBeforeClosing = this.isSpaceBetween( children[children.length - 2], children[children.length - 1]);

      let isLineBrakesAfterOpening = this.isLineBreakBetween(children[1], children[2]);
      let isLineBrakesBeforeClosing = this.isLineBreakBetween( children[children.length - 2], children[children.length - 1]);

      console.log( 'braceException' , this.braceException );
         
      if (this.spaced && !this.braceException && !this.bracketException && !this.parenException ) {

          if ( !isSpaceAfterOpening && !isLineBrakesAfterOpening ) {
            this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.always.start));
          }
          if ( !isSpaceBeforeClosing && !isLineBrakesBeforeClosing ) {
            this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.always.end));
          }

      } else if( this.spaced && ( this.braceException || this.bracketException || this.parenException )  ){

          if( children[2].getFirstToken().kind == ts.SyntaxKind.OpenBraceToken || 
              children[2].getFirstToken().kind == ts.SyntaxKind.OpenBracketToken || 
              children[2].getFirstToken().kind == ts.SyntaxKind.OpenParenToken
          ){
              console.log('found begining');
              return
              
          } else if ( !isSpaceAfterOpening && !isLineBrakesAfterOpening )  {  
            this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.always.start));
          }

          if( children[2].getLastToken().kind == ts.SyntaxKind.CloseBraceToken || 
              children[2].getLastToken().kind == ts.SyntaxKind.CloseBracketToken || 
              children[2].getLastToken().kind == ts.SyntaxKind.CloseParenToken
          ){
              console.log('found last');
              return;
          }else if ( !isSpaceBeforeClosing && !isLineBrakesBeforeClosing ){
            this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.always.end));
          }

      }     
      else {
        if ( isSpaceAfterOpening && !isLineBrakesAfterOpening  ) {
          this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.never.start));
        }
        if ( isSpaceBeforeClosing && !isLineBrakesBeforeClosing ) {
          this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.never.end));
        }
      } 

  }
  
  public checkParenSpaces(node: ts.Node): void {
      let text = node.getText();
      if (text.indexOf('\n') !== -1 || text === '()') {
        // Rule does not apply when the parens span multiple lines
        return;
      }

      let children = node.getChildren();
      let isSpaceAfterOpening = this.isSpaceBetween(children[0], children[1]);
      let isSpaceBeforeClosing = this.isSpaceBetween(children[children.length - 2], children[children.length - 1]);

      let isLineBrakesAfterOpening = this.isLineBreakBetween(children[0], children[1]);
      let isLineBrakesBeforeClosing = this.isLineBreakBetween( children[children.length - 2], children[children.length - 1]);

      
      if (this.spaced) {
        if ( !isSpaceAfterOpening && !isLineBrakesAfterOpening ) {
          this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.always.start));
        }
        if ( !isSpaceBeforeClosing && !isLineBrakesBeforeClosing ) {
          this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.always.end));
        }
      } else {
        if ( isSpaceAfterOpening && !isLineBrakesAfterOpening  ) {
          this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.never.start));
        }
        if ( isSpaceBeforeClosing && !isLineBrakesBeforeClosing ) {
          this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.never.end));
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
