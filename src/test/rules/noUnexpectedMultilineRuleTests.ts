/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'no-unexpected-multiline';
const scripts = {
  valid: [
    '(x || y).aFunction()',
    '[a, b, c].forEach(doSomething)',
    `
      var a = b;
      (x || y).doSomething()
    `,
    `
      var a = b
      ;(x || y).doSomething()
    `,
    `
      var a = b
      void (x || y).doSomething()
    `,
    `
      var a = b;
      [1, 2, 3].forEach(console.log)
    `,
    `
      var a = b
      void [1, 2, 3].forEach(console.log)
    `,
    `
      'abc\
      (123)\
      '
    `,
    `
      var a = (
      (123)
      )
    `,
    `
      var x = {
        foo: 1,
        bar: 2,
        baz: 3
      };
    `,
    `
      function a() {

      }
    `,
    `
      if (a === 1
        && (b === 2 || c === 3)) { }
    `,
    `
      myArray
        .map();
    `,
    `
      tag \`hello world\`
    `,
    `
      tag \`hello \${expression} world\`
    `
  ],
  invalid: [
    `
      var a = b
      (x || y).doSomething()
    `,
    `
      var a = (a || b)
      (x || y).doSomething()
    `,
    `
      var a = (a || b)
      (x).doSomething()
    `,
    `
      var a = b
      [a, b, c].forEach(doSomething)
    `,
    `
      var a = b
          (x || y).doSomething()
    `,
    `
      var a = b
        [a, b, c].forEach(doSomething)
    `,
    `
      tag
        \`hello world\`
    `,
    `
      tag
        \`hello \${expression} world\`
    `
  ]
};

describe(rule, function test() {
  it('should pass when using expected parenthesis, brackets, or templates', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when using unexpected parenthesis, brackets, or templates', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
