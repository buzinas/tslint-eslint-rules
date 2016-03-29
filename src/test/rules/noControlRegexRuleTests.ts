/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'no-control-regex';
const scripts = {
  'valid': [
    'var regex = /x1f/',
    'var regex = new RegExp("x1f")',
    'var regex = RegExp("x1f")',
    'new RegExp("[")',
    'RegExp("[")',
    'new (function foo(){})("\\x1f")',
    'var regex = /\\\\x20/;',
    'var regex = new RegExp("\\x20");'
  ],
  'invalid': [
    'var regex = /\\\u001f/',
    'var regex = new RegExp("\\x1f")',
    'var regex = RegExp("\\x1f")',
    'var regex = /\\\\x1f/;'
  ]
};

describe(rule, function test() {
  it('should pass when there are no control characters in regular expressions', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when there are control characters in regular expressions', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
