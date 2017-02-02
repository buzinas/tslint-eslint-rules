"use strict";
var chai_1 = require("chai");
var Lint = require("tslint");
function testScript(rule, scriptText, config) {
    var options = {
        fix: false,
        formatter: 'json',
        formattersDirectory: 'dist/formatters/',
        rulesDirectory: 'dist/rules/'
    };
    var linter = new Lint.Linter(options);
    linter.lint(rule + ".ts", scriptText, config);
    var failures = JSON.parse(linter.getResult().output);
    return failures.length === 0;
}
exports.testScript = testScript;
function makeTest(rule, scripts, expected, config) {
    if (!config) {
        config = {
            rules: {}
        };
        config.rules[rule] = true;
    }
    scripts.forEach(function (code) {
        var res = testScript(rule, code, config);
        chai_1.expect(res).to.equal(expected, code);
    });
}
exports.makeTest = makeTest;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw2QkFBOEI7QUFDOUIsNkJBQStCO0FBRS9CLG9CQUEyQixJQUFZLEVBQUUsVUFBa0IsRUFBRSxNQUFjO0lBQ3pFLElBQU0sT0FBTyxHQUF3QjtRQUNuQyxHQUFHLEVBQUUsS0FBSztRQUNWLFNBQVMsRUFBRSxNQUFNO1FBQ2pCLG1CQUFtQixFQUFFLGtCQUFrQjtRQUN2QyxjQUFjLEVBQUUsYUFBYTtLQUM5QixDQUFDO0lBRUYsSUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUksSUFBSSxRQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTlDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXZELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBZEQsZ0NBY0M7QUFFRCxrQkFBeUIsSUFBWSxFQUFFLE9BQXNCLEVBQUUsUUFBaUIsRUFBRSxNQUFzQjtJQUN0RyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWixNQUFNLEdBQUc7WUFDUCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7UUFDbkIsSUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsYUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWJELDRCQWFDIiwiZmlsZSI6InRlc3QvcnVsZXMvaGVscGVyLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
