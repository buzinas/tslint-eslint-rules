"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'space-in-parens';
var ALWAYS = 'always';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new SpaceInParensWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: RULE_NAME,
    description: 'require or disallow spaces inside parentheses',
    rationale: (_a = ["\n      This rule will enforce consistency of spacing directly inside of parentheses,\n      by disallowing or requiring one or more spaces to the right of ( and to the\n      left of ). In either case, () will still be allowed. \n      "], _a.raw = ["\n      This rule will enforce consistency of spacing directly inside of parentheses,\n      by disallowing or requiring one or more spaces to the right of ( and to the\n      left of ). In either case, () will still be allowed. \n      "], Lint.Utils.dedent(_a)),
    optionsDescription: (_b = ["\n      There are two options for this rule:\n\n      - `\"never\"` (default) enforces zero spaces inside of parentheses\n      - `\"always\"` enforces a space inside of parentheses\n\n      Depending on your coding conventions, you can choose either option by specifying\n      it in your configuration.\n      "], _b.raw = ["\n      There are two options for this rule:\n\n      - \\`\"never\"\\` (default) enforces zero spaces inside of parentheses\n      - \\`\"always\"\\` enforces a space inside of parentheses\n\n      Depending on your coding conventions, you can choose either option by specifying\n      it in your configuration.\n      "], Lint.Utils.dedent(_b)),
    options: {
        type: 'array',
        items: [
            {
                enum: ['always', 'never']
            },
            {
                type: 'object',
                properties: {
                    exceptions: {
                        type: 'array',
                        items: [
                            {
                                enum: ['{}', '[]', '()', 'empty']
                            }
                        ],
                        uniqueItems: true
                    }
                },
                additionalProperties: false
            }
        ],
        minItems: 0,
        maxItems: 2
    },
    optionExamples: [
        (_c = ["\n        \"", "\": [true, \"always\"]\n        "], _c.raw = ["\n        \"", "\": [true, \"always\"]\n        "], Lint.Utils.dedent(_c, RULE_NAME)),
        (_d = ["\n        \"", "\": [true, \"never\"]\n        "], _d.raw = ["\n        \"", "\": [true, \"never\"]\n        "], Lint.Utils.dedent(_d, RULE_NAME)),
        (_e = ["\n        \"", "\": [true, \"always\", { \"exceptions\": [ \"{}\", \"[]\", \"()\", \"empty\" ] }]\n        "], _e.raw = ["\n        \"", "\": [true, \"always\", { \"exceptions\": [ \"{}\", \"[]\", \"()\", \"empty\" ] }]\n        "], Lint.Utils.dedent(_e, RULE_NAME))
    ],
    typescriptOnly: false,
    type: 'style'
};
Rule.MISSING_SPACE_MESSAGE = 'there must be a space inside this paren.';
Rule.REJECTED_SPACE_MESSAGE = 'there should be no spaces inside this paren.';
exports.Rule = Rule;
var SpaceInParensWalker = (function (_super) {
    __extends(SpaceInParensWalker, _super);
    function SpaceInParensWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.exceptionsArrayOptions = [];
        var ruleOptions = _this.getOptions();
        _this.spaced = _this.hasOption(ALWAYS) || (ruleOptions && ruleOptions.length === 0);
        if (ruleOptions[1]) {
            _this.exceptionsArrayOptions = (ruleOptions.length === 2) ? ruleOptions[1].exceptions : [];
            if (_this.exceptionsArrayOptions.length) {
                _this.braceException = _this.exceptionsArrayOptions.indexOf('{}') !== -1;
                _this.bracketException = _this.exceptionsArrayOptions.indexOf('[]') !== -1;
                _this.parenException = _this.exceptionsArrayOptions.indexOf('()') !== -1;
                _this.empty = _this.exceptionsArrayOptions.indexOf('empty') !== -1;
            }
        }
        return _this;
    }
    SpaceInParensWalker.prototype.getExceptions = function () {
        var openers = [];
        var closers = [];
        if (this.braceException) {
            openers.push(ts.SyntaxKind.OpenBraceToken);
            closers.push(ts.SyntaxKind.CloseBraceToken);
        }
        if (this.bracketException) {
            openers.push(ts.SyntaxKind.OpenBracketToken);
            closers.push(ts.SyntaxKind.CloseBracketToken);
        }
        if (this.parenException) {
            openers.push(ts.SyntaxKind.OpenParenToken);
            closers.push(ts.SyntaxKind.CloseParenToken);
        }
        if (this.empty) {
            openers.push(ts.SyntaxKind.CloseParenToken);
            closers.push(ts.SyntaxKind.OpenParenToken);
        }
        return {
            openers: openers,
            closers: closers
        };
    };
    SpaceInParensWalker.prototype.findParenNodes = function (node) {
        var children = node.getChildren();
        for (var i = 0; i < children.length; i++) {
            if (children[i].kind === ts.SyntaxKind.OpenParenToken) {
                return children.slice(i, i + 3);
            }
        }
        throw new Error('Unexpected error: no open parens found!');
    };
    SpaceInParensWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ParenthesizedExpression ||
            node.kind === ts.SyntaxKind.ParenthesizedType ||
            node.kind === ts.SyntaxKind.CallExpression ||
            node.kind === ts.SyntaxKind.FunctionDeclaration ||
            node.kind === ts.SyntaxKind.MethodDeclaration ||
            node.kind === ts.SyntaxKind.IfStatement ||
            node.kind === ts.SyntaxKind.CatchClause ||
            node.kind === ts.SyntaxKind.ForStatement ||
            node.kind === ts.SyntaxKind.ForOfStatement ||
            node.kind === ts.SyntaxKind.ConstructSignature ||
            node.kind === ts.SyntaxKind.WhileStatement) {
            var parenNodes = this.findParenNodes(node);
            this.checkParanSpace(parenNodes[0], parenNodes[1], parenNodes[2]);
        }
        if (node.kind === ts.SyntaxKind.ParenthesizedExpression ||
            node.kind === ts.SyntaxKind.ParenthesizedType) {
            this.checkParanSpace(node.getChildren()[0], node.getChildren()[1], node.getChildren()[2]);
        }
        _super.prototype.visitNode.call(this, node);
    };
    SpaceInParensWalker.prototype.checkParanSpace = function (first, middle, last) {
        if (!first && !middle && !last)
            return;
        if (this.shouldOpenerHaveSpace(first, middle)) {
            this.addFailure(this.createFailure(first.getEnd(), 0, Rule.MISSING_SPACE_MESSAGE));
        }
        if (this.shouldOpenerRejectSpace(first, middle)) {
            this.addFailure(this.createFailure(first.getEnd(), 0, Rule.REJECTED_SPACE_MESSAGE));
        }
        if (this.shouldCloserHaveSpace(middle, last)) {
            this.addFailure(this.createFailure(last.getEnd(), 0, Rule.MISSING_SPACE_MESSAGE));
        }
        if (this.shouldCloserRejectSpace(middle, last)) {
            this.addFailure(this.createFailure(last.getEnd(), 0, Rule.REJECTED_SPACE_MESSAGE));
        }
    };
    SpaceInParensWalker.prototype.shouldOpenerHaveSpace = function (left, right) {
        if (this.isSpaceBetween(left, right))
            return false;
        if (this.spaced) {
            if (right.getText().trim() === '')
                return false;
            return !this.isOpenerException(right.getFirstToken());
        }
        return this.isOpenerException(right.getFirstToken());
    };
    SpaceInParensWalker.prototype.shouldCloserHaveSpace = function (left, right) {
        if (left.getText().trim() === '')
            return false;
        if (this.isSpaceBetween(left, right))
            return false;
        if (this.spaced)
            return !this.isCloserException(left.getLastToken());
        return this.isCloserException(left.getLastToken());
    };
    SpaceInParensWalker.prototype.shouldOpenerRejectSpace = function (left, right) {
        if (right.getText().trim() === '')
            return false;
        if (this.isLineBreakBetween(left, right))
            return false;
        if (!this.isSpaceBetween(left, right))
            return false;
        if (this.spaced)
            return this.isOpenerException(right.getFirstToken());
        return !this.isOpenerException(right.getFirstToken());
    };
    SpaceInParensWalker.prototype.shouldCloserRejectSpace = function (left, right) {
        if (left.getText().trim() === '')
            return false;
        if (this.isLineBreakBetween(left, right))
            return false;
        if (!this.isSpaceBetween(left, right))
            return false;
        if (this.spaced)
            return this.isCloserException(left.getLastToken());
        return !this.isCloserException(left.getLastToken());
    };
    SpaceInParensWalker.prototype.isOpenerException = function (token) {
        if (!token)
            return false;
        return this.getExceptions().openers.indexOf(token.kind) >= 0;
    };
    SpaceInParensWalker.prototype.isCloserException = function (token) {
        if (!token)
            return false;
        return this.getExceptions().closers.indexOf(token.kind) >= 0;
    };
    SpaceInParensWalker.prototype.isSpaceBetween = function (node, nextNode) {
        return nextNode.getStart() - node.getEnd() > 0;
    };
    SpaceInParensWalker.prototype.isLineBreakBetween = function (node, nextNode) {
        return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
    };
    SpaceInParensWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    SpaceInParensWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return SpaceInParensWalker;
}(Lint.RuleWalker));
var _a, _b, _c, _d, _e;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3NwYWNlSW5QYXJlbnNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0IsSUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFDcEMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBRXhCO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFpRUEsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsV0FBQztBQUFELENBakVBLEFBaUVDLENBakV5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7QUFDakMsYUFBUSxHQUF1QjtJQUMzQyxRQUFRLEVBQUUsU0FBUztJQUNuQixXQUFXLEVBQUUsK0NBQStDO0lBQzVELFNBQVMscVFBQW1CLCtPQUl6QixHQUpRLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUl6QjtJQUNILGtCQUFrQixnVkFBbUIsa1VBUWxDLEdBUmlCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQVFsQztJQUNILE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFO1lBQ0w7Z0JBQ0UsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQzthQUMxQjtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRTtvQkFDVixVQUFVLEVBQUU7d0JBQ1YsSUFBSSxFQUFFLE9BQU87d0JBQ2IsS0FBSyxFQUFFOzRCQUNMO2dDQUNFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzs2QkFDbEM7eUJBQ0Y7d0JB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LENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakYsQ0FBQztJQUVPLDhDQUFnQixHQUF4QixVQUF5QixJQUFhO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVPLDRDQUFjLEdBQXRCLFVBQXVCLElBQWE7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUgsMEJBQUM7QUFBRCxDQWxLQSxBQWtLQyxDQWxLaUMsSUFBSSxDQUFDLFVBQVUsR0FrS2hEIiwiZmlsZSI6InJ1bGVzL3NwYWNlSW5QYXJlbnNSdWxlLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
