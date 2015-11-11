/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />

import {testScript} from './helper';
import {expect} from 'chai';

const rule = 'no-sparse-arrays';
const scripts = {
  valid: `var items = [];
          var colors = [ "red", "blue", ];
          var arr = new Array(23);`,

  invalid: `var items = [,,];
            var arr = [,];
            var colors = [ "red",, "blue" ];
            var foo = ['tire', 1, , 'small ball'];`
};
  
describe(rule, function test() {
  it('should pass when using valid arrays or trailing comma', function testValid() {
    const res = testScript(rule, scripts.valid);
    expect(res).to.be.true;
  });
  
  it('should fail when using double comma in arrays', function testInvalid() {
    const res = testScript(rule, scripts.invalid);
    expect(res).to.be.false;
  });
});
