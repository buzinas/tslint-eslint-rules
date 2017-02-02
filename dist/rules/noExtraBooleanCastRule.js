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
        var walker = new NoExtraBooleanCastWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = {
    if: 'redundant double negation in an if statement condition',
    do: 'redundant double negation in a do while loop condition',
    while: 'redundant double negation in a while loop condition',
    ternaryif: 'redundant double negation in a ternary condition',
    for: 'redundant double negation in a for loop condition',
    unaryCast: 'redundant multiple negation',
    objectCast: 'redundant double negation in call to Boolean()',
    newCast: 'redundant double negation in Boolean constructor call'
};
exports.Rule = Rule;
var NoExtraBooleanCastWalker = (function (_super) {
    __extends(NoExtraBooleanCastWalker, _super);
    function NoExtraBooleanCastWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoExtraBooleanCastWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.validateNoExtraBoolean(node);
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
    };
    NoExtraBooleanCastWalker.prototype.validateNoExtraBoolean = function (node) {
        var parent = node.parent;
        var grandparent = parent.parent;
        if (node.operator !== ts.SyntaxKind.ExclamationToken ||
            parent.kind !== ts.SyntaxKind.PrefixUnaryExpression ||
            parent.operator !== ts.SyntaxKind.ExclamationToken) {
            return;
        }
        if (grandparent.kind === ts.SyntaxKind.BinaryExpression) {
            grandparent = grandparent.parent;
        }
        if (grandparent.kind === ts.SyntaxKind.IfStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.if));
        }
        else if (grandparent.kind === ts.SyntaxKind.DoStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.do));
        }
        else if (grandparent.kind === ts.SyntaxKind.WhileStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.while));
        }
        else if (grandparent.kind === ts.SyntaxKind.ConditionalExpression && parent === grandparent.condition) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.ternaryif));
        }
        else if (grandparent.kind === ts.SyntaxKind.ForStatement && parent === grandparent.condition) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.for));
        }
        else if (grandparent.kind === ts.SyntaxKind.PrefixUnaryExpression && grandparent.operator === ts.SyntaxKind.ExclamationToken) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.unaryCast));
        }
        else if (grandparent.kind === ts.SyntaxKind.CallExpression && /^Boolean/.test(grandparent.getText())) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.objectCast));
        }
        else if (grandparent.kind === ts.SyntaxKind.NewExpression && /^new Boolean/.test(grandparent.getText())) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.newCast));
        }
    };
    return NoExtraBooleanCastWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRXh0cmFCb29sZWFuQ2FzdFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQjtJQUEwQix3QkFBdUI7SUFBakQ7O0lBZ0JBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQWhCQSxBQWdCQyxDQWhCeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ2pDLG1CQUFjLEdBQUc7SUFDN0IsRUFBRSxFQUFFLHdEQUF3RDtJQUM1RCxFQUFFLEVBQUUsd0RBQXdEO0lBQzVELEtBQUssRUFBRSxxREFBcUQ7SUFDNUQsU0FBUyxFQUFFLGtEQUFrRDtJQUM3RCxHQUFHLEVBQUUsbURBQW1EO0lBQ3hELFNBQVMsRUFBRSw2QkFBNkI7SUFDeEMsVUFBVSxFQUFFLGdEQUFnRDtJQUM1RCxPQUFPLEVBQUUsdURBQXVEO0NBQ2pFLENBQUM7QUFWUyxvQkFBSTtBQWtCakI7SUFBdUMsNENBQWU7SUFBdEQ7O0lBZ0RBLENBQUM7SUE5Q1csNkRBQTBCLEdBQXBDLFVBQXFDLElBQThCO1FBQ2pFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxpQkFBTSwwQkFBMEIsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU8seURBQXNCLEdBQTlCLFVBQStCLElBQThCO1FBQzNELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUdoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENB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SSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEcsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNyRyxDQUFDO0lBQ0gsQ0FBQztJQUNILCtCQUFDO0FBQUQsQ0FoREEsQUFnREMsQ0FoRHNDLElBQUksQ0FBQyxVQUFVLEdBZ0RyRCIsImZpbGUiOiJydWxlcy9ub0V4dHJhQm9vbGVhbkNhc3RSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1dvcmsvRGV2ZWxvcG1lbnQvd29ya3NwYWNlL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
