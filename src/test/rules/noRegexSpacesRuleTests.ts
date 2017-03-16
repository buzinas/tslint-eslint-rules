import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('no-regex-spaces');

function expecting(errors: [number, number, number][]): Failure[] {
  // [line, column]
  return errors.map((err) => {
    return {
      failure: `spaces are hard to count - use {${err[2]}}`,
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass when not using multiple spaces in regular expressions', [
  'var foo = /bar {3}baz/;',
  'var foo = /bar\t\t\tbaz/;'
]);

ruleTester.addTestGroup('invalid', 'should fail when using multiple spaces in regular expressions', [
  { code: 'var foo = /bar    baz/;', errors: expecting([[0, 10, 4]]) },
  { code: 'var foo = /bar      baz/;', errors: expecting([[0, 10, 6]]) }
]);

ruleTester.runTests();
