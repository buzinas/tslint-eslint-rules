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
        var walker = new NoConstantConditionWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'unexpected constant condition';
exports.Rule = Rule;
var NoConstantConditionWalker = (function (_super) {
    __extends(NoConstantConditionWalker, _super);
    function NoConstantConditionWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.checkLoops = true;
        _this.isInConditional = false;
        var opts = _this.getOptions();
        if (opts.length && opts[0].checkLoops === false) {
            _this.checkLoops = false;
        }
        return _this;
    }
    NoConstantConditionWalker.prototype.visitIfStatement = function (node) {
        this.validateCondition(node.expression);
        _super.prototype.visitIfStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitWhileStatement = function (node) {
        if (this.checkLoops) {
            this.validateCondition(node.expression);
        }
        _super.prototype.visitWhileStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitDoStatement = function (node) {
        if (this.checkLoops) {
            this.validateCondition(node.expression);
        }
        _super.prototype.visitDoStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitForStatement = function (node) {
        if (this.checkLoops && node.condition) {
            this.validateCondition(node.condition);
        }
        _super.prototype.visitForStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitConditionalExpression = function (node) {
        this.validateCondition(node.condition);
        _super.prototype.visitConditionalExpression.call(this, node);
    };
    NoConstantConditionWalker.prototype.validateCondition = function (expression) {
        this.isInConditional = true;
        if (this.isConstant(expression)) {
            this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
        }
        this.walkChildren(expression);
        this.isInConditional = false;
    };
    NoConstantConditionWalker.prototype.isConstant = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.ArrayLiteralExpression:
                return true;
            case ts.SyntaxKind.PostfixUnaryExpression:
                return this.isConstant(node.operand);
            case ts.SyntaxKind.BinaryExpression:
                if (token_1.isAssignmentToken(node.operatorToken)) {
                    return this.isConstant(node.right);
                }
                return this.isConstant(node.left) && this.isConstant(node.right);
            case ts.SyntaxKind.ConditionalExpression:
                return this.isConstant(node.condition);
            case ts.SyntaxKind.PrefixUnaryExpression:
                return this.isConstant(node.operand);
            case ts.SyntaxKind.ParenthesizedExpression:
                return this.isConstant(node.expression);
        }
        return false;
    };
    return NoConstantConditionWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vQ29uc3RhbnRDb25kaXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFDL0IsMENBQXFEO0FBRXJEO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFPQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUkseUJBQXlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNqQyxtQkFBYyxHQUFHLCtCQUErQixDQUFDO0FBRHBELG9CQUFJO0FBU2pCO0lBQXdDLDZDQUFlO0lBQ3JELG1DQUFZLFVBQXlCLEVBQUUsT0FBc0I7UUFBN0QsWUFDRSxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBTzNCO1FBRU8sZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIscUJBQWUsR0FBRyxLQUFLLENBQUM7UUFSOUIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRS9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7O0lBQ0gsQ0FBQztJQUtTLG9EQUFnQixHQUExQixVQUEyQixJQUFvQjtRQUM3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLGlCQUFNLGdCQUFnQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENB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Z0JBQzlELENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFFLElBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckgsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHFCQUFxQjtnQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBaUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMscUJBQXFCO2dCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFpQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JFLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUI7Z0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQW1DLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQTNGQSxBQTJGQyxDQTNGdUMsSUFBSSxDQUFDLFVBQVUsR0EyRnREIiwiZmlsZSI6InJ1bGVzL25vQ29uc3RhbnRDb25kaXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
