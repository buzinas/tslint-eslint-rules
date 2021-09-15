/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'no-empty-character-class';
const scripts = {
  valid: [
    'var foo = /^abc[a-zA-Z]/;',
    'var regExp = new RegExp(\'^abc[]\');',
    'var foo = /^abc/;',
    'var foo = /[\\[]/;',
    'var foo = /[\\]]/;',
    'var foo = /[a-zA-Z\\[]/;',
    'var foo = /[[]/;',
    'var foo = /[\\[a-z[]]/;',
    'var foo = /[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\^\\$\\|]/g;',
    'var foo = /\\s*:\\s*/gim;',
    'var foo = /\\s*:\\s*/s;',
    'var foo = /\s+/u;'
  ],
  invalid: [
    'var foo = /^abc[]/;',
    'var foo = /foo[]bar/;',
    'if (foo.match(/^abc[]/)) {}',
    'if (/^abc[]/.test(foo)) {}',
    'var foo = /[]]/;',
    'var foo = /\\[[]/;',
    'var foo = /\\[\\[\\]a-z[]/;'
  ]
};

describe(rule, function test() {
  it('should pass when not using empty character classes in regular expressions', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when using empty character classes in regular expressions', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
