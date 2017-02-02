"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-arrow-parens';
var always = 'Expected parentheses around arrow function argument.';
var asNeeded = 'Unexpected parentheses around single function argument.';
var block = 'Unexpected parentheses around single function argument having a body with no curly braces.';
var blockNoParens = 'Expected parentheses around arrow function argument having a body with curly braces.';
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
    description: 'require parens in arrow function arguments',
    rationale: (_a = ["\n      Arrow functions can omit parentheses when they have exactly one parameter. In all other cases\n      the parameter(s) must be wrapped in parentheses. This rule enforces the consistent use of\n      parentheses in arrow functions.\n      "], _a.raw = ["\n      Arrow functions can omit parentheses when they have exactly one parameter. In all other cases\n      the parameter(s) must be wrapped in parentheses. This rule enforces the consistent use of\n      parentheses in arrow functions.\n      "], Lint.Utils.dedent(_a)),
    optionsDescription: (_b = ["\n      This rule has a string option and an object one.\n\n      String options are:\n\n      - `\"always\"` (default) requires parentheses around arguments in all cases.\n      - `\"as-needed\"` allows omitting parentheses when there is only one argument.\n\n      Object properties for variants of the `\"as-needed\"` option:\n\n      - `\"requireForBlockBody\": true` modifies the as-needed rule in order to require\n        parentheses if the function body is in an instructions block (surrounded by braces).\n      "], _b.raw = ["\n      This rule has a string option and an object one.\n\n      String options are:\n\n      - \\`\"always\"\\` (default) requires parentheses around arguments in all cases.\n      - \\`\"as-needed\"\\` allows omitting parentheses when there is only one argument.\n\n      Object properties for variants of the \\`\"as-needed\"\\` option:\n\n      - \\`\"requireForBlockBody\": true\\` modifies the as-needed rule in order to require\n        parentheses if the function body is in an instructions block (surrounded by braces).\n      "], Lint.Utils.dedent(_b)),
    options: {
        type: 'array',
        items: [
            {
                enum: ['always', 'as-needed']
            },
            {
                type: 'object',
                properties: {
                    requireForBlockBody: {
                        type: 'boolean'
                    }
                },
                additionalProperties: false
            }
        ],
        maxLength: 1
    },
    optionExamples: [
        (_c = ["\n        \"", "\": [true]\n        "], _c.raw = ["\n        \"", "\": [true]\n        "], Lint.Utils.dedent(_c, RULE_NAME)),
        (_d = ["\n        \"", "\": [true, \"always\"]\n        "], _d.raw = ["\n        \"", "\": [true, \"always\"]\n        "], Lint.Utils.dedent(_d, RULE_NAME)),
        (_e = ["\n        \"", "\": [true, \"as-needed\"]\n        "], _e.raw = ["\n        \"", "\": [true, \"as-needed\"]\n        "], Lint.Utils.dedent(_e, RULE_NAME)),
        (_f = ["\n        \"", "\": [true, \"as-needed\", { \"requireForBlockBody\": true }]\n        "], _f.raw = ["\n        \"", "\": [true, \"as-needed\", { \"requireForBlockBody\": true }]\n        "], Lint.Utils.dedent(_f, RULE_NAME))
    ],
    typescriptOnly: false,
    type: 'style'
};
exports.Rule = Rule;
var RuleWalker = (function (_super) {
    __extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.srcFile = sourceFile;
        var opt = _this.getOptions();
        _this.asNeeded = opt[0] === 'as-needed';
        _this.requireForBlockBody = _this.asNeeded && opt[1] && opt[1].requireForBlockBody === true;
        return _this;
    }
    RuleWalker.prototype.visitArrowFunction = function (node) {
        _super.prototype.visitArrowFunction.call(this, node);
        if (node.parameters.length === 1) {
            var skip = Lint.hasModifier(node.modifiers, ts.SyntaxKind.AsyncKeyword) ? 1 : 0;
            var parameter = node.parameters[0];
            var text = parameter.getText();
            var firstToken = node.getChildAt(skip);
            var lastToken = node.getChildAt(2 + skip);
            var position = parameter.getStart();
            var paramWidth = text.length;
            var parensWidth = lastToken.end - firstToken.getStart(this.srcFile);
            var isGenerics = firstToken.kind === ts.SyntaxKind.LessThanToken;
            var hasParens = firstToken.kind === ts.SyntaxKind.OpenParenToken;
            var bodyIsBlock = node.body.kind === ts.SyntaxKind.Block;
            var isIdentifier = parameter.name.kind === ts.SyntaxKind.Identifier;
            var hasAnnotations = parameter.initializer || parameter.dotDotDotToken || parameter.type;
            var isSingleIdentifier = isIdentifier && !hasAnnotations;
            if (this.requireForBlockBody) {
                if (isSingleIdentifier && !node.type && !bodyIsBlock) {
                    if (hasParens) {
                        this.report(position - 1, parensWidth, block);
                    }
                    return;
                }
                if (bodyIsBlock && !isGenerics) {
                    if (!hasParens) {
                        this.report(position, paramWidth, blockNoParens);
                    }
                    return;
                }
            }
            if (this.asNeeded && isSingleIdentifier && !node.type) {
                if (hasParens) {
                    this.report(position - 1, parensWidth, asNeeded);
                }
                return;
            }
            if (!hasParens && !isGenerics) {
                this.report(position, paramWidth, always);
            }
        }
    };
    RuleWalker.prototype.report = function (position, width, message) {
        var failure = this.createFailure(position, width, message);
        this.addFailure(failure);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var _a, _b, _c, _d, _e, _f;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlckFycm93UGFyZW5zUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFPQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CLElBQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDO0FBQ3JDLElBQU0sTUFBTSxHQUFHLHNEQUFzRCxDQUFDO0FBQ3RFLElBQU0sUUFBUSxHQUFHLHlEQUF5RCxDQUFDO0FBQzNFLElBQU0sS0FBSyxHQUFHLDRGQUE0RixDQUFDO0FBQzNHLElBQU0sYUFBYSxHQUFHLHNGQUFzRixDQUFDO0FBRTdHO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUE4REEsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQTlEQSxBQThEQyxDQTlEeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ2pDLGFBQVEsR0FBdUI7SUFDM0MsUUFBUSxFQUFFLFNBQVM7SUFDbkIsV0FBVyxFQUFFLDRDQUE0QztJQUN6RCxTQUFTLDZRQUFtQix1UEFJekIsR0FKUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FJekI7SUFDSCxrQkFBa0IsaWlCQUFtQiwyaEJBWWxDLEdBWmlCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQVlsQztJQUNILE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFO1lBQ0w7Z0JBQ0UsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQzthQUM5QjtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRTtvQkFDVixtQkFBbUIsRUFBRTt3QkFDbkIsSUFBSSxFQUFF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QyxJQUFJLENBQUM7WUFDM0YsSUFBTSxrQkFBa0IsR0FBRyxZQUFZLElBQUksQ0FBQyxjQUFjLENBQUM7WUFFM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDN0IsRUFBRSxDQUFDLENBQUMsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDckQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNoRCxDQUFDO29CQUNELE1BQU0sQ0FBQztnQkFDVCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBQ25ELENBQUM7b0JBQ0QsTUFBTSxDQUFDO2dCQUNULENBQUM7WUFDSCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ25ELENBQUM7Z0JBQ0QsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVPLDJCQUFNLEdBQWQsVUFBZSxRQUFnQixFQUFFLEtBQWEsRUFBRSxPQUFlO1FBQzdELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDSCxpQkFBQztBQUFELENBakVBLEFBaUVDLENBakV3QixJQUFJLENBQUMsVUFBVSxHQWlFdkMiLCJmaWxlIjoicnVsZXMvdGVyQXJyb3dQYXJlbnNSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1dvcmsvRGV2ZWxvcG1lbnQvd29ya3NwYWNlL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
