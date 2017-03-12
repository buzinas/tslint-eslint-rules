// import { Failure, Position, RuleTester, dedent } from './ruleTester';

import { Failure, Position, RuleTester } from './ruleTester';

const ALPHA_ORDER_ERROR = 'All imports of the same type must be sorted alphabetically. "{0}" must come before "{1}"';
const TYPE_ORDER_ERROR = 'All imports of type "{0}" must occur before all imports of type "{1}"';
const MEMBER_SORT_ERROR = 'Member imports must be sorted alphabetically.';

function expecting(errors): Failure[] {
  return errors.map((err) => {
    if (err.message && err.startColumn && err.endColumn) {
      return {
        failure: err.message,
        startPosition: new Position(err.line, err.startColumn),
        endPosition: new Position(err.line, err.endColumn)
      };
    }
  });
}

function formatString(input: string, ...args): string {
  return input.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
    if (m === '{{') { return '{'; }
    if (m === '}}') { return '}'; }
    return args[n];
  });
};

const ruleTester = new RuleTester('sort-imports');

ruleTester.addTestGroup('valid', 'should pass ESLint valid tests', [
  `import a from 'foo';
           import b from 'bar';
           import c from 'baz';`,
  `import * as B from 'foo';
           import A from 'bar';`,
  `import * as B from 'foo';
           import {a, b} from 'bar';`,
  {
    code:
    `import A from 'bar';
           import {b, c} from 'foo'`,
    options: [{ 'member-syntax-sort-order': ['single', 'multiple', 'none', 'all', 'alias'] }]
  },
  `import {a, b} from 'bar';
        import {c, d} from 'foo';`,
  `import A from 'foo';
        import B from 'bar';`,
  `import A from 'foo';
        import a from 'bar';`,
  `import a, * as b from 'foo';
        import c from 'bar';`,
  `import 'foo';
        import a from 'bar';`,
  `import B from 'foo.js';
        import a from 'bar';`,
  {
    code:
    `import a from 'foo';
        import B from 'bar';`,
    options: ['ignore-case']
  },
  {
    code:
    `import {a, b, c, d} from 'foo';`
  },
  {
    code: `import {b, A, C, d} from 'foo';`,
    options: ['ignore-member-sort']
  },
  {
    code: `import {B, a, C, d} from 'foo';`,
    options: ['ignore-member-sort']
  },
  {
    code: `import {a, B, c, D} from 'foo';`,
    options: ['ignore-case']
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
    options: ['ignore-case']
  },
  `import React, {Component} from 'react';`
]);

ruleTester.addTestGroup('invalid', 'should fail ESLint invalid tests', [
  {
    code: `import a from 'foo';
        import A from 'bar';`,
    errors: expecting([{ message: formatString(ALPHA_ORDER_ERROR, 'A', 'a'), line: 1, startColumn: 8, endColumn: 28 }])
  },
  {
    code: `import b from 'foo';
        import a from 'bar';`,
    errors: expecting([{ message: formatString(ALPHA_ORDER_ERROR, 'a', 'b'), line: 1, startColumn: 8, endColumn: 28 }])
  },
  {
    code: `import {b, c} from 'foo';
        import {a, d} from 'bar';`,
    errors: expecting([{ message: formatString(ALPHA_ORDER_ERROR, 'a', 'b'), line: 1, startColumn: 8, endColumn: 33 }])
  },
  {
    code: `import * as foo from 'foo'
        import * as bar from 'bar';`,
    errors: expecting([{ message: formatString(ALPHA_ORDER_ERROR, 'bar', 'foo'), line: 1, startColumn: 8, endColumn: 35 }])
  },
  {
    code: `import a from 'foo';
        import {b, c} from 'bar';`,
    errors: expecting([{ message: formatString(TYPE_ORDER_ERROR, 'Multiple', 'Single'), line: 1, startColumn: 8, endColumn: 33 }])
  },
  {
    code: `import a from 'foo';
        import * as b from 'bar';`,
    errors: expecting([{ message: formatString(TYPE_ORDER_ERROR, 'All', 'Single'), line: 1, startColumn: 8, endColumn: 33 }])
  },
  {
    code: `import a from 'foo';
        import 'bar';`,
    errors: expecting([{ message: formatString(TYPE_ORDER_ERROR, 'None', 'Single'), line: 1, startColumn: 8, endColumn: 21 }])
  },
  {
    code:
    `import b from 'bar';
        import * as a from 'foo';`,
    options: [{ 'member-syntax-sort-order': ['all', 'single', 'multiple', 'none', 'alias'] }],
    errors: expecting([{ message: formatString(TYPE_ORDER_ERROR, 'All', 'Single'), line: 1, startColumn: 8, endColumn: 33 }])
  },
  {
    code: `import {b, a, d, c} from 'foo';`,
    errors: expecting([{ message: MEMBER_SORT_ERROR, line: 0, startColumn: 7, endColumn: 19 }])
  },
  {
    code: `import {a, B, c, D} from 'foo';`,
    errors: expecting([{ message: MEMBER_SORT_ERROR, line: 0, startColumn: 7, endColumn: 19 }])
  },
  {
    code: `import {zzzzz, /* comment */ aaaaa} from 'foo';`,
    errors: expecting([{ message: MEMBER_SORT_ERROR, line: 0, startColumn: 7, endColumn: 35 }])
  },
  {
    code: `import {zzzzz /* comment */, aaaaa} from 'foo';`,
    errors: expecting([{ message: MEMBER_SORT_ERROR, line: 0, startColumn: 7, endColumn: 35 }])
  },
  {
    code: `import {/* comment */ zzzzz, aaaaa} from 'foo';`,
    errors: expecting([{ message: MEMBER_SORT_ERROR, line: 0, startColumn: 7, endColumn: 35 }])
  },
  {
    code: `import {zzzzz, aaaaa /* comment */} from 'foo';`,
    errors: expecting([{ message: MEMBER_SORT_ERROR, line: 0, startColumn: 7, endColumn: 35 }])
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
            `,
    errors: [{
      failure: MEMBER_SORT_ERROR,
      startPosition: new Position(1, 21),
      endPosition: new Position(8, 15)
    }]
  }
]);

ruleTester.runTests();
