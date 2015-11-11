/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />

import {testScript} from './helper';
import {expect} from 'chai';

const rule = 'valid-typeof';
const scripts = {
  valid: `if (typeof foo === "string") {}
          if (typeof bar == 'undefined') {}
          if (typeof foo === baz) {}
          if (typeof bar === typeof qux) {}`,

  invalid: `if (typeof foo === "strnig") {}
            if (typeof foo == "undefimed") {}
            if (typeof bar != 'nunber') {}
            if (typeof bar !== "fucntion") {}`
};
  
describe(rule, function test() {
  it('should pass when using valid strings or variables', function testValid() {
    const res = testScript(rule, scripts.valid);
    expect(res).to.be.true;
  });
  
  it('should fail when using invalid strings', function testInvalid() {
    const res = testScript(rule, scripts.invalid);
    expect(res).to.be.false;
  });
});
