/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'valid-typeof';
const scripts = {
  valid: [
    'if (typeof foo === "string") {}',
    'if (typeof bar == \'undefined\') {}',
    'if (typeof foo === baz) {}',
    'if (typeof bar === typeof qux) {}'
  ],

  invalid: [
    'if (typeof foo === "strnig") {}',
    'if (typeof foo == "undefimed") {}',
    'if (typeof bar != \'nunber\') {}',
    'if (typeof bar !== "fucntion") {}'
  ]
};
  
describe(rule, function test() {  
  it('should pass when using valid strings or variables', function testValid() {
    makeTest(rule, scripts.valid, true);
  });
  
  it('should fail when using invalid strings', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
