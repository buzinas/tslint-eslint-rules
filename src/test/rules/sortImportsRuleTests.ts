import { Failure, Position, RuleTester, dedent } from './ruleTester';

const ALPHA_ORDER_ERROR = (x, y) => `All imports of the same type must be sorted alphabetically. "${x}" must come before "${y}"`;
const TYPE_ORDER_ERROR = (x, y) => `All imports of type "${x}" must occur before all imports of type "${y}"`;
const MEMBER_SORT_ERROR = 'Member imports must be sorted alphabetically.';

function expecting(errors: [string, number, number, number][]): Failure[] {
  // message, line, startColumn, endColumn
  return errors.map((err) => {
    return {
      failure: err[0],
      startPosition: new Position(err[1], err[2]),
      endPosition: new Position(err[1], err[3])
    };
  });
}

const ruleTester = new RuleTester('sort-imports');

ruleTester.addTestGroup('valid', 'should pass ESLint valid tests', [
  dedent`
    import a from 'foo';
    import b from 'bar';
    import c from 'baz';`,
  dedent`
    import * as B from 'foo';
    import A from 'bar';`,
  dedent`
    import * as B from 'foo';
    import {a, b} from 'bar';`,
  {
    code:
    dedent`
      import A from 'bar';
      import {b, c} from 'foo'`,
    options: [{ 'member-syntax-sort-order': ['single', 'multiple', 'none', 'all', 'alias'] }]
  },
  dedent`
    import {a, b} from 'bar';
    import {c, d} from 'foo';`,
  dedent`
    import A from 'foo';
    import B from 'bar';`,
  dedent`
    import A from 'foo';
    import a from 'bar';`,
  dedent`
    import a, * as b from 'foo';
    import c from 'bar';`,
  dedent`
    import 'foo';
    import a from 'bar';`,
  dedent`
    import B from 'foo.js';
    import a from 'bar';`,
  {
    code: dedent`
      import a from 'foo';
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
    code: dedent`
      import * as a from 'foo';

      import b from 'bar';`
  },
  {
    code: dedent`
      import * as bar from 'bar';
      import * as foo from 'foo';`
  },
  {
    code: dedent`
      import 'foo';
      import bar from 'bar';`,
    options: ['ignore-case']
  },
  `import React, {Component} from 'react';`
]);

ruleTester.addTestGroup('invalid', 'should fail ESLint invalid tests', [
  {
    code: dedent`
      import a from 'foo';
      import A from 'bar';`,
    errors: expecting([[ALPHA_ORDER_ERROR('A', 'a'), 2, 0, 20]])
  },
  {
    code: dedent`
      import b from 'foo';
      import a from 'bar';`,
    errors: expecting([[ALPHA_ORDER_ERROR('a', 'b'), 2, 0, 20]])
  },
  {
    code: dedent`
      import {b, c} from 'foo';
      import {a, d} from 'bar';`,
    errors: expecting([[ALPHA_ORDER_ERROR('a', 'b'), 2, 0, 25]])
  },
  {
    code: dedent`
      import * as foo from 'foo'
      import * as bar from 'bar';`,
    errors: expecting([[ALPHA_ORDER_ERROR('bar', 'foo'), 2, 0, 27]])
  },
  {
    code: dedent`
      import a from 'foo';
      import {b, c} from 'bar';`,
    errors: expecting([[TYPE_ORDER_ERROR('Multiple', 'Single'), 2, 0, 25]])
  },
  {
    code: dedent`
      import a from 'foo';
      import * as b from 'bar';`,
    errors: expecting([[TYPE_ORDER_ERROR('All', 'Single'), 2, 0, 25]])
  },
  {
    code: dedent`
      import a from 'foo';
      import 'bar';`,
    errors: expecting([[TYPE_ORDER_ERROR('None', 'Single'), 2, 0, 13]])
  },
  {
    code: dedent`
      import b from 'bar';
      import * as a from 'foo';`,
    options: [{ 'member-syntax-sort-order': ['all', 'single', 'multiple', 'none', 'alias'] }],
    errors: expecting([[TYPE_ORDER_ERROR('All', 'Single'), 2, 0, 25]])
  },
  {
    code: `import {b, a, d, c} from 'foo';`,
    errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 19]])
  },
  {
    code: `import {a, B, c, D} from 'foo';`,
    errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 19]])
  },
  {
    code: `import {zzzzz, /* comment */ aaaaa} from 'foo';`,
    errors: expecting([[MEMBER_SORT_ERROR,  0, 7, 35]])
  },
  {
    code: `import {zzzzz /* comment */, aaaaa} from 'foo';`,
    errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 35]])
  },
  {
    code: `import {/* comment */ zzzzz, aaaaa} from 'foo';`,
    errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 35]])
  },
  {
    code: `import {zzzzz, aaaaa /* comment */} from 'foo';`,
    errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 35]])
  },
  {
    code: dedent`
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
      startPosition: new Position(1, 7),
      endPosition: new Position(8, 1)
    }]
  }
]);

ruleTester.runTests();
