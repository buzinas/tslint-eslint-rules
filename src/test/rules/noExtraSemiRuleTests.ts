import { RuleTester, Position, Failure, dedent } from './ruleTester';

const ruleTester = new RuleTester('no-extra-semi');

// There is only one message, checking for line and column
function expecting(errors: [number, number][]): Failure[] {
  return errors.map((err) => {
    return {
      failure: 'unnecessary semicolon',
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass when no extra-semi colons exist', [
  'const x = 5;',
  'function foo() { }',
  'for(;;);',
  'while(0);',
  'do;while(0);',
  'for(a in b);',
  'for(a of b);',
  'class A { }',
  'const A = class { };',
  `
      class A {
        foo = 'bar';
        a() {
          this;
        }
      }
    `,
  `
      const A = class {
        a() {
          this;
          this.foo = 'bar';
        }
      };
    `,
  'class A { } a;'
]);

ruleTester.addTestGroup('invalid', 'should fail when using invalid strings', [
  { code: 'const x = 5;;', errors: expecting([[0, 12]]) },
  { code: 'let y = "foo";;', errors: expecting([[0, 14]]) },
  { code: 'const z = {};;', errors: expecting([[0, 13]]) },
  { code: 'function foo() {};', errors: expecting([[0, 17]]) },
  { code: 'for(;;);;', errors: expecting([[0, 8]]) },
  { code: 'while(0);;', errors: expecting([[0, 9]]) },
  { code: 'do;while(0);;', errors: expecting([[0, 12]]) },
  { code: 'for(a in b);;', errors: expecting([[0, 12]]) },
  { code: 'for(a of b);;', errors: expecting([[0, 12]]) },
  { code: 'class A { ; }', errors: expecting([[0, 10]]) },
  { code: 'class A { /*a*/; }', errors: expecting([[0, 15]]) },
  {
    code: dedent`
      class A {
        ; a() {

        }
      }`,
    errors: expecting([[2, 2]])
  },
  {
    code: dedent`
      class A {
        a() {

        };
      }`,
    errors: expecting([[4, 3]])
  },
  {
    code: dedent`
      class A {
        a() {

        };
        b() {

        }
      }`,
    errors: expecting([[4, 3]])
  },
  {
    code: dedent`
      class A {
        ; a() {

        };
        b() {

        };
      }`,
    errors: expecting([
      [2, 2],
      [4, 3],
      [7, 3]
    ])
  },
  {
    code: dedent`
      class A {
        a() {

        };
        get b() {

        }
      }`,
    errors: expecting([[4, 3]])
  }
]);

ruleTester.runTests();
