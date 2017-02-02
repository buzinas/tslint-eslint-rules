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
        var walker = new NoUnexpectedMultilineWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = {
    func: 'unexpected newline between function and ( of function call',
    prop: 'unexpected newline between object and [ of property access',
    template: 'unexpected newline between template tag and template literal'
};
exports.Rule = Rule;
var NoUnexpectedMultilineWalker = (function (_super) {
    __extends(NoUnexpectedMultilineWalker, _super);
    function NoUnexpectedMultilineWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoUnexpectedMultilineWalker.prototype.visitCallExpression = function (node) {
        var firstLeftParen = node.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenParenToken; })[0];
        if (this.isBreakBefore(firstLeftParen)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.visitElementAccessExpression = function (node) {
        var firstLeftSquareBracket = node.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenBracketToken; })[0];
        if (this.isBreakBefore(firstLeftSquareBracket)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
        _super.prototype.visitElementAccessExpression.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
            var children = node.getChildren();
            var tag = children.filter(function (ch) { return ch.kind === ts.SyntaxKind.Identifier; })[0];
            var tagIndex = children.indexOf(tag);
            if (tag && children[tagIndex + 1]) {
                var template = children[tagIndex + 1];
                if (this.isBreakBefore(template)) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.isBreakBefore = function (node) {
        if (node.parent) {
            var children = node.parent.getChildren();
            var nodeIndex = children.indexOf(node);
            if (nodeIndex > 0) {
                var nodeLine = this.getStartPosition(node).line;
                var previousNodeLine = this.getEndPosition(children[nodeIndex - 1]).line;
                if (nodeLine !== previousNodeLine) {
                    return true;
                }
            }
        }
        return false;
    };
    NoUnexpectedMultilineWalker.prototype.getMessage = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.CallExpression:
                return Rule.FAILURE_STRING.func;
            case ts.SyntaxKind.ElementAccessExpression:
                return Rule.FAILURE_STRING.prop;
            case ts.SyntaxKind.TaggedTemplateExpression:
                return Rule.FAILURE_STRING.template;
            default:
                throw 'Unexpected node type: ' + ts.SyntaxKind[node.kind];
        }
    };
    NoUnexpectedMultilineWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    NoUnexpectedMultilineWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return NoUnexpectedMultilineWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vVW5leHBlY3RlZE11bHRpbGluZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQjtJQUEwQix3QkFBdUI7SUFBakQ7O0lBV0EsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUEyQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM5RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsV0FBQztBQUFELENBWEEsQUFXQyxDQVh5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7QUFDakMsbUJBQWMsR0FBRztJQUM3QixJQUFJLEVBQUUsNERBQTREO0lBQ2xFLElBQUksRUFBRSw0REFBNEQ7SUFDbEUsUUFBUSxFQUFFLDhEQUE4RDtDQUN6RSxDQUFDO0FBTFMsb0JBQUk7QUFhakI7SUFBMEMsK0NBQWU7SUFBekQ7O0lBNkVBLENBQUM7SUE1RVcseURBQW1CLEdBQTdCLFVBQThCLElBQXVCO1FBQ25ELElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUF4QyxDQUF3QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMs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QkFDZCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLGdEQUFVLEdBQWxCLFVBQW1CLElBQWE7UUFDOUIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEIsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUNsQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO2dCQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDbEMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHdCQUF3QjtnQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO1lBQ3RDO2dCQUNFLE1BQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUQsQ0FBQztJQUNILENBQUM7SUFFTyxzREFBZ0IsR0FBeEIsVUFBeUIsSUFBYTtRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTyxvREFBYyxHQUF0QixVQUF1QixJQUFhO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNILGtDQUFDO0FBQUQsQ0E3RUEsQUE2RUMsQ0E3RXlDLElBQUksQ0FBQyxVQUFVLEdBNkV4RCIsImZpbGUiOiJydWxlcy9ub1VuZXhwZWN0ZWRNdWx0aWxpbmVSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1dvcmsvRGV2ZWxvcG1lbnQvd29ya3NwYWNlL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
