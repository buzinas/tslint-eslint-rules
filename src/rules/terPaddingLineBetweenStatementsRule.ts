import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

const enum PaddingTypes {
  Any = 'any',
  Never = 'never',
  Always = 'always'
}

const RULE_NAME = 'ter-padding-line-between-statements';
interface ITerPaddingLineBetweenStatementsOption {
  blankLine: PaddingTypes;
  prev: string | Array<string>;
  next: string | Array<string>;
}

function variableMatcher(kind: tsutils.VariableDeclarationKind): ((node: ts.Node) => boolean) {
  return (node: ts.Node) =>
    tsutils.isVariableStatement(node) &&
    tsutils.getVariableDeclarationKind(node.declarationList) === kind;
}

function isBlockLike(node: ts.Node) {
  return [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.DoStatement,
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.SwitchStatement,
    ts.SyntaxKind.TryStatement,
    ts.SyntaxKind.WhileStatement
  ].indexOf(node.kind) !== -1;
}

const matchers = {
  '*': (_: ts.Node) => true,
  'block': tsutils.isBlock,
  'block-like': isBlockLike,
  'break': tsutils.isBreakStatement,
  'case': tsutils.isCaseClause,
  'class': tsutils.isClassDeclaration,
  'const': variableMatcher(tsutils.VariableDeclarationKind.Const),
  'continue': tsutils.isContinueStatement,
  'debugger': tsutils.isDebuggerStatement,
  'default': tsutils.isDefaultClause,
  'do': tsutils.isDoStatement,
  'empty': tsutils.isEmptyStatement,
  'enum': tsutils.isEnumDeclaration,
  'export': (node: ts.Node) => tsutils.isExportDeclaration(node) || tsutils.isExportAssignment(node),
  'expression': tsutils.isExpressionStatement,
  'for': tsutils.isForStatement,
  'function': tsutils.isFunctionDeclaration,
  'if': tsutils.isIfStatement,
  'import': tsutils.isImportDeclaration,
  'interface': tsutils.isInterfaceDeclaration,
  'let': variableMatcher(tsutils.VariableDeclarationKind.Let),
  'return': tsutils.isReturnStatement,
  'switch': tsutils.isSwitchStatement,
  'throw': tsutils.isThrowStatement,
  'try': tsutils.isTryStatement,
  'var': variableMatcher(tsutils.VariableDeclarationKind.Var),
  'while': tsutils.isWhileStatement,
  'with': tsutils.isWithStatement
};

function match(node: ts.Node, types: string | Array<string>): boolean {
  if (typeof types === 'string') {
    return matchers[types](node);
  }

  return types.some(type => matchers[type](node));
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: '',
    rationale: Lint.Utils.dedent`
      This rule requires or disallows blank lines between the given 2 kinds of statements.
      Properly blank lines help developers to understand the code.
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule does nothing if no configurations are provided.
      A configuration is an object which has 3 properties; \`blankLine\`, \`prev\` and \`next\`.

      \`prev\` and \`next\` specify the type of statements between which to check for blank lines.
      They can be one of the following, or an array of the following.

      - \`"*"\` is a wildcard that matches any statement.
      - \`"block"\`
      - \`"block-like"\`
      - \`"break"\`
      - \`"case"\`
      - \`"class"\`
      - \`"const"\`
      - \`"continue"\`
      - \`"debugger"\`
      - \`"default"\`
      - \`"do"\`
      - \`"empty"\`
      - \`"enum"\`
      - \`"export"\`
      - \`"expression"\`
      - \`"for"\`
      - \`"function"\`
      - \`"if"\`
      - \`"import"\`
      - \`"interface"\`
      - \`"let"\`
      - \`"return"\`
      - \`"switch"\`
      - \`"throw"\`
      - \`"try"\`
      - \`"var"\`
      - \`"while"\`
      - \`"with"\`

      \`blankLine\` can be one of \`"always"\`, \`"never"\` or \`"any"\`

      - \`"always"\` requires one or more blank lines between the statement pair.
      - \`"never"\` disallows blank lines between the statement pair.
      - \`"any"\` just ignores the statement pair.

      If a statement pair matches multiple configurations, the last matched configuration will be used.
      `,
    options: {
      type: 'array',
      items: [{
        type: 'object',
        properties: {
          blankLine: {
            enum: ['always', 'never', 'any']
          },
          prev: {
            enum: Object.keys(matchers)
          },
          next: {
            enum: Object.keys(matchers)
          }
        },
        additionalProperties: false
      }]
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [
          true,
          { "blankLine": "always", "prev": "interface", "next": "*" },
          { "blankLine": "always", "prev": "*", "next": "interface" }
        ]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [
          true,
          { "blankLine": "never", "prev": ["var", "let", "const"], "next": ["var", "let", "const"] }
        ]
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  public static FAILURE_STRING = {
    unexpectedBlankLine: `Unexpected blank line before this statement.`,
    missingBlankLine: `Expected blank line before this statement.`
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.RuleWalker {
  private sourceText: string;
  private lines: Array<tsutils.LineRange>;
  private configs: Array<ITerPaddingLineBetweenStatementsOption>;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    this.configs = this.getOptions() || [];
    this.configs.reverse();
    this.sourceText = sourceFile.getText();
    this.lines = tsutils.getLineRanges(sourceFile);
  }

  protected visitNode(node: ts.Node): void {
    if (tsutils.isBlockLike(node)) {
      this.checkPaddingLineBetweenStatements(node.statements);
    } else if (tsutils.isCaseBlock(node)) {
      this.checkPaddingLineBetweenStatements(node.clauses);
    }
    super.visitNode(node);
  }

  private checkPaddingLineBetweenStatements(nodes: ts.NodeArray<ts.Node>): void {
    if (nodes.length < 2) {
      return;
    }

    const commentKind = [
      ts.SyntaxKind.JSDocComment,
      ts.SyntaxKind.SingleLineCommentTrivia,
      ts.SyntaxKind.MultiLineCommentTrivia
    ];

    let prev = nodes[0];

    for (let i = 1; i < nodes.length; i++) {
      const node = nodes[i];

      if (commentKind.indexOf(node.kind) !== -1) {
        continue;
      }
      this.verifyPadding(prev, node);

      prev = node;
    }
  }

  private verifyPadding(prevNode: ts.Node, node: ts.Node) {
    const paddingType = this.getPaddingType(prevNode, node);

    if (paddingType === PaddingTypes.Any) {
      return;
    }

    let hasPaddingLine = false;
    const startLine = this.getLine(prevNode.getEnd());
    const endLine = this.getLine(node.getStart());

    for (let i = startLine + 1; i < endLine; i++) {
      const line = this.lines[i];
      if (this.sourceText.substr(line.pos, line.contentLength).search(/\S/) === -1) {
        hasPaddingLine = true;
      }
    }

    if (!hasPaddingLine && paddingType === PaddingTypes.Always) {
      this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.missingBlankLine));
    }

    if (hasPaddingLine && paddingType === PaddingTypes.Never) {
      this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.unexpectedBlankLine));
    }
  }

  private getPaddingType(prevNode: ts.Node, node: ts.Node) {
    for (const config of this.configs) {
      const { blankLine, prev, next } = config;

      if (match(prevNode, prev) && match(node, next)) {
        return blankLine;
      }
    }

    return PaddingTypes.Any;
  }

  private getLine(position: number): number {
    return this.getSourceFile().getLineAndCharacterOfPosition(position).line;
  }
}
