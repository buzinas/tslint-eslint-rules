import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('ter-no-self-compare');

// Change this function to better test the rule. In some cases the message never changes so we
// can avoid passing it in. See other rule tests for examples.
function expecting(errors: [number, number, number][]): Failure[] {
  return errors.map((err) => {
    return {
      failure: 'Comparing to itself is potentially pointless.',
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position(err[3])
    };
  });
}

ruleTester.addTestGroup('valid', 'no self comparisons', [
  'if (x === y) { }',
  'if (1 === 2) { }',
  'y=x*x',
  'foo.bar.baz === foo.bar.qux'
]);

ruleTester.addTestGroup('invalid', 'self comparisons', [
  {
    code: 'x === x',
    errors: expecting([[0, 2, 4]])
  },
  {
    code: 'x !== x',
    errors: expecting([[0, 2, 4]])
  },
  {
    code: 'x == x',
    errors: expecting([[0, 2, 3]])
  },
  {
    code: 'x != x',
    errors: expecting([[0, 2, 3]])
  },
  {
    code: 'x > x',
    errors: expecting([[0, 2, 2]])
  },
  {
    code: 'x < x',
    errors: expecting([[0, 2, 2]])
  },
  {
    code: 'x >= x',
    errors: expecting([[0, 2, 3]])
  },
  {
    code: 'x <= x',
    errors: expecting([[0, 2, 3]])
  },
  {
    code: '"x" === "x"',
    errors: expecting([[0, 4, 6]])
  }
]);

ruleTester.runTests();
