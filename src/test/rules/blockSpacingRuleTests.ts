/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'block-spacing';
const scripts = {
  always: {
    valid: [
      `function foo() { return true; }`,
      `if (foo) { bar = 0; }`,
      `switch (myVar) { case 1: return true; }`,
      `function foo() {}`,
      `function foo() { }`
    ],
    invalid: [
      `function foo() {return true;}`,
      `if (foo) { bar = 0;}`,
      `switch (myVar) { case 1: return true;}`,
      `switch (myVar) {case 1: return true; }`,
      `switch (myVar) {case 1: return true;}`
    ]
  },
  never: {
    valid: [
      `function foo() {return true;}`,
      `if (foo) {bar = 0;}`,
      `switch (myVar) {case 1: return true;}`,
      `function foo() {}`,
      `function foo() { }`
    ],
    invalid: [
      `function foo() { return true; }`,
      `if (foo) { bar = 0;}`,
      `switch (myVar) { case 1: return true;}`,
      `switch (myVar) {case 1: return true; }`,
      `switch (myVar) { case 1: return true; }`
    ]
  }
};

describe(rule, function test() {
  const alwaysConfig = { rules: { 'block-spacing': [true, 'always'] } };
  const neverConfig = { rules: { 'block-spacing': [true, 'never'] } };

  it('should pass when "always" and there are spaces inside brackets', function testVariables() {
    makeTest(rule, scripts.always.valid, true, alwaysConfig);
  });

  it('should fail when "always" and there are not spaces inside brackets', function testVariables() {
    makeTest(rule, scripts.always.invalid, false, alwaysConfig);
  });

  it('should pass when "never" and there are not spaces inside brackets', function testVariables() {
    makeTest(rule, scripts.never.valid, true, neverConfig);
  });

  it('should fail when "never" and there are spaces inside brackets', function testVariables() {
    makeTest(rule, scripts.never.invalid, false, neverConfig);
  });
});
