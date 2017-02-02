"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new ValidTypeofWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'invalid typeof comparison value';
exports.Rule = Rule;
var ValidTypeofWalker = (function (_super) {
    __extends(ValidTypeofWalker, _super);
    function ValidTypeofWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VALID_TYPES = ['symbol', 'undefined', 'object', 'boolean', 'number', 'string', 'function'];
        _this.OPERATORS = [ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken];
        return _this;
    }
    ValidTypeofWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.TypeOfExpression) {
            this.validateTypeOf(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ValidTypeofWalker.prototype.validateTypeOf = function (node) {
        if (node.parent.kind === ts.SyntaxKind.BinaryExpression) {
            var parent_1 = node.parent;
            if (this.OPERATORS.indexOf(parent_1.operatorToken.kind) !== -1) {
                var sibling = parent_1.left === node ? parent_1.right : parent_1.left;
                if (sibling.kind === ts.SyntaxKind.StringLiteral && this.VALID_TYPES.indexOf(sibling.text) === -1) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
    };
    return ValidTypeofWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3ZhbGlkVHlwZW9mUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFPQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNqQyxtQkFBYyxHQUFHLGlDQUFpQyxDQUFDO0FBRHRELG9CQUFJO0FBU2pCO0lBQWdDLHFDQUFlO0lBQS9DO1FBQUEscUVBdUJDO1FBdEJTLGlCQUFXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMzRixlQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLENBQUM7O0lBcUJqTCxDQUFDO0lBbkJXLHFDQUFTLEdBQW5CLFVBQW9CLElBQWE7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQTJCLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsaUJBQU0sU0FBUyxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTywwQ0FBYyxHQUF0QixVQUF1QixJQUF5QjtRQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFNLFFBQU0sR0FBSSxJQUFJLENBQUMsTUFBOEIsQ0FBQztZQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsSUFBTSxPQUFPLEdBQUcsUUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsUUFBTSxDQUFDLEtBQUssR0FBRyxRQUFNLENBQUMsSUFBSSxDQUFDO2dCQUVsRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFFLE9BQTRCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4SCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDN0YsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsQ0F2QitCLElBQUksQ0FBQyxVQUFVLEdBdUI5QyIsImZpbGUiOiJydWxlcy92YWxpZFR5cGVvZlJ1bGUuanMiLCJzb3VyY2VSb290IjoiQzpcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
