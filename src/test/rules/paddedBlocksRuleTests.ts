// These tests are modified versions of the ESLint tests
// The main change is that this package highlights the offending range differently.
//
// example, if padding is prohibited:
//
// 0| if (a) {
// 1|
// 2|   b();
// 3| }
//
// ESLint would highlight the token on line 2 as the failure
// This package highlights the actual padding to be removed (that is the end of line 0 -> line 2)
//
// This package also highlights the entire block when both the start and end are invalid. ESLint
// creates two separate errors in that case.
//
// ESLint Tests: https://github.com/eslint/eslint/blob/master/tests/lib/rules/padded-blocks.js

import { RuleTester, Failure, Position } from './ruleTester';
import { Rule as PaddedBlocksRule } from '../../rules/paddedBlocksRule';

const ruleTester = new RuleTester('padded-blocks');
const FAILURE_STRING = PaddedBlocksRule.FAILURE_STRING;

function expecting(errors: { message: string, line?: number, column?: number }[]): Failure[] {
  return errors.map(({ message, line, column }) => {
    return {
      failure: message,
      startPosition: new Position(line, column),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should padd valid code', [
  '{\n\na();\n\n}',
  '{\n\n\na();\n\n\n}',
  '{\n\n//comment\na();\n\n}',
  '{\n\na();\n//comment\n\n}',
  '{\n\na()\n//comment\n\n}',
  '{\n\na = 1\n\n}',
  '{//comment\n\na();\n\n}',
  '{ /* comment */\n\na();\n\n}',
  '{ /* comment \n */\n\na();\n\n}',
  '{ /* comment \n */ /* another comment \n */\n\na();\n\n}',
  '{ /* comment \n */ /* another comment \n */\n\na();\n\n/* comment \n */ /* another comment \n */}',

  '{\n\na();\n\n/* comment */ }',
  { code: '{\n\na();\n\n/* comment */ }', options: ['always'] },
  { code: '{\n\na();\n\n/* comment */ }', options: [{ blocks: 'always' }] },

  { code: 'switch (a) {}', options: [{ switches: 'always' }] },
  { code: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}', options: ['always'] },
  { code: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}', options: [{ switches: 'always' }] },
  { code: 'switch (a) {\n\n//comment\ncase 0: foo();//comment\n\n}', options: [{ switches: 'always' }] },
  { code: 'switch (a) {//coment\n\ncase 0: foo();\ncase 1: bar();\n\n/* comment */}', options: [{ switches: 'always' }] },

  { code: 'class A{\n\nfoo(){}\n\n}' },
  { code: 'class A{\n\nfoo(){}\n\n}', options: ['always'] },
  { code: 'class A{}', options: [{ classes: 'always' }] },
  { code: 'class A{\n\n}', options: [{ classes: 'always' }] },
  { code: 'class A{\n\nfoo(){}\n\n}', options: [{ classes: 'always' }] },

  { code: '{\na();\n}', options: ['never'] },
  { code: '{\na();}', options: ['never'] },
  { code: '{a();\n}', options: ['never'] },
  { code: '{a();}', options: ['never'] },
  { code: '{//comment\na();}', options: ['never'] },
  { code: '{\n//comment\na()\n}', options: ['never'] },
  { code: '{a();//comment\n}', options: ['never'] },
  { code: '{\na();\n//comment\n}', options: ['never'] },
  { code: '{\na()\n//comment\n}', options: ['never'] },
  { code: '{\na()\n//comment\nb()\n}', options: ['never'] },
  { code: 'function a() {\n/* comment */\nreturn;\n/* comment*/\n}', options: ['never'] },
  { code: '{\n// comment\ndebugger;\n// comment\n}', options: ['never'] },
  { code: '{\n\n// comment\nif (\n// comment\n a) {}\n\n }', options: ['always'] },
  { code: '{\n// comment\nif (\n// comment\n a) {}\n }', options: ['never'] },
  { code: '{\n// comment\nif (\n// comment\n a) {}\n }', options: [{ blocks: 'never' }] },

  { code: 'switch (a) {\ncase 0: foo();\n}', options: ['never'] },
  { code: 'switch (a) {\ncase 0: foo();\n}', options: [{ switches: 'never' }] },

  { code: 'class A{\nfoo(){}\n}', options: ['never'] },
  { code: 'class A{\nfoo(){}\n}', options: [{ classes: 'never' }] },

  // Ignore block statements if not configured
  { code: '{\na();\n}', options: [{ switches: 'always' }] },
  { code: '{\n\na();\n\n}', options: [{ switches: 'never' }] },

  // Ignore switch statements if not configured
  { code: 'switch (a) {\ncase 0: foo();\ncase 1: bar();\n}', options: [{ blocks: 'always', classes: 'always' }] },
  { code: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}', options: [{ blocks: 'never', classes: 'never' }] },

  // Ignore class statements if not configured
  { code: 'class A{\nfoo(){}\n}', options: [{ blocks: 'always' }] },
  { code: 'class A{\n\nfoo(){}\n\n}', options: [{ blocks: 'never' }] }
]);

ruleTester.addTestGroup('invalid', 'should fail invalid code', [
  {
    code: '{\n//comment\na();\n\n}',
    output: '{\n\n//comment\na();\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 1,
        column: 0
      }
    ])
  },
  {
    code: '{ //comment\na();\n\n}',
    output: '{ //comment\n\na();\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0,
        column: 2
      }
    ])
  },
  {
    code: '{\n\na();\n//comment\n}',
    output: '{\n\na();\n//comment\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 2,
        column: 4
      }
    ])
  },
  {
    code: '{\n\na()\n//comment\n}',
    output: '{\n\na()\n//comment\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 2,
        column: 3
      }
    ])
  },
  {
    code: '{\na();\n\n}',
    output: '{\n\na();\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0
      }
    ])
  },
  {
    code: '{\n\na();\n}',
    output: '{\n\na();\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 2
      }
    ])
  },
  {
    code: '{\na();\n}',
    output: '{\n\na();\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0
      }
    ])
  },
  {
    code: '{\r\na();\r\n}',
    output: '{\n\r\na();\r\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0
      }
    ])
  },
  {
    code: '{\na();}',
    output: '{\n\na();\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0
      }
    ])
  },
  {
    code: '{a();\n}',
    output: '{\na();\n\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0
      }
    ])
  },
  {
    code: '{a();\n}',
    output: '{\na();\n\n}',
    options: [{ blocks: 'always' }],
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0
      }
    ])
  },
  {
    code: 'switch (a) {\ncase 0: foo();\ncase 1: bar();\n}',
    output: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}',
    options: ['always'],
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0,
        column: 11
      }
    ])
  },
  {
    code: 'switch (a) {\ncase 0: foo();\ncase 1: bar();\n}',
    output: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}',
    options: [{ switches: 'always' }],
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0,
        column: 11
      }
    ])
  },
  {
    code: 'switch (a) {\n//comment\ncase 0: foo();//comment\n}',
    output: 'switch (a) {\n\n//comment\ncase 0: foo();//comment\n\n}',
    options: [{ switches: 'always' }],
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 1,
        column: 0
      }
    ])
  },
  {
    code: 'class A {\nconstructor(){}\n}',
    output: 'class A {\n\nconstructor(){}\n\n}',
    options: ['always'],
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0,
        column: 8
      }
    ])
  },
  {
    code: 'class A {\nconstructor(){}\n}',
    output: 'class A {\n\nconstructor(){}\n\n}',
    options: [{ classes: 'always' }],
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0,
        column: 8
      }
    ])
  },
  {
    code: '{a();}',
    output: '{\na();\n}',
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 0
      }
    ])
  },
  {
    code: '{\na()\n//comment\n\n}',
    output: '{\na()\n//comment\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 2
      }
    ])
  },
  {
    code: '{\n\na();\n\n}',
    output: '{\na();\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0
      }
    ])
  },
  {
    code: '{\r\n\r\na();\r\n\r\n}',
    output: '{\na();\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0
      }
    ])
  },
  {
    code: '{\n\n\n  a();\n\n\n}',
    output: '{\n  a();\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0
      }
    ])
  },
  {
    code: '{\n\na();\n}',
    output: '{\na();\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0
      }
    ])
  },
  {
    code: '{\n\n\ta();\n}',
    output: '{\n\ta();\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0
      }
    ])
  },
  {
    code: '{\na();\n\n}',
    output: '{\na();\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 1
      }
    ])
  },
  {
    code: '  {\n    a();\n\n  }',
    output: '  {\n    a();\n  }',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 1
      }
    ])
  },
  {
    code: '{\n// comment\nif (\n// comment\n a) {}\n\n}',
    output: '{\n\n// comment\nif (\n// comment\n a) {}\n\n}',
    options: ['always'],
    errors: expecting([
      {
        message: FAILURE_STRING.always,
        line: 1,
        column: 0
      }
    ])
  },
  {
    code: '{\n\n// comment\nif (\n// comment\n a) {}\n}',
    output: '{\n// comment\nif (\n// comment\n a) {}\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0,
        column: 0
      }
    ])
  },
  {
    code: '{\n\n// comment\nif (\n// comment\n a) {}\n}',
    output: '{\n// comment\nif (\n// comment\n a) {}\n}',
    options: [{ blocks: 'never' }],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0,
        column: 0
      }
    ])
  },
  {
    code: 'switch (a) {\n\ncase 0: foo();\n\n}',
    output: 'switch (a) {\ncase 0: foo();\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0,
        column: 11
      }
    ])
  },
  {
    code: 'switch (a) {\n\ncase 0: foo();\n}',
    output: 'switch (a) {\ncase 0: foo();\n}',
    options: [{ switches: 'never' }],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0,
        column: 11
      }
    ])
  },
  {
    code: 'switch (a) {\ncase 0: foo();\n\n  }',
    output: 'switch (a) {\ncase 0: foo();\n  }',
    options: [{ switches: 'never' }],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 1,
        column: 14
      }
    ])
  },
  {
    code: 'class A {\n\nconstructor(){\n\nfoo();\n\n}\n\n}',
    output: 'class A {\nconstructor(){\nfoo();\n}\n}',
    options: ['never'],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0
      },
      {
        message: FAILURE_STRING.never,
        line: 2
      }
    ])
  },
  {
    code: 'class A {\n\nconstructor(){\n\nfoo();\n\n}\n\n}',
    output: 'class A {\nconstructor(){\n\nfoo();\n\n}\n}',
    options: [{ classes: 'never' }],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0
      }
    ])
  },
  {
    code: 'class A {\n\nconstructor(){\n\nfoo();\n\n}\n\n}',
    output: 'class A {\nconstructor(){\nfoo();\n}\n}',
    options: [{ blocks: 'never', classes: 'never' }],
    errors: expecting([
      {
        message: FAILURE_STRING.never,
        line: 0
      },
      {
        message: FAILURE_STRING.never,
        line: 2
      }
    ])
  },
  {
    code: 'function foo() { // a\n\n  b;\n}',
    output: 'function foo() { // a\n  b;\n}',
    options: ['never'],
    errors: expecting([{ message: FAILURE_STRING.never }])
  },
  {
    code: 'function foo() { /* a\n */\n\n  bar;\n}',
    output: 'function foo() { /* a\n */\n  bar;\n}',
    options: ['never'],
    errors: expecting([{ message: FAILURE_STRING.never }])
  },
  {
    code: 'function foo() {\n\n  bar;\n/* a\n */}',
    output: 'function foo() {\n\n  bar;\n\n/* a\n */}',
    options: ['always'],
    errors: expecting([{ message: FAILURE_STRING.always }])
  },
  {
    code: 'function foo() { /* a\n */\n/* b\n */\n  bar;\n}',
    output: 'function foo() { /* a\n */\n\n/* b\n */\n  bar;\n\n}',
    options: ['always'],
    errors: expecting([{ message: FAILURE_STRING.always }, { message: FAILURE_STRING.always }])
  },
  {
    code: 'function foo() { /* a\n */ /* b\n */\n  bar;\n}',
    output: 'function foo() { /* a\n */ /* b\n */\n\n  bar;\n\n}',
    options: ['always'],
    errors: expecting([{ message: FAILURE_STRING.always }, { message: FAILURE_STRING.always }])
  },
  {
    code: 'function foo() { /* a\n */ /* b\n */\n  bar;\n/* c\n *//* d\n */}',
    output: 'function foo() { /* a\n */ /* b\n */\n\n  bar;\n\n/* c\n *//* d\n */}',
    options: ['always'],
    errors: expecting([{ message: FAILURE_STRING.always }, { message: FAILURE_STRING.always }])
  }
]);

ruleTester.runTests();
