import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Expected error to be handled';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const languageService = Lint.createLanguageService(sourceFile.fileName, sourceFile.getFullText());
    return this.applyWithWalker(new ErrCallbackHandlerWalker(sourceFile, this.getOptions(), languageService));
  }
}

class ErrCallbackHandlerWalker extends Lint.RuleWalker {
  private languageService: ts.LanguageService;
  private errorRegex: RegExp;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions, languageService: ts.LanguageService) {
    super(sourceFile, options);
    this.languageService = languageService;
    const customExpression = options.ruleArguments[0] || 'err';

    if (customExpression.charAt(0) === '^') {
      this.errorRegex = new RegExp(customExpression);
    } else {
      this.errorRegex = new RegExp(`^${customExpression}$`);
    }
  }

  public visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    const parameter = node.parameters[0];

    if (parameter && this.errorRegex.test(parameter.name.getText())) {
      this.validateReferencesForVariable(parameter);
    }

    super.visitFunctionDeclaration(node);
  }

  private validateReferencesForVariable(node: ts.ParameterDeclaration) {
    const fileName = this.getSourceFile().fileName;
    const highlights = this.languageService.getDocumentHighlights(fileName, node.pos, [fileName]);
    if (!highlights || highlights[0].highlightSpans.length <= 1) {
      this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), Rule.FAILURE_STRING));
    }
  }
}
