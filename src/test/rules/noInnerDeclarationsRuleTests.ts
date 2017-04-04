import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('no-inner-declarations');

enum Decl { Func, Var }
enum Root { Prog, Func}

function expecting(errors: [number, number, Decl, Root][]): Failure[] {
  return errors.map((err) => {
    const decl = err[2] === Decl.Func ? 'function' : 'variable';
    const root = err[3] === Root.Prog ? 'program' : 'function body';
    const msg = `move ${decl} declaration to ${root} root`;
    return {
      failure: msg,
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroupWithConfig(
  'valid-function',
  'should pass when not using inner declaration functions',
  ['functions'],
  [
    'function doSomething() { }',
    'function doSomething() { function somethingElse() { } }',
    '(function() { function doSomething() { } }());',
    'if (test) { var fn = function() { }; }',
    'if (test) { var fn = function expr() { }; }',
    'function decl() { var fn = function expr() { }; }',
    'function decl(arg) { var fn; if (arg) { fn = function() { }; } }',
    'var x = {doSomething() {function doSomethingElse() {}}}',
    'function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }',
    'function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }',
    'if (test) { var foo; }',
    'function doSomething() { while (test) { var foo; } }',
    'foo(() => { function bar() { } });',
    'namespace something { function decl(arg) { var foo; } }',
    'class MyClass { constructor(arg) { function decl(x) { var foo; } } }'
  ]
);

ruleTester.addTestGroupWithConfig(
  'valid-both',
  'should pass when not using inner declaration functions and variables',
  ['both'],
  [
    'if (test) { let x = 1; }',
    'if (test) { const x = 1; }',
    'var foo;',
    'var foo = 42;',
    'function doSomething() { var foo; }',
    '(function() { var foo; }());',
    'var fn = () => {var foo;}',
    'var x = {doSomething() {var foo;}}'
  ]
);

ruleTester.addTestGroupWithConfig(
  'invalid-function',
  'should fail when using inner declaration functions',
  ['functions'],
  [
    {
      code: dedent`
        function doSomething() {
          do {
            function somethingElse() {
            }
          } while (test);
        }`,
      errors: expecting([
        [3, 4, Decl.Func, Root.Func]
      ])
    },
    {
      code: dedent`
        (function() {
          if (test) {
            function doSomething() {
            }
          }
        }());`,
      errors: expecting([
        [3, 4, Decl.Func, Root.Func]
      ])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'invalid-both',
  'should fail when using inner declaration functions or variables',
  ['both'],
  [
    {
      code: dedent`
        if (test) {
          function doSomething() {
          }
        }`,
      errors: expecting([
        [2, 2, Decl.Func, Root.Prog]
      ])
    },
    {
      code: dedent`
        while (test) {
          var foo;
        }`,
      errors: expecting([
        [2, 2, Decl.Var, Root.Prog]
      ])
    },
    {
      code: dedent`
        function doSomething() {
          if (test) {
            var foo = 42;
          }
        }`,
      errors: expecting([
        [3, 4, Decl.Var, Root.Func]
      ])
    },
    {
      code: dedent`
        (function() {
          if (test) {
            var foo;
          }
        }());`,
      errors: expecting([
        [3, 4, Decl.Var, Root.Func]
      ])
    }
  ]
);

ruleTester.runTests();
