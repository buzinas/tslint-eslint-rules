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
        var walker = new NoInnerDeclarationsWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInnerDeclarationsWalker = (function (_super) {
    __extends(NoInnerDeclarationsWalker, _super);
    function NoInnerDeclarationsWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VALID_PARENT_TYPES = [
            ts.SyntaxKind.SourceFile,
            ts.SyntaxKind.FunctionDeclaration,
            ts.SyntaxKind.FunctionExpression,
            ts.SyntaxKind.ArrowFunction,
            ts.SyntaxKind.MethodDeclaration,
            ts.SyntaxKind.ModuleDeclaration,
            ts.SyntaxKind.Constructor
        ];
        return _this;
    }
    NoInnerDeclarationsWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validateInnerDeclaration(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    NoInnerDeclarationsWalker.prototype.visitVariableStatement = function (node) {
        if (this.hasOption('both') && node.declarationList.getFirstToken().kind === ts.SyntaxKind.VarKeyword) {
            this.validateInnerDeclaration(node);
        }
        _super.prototype.visitVariableStatement.call(this, node);
    };
    NoInnerDeclarationsWalker.prototype.validateInnerDeclaration = function (node) {
        var body = this.nearestBody(node);
        var isValid = (body.isSourceFile && body.distance === 1) || body.distance === 2;
        if (!isValid) {
            var decl = node.kind === ts.SyntaxKind.FunctionDeclaration ? 'function' : 'variable';
            var root = body.isSourceFile ? 'program' : 'function body';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "move " + decl + " declaration to " + root + " root"));
        }
    };
    NoInnerDeclarationsWalker.prototype.nearestBody = function (node) {
        var ancestor = node.parent;
        var generation = 1;
        while (ancestor && this.VALID_PARENT_TYPES.indexOf(ancestor.kind) === -1) {
            generation++;
            ancestor = ancestor.parent;
        }
        return {
            isSourceFile: (ancestor && ancestor.kind === ts.SyntaxKind.SourceFile) || !ancestor,
            distance: generation
        };
    };
    return NoInnerDeclarationsWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vSW5uZXJEZWNsYXJhdGlvbnNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0I7SUFBMEIsd0JBQXVCO0lBQWpEOztJQUtBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDNUUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUxBLEFBS0MsQ0FMeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBS2hEO0FBTFksb0JBQUk7QUFPakI7SUFBd0MsNkNBQWU7SUFBdkQ7UUFBQSxxRUFpREM7UUFoRFMsd0JBQWtCLEdBQUc7WUFDM0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVO1lBQ3hCLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CO1lBQ2pDLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCO1lBQ2hDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYTtZQUMzQixFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUMvQixFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUMvQixFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVc7U0FDMUIsQ0FBQzs7SUF3Q0osQ0FBQztJQXRDVyw0REFBd0IsR0FBbEMsVUFBbUMsSUFBNEI7UUFDN0QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLGlCQUFNLHdCQUF3QixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFUywwREFBc0IsR0FBaEMsVUFBaUMsSUFBMEI7UUFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDckcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxpQkFBTSxzQkFBc0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU8sNERBQXdCLEdBQWhDLFVBQWlDLElBQWE7UUFDNUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQztRQUVsRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUN2RixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsR0FBRyxlQUFlLENBQUM7WUFFN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBUSxJQUFJLHdCQUFtQixJQUFJLFVBQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEgsQ0FBQztJQUNILENBQUM7SUFFTywrQ0FBVyxHQUFuQixVQUFvQixJQUFhO1FBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDekUsVUFBVSxFQUFFLENBQUM7WUFDYixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUM3QixDQUFDO1FBRUQsTUFBTSxDQUFDO1lBQ0wsWUFBWSxFQUFFLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDbkYsUUFBUSxFQUFFLFVBQVU7U0FDckIsQ0FBQztJQUNKLENBQUM7SUFDSCxnQ0FBQztBQUFELENBakRBLEFBaURDLENBakR1QyxJQUFJLENBQUMsVUFBVSxHQWlEdEQiLCJmaWxlIjoicnVsZXMvbm9Jbm5lckRlY2xhcmF0aW9uc1J1bGUuanMiLCJzb3VyY2VSb290IjoiQzpcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
