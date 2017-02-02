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
        var walker = new NoControlRegexWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'unexpected control character in regular expression';
exports.Rule = Rule;
var NoControlRegexWalker = (function (_super) {
    __extends(NoControlRegexWalker, _super);
    function NoControlRegexWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoControlRegexWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateControlRegex(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoControlRegexWalker.prototype.visitNewExpression = function (node) {
        if (node.expression.getText() === 'RegExp') {
            this.visitRegularExpressionFunction(node);
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoControlRegexWalker.prototype.visitCallExpression = function (node) {
        if (node.expression.getText() === 'RegExp') {
            this.visitRegularExpressionFunction(node);
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoControlRegexWalker.prototype.visitRegularExpressionFunction = function (node) {
        if (node.arguments && node.arguments.length > 0 && node.arguments[0].kind === ts.SyntaxKind.StringLiteral) {
            this.validateControlRegex(node.arguments[0]);
        }
    };
    NoControlRegexWalker.prototype.validateControlRegex = function (node) {
        if (/[\x00-\x1f]/.test(node.text)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoControlRegexWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vQ29udHJvbFJlZ2V4UnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFPQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksb0JBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNqQyxtQkFBYyxHQUFHLG9EQUFvRCxDQUFDO0FBRHpFLG9CQUFJO0FBU2pCO0lBQW1DLHdDQUFlO0lBQWxEOztJQStCQSxDQUFDO0lBOUJXLDREQUE2QixHQUF2QyxVQUF3QyxJQUEwQjtRQUNoRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsaUJBQU0sNkJBQTZCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVTLGlEQUFrQixHQUE1QixVQUE2QixJQUFzQjtRQUNqRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxpQkFBTSxrQkFBa0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRVMsa0RBQW1CLEdBQTdCLFVBQThCLElBQXVCO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELGlCQUFNLG1CQUFtQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyw2REFBOEIsR0FBdEMsVUFBdUMsSUFBMEM7UUFDL0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBcUIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDSCxDQUFDO0lBRU8sbURBQW9CLEdBQTVCLFVBQTZCLElBQTBCO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0EvQkEsQUErQkMsQ0EvQmtDLElBQUksQ0FBQyxVQUFVLEdBK0JqRCIsImZpbGUiOiJydWxlcy9ub0NvbnRyb2xSZWdleFJ1bGUuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
