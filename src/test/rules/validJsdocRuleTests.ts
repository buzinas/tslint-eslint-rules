/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'valid-jsdoc';
const scripts = {
  validDefault: [
    `/**
      * Description
       * @param {Object[]} screenings Array of screenings.
       * @param {Number} screenings[].timestamp its a time stamp
       @return {void} */
      function foo(){}`,
    `/**
      * Description
       */
      var x = new Foo(function foo(){})`,
    `/**
      * Description
      * @returns {void} */
      function foo(){}`,
    `/**
      * Description
      * @returns {undefined} */
      function foo(){}`,
    `/**
      * Description
      * @alias Test#test
      * @returns {void} */
      function foo(){}`,
    `/**
      * Description
      *@extends MyClass
      * @returns {void} */
      function foo(){}`,
    `/**
      * Description
      * @constructor */
      function Foo(){}`,
    `/**
      * Description
      * @class */
      function Foo(){}`,
    `/**
      * Description
      * @param {string} p bar
      * @returns {string} desc */
      function foo(p){}`,
    `/**
      * Description
      * @arg {string} p bar
      * @returns {string} desc */
      function foo(p){}`,
    `/**
      * Description
      * @argument {string} p bar
      * @returns {string} desc */
      function foo(p){}`,
    `/**
      * Description
      * @param {string} [p] bar
      * @returns {string} desc */
      function foo(p){}`,
    `/**
      * Description
      * @param {Object} p bar
      * @param {string} p.name bar
      * @returns {string} desc */
      Foo.bar = function(p){};`,
    `(function(){
      /**
      * Description
      * @param {string} p bar
      * @returns {string} desc */
      function foo(p){}
      }())`,
    `var o = {
      /**
      * Description
      * @param {string} p bar
      * @returns {string} desc */
      foo: function(p){}
      };`,
    `/**
      * Description
      * @param {Object} p bar
      * @param {string[]} p.files qux
      * @param {Function} cb baz
      * @returns {void} */
      function foo(p, cb){}`,
    `/**
      * Description
      * @override */
      function foo(arg1, arg2){ return ''; }`,
    `/**
      * Description
      * @inheritdoc */
      function foo(arg1, arg2){ return ''; }`,
    `/**
      * Description
      * @return {void} */
      function foo(){}`,
      `/**
       * Description for A.
       */
      class A {
          /**
           * Description for constructor.
           * @param {object[]} xs - xs
           * @returns {void}
           */
          constructor(xs) {
              this.a = xs;    }
      }`,
    `/**
       * Description for A.
       */
      class A {
          /**
           * Description for constructor.
           * @param {object[]} xs - xs
           * @returns {void}
           */
          constructor(xs) {
              this.a = xs;    }
          /**
           * Description for method.
           * @param {object[]} xs - xs
           * @returns {void}
           */
          print(xs) {
              this.a = xs;    }
      }`
  ],
  validNoRequireReturn: [
    `/**
      * Description
      * @param {string} p bar
      */
      Foo.bar = (p) => {};`,
    `/**
      * Description
      * @param {string} p bar
      */
      Foo.bar = function({p}){};`,
    `/**
      * Description
      * @param {string} p bar
      */
      Foo.bar = function(p){};`,
    `/**
      * Description
      * @param {string} p mytest
      */
      Foo.bar = function(p){var t = function(){return p;}};`,
    `/**
      * Description
      * @param {string} p mytest
      */
      Foo.bar = function(p){function func(){return p;}};`,
    `/**
      * Description
      * @param {string} p mytest
      */
      Foo.bar = function(p){var t = false; if(t){ return; }};`,
    `/**
      * Description
      * @param {string} p mytest
      * @returns {void} */
      Foo.bar = function(p){var t = false; if(t){ return; }};`,
    `/**
      * Description
      * @param {string} p mytest
      */
      Foo.bar = function(p){var t = function(){function name(){return p;}}};`,
    `/**
      * Description
      * @param {string} p mytest
      */
      Foo.bar = function(p){var t = function(){function name(){}; return name;}};`,
      `var obj = {
       /**
       * Getter
       * @type {string}
       */
       get location() {
       return this._location;
       }
       }`,
    `/**
       * Description for A.
       */
       class A {
       /**
       * Description for constructor.
       * @param {object[]} xs - xs
       */
       constructor(xs) {
       /**
       * Description for this.xs;
       * @type {object[]}
       */
       this.xs = xs.filter(x => x != null);
       }
      }`,
    `/** @returns {object} foo */ var foo = () => bar();`,
    `/** @returns {object} foo */ var foo = () => { return bar(); };`,
    `/** foo */ var foo = () => { bar(); };`,
    `/**
       * Description for A.
       */
      class A {
          /**
           * Description for constructor.
           * @param {object[]} xs - xs
           */
          constructor(xs) {
              this.a = xs;    }
      }`
  ],
  validNoRequireParamDescription: [
    `/**
      * Description
      * @param {string} p
      * @returns {void}*/
      Foo.bar = function(p){var t = function(){function name(){}; return name;}};`
  ],
  validNoRequireReturnDescription: [
    `/**
      * Description
      * @param {string} p mytest
      * @returns {Object}*/
      Foo.bar = function(p){return name;};`
  ],
  validMatchDescription: [
    `/**
      * Start with caps and end with period.
      * @return {void} */
      function foo(){}`
  ],
  validPrefer: [
    `/** Foo
      @return {void} Foo
       */
      function foo(){}`
  ],
  invalidDefault: [
    `/** @@foo */
      function foo(){}`,
    `/** @@returns {void} Foo */
      function foo(){}`,
    `/** Foo
      @returns {void Foo
       */
      function foo(){}`,
      `/** Foo
      @param {void Foo
       */
      function foo(){}`,
    `/** Foo
      @param {} p Bar
       */
      function foo(){}`,
    `/** Foo
      @param {void Foo */
      function foo(){}`,
    `/** Foo
      * @param p Desc
      */
      function foo(){}`,
    `/**
      * Foo
      * @param {string} p
      */
      function foo(){}`,
    `/**
      * Foo
      * @returns {string}
      */
      function foo(){}`,
    `/**
      * Foo
      * @returns {string} something
      */
      function foo(p){}`,
    `/**
      * Foo
      * @param {string} p desc
      * @param {string} p desc
      */
      function foo(){}`,
    `/**
      * Foo
      * @param {string} a desc
      @returns {void}*/
      function foo(b){}`,
    `/**
      * Foo
      * @override
      * @param {string} a desc
       */
      function foo(b){}`,
    `/**
      * Foo
      * @inheritdoc
      * @param {string} a desc
       */
      function foo(b){}`,
    `/**
      * @param fields [Array]
       */
       function foo(){}`,
    `/**
       * Description for A.
       */
      class A {
          /**
           * Description for constructor.
           * @param {object[]} xs - xs
           * @returns {void}
           */
          constructor(xs) {
              this.a = xs;    }
          /**
           * Description for method.
           */
          print(xs) {
              this.a = xs;    }
      }`
  ],
  invalidPreferReturnReturns: [
    `/** Foo
      @return {void} Foo
       */
      function foo(){}`,
    `/** Foo
      @return {void} Foo
       */
      foo.bar = () => {}`,
      `/**
       * Does something.
      * @param {string} a - this is a
      * @return {Array<number>} The result of doing it
      */
       export function doSomething(a) { }`,
    `/**
       * Does something.
      * @param {string} a - this is a
      * @return {Array<number>} The result of doing it
      */
       export default function doSomething(a) { }`
  ],
  invalidPreferArgumentArg: [
    `/** Foo
      @argument {int} bar baz
       */
      function foo(bar){}`
  ],
  invalidPreferReturnsReturn: [
    `/** Foo
       */
      function foo(){}`
  ],
  invalidNoRequireReturn: [
    `/**
      * Foo
      * @param {string} a desc
      */
      function foo(a){var t = false; if(t) {return t;}}`,
    `/**
      * Foo
      * @param {string} a desc
      */
      function foo(a){var t = false; if(t) {return null;}}`,
    `/**
      * Foo
      * @param {string} a desc
      @returns {MyClass}*/
      function foo(a){var t = false; if(t) {process(t);}}`,
    `/** foo */ var foo = () => bar();`,
    `/** foo */ var foo = () => { return bar(); };`,
    `/** @returns {object} foo */ var foo = () => { bar(); };`
  ],
  invalidMatchDescription: [
    `/**
      * Start with caps and end with period
      * @return {void} */
      function foo(){}`
  ],
  invalidNoRequireReturnAndMatchDescription: [
    `/**
       * Description for A
       */
      class A {
          /**
           * Description for constructor
           * @param {object[]} xs - xs
           */
          constructor(xs) {
              this.a = xs;    }
      }`,
    `/**
       * Description for a
       */
      var A = class {
          /**
           * Description for constructor.
           * @param {object[]} xs - xs
           */
          constructor(xs) {
              this.a = xs;    }
      };`
  ]
};

const MATCH_DESCRIPTION_TEST = '^[A-Z][A-Za-z0-9\\s]*[.]$';

describe(rule, function test() {
  it('should pass when using valid JSDoc comments (default options)', function testValidDefault() {
    makeTest(rule, scripts.validDefault, true);
  });

  it('should pass when using valid JSDoc comments (requireReturn: false)', function testValidNoRequireReturn() {
    makeTest(rule, scripts.validNoRequireReturn, true, {
      rules: {
        [rule]: [true, {
          requireReturn: false
        }]
      }
    });
  });

  it('should pass when using valid JSDoc comments (requireReturnDescription: false)', function testValidNoRequireReturnDescription() {
    makeTest(rule, scripts.validNoRequireReturnDescription, true, {
      rules: {
        [rule]: [true, {
          requireReturnDescription: false
        }]
      }
    });
  });

  it('should pass when using valid JSDoc comments (requireParamDescription: false)', function testValidNoRequireParamDescription() {
    makeTest(rule, scripts.validNoRequireParamDescription, true, {
      rules: {
        [rule]: [true, {
          requireParamDescription: false
        }]
      }
    });
  });

  it('should pass when using valid JSDoc comments (matchDescription: "regex")', function testValidMatchDescription() {
    makeTest(rule, scripts.validMatchDescription, true, {
      rules: {
        [rule]: [true, {
          matchDescription: MATCH_DESCRIPTION_TEST
        }]
      }
    });
  });

  it('should pass when using valid JSDoc comments (prefer: { return: "return" })', function testValidPrefer() {
    makeTest(rule, scripts.validPrefer, true, {
      rules: {
        [rule]: [true, {
          prefer: {
            'return': 'return'
          }
        }]
      }
    });
  });

  it('should fail when using invalid JSDoc comments (default)', function testInvalidDefault() {
    makeTest(rule, scripts.invalidDefault, false);
  });

  it('should fail when using invalid JSDoc comments (prefer: { return: "returns" })', function testInvalidPreferReturnReturns() {
    makeTest(rule, scripts.invalidPreferReturnReturns, false, {
      rules: {
        [rule]: [true, {
          prefer: {
            'return': 'returns'
          }
        }]
      }
    });
  });

  it('should fail when using invalid JSDoc comments (prefer: { returns: "return" })', function testInvalidPreferReturnsReturn() {
    makeTest(rule, scripts.invalidPreferReturnsReturn, false, {
      rules: {
        [rule]: [true, {
          prefer: {
            'returns': 'return'
          }
        }]
      }
    });
  });

  it('should fail when using invalid JSDoc comments (prefer: { argument: "arg" })', function testInvalidPreferArgumentArg() {
    makeTest(rule, scripts.invalidPreferArgumentArg, false, {
      rules: {
        [rule]: [true, {
          prefer: {
            'argument': 'arg'
          }
        }]
      }
    });
  });

  it('should fail when using invalid JSDoc comments (requireReturn: false)', function testInvalidNoRequireReturn() {
    makeTest(rule, scripts.invalidNoRequireReturn, false, {
      rules: {
        [rule]: [true, {
          requireReturn: false
        }]
      }
    });
  });

  it('should fail when using invalid JSDoc comments (matchDescription: "regex")', function testInvalidMatchDescription() {
    makeTest(rule, scripts.invalidMatchDescription, false, {
      rules: {
        [rule]: [true, {
          matchDescription: MATCH_DESCRIPTION_TEST
        }]
      }
    });
  });

  it('should fail when using invalid JSDoc comments (matchDescription: "regex", requireReturn: false)', function testInvalidNoRequireReturnAndMatchDescription() {
    makeTest(rule, scripts.invalidNoRequireReturnAndMatchDescription, false, {
      rules: {
        [rule]: [true, {
          requireReturn: false,
          matchDescription: MATCH_DESCRIPTION_TEST
        }]
      }
    });
  });
});
