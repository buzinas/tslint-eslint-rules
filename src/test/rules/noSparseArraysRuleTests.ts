/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'no-sparse-arrays';
const scripts = {
  valid: [
    'const items = [];',
    'const colors = [ "red", "blue", ];',
    'const arr = new Array(23);'
  ],
  invalid: [
    'const items = [,,];',
    'const arr = [,];',
    'const colors = [ "red",, "blue" ];',
    'const foo = ["tire", 1, , "small ball"];'
  ]
};

describe(rule, function test() {
  it('should pass when using valid arrays or trailing comma', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when using double comma in arrays', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
