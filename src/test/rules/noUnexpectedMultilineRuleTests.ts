import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('no-unexpected-multiline', true);

function expecting(errors: [string, number, number][]): Failure[] {
  // [message, line, column]
  return errors.map((err) => {
    return {
      failure: err[0],
      startPosition: new Position(err[1], err[2]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass when using expected parenthesis, brackets, or templates', [
  '(x || y).aFunction()',
  '[a, b, c].forEach(doSomething)',
  dedent`
    var a = b;
    (x || y).doSomething()
    `,
  dedent`
    var a = b
    ;(x || y).doSomething()
    `,
  dedent`
    var a = b
    void (x || y).doSomething()
    `,
  dedent`
    var a = b;
    [1, 2, 3].forEach(console.log)
    `,
  dedent`
    var a = b
    void [1, 2, 3].forEach(console.log)
    `,
  dedent`
    'abc\
    (123)\
    '
    `,
  dedent`
    var a = (
    (123)
    )
    `,
  dedent`
    var x = {
      foo: 1,
      bar: 2,
      baz: 3
    };
    `,
  dedent`
    function a() {

    }
    `,
  dedent`
    if (a === 1
      && (b === 2 || c === 3)) { }
    `,
  dedent`
    myArray
      .map();
    `,
  dedent`
    tag \`hello world\`
    `,
  dedent`
    tag \`hello \${expression} world\`
    `
]);

ruleTester.addTestGroup('invalid', 'should fail when using unexpected parenthesis, brackets, or templates', [
  {
    code: dedent`
      var a = b
      (x || y).doSomething()
      `,
    errors: expecting([['unexpected newline between function and ( of function call', 1, 8]])
  },
  {
    code: dedent`
      var a = (a || b)
      (x || y).doSomething()
      `,
    errors: expecting([['unexpected newline between function and ( of function call', 1, 8]])
  },
  {
    code: dedent`
      var a = b
      [a, b, c].forEach(doSomething)
      `,
    errors: expecting([['unexpected newline between object and [ of property access', 1, 8]])
  },
  {
    code: dedent`
      var a = b
          (x || y).doSomething()
      `,
    errors: expecting([['unexpected newline between function and ( of function call', 1, 8]])
  },
  {
    code: dedent`
      var a = b
        [a, b, c].forEach(doSomething)
      `,
    errors: expecting([['unexpected newline between object and [ of property access', 1, 8]])
  },
  {
    code: dedent`
      tag
        \`hello world\`
      `,
    errors: expecting([['unexpected newline between template tag and template literal', 1, 0]])
  },
  {
    code: dedent`
      tag
        \`hello \${expression} world\`
      `,
    errors: expecting([['unexpected newline between template tag and template literal', 1, 0]])
  }
]);

ruleTester.runTests();
