/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'no-extra-semi';
const scripts = {
  valid: [
    'const x = 5;',
    'function foo() { }',
    'for(;;);',
    'while(0);',
    'do;while(0);',
    'for(a in b);',
    'for(a of b);',
    'class A { }',
    'const A = class { };',
    `
      class A {
        foo = 'bar';
        a() {
          this;
        }
      }
    `,
    `
      const A = class {
        a() {
          this;
          this.foo = 'bar';
        }
      };
    `,
    'class A { } a;'
  ],
  invalid: [
    'const x = 5;;',
    'let y = "foo";;',
    'const z = {};;',
    'function foo() {};',
    'for(;;);;',
    'while(0);;',
    'do;while(0);;',
    'for(a in b);;',
    'for(a of b);;',
    'class A { ; }',
    'class A { /*a*/; }',
    `
      class A {
        ; a() {

        }
      }
    `,
    `
      class A {
        a() {

        };
      }
    `,
    `
      class A {
        a() {

        };
        b() {

        }
      }
    `,
    `
      class A {
        ; a() {

        };
        b() {

        };
      }
    `,
    `
      class A {
        a() {

        };
        get b() {

        }
      }
    `
  ]
};

describe(rule, function test() {
  it('should pass when no extra-semi colons exist', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when there are extra semi-colons', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
