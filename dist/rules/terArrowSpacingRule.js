"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var RULE_NAME = 'ter-arrow-spacing';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new RuleWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: RULE_NAME,
    description: 'require space before/after arrow function\'s arrow',
    rationale: (_a = ["\n      This rule normalizes the style of spacing before/after an arrow function\u2019s arrow(`=>`).\n      "], _a.raw = ["\n      This rule normalizes the style of spacing before/after an arrow function\u2019s arrow(\\`=>\\`).\n      "], Lint.Utils.dedent(_a)),
    optionsDescription: (_b = ["\n      This rule takes an object argument with `before` and `after` properties, each with a\n      Boolean value.\n      \n      The default configuration is `{ \"before\": true, \"after\": true }`.\n      \n      `true` means there should be one or more spaces and `false` means no spaces.\n      "], _b.raw = ["\n      This rule takes an object argument with \\`before\\` and \\`after\\` properties, each with a\n      Boolean value.\n      \n      The default configuration is \\`{ \"before\": true, \"after\": true }\\`.\n      \n      \\`true\\` means there should be one or more spaces and \\`false\\` means no spaces.\n      "], Lint.Utils.dedent(_b)),
    options: {
        type: 'array',
        items: [{
                type: 'object',
                properties: {
                    before: {
                        type: 'boolean'
                    },
                    after: {
                        type: 'boolean'
                    }
                },
                additionalProperties: false
            }],
        maxLength: 1
    },
    optionExamples: [
        (_c = ["\n        \"", "\": [true]\n        "], _c.raw = ["\n        \"", "\": [true]\n        "], Lint.Utils.dedent(_c, RULE_NAME)),
        (_d = ["\n        \"", "\": [true, {\n          \"before\": false,\n          \"after\": false\n        }]\n        "], _d.raw = ["\n        \"", "\": [true, {\n          \"before\": false,\n          \"after\": false\n        }]\n        "], Lint.Utils.dedent(_d, RULE_NAME))
    ],
    typescriptOnly: false,
    type: 'style'
};
exports.Rule = Rule;
var RuleWalker = (function (_super) {
    __extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.before = true;
        _this.after = true;
        var opt = _this.getOptions();
        if (opt[0]) {
            _this.before = opt[0].before !== false;
            _this.after = opt[0].after !== false;
        }
        _this.srcFile = sourceFile;
        _this.srcText = sourceFile.getFullText();
        return _this;
    }
    RuleWalker.prototype.visitArrowFunction = function (node) {
        var arrow = node.equalsGreaterThanToken;
        var space = {
            before: /\s/.test(this.srcText[arrow.getStart(this.srcFile) - 1]),
            after: /\s/.test(this.srcText[arrow.end])
        };
        if (this.before) {
            if (!space.before) {
                this.report(arrow, 'Missing', 'before');
            }
        }
        else {
            if (space.before) {
                this.report(arrow, 'Unexpected', 'before');
            }
        }
        if (this.after) {
            if (!space.after) {
                this.report(arrow, 'Missing', 'after');
            }
        }
        else {
            if (space.after) {
                this.report(arrow, 'Unexpected', 'after');
            }
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    RuleWalker.prototype.report = function (arrowToken, status, place) {
        var failure = this.createFailure(arrowToken.getStart(), arrowToken.getWidth(), status + " space " + place + " =>.");
        this.addFailure(failure);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var _a, _b, _c, _d;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlckFycm93U3BhY2luZ1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUEsNkJBQStCO0FBRS9CLElBQU0sU0FBUyxHQUFHLG1CQUFtQixDQUFDO0FBRXRDO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFrREEsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQWxEQSxBQWtEQyxDQWxEeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ2pDLGFBQVEsR0FBdUI7SUFDM0MsUUFBUSxFQUFFLFNBQVM7SUFDbkIsV0FBVyxFQUFFLG9EQUFvRDtJQUNqRSxTQUFTLG9JQUFtQixrSEFFekIsR0FGUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FFekI7SUFDSCxrQkFBa0IsbVVBQW1CLGlVQU9sQyxHQVBpQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FPbEM7SUFDSCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsT0FBTztRQUNiLEtBQUssRUFBRSxDQUFDO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRTtvQkFDVixNQUFNLEVBQUU7d0JBQ04sSUFBSSxFQUFFLFNBQVM7cUJBQ2hCO29CQUNELEtBQUssRUFBRTt3QkFDTCxJQUFJLEVBQUUsU0FBUztxQkFDaEI7aUJBQ0Y7Z0JBQ0Qsb0JBQW9CLEVBQUUsS0FBSzthQUM1QixDQUFDO1FBQ0YsU0FBUyxFQUFFLENBQUM7S0FDYjtJQUNELGNBQWMsRUFBRTtrRUFDRyxjQUNaLEVBQVMsc0JBQ1gsR0FGSCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FDWixTQUFTOzBJQUVHLGNBQ1osRUFBUyw4RkFJWCxHQUxILElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUNaLFNBQVM7S0FLZjtJQUNELGNBQWMsRUFBRSxLQUFLO0lBQ3JCLElBQUksRUFBRSxPQUFPO0NBQ2QsQ0FBQztBQTVDUyxvQkFBSTtBQW9EakI7SUFBeUIsOEJBQWU7SUFNdEMsb0JBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNFLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FRM0I7UUFkTyxZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLFdBQUssR0FBWSxJQUFJLENBQUM7UUFNNUIsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7UUFDdEMsQ0FBQztRQUNELEtBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzFCLEtBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDOztJQUMxQyxDQUFDO0lBRVMsdUNBQWtCLEdBQTVCLFVBQTZCLElBQXNCO1FBQ2pELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztRQUMxQyxJQUFNLEtBQUssR0FBRztZQUNaLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUMsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3QyxDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFDSCxDQUFDO1FBQ0QsaUJBQU0sa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLDJCQUFNLEdBQWQsVUFBZSxVQUFtQixFQUFFLE1BQWMsRUFBRSxLQUFhO1FBQy9ELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQ2hDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFDckIsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUNsQixNQUFNLGVBQVUsS0FBSyxTQUFNLENBQy9CLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDSCxpQkFBQztBQUFELENBcERBLEFBb0RDLENBcER3QixJQUFJLENBQUMsVUFBVSxHQW9EdkMiLCJmaWxlIjoicnVsZXMvdGVyQXJyb3dTcGFjaW5nUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9Xb3JrL0RldmVsb3BtZW50L3dvcmtzcGFjZS90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
