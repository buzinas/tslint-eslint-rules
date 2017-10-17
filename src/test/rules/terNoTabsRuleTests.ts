import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('ter-no-tabs');

// There is only one message, checking for line and column
function expecting(errors: [number, number][]): Failure[] {
  return errors.map((err) => {
    return {
      failure: 'Unexpected tab character.',
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass when not using tabs', [
  'function test(){\n}',
  dedent`
  function test(){
    //   sdfdsf
  }`
]);

ruleTester.addTestGroup('invalid', 'should fail when using tabs', [
  {
    code: 'function test(){\t}',
    errors: expecting([[0, 16]])
  },
  {
    code: '/** \t comment test */',
    errors: expecting([[0, 4]])
  },
  {
    code: dedent`
    function\t test(){
      //   sdfdsf
    }`,
    errors: expecting([[1, 8]])
  },
  {
    code: dedent`
    function test(){
      //   \tsdfdsf
    }`,
    errors: expecting([[2, 7]])
  },
  {
    code: dedent`
    function\t test(){
      //   \tsdfdsf
    }`,
    errors: expecting([[1, 8], [2, 7]])
  }
]);

ruleTester.runTests();
