import * as ts from 'typescript';
import * as Lint from 'tslint';

const OPTION_ALWAYS = 'always';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    always: {
      start: `A space is required after '{'`,
      end: `A space is required before '}'`
    },
    never: {
      start: `There should be no space after '{'`,
      end: `There should be no space before '}'`
    }
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new ObjectCurlySpacingWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class ObjectCurlySpacingWalker extends Lint.RuleWalker {

  private always: boolean;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    this.always = this.hasOption(OPTION_ALWAYS) || (this.getOptions() && this.getOptions().length === 0);
  }

  protected visitNode(node: ts.Node): void {
    const bracedKind = [
      ts.SyntaxKind.ObjectLiteralExpression,
      ts.SyntaxKind.ObjectBindingPattern,
      ts.SyntaxKind.NamedImports,
      ts.SyntaxKind.NamedExports
    ];
    if (bracedKind.indexOf(node.kind) > -1) {
      this.checkSpacingInsideBraces(node);
    }
    super.visitNode(node);
  }

  private checkSpacingInsideBraces(node: ts.Node): void {
    const text = node.getText();
    if (text.indexOf('\n') !== -1 || /^\{\s*\}$/.test(text)) {
      // Rule does not apply when the braces span multiple lines
      return;
    }
    const leadingSpace = text.match(/^\{(\s{0,2})/)[1].length;
    const trailingSpace = text.match(/(\s{0,2})}$/)[1].length;
    if (this.always) {
      if (leadingSpace === 0) {
        const fix = this.createFix(this.appendText(node.getStart() + 1, ' '));
        this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.always.start, fix));
      }
      if (trailingSpace === 0) {
        const fix = this.createFix(this.appendText(node.getEnd() - 1, ' '));
        this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.always.end, fix));
      }
    } else {
      if (leadingSpace > 0) {
        const fix = this.createFix(this.deleteText(node.getStart() + 1, leadingSpace));
        this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.never.start, fix));
      }
      if (trailingSpace > 0) {
        const fix = this.createFix(this.deleteText(node.getEnd() - trailingSpace - 1, trailingSpace));
        this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.never.end, fix));
      }
    }
  }
}
