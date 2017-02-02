"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-arrow-body-style';
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
    description: 'require braces in arrow function body',
    rationale: (_a = ["\n      Arrow functions have two syntactic forms for their function bodies. They may be defined with\n      a block body (denoted by curly braces) `() => { ... }` or with a single expression\n      `() => ...`, whose value is implicitly returned.\n      "], _a.raw = ["\n      Arrow functions have two syntactic forms for their function bodies. They may be defined with\n      a block body (denoted by curly braces) \\`() => { ... }\\` or with a single expression\n      \\`() => ...\\`, whose value is implicitly returned.\n      "], Lint.Utils.dedent(_a)),
    optionsDescription: (_b = ["\n      The rule takes one or two options. The first is a string, which can be:\n\n      - `\"always\"` enforces braces around the function body\n      - `\"as-needed\"` enforces no braces where they can be omitted (default)\n      - `\"never\"` enforces no braces around the function body (constrains arrow functions to the\n                    role of returning an expression)\n\n      The second one is an object for more fine-grained configuration when the first option is\n      `\"as-needed\"`. Currently, the only available option is `requireReturnForObjectLiteral`, a\n      boolean property. It\u2019s false by default. If set to true, it requires braces and an explicit\n      return for object literals.\n      "], _b.raw = ["\n      The rule takes one or two options. The first is a string, which can be:\n\n      - \\`\"always\"\\` enforces braces around the function body\n      - \\`\"as-needed\"\\` enforces no braces where they can be omitted (default)\n      - \\`\"never\"\\` enforces no braces around the function body (constrains arrow functions to the\n                    role of returning an expression)\n\n      The second one is an object for more fine-grained configuration when the first option is\n      \\`\"as-needed\"\\`. Currently, the only available option is \\`requireReturnForObjectLiteral\\`, a\n      boolean property. It\u2019s false by default. If set to true, it requires braces and an explicit\n      return for object literals.\n      "], Lint.Utils.dedent(_b)),
    options: {
        anyOf: [
            {
                type: 'array',
                items: [
                    {
                        enum: ['always', 'never']
                    }
                ],
                minItems: 0,
                maxItems: 1
            },
            {
                type: 'array',
                items: [
                    {
                        enum: ['as-needed']
                    },
                    {
                        type: 'object',
                        properties: {
                            requireReturnForObjectLiteral: { type: 'boolean' }
                        },
                        additionalProperties: false
                    }
                ],
                minItems: 0,
                maxItems: 2
            }
        ]
    },
    optionExamples: [
        (_c = ["\n        \"", "\": [true, \"always\"]\n        "], _c.raw = ["\n        \"", "\": [true, \"always\"]\n        "], Lint.Utils.dedent(_c, RULE_NAME)),
        (_d = ["\n        \"", "\": [true, \"never\"]\n        "], _d.raw = ["\n        \"", "\": [true, \"never\"]\n        "], Lint.Utils.dedent(_d, RULE_NAME)),
        (_e = ["\n        \"", "\": [true, \"as-needed\", {\n          \"requireReturnForObjectLiteral\": true\n        }]\n        "], _e.raw = ["\n        \"", "\": [true, \"as-needed\", {\n          \"requireReturnForObjectLiteral\": true\n        }]\n        "], Lint.Utils.dedent(_e, RULE_NAME))
    ],
    typescriptOnly: false,
    type: 'style'
};
exports.Rule = Rule;
var RuleWalker = (function (_super) {
    __extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        var opt = _this.getOptions();
        _this.always = opt[0] === 'always';
        _this.asNeeded = !opt[0] || opt[0] === 'as-needed';
        _this.never = opt[0] === 'never';
        _this.requireReturnForObjectLiteral = opt[1] && opt[1].requireReturnForObjectLiteral;
        return _this;
    }
    RuleWalker.prototype.visitArrowFunction = function (node) {
        var arrowBody = node.body;
        if (arrowBody.kind === ts.SyntaxKind.Block) {
            var blockBody = arrowBody.statements;
            if (blockBody.length !== 1 && !this.never) {
                return;
            }
            if (this.asNeeded &&
                this.requireReturnForObjectLiteral &&
                blockBody[0].kind === ts.SyntaxKind.ReturnStatement &&
                blockBody[0].expression &&
                this.isObjectLiteral(blockBody[0].expression)) {
                return;
            }
            if (this.never || this.asNeeded && blockBody[0].kind === ts.SyntaxKind.ReturnStatement) {
                this.report(arrowBody, false);
            }
        }
        else {
            if (this.always || (this.asNeeded &&
                this.requireReturnForObjectLiteral &&
                this.isObjectLiteral(arrowBody))) {
                this.report(arrowBody, true);
            }
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    RuleWalker.prototype.isObjectLiteral = function (node) {
        var obj = node;
        while (obj.kind === ts.SyntaxKind.ParenthesizedExpression) {
            obj = node.expression;
        }
        return obj.kind === ts.SyntaxKind.ObjectLiteralExpression;
    };
    RuleWalker.prototype.report = function (arrowBody, expected) {
        var val = expected ? 'Expected' : 'Unexpected';
        var failure = this.createFailure(arrowBody.getStart(), arrowBody.getWidth(), val + " block statement surrounding arrow body.");
        this.addFailure(failure);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var _a, _b, _c, _d, _e;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlckFycm93Qm9keVN0eWxlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CLElBQU0sU0FBUyxHQUFHLHNCQUFzQixDQUFDO0FBRXpDO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUEwRUEsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQTFFQSxBQTBFQyxDQTFFeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ2pDLGFBQVEsR0FBdUI7SUFDM0MsUUFBUSxFQUFFLFNBQVM7SUFDbkIsV0FBVyxFQUFFLHVDQUF1QztJQUNwRCxTQUFTLHNSQUFtQix3UUFJekIsR0FKUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FJekI7SUFDSCxrQkFBa0IsMHVCQUFtQix3dUJBWWxDLEdBWmlCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQVlsQztJQUNILE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRTtZQUNMO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRTtvQkFDTDt3QkFDRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO3FCQUMxQjtpQkFDRjtnQkFDRCxRQUFRLEVBQUUsQ0FBQztnQkFDWCxRQUFRLEVBQUUsQ0FBQzthQUNaO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFO29CQUNMO3dCQUNFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztxQkFDcEI7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsVUFBVSxFQUFF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QUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQztRQUNILENBQUM7UUFFRCxpQkFBTSxrQkFBa0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sb0NBQWUsR0FBdkIsVUFBd0IsSUFBYTtRQUNuQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQzFELEdBQUcsR0FBSSxJQUFtQyxDQUFDLFVBQVUsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztJQUM1RCxDQUFDO0lBRU8sMkJBQU0sR0FBZCxVQUFlLFNBQWtCLEVBQUUsUUFBaUI7UUFDbEQsSUFBTSxHQUFHLEdBQUcsUUFBUSxHQUFHLFVBQVUsR0FBRyxZQUFZLENBQUM7UUFDakQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FDaEMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUNwQixTQUFTLENBQUMsUUFBUSxFQUFFLEVBQ2pCLEdBQUcsNkNBQTBDLENBQ2pELENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDSCxpQkFBQztBQUFELENBbkVBLEFBbUVDLENBbkV3QixJQUFJLENBQUMsVUFBVSxHQW1FdkMiLCJmaWxlIjoicnVsZXMvdGVyQXJyb3dCb2R5U3R5bGVSdWxlLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
