import * as Lint from 'tslint';
import { RuleTester, Failure, Position } from './ruleTester';
import { Rule } from '../../rules/terPaddingLineBetweenStatementsRule';

const ruleTester = new RuleTester('ter-padding-line-between-statements');
const FAILURE_STRING = Rule.FAILURE_STRING;

// Change this function to better test the rule. In some cases the message never changes so we
// can avoid passing it in. See other rule tests for examples.
function expecting(errors: [string, number, number][]): Failure[] {
  return errors.map((err) => {
    let message = err[0];
    return {
      failure: FAILURE_STRING[message],
      startPosition: new Position(err[1], err[2]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid-single', 'should pass with single statement type', [
  {
    code: "import * as ts from 'typescript';\n\nimport * as Lint from 'tslint';",
    options: [ { blankLine: 'always', prev: 'import', next: 'import' }]
  }, {
    code: 'function add(a: number, b: number) { return a + b; }\nfunction sub(a: number, b: number) { return a - b; }',
    options: [ { blankLine: 'never', prev: 'function', next: 'function' }]
  }
]);

ruleTester.addTestGroup('invalid-single', 'should fail with single statement type', [
  {
    code: "import * as ts from 'typescript';\n\nimport * as Lint from 'tslint';",
    options: [ { blankLine: 'never', prev: 'import', next: 'import' }],
    errors: expecting([['unexpectedBlankLine', 2, 0]])
  }, {
    code: 'function add(a: number, b: number) { return a + b; }\nfunction sub(a: number, b: number) { return a - b; }',
    options: [ { blankLine: 'always', prev: 'function', next: 'function' }],
    errors: expecting([['missingBlankLine', 1, 0]])
  }
]);

ruleTester.addTestGroup('valid-array', 'should pass with array of statement types', [
  {
    code: Lint.Utils.dedent`
      switch(value) {
        case "1":
        case "2":
          a();
          break;
        default:
          a();
          break;
      }
    `,
    options: [ { blankLine: 'never', prev: ['case', 'default', 'break'], next: ['case', 'default', 'break'] }]
  }, {
    code: Lint.Utils.dedent`
      switch(value) {
        case "1":

        case "2":
          a();

          break;

        default:
          a();

          break;
      }
    `,
    options: [ { blankLine: 'always', prev: ['case', 'expression'], next: ['case', 'default', 'break'] }]
  }
]);

ruleTester.addTestGroup('invalid-array', 'should fail with array of statement types', [
  {
    code: Lint.Utils.dedent`
      switch(value) {
        case "1":
        case "2":
          a();
          break;
        default:
          a();
          break;
      }
    `,
    options: [ { blankLine: 'always', prev: ['case', 'expression'], next: ['case', 'default', 'break'] }],
    errors: expecting([
      ['missingBlankLine', 3, 2],
      ['missingBlankLine', 5, 4],
      ['missingBlankLine', 6, 2],
      ['missingBlankLine', 8, 4]
    ])
  }, {
    code: Lint.Utils.dedent`
      switch(value) {
        case "1":

        case "2":
          a();

          break;

        default:
          a();

          break;
      }
    `,
    options: [ { blankLine: 'never', prev: ['case', 'default', 'expression'], next: ['case', 'default', 'break'] }],
    errors: expecting([
      ['unexpectedBlankLine', 4, 2],
      ['unexpectedBlankLine', 7, 4],
      ['unexpectedBlankLine', 9, 2],
      ['unexpectedBlankLine', 12, 4]
    ])
  }
]);

ruleTester.addTestGroup('valid-wildcard', 'should pass with wildcards', [
  {
    code: 'let sum = 0;\n\n\nfor (let i = 0; i < 5; i++) { sum += i; }\n\nexport default sum;',
    options: [ { blankLine: 'always', prev: '*', next: '*' }]
  }, {
    code: 'let sum = 0;\nfor (let i = 0; i < 5; i++) { sum += i; }\nexport default sum;',
    options: [ { blankLine: 'never', prev: '*', next: '*' }]
  }
]);

ruleTester.addTestGroup('invalid-wildcard', 'should fail with wildcards', [
  {
    code: 'let sum = 0;\nfor (let i = 0; i < 5; i++) { sum += i; }\nexport default sum;',
    options: [ { blankLine: 'always', prev: '*', next: '*' }],
    errors: expecting([['missingBlankLine', 1, 0], ['missingBlankLine', 2, 0]])
  }, {
    code: 'let sum = 0;\n\nfor (let i = 0; i < 5; i++) { sum += i; }\n\n\nexport default sum;',
    options: [ { blankLine: 'never', prev: '*', next: '*' }],
    errors: expecting([['unexpectedBlankLine', 2, 0], ['unexpectedBlankLine', 5, 0]])
  }
]);

ruleTester.addTestGroup('block-like', 'should fail with block-like statements', [
  {
    code: Lint.Utils.dedent`
      class Rule extends Lint.Rules.AbstractRule {}
      do {} while(true);
      function foo() {}
      if (true) {}
      switch(x) { }
      try { } catch (e: Exception) {}
      while(true) {}
    `,
    options: [ { blankLine: 'always', prev: 'block-like', next: 'block-like' }],
    errors: expecting([
      ['missingBlankLine', 2, 0], ['missingBlankLine', 3, 0], ['missingBlankLine', 4, 0],
      ['missingBlankLine', 5, 0], ['missingBlankLine', 6, 0], ['missingBlankLine', 7, 0]
    ])
  }
]);

ruleTester.addTestGroup('other-statement-types', 'should work for different statement types', [
  {
    code: 'const enum PaddingTypes { Any, Always, Never }\nconst enum VariableTypes { Const, Var, Let }',
    options: [ { blankLine: 'always', prev: 'enum', next: 'enum' }],
    errors: expecting([['missingBlankLine', 1, 0]])
  }, {
    code: 'export { PaddingTypes };\nexport default Rule;',
    options: [ { blankLine: 'always', prev: 'export', next: 'export' }],
    errors: expecting([['missingBlankLine', 1, 0]])
  }, {
    code: 'if (false) { x++; }\nif (true) { x--; }',
    options: [ { blankLine: 'always', prev: 'if', next: 'if' }],
    errors: expecting([['missingBlankLine', 1, 0]])
  }, {
    code: "import * as ts from 'typescript';\nimport * as Lint from 'tslint';",
    options: [ { blankLine: 'always', prev: 'import', next: 'import' }],
    errors: expecting([['missingBlankLine', 1, 0]])
  }, {
    code: 'interface I1 { x: number }\ninterface I2 { y: string }',
    options: [ { blankLine: 'always', prev: 'interface', next: 'interface' }],
    errors: expecting([['missingBlankLine', 1, 0]])
  }
]);

ruleTester.addTestGroup('multiple-matches', 'should use the last matching config for a statement pair', [
  {
    code: 'const x = 1;\nvar y = 2',
    options: [
      { blankLine: 'never', prev: 'const', next: 'var' },
      { blankLine: 'always', prev: 'const', next: 'var' }
    ],
    errors: expecting([['missingBlankLine', 1, 0]])
  }, {
    code: 'const x = 1;\nvar y = 2',
    options: [
      { blankLine: 'always', prev: 'const', next: 'var' },
      { blankLine: 'never', prev: 'const', next: 'var' }
    ]
  }
]);

ruleTester.runTests();
