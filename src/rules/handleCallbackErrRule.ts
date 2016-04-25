import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = 'error parameter not handled';

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

        if (customExpression.indexOf('^') === 0) {
          this.errorRegex = new RegExp(customExpression);
        } else {
          this.errorRegex = new RegExp(`^${customExpression}$`);
        }
    }

    public visitFunctionDeclaration(node: ts.FunctionDeclaration) {
        node.parameters
          .filter(parameter => this.errorRegex.test(parameter.name.getText()))
          .forEach((parameter) => {
            this.validateReferencesForVariable(parameter.name.getText(), parameter.pos);
        });

        super.visitFunctionDeclaration(node);
    }

    private validateReferencesForVariable(name: string, position: number) {
        const fileName = this.getSourceFile().fileName;
        const highlights = this.languageService.getDocumentHighlights(fileName, position, [fileName]);
        if (highlights === null || highlights[0].highlightSpans.length <= 1) {
          this.addFailure(this.createFailure(position, name.length, `${Rule.FAILURE_STRING}'${name}'`));
        }
    }
}
