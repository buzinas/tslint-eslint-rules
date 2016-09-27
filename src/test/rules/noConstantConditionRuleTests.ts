/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'no-constant-condition';
const scripts = {
  variables: [
    'if (foo === true) {}',
    'if (!foo === true) {}',
    'if (bar === false) {}',
    'if (!bar === false) {}',
    'if (baz) {}',
    'if (!baz) {}',
    'if (qux == true) {}',
    'if (!(qux == true)) {}',
    'if (true == x) {}',
    'if (!(true == x)) {}',
    'if (false === y) {}',
    'if (!(false === y)) {}',
    'if (y === x) {}',
    'if (!(y === x)) {}',
    'if (x > 0) {}',
    'if (!(x > 0)) {}',
    'if (100 > x) {}',
    'if (!(100 > x)) {}',
    'if (x === -y) {}',
    'if (!(x === -y)) {}',
    'if (len--)'
  ],
  booleans: [
    'if (true) {}',
    'if (!true) {}',
    'if (false) {}',
    'if (!false) {}'
  ],
  numbers: [
    'if (0) {}',
    'if (!0) {}',
    'if (1) {}',
    'if (!1) {}',
    'if (100) {}',
    'if (!100) {}',
    'if (30.33) {}',
    'if (!30.33) {}',
    'if (-1) {}',
    'if (!-1) {}',
    'if (x = 1) {}',
    'if (!(x = 1)) {}'
  ],
  objects: [
    'if ({}) {}',
    'if (!{}) {}',
    'if ({ foo: "bar" }) {}',
    'if (!{ foo: "bar" }) {}'
  ],
  arrays: [
    'if ([]) {}',
    'if (![]) {}',
    'if ([1, 2, 3]) {}',
    'if (![1, 2, 3]) {}'
  ],
  binary: [
    'if (true === true) {}',
    'if (!(true === true)) {}',
    'if (100 > -5) {}',
    'if (!(100 > -5)) {}',
    'if (false != true) {}',
    'if (!(false != true)) {}',
    'if (false !== true && true === true) {}',
    'if (!(false !== true && true === true)) {}',
    'if (!(false !== true) && true === true) {}',
    'if (false !== true && !(true === true)) {}',
    'if (!(false !== true) && !(true === true)) {}'
  ],
  ternary: [
    'let foo = true ? 1 : 0;',
    'let foo = !true ? 1 : 0;',
    'let bar = false ? "a" : "b";',
    'let bar = !false ? "a" : "b";',
    'let baz = 100 ? "x" : "z";',
    'let baz = !100 ? "x" : "z";',
    'let qux = true === true ? "p": "w";',
    'let qux = !(true === true) ? "p": "w";'
  ],
  whileVars: [
    'while (y === x) {}',
    'while (!(y === x)) {}',
    'while (x > -5) {}',
    'while (!(x > -5)) {}',
    'while (100 > x) {}',
    'while (!(100 > x)) {}',
    'while (foo) {}',
    'while (!foo) {}'
  ],
  whileLiterals: [
    'while (true) {}',
    'while (!true) {}',
    'while (false) {}',
    'while (!false) {}',
    'while (-5) {}',
    'while (!-5) {}',
    'while (1) {}',
    'while (!1) {}',
    'while ({}) {}',
    'while (!{}) {}',
    'while ([]) {}',
    'while (![]) {}'
  ],
  doWhileVars: [
    'do {} while (y === x);',
    'do {} while (!(y === x);',
    'do {} while (x > -5);',
    'do {} while (!(x > -5));',
    'do {} while (100 > x);',
    'do {} while (!(100 > x));',
    'do {} while (foo);',
    'do {} while (!foo);'
  ],
  doWhileLiterals: [
    'do {} while (true);',
    'do {} while (!true);',
    'do {} while (false);',
    'do {} while (!false);',
    'do {} while (-5);',
    'do {} while (!-5);',
    'do {} while (1);',
    'do {} while (!1);',
    'do {} while ({});',
    'do {} while (!{});',
    'do {} while ([]);',
    'do {} while (![]);'
  ],
  forVars: [
    'for (;y === x;) {}',
    'for (;(!y === x);) {}',
    'for (;x > -5;) {}',
    'for (;!(x > -5);) {}',
    'for (;100 > x;) {}',
    'for (;!(100 > x);) {}',
    'for (;foo;) {}',
    'for (;!foo;) {}'
  ],
  forLiterals: [
    'for (;true;) {}',
    'for (;!true;) {}',
    'for (;false;) {}',
    'for (;!false;) {}',
    'for (;-5;) {}',
    'for (;!-5;) {}',
    'for (;1;) {}',
    'for (;!1;) {}',
    'for (;{};) {}',
    'for (;!{};) {}',
    'for (;[];) {}',
    'for (;![];) {}'
  ]
};

describe(rule, function test() {
  // if-tests
  it('should pass when using variables', function testVariables() {
    makeTest(rule, scripts.variables, true);
  });

  it('should fail with literal booleans', function testBooleans() {
    makeTest(rule, scripts.booleans, false);
  });

  it('should fail with literal numbers', function testNumbers() {
    makeTest(rule, scripts.numbers, false);
  });

  it('should fail with literal objects', function testObjects() {
    makeTest(rule, scripts.objects, false);
  });

  it('should fail with literal arrays', function testArrays() {
    makeTest(rule, scripts.arrays, false);
  });

  it('should fail with literal on both sides of a binary expression', function testBinary() {
    makeTest(rule, scripts.binary, false);
  });

  // ternary tests
  it('should fail on ternary literals (booleans / numbers)', function testTernary() {
    makeTest(rule, scripts.ternary, false);
  });

  // while-tests
  it('should pass on while variables', function testWhileVariables() {
    makeTest(rule, scripts.whileVars, true);
  });

  it('should fail on while literals', function testWhileLiterals() {
    makeTest(rule, scripts.whileLiterals, false);
  });

  // do-while-tests
  it('should pass on do-while variables', function testDoWhileVariables() {
    makeTest(rule, scripts.doWhileVars, true);
  });

  it('should fail on do-while literals', function testDoWhileLiterals() {
    makeTest(rule, scripts.doWhileLiterals, false);
  });

  // for-tests
  it('should pass on for variables', function testForVariables() {
    makeTest(rule, scripts.forVars, true);
  });

  it('should fail on for literals', function testForLiterals() {
    makeTest(rule, scripts.forLiterals, false);
  });

  it('should pass for literals in loops when checkLoops is false', function testCheckLoopsFalse() {
    const config = {
      rules: { 'no-constant-condition': [true, { checkLoops: false }] }
    };

    makeTest(rule, scripts.forLiterals, true, config);
  });
});
