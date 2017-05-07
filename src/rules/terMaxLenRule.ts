/**
 * This is a port of eslint:max-len.
 *
 * source file: https://github.com/eslint/eslint/blob/master/lib/rules/max-len.js
 * git commit hash: 183def6115cad6f17c82ef1c1a245eb22d0bee83
 *
 * An addition exception has been added: ignoreImports.
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

import { forEachTokenWithTrivia } from 'tsutils';
import { IDisabledInterval } from 'tslint/lib/language/rule/rule';

const RULE_NAME = 'ter-max-len';
const CODE: string = 'code';
const COMMENTS: string = 'comments';
const TAB_WIDTH: string = 'tabWidth';
const IGNORE_PATTERN: string = 'ignorePattern';
const IGNORE_COMMENTS: string = 'ignoreComments';
const IGNORE_STRINGS: string = 'ignoreStrings';
const IGNORE_URLS: string = 'ignoreUrls';
const IGNORE_TEMPLATE_LITERALS: string = 'ignoreTemplateLiterals';
const IGNORE_REG_EXP_LITERALS: string = 'ignoreRegExpLiterals';
const IGNORE_TRAILING_COMMENTS: string = 'ignoreTrailingComments';
const IGNORE_IMPORTS: string = 'ignoreImports';

/**
 * Computes the length of a line that may contain tabs. The width of each tab will be the number of
 * spaces to the next tab stop.
 */
function computeLineLength(line: string, tabWidth: number) {
  let extraCharacterCount = 0;
  line.replace(/\t/g, (_, offset) => {
    const totalOffset = offset + extraCharacterCount;
    const previousTabStopOffset = tabWidth ? totalOffset % tabWidth : 0;
    const spaceCount = tabWidth - previousTabStopOffset;
    extraCharacterCount += spaceCount - 1;  // -1 for the replaced tab
    return '\t';
  });
  return line.length + extraCharacterCount;
}

/**
 * Tells if a comment encompasses the entire line.
 */
function isFullLineComment(line: string, lineNumber: number, comment: INode) {
  const start = comment.start;
  const end = comment.end;
  const isFirstTokenOnLine = !line.slice(0, start[1]).trim();

  return comment &&
    (start[0] < lineNumber || (start[0] === lineNumber && isFirstTokenOnLine)) &&
    (end[0] > lineNumber || (end[0] === lineNumber && end[1] === line.length));
}

/**
 * Tells if a given comment is trailing: it starts on the current line and extends to or past the
 * end of the current line.
 */
function isTrailingComment(line: string, lineNumber: number, comment: INode) {
  return comment &&
    (comment.start[0] === lineNumber && lineNumber <= comment.end[0]) &&
    (comment.end[0] > lineNumber || comment.end[1] === line.length);
}

/**
 * Gets the line after the comment and any remaining trailing whitespace is stripped.
 */
function stripTrailingComment(line: string, comment: INode) {
  return line.slice(0, comment.start[1]).replace(/\s+$/, '');
}

/**
 * A reducer to group an AST node by line number, both start and end.
 */
function groupByLineNumber(acc, node: INode) {
  const startLoc = node.start;
  const endLoc = node.end;

  for (let i = startLoc[0]; i <= endLoc[0]; ++i) {
    if (!Array.isArray(acc[i])) {
      acc[i] = [];
    }
    acc[i].push(node);
  }
  return acc;
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'enforce a maximum line length',
    rationale: Lint.Utils.dedent`
      Limiting the length of a line of code improves code readability.
      It also makes comparing code side-by-side easier and improves compatibility with
      various editors, IDEs, and diff viewers.
      `,
    optionsDescription: Lint.Utils.dedent`
      An integer indicating the maximum length of lines followed by an optional integer specifying
      the character width for tab characters.

      An optional object may be provided to fine tune the rule:

      * \`"${CODE}"\`: (default 80) enforces a maximum line length
      * \`"${TAB_WIDTH}"\`: (default 4) specifies the character width for tab characters
      * \`"${COMMENTS}"\`: enforces a maximum line length for comments; defaults to value of code
      * \`"${IGNORE_PATTERN}"\`: ignores lines matching a regular expression; can only match a single
                                 line and need to be double escaped when written in JSON
      * \`"${IGNORE_COMMENTS}"\`: true ignores all trailing comments and comments on their own line
      * \`"${IGNORE_TRAILING_COMMENTS}"\`: true ignores only trailing comments
      * \`"${IGNORE_URLS}"\`: true ignores lines that contain a URL
      * \`"${IGNORE_STRINGS}"\`: true ignores lines that contain a double-quoted or single-quoted string
      * \`"${IGNORE_TEMPLATE_LITERALS}"\`: true ignores lines that contain a template literal
      * \`"${IGNORE_REG_EXP_LITERALS}"\`: true ignores lines that contain a RegExp literal
      * \`"${IGNORE_IMPORTS}"\`: true ignores lines that contain an import module specifier
      `,
    options: {
      type: 'array',
      items: [{
        type: 'number',
        minimum: '0'
      }, {
        type: 'object',
        properties: {
          [CODE]: {
            type: 'number',
            minumum: '1'
          },
          [COMMENTS]: {
            type: 'number',
            minumum: '1'
          },
          [TAB_WIDTH]: {
            type: 'number',
            minumum: '1'
          },
          [IGNORE_PATTERN]: {
            type: 'string'
          },
          [IGNORE_COMMENTS]: {
            type: 'boolean'
          },
          [IGNORE_STRINGS]: {
            type: 'boolean'
          },
          [IGNORE_URLS]: {
            type: 'boolean'
          },
          [IGNORE_TEMPLATE_LITERALS]: {
            type: 'boolean'
          },
          [IGNORE_REG_EXP_LITERALS]: {
            type: 'boolean'
          },
          [IGNORE_TRAILING_COMMENTS]: {
            type: 'boolean'
          },
          [IGNORE_IMPORTS]: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }],
      minLength: 1,
      maxLength: 3
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, 100]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [
          true,
          100,
          2,
          {
            "${IGNORE_URLS}": true,
            "${IGNORE_PATTERN}": "^\\\\s*(let|const)\\\\s.+=\\\\s*require\\\\s*\\\\("
          }
        ]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [
          true,
          {
            "${CODE}": 100,
            "${TAB_WIDTH}": 2,
            "${IGNORE_IMPORTS}": true,
            "${IGNORE_URLS}": true,
            "${IGNORE_PATTERN}": "^\\\\s*(let|const)\\\\s.+=\\\\s*require\\\\s*\\\\("
          }
        ]
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  public static URL_REGEXP = /[^:/?#]:\/\/[^?#]/;

  public static mergeOptions(options: any[]): { [key: string]: any } {
    const optionsObj: { [key: string]: any } = {};
    let obj = options[0];
    if (typeof obj === 'number') {
      optionsObj[CODE] = obj || 80;
      obj = options[1];
    }
    if (typeof obj === 'number') {
      optionsObj[TAB_WIDTH] = obj || 4;
      obj = options[2];
    }
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      Object.keys(obj).forEach((key) => {
        optionsObj[key] = obj[key];
      });
    }
    optionsObj[CODE] = optionsObj[CODE] || 80;
    optionsObj[TAB_WIDTH] = optionsObj[TAB_WIDTH] || 4;
    return optionsObj;
  }

  public isEnabled(): boolean {
    if (super.isEnabled()) {
      const options = this.getOptions().ruleArguments;
      const option = options[0];
      if (typeof option === 'number' && option > 0) {
        return true;
      }
      // Check if using objects
      const optionsObj = Rule.mergeOptions(options);
      if (optionsObj[CODE]) {
        return true;
      }
    }
    return false;
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new MaxLenWalker(sourceFile, this.getOptions()));
  }
}

interface INode {
  start: [number, number];
  end: [number, number];
  startPosition: number;
  endPosition: number;
  text: string;
  kind: number;
}

class MaxLenWalker extends Lint.RuleWalker {
  private ignoredIntervals: IDisabledInterval[] = [];
  private optionsObj: { [key: string]: any } = {};
  private comments: INode[] = [];
  private strings: INode[] = [];
  private templates: INode[] = [];
  private regExp: INode[] = [];

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    this.optionsObj = Rule.mergeOptions(this.getOptions());
  }

  public hasOption(option: string): boolean {
    if (this.optionsObj[option] && this.optionsObj[option]) {
      return true;
    }
    return false;
  }

  public getOption(option: string): any {
    return this.optionsObj[option];
  }

  protected visitStringLiteral(node: ts.StringLiteral): void {
    this.strings.push(this.getINode(node.kind, node.getText(), node.getStart()));
    super.visitStringLiteral(node);
  }

  protected visitRegularExpressionLiteral(node: ts.Node): void {
    this.regExp.push(this.getINode(node.kind, node.getText(), node.getStart()));
    super.visitRegularExpressionLiteral(node);
  }

  public getINode(kind: number, text: string, startPos: number): INode {
    const width = text.length;
    const src = this.getSourceFile();
    const startLoc = src.getLineAndCharacterOfPosition(startPos);
    const endLoc = src.getLineAndCharacterOfPosition(startPos + width);
    return {
      kind,
      text,
      startPosition: startPos,
      endPosition: startPos + width,
      start: [startLoc.line, startLoc.character],
      end: [endLoc.line, endLoc.character]
    };
  }

  public visitSourceFile(node: ts.SourceFile) {
    super.visitSourceFile(node);

    forEachTokenWithTrivia(node, (text, token, range) => {
      if (
        token === ts.SyntaxKind.SingleLineCommentTrivia ||
        token === ts.SyntaxKind.MultiLineCommentTrivia
      ) {
        this.comments.push(this.getINode(token, text.substring(range.pos, range.end), range.pos));
      } else if (token === ts.SyntaxKind.FirstTemplateToken) {
        this.templates.push(this.getINode(token, text.substring(range.pos, range.end), range.pos));
      }
    });

    // We should have all the ignored intervals, comments, strings, templates, etc...
    // lets find those long lines
    this.findFailures(node);
  }

  protected visitImportDeclaration(node: ts.ImportDeclaration) {
    super.visitImportDeclaration(node);
    /* We only care to see the module specifier, not the whole import declaration. This covers
     the following case:

     import {
     ...
     } from 'this is the module specifier, this line should be ignored only, not the rest of the import';

     */
    const startPos = node.moduleSpecifier.getStart();
    const text = node.moduleSpecifier.getText();
    const width = text.length;
    if (this.hasOption(IGNORE_IMPORTS)) {
      this.ignoredIntervals.push({
        endPosition: startPos + width,
        startPosition: startPos
      });
    }
  }

  public findFailures(sourceFile: ts.SourceFile) {
    const lineStarts = sourceFile.getLineStarts();
    const source = sourceFile.getFullText();

    const lineLimit = this.getOption(CODE) || 80;
    const ignoreTrailingComments = this.getOption(IGNORE_TRAILING_COMMENTS) ||
      this.getOption(IGNORE_COMMENTS) ||
      false;
    const ignoreComments = this.getOption(IGNORE_COMMENTS) || false;
    const ignoreStrings = this.getOption(IGNORE_STRINGS) || false;
    const ignoreTemplateLiterals = this.getOption(IGNORE_TEMPLATE_LITERALS) || false;
    const ignoreUrls = this.getOption(IGNORE_URLS) || false;
    const ignoreRexExpLiterals = this.getOption(IGNORE_REG_EXP_LITERALS) || false;
    const pattern = this.getOption(IGNORE_PATTERN) || null;
    const tabWidth = this.getOption(TAB_WIDTH) || 4;
    const maxCommentLength = this.getOption(COMMENTS);

    const comments: INode[] = ignoreComments || maxCommentLength || ignoreTrailingComments ? this.comments : [];

    let commentsIndex = 0;
    const stringsByLine = this.strings.reduce(groupByLineNumber, {});
    const templatesByLine = this.templates.reduce(groupByLineNumber, {});
    const regExpByLine = this.regExp.reduce(groupByLineNumber, {});
    const totalLines = lineStarts.length;

    for (let i = 0; i < totalLines; ++i) {
      const from = lineStarts[i];
      const to = lineStarts[i + 1];
      let line = source.substring(from, i === totalLines - 1 ? to : to - 1);
      let lineIsComment = false;

      /*
       * We can short-circuit the comment checks if we're already out of
       * comments to check.
       */
      if (commentsIndex < comments.length) {
        let comment: INode;

        // iterate over comments until we find one past the current line
        do {
          comment = comments[++commentsIndex];
        } while (comment && comment.start[0] <= i);

        // and step back by one
        comment = comments[--commentsIndex];

        if (isFullLineComment(line, i, comment)) {
          lineIsComment = true;
        } else if (ignoreTrailingComments && isTrailingComment(line, i, comment)) {
          line = stripTrailingComment(line, comment);
        }
      }

      if (
        ignoreUrls && Rule.URL_REGEXP.test(line) ||
        pattern && new RegExp(pattern).test(line) ||
        ignoreStrings && stringsByLine[i] ||
        ignoreTemplateLiterals && templatesByLine[i] ||
        ignoreRexExpLiterals && regExpByLine[i]
      ) {
        // ignore this line
        continue;
      }

      const lineLength = computeLineLength(line, tabWidth);
      if (lineIsComment && ignoreComments) {
        continue;
      }

      let ruleFailure: Lint.RuleFailure | null = null;
      if (lineIsComment && exceedLineLimit(lineLength, maxCommentLength, source[to - 2])) {
        ruleFailure = new Lint.RuleFailure(
          sourceFile, from, to - 1,
          `Line ${i + 1} exceeds the maximum comment line length of ${maxCommentLength}.`,
          RULE_NAME
        );
      } else if (exceedLineLimit(lineLength, lineLimit, source[to - 2])) {
        ruleFailure = new Lint.RuleFailure(
          sourceFile, from, to - 1,
          `Line ${i + 1} exceeds the maximum line length of ${lineLimit}.`,
          RULE_NAME
        );
      }

      if (ruleFailure && !Lint.doesIntersect(ruleFailure, this.ignoredIntervals)) {
        this.addFailure(ruleFailure);
      }
    }
  }
}

function exceedLineLimit(lineLength: number, lineLimit: number, secondToLast: string): boolean {
  // first condition is whether the line is larger than the line limit
  // second to check for windows line endings, that is, check to make sure it is not the case
  // that we are only over by the limit by exactly one and that the character we are over the
  // limit by is a '\r' character which does not count against the limit
  // (and thus we are not actually over the limit).
  return lineLength > lineLimit && !((lineLength - 1) === lineLimit && secondToLast === '\r');
}
