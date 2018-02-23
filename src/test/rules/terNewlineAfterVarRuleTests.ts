import { dedent, Failure, Position, RuleTester } from './ruleTester';

const ruleTester = new RuleTester('ter-newline-after-var', true);

function expecting (errors: ['expectedBlankLine' | 'unexpectedBlankLine', number][]): Failure[] {
  const errorMessages = {
    expectedBlankLine: 'Expected blank line after variable declarations.',
    unexpectedBlankLine: 'Unexpected blank line after variable declarations.'
  };

  return errors.map(([type, line]) => {
    const message = errorMessages[type];

    return {
      failure: message,
      startPosition: new Position(line),
      endPosition: new Position(line)
    };
  });
}

ruleTester.addTestGroup('always', 'should always require an empty line after variable declarations ', [
  {
    code: dedent`
      var greet = "hello,",
          name = "world";
      console.log(greet, name);

      let greet = "hello,",
          name = "world";
      console.log(greet, name);

      var greet = "hello,";
      const NAME = "world";
      console.log(greet, NAME);

      var greet = "hello,";
      var name = "world";
      // var name = require("world");
      console.log(greet, name);

      var greet = "hello,";

      // var name = require("world");
      console.log(greet, name);
      `,
    output: dedent`
      var greet = "hello,",
          name = "world";

      console.log(greet, name);

      let greet = "hello,",
          name = "world";

      console.log(greet, name);

      var greet = "hello,";
      const NAME = "world";

      console.log(greet, NAME);

      var greet = "hello,";
      var name = "world";
      // var name = require("world");

      console.log(greet, name);

      var greet = "hello,";

      // var name = require("world");
      console.log(greet, name);
      `,
    options: [],
    errors: expecting([
      ['expectedBlankLine', 1],
      ['expectedBlankLine', 5],
      ['expectedBlankLine', 10],
      ['expectedBlankLine', 14]
    ])
  },
  {
    code: dedent`
      var greet = "hello,",
          name = "world";

      console.log(greet, name);

      let greet = "hello,",
          name = "world";

      console.log(greet, name);

      var greet = "hello,";
      const NAME = "world";

      console.log(greet, NAME);

      var greet = "hello,";
      var name = "world";
      // var name = require("world");

      console.log(greet, name);
      var greet = "hello,";

      var name = "world";
      `,
    options: ['always']
  }
]);

ruleTester.addTestGroup('never', 'should disallow empty lines after variable declarations ', [
  {
    code: dedent`
      var greet = "hello,",
          name = "world";

      console.log(greet, name);

      let greet = "hello,",
          name = "world";

      console.log(greet, name);

      var greet = "hello,";
      const NAME = "world";

      console.log(greet, NAME);

      var greet = "hello,";
      var name = "world";
      // var name = require("world");

      console.log(greet, name);
      `,
    output: dedent`
      var greet = "hello,",
          name = "world";
      console.log(greet, name);

      let greet = "hello,",
          name = "world";
      console.log(greet, name);

      var greet = "hello,";
      const NAME = "world";
      console.log(greet, NAME);

      var greet = "hello,";
      var name = "world";
      // var name = require("world");
      console.log(greet, name);
      `,
    options: ['never'],
    errors: expecting([
      ['unexpectedBlankLine', 1],
      ['unexpectedBlankLine', 6],
      ['unexpectedBlankLine', 12],
      ['unexpectedBlankLine', 17]
    ])
  },
  {
    code: dedent`
      var greet = "hello,",
          name = "world";
      console.log(greet, name);

      let greet = "hello,",
          name = "world";
      console.log(greet, name);

      var greet = "hello,";
      const NAME = "world";
      console.log(greet, NAME);

      var greet = "hello,";
      var name = "world";
      // var name = require("world");
      console.log(greet, name);
      `,
    options: ['never']
  }
]);

ruleTester.runTests();
