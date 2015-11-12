/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'use-isnan';
const scripts = {
  valid: [
    'if (isNaN(foo)) {}',
    'if (isNaN(NaN)) {}'
  ],
  invalid: [
    'if (foo == NaN) {}',
    'if (foo === NaN) {}',
    'if (foo != NaN) {}',
    'if (foo !== NaN) {}',
    'if (NaN == foo) {}',
    'if (NaN === foo) {}',
    'if (NaN != foo) {}',
    'if (NaN !== foo) {}',
    'if (NaN == NaN) {}',
    'if (NaN === NaN) {}',
    'if (NaN != NaN) {}',
    'if (NaN !== NaN) {}'
  ]
};
  
describe(rule, function test() {
  it('should pass when using isNaN', function testValid() {
    makeTest(rule, scripts.valid, true);
  });
  
  it('should fail when comparing to NaN', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
