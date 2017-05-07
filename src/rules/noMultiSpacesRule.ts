import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoMultiSpacesWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

/**
 * General idea behind this walker. First we locate the indices in the source code where the
 * rule is broken. Once we have them we walk over all the children (and I mean all possible ones)
 * and we keep track of them if their range is within a position where the rule is broken.
 * At the end we should have a map of "targets" (the positions where the rule was broken) to the
 * node that contains it. This node is special because it will have the minimum range containing
 * the target out of the possible nodes that do.
 *
 * To report the failures we simply wait till we reach the last node in our walk and start reporting
 * our findings.
 *
 * Note: This idea took inspiration from eslint:
 *
 *    https://github.com/eslint/eslint/blob/master/lib/rules/no-multi-spaces.js
 */
class NoMultiSpacesWalker extends Lint.RuleWalker {

  private EXCEPTION_MAP = {
    [ts.SyntaxKind.VariableDeclaration]: 'VariableDeclaration',
    [ts.SyntaxKind.PropertyAssignment]: 'PropertyAssignment',
    [ts.SyntaxKind.BinaryExpression]: 'BinaryExpression'
  };
  private STRING_TYPES = [
    ts.SyntaxKind.NoSubstitutionTemplateLiteral,
    ts.SyntaxKind.StringLiteral
  ];
  private exceptions: Object = {};
  private src: string;
  private targets: number[] = [];
  private lastNode: ts.Node;
  private targetNode = {};
  private targetIndex = 0;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const opt = this.getOptions();
    this.src = sourceFile.getFullText();
    if (opt.length) {
      this.exceptions = opt[0].exceptions || {};
    }
    // Some defaults on the exceptions
    if (this.exceptions['PropertyAssignment'] === undefined) {
      this.exceptions['PropertyAssignment'] = true;
    }

    const pattern: RegExp = /[^\n\r\u2028\u2029\t ].? {2,}/g;
    while (pattern.test(this.src)) {
      this.targets.push(pattern.lastIndex);
      this.targetNode[pattern.lastIndex] = sourceFile;
    }
    this.lastNode = sourceFile.getLastToken();
  }

  private inRange(x, range) {
    return x >= range[0] && x <= range[1];
  }

  private warn(value, pos, node) {
    const msg = `Multiple spaces found before '${value}'.`;
    const exceptionName = this.EXCEPTION_MAP[node.parent.kind];

    let report = true;
    const start: number = node.getFullStart() - 1;
    const previousChar: string = this.src.substring(start, start + 1);

    if (exceptionName && this.exceptions[exceptionName]) {
      // Should only report if it follows a comma
      if (previousChar !== ',') {
        report = false;
      }
    }

    // Sneaky property assignments may have many nested children. Lets check if one of
    // the parents is one of those.
    if (previousChar === ':') {
      let crt = node.parent;
      while (crt.kind !== ts.SyntaxKind.SourceFile) {
        crt = crt.parent;
        if (crt.kind === ts.SyntaxKind.PropertyAssignment) {
          if (this.exceptions['PropertyAssignment']) {
            report = false;
          }
          break;
        }
      }
    }

    if (report) {
      this.addFailure(this.createFailure(pos, value.length, msg));
    }
  }

  protected walkChildren(node: ts.Node): void {
    const range = [node.getStart(), node.getEnd()];
    for (let i = this.targetIndex, len = this.targets.length, target; i < len; i++) {
      target = this.targets[i];
      if (this.inRange(target, range)) {
        // Store the node with the smallest range containing
        // the target (the index where the multi-space occurs)
        this.targetNode[target] = node;
      }
      if (range[0] > this.targets[this.targetIndex]) {
        // No need to keep checking the low indices since the nodes have passed them.
        this.targetIndex++;
      }
    }
    if (node === this.lastNode) {
      // Time to display the warnings
      this.targets.forEach((target) => {
        const valid: ts.Node = this.targetNode[target];
        if (target === valid.getStart()) {
          this.warn(valid.getText(), target, valid);
        } else if (target === valid.getEnd() - 1 && this.STRING_TYPES.indexOf(valid.kind) === -1) {
          const endChar = this.src.substring(target, valid.getEnd());
          this.warn(endChar, target, valid);
        } else {
          if (this.src.charAt(target) !== '\n' && valid.kind !== ts.SyntaxKind.SourceFile) {
            // trailing spaces are considered multiple spaces: no-trailing-whitespaces handles it
            // If the node containing the multispace is the whole document then it must be either
            // in a comment or a string. Uncomment the next line to see what we may have missed:
            // console.log(target, ':', [valid.getStart(), valid.getEnd()], [valid.getText(), valid.kind]]);
          }
        }
      });
    }
    // Somehow super.walkChildren(node) does not visit all the node children, doing manually.
    const children: ts.Node[] = node.getChildren();
    for (let index in children) {
      this.visitNode(children[index]);
    }
  }
}
