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
        var walker = new NoMultiSpacesWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoMultiSpacesWalker = (function (_super) {
    __extends(NoMultiSpacesWalker, _super);
    function NoMultiSpacesWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.EXCEPTION_MAP = (_a = {},
            _a[ts.SyntaxKind.VariableDeclaration] = 'VariableDeclaration',
            _a[ts.SyntaxKind.PropertyAssignment] = 'PropertyAssignment',
            _a[ts.SyntaxKind.BinaryExpression] = 'BinaryExpression',
            _a);
        _this.STRING_TYPES = [
            ts.SyntaxKind.NoSubstitutionTemplateLiteral,
            ts.SyntaxKind.StringLiteral
        ];
        _this.exceptions = {};
        _this.targets = [];
        _this.lastNode = null;
        _this.targetNode = {};
        _this.targetIndex = 0;
        var opt = _this.getOptions();
        _this.src = sourceFile.getFullText();
        if (opt.length) {
            _this.exceptions = opt[0].exceptions || {};
        }
        if (_this.exceptions['PropertyAssignment'] === undefined) {
            _this.exceptions['PropertyAssignment'] = true;
        }
        var pattern = /[^\n\r\u2028\u2029\t ].? {2,}/g;
        while (pattern.test(_this.src)) {
            _this.targets.push(pattern.lastIndex);
            _this.targetNode[pattern.lastIndex] = sourceFile;
        }
        _this.lastNode = sourceFile.getLastToken();
        return _this;
        var _a;
    }
    NoMultiSpacesWalker.prototype.inRange = function (x, range) {
        return x >= range[0] && x <= range[1];
    };
    NoMultiSpacesWalker.prototype.warn = function (value, pos, node) {
        var msg = "Multiple spaces found before '" + value + "'.";
        var exceptionName = this.EXCEPTION_MAP[node.parent.kind];
        var report = true;
        var start = node.getFullStart() - 1;
        var previousChar = this.src.substring(start, start + 1);
        if (exceptionName && this.exceptions[exceptionName]) {
            if (previousChar !== ',') {
                report = false;
            }
        }
        if (previousChar === ':') {
            var crt = node.parent;
            while (crt.kind !== ts.SyntaxKind.SourceFile) {
                crt = crt.parent;
                if (crt.kind === ts.SyntaxKind.PropertyAssignment) {
                    if (this.exceptions['PropertyAssignment']) {
                        report = false;
                    }
                    break;
                }
            }
        }
        if (report) {
            this.addFailure(this.createFailure(pos, value.length, msg));
        }
    };
    NoMultiSpacesWalker.prototype.walkChildren = function (node) {
        var _this = this;
        var range = [node.getStart(), node.getEnd()];
        for (var i = this.targetIndex, len = this.targets.length, target = void 0; i < len; i++) {
            target = this.targets[i];
            if (this.inRange(target, range)) {
                this.targetNode[target] = node;
            }
            if (range[0] > this.targets[this.targetIndex]) {
                this.targetIndex++;
            }
        }
        if (node === this.lastNode) {
            this.targets.forEach(function (target) {
                var valid = _this.targetNode[target];
                if (target === valid.getStart()) {
                    _this.warn(valid.getText(), target, valid);
                }
                else if (target === valid.getEnd() - 1 && _this.STRING_TYPES.indexOf(valid.kind) === -1) {
                    var endChar = _this.src.substring(target, valid.getEnd());
                    _this.warn(endChar, target, valid);
                }
                else {
                    if (_this.src.charAt(target) !== '\n' && valid.kind !== ts.SyntaxKind.SourceFile) {
                    }
                }
            });
        }
        var children = node.getChildren();
        for (var index in children) {
            this.visitNode(children[index]);
        }
    };
    return NoMultiSpacesWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vTXVsdGlTcGFjZXNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0I7SUFBMEIsd0JBQXVCO0lBQWpEOztJQU1BLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQU5BLEFBTUMsQ0FOeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBTWhEO0FBTlksb0JBQUk7QUF1QmpCO0lBQWtDLHVDQUFlO0lBa0IvQyw2QkFBWSxVQUF5QixFQUFFLE9BQXNCO1FBQTdELFlBQ0Usa0JBQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQWlCM0I7UUFsQ08sbUJBQWE7WUFDbkIsR0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQixJQUFHLHFCQUFxQjtZQUMxRCxHQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLElBQUcsb0JBQW9CO1lBQ3hELEdBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsSUFBRyxrQkFBa0I7Z0JBQ3BEO1FBQ00sa0JBQVksR0FBRztZQUNyQixFQUFFLENBQUMsVUFBVSxDQUFDLDZCQUE2QjtZQUMzQyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWE7U0FDNUIsQ0FBQztRQUNNLGdCQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGFBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixnQkFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixpQkFBVyxHQUFHLENBQUMsQ0FBQztRQUl0QixJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDOUIsS0FBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4RCxLQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQy9DLENBQUM7UUFFRCxJQUFNLE9BQU8sR0FBVyxnQ0FBZ0MsQ0FBQztRQUN6RCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDOUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUNsRCxDQUFDO1FBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7OztJQUM1QyxDQUFDO0lBRU8scUNBQU8sR0FBZixVQUFnQixDQUFDLEVBQUUsS0FBSztRQUN0QixNQUFNLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxrQ0FBSSxHQUFaLFVBQWEsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzNCLElBQU0sR0FBRyxHQUFHLG1DQUFpQyxLQUFLLE9BQUksQ0FBQztRQUN2RCxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBTSxZQUFZLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVsRSxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUM7UUFJRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM3QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDakIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDakIsQ0FBQztvQkFDRCxLQUFLLENBQUM7Z0JBQ1IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7SUFDSCxDQUFDO0lBRVMsMENBQVksR0FBdEIsVUFBdUIsSUFBYTtRQUFwQyxpQkFzQ0M7UUFyQ0MsSUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxTQUFBLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQy9FLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFHaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDakMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUUzQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQzFCLElBQU0sS0FBSyxHQUFZLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pGLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztvQkFDM0QsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFLbEYsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBTSxRQUFRLEdBQWMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FwSEEsQUFvSEMsQ0FwSGlDLElBQUksQ0FBQyxVQUFVLEdBb0hoRCIsImZpbGUiOiJydWxlcy9ub011bHRpU3BhY2VzUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
