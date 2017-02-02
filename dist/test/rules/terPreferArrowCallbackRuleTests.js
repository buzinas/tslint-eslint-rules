"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-prefer-arrow-callback');
var errors = [{
        failure: 'Unexpected function expression.',
        startPosition: new ruleTester_1.Position(),
        endPosition: new ruleTester_1.Position()
    }];
ruleTester.addTestGroup('valid', 'should not complain about function expressions', [
    'foo(a => a);',
    'foo(function*() {});',
    'foo(function() { this; });',
    'foo(function() { (() => this); });',
    'foo(function() { this; }.bind(obj));',
    'foo(function() { this; }.call(this));',
    'foo(a => { (function() {}); });',
    'var foo = function foo() {};',
    '(function foo() {})();',
    'foo(function bar() { bar; });',
    'foo(function bar() { arguments; });',
    'foo(function bar() { arguments; }.bind(this));',
    'foo(function bar() { super.a; });',
    'foo(function bar() { super.a; }.bind(this));',
    'foo(function bar() { new.target; });',
    'foo(function bar() { new.target; }.bind(this));',
    'foo(function bar() { this; }.bind(this, somethingElse));'
]);
ruleTester.addTestGroup('allow-named-functions', 'should allow named functions', [
    { code: 'foo(function bar() {});', options: [{ allowNamedFunctions: true }] },
    {
        code: 'foo(function() {});',
        options: [{ allowNamedFunctions: true }],
        errors: errors
    }
]);
ruleTester.addTestGroup('invalid', 'should alert of function expression usage', [
    {
        code: 'foo(function (x) { console.log("arguments", x) })',
        errors: errors
    },
    {
        code: 'foo(function bar(x) { console.log("tricked you, not recursive: bar(x - 1)") })',
        errors: errors
    },
    {
        code: 'foo(function bar() {});',
        errors: errors
    },
    {
        code: 'foo(function bar() {});',
        options: [{ allowNamedFunctions: false }],
        errors: errors,
        output: 'foo(() => {});'
    },
    {
        code: 'foo(function() {});',
        errors: errors,
        output: 'foo(() => {});'
    },
    {
        code: 'foo(nativeCb || function() {});',
        errors: errors,
        output: 'foo(nativeCb || () => {});'
    },
    {
        code: 'foo(bar ? function() {} : function() {});',
        errors: [errors[0], errors[0]],
        output: 'foo(bar ? () => {} : () => {});'
    },
    {
        code: 'foo(function() { (function() { this; }); });',
        errors: errors,
        output: 'foo(() => { (function() { this; }); });'
    },
    {
        code: 'foo(function() { this; }.bind(this));',
        errors: errors,
        output: 'foo(() => { this; });'
    },
    {
        code: 'foo(function() { (() => this); }.bind(this));',
        errors: errors,
        output: 'foo(() => { (() => this); });'
    },
    {
        code: 'foo(function bar(a) { a; });',
        errors: errors,
        output: 'foo((a) => { a; });'
    },
    {
        code: 'foo(function(a) { a; });',
        errors: errors,
        output: 'foo((a) => { a; });'
    },
    {
        code: 'foo(function(arguments) { arguments; });',
        errors: errors,
        output: 'foo((arguments) => { arguments; });'
    },
    {
        code: 'foo(function() { this; });',
        options: [{ allowUnboundThis: false }],
        errors: errors,
        output: 'foo(function() { this; });'
    },
    {
        code: 'foo(function() { (() => this); });',
        options: [{ allowUnboundThis: false }],
        errors: errors,
        output: 'foo(function() { (() => this); });'
    },
    {
        code: 'qux(function(foo, bar, baz) { return foo * 2; })',
        errors: errors,
        output: 'qux((foo, bar, baz) => { return foo * 2; })'
    },
    {
        code: 'qux(function(foo, bar, baz) { return foo * bar; }.bind(this))',
        errors: errors,
        output: 'qux((foo, bar, baz) => { return foo * bar; })'
    },
    {
        code: 'qux(function(foo, bar, baz) { return foo * this.qux; }.bind(this))',
        errors: errors,
        output: 'qux((foo, bar, baz) => { return foo * this.qux; })'
    },
    {
        code: 'qux(function(foo = 1, [bar = 2] = [], {qux: baz = 3} = {foo: "bar"}) { return foo + bar; });',
        errors: errors,
        output: 'qux((foo = 1, [bar = 2] = [], {qux: baz = 3} = {foo: "bar"}) => { return foo + bar; });'
    },
    {
        code: 'qux(function(baz, baz) { })',
        errors: errors,
        output: 'qux(function(baz, baz) { })'
    },
    {
        code: 'qux(function( /* no params */ ) { })',
        errors: errors,
        output: 'qux(( /* no params */ ) => { })'
    },
    {
        code: 'qux(function( /* a */ foo /* b */ , /* c */ bar /* d */ , /* e */ baz /* f */ ) { return foo; })',
        errors: errors,
        output: 'qux(( /* a */ foo /* b */ , /* c */ bar /* d */ , /* e */ baz /* f */ ) => { return foo; })'
    },
    {
        code: 'qux(async function (foo = 1, bar = 2, baz = 3) { return baz; })',
        output: 'qux(async (foo = 1, bar = 2, baz = 3) => { return baz; })',
        errors: errors
    },
    {
        code: 'qux(async function (foo = 1, bar = 2, baz = 3) { return this; }.bind(this))',
        output: 'qux(async (foo = 1, bar = 2, baz = 3) => { return this; })',
        errors: errors
    }
]);
ruleTester.addTestGroup('docs-bad', 'should consider these as problems', [
    { code: 'foo(function(a) { return a; });', errors: errors },
    { code: 'foo(function() { return this.a; }.bind(this));', errors: errors }
]);
ruleTester.addTestGroup('docs-good', 'should not be considered as problems', [
    'foo(a => a);',
    'foo(function*() { yield; });',
    'var foo = function foo(a) { return a; };',
    'foo(function() { return this.a; });',
    'foo(function bar(n) { return n && n + bar(n - 1); });'
]);
ruleTester.addTestGroup('docs-allow-unbound-this', 'should allow the use of "this"', [
    { code: 'foo(function() { this.a; });', errors: errors, options: [{ allowUnboundThis: false }] },
    { code: 'foo(function() { (() => this); });', errors: errors, options: [{ allowUnboundThis: false }] },
    {
        code: 'someArray.map(function (itm) { return this.doSomething(itm); }, someObject);',
        errors: errors,
        options: [{ allowUnboundThis: false }]
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyUHJlZmVyQXJyb3dDYWxsYmFja1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQW9EO0FBR3BELElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQy9ELElBQU0sTUFBTSxHQUFHLENBQUM7UUFDZCxPQUFPLEVBQUUsaUNBQWlDO1FBQzFDLGFBQWEsRUFBRSxJQUFJLHFCQUFRLEVBQUU7UUFDN0IsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtLQUM1QixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxnREFBZ0QsRUFBRTtJQUNqRixjQUFjO0lBQ2Qsc0JBQXNCO0lBQ3RCLDRCQUE0QjtJQUM1QixvQ0FBb0M7SUFDcEMsc0NBQXNDO0lBQ3RDLHVDQUF1QztJQUN2QyxpQ0FBaUM7SUFDakMsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4QiwrQkFBK0I7SUFDL0IscUNBQXFDO0lBQ3JDLGdEQUFnRDtJQUNoRCxtQ0FBbUM7SUFDbkMsOENBQThDO0lBQzlDLHNDQUFzQztJQUN0QyxpREFBaUQ7SUFDakQsMERBQTBEO0NBQzNELENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsOEJBQThCLEVBQUU7SUFDL0UsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO0lBQzdFO1FBQ0UsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixPQUFPLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3hDLE1BQU0sUUFBQTtLQUNQO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsMkNBQTJDLEVBQUU7SUFDOUU7UUFDRSxJQUFJLEVBQUUsbURBQW1EO1FB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UUFDcEUsTUFBTSxRQUFBO0tBQ1A7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxtQ0FBbUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLFFBQUEsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSxnREFBZ0QsRUFBRSxNQUFNLFFBQUEsRUFBRTtDQUNuRSxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxzQ0FBc0MsRUFBRTtJQUMzRSxjQUFjO0lBQ2QsOEJBQThCO0lBQzlCLDBDQUEwQztJQUMxQyxxQ0FBcUM7SUFDckMsdURBQXVEO0NBQ3hELENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMseUJBQXlCLEVBQUUsZ0NBQWdDLEVBQUU7SUFDbkYsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0lBQ3hGLEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtJQUM5RjtRQUNFLElBQUksRUFBRSw4RUFBOEU7UUFDcEYsTUFBTSxRQUFBO1FBQ04sT0FBTyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUN2QztDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL3RlclByZWZlckFycm93Q2FsbGJhY2tSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
