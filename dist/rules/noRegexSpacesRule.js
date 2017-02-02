"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoRegexSpacesWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoRegexSpacesWalker = (function (_super) {
    __extends(NoRegexSpacesWalker, _super);
    function NoRegexSpacesWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoRegexSpacesWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateMultipleSpaces(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoRegexSpacesWalker.prototype.validateMultipleSpaces = function (node) {
        var res = /( {2,})+?/.exec(node.text);
        if (res) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "spaces are hard to count - use {" + res[0].length + "}"));
        }
    };
    return NoRegexSpacesWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vUmVnZXhTcGFjZXNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDZCQUErQjtBQUUvQjtJQUEwQix3QkFBdUI7SUFBakQ7O0lBS0EsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsV0FBQztBQUFELENBTEEsQUFLQyxDQUx5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FLaEQ7QUFMWSxvQkFBSTtBQU9qQjtJQUFrQyx1Q0FBZTtJQUFqRDs7SUFZQSxDQUFDO0lBWFcsMkRBQTZCLEdBQXZDLFVBQXdDLElBQTBCO1FBQ2hFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxpQkFBTSw2QkFBNkIsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sb0RBQXNCLEdBQTlCLFVBQStCLElBQTBCO1FBQ3ZELElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxxQ0FBbUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sTUFBRyxDQUFDLENBQUMsQ0FBQztRQUM3SCxDQUFDO0lBQ0gsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FaQSxBQVlDLENBWmlDLElBQUksQ0FBQyxVQUFVLEdBWWhEIiwiZmlsZSI6InJ1bGVzL25vUmVnZXhTcGFjZXNSdWxlLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
