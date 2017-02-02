"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
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
Rule.MISSING_SPACE_MESSAGE = 'here must be a space inside this paren.';
Rule.REJECTED_SPACE_MESSAGE = 'here should be no spaces inside this paren.';
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
    SpaceInParensWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.CallExpression ||
            node.kind === ts.SyntaxKind.IfStatement ||
            node.kind === ts.SyntaxKind.CatchClause ||
            node.kind === ts.SyntaxKind.ForStatement ||
            node.kind === ts.SyntaxKind.ForOfStatement ||
            node.kind === ts.SyntaxKind.WhileStatement) {
            this.checkParanSpace(node.getChildren()[1], node.getChildren()[2], node.getChildren()[3]);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3NwYWNlSW5QYXJlbnNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0IsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBRXhCO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFTQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FUQSxBQVNDLENBVHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUVqQywwQkFBcUIsR0FBRyx5Q0FBeUMsQ0FBQztBQUNsRSwyQkFBc0IsR0FBRyw2Q0FBNkMsQ0FBQztBQUgxRSxvQkFBSTtBQVdqQjtJQUFrQyx1Q0FBZTtJQVMvQyw2QkFBWSxVQUF5QixFQUFFLE9BQXNCO1FBQTdELFlBQ0Usa0JBQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQWEzQjtRQXBCTyw0QkFBc0IsR0FBRyxFQUFFLENBQUM7UUFRbEMsSUFBSSxXQUFXLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFFLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRW5GLEVBQUUsQ0FBQyxDQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxH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S0FBSyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBR08sNENBQWMsR0FBdEIsVUFBdUIsSUFBYSxFQUFFLFFBQWlCO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sZ0RBQWtCLEdBQTFCLFVBQTJCLElBQWEsRUFBRSxRQUFpQjtRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRixDQUFDO0lBRU8sOENBQWdCLEdBQXhCLFVBQXlCLElBQWE7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8sNENBQWMsR0FBdEIsVUFBdUIsSUFBYTtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFSCwwQkFBQztBQUFELENBbEpBLEFBa0pDLENBbEppQyxJQUFJLENBQUMsVUFBVSxHQWtKaEQiLCJmaWxlIjoicnVsZXMvc3BhY2VJblBhcmVuc1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
