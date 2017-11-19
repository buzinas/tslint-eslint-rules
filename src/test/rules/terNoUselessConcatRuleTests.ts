import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('ter-no-useless-concat');

function expecting(errors: [number, number][]): Failure[] {
  return errors.map((err) => {
    return {
      failure: 'Unexpected string concatenation of literals.',
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'valid concatenations', [
  'var a = 1 + 1;',
  "var a = 1 * '2';",
  'var a = 1 - 2;',
  'var a = foo + bar;',
  'var a = "foo" + bar;',
  'var foo = "foo" +\n "bar";',
  'var string = (number + 1) + "px";',
  '"a" + 1',
  '1 + "1"',
  '1 + `1`',
  '(1 + +2) + `b`'
]);

ruleTester.addTestGroup('invalid', 'invalid concatenations', [
  {
    code: '"a" + "b"',
    errors: expecting([[0, 4]])
  },
  {
    code: 'foo + "a" + "b"',
    errors: expecting([[0, 10]])
  },
  {
    code: '"a" + "b" + "c"',
    errors: expecting([[0, 4], [0, 10]])
  },
  {
    code: '`a` + "b"',
    errors: expecting([[0, 4]])
  },
  {
    code: '`a` + `b`',
    errors: expecting([[0, 4]])
  },
  {
    code: 'foo + `a` + `b`',
    errors: expecting([[0, 10]])
  }
]);

ruleTester.runTests();
