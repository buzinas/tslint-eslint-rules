"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-max-len';
var CODE = 'code';
var COMMENTS = 'comments';
var TAB_WIDTH = 'tabWidth';
var IGNORE_PATTERN = 'ignorePattern';
var IGNORE_COMMENTS = 'ignoreComments';
var IGNORE_STRINGS = 'ignoreStrings';
var IGNORE_URLS = 'ignoreUrls';
var IGNORE_TEMPLATE_LITERALS = 'ignoreTemplateLiterals';
var IGNORE_REG_EXP_LITERALS = 'ignoreRegExpLiterals';
var IGNORE_TRAILING_COMMENTS = 'ignoreTrailingComments';
var IGNORE_IMPORTS = 'ignoreImports';
function computeLineLength(line, tabWidth) {
    var extraCharacterCount = 0;
    line.replace(/\t/g, function (_, offset) {
        var totalOffset = offset + extraCharacterCount;
        var previousTabStopOffset = tabWidth ? totalOffset % tabWidth : 0;
        var spaceCount = tabWidth - previousTabStopOffset;
        extraCharacterCount += spaceCount - 1;
        return '\t';
    });
    return line.length + extraCharacterCount;
}
function isFullLineComment(line, lineNumber, comment) {
    var start = comment.start;
    var end = comment.end;
    var isFirstTokenOnLine = !line.slice(0, start[1]).trim();
    return comment &&
        (start[0] < lineNumber || (start[0] === lineNumber && isFirstTokenOnLine)) &&
        (end[0] > lineNumber || (end[0] === lineNumber && end[1] === line.length));
}
function isTrailingComment(line, lineNumber, comment) {
    return comment &&
        (comment.start[0] === lineNumber && lineNumber <= comment.end[0]) &&
        (comment.end[0] > lineNumber || comment.end[1] === line.length);
}
function stripTrailingComment(line, comment) {
    return line.slice(0, comment.start[1]).replace(/\s+$/, '');
}
function groupByLineNumber(acc, node) {
    var startLoc = node.start;
    var endLoc = node.end;
    for (var i = startLoc[0]; i <= endLoc[0]; ++i) {
        if (!Array.isArray(acc[i])) {
            acc[i] = [];
        }
        acc[i].push(node);
    }
    return acc;
}
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.mergeOptions = function (options) {
        var optionsObj = {};
        var obj = options[0];
        if (typeof obj === 'number') {
            optionsObj[CODE] = obj || 80;
            obj = options[1];
        }
        if (typeof obj === 'number') {
            optionsObj[TAB_WIDTH] = obj || 4;
            obj = options[2];
        }
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            Object.keys(obj).forEach(function (key) {
                optionsObj[key] = obj[key];
            });
        }
        optionsObj[CODE] = optionsObj[CODE] || 80;
        optionsObj[TAB_WIDTH] = optionsObj[TAB_WIDTH] || 4;
        return optionsObj;
    };
    Rule.prototype.isEnabled = function () {
        if (_super.prototype.isEnabled.call(this)) {
            var options = this.getOptions().ruleArguments;
            var option = options[0];
            if (typeof option === 'number' && option > 0) {
                return true;
            }
            var optionsObj = Rule.mergeOptions(options);
            if (optionsObj[CODE]) {
                return true;
            }
        }
        return false;
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MaxLenWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: RULE_NAME,
    description: 'enforce a maximum line length',
    rationale: (_a = ["\n      Limiting the length of a line of code improves code readability.\n      It also makes comparing code side-by-side easier and improves compatibility with\n      various editors, IDEs, and diff viewers.\n      "], _a.raw = ["\n      Limiting the length of a line of code improves code readability.\n      It also makes comparing code side-by-side easier and improves compatibility with\n      various editors, IDEs, and diff viewers.\n      "], Lint.Utils.dedent(_a)),
    optionsDescription: (_b = ["\n      An integer indicating the maximum length of lines followed by an optional integer specifying\n      the character width for tab characters.\n\n      An optional object may be provided to fine tune the rule:\n\n      * `\"", "\"`: (default 80) enforces a maximum line length\n      * `\"", "\"`: (default 4) specifies the character width for tab characters\n      * `\"", "\"`: enforces a maximum line length for comments; defaults to value of code\n      * `\"", "\"`: ignores lines matching a regular expression; can only match a single\n                                 line and need to be double escaped when written in JSON\n      * `\"", "\"`: true ignores all trailing comments and comments on their own line\n      * `\"", "\"`: true ignores only trailing comments\n      * `\"", "\"`: true ignores lines that contain a URL\n      * `\"", "\"`: true ignores lines that contain a double-quoted or single-quoted string\n      * `\"", "\"`: true ignores lines that contain a template literal\n      * `\"", "\"`: true ignores lines that contain a RegExp literal\n      * `\"", "\"`: true ignores lines that contain an import module specifier\n      "], _b.raw = ["\n      An integer indicating the maximum length of lines followed by an optional integer specifying\n      the character width for tab characters.\n\n      An optional object may be provided to fine tune the rule:\n\n      * \\`\"", "\"\\`: (default 80) enforces a maximum line length\n      * \\`\"", "\"\\`: (default 4) specifies the character width for tab characters\n      * \\`\"", "\"\\`: enforces a maximum line length for comments; defaults to value of code\n      * \\`\"", "\"\\`: ignores lines matching a regular expression; can only match a single\n                                 line and need to be double escaped when written in JSON\n      * \\`\"", "\"\\`: true ignores all trailing comments and comments on their own line\n      * \\`\"", "\"\\`: true ignores only trailing comments\n      * \\`\"", "\"\\`: true ignores lines that contain a URL\n      * \\`\"", "\"\\`: true ignores lines that contain a double-quoted or single-quoted string\n      * \\`\"", "\"\\`: true ignores lines that contain a template literal\n      * \\`\"", "\"\\`: true ignores lines that contain a RegExp literal\n      * \\`\"", "\"\\`: true ignores lines that contain an import module specifier\n      "], Lint.Utils.dedent(_b, CODE, TAB_WIDTH, COMMENTS, IGNORE_PATTERN, IGNORE_COMMENTS, IGNORE_TRAILING_COMMENTS, IGNORE_URLS, IGNORE_STRINGS, IGNORE_TEMPLATE_LITERALS, IGNORE_REG_EXP_LITERALS, IGNORE_IMPORTS)),
    options: {
        type: 'array',
        items: [{
                type: 'number',
                minimum: '0'
            }, {
                type: 'object',
                properties: (_c = {},
                    _c[CODE] = {
                        type: 'number',
                        minumum: '1'
                    },
                    _c[COMMENTS] = {
                        type: 'number',
                        minumum: '1'
                    },
                    _c[TAB_WIDTH] = {
                        type: 'number',
                        minumum: '1'
                    },
                    _c[IGNORE_PATTERN] = {
                        type: 'string'
                    },
                    _c[IGNORE_COMMENTS] = {
                        type: 'boolean'
                    },
                    _c[IGNORE_STRINGS] = {
                        type: 'boolean'
                    },
                    _c[IGNORE_URLS] = {
                        type: 'boolean'
                    },
                    _c[IGNORE_TEMPLATE_LITERALS] = {
                        type: 'boolean'
                    },
                    _c[IGNORE_REG_EXP_LITERALS] = {
                        type: 'boolean'
                    },
                    _c[IGNORE_TRAILING_COMMENTS] = {
                        type: 'boolean'
                    },
                    _c[IGNORE_IMPORTS] = {
                        type: 'boolean'
                    },
                    _c),
                additionalProperties: false
            }],
        minLength: 1,
        maxLength: 3
    },
    optionExamples: [
        (_d = ["\n        \"", "\": [true, 100]\n        "], _d.raw = ["\n        \"", "\": [true, 100]\n        "], Lint.Utils.dedent(_d, RULE_NAME)),
        (_e = ["\n        \"", "\": [\n          true,\n          100,\n          2,\n          {\n            \"", "\": true,\n            \"", "\": \"^\\\\s*(let|const)\\\\s.+=\\\\s*require\\\\s*\\\\(\"\n          }\n        ]\n        "], _e.raw = ["\n        \"", "\": [\n          true,\n          100,\n          2,\n          {\n            \"", "\": true,\n            \"", "\": \"^\\\\\\\\s*(let|const)\\\\\\\\s.+=\\\\\\\\s*require\\\\\\\\s*\\\\\\\\(\"\n          }\n        ]\n        "], Lint.Utils.dedent(_e, RULE_NAME, IGNORE_URLS, IGNORE_PATTERN)),
        (_f = ["\n        \"", "\": [\n          true,\n          {\n            \"", "\": 100,\n            \"", "\": 2,\n            \"", "\": true,\n            \"", "\": true,\n            \"", "\": \"^\\\\s*(let|const)\\\\s.+=\\\\s*require\\\\s*\\\\(\"\n          }\n        ]\n        "], _f.raw = ["\n        \"", "\": [\n          true,\n          {\n            \"", "\": 100,\n            \"", "\": 2,\n            \"", "\": true,\n            \"", "\": true,\n            \"", "\": \"^\\\\\\\\s*(let|const)\\\\\\\\s.+=\\\\\\\\s*require\\\\\\\\s*\\\\\\\\(\"\n          }\n        ]\n        "], Lint.Utils.dedent(_f, RULE_NAME, CODE, TAB_WIDTH, IGNORE_IMPORTS, IGNORE_URLS, IGNORE_PATTERN))
    ],
    typescriptOnly: false,
    type: 'style'
};
Rule.URL_REGEXP = /[^:/?#]:\/\/[^?#]/;
exports.Rule = Rule;
var MaxLenWalker = (function (_super) {
    __extends(MaxLenWalker, _super);
    function MaxLenWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.ignoredIntervals = [];
        _this.optionsObj = {};
        _this.comments = [];
        _this.strings = [];
        _this.templates = [];
        _this.regExp = [];
        _this.optionsObj = Rule.mergeOptions(_this.getOptions());
        return _this;
    }
    MaxLenWalker.prototype.hasOption = function (option) {
        if (this.optionsObj[option] && this.optionsObj[option]) {
            return true;
        }
        return false;
    };
    MaxLenWalker.prototype.getOption = function (option) {
        return this.optionsObj[option];
    };
    MaxLenWalker.prototype.visitStringLiteral = function (node) {
        this.strings.push(this.getINode(node.kind, node.getText(), node.getStart()));
        _super.prototype.visitStringLiteral.call(this, node);
    };
    MaxLenWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.regExp.push(this.getINode(node.kind, node.getText(), node.getStart()));
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    MaxLenWalker.prototype.getINode = function (kind, text, startPos) {
        var width = text.length;
        var src = this.getSourceFile();
        var startLoc = src.getLineAndCharacterOfPosition(startPos);
        var endLoc = src.getLineAndCharacterOfPosition(startPos + width);
        return {
            kind: kind,
            text: text,
            startPosition: startPos,
            endPosition: startPos + width,
            start: [startLoc.line, startLoc.character],
            end: [endLoc.line, endLoc.character]
        };
    };
    MaxLenWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        _super.prototype.visitSourceFile.call(this, node);
        Lint.scanAllTokens(ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, node.text), function (scanner) {
            var token = scanner.getToken();
            var startPos = scanner.getStartPos();
            if (_this.getSkipEndFromStart(startPos)) {
                scanner.setTextPos(_this.getSkipEndFromStart(startPos));
                return;
            }
            if (token === ts.SyntaxKind.SingleLineCommentTrivia ||
                token === ts.SyntaxKind.MultiLineCommentTrivia) {
                _this.comments.push(_this.getINode(token, scanner.getTokenText(), startPos));
            }
            else if (token === ts.SyntaxKind.FirstTemplateToken) {
                _this.templates.push(_this.getINode(token, scanner.getTokenText(), startPos));
            }
        });
        this.findFailures(node);
    };
    MaxLenWalker.prototype.visitImportDeclaration = function (node) {
        _super.prototype.visitImportDeclaration.call(this, node);
        var startPos = node.moduleSpecifier.getStart();
        var text = node.moduleSpecifier.getText();
        var width = text.length;
        if (this.hasOption(IGNORE_IMPORTS)) {
            this.ignoredIntervals.push({
                endPosition: startPos + width,
                startPosition: startPos
            });
        }
    };
    MaxLenWalker.prototype.findFailures = function (sourceFile) {
        var lineStarts = sourceFile.getLineStarts();
        var source = sourceFile.getFullText();
        var lineLimit = this.getOption(CODE) || 80;
        var ignoreTrailingComments = this.getOption(IGNORE_TRAILING_COMMENTS) ||
            this.getOption(IGNORE_COMMENTS) ||
            false;
        var ignoreComments = this.getOption(IGNORE_COMMENTS) || false;
        var ignoreStrings = this.getOption(IGNORE_STRINGS) || false;
        var ignoreTemplateLiterals = this.getOption(IGNORE_TEMPLATE_LITERALS) || false;
        var ignoreUrls = this.getOption(IGNORE_URLS) || false;
        var ignoreRexExpLiterals = this.getOption(IGNORE_REG_EXP_LITERALS) || false;
        var pattern = this.getOption(IGNORE_PATTERN) || null;
        var tabWidth = this.getOption(TAB_WIDTH) || 4;
        var maxCommentLength = this.getOption(COMMENTS);
        var comments = ignoreComments || maxCommentLength || ignoreTrailingComments ? this.comments : [];
        var commentsIndex = 0;
        var stringsByLine = this.strings.reduce(groupByLineNumber, {});
        var templatesByLine = this.templates.reduce(groupByLineNumber, {});
        var regExpByLine = this.regExp.reduce(groupByLineNumber, {});
        var totalLines = lineStarts.length;
        for (var i = 0; i < totalLines; ++i) {
            var from = lineStarts[i];
            var to = lineStarts[i + 1];
            var line = source.substring(from, i === totalLines - 1 ? to : to - 1);
            var lineIsComment = false;
            if (commentsIndex < comments.length) {
                var comment = null;
                do {
                    comment = comments[++commentsIndex];
                } while (comment && comment.start[0] <= i);
                comment = comments[--commentsIndex];
                if (isFullLineComment(line, i, comment)) {
                    lineIsComment = true;
                }
                else if (ignoreTrailingComments && isTrailingComment(line, i, comment)) {
                    line = stripTrailingComment(line, comment);
                }
            }
            if (ignoreUrls && Rule.URL_REGEXP.test(line) ||
                pattern && new RegExp(pattern).test(line) ||
                ignoreStrings && stringsByLine[i] ||
                ignoreTemplateLiterals && templatesByLine[i] ||
                ignoreRexExpLiterals && regExpByLine[i]) {
                continue;
            }
            var lineLength = computeLineLength(line, tabWidth);
            if (lineIsComment && ignoreComments) {
                continue;
            }
            var ruleFailure = void 0;
            if (lineIsComment && exceedLineLimit(lineLength, maxCommentLength, source[to - 2])) {
                ruleFailure = new Lint.RuleFailure(sourceFile, from, to - 1, "Line " + (i + 1) + " exceeds the maximum comment line length of " + maxCommentLength + ".", RULE_NAME);
            }
            else if (exceedLineLimit(lineLength, lineLimit, source[to - 2])) {
                ruleFailure = new Lint.RuleFailure(sourceFile, from, to - 1, "Line " + (i + 1) + " exceeds the maximum line length of " + lineLimit + ".", RULE_NAME);
            }
            if (ruleFailure && !Lint.doesIntersect(ruleFailure, this.ignoredIntervals)) {
                this.addFailure(ruleFailure);
            }
        }
    };
    return MaxLenWalker;
}(Lint.SkippableTokenAwareRuleWalker));
function exceedLineLimit(lineLength, lineLimit, secondToLast) {
    return lineLength > lineLimit && !((lineLength - 1) === lineLimit && secondToLast === '\r');
}
var _a, _b, _c, _d, _e, _f;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxhQUFhLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDakMsc0JBQXNCLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDNUMsb0JBQW9CLElBQUksWUFBWSxDQUFDLENBQUMsQ0FDeEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUQsUUFBUSxDQUFDO1lBQ1gsQ0FBQztZQUVELElBQU0sVUFBVSxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNyRCxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsUUFBUSxDQUFDO1lBQ1gsQ0FBQztZQUVELElBQUksV0FBVyxTQUFrQixDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQ2hDLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDeEIsV0FBUSxDQUFDLEdBQUcsQ0FBQyxxREFBK0MsZ0JBQWdCLE1BQUcsRUFDL0UsU0FBUyxDQUNWLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQ2hDLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDeEIsV0FBUSxDQUFDLEdBQUcsQ0FBQyw2Q0FBdUMsU0FBUyxNQUFHLEVBQ2hFLFNBQVMsQ0FDVixDQUFDO1lBQ0osQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDSCxtQkFBQztBQUFELENBMUxBLEFBMExDLENBMUwwQixJQUFJLENBQUMsNkJBQTZCLEdBMEw1RDtBQUVELHlCQUF5QixVQUFrQixFQUFFLFNBQWlCLEVBQUUsWUFBb0I7SUFNbEYsTUFBTSxDQUFDLFVBQVUsR0FBRyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDOUYsQ0FBQyIsImZpbGUiOiJydWxlcy90ZXJNYXhMZW5SdWxlLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
