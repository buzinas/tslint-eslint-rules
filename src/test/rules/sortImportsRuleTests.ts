/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'sort-imports';
const scripts = {
  defaultMemberOrder: {
    valid: [
      `import "test"`,

      `import "test"
      import {foo} from "bar"`,

      `import {foo} from "bar"`,

      `import "blah";
      import * as bah from "buz";
      import {foo, gar} from "bar";
      import {fuz} from "baz";
      import a = b.blah`

    ],
    invalid: [
      `import {foo} from "bar";
      import {bar, baz} from "buz";`
    ]
  }
};

describe(rule, function test() {
  const defaultMemberOrderConfig = { rules: { 'sort-imports': true } };

  it('should pass when "defaultMemberOrder"', function testVariables() {
    makeTest(rule, scripts.defaultMemberOrder.valid, true, defaultMemberOrderConfig);
  });

  it('should fail when "defaultMemberOrder"', function testVariables() {
    makeTest(rule, scripts.defaultMemberOrder.invalid, false, defaultMemberOrderConfig);
  });
});
