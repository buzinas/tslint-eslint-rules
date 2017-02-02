"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var token_1 = require("../support/token");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoExAssignWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'do not assign to the exception parameter';
exports.Rule = Rule;
var NoExAssignWalker = (function (_super) {
    __extends(NoExAssignWalker, _super);
    function NoExAssignWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInCatchClause = false;
        _this.variableNode = null;
        return _this;
    }
    NoExAssignWalker.prototype.visitCatchClause = function (node) {
        this.variableNode = node.variableDeclaration;
        this.isInCatchClause = true;
        _super.prototype.visitCatchClause.call(this, node);
        this.isInCatchClause = false;
        this.variableNode = null;
    };
    NoExAssignWalker.prototype.visitBinaryExpression = function (node) {
        var _this = this;
        if (this.isInCatchClause) {
            if (!token_1.isAssignmentToken(node.operatorToken)) {
                return;
            }
            if (node.left.kind === ts.SyntaxKind.Identifier && this.variableNode.name.getText() === node.left.getText()) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
            else if (node.left.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                var els = node.left.elements;
                if (els.some(function (el) { return el.getText() === _this.variableNode.getText(); })) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    return NoExAssignWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
