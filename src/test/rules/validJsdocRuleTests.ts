import { dedent, RuleTester, Failure, Position } from './ruleTester';

const MATCH_DESCRIPTION_TEST = '^[A-Z][A-Za-z0-9\\s]*[.]$';
const ruleTester = new RuleTester('valid-jsdoc');

// Only checking for message
function expecting(errors: string[]): Failure[] {
  return errors.map((err) => {
    return {
      failure: err,
      startPosition: new Position(),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid-default', 'should pass when using valid JSDoc comments (default options)', [
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
    * @inheritDoc */
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
]);

ruleTester.addTestGroupWithConfig(
  'no-require-return',
  'should pass when using valid JSDoc comments (requireReturn: false)',
  { requireReturn: false },
  [
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
  ]
);

ruleTester.addTestGroupWithConfig(
  'no-require-param-desc',
  'should pass when using valid JSDoc comments (requireParamDescription: false)',
  { requireParamDescription: false },
  [
    `/**
      * Description
      * @param {string} p
      * @returns {void}*/
      Foo.bar = function(p){var t = function(){function name(){}; return name;}};`
  ]
);

ruleTester.addTestGroupWithConfig(
  'no-require-ret-desc',
  'should pass when using valid JSDoc comments (requireReturnDescription: false)',
  { requireReturnDescription: false },
  [
    `/**
      * Description
      * @param {string} p mytest
      * @returns {Object}*/
      Foo.bar = function(p){return name;};`
  ]
);

ruleTester.addTestGroupWithConfig(
  'match-desc',
  'should pass when using valid JSDoc comments (matchDescription: "regex")',
  { matchDescription: MATCH_DESCRIPTION_TEST },
  [
    `/**
      * Start with caps and end with period.
      * @return {void} */
      function foo(){}`
  ]
);

ruleTester.addTestGroupWithConfig(
  'prefer',
  'should pass when using valid JSDoc comments (prefer: { return: "return" })',
  { prefer: { 'return': 'return' } },
  [
    `/** Foo
      @return {void} Foo
       */
      function foo(){}`
  ]
);

ruleTester.addTestGroup('invalid', 'should fail when using invalid JSDoc comments (default)', [
  {
    code: dedent`
      /** @@foo */
       function foo(){}`,
    errors: expecting(['JSDoc syntax error'])
  },
  {
    code: dedent`
      /** @@returns {void} Foo */
        function foo(){}`,
    errors: expecting(['JSDoc syntax error'])
  },
  {
    code: dedent`
      /** Foo
        @returns {void Foo
         */
        function foo(){}`,
    errors: expecting(['JSDoc type missing brace'])
  },
  {
    code: dedent`
      /** Foo
       @param {void Foo
        */
       function foo(){}`,
    errors: expecting(['JSDoc type missing brace'])
  },
  {
    code: dedent`
      /** Foo
       @param {} p Bar
        */
       function foo(){}`,
    errors: expecting(['JSDoc syntax error'])
  },
  {
    code: dedent`
      /** Foo
       @param {void Foo */
       function foo(){}`,
    errors: expecting(['JSDoc type missing brace'])
  },
  {
    code: dedent`
      /** Foo
       @param {void Foo */
       function foo(){}`,
    errors: expecting(['JSDoc type missing brace'])
  },
  {
    code: dedent`
      /** Foo
       * @param p Desc
       */
       function foo(){}`,
    errors: expecting([
      "missing JSDoc parameter type for 'p'",
      'missing JSDoc @returns for function'
    ])
  },
  {
    code: dedent`
      /**
       * Foo
       * @param {string} p
       */
       function foo(){}`,
    errors: expecting([
      "missing JSDoc parameter description for 'p'",
      'missing JSDoc @returns for function'
    ])
  },
  {
    code: dedent`
      /**
       * Foo
       * @returns {string}
       */
       function foo(){}`,
    errors: expecting(['missing JSDoc return description'])
  },
  {
    code: dedent`
      /**
       * Foo
       * @returns {string} something
       */
       function foo(p){}`,
    errors: expecting(["missing JSDoc for parameter 'p'"])
  },
  {
    code: dedent`
      /**
       * Foo
       * @param {string} p desc
       * @param {string} p desc
       */
       function foo(){}`,
    errors: expecting([
      "duplicate JSDoc parameter 'p'",
      'missing JSDoc @returns for function'
    ])
  },
  {
    code: dedent`
      /**
       * Foo
       * @param {string} a desc
       @returns {void}*/
       function foo(b){}`,
    errors: expecting(["expected JSDoc for 'b' but found 'a'"])
  },
  {
    code: dedent`
      /**
       * Foo
       * @override
       * @param {string} a desc
        */
       function foo(b){}`,
    errors: expecting(["expected JSDoc for 'b' but found 'a'"])
  },
  {
    code: dedent`
      /**
       * Foo
       * @inheritdoc
       * @param {string} a desc
        */
       function foo(b){}`,
    errors: expecting(["expected JSDoc for 'b' but found 'a'"])
  },
  {
    code: dedent`
      /**
       * Foo
       * @inheritDoc
       * @param {string} a desc
        */
       function foo(b){}`,
    errors: expecting(["expected JSDoc for 'b' but found 'a'"])
  },
  {
    code: dedent`
      /**
       * @param fields [Array]
        */
        function foo(){}`,
    errors: expecting([
      "missing JSDoc parameter type for 'fields'",
      'missing JSDoc @returns for function'
    ])
  },
  {
    code: dedent`
      /**
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
       }
    `,
    errors: expecting([
      'missing JSDoc @returns for function',
      "missing JSDoc for parameter 'xs'"
    ])
  }
]);

ruleTester.addTestGroupWithConfig(
  'invalid-pref-ret',
  'should fail when using invalid JSDoc comments (prefer: { return: "returns" })',
  { prefer: { 'return': 'returns' } },
  [
    {
      code: dedent`
        /** Foo
         @return {void} Foo
          */
         function foo(){}`,
      errors: expecting(['use @returns instead'])
    },
    {
      code: dedent`
        /** Foo
         @return {void} Foo
          */
         foo.bar = () => {}`,
      errors: expecting(['use @returns instead'])
    },
    {
      code: dedent`
        /**
        * Does something.
       * @param {string} a - this is a
       * @return {Array<number>} The result of doing it
       */
        export function doSomething(a) { }`,
      errors: expecting(['use @returns instead'])
    },
    {
      code: dedent`
        /**
          * Does something.
         * @param {string} a - this is a
         * @return {Array<number>} The result of doing it
         */
          export default function doSomething(a) { }
      `,
      errors: expecting(['use @returns instead'])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'invalid-pref-arg',
  'should fail when using invalid JSDoc comments (prefer: { argument: "arg" })',
  { prefer: { 'argument': 'arg' } },
  [
    {
      code: dedent`
        /** Foo
         @argument {int} bar baz
          */
         function foo(bar){}`,
      errors: expecting([
        'use @arg instead',
        'missing JSDoc @returns for function'
      ])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'invalid-pref-rets-ret',
  'should fail when using invalid JSDoc comments (prefer: { returns: "return" })',
  { prefer: { 'returns': 'return' } },
  [
    {
      code: dedent`
        /** Foo
         */
        function foo(){}`,
      errors: expecting(['missing JSDoc @return for function'])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'invalid-match-desc',
  'should fail when using invalid JSDoc comments (matchDescription: "regex")',
  { matchDescription: MATCH_DESCRIPTION_TEST },
  [
    {
      code: dedent`
        /**
         * Start with caps and end with period
         * @return {void} */
         function foo(){}`,
      errors: expecting(['JSDoc description does not satisfy the regex pattern'])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'invalid-no-req-ret',
  'should fail when using invalid JSDoc comments (requireReturn: false)',
  [{ requireReturn: false }],
  [
    {
      code: dedent`
        /**
         * Foo
         * @param {string} a desc
         */
         function foo(a){var t = false; if(t) {return t;}}`,
      errors: expecting(['missing JSDoc @returns for function'])
    },
    {
      code: dedent`
        /**
         * Foo
         * @param {string} a desc
         */
         function foo(a){var t = false; if(t) {return null;}}`,
      errors: expecting(['missing JSDoc @returns for function'])
    },
    {
      code: dedent`
        /**
         * Foo
         * @param {string} a desc
         @returns {MyClass}*/
         function foo(a){var t = false; if(t) {process(t);}}`,
      errors: expecting(['unexpected @returns tag; function has no return statement'])
    },
    {
      code: '/** foo */ var foo = () => bar();',
      errors: expecting(['missing JSDoc @returns for function'])
    },
    {
      code: '/** foo */ var foo = () => { return bar(); };',
      errors: expecting(['missing JSDoc @returns for function'])
    },
    {
      code: '/** @returns {object} foo */ var foo = () => { bar(); };',
      errors: expecting(['unexpected @returns tag; function has no return statement'])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'invalid-req-ret-match',
  'should fail when using invalid JSDoc comments (matchDescription: "regex", requireReturn: false)',
  {
    requireReturn: false,
    matchDescription: MATCH_DESCRIPTION_TEST
  },
  [
    {
      code: dedent`
        /**
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
      errors: expecting(['JSDoc description does not satisfy the regex pattern'])
    },
    {
      code: dedent`
        /**
          * Description for a
          */
         var A = class {
             /**
              * Description for constructor.
              * @param {object[]} xs - xs
              */
             constructor(xs) {
                 this.a = xs;    }
         };
      `,
      errors: expecting(['JSDoc description does not satisfy the regex pattern'])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'issue227',
  'issue 227 - Should not complain about return in abstract method',
  {
    requireReturn: true
  },
  [
    {
      code: dedent`
        class Foo {
          /**
           * @return {string} string
           */
          public abstract foo(): string;
        }
        `
    }
  ]
);

ruleTester.addTestGroup('issue178', 'issue 178 - Should not crash with incorrect jsdoc', [
  {
    code: dedent`
      /**
      * @return string
      */
      function foo() { return ''; }
      `,
    options: {}, // Somehow the regex pattern we used before still lingers here, may be due
                 // to the static variables on the Rule definition.
    errors: expecting(['missing JSDoc return type'])
  },
  {
    code: dedent`
      /**
      * @return {string}
      */
      function foo() { return ''; }
      `,
    errors: expecting(['missing JSDoc return description'])
  },
  {
    code: dedent`
      /**
      * @return {some_type} some description
      */
      function foo() { return ''; }
      `
  }
]);

ruleTester.addTestGroupWithConfig(
  'issue238',
  "issue 238 - Cannot read property 'name' of null",
  {
    requireReturn: false,
    requireReturnType: false
  },
  [
    {
      code: dedent`
        class MyPage {
          /**
           * Navigate to the page
           * @returns a promise for the browser's navigation
           */
          public async navigateTo() { }
        }
        `
    }
  ]
);

ruleTester.addTestGroup('ret-type', 'should handle requireReturnType option', [
  {
    code: dedent`
      /**
       * Foo
       * @param {string} a desc
       * @return some string
       */
       function foo(a) { return '' }`,
    errors: expecting(['missing JSDoc return type'])
  },
  {
    code: dedent`
      /**
       * Foo
       * @param {string} a desc
       * @return some string
       */
       function foo(a) { return '' }`,
    options: { requireReturnType: false }
  }
]);

ruleTester.addTestGroup('param-type', 'should handle requireParamType option', [
  {
    code: dedent`
      /**
       * Foo
       * @param a desc
       * @return {string} some string
       */
       function foo(a) { return '' }`,
    errors: expecting(["missing JSDoc parameter type for 'a'"])
  },
  {
    code: dedent`
      /**
       * Foo
       * @param a desc
       * @return {string} some string
       */
       function foo(a) { return '' }`,
    options: { requireParamType: false }
  }
]);

ruleTester.addTestGroup('error-location', 'error location should span the comment', [
  {
    code: dedent`
      /**
       * Class
       */
      class Foo {

        /**
         * Function
         */
        public bar(x: any): void {
        }

      }`,
    options: { requireReturn: false },
    errors: [{
      failure: "missing JSDoc for parameter 'x'",
      startPosition: new Position(6, 2),
      endPosition: new Position(8, 5)
    }]
  }
]);

ruleTester.addTestGroup('never-or-void-return-type', 'functions that return "never" or "void" should not require @returns', [
  {
    code: dedent`
      /**
       * Has void return type.
       */
      function throwError(): void {
        throw new Error('Foo');
      }
      `,
    options: { requireReturn: false },
    errors: []
  },
  {
    code: dedent`
      /**
       * Has never return type.
       */
      function throwError(): never {
        throw new Error('Foo');
      }
      `,
    options: { requireReturn: false },
    errors: []
  },
  {
    code: dedent`
      /**
       * Returns result of never function, is void type, and does not have returns tag.
       */
      function callInfinite(): void {
        return neverReturn();
      }

      /**
       * Has never return type.
       */
      function neverReturn(): never {
        while (true) {};
      }
      `,
    options: { requireReturn: false },
    errors: []
  },
  {
    code: dedent`
      /**
       * Returns result of never function, is never type, and does not have returns tag.
       */
      function callInfinite(): never {
        return neverReturn();
      }

      /**
       * Has never return type.
       */
      function neverReturn(): never {
        while (true) {};
      }
      `,
    options: { requireReturn: false },
    errors: []
  },
  {
    code: dedent`
      /**
       * Returns result of never function, is void type, but has returns tag.
       * @returns something
       */
      function callInfinite(): void {
        return neverReturn();
      }

      /**
       * Has never return type.
       */
      function neverReturn(): never {
        while (true) {};
      }
      `,
    options: { requireReturn: false, requireReturnType: false },
    errors: []
  },
  {
    code: dedent`
      /**
       * Returns result of never function, is never type, but has returns tag.
       * @returns something
       */
      function callInfinite(): never {
        return neverReturn();
      }

      /**
       * Has never return type.
       */
      function neverReturn(): never {
        while (true) {};
      }
      `,
    options: { requireReturn: false, requireReturnType: false },
    errors: []
  },
  {
    code: dedent`
      /**
       * Is void type, but requires returns tag.
       * @returns something
       */
      function callInfinite(): void {
        return neverReturn();
      }

      /**
       * Has never return type.
       * @returns something
       */
      function neverReturn(): never {
        while (true) {};
      }
      `,
    options: { requireReturn: true, requireReturnType: false },
    errors: []
  },
  {
    code: dedent`
      /**
       * Is never type, but requires returns tag.
       * @returns something
       */
      function callInfinite(): never {
        return neverReturn();
      }

      /**
       * Has never return type.
       * @returns something
       */
      function neverReturn(): never {
        while (true) {};
      }
      `,
    options: { requireReturn: true, requireReturnType: false },
    errors: []
  }
]);

ruleTester.runTests();
