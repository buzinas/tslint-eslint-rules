/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />

import {testScript} from './helper';
import {expect} from 'chai';

const rule = 'no-sparse-arrays';
const scripts = {
  valid: `const items = [];
          const colors = [ "red", "blue", ];
          const arr = new Array(23);`,

  invalid: `const items = [,,];
            const arr = [,];
            const colors = [ "red",, "blue" ];
            const foo = ['tire', 1, , 'small ball'];`
};
  
describe(rule, function test() {
  it('should pass when using valid arrays or trailing comma', function testValid() {
    const res = testScript(rule, scripts.valid);
    expect(res).to.equal(0);
  });
  
  it('should fail when using double comma in arrays', function testInvalid() {
    const res = testScript(rule, scripts.invalid);
    expect(res).to.equal(4);
  });
});
