import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('ter-no-ternary');

// There is only one message, checking for line and column
function expecting(errors: [number, number][]): Failure[] {
  return errors.map((err) => {
    return {
      failure: 'ternary operator used',
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass when no ternary operators exist', [
  '"x ? y";',
  'const a?:string = "x ? y : z";'
]);

ruleTester.addTestGroup('invalid', 'should fail when using ternary operators', [
  { code: 'var foo = true ? thing : stuff;', errors: expecting([[0, 15]]) },
  { code: 'true ? thing() : stuff();', errors: expecting([[0, 5]]) },
  { code: 'function foo(bar) { return bar ? baz : qux; }', errors: expecting([[0, 31]]) },
  { code: 'let foo?:string = true ? thing : stuff;', errors: expecting([[0, 23]]) }
]);

ruleTester.runTests();
