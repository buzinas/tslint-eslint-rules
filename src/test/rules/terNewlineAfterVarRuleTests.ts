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

      // var name2 = require("world");
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

      // var name2 = require("world");
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
  },
  {
    code: dedent`
     try {

         const result = await request.send();

     } catch (err) {

         throw new Error(err);

     }`,
    output: dedent`
     try {

         const result = await request.send();

     } catch (err) {

         throw new Error(err);

     }`,
    options: ['always']
  },
  {
    code: dedent`
     class Example {

       constructor() {

         const test = 'abc123';
         this.runMethod();

       }

     }`,
    output: dedent`
     class Example {

       constructor() {

         const test = 'abc123';

         this.runMethod();

       }

     }`,
    options: ['always'],
    errors: expecting([
      ['expectedBlankLine', 5]
    ])
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

      var greet = "hello,";
      var name = "world";


      /* Multiline
         comment */

      alert(1);
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
      var name = "world";
      /* Multiline
         comment */
      alert(1);
      `,
    options: ['never'],
    errors: expecting([
      ['unexpectedBlankLine', 1],
      ['unexpectedBlankLine', 6],
      ['unexpectedBlankLine', 12],
      ['unexpectedBlankLine', 17],
      ['unexpectedBlankLine', 23]
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
  },
  {
    code: dedent`
     try {

         const result = await request.send();

     } catch (err) {

         throw new Error(err);

     }`,
    output: dedent`
     try {

         const result = await request.send();
     } catch (err) {

         throw new Error(err);

     }`,
    options: ['never'],
    errors: expecting([
      ['unexpectedBlankLine', 3]
    ])
  },
  {
    code: dedent`
     class Example {

       constructor() {

         const test = 'abc123';

         this.runMethod();

       }

     }`,
    output: dedent`
     class Example {

       constructor() {

         const test = 'abc123';
         this.runMethod();

       }

     }`,
    options: ['never'],
    errors: expecting([
      ['unexpectedBlankLine', 5]
    ])
  }
]);

ruleTester.runTests();
