"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-indent';
var DEFAULT_VARIABLE_INDENT = 1;
var DEFAULT_PARAMETER_INDENT = null;
var DEFAULT_FUNCTION_BODY_INDENT = 1;
var indentType = 'space';
var indentSize = 4;
var OPTIONS;
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (source !== undefined && source !== null) {
            for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                    target[nextKey] = source[nextKey];
                }
            }
        }
    });
    return target;
}
function isKind(node, kind) {
    return node.kind === ts.SyntaxKind[kind];
}
function isOneOf(node, kinds) {
    return kinds.some(function (kind) { return node.kind === ts.SyntaxKind[kind]; });
}
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new IndentWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: RULE_NAME,
    description: 'enforce consistent indentation',
    rationale: (_a = ["\n      Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n      cleaner diffs in version control, and easier programmatic manipulation.\n      "], _a.raw = ["\n      Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n      cleaner diffs in version control, and easier programmatic manipulation.\n      "], Lint.Utils.dedent(_a)),
    optionsDescription: (_b = ["\n      The string 'tab' or an integer indicating the number of spaces to use per tab.\n\n      An object may be provided to fine tune the indentation rules:\n            \n        * `\"SwitchCase\"` (default: 0) enforces indentation level for `case` clauses in\n                           `switch` statements\n        * `\"VariableDeclarator\"` (default: 1) enforces indentation level for `var` declarators;\n                                   can also take an object to define separate rules for `var`,\n                                   `let` and `const` declarations.\n        * `\"outerIIFEBody\"` (default: 1) enforces indentation level for file-level IIFEs.\n        * `\"MemberExpression\"` (off by default) enforces indentation level for multi-line\n                                 property chains (except in variable declarations and assignments)\n        * `\"FunctionDeclaration\"` takes an object to define rules for function declarations.\n            * `\"parameters\"` (off by default) enforces indentation level for parameters in a\n                               function declaration. This can either be a number indicating\n                               indentation level, or the string `\"first\"` indicating that all\n                               parameters of the declaration must be aligned with the first parameter.\n            * `\"body\"` (default: 1) enforces indentation level for the body of a function expression.\n        * `\"FunctionExpression\"` takes an object to define rules for function declarations.\n            * `\"parameters\"` (off by default) enforces indentation level for parameters in a\n                               function declaration. This can either be a number indicating\n                               indentation level, or the string `\"first\"` indicating that all\n                               parameters of the declaration must be aligned with the first parameter.\n            * `\"body\"` (default: 1) enforces indentation level for the body of a function expression.\n        * `\"CallExpression\"` takes an object to define rules for function call expressions.\n            * `\"arguments\"` (off by default) enforces indentation level for arguments in a call\n                              expression. This can either be a number indicating indentation level,\n                              or the string `\"first\"` indicating that all arguments of the\n                              expression must be aligned with the first argument.\n      "], _b.raw = ["\n      The string 'tab' or an integer indicating the number of spaces to use per tab.\n\n      An object may be provided to fine tune the indentation rules:\n            \n        * \\`\"SwitchCase\"\\` (default: 0) enforces indentation level for \\`case\\` clauses in\n                           \\`switch\\` statements\n        * \\`\"VariableDeclarator\"\\` (default: 1) enforces indentation level for \\`var\\` declarators;\n                                   can also take an object to define separate rules for \\`var\\`,\n                                   \\`let\\` and \\`const\\` declarations.\n        * \\`\"outerIIFEBody\"\\` (default: 1) enforces indentation level for file-level IIFEs.\n        * \\`\"MemberExpression\"\\` (off by default) enforces indentation level for multi-line\n                                 property chains (except in variable declarations and assignments)\n        * \\`\"FunctionDeclaration\"\\` takes an object to define rules for function declarations.\n            * \\`\"parameters\"\\` (off by default) enforces indentation level for parameters in a\n                               function declaration. This can either be a number indicating\n                               indentation level, or the string \\`\"first\"\\` indicating that all\n                               parameters of the declaration must be aligned with the first parameter.\n            * \\`\"body\"\\` (default: 1) enforces indentation level for the body of a function expression.\n        * \\`\"FunctionExpression\"\\` takes an object to define rules for function declarations.\n            * \\`\"parameters\"\\` (off by default) enforces indentation level for parameters in a\n                               function declaration. This can either be a number indicating\n                               indentation level, or the string \\`\"first\"\\` indicating that all\n                               parameters of the declaration must be aligned with the first parameter.\n            * \\`\"body\"\\` (default: 1) enforces indentation level for the body of a function expression.\n        * \\`\"CallExpression\"\\` takes an object to define rules for function call expressions.\n            * \\`\"arguments\"\\` (off by default) enforces indentation level for arguments in a call\n                              expression. This can either be a number indicating indentation level,\n                              or the string \\`\"first\"\\` indicating that all arguments of the\n                              expression must be aligned with the first argument.\n      "], Lint.Utils.dedent(_b)),
    options: {
        type: 'array',
        items: [{
                type: 'number',
                minimum: '0'
            }, {
                type: 'string',
                enum: ['tab']
            }, {
                type: 'object',
                properties: {
                    SwitchCase: {
                        type: 'number',
                        minimum: 0
                    },
                    VariableDeclarator: {
                        type: 'object',
                        properties: {
                            var: {
                                type: 'number',
                                minimum: 0
                            },
                            let: {
                                type: 'number',
                                minimum: 0
                            },
                            const: {
                                type: 'number',
                                minimum: 0
                            }
                        }
                    },
                    outerIIFEBody: {
                        type: 'number'
                    },
                    FunctionDeclaration: {
                        type: 'object',
                        properties: {
                            parameters: {
                                type: 'number',
                                minimum: 0
                            },
                            body: {
                                type: 'number',
                                minimum: 0
                            }
                        }
                    },
                    FunctionExpression: {
                        type: 'object',
                        properties: {
                            parameters: {
                                type: 'number',
                                minimum: 0
                            },
                            body: {
                                type: 'number',
                                minimum: 0
                            }
                        }
                    },
                    MemberExpression: {
                        type: 'number'
                    },
                    CallExpression: {
                        type: 'object',
                        properties: {
                            arguments: {
                                type: 'number',
                                minimum: 0
                            }
                        }
                    }
                },
                additionalProperties: false
            }],
        minLength: 1,
        maxLength: 2
    },
    optionExamples: [
        (_c = ["\n        \"", "\": [true, \"tab\"]\n        "], _c.raw = ["\n        \"", "\": [true, \"tab\"]\n        "], Lint.Utils.dedent(_c, RULE_NAME)),
        (_d = ["\n        \"", "\": [true, 2]\n        "], _d.raw = ["\n        \"", "\": [true, 2]\n        "], Lint.Utils.dedent(_d, RULE_NAME)),
        (_e = ["\n        \"", "\": [\n          true,\n          2,\n          {\n            \"FunctionExpression\": {\n              \"parameters\": 1,\n              \"body\": 1\n            }\n          }\n        ]      \n        "], _e.raw = ["\n        \"", "\": [\n          true,\n          2,\n          {\n            \"FunctionExpression\": {\n              \"parameters\": 1,\n              \"body\": 1\n            }\n          }\n        ]      \n        "], Lint.Utils.dedent(_e, RULE_NAME))
    ],
    typescriptOnly: false,
    type: 'maintainability'
};
exports.Rule = Rule;
var IndentWalker = (function (_super) {
    __extends(IndentWalker, _super);
    function IndentWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.caseIndentStore = {};
        _this.varIndentStore = {};
        OPTIONS = {
            SwitchCase: 0,
            VariableDeclarator: {
                var: DEFAULT_VARIABLE_INDENT,
                let: DEFAULT_VARIABLE_INDENT,
                const: DEFAULT_VARIABLE_INDENT
            },
            outerIIFEBody: null,
            FunctionDeclaration: {
                parameters: DEFAULT_PARAMETER_INDENT,
                body: DEFAULT_FUNCTION_BODY_INDENT
            },
            FunctionExpression: {
                parameters: DEFAULT_PARAMETER_INDENT,
                body: DEFAULT_FUNCTION_BODY_INDENT
            },
            CallExpression: {
                arguments: DEFAULT_PARAMETER_INDENT
            }
        };
        var firstParam = _this.getOptions()[0];
        if (firstParam === 'tab') {
            indentSize = 1;
            indentType = 'tab';
        }
        else {
            indentSize = firstParam || 4;
            indentType = 'space';
        }
        var userOptions = _this.getOptions()[1];
        if (userOptions) {
            OPTIONS.SwitchCase = userOptions.SwitchCase || 0;
            if (typeof userOptions.VariableDeclarator === 'number') {
                OPTIONS.VariableDeclarator = {
                    var: userOptions.VariableDeclarator,
                    let: userOptions.VariableDeclarator,
                    const: userOptions.VariableDeclarator
                };
            }
            else if (typeof userOptions.VariableDeclarator === 'object') {
                assign(OPTIONS.VariableDeclarator, userOptions.VariableDeclarator);
            }
            if (typeof userOptions.outerIIFEBody === 'number') {
                OPTIONS.outerIIFEBody = userOptions.outerIIFEBody;
            }
            if (typeof userOptions.MemberExpression === 'number') {
                OPTIONS.MemberExpression = userOptions.MemberExpression;
            }
            if (typeof userOptions.FunctionDeclaration === 'object') {
                assign(OPTIONS.FunctionDeclaration, userOptions.FunctionDeclaration);
            }
            if (typeof userOptions.FunctionExpression === 'object') {
                assign(OPTIONS.FunctionExpression, userOptions.FunctionExpression);
            }
            if (typeof userOptions.CallExpression === 'object') {
                assign(OPTIONS.CallExpression, userOptions.CallExpression);
            }
        }
        _this.srcFile = sourceFile;
        _this.srcText = sourceFile.getFullText();
        return _this;
    }
    IndentWalker.prototype.getSourceSubstr = function (start, end) {
        return this.srcText.substr(start, end - start);
    };
    IndentWalker.prototype.getLineAndCharacter = function (node, byEndLocation) {
        if (byEndLocation === void 0) { byEndLocation = false; }
        var index = byEndLocation ? node.getEnd() : node.getStart();
        return this.srcFile.getLineAndCharacterOfPosition(index);
    };
    IndentWalker.prototype.getLine = function (node, byEndLocation) {
        if (byEndLocation === void 0) { byEndLocation = false; }
        return this.getLineAndCharacter(node, byEndLocation).line;
    };
    IndentWalker.prototype.createErrorMessage = function (expectedAmount, actualSpaces, actualTabs) {
        var expectedStatement = expectedAmount + " " + indentType + (expectedAmount === 1 ? '' : 's');
        var foundSpacesWord = "space" + (actualSpaces === 1 ? '' : 's');
        var foundTabsWord = "tab" + (actualTabs === 1 ? '' : 's');
        var foundStatement;
        if (actualSpaces > 0 && actualTabs > 0) {
            foundStatement = actualSpaces + " " + foundSpacesWord + " and " + actualTabs + " " + foundTabsWord;
        }
        else if (actualSpaces > 0) {
            foundStatement = indentType === 'space' ? actualSpaces : actualSpaces + " " + foundSpacesWord;
        }
        else if (actualTabs > 0) {
            foundStatement = indentType === 'tab' ? actualTabs : actualTabs + " " + foundTabsWord;
        }
        else {
            foundStatement = '0';
        }
        return "Expected indentation of " + expectedStatement + " but found " + foundStatement + ".";
    };
    IndentWalker.prototype.report = function (node, needed, gottenSpaces, gottenTabs, loc) {
        if (gottenSpaces && gottenTabs) {
            return;
        }
        var msg = this.createErrorMessage(needed, gottenSpaces, gottenTabs);
        var width = gottenSpaces + gottenTabs;
        this.addFailure(this.createFailure((loc !== undefined ? loc : node.getStart()) - width, width, msg));
    };
    IndentWalker.prototype.isNodeFirstInLine = function (node, byEndLocation) {
        if (byEndLocation === void 0) { byEndLocation = false; }
        var token = byEndLocation ? node.getLastToken() : node.getFirstToken();
        var pos = token.getStart() - 1;
        while ([' ', '\t'].indexOf(this.srcText.charAt(pos)) !== -1) {
            pos -= 1;
        }
        return this.srcText.charAt(pos) === '\n' || this._firstInLineCommentHelper(node);
    };
    IndentWalker.prototype._firstInLineCommentHelper = function (node) {
        var pos;
        var firstInLine = false;
        var comments = ts.getLeadingCommentRanges(node.getFullText(), 0);
        if (comments && comments.length) {
            var offset = node.getFullStart();
            var lastComment = comments[comments.length - 1];
            var comment = this.getSourceSubstr(lastComment.pos + offset, lastComment.end + offset);
            if (comment.indexOf('\n') !== -1) {
                firstInLine = true;
            }
            else {
                pos = lastComment.pos + offset;
                while (pos > 0 && this.srcText.charAt(pos) !== '\n') {
                    pos -= 1;
                }
                var content = this.getSourceSubstr(pos + 1, lastComment.pos + offset);
                if (content.trim() === '') {
                    firstInLine = true;
                }
            }
        }
        return firstInLine;
    };
    IndentWalker.prototype.getNodeIndent = function (node) {
        if (node === this.getSourceFile()) {
            return { space: 0, tab: 0, goodChar: 0, badChar: 0 };
        }
        if (node.kind === ts.SyntaxKind.SyntaxList) {
            return this.getNodeIndent(node.parent);
        }
        var endIndex = node.getStart();
        var pos = endIndex - 1;
        while (pos > 0 && this.srcText.charAt(pos) !== '\n') {
            pos -= 1;
        }
        var str = this.getSourceSubstr(pos + 1, endIndex);
        var whiteSpace = (str.match(/^\s+/) || [''])[0];
        var indentChars = whiteSpace.split('');
        var spaces = indentChars.filter(function (char) { return char === ' '; }).length;
        var tabs = indentChars.filter(function (char) { return char === '\t'; }).length;
        return {
            firstInLine: spaces + tabs === str.length || this._firstInLineCommentHelper(node),
            space: spaces,
            tab: tabs,
            goodChar: indentType === 'space' ? spaces : tabs,
            badChar: indentType === 'space' ? tabs : spaces
        };
    };
    IndentWalker.prototype.checkNodeIndent = function (node, neededIndent) {
        var actualIndent = this.getNodeIndent(node);
        if (!isKind(node, 'ArrayLiteralExpression') &&
            !isKind(node, 'ObjectLiteralExpression') &&
            (actualIndent.goodChar !== neededIndent || actualIndent.badChar !== 0) &&
            actualIndent.firstInLine) {
            this.report(node, neededIndent, actualIndent.space, actualIndent.tab);
        }
        if (isKind(node, 'IfStatement')) {
            var elseStatement = node.elseStatement;
            if (elseStatement) {
                var elseKeyword = node.getChildren().filter(function (ch) { return isKind(ch, 'ElseKeyword'); }).shift();
                this.checkNodeIndent(elseKeyword, neededIndent);
                if (!this.isNodeFirstInLine(elseStatement)) {
                    this.checkNodeIndent(elseStatement, neededIndent);
                }
            }
        }
        else if (isKind(node, 'TryStatement')) {
            var handler = node.catchClause;
            if (handler) {
                var catchKeyword = handler.getChildren().filter(function (ch) { return isKind(ch, 'CatchKeyword'); }).shift();
                this.checkNodeIndent(catchKeyword, neededIndent);
                if (!this.isNodeFirstInLine(handler)) {
                    this.checkNodeIndent(handler, neededIndent);
                }
            }
            var finalizer = node.finallyBlock;
            if (finalizer) {
                var finallyKeyword = node.getChildren().filter(function (ch) { return isKind(ch, 'FinallyKeyword'); }).shift();
                this.checkNodeIndent(finallyKeyword, neededIndent);
            }
        }
        else if (isKind(node, 'DoStatement')) {
            var whileKeyword = node.getChildren().filter(function (ch) { return isKind(ch, 'WhileKeyword'); }).shift();
            this.checkNodeIndent(whileKeyword, neededIndent);
        }
    };
    IndentWalker.prototype.isSingleLineNode = function (node) {
        var text = node.kind === ts.SyntaxKind.SyntaxList ? node.getFullText() : node.getText();
        return text.indexOf('\n') === -1;
    };
    IndentWalker.prototype.blockIndentationCheck = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var functionLike = [
            'FunctionExpression',
            'FunctionDeclaration',
            'MethodDeclaration',
            'Constructor',
            'ArrowFunction'
        ];
        if (node.parent && isOneOf(node.parent, functionLike)) {
            this.checkIndentInFunctionBlock(node);
            return;
        }
        var indent;
        var nodesToCheck = [];
        var statementsWithProperties = [
            'IfStatement',
            'WhileStatement',
            'ForStatement',
            'ForInStatement',
            'ForOfStatement',
            'DoStatement',
            'ClassDeclaration',
            'ClassExpression',
            'InterfaceDeclaration',
            'TypeLiteral',
            'TryStatement',
            'SourceFile'
        ];
        if (node.parent && isOneOf(node.parent, statementsWithProperties) && this.isNodeBodyBlock(node)) {
            indent = this.getNodeIndent(node.parent).goodChar;
        }
        else if (node.parent && isKind(node.parent, 'CatchClause')) {
            indent = this.getNodeIndent(node.parent.parent).goodChar;
        }
        else {
            indent = this.getNodeIndent(node).goodChar;
        }
        if (isKind(node, 'IfStatement') && !isKind(node['thenStatement'], 'Block')) {
            nodesToCheck = [node['thenStatement']];
        }
        else {
            if (node.kind === ts.SyntaxKind.Block) {
                nodesToCheck = node.getChildren()[1].getChildren();
            }
            else if (isOneOf(node.parent, [
                'ClassDeclaration',
                'ClassExpression',
                'InterfaceDeclaration',
                'TypeLiteral'
            ])) {
                nodesToCheck = node.getChildren();
            }
            else {
                nodesToCheck = [node.statement];
            }
        }
        this.checkNodeIndent(node, indent);
        if (nodesToCheck.length > 0) {
            this.checkNodesIndent(nodesToCheck, indent + indentSize);
        }
        if (isKind(node, 'Block')) {
            this.checkLastNodeLineIndent(node, indent);
        }
        else if (this.isNodeBodyBlock(node)) {
            this.checkLastNodeLineIndent(node.parent, indent);
        }
    };
    IndentWalker.prototype.isAssignment = function (node) {
        if (!isKind(node, 'BinaryExpression')) {
            return false;
        }
        return node.operatorToken.getText() === '=';
    };
    IndentWalker.prototype.isNodeBodyBlock = function (node) {
        var hasBlock = [
            'ClassDeclaration',
            'ClassExpression',
            'InterfaceDeclaration',
            'TypeLiteral'
        ];
        return isKind(node, 'Block') || (isKind(node, 'SyntaxList') && isOneOf(node.parent, hasBlock));
    };
    IndentWalker.prototype.checkFirstNodeLineIndent = function (node, firstLineIndent) {
        var startIndent = this.getNodeIndent(node);
        var firstInLine = startIndent.firstInLine;
        if (firstInLine && (startIndent.goodChar !== firstLineIndent || startIndent.badChar !== 0)) {
            this.report(node, firstLineIndent, startIndent.space, startIndent.tab);
        }
    };
    IndentWalker.prototype.checkLastNodeLineIndent = function (node, lastLineIndent) {
        var lastToken = node.getLastToken();
        var endIndent = this.getNodeIndent(lastToken);
        var firstInLine = endIndent.firstInLine;
        if (firstInLine && (endIndent.goodChar !== lastLineIndent || endIndent.badChar !== 0)) {
            this.report(lastToken, lastLineIndent, endIndent.space, endIndent.tab);
        }
    };
    IndentWalker.prototype.isOuterIIFE = function (node) {
        var parent = node.parent;
        var expressionIsNode = parent.expression !== node;
        if (isKind(parent, 'ParenthesizedExpression')) {
            parent = parent.parent;
        }
        var stmt = parent.parent;
        if (!isKind(parent, 'CallExpression') || expressionIsNode) {
            return false;
        }
        while (isKind(stmt, 'PrefixUnaryExpression') && (stmt.operator === ts.SyntaxKind.ExclamationToken ||
            stmt.operator === ts.SyntaxKind.TildeToken ||
            stmt.operator === ts.SyntaxKind.PlusToken ||
            stmt.operator === ts.SyntaxKind.MinusToken) ||
            isKind(stmt, 'BinaryExpression') ||
            isKind(stmt, 'SyntaxList') ||
            isKind(stmt, 'VariableDeclaration') ||
            isKind(stmt, 'VariableDeclarationList') ||
            isKind(stmt, 'ParenthesizedExpression')) {
            stmt = stmt.parent;
        }
        return ((isKind(stmt, 'ExpressionStatement') ||
            isKind(stmt, 'VariableStatement')) &&
            stmt.parent && isKind(stmt.parent, 'SourceFile'));
    };
    IndentWalker.prototype.isArgBeforeCalleeNodeMultiline = function (node) {
        var parent = node.parent;
        if (parent['arguments'].length >= 2 && parent['arguments'][1] === node) {
            var firstArg = parent['arguments'][0];
            return this.getLine(firstArg, true) > this.getLine(firstArg);
        }
        return false;
    };
    IndentWalker.prototype.checkIndentInFunctionBlock = function (node) {
        var calleeNode = node.parent;
        var indent = this.getNodeIndent(calleeNode).goodChar;
        if (calleeNode.parent.kind === ts.SyntaxKind.CallExpression) {
            var calleeParent = calleeNode.parent;
            if (calleeNode.kind !== ts.SyntaxKind.FunctionExpression && calleeNode.kind !== ts.SyntaxKind.ArrowFunction) {
                if (calleeParent && this.getLine(calleeParent) < this.getLine(node)) {
                    indent = this.getNodeIndent(calleeParent).goodChar;
                }
            }
            else {
                var callee = calleeParent.expression;
                if (this.isArgBeforeCalleeNodeMultiline(calleeNode) &&
                    this.getLine(callee) === this.getLine(callee, true) &&
                    !this.isNodeFirstInLine(calleeNode)) {
                    indent = this.getNodeIndent(calleeParent).goodChar;
                }
            }
        }
        var functionOffset = indentSize;
        if (OPTIONS.outerIIFEBody !== null && this.isOuterIIFE(calleeNode)) {
            functionOffset = OPTIONS.outerIIFEBody * indentSize;
        }
        else if (calleeNode.kind === ts.SyntaxKind.FunctionExpression) {
            functionOffset = OPTIONS.FunctionExpression.body * indentSize;
        }
        else if (calleeNode.kind === ts.SyntaxKind.FunctionDeclaration) {
            functionOffset = OPTIONS.FunctionDeclaration.body * indentSize;
        }
        else if (isOneOf(calleeNode, ['MethodDeclaration', 'Constructor'])) {
            functionOffset = OPTIONS.FunctionExpression.body * indentSize;
        }
        indent += functionOffset;
        var parentVarNode = this.getVariableDeclaratorNode(node);
        if (parentVarNode && this.isNodeInVarOnTop(node, parentVarNode)) {
            var varKind = parentVarNode.parent.getFirstToken().getText();
            indent += indentSize * OPTIONS.VariableDeclarator[varKind];
        }
        this.checkFirstNodeLineIndent(node, indent - functionOffset);
        if (node.statements.length) {
            this.checkNodesIndent(node.statements, indent);
        }
        this.checkLastNodeLineIndent(node, indent - functionOffset);
    };
    IndentWalker.prototype.checkNodesIndent = function (nodes, indent) {
        var _this = this;
        nodes.forEach(function (node) { return _this.checkNodeIndent(node, indent); });
    };
    IndentWalker.prototype.expectedCaseIndent = function (node, switchIndent) {
        var switchNode = (node.kind === ts.SyntaxKind.SwitchStatement) ? node : node.parent;
        var line = this.getLine(switchNode);
        var caseIndent;
        if (this.caseIndentStore[line]) {
            return this.caseIndentStore[line];
        }
        else {
            if (typeof switchIndent === 'undefined') {
                switchIndent = this.getNodeIndent(switchNode).goodChar;
            }
            caseIndent = switchIndent + (indentSize * OPTIONS.SwitchCase);
            this.caseIndentStore[line] = caseIndent;
            return caseIndent;
        }
    };
    IndentWalker.prototype.expectedVarIndent = function (node, varIndent) {
        var varNode = node.parent;
        var line = this.getLine(varNode);
        var indent;
        if (this.varIndentStore[line]) {
            return this.varIndentStore[line];
        }
        else {
            if (typeof varIndent === 'undefined') {
                varIndent = this.getNodeIndent(varNode).goodChar;
            }
            var varKind = varNode.getFirstToken().getText();
            indent = varIndent + (indentSize * OPTIONS.VariableDeclarator[varKind]);
            this.varIndentStore[line] = indent;
            return indent;
        }
    };
    IndentWalker.prototype.getParentNodeByType = function (node, kind, stopAtList) {
        if (stopAtList === void 0) { stopAtList = [ts.SyntaxKind.SourceFile]; }
        var parent = node.parent;
        while (parent.kind !== kind
            && stopAtList.indexOf(parent.kind) === -1
            && parent.kind !== ts.SyntaxKind.SourceFile) {
            parent = parent.parent;
        }
        return parent.kind === kind ? parent : null;
    };
    IndentWalker.prototype.getVariableDeclaratorNode = function (node) {
        return this.getParentNodeByType(node, ts.SyntaxKind.VariableDeclaration);
    };
    IndentWalker.prototype.getBinaryExpressionNode = function (node) {
        return this.getParentNodeByType(node, ts.SyntaxKind.BinaryExpression);
    };
    IndentWalker.prototype.checkIndentInArrayOrObjectBlock = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var elements = isKind(node, 'ObjectLiteralExpression') ? node['properties'] : node['elements'];
        elements = elements.filter(function (elem) { return elem.getText() !== ''; });
        var nodeLine = this.getLine(node);
        var nodeEndLine = this.getLine(node, true);
        var nodeIndent;
        var elementsIndent;
        var varKind;
        var parentVarNode = this.getVariableDeclaratorNode(node);
        if (this.isNodeFirstInLine(node)) {
            var parent_1 = node.parent;
            nodeIndent = this.getNodeIndent(parent_1).goodChar;
            if (parentVarNode && this.getLine(parentVarNode) !== nodeLine) {
                if (!isKind(parent_1, 'VariableDeclaration') || parentVarNode === parentVarNode.parent.declarations[0]) {
                    var parentVarLine = this.getLine(parentVarNode);
                    var parentLine = this.getLine(parent_1);
                    if (isKind(parent_1, 'VariableDeclaration') && parentVarLine === parentLine) {
                        varKind = parentVarNode.parent.getFirstToken().getText();
                        nodeIndent = nodeIndent + (indentSize * OPTIONS.VariableDeclarator[varKind]);
                    }
                    else if (isOneOf(parent_1, [
                        'ObjectLiteralExpression',
                        'ArrayLiteralExpression',
                        'CallExpression',
                        'ArrowFunction',
                        'NewExpression',
                        'BinaryExpression'
                    ])) {
                        nodeIndent = nodeIndent + indentSize;
                    }
                }
            }
            else if (!parentVarNode &&
                !this.isFirstArrayElementOnSameLine(parent_1) &&
                parent_1.kind !== ts.SyntaxKind.PropertyAccessExpression &&
                parent_1.kind !== ts.SyntaxKind.ExpressionStatement &&
                parent_1.kind !== ts.SyntaxKind.PropertyAssignment &&
                !(this.isAssignment(parent_1))) {
                nodeIndent = nodeIndent + indentSize;
            }
            elementsIndent = nodeIndent + indentSize;
            this.checkFirstNodeLineIndent(node, nodeIndent);
        }
        else {
            nodeIndent = this.getNodeIndent(node).goodChar;
            elementsIndent = nodeIndent + indentSize;
        }
        if (parentVarNode && this.isNodeInVarOnTop(node, parentVarNode)) {
            varKind = parentVarNode.parent.getFirstToken().getText();
            elementsIndent += indentSize * OPTIONS.VariableDeclarator[varKind];
        }
        this.checkNodesIndent(elements, elementsIndent);
        if (elements.length > 0) {
            var lastLine = this.getLine(elements[elements.length - 1], true);
            if (lastLine === nodeEndLine) {
                return;
            }
        }
        this.checkLastNodeLineIndent(node, elementsIndent - indentSize);
    };
    IndentWalker.prototype.isFirstArrayElementOnSameLine = function (node) {
        if (isKind(node, 'ArrayLiteralExpression')) {
            var ele = node.elements[0];
            if (ele) {
                return isKind(ele, 'ObjectLiteralExpression') && this.getLine(ele) === this.getLine(node);
            }
        }
        return false;
    };
    IndentWalker.prototype.isNodeInVarOnTop = function (node, varNode) {
        var nodeLine = this.getLine(node);
        var parentLine = this.getLine(varNode.parent);
        return varNode &&
            parentLine === nodeLine &&
            varNode.parent.declarations.length > 1;
    };
    IndentWalker.prototype.blockLessNodes = function (node) {
        if (!isKind(node.statement, 'Block')) {
            this.blockIndentationCheck(node);
        }
    };
    IndentWalker.prototype.checkIndentInVariableDeclarations = function (node) {
        var indent = this.expectedVarIndent(node);
        this.checkNodeIndent(node, indent);
    };
    IndentWalker.prototype.visitCase = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var caseIndent = this.expectedCaseIndent(node);
        this.checkNodesIndent(node.statements, caseIndent + indentSize);
    };
    IndentWalker.prototype.checkLastReturnStatementLineIndent = function (node, firstLineIndent) {
        var lastToken = node.expression.getLastToken();
        var endIndex = lastToken.getStart();
        var pos = endIndex - 1;
        while (pos > 0 && this.srcText.charAt(pos) !== '\n') {
            pos -= 1;
        }
        var textBeforeClosingParenthesis = this.getSourceSubstr(pos + 1, endIndex);
        if (textBeforeClosingParenthesis.trim()) {
            return;
        }
        var endIndent = this.getNodeIndent(lastToken);
        if (endIndent.goodChar !== firstLineIndent) {
            this.report(node, firstLineIndent, endIndent.space, endIndent.tab, lastToken.getStart());
        }
    };
    IndentWalker.prototype.visitClassDeclaration = function (node) {
        var len = node.getChildCount();
        this.blockIndentationCheck(node.getChildAt(len - 2));
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitClassExpression = function (node) {
        var len = node.getChildCount();
        this.blockIndentationCheck(node.getChildAt(len - 2));
        _super.prototype.visitClassExpression.call(this, node);
    };
    IndentWalker.prototype.visitInterfaceDeclaration = function (node) {
        var len = node.getChildCount();
        this.blockIndentationCheck(node.getChildAt(len - 2));
        _super.prototype.visitInterfaceDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitTypeLiteral = function (node) {
        var len = node.getChildCount();
        this.blockIndentationCheck(node.getChildAt(len - 2));
        _super.prototype.visitTypeLiteral.call(this, node);
    };
    IndentWalker.prototype.visitBlock = function (node) {
        this.blockIndentationCheck(node);
        _super.prototype.visitBlock.call(this, node);
    };
    IndentWalker.prototype.visitIfStatement = function (node) {
        var thenLine = this.getLine(node.thenStatement);
        var line = this.getLine(node);
        if (node.thenStatement.kind !== ts.SyntaxKind.Block && thenLine > line) {
            this.blockIndentationCheck(node);
        }
        _super.prototype.visitIfStatement.call(this, node);
    };
    IndentWalker.prototype.visitObjectLiteralExpression = function (node) {
        this.checkIndentInArrayOrObjectBlock(node);
        _super.prototype.visitObjectLiteralExpression.call(this, node);
    };
    IndentWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.checkIndentInArrayOrObjectBlock(node);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    IndentWalker.prototype.visitSwitchStatement = function (node) {
        var switchIndent = this.getNodeIndent(node).goodChar;
        var caseIndent = this.expectedCaseIndent(node, switchIndent);
        this.checkNodesIndent(node.caseBlock.clauses, caseIndent);
        this.checkLastNodeLineIndent(node, switchIndent);
        _super.prototype.visitSwitchStatement.call(this, node);
    };
    IndentWalker.prototype.visitCaseClause = function (node) {
        this.visitCase(node);
        _super.prototype.visitCaseClause.call(this, node);
    };
    IndentWalker.prototype.visitDefaultClause = function (node) {
        this.visitCase(node);
        _super.prototype.visitDefaultClause.call(this, node);
    };
    IndentWalker.prototype.visitWhileStatement = function (node) {
        this.blockLessNodes(node);
        _super.prototype.visitWhileStatement.call(this, node);
    };
    IndentWalker.prototype.visitForStatement = function (node) {
        this.blockLessNodes(node);
        _super.prototype.visitForStatement.call(this, node);
    };
    IndentWalker.prototype.visitForInStatement = function (node) {
        this.blockLessNodes(node);
        _super.prototype.visitForInStatement.call(this, node);
    };
    IndentWalker.prototype.visitDoStatement = function (node) {
        this.blockLessNodes(node);
        _super.prototype.visitDoStatement.call(this, node);
    };
    IndentWalker.prototype.visitVariableDeclaration = function (node) {
        this.checkIndentInVariableDeclarations(node);
        _super.prototype.visitVariableDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitVariableStatement = function (node) {
        _super.prototype.visitVariableStatement.call(this, node);
        var list = node.getChildAt(0).getChildAt(1);
        if (!list) {
            return;
        }
        var len = list.getChildCount();
        if (len === 0) {
            return;
        }
        var lastElement = list.getChildAt(len - 1);
        var lastToken = node.getLastToken();
        var lastTokenLine = this.getLine(lastToken, true);
        var lastElementLine = this.getLine(lastElement, true);
        if (lastTokenLine <= lastElementLine) {
            return;
        }
        var tokenBeforeLastElement = list.getChildAt(len - 2);
        if (tokenBeforeLastElement && isKind(tokenBeforeLastElement, 'CommaToken')) {
            this.checkLastNodeLineIndent(node, this.getNodeIndent(tokenBeforeLastElement).goodChar);
        }
        else {
            var nodeIndent = this.getNodeIndent(node).goodChar;
            var varKind = node.getFirstToken().getText();
            var elementsIndent = nodeIndent + indentSize * OPTIONS.VariableDeclarator[varKind];
            this.checkLastNodeLineIndent(node, elementsIndent - indentSize);
        }
    };
    IndentWalker.prototype.visitFunctionDeclaration = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        if (OPTIONS.FunctionDeclaration.parameters === 'first' && node.parameters.length) {
            var indent = this.getLineAndCharacter(node.parameters[0]).character;
            this.checkNodesIndent(node.parameters.slice(1), indent);
        }
        else if (OPTIONS.FunctionDeclaration.parameters !== null) {
            var nodeIndent = this.getNodeIndent(node).goodChar;
            this.checkNodesIndent(node.parameters, nodeIndent + indentSize * OPTIONS.FunctionDeclaration.parameters);
            var closingParen = node.getChildAt(node.getChildCount() - 2);
            this.checkNodeIndent(closingParen, nodeIndent);
        }
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    IndentWalker.prototype.checkFunctionMethodExpression = function (node) {
        if (OPTIONS.FunctionExpression.parameters === 'first' && node.parameters.length) {
            var indent = this.getLineAndCharacter(node.parameters[0]).character;
            this.checkNodesIndent(node.parameters.slice(1), indent);
        }
        else if (OPTIONS.FunctionExpression.parameters !== null) {
            var nodeIndent = this.getNodeIndent(node).goodChar;
            this.checkNodesIndent(node.parameters, nodeIndent + indentSize * OPTIONS.FunctionExpression.parameters);
            var closingParen = node.getChildAt(node.getChildCount() - 2);
            this.checkNodeIndent(closingParen, nodeIndent);
        }
    };
    IndentWalker.prototype.visitFunctionExpression = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        this.checkFunctionMethodExpression(node);
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    IndentWalker.prototype.visitMethodDeclaration = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        this.checkFunctionMethodExpression(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitConstructorDeclaration = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        this.checkFunctionMethodExpression(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitCallExpression = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        if (OPTIONS.CallExpression.arguments === 'first' && node.arguments.length) {
            var indent = this.getLineAndCharacter(node.arguments[0]).character;
            this.checkNodesIndent(node.arguments.slice(1), indent);
        }
        else if (OPTIONS.CallExpression.arguments !== null) {
            this.checkNodesIndent(node.arguments, this.getNodeIndent(node).goodChar + indentSize * OPTIONS.CallExpression.arguments);
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    IndentWalker.prototype.visitPropertyAccessExpression = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var varDec = ts.SyntaxKind.VariableDeclaration;
        var funcKind = [ts.SyntaxKind.FunctionExpression, ts.SyntaxKind.ArrowFunction];
        if (this.getParentNodeByType(node, varDec, funcKind)) {
            return;
        }
        var binExp = ts.SyntaxKind.BinaryExpression;
        var funcExp = ts.SyntaxKind.FunctionExpression;
        var binaryNode = this.getParentNodeByType(node, binExp, [funcExp]);
        if (binaryNode && this.isAssignment(binaryNode)) {
            return;
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
        if (typeof OPTIONS.MemberExpression === 'undefined') {
            return;
        }
        var propertyIndent = this.getNodeIndent(node).goodChar + indentSize * OPTIONS.MemberExpression;
        var dotToken = node.getChildAt(1);
        var checkNodes = [node.name, dotToken];
        this.checkNodesIndent(checkNodes, propertyIndent);
    };
    IndentWalker.prototype.visitReturnStatement = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var firstLineIndent = this.getNodeIndent(node).goodChar;
        if (isKind(node.expression, 'ParenthesizedExpression')) {
            this.checkLastReturnStatementLineIndent(node, firstLineIndent);
        }
        else {
            this.checkNodeIndent(node, firstLineIndent);
        }
        _super.prototype.visitReturnStatement.call(this, node);
    };
    IndentWalker.prototype.visitSourceFile = function (node) {
        this.checkNodesIndent(node.statements, 0);
        _super.prototype.visitSourceFile.call(this, node);
    };
    return IndentWalker;
}(Lint.RuleWalker));
var _a, _b, _c, _d, _e;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxDQUFDLENBQUM7UUFDMUYsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxpQkFBTSw2QkFBNkIsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBSWpHLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVTLDJDQUFvQixHQUE5QixVQUErQixJQUF3QjtRQUNyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUcxRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsa0NBQWtDLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxpQkFBTSxvQkFBb0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRVMsc0NBQWUsR0FBekIsVUFBMEIsSUFBbUI7UUFFM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsaUJBQU0sZUFBZSxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDSCxtQkFBQztBQUFELENBbC9CQSxBQWsvQkMsQ0FsL0IwQixJQUFJLENBQUMsVUFBVSxHQWsvQnpDIiwiZmlsZSI6InJ1bGVzL3RlckluZGVudFJ1bGUuanMiLCJzb3VyY2VSb290IjoiQzpcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
