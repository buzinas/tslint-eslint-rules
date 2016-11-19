import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Expected error to be handled';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const languageService = Lint.createLanguageService(sourceFile.fileName, sourceFile.getFullText());
    return this.applyWithWalker(new ErrCallbackHandlerWalker(sourceFile, this.getOptions(), languageService));
  }
}

class ErrCallbackHandlerWalker extends Lint.RuleWalker {
  private languageService: ts.LanguageService;
  private errorCheck: (name: string) => boolean;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions, languageService: ts.LanguageService) {
    super(sourceFile, options);
    this.languageService = languageService;
    const errorArgument = options.ruleArguments[0] || 'err';

    if (errorArgument.charAt(0) === '^') {
      this.errorCheck = RegExp.prototype.test.bind(new RegExp(errorArgument));
    } else {
      this.errorCheck = (name) => name === errorArgument;
    }
  }

  public visitFunctionExpression(node: ts.FunctionExpression) {
    this.validateFunction(node);
    super.visitFunctionExpression(node);
  }

  public visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    this.validateFunction(node);
    super.visitFunctionDeclaration(node);
  }

  public visitArrowFunction(node: ts.ArrowFunction) {
    this.validateFunction(node);
    super.visitArrowFunction(node);
  }

  private validateFunction(node: ts.FunctionLikeDeclaration) {
    const parameter = node.parameters[0];

    if (parameter && this.errorCheck(parameter.name.getText())) {
      const fileName = this.getSourceFile().fileName;
      const highlights = this.languageService.getDocumentHighlights(fileName, parameter.pos, [fileName]);

      if (!highlights || highlights[0].highlightSpans.length <= 1) {
        this.addFailure(this.createFailure(parameter.name.getStart(), parameter.name.getWidth(), Rule.FAILURE_STRING));
      }
    }
  }
}
