/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest, makeFixTest } from './helper';

const rule = 'object-curly-spacing';
const scripts = {
  always: {
    valid: [
      `const obj = { foo: 'bar' };`,
      `const obj = { foo: { zoo: 'bar' } };`,
      `const { x, y } = y;`,
      `import { foo } from 'bar';`,
      `export { foo };`
    ],
    invalid: [
      `const obj = {foo: 'bar'};`,
      `const obj = {foo: { zoo: 'bar' } };`,
      `const {x, y} = y;`,
      `import {foo } from 'bar';`,
      `export { foo};`
    ]
  },
  never: {
    valid: [
      `const obj = {foo: 'bar'};`,
      `const obj = {foo: {zoo: 'bar'}};`,
      `const {x, y} = y;`,
      `import {foo} from 'bar';`,
      `export {foo};`
    ],
    invalid: [
      `const obj = { foo: 'bar' };`,
      `const obj = { foo: { zoo: 'bar' } };`,
      `const { x, y } = y;`,
      `import {foo } from 'bar';`,
      `export { foo};`
    ]
  }
};

describe(rule, function test() {

  const alwaysConfig = { rules: { 'object-curly-spacing': [true, 'always'] } };
  const neverConfig = { rules: { 'object-curly-spacing': [true, 'never'] } };

  it('should pass when "always" and there are spaces inside brackets', function testVariables() {
    makeTest(rule, scripts.always.valid, true, alwaysConfig);
  });

  it('should fail when "always" and there are not spaces inside brackets', function testVariables() {
    makeTest(rule, scripts.always.invalid, false, alwaysConfig);
  });

  it('should add necessary spaces when "always" with fix option', function testVariables() {
    makeFixTest(rule, scripts.always.invalid, scripts.always.valid, alwaysConfig);
  });

  it('should pass when "never" and there are not spaces inside brackets', function testVariables() {
    makeTest(rule, scripts.never.valid, true, neverConfig);
  });

  it('should fail when "never" and there are spaces inside brackets', function testVariables() {
    makeTest(rule, scripts.never.invalid, false, neverConfig);
  });

  it('should remove unnecessary spaces when "never" with fix option', function testVariables() {
    makeFixTest(rule, scripts.never.invalid, scripts.never.valid, neverConfig);
  });
});
