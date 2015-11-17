/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'no-regex-spaces';
const scripts = {
  valid: [
    'var foo = /bar {3}baz/;',
    'var foo = /bar\t\t\tbaz/;'
  ],
  invalid: [
    'var foo = /bar    baz/;'
  ]
};

describe(rule, function test() {
  it('should pass when not using multiple spaces in regular expressions', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when using multiple spaces in regular expressions', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
