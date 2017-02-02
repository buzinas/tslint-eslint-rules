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
        var walker = new NoDuplicateCaseWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'duplicate case label';
exports.Rule = Rule;
var NoDuplicateCaseWalker = (function (_super) {
    __extends(NoDuplicateCaseWalker, _super);
    function NoDuplicateCaseWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoDuplicateCaseWalker.prototype.visitSwitchStatement = function (node) {
        this.validateNoDupeCase(node);
        _super.prototype.visitSwitchStatement.call(this, node);
    };
    NoDuplicateCaseWalker.prototype.validateNoDupeCase = function (node) {
        var _this = this;
        var cases = Object.create(null);
        node.caseBlock.clauses.forEach(function (clause) {
            if (clause.kind === ts.SyntaxKind.CaseClause) {
                var key = clause.getText();
                if (cases[key]) {
                    _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
                else {
                    cases[key] = clause;
                }
            }
        });
    };
    return NoDuplicateCaseWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRHVwbGljYXRlQ2FzZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQjtJQUEwQix3QkFBdUI7SUFBakQ7O0lBT0EsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsV0FBQztBQUFELENBUEEsQUFPQyxDQVB5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7QUFDakMsbUJBQWMsR0FBRyxzQkFBc0IsQ0FBQztBQUQzQyxvQkFBSTtBQVNqQjtJQUFvQyx5Q0FBZTtJQUFuRDs7SUFxQkEsQ0FBQztJQXBCVyxvREFBb0IsR0FBOUIsVUFBK0IsSUFBd0I7UUFDckQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLGlCQUFNLG9CQUFvQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxrREFBa0IsR0FBMUIsVUFBMkIsSUFBd0I7UUFBbkQsaUJBY0M7UUFiQyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDcEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZixLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDN0YsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBdUIsQ0FBQztnQkFDdkMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCw0QkFBQztBQUFELENBckJBLEFBcUJDLENBckJtQyxJQUFJLENBQUMsVUFBVSxHQXFCbEQiLCJmaWxlIjoicnVsZXMvbm9EdXBsaWNhdGVDYXNlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
