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
    /* Future ES6 regular expressions - flags y and u - add when available */
    // 'new RegExp(\'.\', \'y\')',
    // 'new RegExp(\'.\', \'u\')',
    // 'new RegExp(\'.\', \'yu\')',
    // 'new RegExp(\'\/\', \'yu\')'
  ],
  invalid: [
    'RegExp(\'[\');',
    'RegExp(\'.\', \'z\');',
    'new RegExp(\')\');',
    /* Future ES6 regular expressions - flags y and u - remove when available */
    'RegExp(\'.\', \'y\');',
    'RegExp(\'.\', \'u\');',
    'RegExp(\'.\', \'yu\');'
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
