import * as ts from 'typescript';
import * as Lint from 'tslint';

interface IObjectCurlySpacingOptions {
  spaced: boolean;
  arraysInObjectsException: boolean;
  objectsInObjectsException: boolean;
}

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

  private formatOptions(ruleArgs: any[]): IObjectCurlySpacingOptions {
    const spaced = ruleArgs[0] === 'always';
    const isOptionSet = (option: string) => {
      return ruleArgs[1] ? ruleArgs[1][option] === !spaced : false;
    };
    return {
      spaced,
      arraysInObjectsException: isOptionSet('arraysInObjects'),
      objectsInObjectsException: isOptionSet('objectsInObjects')
    };
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const options = this.formatOptions(this.ruleArguments);
    const walker = new ObjectCurlySpacingWalker(sourceFile, this.ruleName, options);
    return this.applyWithWalker(walker);
  }
}

class ObjectCurlySpacingWalker extends Lint.AbstractWalker<IObjectCurlySpacingOptions> {
  public walk(sourceFile: ts.SourceFile) {
    const cb = (node: ts.Node): void => {
      const bracedKind = [
        ts.SyntaxKind.ObjectLiteralExpression,
        ts.SyntaxKind.ObjectBindingPattern,
        ts.SyntaxKind.NamedImports,
        ts.SyntaxKind.NamedExports
      ];
      if (bracedKind.indexOf(node.kind) > -1) {
        this.checkSpacingInsideBraces(node);
      }
      return ts.forEachChild(node, cb);
    };
    return ts.forEachChild(sourceFile, cb);
  }

  private checkSpacingInsideBraces(node: ts.Node): void {
    const text = node.getText();
    if (text.indexOf('\n') !== -1 || /^\{\s*\}$/.test(text)) {
      // Rule does not apply when the braces span multiple lines
      return;
    }
    // We have matching braces, lets find out number of leading and trailing spaces
    const leadingSpace = text.match(/^\{(\s{0,2})/)![1].length;
    const trailingSpace = text.match(/(\s{0,2})}$/)![1].length;
    if (this.options.spaced) {
      if (leadingSpace === 0) {
        const fix = Lint.Replacement.appendText(node.getStart() + 1, ' ');
        this.addFailureAt(node.getStart(this.sourceFile), 1, Rule.FAILURE_STRING.always.start, fix);
      }
      if (trailingSpace === 0) {
        const fix = Lint.Replacement.appendText(node.getEnd() - 1, ' ');
        this.addFailureAt(node.getEnd() - 1, 1, Rule.FAILURE_STRING.always.end, fix);
      }
    } else {
      if (leadingSpace > 0) {
        const fix = Lint.Replacement.deleteText(node.getStart() + 1, leadingSpace);
        this.addFailureAt(node.getStart(this.sourceFile), 1, Rule.FAILURE_STRING.never.start, fix);
      }
      if (trailingSpace > 0) {
        const fix = Lint.Replacement.deleteText(node.getEnd() - trailingSpace - 1, trailingSpace);
        this.addFailureAt(node.getEnd() - 1, 1, Rule.FAILURE_STRING.never.end, fix);
      }
    }
  }
}
