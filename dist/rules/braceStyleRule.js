"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var OPTION_1TBS = '1tbs';
var OPTION_ALLMAN = 'allman';
var OPTION_STROUSTRUP = 'stroustrup';
var BraceStyle;
(function (BraceStyle) {
    BraceStyle[BraceStyle["OneTBS"] = 0] = "OneTBS";
    BraceStyle[BraceStyle["Allman"] = 1] = "Allman";
    BraceStyle[BraceStyle["Stroustrup"] = 2] = "Stroustrup";
})(BraceStyle || (BraceStyle = {}));
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new BraceStyleWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = {
    open: 'Opening curly brace does not appear on the same line as controlling statement.',
    openAllman: 'Opening curly brace appears on the same line as controlling statement.',
    body: 'Statement inside of curly braces should be on next line.',
    close: 'Closing curly brace does not appear on the same line as the subsequent block.',
    closeSingle: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
    closeStroustrupAllman: 'Closing curly brace appears on the same line as the subsequent block.'
};
exports.Rule = Rule;
var BraceStyleWalker = (function (_super) {
    __extends(BraceStyleWalker, _super);
    function BraceStyleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.allowSingleLine = false;
        if (_this.hasOption(OPTION_1TBS)) {
            _this.braceStyle = BraceStyle.OneTBS;
        }
        else if (_this.hasOption(OPTION_ALLMAN)) {
            _this.braceStyle = BraceStyle.Allman;
        }
        else if (_this.hasOption(OPTION_STROUSTRUP)) {
            _this.braceStyle = BraceStyle.Stroustrup;
        }
        else {
        }
        _this.allowSingleLine = _this.getOptions()[1] && _this.getOptions()[1].allowSingleLine;
        return _this;
    }
    BraceStyleWalker.prototype.visitTryStatement = function (tryStatement) {
        var _this = this;
        _super.prototype.visitTryStatement.call(this, tryStatement);
        var checkTryStatementError = function (node) {
            var previousNode = _this.getPreviousNode(tryStatement.getChildren(), node);
            var openingBracketError = _this.areOnSameLine(previousNode, node) !== (_this.braceStyle === BraceStyle.OneTBS);
            if (_this.allowSingleLine && _this.getStartPosition(node).line === _this.getEndPosition(tryStatement).line) {
                return;
            }
            if (openingBracketError) {
                var failureString = _this.braceStyle === BraceStyle.OneTBS ? Rule.FAILURE_STRING.open : Rule.FAILURE_STRING.openAllman;
                _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), failureString));
            }
        };
        var catchClause = tryStatement.catchClause;
        if (catchClause) {
            checkTryStatementError(catchClause);
        }
        var finallyBlock = tryStatement.finallyBlock;
        if (finallyBlock) {
            checkTryStatementError(finallyBlock);
        }
    };
    BraceStyleWalker.prototype.visitIfStatement = function (ifStatement) {
        _super.prototype.visitIfStatement.call(this, ifStatement);
        var elseKeyword = ifStatement.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.ElseKeyword; }).shift();
        if (!elseKeyword) {
            return;
        }
        var previousNode = ifStatement.getChildren()[ifStatement.getChildren().indexOf(elseKeyword) - 1];
        var openingBracketError = this.areOnSameLine(previousNode, elseKeyword) !== (this.braceStyle === BraceStyle.OneTBS);
        if (this.allowSingleLine && this.getStartPosition(elseKeyword).line === this.getEndPosition(ifStatement).line) {
            return;
        }
        if (!ifStatement.getChildren().some(function (ch) { return ch.kind === ts.SyntaxKind.Block; })) {
            return;
        }
        if (openingBracketError) {
            var failureString = this.braceStyle === BraceStyle.OneTBS ? Rule.FAILURE_STRING.open : Rule.FAILURE_STRING.openAllman;
            this.addFailure(this.createFailure(elseKeyword.getStart(), elseKeyword.getWidth(), failureString));
        }
    };
    BraceStyleWalker.prototype.visitBlock = function (block) {
        _super.prototype.visitBlock.call(this, block);
        if (this.allowSingleLine && this.getStartPosition(block).line === this.getEndPosition(block).line) {
            return;
        }
        var blockChildren = block.getChildren();
        var openingCurlyBrace = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenBraceToken; }).shift();
        var closingCurlyBrace = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.CloseBraceToken; }).pop();
        var syntaxList = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.SyntaxList; }).shift();
        var blockPreviousNode = block.parent.getChildren()[block.parent.getChildren().indexOf(block) - 1];
        if (!openingCurlyBrace || !closingCurlyBrace || !syntaxList || !blockPreviousNode) {
            return;
        }
        var openingBracketError = this.areOnSameLine(blockPreviousNode, block) === (this.braceStyle === BraceStyle.Allman);
        if (openingBracketError) {
            var failureString = this.braceStyle === BraceStyle.Allman ? Rule.FAILURE_STRING.openAllman : Rule.FAILURE_STRING.open;
            this.addFailure(this.createFailure(openingCurlyBrace.getStart(), openingCurlyBrace.getWidth(), failureString));
        }
        if (syntaxList.getChildCount() > 0) {
            var bodyError = this.areOnSameLine(openingCurlyBrace, syntaxList);
            if (bodyError) {
                this.addFailure(this.createFailure(syntaxList.getStart(), syntaxList.getWidth(), Rule.FAILURE_STRING.body));
            }
            var nodeBeforeClosingBracket = syntaxList.getChildren()[syntaxList.getChildren().length - 1];
            var closingBracketError = this.areOnSameLine(nodeBeforeClosingBracket, closingCurlyBrace);
            if (closingBracketError) {
                this.addFailure(this.createFailure(closingCurlyBrace.getStart(), closingCurlyBrace.getWidth(), Rule.FAILURE_STRING.closeSingle));
            }
        }
    };
    BraceStyleWalker.prototype.areOnSameLine = function (node, nextNode) {
        return this.getEndPosition(node).line === this.getStartPosition(nextNode).line;
    };
    BraceStyleWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    BraceStyleWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    BraceStyleWalker.prototype.getPreviousNode = function (children, node) {
        var position = children.indexOf(node) - 1;
        while (position >= 0) {
            if (children[position].kind === ts.SyntaxKind.Block || children[position].kind === ts.SyntaxKind.CatchClause) {
                return children[position];
            }
            position -= 1;
        }
    };
    return BraceStyleWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDL0YsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDNUYsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25JLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVPLHdDQUFhLEdBQXJCLFVBQXNCLElBQWEsRUFBRSxRQUFpQjtRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRixDQUFDO0lBRU8sMkNBQWdCLEdBQXhCLFVBQXlCLElBQWE7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8seUNBQWMsR0FBdEIsVUFBdUIsSUFBYTtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFHTywwQ0FBZSxHQUF2QixVQUF3QixRQUFtQixFQUFFLElBQWE7UUFDeEQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsT0FBTyxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDN0csTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQ0QsUUFBUSxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0EvSUEsQUErSUMsQ0EvSThCLElBQUksQ0FBQyxVQUFVLEdBK0k3QyIsImZpbGUiOiJydWxlcy9icmFjZVN0eWxlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
