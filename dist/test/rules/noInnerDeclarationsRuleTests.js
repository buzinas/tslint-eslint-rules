"use strict";
var helper_1 = require("./helper");
var rule = 'no-inner-declarations';
var scripts = {
    validFunctions: [
        'function doSomething() { }',
        'function doSomething() { function somethingElse() { } }',
        '(function() { function doSomething() { } }());',
        'if (test) { var fn = function() { }; }',
        'if (test) { var fn = function expr() { }; }',
        'function decl() { var fn = function expr() { }; }',
        'function decl(arg) { var fn; if (arg) { fn = function() { }; } }',
        'var x = {doSomething() {function doSomethingElse() {}}}',
        'function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }',
        'function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }',
        'if (test) { var foo; }',
        'function doSomething() { while (test) { var foo; } }',
        'foo(() => { function bar() { } });',
        'namespace something { function decl(arg) { var foo; } }',
        'class MyClass { constructor(arg) { function decl(x) { var foo; } } }'
    ],
    validBoth: [
        'if (test) { let x = 1; }',
        'if (test) { const x = 1; }',
        'var foo;',
        'var foo = 42;',
        'function doSomething() { var foo; }',
        '(function() { var foo; }());',
        'var fn = () => {var foo;}',
        'var x = {doSomething() {var foo;}}'
    ],
    invalidFunctions: [
        'function doSomething() { do { function somethingElse() { } } while (test); }',
        '(function() { if (test) { function doSomething() { } } }());'
    ],
    invalidBoth: [
        'if (test) { function doSomething() { } }',
        'while (test) { var foo; }',
        'function doSomething() { if (test) { var foo = 42; } }',
        '(function() { if (test) { var foo; } }());'
    ]
};
describe(rule, function test() {
    it('should pass when not using inner declaration functions', function testValidFunctions() {
        helper_1.makeTest(rule, scripts.validFunctions, true, {
            rules: (_a = {},
                _a[rule] = [true, 'functions'],
                _a)
        });
        var _a;
    });
    it('should pass when not using inner declaration functions and variables', function testValidFunctionsAndVariables() {
        helper_1.makeTest(rule, scripts.validBoth, true, {
            rules: (_a = {},
                _a[rule] = [true, 'both'],
                _a)
        });
        var _a;
    });
    it('should fail when using inner declaration functions', function testInvalidFunctions() {
        helper_1.makeTest(rule, scripts.invalidFunctions, false, {
            rules: (_a = {},
                _a[rule] = [true, 'functions'],
                _a)
        });
        var _a;
    });
    it('should fail when using inner declaration functions or variables', function testInvalidFunctionsAndVariables() {
        helper_1.makeTest(rule, scripts.invalidBoth, false, {
            rules: (_a = {},
                _a[rule] = [true, 'both'],
                _a)
        });
        var _a;
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9Jbm5lckRlY2xhcmF0aW9uc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLHVCQUF1QixDQUFDO0FBQ3JDLElBQU0sT0FBTyxHQUFHO0lBQ2QsY0FBYyxFQUFFO1FBQ2QsNEJBQTRCO1FBQzVCLHlEQUF5RDtRQUN6RCxnREFBZ0Q7UUFDaEQsd0NBQXdDO1FBQ3hDLDZDQUE2QztRQUM3QyxtREFBbUQ7UUFDbkQsa0VBQWtFO1FBQ2xFLHlEQUF5RDtRQUN6RCx1RUFBdUU7UUFDdkUsdUVBQXVFO1FBQ3ZFLHdCQUF3QjtRQUN4QixzREFBc0Q7UUFDdEQsb0NBQW9DO1FBQ3BDLHlEQUF5RDtRQUN6RCxzRUFBc0U7S0FDdkU7SUFDRCxTQUFTLEVBQUU7UUFDVCwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLFVBQVU7UUFDVixlQUFlO1FBQ2YscUNBQXFDO1FBQ3JDLDhCQUE4QjtRQUM5QiwyQkFBMkI7UUFDM0Isb0NBQW9DO0tBQ3JDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsOEVBQThFO1FBQzlFLDhEQUE4RDtLQUMvRDtJQUNELFdBQVcsRUFBRTtRQUNYLDBDQUEwQztRQUMxQywyQkFBMkI7UUFDM0Isd0RBQXdEO1FBQ3hELDRDQUE0QztLQUM3QztDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsSUFBSSxFQUFFO0lBQ2IsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO1FBQzNELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFO1lBQzNDLEtBQUs7Z0JBQ0gsR0FBQyxJQUFJLElBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDO21CQUM1QjtTQUNGLENBQUMsQ0FBQzs7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRTtRQUN6RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRTtZQUN0QyxLQUFLO2dCQUNILEdBQUMsSUFBSSxJQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzttQkFDdkI7U0FDRixDQUFDLENBQUM7O0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7UUFDdkQsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRTtZQUM5QyxLQUFLO2dCQUNILEdBQUMsSUFBSSxJQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQzttQkFDNUI7U0FDRixDQUFDLENBQUM7O0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUVBQWlFLEVBQUU7UUFDcEUsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDekMsS0FBSztnQkFDSCxHQUFDLElBQUksSUFBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7bUJBQ3ZCO1NBQ0YsQ0FBQyxDQUFDOztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9ub0lubmVyRGVjbGFyYXRpb25zUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
