import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('ter-prefer-arrow-callback');

function expecting(errors: string[]]): Failure[] {
  return errors.map((err) => {
    let message = '';
    return {
      failure: message,
      startPosition: new Position(err[0]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('group-name', 'should ...', [
  {
    code: dedent`
     // code goes here
     `,
    options: [],
    errors: expecting([
    ])
  }
]);

ruleTester.runTests();
