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
        var walker = new NoInvalidRegexpWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInvalidRegexpWalker = (function (_super) {
    __extends(NoInvalidRegexpWalker, _super);
    function NoInvalidRegexpWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoInvalidRegexpWalker.prototype.visitNewExpression = function (node) {
        this.validateInvalidRegExp(node);
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoInvalidRegexpWalker.prototype.visitCallExpression = function (node) {
        this.validateInvalidRegExp(node);
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoInvalidRegexpWalker.prototype.validateInvalidRegExp = function (node) {
        if (node.expression.getText() === 'RegExp') {
            var args = node.arguments;
            if (args && args.length > 0 && args[0].kind === ts.SyntaxKind.StringLiteral) {
                var expr = args[0].text;
                var flags = args.length > 1 && args[1].kind === ts.SyntaxKind.StringLiteral ? args[1].text : undefined;
                var regex = void 0;
                try {
                    regex = new RegExp(expr, flags);
                }
                catch (e) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), e.message));
                }
            }
        }
    };
    return NoInvalidRegexpWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vSW52YWxpZFJlZ2V4cFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQjtJQUEwQix3QkFBdUI7SUFBakQ7O0lBS0EsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsV0FBQztBQUFELENBTEEsQUFLQyxDQUx5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FLaEQ7QUFMWSxvQkFBSTtBQU9qQjtJQUFvQyx5Q0FBZTtJQUFuRDs7SUE0QkEsQ0FBQztJQTNCVyxrREFBa0IsR0FBNUIsVUFBNkIsSUFBc0I7UUFDakQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGlCQUFNLGtCQUFrQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFUyxtREFBbUIsR0FBN0IsVUFBOEIsSUFBdUI7UUFDbkQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGlCQUFNLG1CQUFtQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyxxREFBcUIsR0FBN0IsVUFBOEIsSUFBMEM7UUFDdEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxJQUFNLElBQUksR0FBSSxJQUFJLENBQUMsQ0FBQyxDQUFzQixDQUFDLElBQUksQ0FBQztnQkFDaEQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsR0FBSSxJQUFJLENBQUMsQ0FBQyxDQUFzQixDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBRS9ILElBQUksS0FBSyxTQUFRLENBQUM7Z0JBQ2xCLElBQUksQ0FBQztvQkFDSCxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO2dCQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDSCw0QkFBQztBQUFELENBNUJBLEFBNEJDLENBNUJtQyxJQUFJLENBQUMsVUFBVSxHQTRCbEQiLCJmaWxlIjoicnVsZXMvbm9JbnZhbGlkUmVnZXhwUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
