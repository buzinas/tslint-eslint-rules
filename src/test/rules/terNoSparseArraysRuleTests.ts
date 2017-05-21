import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('ter-no-sparse-arrays');

function expecting(errors: [number, number][]): Failure[] {
  // [line, column]
  return errors.map((err) => {
    return {
      failure: 'unexpected comma in middle of array',
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass when using valid arrays or trailing comma', [
  'const items = [];',
  'const colors = [ "red", "blue", ];',
  'const arr = new Array(23);'
]);

ruleTester.addTestGroup('invalid', 'should fail when using double comma in arrays', [
  { code: 'const items = [,,];', errors: expecting([[0, 14]]) },
  { code: 'const arr = [,];', errors: expecting([[0, 12]]) },
  { code: 'const colors = [ "red",, "blue" ];', errors: expecting([[0, 15]]) },
  { code: 'const foo = ["tire", 1, , "small ball"];', errors: expecting([[0, 12]]) }
]);

ruleTester.runTests();
