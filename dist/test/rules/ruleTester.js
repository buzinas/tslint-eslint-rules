"use strict";
var chai_1 = require("chai");
var Lint = require("tslint");
var fs = require("fs");
var path = require("path");
var dedent = Lint.Utils.dedent;
exports.dedent = dedent;
var empty = '░';
var Position = (function () {
    function Position(line, character, position) {
        this.line = line;
        this.character = character;
        this.position = position;
    }
    Position.prototype.toString = function () {
        var line = this.line === undefined ? empty : this.line;
        var char = this.character === undefined ? empty : this.character;
        var pos = this.position === undefined ? empty : this.position;
        return "[" + line + ":" + char + "|" + pos + "]";
    };
    Position.prototype.getComparablePosition = function (obj) {
        var line = this.line === undefined ? undefined : obj.line;
        var char = this.character === undefined ? undefined : obj.character;
        var pos = this.position === undefined ? undefined : obj.position;
        return new Position(line, char, pos);
    };
    return Position;
}());
exports.Position = Position;
var LintFailure = (function () {
    function LintFailure(name, ruleName, failure, start, end) {
        this.name = name;
        this.ruleName = ruleName;
        this.failure = failure;
        this.startPosition = start || new Position();
        this.endPosition = end || new Position();
    }
    LintFailure.prototype.toString = function () {
        var pos = this.name + "@{" + this.startPosition + " -> " + this.endPosition + "}";
        return "[" + pos + "] " + this.ruleName + ": " + this.failure;
    };
    LintFailure.prototype.getComparableFailure = function (obj) {
        return new LintFailure(obj.name, obj.ruleName, obj.failure, this.startPosition.getComparablePosition(obj.startPosition), this.endPosition.getComparablePosition(obj.endPosition));
    };
    return LintFailure;
}());
var Test = (function () {
    function Test(name, code, output, options, errors) {
        this.name = name;
        this.code = code;
        this.output = output;
        this.options = options;
        this.errors = errors;
    }
    Test.prototype.runTest = function () {
        var options = {
            fix: false,
            formatter: 'json',
            formattersDirectory: 'dist/formatters/',
            rulesDirectory: 'dist/rules/'
        };
        var linter = new Lint.Linter(options);
        linter.lint(this.name, this.code, this.options);
        var failures = JSON.parse(linter.getResult().output);
        this.compareErrors(this.errors || [], failures.map(function (error) {
            var start = error.startPosition;
            var end = error.endPosition;
            return new LintFailure(error.name, error.ruleName, error.failure, new Position(start.line, start.character, start.position), new Position(end.line, end.character, end.position));
        }));
    };
    Test.prototype.compareErrors = function (expectedErrors, foundErrors) {
        var _this = this;
        var expected = this.arrayDiff(expectedErrors, foundErrors);
        var found = this.arrayDiff(foundErrors, expectedErrors, false);
        var codeLines = this.code.split('\n');
        var total = codeLines.length.toString().length;
        var codeStr = codeLines.map(function (x, i) { return "     " + _this.pad(i, total) + "| " + x; }).join('\n');
        var expectedStr = expected.length ? "Expected:\n       " + expected.join('\n       ') : '';
        var foundStr = found.length ? "Found:\n       " + found.join('\n       ') : '';
        var msg = [
            "Error mismatch in " + this.name + ":",
            '',
            codeStr,
            '',
            "     " + expectedStr,
            '',
            "     " + foundStr,
            ''
        ].join('\n');
        chai_1.assert(expected.length === 0 && found.length === 0, msg);
    };
    Test.prototype.arrayDiff = function (source, target, compareToTarget) {
        var _this = this;
        if (compareToTarget === void 0) { compareToTarget = true; }
        return source
            .filter(function (item) { return _this.findIndex(target, item, compareToTarget) === -1; })
            .map(function (x) {
            if (compareToTarget) {
                return x.toString();
            }
            else {
                return target.length ? target[0].getComparableFailure(x).toString() : x.toString();
            }
        });
    };
    Test.prototype.findIndex = function (source, error, compareToError) {
        if (compareToError === void 0) { compareToError = true; }
        var len = source.length;
        var k = 0;
        while (k < len) {
            if (compareToError && "" + error === "" + error.getComparableFailure(source[k])) {
                return k;
            }
            else if ("" + source[k] === "" + source[k].getComparableFailure(error)) {
                return k;
            }
            k++;
        }
        return -1;
    };
    Test.prototype.pad = function (n, width) {
        var numStr = n.toString();
        var padding = new Array(width - numStr.length + 1).join(' ');
        return numStr.length >= width ? numStr : padding + numStr;
    };
    return Test;
}());
var TestGroup = (function () {
    function TestGroup(name, description, ruleName, tests) {
        this.name = name;
        this.ruleName = ruleName;
        this.description = description;
        this.tests = tests.map(function (test, index) {
            var config = { rules: (_a = {}, _a[ruleName] = true, _a) };
            var codeFileName = name + "-" + index + ".ts";
            if (typeof test === 'string') {
                return new Test(codeFileName, test, undefined, config, []);
            }
            if (test.options) {
                config.rules[ruleName] = [true].concat(test.options);
            }
            var failures = (test.errors || []).map(function (error) {
                return new LintFailure(codeFileName, ruleName, error.failure, error.startPosition, error.endPosition);
            });
            return new Test(codeFileName, test.code, test.output, config, failures);
            var _a;
        });
    }
    return TestGroup;
}());
exports.TestGroup = TestGroup;
var RuleTester = (function () {
    function RuleTester(ruleName) {
        this.groups = [];
        this.ruleName = ruleName;
    }
    RuleTester.prototype.addTestGroup = function (name, description, tests) {
        this.groups.push(new TestGroup(name, description, this.ruleName, tests));
        return this;
    };
    RuleTester.prototype.runTests = function () {
        var _this = this;
        var singleTest = JSON.parse(process.env.SINGLE_TEST || 'null');
        var runGroup = singleTest === null || singleTest.group === null;
        var runIndex = singleTest === null || singleTest.num === null;
        describe(this.ruleName, function () {
            _this.groups.forEach(function (group) {
                if (runGroup || group.name === singleTest.group) {
                    it(group.description, function () {
                        group.tests.forEach(function (test, index) {
                            if (runIndex || singleTest.num === index) {
                                test.runTest();
                            }
                        });
                    });
                }
            });
        });
    };
    return RuleTester;
}());
exports.RuleTester = RuleTester;
function readFixture(name) {
    return fs.readFileSync(path.join(__dirname, "../../../src/test/fixtures/" + name), 'utf8');
}
exports.readFixture = readFixture;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDekMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNqQixDQUFDO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQVdDLGdDQUFVO0FBVFoscUJBQXFCLElBQVk7SUFDL0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0NBQThCLElBQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdGLENBQUM7QUFRQyxrQ0FBVyIsImZpbGUiOiJ0ZXN0L3J1bGVzL3J1bGVUZXN0ZXIuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
