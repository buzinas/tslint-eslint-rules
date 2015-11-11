/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />

import {testScript} from './helper';
import {expect} from 'chai';

const rule = 'use-isnan';
const scripts = {
  valid: `if (isNaN(foo)) {}
          if (isNaN(NaN)) {}`,

  invalid: `if (foo == NaN) {}
            if (foo === NaN) {}
            if (foo != NaN) {}
            if (foo !== NaN) {}
            if (NaN == foo) {}
            if (NaN === foo) {}
            if (NaN != foo) {}
            if (NaN !== foo) {}
            if (NaN == NaN) {}
            if (NaN === NaN) {}
            if (NaN != NaN) {}
            if (NaN !== NaN) {}`,
};
  
describe('use-isnan', function test() {
  it('should pass when using isNaN', function testValid() {
    const res = testScript(rule, scripts.valid);
    expect(res).to.be.true;
  });
  
  it('should fail when comparing to NaN', function testInvalid() {
    const res = testScript(rule, scripts.invalid);
    expect(res).to.be.false;
  });
});
