/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'no-inner-declarations';
const scripts = {
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
    makeTest(rule, scripts.validFunctions, true, {
      rules: {
        [rule]: [true, 'functions']
      }
    });
  });

  it('should pass when not using inner declaration functions and variables', function testValidFunctionsAndVariables() {
    makeTest(rule, scripts.validBoth, true, {
      rules: {
        [rule]: [true, 'both']
      }
    });
  });

  it('should fail when using inner declaration functions', function testInvalidFunctions() {
    makeTest(rule, scripts.invalidFunctions, false, {
      rules: {
        [rule]: [true, 'functions']
      }
    });
  });

  it('should fail when using inner declaration functions or variables', function testInvalidFunctionsAndVariables() {
    makeTest(rule, scripts.invalidBoth, false, {
      rules: {
        [rule]: [true, 'both']
      }
    });
  });
});
