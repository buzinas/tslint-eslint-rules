/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'no-extra-boolean-cast';
const scripts = {
  valid: [
    'if (!foo) {}',
    'const x = !foo;',
    'const foo = true;',
    'const foo = !!bar;',
    'function foo() { return !!bar }',
    'const foo = bar ? !!x : !!y;`'
  ],
  invalid: [
    'if (!!foo) {}',
    'const foo = !!!bar;',
    'const foo = !!bar ? baz : bat;',
    'const foo = Boolean(!!bar);',
    'const foo = new Boolean(!!bar);',
    'while (!!foo) {}',
    'do {} while (!!foo);',
    'for (; !!foo; ) {}`',
    'if (!!lastUpdated && !!savedJwt) {}'
  ]
};

describe(rule, function test() {
  it('should pass when using valid boolean casts outside of a boolean context', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when using redundant boolean casts in a boolean context', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
