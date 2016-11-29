import { RuleTester, Position } from './ruleTester';
// https://github.com/eslint/eslint/blob/master/tests/lib/rules/prefer-arrow-callback.js

const ruleTester = new RuleTester('ter-prefer-arrow-callback');
const errors = [{
  failure: 'Unexpected function expression.',
  startPosition: new Position(),
  endPosition: new Position()
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
    errors
  }
]);

ruleTester.addTestGroup('invalid', 'should alert of function expression usage', [
  {
    code: 'foo(function (x) { console.log("arguments", x) })',
    errors
  },
  {
    code: 'foo(function bar() {});',
    errors
  },
  {
    code: 'foo(function bar() {});',
    options: [{ allowNamedFunctions: false }],
    errors,
    output: 'foo(() => {});'
  },
  {
    code: 'foo(function() {});',
    errors,
    output: 'foo(() => {});'
  },
  {
    code: 'foo(nativeCb || function() {});',
    errors,
    output: 'foo(nativeCb || () => {});'
  },
  {
    code: 'foo(bar ? function() {} : function() {});',
    errors: [errors[0], errors[0]],
    output: 'foo(bar ? () => {} : () => {});'
  },
  {
    code: 'foo(function() { (function() { this; }); });',
    errors,
    output: 'foo(() => { (function() { this; }); });'
  },
  {
    code: 'foo(function() { this; }.bind(this));',
    errors,
    output: 'foo(() => { this; });'
  },
  {
    code: 'foo(function() { (() => this); }.bind(this));',
    errors,
    output: 'foo(() => { (() => this); });'
  },
  {
    code: 'foo(function bar(a) { a; });',
    errors,
    output: 'foo((a) => { a; });'
  },
  {
    code: 'foo(function(a) { a; });',
    errors,
    output: 'foo((a) => { a; });'
  },
  {
    code: 'foo(function(arguments) { arguments; });',
    errors,
    output: 'foo((arguments) => { arguments; });'
  },
  {
    code: 'foo(function() { this; });',
    options: [{ allowUnboundThis: false }],
    errors,
    output: 'foo(function() { this; });' // No fix applied
  },
  {
    code: 'foo(function() { (() => this); });',
    options: [{ allowUnboundThis: false }],
    errors,
    output: 'foo(function() { (() => this); });' // No fix applied
  },
  {
    code: 'qux(function(foo, bar, baz) { return foo * 2; })',
    errors,
    output: 'qux((foo, bar, baz) => { return foo * 2; })'
  },
  {
    code: 'qux(function(foo, bar, baz) { return foo * bar; }.bind(this))',
    errors,
    output: 'qux((foo, bar, baz) => { return foo * bar; })'
  },
  {
    code: 'qux(function(foo, bar, baz) { return foo * this.qux; }.bind(this))',
    errors,
    output: 'qux((foo, bar, baz) => { return foo * this.qux; })'
  },
  {
    code: 'qux(function(foo = 1, [bar = 2] = [], {qux: baz = 3} = {foo: "bar"}) { return foo + bar; });',
    errors,
    output: 'qux((foo = 1, [bar = 2] = [], {qux: baz = 3} = {foo: "bar"}) => { return foo + bar; });'
  },
  {
    code: 'qux(function(baz, baz) { })',
    errors,
    output: 'qux(function(baz, baz) { })' // Duplicate parameter names are a SyntaxError in arrow functions
  },
  {
    code: 'qux(function( /* no params */ ) { })',
    errors,
    output: 'qux(( /* no params */ ) => { })'
  },
  {
    code: 'qux(function( /* a */ foo /* b */ , /* c */ bar /* d */ , /* e */ baz /* f */ ) { return foo; })',
    errors,
    output: 'qux(( /* a */ foo /* b */ , /* c */ bar /* d */ , /* e */ baz /* f */ ) => { return foo; })'
  },
  {
    code: 'qux(async function (foo = 1, bar = 2, baz = 3) { return baz; })',
    output: 'qux(async (foo = 1, bar = 2, baz = 3) => { return baz; })',
    errors
  },
  {
    code: 'qux(async function (foo = 1, bar = 2, baz = 3) { return this; }.bind(this))',
    output: 'qux(async (foo = 1, bar = 2, baz = 3) => { return this; })',
    errors
  }
]);

ruleTester.addTestGroup('docs-bad', 'should consider these as problems', [
  { code: 'foo(function(a) { return a; });', errors },
  { code: 'foo(function() { return this.a; }.bind(this));', errors }
]);

ruleTester.addTestGroup('docs-good', 'should not be considered as problems', [
  'foo(a => a);',
  'foo(function*() { yield; });',
  'var foo = function foo(a) { return a; };',
  'foo(function() { return this.a; });',
  'foo(function bar(n) { return n && n + bar(n - 1); });'
]);

ruleTester.addTestGroup('docs-allow-unbound-this', 'should allow the use of "this"', [
  { code: 'foo(function() { this.a; });', errors, options: [{ allowUnboundThis: false }] },
  { code: 'foo(function() { (() => this); });', errors, options: [{ allowUnboundThis: false }] },
  {
    code: 'someArray.map(function (itm) { return this.doSomething(itm); }, someObject);',
    errors,
    options: [{ allowUnboundThis: false }]
  }
]);

ruleTester.runTests();
