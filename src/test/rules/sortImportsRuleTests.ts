/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chai/chai.d.ts' />

import { expect } from 'chai';
import { testScript } from './helper';

const ruleName = 'sort-imports';
const scripts = {
  eslintParityDefaults: {
    valid: [
      {
        code:
        `import a from 'foo';
           import b from 'bar';
           import c from 'baz';`
      },
      {
        code:
        `import * as B from 'foo';
           import A from 'bar';`
      },
      {
        code:
        `import * as B from 'foo';
           import {a, b} from 'bar';`
      },
      {
        code:
        `import A from 'bar';
           import {b, c} from 'foo'`,
        rules: {
          'sort-imports': true,
          memberSyntaxSortOrder: ['single', 'multiple', 'none', 'all', 'alias']
        }
      },
      {
        code:
        `import {a, b} from 'bar';
        import {c, d} from 'foo';`
      },
      {
        code:
        `import A from 'foo';
        import B from 'bar';`
      },
      {
        code:
        `import A from 'foo';
        import a from 'bar';`
      },
      {
        code:
        `import a, * as b from 'foo';
        import c from 'bar';`
      },
      {
        code:
        `import 'foo';
        import a from 'bar';`
      },
      {
        code:
        `import B from 'foo.js';
        import a from 'bar';`
      },
      {
        code:
        `import a from 'foo';
        import B from 'bar';`,
        rules: {
          'sort-imports': true,
          'ignore-case': true
        }
      },
      {
        code:
        `import {a, b, c, d} from 'foo';`
      },
      {
        code: `import {b, A, C, d} from 'foo';`,
        rules: {
          'sort-imports': true,
          'ignore-member-sort': true
        }
      },
      {
        code: `import {B, a, C, d} from 'foo';`,
        rules: {
          'sort-imports': true,
          'ignore-member-sort': true
        }
      },
      {
        code: `import {a, B, c, D} from 'foo';`,
        rules: {
          'sort-imports': true,
          'ignore-case': true
        }
      },
      // Not supporting this format at this time.
      // {
      //   code:
      //   `import a, * as b from 'foo';`
      // },
      {
        code:
        `import * as a from 'foo';

        import b from 'bar';`
      },
      {
        code:
        `import * as bar from 'bar';
        import * as foo from 'foo';`
      },
      {
        code:
        `import 'foo';
        import bar from 'bar';`,
        rules: {
          'sort-imports': true,
          'ignore-case': true
        }
      },
      {
        code:
        `import React, {Component} from 'react';`
      }
    ]
  },
  defaultMemberOrder: {
    valid: [
      {
        code:
        `import "test"`
      },
      {
        code:
        `import "test"
       import {foo} from "bar"`
      },
      {
        code:
        `import {foo} from "bar"`
      }
      ,
      {
        code:
        `import "blah";
       import * as bah from "buz";
       import {foo, gar} from "bar";
       import {fuz} from "baz";
       import a = b.blah`
      }
    ],
    invalid: [
      {
        code:
        `import {foo} from "bar";
      import {bar, baz} from "buz";`
      }
    ]
  }
};

describe(ruleName, function test() {
  const defaultMemberOrderConfig = { rules: { 'sort-imports': true } };

  it('should pass valid ESLint default setting parity tests', function testVariables() {
    makeTest(ruleName, scripts.eslintParityDefaults.valid, true, defaultMemberOrderConfig);
  });

  // it('should fail invalid ESLint default setting parity tests', function testVariables() {
  //   makeTest(ruleName, scripts.eslintParityDefaults.invalid, false, defaultMemberOrderConfig);
  // });

  it('should pass when "defaultMemberOrder"', function testVariables() {
    makeTest(ruleName, scripts.defaultMemberOrder.valid, true, defaultMemberOrderConfig);
  });

  it('should fail when "defaultMemberOrder"', function testVariables() {
    makeTest(ruleName, scripts.defaultMemberOrder.invalid, false, defaultMemberOrderConfig);
  });
});

function makeTest(rule: string, codeFragment: Array<{ code: string, rules?: {} }>, expected: boolean, defaultConfig?: { rules: {} }) {
  if (!defaultConfig) {
    defaultConfig = {
      rules: {}
    };

    defaultConfig.rules[rule] = true;
  }

  codeFragment.forEach((code) => {
    const res = testScript(rule, code.code, code.rules || defaultConfig);
    expect(res).to.equal(expected, code.code);
  });
}
