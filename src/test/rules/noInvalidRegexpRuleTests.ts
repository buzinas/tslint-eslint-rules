/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'no-invalid-regexp';
const scripts = {
  valid: [
    'RegExp(\'\')',
    'RegExp()',
    'RegExp(\'.\', \'g\')',
    'new RegExp(\'.\')',
    'new RegExp',
    'new RegExp(\'.\', \'im\')',
    'global.RegExp(\'\\\\\')'
  ],
  invalid: [
    'RegExp(\'[\');',
    'RegExp(\'.\', \'z\');',
    'new RegExp(\')\');'
  ]
};

describe(rule, function test() {
  it('should pass when using valid regular expressions', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when using invalid regular expressions', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
