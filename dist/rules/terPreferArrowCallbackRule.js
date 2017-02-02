"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-prefer-arrow-callback';
var OPTIONS;
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
    description: 'require arrow functions as callbacks',
    rationale: (_a = ["\n      Arrow functions are suited to callbacks, because:\n      \n      * `this` keywords in arrow functions bind to the upper scope\u2019s.\n      * The notation of the arrow function is shorter than function expression\u2019s.\n      "], _a.raw = ["\n      Arrow functions are suited to callbacks, because:\n      \n      * \\`this\\` keywords in arrow functions bind to the upper scope\u2019s.\n      * The notation of the arrow function is shorter than function expression\u2019s.\n      "], Lint.Utils.dedent(_a)),
    optionsDescription: (_b = ["\n      This rule takes one optional argument, an object which is an options object. This object\n      may specify the following properties:\n      \n      * `\"allowNamedFunctions\"` (default false) When set to `true`, the rule doesn't warn on\n                                  named functions used as callback.\n      * `\"allowUnboundThis\"` (default true) When set to `false`, this option allows the use of\n                               `this` without restriction and checks for dynamically assigned\n                               `this` values such as when using `Array.prototype.map` with a\n                               `context` argument. Normally, the rule will flag the use of this\n                               whenever a function does not use `bind()` to specify the value of\n                               `this` constantly.\n      "], _b.raw = ["\n      This rule takes one optional argument, an object which is an options object. This object\n      may specify the following properties:\n      \n      * \\`\"allowNamedFunctions\"\\` (default false) When set to \\`true\\`, the rule doesn't warn on\n                                  named functions used as callback.\n      * \\`\"allowUnboundThis\"\\` (default true) When set to \\`false\\`, this option allows the use of\n                               \\`this\\` without restriction and checks for dynamically assigned\n                               \\`this\\` values such as when using \\`Array.prototype.map\\` with a\n                               \\`context\\` argument. Normally, the rule will flag the use of this\n                               whenever a function does not use \\`bind()\\` to specify the value of\n                               \\`this\\` constantly.\n      "], Lint.Utils.dedent(_b)),
    options: {
        type: 'array',
        items: [{
                type: 'object',
                properties: {
                    allowNamedFunctions: {
                        type: 'boolean'
                    },
                    allowUnboundThis: {
                        type: 'boolean'
                    }
                },
                additionalProperties: false
            }],
        maxLength: 1
    },
    optionExamples: [
        (_c = ["\n        \"", "\": [true]\n        "], _c.raw = ["\n        \"", "\": [true]\n        "], Lint.Utils.dedent(_c, RULE_NAME)),
        (_d = ["\n        \"", "\": [true, {\n          \"allowNamedFunctions\": true\n        }]\n        "], _d.raw = ["\n        \"", "\": [true, {\n          \"allowNamedFunctions\": true\n        }]\n        "], Lint.Utils.dedent(_d, RULE_NAME)),
        (_e = ["\n        \"", "\": [true, {\n          \"allowUnboundThis\": false\n        }]\n        "], _e.raw = ["\n        \"", "\": [true, {\n          \"allowUnboundThis\": false\n        }]\n        "], Lint.Utils.dedent(_e, RULE_NAME)),
        (_f = ["\n        \"", "\": [true, {\n          \"allowNamedFunctions\": true,\n          \"allowUnboundThis\": false\n        }]\n        "], _f.raw = ["\n        \"", "\": [true, {\n          \"allowNamedFunctions\": true,\n          \"allowUnboundThis\": false\n        }]\n        "], Lint.Utils.dedent(_f, RULE_NAME))
    ],
    typescriptOnly: false,
    type: 'typescript'
};
exports.Rule = Rule;
function checkMetaProperty(node, name, prop) {
    return node.parent.getFirstToken().getText() === name && node.name.text === prop;
}
function getCallbackInfo(func) {
    var retv = { isCallback: false, isLexicalThis: false };
    var node = func;
    var parent = node.parent;
    while (node) {
        switch (parent.kind) {
            case ts.SyntaxKind.BinaryExpression:
            case ts.SyntaxKind.ConditionalExpression:
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (parent.name.kind === ts.SyntaxKind.Identifier &&
                    parent.name.text === 'bind' &&
                    parent.parent.kind === ts.SyntaxKind.CallExpression &&
                    parent.parent.expression === parent) {
                    retv.isLexicalThis = (parent.parent.arguments.length === 1 &&
                        parent.parent.arguments[0].kind === ts.SyntaxKind.ThisKeyword);
                    node = parent;
                    parent = parent.parent;
                }
                else {
                    return retv;
                }
                break;
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression:
                if (parent.expression !== node) {
                    retv.isCallback = true;
                }
                return retv;
            default:
                return retv;
        }
        node = parent;
        parent = parent.parent;
    }
    throw new Error('unreachable');
}
var RuleWalker = (function (_super) {
    __extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.stack = [];
        OPTIONS = {
            allowUnboundThis: true,
            allowNamedFunctions: null
        };
        var userOptions = _this.getOptions()[0];
        if (userOptions) {
            OPTIONS.allowUnboundThis = userOptions.allowUnboundThis !== false;
            OPTIONS.allowNamedFunctions = userOptions.allowNamedFunctions;
        }
        _this.srcFile = sourceFile;
        _this.srcText = sourceFile.getFullText();
        return _this;
    }
    RuleWalker.prototype.enterScope = function (functionName) {
        this.stack.push({
            functionName: functionName,
            isRecursive: false,
            hasThis: false,
            hasSuper: false,
            hasMeta: false,
            hasArguments: false
        });
    };
    RuleWalker.prototype.exitScope = function () {
        return this.stack.pop();
    };
    RuleWalker.prototype.exitFunctionExpression = function (node) {
        var scopeInfo = this.exitScope();
        if (node.asteriskToken) {
            return;
        }
        if (node.name && node.name.text) {
            if (OPTIONS.allowNamedFunctions || scopeInfo.isRecursive) {
                return;
            }
        }
        var params = node.parameters.map(function (x) { return x.name.getText(); });
        var argumentsIsParam = params.indexOf('arguments') !== -1;
        if (!argumentsIsParam && scopeInfo.hasArguments) {
            return;
        }
        var callbackInfo = getCallbackInfo(node);
        if (callbackInfo.isCallback &&
            (!OPTIONS.allowUnboundThis || !scopeInfo.hasThis || callbackInfo.isLexicalThis) &&
            !scopeInfo.hasSuper &&
            !scopeInfo.hasMeta) {
            var failure = this.createFailure(node.getStart(), node.getWidth(), 'Unexpected function expression.');
            this.addFailure(failure);
        }
    };
    RuleWalker.prototype.visitSourceFile = function (node) {
        this.stack = [];
        _super.prototype.visitSourceFile.call(this, node);
    };
    RuleWalker.prototype.visitFunctionDeclaration = function (node) {
        this.enterScope();
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.exitScope();
    };
    RuleWalker.prototype.visitFunctionExpression = function (node) {
        this.enterScope(node.name ? node.name.text : undefined);
        _super.prototype.visitFunctionExpression.call(this, node);
        this.exitFunctionExpression(node);
    };
    RuleWalker.prototype.visitNode = function (node) {
        var info = this.stack[this.stack.length - 1];
        if (info && node.parent.kind !== ts.SyntaxKind.FunctionExpression) {
            if (node.kind === ts.SyntaxKind.ThisKeyword) {
                info.hasThis = true;
            }
            else if (node.kind === ts.SyntaxKind.SuperKeyword) {
                info.hasSuper = true;
            }
            else if (node.kind === ts.SyntaxKind.Identifier) {
                var text = node.text;
                if (text === 'arguments') {
                    info.hasArguments = true;
                }
                else if (text === info.functionName) {
                    info.isRecursive = true;
                }
            }
            else if (node.kind === ts.SyntaxKind.PropertyAccessExpression &&
                checkMetaProperty(node, 'new', 'target')) {
                info.hasMeta = true;
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var _a, _b, _c, _d, _e, _f;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlclByZWZlckFycm93Q2FsbGJhY2tSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1BLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0IsSUFBTSxTQUFTLEdBQUcsMkJBQTJCLENBQUM7QUFDOUMsSUFBSSxPQUFZLENBQUM7QUFFakI7SUFBMEIsd0JBQXVCO0lBQWpEOztJQW9FQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsV0FBQztBQUFELENBcEVBLEFBb0VDLENBcEV5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7QUFDakMsYUFBUSxHQUF1QjtJQUMzQyxRQUFRLEVBQUUsU0FBUztJQUNuQixXQUFXLEVBQUUsc0NBQXNDO0lBQ25ELFNBQVMscVFBQW1CLG1QQUt6QixHQUxRLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUt6QjtJQUNILGtCQUFrQiwrMkJBQW1CLGk0QkFZbEMsR0FaaUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBWWxDO0lBQ0gsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsQ0FBQztnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUU7b0JBQ1YsbUJBQW1CLEVBQUU7d0JBQ25CLElBQUksRUFBRSxTQUFTO3FCQUNoQjtvQkFDRCxnQkFBZ0IsRUFBRTt3QkFDaEIsSUFBSSxFQUFFLFNBQVM7cUJBQ2hCO2lCQUNGO2dCQUNELG9CQUFvQixFQUFFLEtBQUs7YUFDNUIsQ0FBQztRQUNGLFNBQVMsRUFBRSxDQUFDO0tBQ2I7SUFDRCxjQUFjLEVBQUU7a0VBQ0csY0FDWixFQUFT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LENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFNLElBQUksR0FBSSxJQUFzQixDQUFDLElBQUksQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDUixJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCO2dCQUNwRCxpQkFBaUIsQ0FBQyxJQUFtQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQ3hFLENBQUMsQ0FBQyxDQUFDO2dCQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7UUFDSCxDQUFDO1FBQ0QsaUJBQU0sU0FBUyxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDSCxpQkFBQztBQUFELENBekhBLEFBeUhDLENBekh3QixJQUFJLENBQUMsVUFBVSxHQXlIdkMiLCJmaWxlIjoicnVsZXMvdGVyUHJlZmVyQXJyb3dDYWxsYmFja1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
