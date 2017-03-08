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
          'sort-imports': [
            true,
            { 'member-syntax-sort-order': ['single', 'multiple', 'none', 'all', 'alias'] }
          ]
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
          'sort-imports': [true,
            'ignore-case']
        }
      },
      {
        code:
        `import {a, b, c, d} from 'foo';`
      },
      {
        code: `import {b, A, C, d} from 'foo';`,
        rules: {
          'sort-imports': [true,
            'ignore-member-sort']
        }
      },
      {
        code: `import {B, a, C, d} from 'foo';`,
        rules: {
          'sort-imports': [true,
            'ignore-member-sort']
        }
      },
      {
        code: `import {a, B, c, D} from 'foo';`,
        rules: {
          'sort-imports': [true,
            'ignore-case']
        }
      },
      {
        code:
        `import a, * as b from 'foo';`
      },
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
          'sort-imports': [true,
            'ignore-case']
        }
      },
      {
        code:
        `import React, {Component} from 'react';`
      }
    ],
    invalid: [
      {
        code:
        `import a from 'foo';
        import A from 'bar';`
      },
      {
        code:
        `import b from 'foo';
        import a from 'bar';`
      },
      {
        code:
        `import {b, c} from 'foo';
        import {a, d} from 'bar';`
      },
      {
        code:
        `import * as foo from 'foo'
        import * as bar from 'bar';`
      },
      {
        code:
        `import a from 'foo';
        import {b, c} from 'bar';`
      },
      {
        code:
        `import a from 'foo';
        import * as b from 'bar';`
      },
      {
        code:
        `import a from 'foo';
        import 'bar';`
      },
      {
        code:
        `import b from 'bar';
        import * as a from 'foo';`,
        rules: {
          'sort-imports': [
            true,
            { 'member-syntax-sort-order': ['all', 'single', 'multiple', 'none', 'alias'] }
          ]
        }
      },
      {
        code: `import {b, a, d, c} from 'foo';`
      },
      {
        code: `import {a, B, c, D} from 'foo';`
      },
      {
        code: `import {zzzzz, /* comment */ aaaaa} from 'foo';`
      },
      {
        code: `import {zzzzz /* comment */, aaaaa} from 'foo';`
      },
      {
        code: `import {/* comment */ zzzzz, aaaaa} from 'foo';`
      },
      {
        code: `import {zzzzz, aaaaa /* comment */} from 'foo';`
      },
      {
        code: `
              import {
                boop,
                foo,
                zoo,
                baz as qux,
                bar,
                beep
              } from 'foo';
            `
      }
    ]
  }
};

describe(ruleName, function test() {
  const defaultConfig = { rules: { 'sort-imports': true } };

  it('should pass valid ESLint parity tests', function testVariables() {
    makeTest(ruleName, scripts.eslintParityDefaults.valid, true, defaultConfig);
  });

  it('should fail invalid ESLint parity tests', function testVariables() {
    makeTest(ruleName, scripts.eslintParityDefaults.invalid, false, defaultConfig);
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
    const res = testScript(rule, code.code, code.rules ? { rules: code.rules } : defaultConfig);
    expect(res).to.equal(expected, code.code);
  });
}
