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
        var walker = new NoEmptyCharacterClassWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = "don't use empty classes in regular expressions";
exports.Rule = Rule;
var NoEmptyCharacterClassWalker = (function (_super) {
    __extends(NoEmptyCharacterClassWalker, _super);
    function NoEmptyCharacterClassWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoEmptyCharacterClassWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateEmptyCharacterClass(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoEmptyCharacterClassWalker.prototype.validateEmptyCharacterClass = function (node) {
        if (!(/^\/([^\\[]|\\.|\[([^\\\]]|\\.)+\])*\/[gim]*$/.test(node.text))) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoEmptyCharacterClassWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRW1wdHlDaGFyYWN0ZXJDbGFzc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkJBQStCO0FBRS9CO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFPQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksMkJBQTJCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNqQyxtQkFBYyxHQUFHLGdEQUFnRCxDQUFDO0FBRHJFLG9CQUFJO0FBU2pCO0lBQTBDLCtDQUFlO0lBQXpEOztJQVdBLENBQUM7SUFWVyxtRUFBNkIsR0FBdkMsVUFBd0MsSUFBMEI7UUFDaEUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLGlCQUFNLDZCQUE2QixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyxpRUFBMkIsR0FBbkMsVUFBb0MsSUFBMEI7UUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLDhDQUE4QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDN0YsQ0FBQztJQUNILENBQUM7SUFDSCxrQ0FBQztBQUFELENBWEEsQUFXQyxDQVh5QyxJQUFJLENBQUMsVUFBVSxHQVd4RCIsImZpbGUiOiJydWxlcy9ub0VtcHR5Q2hhcmFjdGVyQ2xhc3NSdWxlLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
