import { RuleTester, Failure, Position, dedent, readFixture } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/tests/lib/rules/indent.js
// TODO: Split tests into better categories for easy finding

type NumStr = number | string;
const ruleTester = new RuleTester('ter-indent', true);

function expecting(errors: [[number, NumStr, NumStr]], indentType: string = 'space'): Failure[] {
  return errors.map((err) => {
    let message;

    if (typeof err[1] === 'string' && typeof err[2] === 'string') {
      message = `Expected indentation of ${err[1]} but found ${err[2]}.`;
    } else {
      const chars = indentType + (err[1] === 1 ? '' : 's');
      message = `Expected indentation of ${err[1]} ${chars} but found ${err[2]}.`;
    }

    return {
      failure: message,
      startPosition: new Position(err[0]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('no-options', 'should capture the correct indentation with defaults', [
  'export let upgradeModule = angular.module("ui.router.upgrade", ["ui.router"]);',
  'switch (0) {\n}',
  'switch(value){ default: a(); break; }\n',
  dedent`
    return (
        foo
    );`,
  dedent`
    return (
        foo
    )`,
  dedent`
    const array = [
        ,
        'd',
        3
    ];
    `,
  dedent`
    switch (a) {
    case 'foo':
        a();
        break;
    case 'bar':
        switch(x){
        case '1':
            break;
        case '2':
            a = 6;
            break;
        }
    }`,
  dedent`
    switch (a) {
    case 'foo':
        a();
        break;
    case 'bar':
        if(x){
            a = 2;
        }
        else{
            a = 6;
        }
    }`,
  dedent`
    switch (a) {
    case "foo":
        a();
        break;
    case "bar":
        if(x){
            a = 2;
        }
        else
            a = 6;
    }`,
  dedent`
    switch (a) {
    case "foo":
        a();
        break;
    case "bar":
        a(); break;
    case "baz":
        a(); break;
    }`,
  dedent`
    function foo() {
        var a = "a";
        switch(a) {
        case "a":
            return "A";
        case "b":
            return "B";
        }
    }
    foo();`,
  dedent`
    var obj = {foo: 1, bar: 2};
    with (obj) {
        console.log(foo + bar);
    }
    `,
  dedent`
    var a = 1
       ,b = 2
       ;
    `,
  dedent`
    const a: number = 1
         ,b: number = 2
         ;
    `,
  dedent`
    const someOtherFunction = argument => {
            console.log(argument);
        },
        someOtherValue = 'someOtherValue';
    `,
  dedent`
    if (a) {
        (1 + 2 + 3);
    }
    `
]);

ruleTester.addTestGroup('indent-number', 'should force a certain indentation number', [
  {
    code: dedent`
      /**
       * @var {string}
       */
      const FOO = 'bar';`,
    options: [4]
  },
  {
    code: dedent`
      /**
       * @var {string}
       */
       const FOO = 'bar';`,
    options: [4],
    errors: expecting([[4, 0, 1]])
  },
  {
    code: dedent`
      /**
       * @param {string} text
       */
      const log = (text) => console.log(text);`,
    options: [4]
  },
  {
    code: dedent`
      var x = [
          'a',
          'b',
          'c'
      ];`,
    options: [4]
  },
  {
    code: dedent`
      var x = ['a',
          'b',
          'c',
      ];`,
    options: [4]
  },
  {
    code: "import {addons} from 'react/addons'\nimport React from 'react'",
    options: [2]
  },
  {
    code: dedent`
      bridge.callHandler(
        'getAppVersion', 'test23', function(responseData) {
          window.ah.mobileAppVersion = responseData;
        }
      );
      `,
    options: [2]
  },
  {
    code: dedent`
      bridge.callHandler(
        'getAppVersion', 'test23', function(responseData) {
          window.ah.mobileAppVersion = responseData;
        });
      `,
    options: [2]
  },
  {
    code: dedent`
      bridge.callHandler(
        'getAppVersion',
        null,
        function responseCallback(responseData) {
          window.ah.mobileAppVersion = responseData;
        }
      );
      `,
    options: [2]
  },
  {
    code: dedent`
      bridge.callHandler(
        'getAppVersion',
        null,
        function responseCallback(responseData) {
          window.ah.mobileAppVersion = responseData;
        });
      `,
    options: [2]
  },
  {
    code: dedent`
      function doStuff(keys) {
          _.forEach(
              keys,
              key => {
                  doSomething(key);
              }
         );
      }
      `,
    options: [4]
  },
  {
    code: dedent`
      example(
          function () {
              console.log('example');
          }
      );
      `,
    options: [4]
  },
  {
    code: dedent`
      let foo = somethingList
          .filter(x => {
              return x;
          })
          .map(x => {
              return 100 * x;
          });
      `,
    options: [4]
  },
  {
    code: dedent`
      var x = 0 &&
          {
              a: 1,
              b: 2
          };
      `,
    options: [4]
  },
  {
    code: [
      'var x = 0 &&',
      '\t{',
      '\t\ta: 1,',
      '\t\tb: 2',
      '\t};'
    ].join('\n'),
    options: ['tab']
  },
  {
    code: dedent`
      var x = 0 &&
          {
              a: 1,
              b: 2
          }||
          {
              c: 3,
              d: 4
          };
      `,
    options: [4]
  },
  {
    code: 'var x = 0 && 1;',
    options: [4]
  },
  {
    code: 'var x = 0 && { a: 1, b: 2 };',
    options: [4]
  },
  {
    code: dedent`
      var x = 0 &&
          (
              1
          );`,
    options: [4]
  },
  {
    code: 'var x = 0 && { a: 1, b: 2 };',
    options: [4]
  },
  {
    code: dedent`
      require('http').request({hostname: 'localhost',
        port: 80}, function(res) {
        res.end();
      });
      `,
    options: [2]
  },
  {
    code: dedent`
      function test() {
        return client.signUp(email, PASSWORD, { preVerified: true })
          .then(function (result) {
            // hi
          })
          .then(function () {
            return FunctionalHelpers.clearBrowserState(self, {
              contentServer: true,
              contentServer1: true
            });
          });
      }`,
    options: [2]
  },
  {
    code: dedent`
      it('should... some lengthy test description that is forced to be' +
        'wrapped into two lines since the line length limit is set', () => {
        expect(true).toBe(true);
      });
      `,
    options: [2]
  },
  {
    code: dedent`
      function test() {
          return client.signUp(email, PASSWORD, { preVerified: true })
              .then(function (result) {
                  var x = 1;
                  var y = 1;
              }, function(err){
                  var o = 1 - 2;
                  var y = 1 - 2;
                  return true;
              })
      }`,
    options: [4]
  },
  {
    code: dedent`
      if (1 < 2){
      //hi sd
      }`,
    options: [2]
  },
  {
    code: dedent`
      while (1 < 2){
        //hi sd
      }`,
    options: [2]
  },
  {
    code: dedent`
      while (1 < 2) console.log('hi');`,
    options: [2]
  },
  {
    code: dedent`
      [a, b,
          c].forEach((index) => {
              index;
          });
      `,
    options: [4]
  },
  {
    code: dedent`
      [a, b, c].forEach((index) => {
          index;
      });
      `,
    options: [4]
  },
  {
    code: dedent`
      [a, b, c].forEach(function(index){
          return index;
      });
      `,
    options: [4]
  },
  {
    code: dedent`
      var a = 1,
          b = 2,
          c = 3;
      `,
    options: [4]
  },
  {
    code: dedent`
      var a = 1
         ,b = 2
         ,c = 3;
      `,
    options: [4]
  },
  {
    code: "while (1 < 2) console.log('hi')\n",
    options: [2]
  },
  {
    code: dedent`
      module.exports =
      {
        'Unit tests':
        {
          rootPath: './',
          environment: 'node',
          tests:
          [
            'test/test-*.js'
          ],
          sources:
          [
            '*.js',
            'test/**.js'
          ]
        }
      };`,
    options: [2]
  },
  {
    code: dedent`
      var path     = require('path')
        , crypto    = require('crypto')
        ;
      `,
    options: [2]
  },
  {
    code: dedent`
      export function create (some,
                              argument) {
        return Object.create({
          a: some,
          b: argument
        });
      };`,
    options: [2]
  },
  {
    code: dedent`
      export function create (id, xfilter, rawType,
                              width=defaultWidth, height=defaultHeight,
                              footerHeight=defaultFooterHeight,
                              padding=defaultPadding) {
        // ... function body, indented two spaces
      }
      `,
    options: [2]
  },
  {
    code: dedent`
      var obj = {
        foo: function () {
          return new p()
            .then(function (ok) {
              return ok;
            }, function () {
              // ignore things
            });
        }
      };
      `,
    options: [2]
  },
  {
    code: dedent`
      a.b()
        .c(function(){
          var a;
        }).d.e;
      `,
    options: [2]
  },
  {
    code: dedent`
      var foo = 'foo',
        bar = 'bar',
        baz = function() {

        }

      function hello () {

      }
      `,
    options: [2]
  },
  {
    code: dedent`
      var obj = {
        send: function () {
          return P.resolve({
            type: 'POST'
          })
            .then(function () {
              return true;
            }, function () {
              return false;
            });
        }
      };
      `,
    options: [2]
  },
  {
    code: dedent`
      [
        'a',
        'b'
      ].sort().should.deepEqual([
        'x',
        'y'
      ]);
      `,
    options: [2]
  },
  {
    code: dedent`
      var a = {
        some: 1
      , name: 2
      };
      `,
    options: [2]
  },
  {
    code: dedent`
      a.c = {
          aa: function() {
              'test1';
              return 'aa';
          }
          , bb: function() {
              return this.bb();
          }
      };
      `,
    options: [4]
  },
  {
    code: dedent`
      const func = function (opts) {
          return Promise.resolve()
              .then(() => {
                  [
                      'ONE', 'TWO'
                  ].forEach(command => { doSomething(); });
              });
      };`,
    options: [4]
  },
  {
    code: dedent`
      var haveFun = function () {
          SillyFunction(
              {
                  value: true,
              },
              {
                  _id: true,
              }
          );
      };`,
    options: [4]
  },
  {
    code: dedent`
      var haveFun = function () {
          new SillyFunction(
              {
                  value: true,
              },
              {
                  _id: true,
              }
          );
      };`,
    options: [4]
  },
  {
    code: dedent`
      let object1 = {
        doThing() {
          return _.chain([])
            .map(v => (
              {
                value: true,
              }
            ))
            .value();
        }
      };`,
    options: [2]
  },
  {
    code: dedent`
      class Foo
        extends Bar {
        baz() {}
      }`,
    options: [2]
  },
  {
    code: dedent`
      class Foo extends
        Bar {
        baz() {}
      }`,
    options: [2]
  },
  {
    code: dedent`
      if (foo) {
        bar();
      } else if (baz) {
        foobar();
      } else if (qux) {
        qux();
      }`,
    options: [2]
  },
  {
    code: [
      'function foo() {',
      '  bar();',
      '   \t\t}'
    ].join('\n'),
    options: [2]
  },
  {
    code: [
      'function foo() {',
      '  bar();',
      '  \tbaz();',
      '\t   \t\t\t  \t\t\t  \t   \tqux();',
      '}'
    ].join('\n'),
    options: [2]
  },
  {
    code: dedent`
      function foo() {
        return (bar === 1 || bar === 2 &&
          (/Function/.test(grandparent.type))) &&
          directives(parent).indexOf(node) >= 0;
      }`,
    options: [2]
  },
  {
    code: dedent`
      function foo() {
        return (bar === 1 || bar === 2) &&
          (z === 3 || z === 4);
      }`,
    options: [2]
  },
  {
    code: dedent`
      function foo() {
        return ((bar === 1 || bar === 2) &&
          (z === 3 || z === 4)
        );
      }`,
    options: [2]
  },
  {
    code: dedent`
      function foo() {
        return ((bar === 1 || bar === 2) &&
          (z === 3 || z === 4));
      }`,
    options: [2]
  },
  {
    code: dedent`
      var foo = function() {
        return bar(
          [{
          }].concat(baz)
        );
      };`,
    options: [2]
  },
  {
    code: dedent`
      /**
       * foo
       * @param bar
       * @param baz
       */
      export const foo = function(bar, baz) {
        return bar(
          [{
          }].concat(baz)
        );
      }`,
    options: [2]
  }
]);

ruleTester.addTestGroup('indent-number-errors', 'should warn of indentation errors', [
  {
    code: dedent`
      /**/var b; // NO ERROR: single line multi-line comments followed by code is OK
      /*
       *
       */ var b; // ERROR: multi-line comments followed by code is not OK
      `,
    options: [2],
    errors: expecting([[4, 0, 1]])
  },
  {
    code: dedent`
      var a = b;
      if (a) {
      b();
      }`,
    options: [2],
    errors: expecting([[3, 2, 0]])
  },
  {
    code: dedent`
      if (array.some(function(){
        return true;
      })) {
      a++; // ->
        b++;
          c++; // <-
      }`,
    options: [2],
    errors: expecting([[4, 2, 0], [6, 2, 4]])
  },
  {
    code: '\nif (a){\n\tb=c;\n\t\tc=d;\ne=f;\n}',
    options: ['tab'],
    errors: expecting(
      [
        [3, 1, 2],
        [4, 1, 0]
      ],
      'tab'
    )
  },
  {
    code: '\nif (a){\n    b=c;\n      c=d;\n e=f;\n}',
    options: [4],
    errors: expecting([[3, 4, 6], [4, 4, 1]])
  },

  {
    code: dedent`
      var x = 0 &&
          {
             a: 1,
                b: 2
          };`,
    options: [4],
    errors: expecting([[3, 8, 7], [4, 8, 10]])
  },
  {
    code: dedent`
      switch(value){
      case "1":
              a();
              break;
          case "2":
              break;
          default:
              break;
      }`,
    options: [4],
    errors: expecting([
      [3, 4, 8],
      [4, 4, 8],
      [5, 0, 4],
      [6, 4, 8],
      [7, 0, 4],
      [8, 4, 8]
    ])
  },
  {
    code: dedent`
      var obj = {foo: 1, bar: 2};
      with (obj) {
      console.log(foo + bar);
      }`,
    errors: expecting([[3, 4, 0]])
  },
  {
    code: '\nwhile (a)\nb();\n',
    options: [4],
    errors: expecting([[2, 4, 0]])
  },
  {
    code: '\nfor (;;) \nb();\n',
    options: [4],
    errors: expecting([[2, 4, 0]])
  },
  {
    code: '\nfor (a in x) \nb();',
    options: [4],
    errors: expecting([[2, 4, 0]])
  },
  {
    code: dedent`
      do
      b();
      while(true)`,
    options: [4],
    errors: expecting([[2, 4, 0]])
  },
  {
    code: '\nif(true) \nb();',
    options: [4],
    errors: expecting([[2, 4, 0]])
  },
  {
    code: dedent`
      var test = {
            a: 1,
          b: 2
          };`,
    options: [2],
    errors: expecting([
      [2, 2, 6],
      [3, 2, 4],
      [4, 0, 4]
    ])
  },
  {
    code: dedent`
      var a = function() {
            a++;
          b++;
                c++;
          },
          b;`,
    options: [4],
    errors: expecting([
      [2, 8, 6],
      [3, 8, 4],
      [4, 8, 10]
    ])
  },
  {
    code: dedent`
      var a = 1,
      b = 2,
      c = 3;`,
    options: [4],
    errors: expecting([
      [2, 4, 0],
      [3, 4, 0]
    ])
  },
  {
    code: dedent`
      [a, b,
      c].forEach((index) => {
        index;
      });`,
    options: [4],
    errors: expecting([[2, 4, 0], [3, 4, 2]])
  },
  {
    code: dedent`
      [a, b,
      c].forEach(function(index){
        return index;
      });`,
    options: [4],
    errors: expecting([[2, 4, 0], [3, 4, 2]])
  },
  {
    code: dedent`
      [a, b,
      c].forEach(function(index){
          return index;
      });`,
    options: [4],
    errors: expecting([[2, 4, 0]])
  },
  {
    code: dedent`
      [a, b, c].forEach((index) => {
        index;
      });`,
    options: [4],
    errors: expecting([[2, 4, 2]])
  },
  {
    code: dedent`
      [a, b, c].forEach(function(index){
        return index;
      });`,
    options: [4],
    errors: expecting([[2, 4, 2]])
  },
  {
    code: "\nwhile (1 < 2)\nconsole.log('foo')\n  console.log('bar')",
    options: [2],
    errors: expecting([
      [2, 2, 0],
      [3, 0, 2]
    ])
  },
  {
    code: dedent`
      var a = new Test({
            a: 1
        }),
          b = 4;`,
    options: [4],
    errors: expecting([
      [2, 8, 6],
      [3, 4, 2]
    ])
  },
  {
    code: dedent`
      var path     = require('path')
       , crypto    = require('crypto')
      ;`,
    options: [2],
    errors: expecting([[3, 1, 0]])
  },
  {
    code: dedent`
      var a = 1
         ,b = 2
      ;`,
    errors: expecting([[3, 3, 0]])
  },
  {
    code: dedent`
      {
          if(a){
              foo();
          }
        else{
              bar();
          }
      }`,
    options: [4],
    errors: expecting([[5, 4, 2]])
  },
  {
    code: dedent`
      {
          if(a){
              foo();
          }
        else
              bar();

      }`,
    options: [4],
    errors: expecting([[5, 4, 2]])
  },
  {
    code: dedent`
      {
          if(a)
              foo();
        else
              bar();
      }`,
    options: [4],
    errors: expecting([[4, 4, 2]])
  },
  {
    code: dedent`
      if (foo) bar();
      else if (baz) foobar();
        else if (qux) qux();`,
    options: [2],
    errors: expecting([[3, 0, 2]])
  },
  {
    code: dedent`
      if (foo) bar();
      else if (baz) foobar();
        else qux();`,
    options: [2],
    errors: expecting([[3, 0, 2]])
  },
  {
    code: dedent`
      foo();
        if (baz) foobar();
        else qux();`,
    options: [2],
    errors: expecting([[2, 0, 2], [3, 0, 2]])
  },
  {
    code: dedent`
      if (foo) bar();
      else if (baz) foobar();
           else if (bip) {
             qux();
           }`,
    options: [2],
    errors: expecting([[3, 0, 5]])
  },
  {
    code: dedent`
      if (foo) bar();
      else if (baz) {
          foobar();
           } else if (boop) {
             qux();
           }`,
    options: [2],
    errors: expecting([[3, 2, 4], [4, 0, 5]])
  },
  {
    code: '\nvar foo = bar;\n\t\t\tvar baz = qux;',
    options: [2],
    errors: expecting([[2, '0 spaces', '3 tabs']])
  },
  {
    code: '\nfunction foo() {\n\tbar();\n  baz();\n              qux();\n}',
    options: ['tab'],
    errors: expecting([[3, '1 tab', '2 spaces'], [4, '1 tab', '14 spaces']], 'tab')
  },
  {
    code: [
      '\nfunction foo() {',
      '  bar();',
      '\t\t}'
    ].join('\n'),
    options: [2],
    errors: expecting([[3, '0 spaces', '2 tabs']])
  },
  {
    code: dedent`
      require('http').request({hostname: 'localhost',
                        port: 80}, function(res) {
        res.end();
      });
      `,
    options: [2],
    errors: expecting([[2, 2, 18]])
  },
  {
    code: dedent`
      var x = ['a',
               'b',
               'c'
      ];`,
    output: dedent`
      var x = ['a',
          'b',
          'c'
      ];`,
    options: [4],
    errors: expecting([
      [2, 4, 9],
      [3, 4, 9]
    ])
  },
  {
    code: dedent`
      var x = [
               'a',
               'b',
               'c'
      ];`,
    output: dedent`
      var x = [
          'a',
          'b',
          'c'
      ];`,
    options: [4],
    errors: expecting([
      [2, 4, 9],
      [3, 4, 9],
      [4, 4, 9]
    ])
  },
  {
    code: dedent`
      var x = [
               'a',
               'b',
               'c',
      'd'];`,
    output: dedent`
      var x = [
          'a',
          'b',
          'c',
          'd'];`,
    options: [4],
    errors: expecting([
      [2, 4, 9],
      [3, 4, 9],
      [4, 4, 9],
      [5, 4, 0]
    ])
  },
  {
    code: dedent`
      var x = [
               'a',
               'b',
               'c'
        ];`,
    output: dedent`
      var x = [
          'a',
          'b',
          'c'
      ];`,
    options: [4],
    errors: expecting([
      [2, 4, 9],
      [3, 4, 9],
      [4, 4, 9],
      [5, 0, 2]
    ])
  }
]);

ruleTester.addTestGroup('decorators', 'should handle properties with decorators', [
  {
    code: dedent`
      class MyComponent {
          @Input prop: number;
      }
    `
  },
  {
    code: dedent`
      class MyComponent {
       @Input prop: number;
      }
    `,
    errors: expecting([[2, 4, 1]])
  }
]);

ruleTester.addTestGroup('member-expression', 'should handle member expression statements', [
  {
    code: dedent`
      this.http.get('/')
        .map(res => res.json())`,
    options: [2, { MemberExpression: 1 }]
  },
  {
    code: dedent`
      function test() {
          return client.signUp(email, PASSWORD, { preVerified: true })
          .then(function (result) {
              var x = 1;
              var y = 1;
          }, function(err){
              var o = 1 - 2;
              var y = 1 - 2;
              return true;
          });
      }`,
    options: [4, { MemberExpression: 0 }]
  },
  {
    code: dedent`
      var obj = {
        send: function () {
          return P.resolve({
            type: 'POST'
          })
          .then(function () {
            return true;
          }, function () {
            return false;
          });
        }
      };
      `,
    options: [2, { MemberExpression: 0 }]
  },
  {
    code: dedent`
      const func = function (opts) {
          return Promise.resolve()
          .then(() => {
              [
                  'ONE', 'TWO'
              ].forEach(command => { doSomething(); });
          });
      };`,
    options: [4, { MemberExpression: 0 }]
  },
  {
    code: dedent`
      Buffer.length
      `,
    options: [4, { MemberExpression: 1 }]
  },
  {
    code: dedent`
      Buffer
          .indexOf('a')
          .toString()
      `,
    options: [4, { MemberExpression: 1 }]
  },
  {
    code: dedent`
      Buffer.
          length
      `,
    options: [4, { MemberExpression: 1 }]
  },
  {
    code: dedent`
      Buffer
          .foo
          .bar
      `,
    options: [4, { MemberExpression: 1 }]
  },
  {
    code: [
      'Buffer',
      '\t.foo',
      '\t.bar'
    ].join('\n'),
    options: ['tab', { MemberExpression: 1 }]
  },
  {
    code: dedent`
      Buffer
          .foo
          .bar`,
    options: [2, { MemberExpression: 2 }]
  },
  {
    code: dedent`
      MemberExpression
      .
        .o
          .
       .default();`,
    options: [4]
  },
  {
    code: dedent`
      foo = bar.baz()
              .bip();`,
    options: [4, { MemberExpression: 1 }]
  },
  {
    code: '\nBuffer\n.toString()',
    options: [4, { MemberExpression: 1 }],
    errors: expecting([[2, 4, 0]])
  },
  {
    code: dedent`
      Buffer
          .indexOf('a')
      .toString()`,
    options: [4, { MemberExpression: 1 }],
    errors: expecting([[3, 4, 0]])
  },
  {
    code: '\nBuffer.\nlength',
    options: [4, { MemberExpression: 1 }],
    errors: expecting([[2, 4, 0]])
  },
  {
    code: '\nBuffer.\n\t\tlength',
    options: ['tab', { MemberExpression: 1 }],
    errors: expecting([[2, 1, 2]], 'tab')
  },
  {
    code: '\nBuffer\n  .foo\n  .bar',
    options: [2, { MemberExpression: 2 }],
    errors: expecting([[2, 4, 2], [3, 4, 2]])
  },
  {
    code: dedent`
      var foo = function(){
          foo
                .bar
      }`,
    options: [4, { MemberExpression: 1 }],
    errors: expecting([[3, 8, 10]])
  },
  {
    code: dedent`
      var foo = function(){
          foo
                   .bar
      }`,
    options: [4, { MemberExpression: 2 }],
    errors: expecting([[3, 12, 13]])
  },
  {
    code: dedent`
      var foo = () => {
          foo
                   .bar
      }`,
    options: [4, { MemberExpression: 2 }],
    errors: expecting([[3, 12, 13]])
  },
  {
    code: dedent`
      TestClass.prototype.method = function () {
        return Promise.resolve(3)
            .then(function (x) {
              return x;
            });
      };`,
    options: [2, { MemberExpression: 1 }],
    errors: expecting([[3, 4, 6]])
  }
]);

ruleTester.addTestGroup('fixture', 'should check the "indent-invalid.txt" fixture file', [
  {
    code: '\n' + readFixture('indent-invalid.txt'),
    options: [2, { SwitchCase: 1, MemberExpression: 1 }],
    errors: expecting([
      [5, 2, 4],
      [10, 4, 6],
      [11, 2, 4],
      [15, 4, 2],
      [16, 2, 4],
      [23, 2, 4],
      [29, 2, 4],
      [31, 4, 2],
      [36, 4, 6],
      [38, 2, 4],
      [39, 4, 2],
      [40, 2, 0],
      [46, 0, 1],
      [54, 2, 4],
      [114, 4, 2],
      [120, 4, 6],
      [124, 4, 2],
      [134, 4, 6],
      [138, 2, 3],
      [139, 2, 3],
      [143, 4, 0],
      [151, 4, 6],
      [159, 4, 2],
      [161, 4, 6],
      [175, 2, 0],
      [177, 2, 4],
      [189, 2, 0],
      [193, 6, 4],
      [195, 6, 8],
      [304, 4, 6],
      [306, 4, 8],
      [307, 2, 4],
      [308, 2, 4],
      [311, 4, 6],
      [312, 4, 6],
      [313, 4, 6],
      [314, 2, 4],
      [315, 2, 4],
      [318, 4, 6],
      [319, 4, 6],
      [320, 4, 6],
      [321, 2, 4],
      [322, 2, 4],
      [326, 2, 1],
      [327, 2, 1],
      [328, 2, 1],
      [329, 2, 1],
      [330, 2, 1],
      [331, 2, 1],
      [332, 2, 1],
      [333, 2, 1],
      [334, 2, 1],
      [335, 2, 1],
      [340, 2, 4],
      [341, 2, 0],
      [344, 2, 4],
      [345, 2, 0],
      [348, 2, 4],
      [349, 2, 0],
      [355, 2, 0],
      [357, 2, 4],
      [361, 4, 6],
      [362, 2, 4],
      [363, 2, 4],
      [368, 2, 0],
      [370, 2, 4],
      [374, 4, 6],
      [376, 4, 2],
      [383, 2, 0],
      [385, 2, 4],
      [390, 2, 0],
      [392, 2, 4],
      [409, 2, 0],
      [410, 2, 4],
      [416, 2, 0],
      [417, 2, 4],
      [422, 2, 4],
      [423, 2, 0],
      [427, 2, 6],
      [428, 2, 8],
      [429, 2, 4],
      [430, 0, 4],
      [433, 2, 4],
      [434, 0, 4],
      [437, 2, 0],
      [438, 0, 4],
      [451, 2, 0],
      [453, 2, 4],
      [499, 6, 8],
      [500, 10, 8],
      [501, 8, 6],
      [506, 6, 8]
    ])
  }
]);

ruleTester.addTestGroup('variable-declarator', 'should handle variable declarator options', [
  {
    code: dedent`
      var geometry = 2,
      rotate = 2;`,
    options: [2, { VariableDeclarator: 0 }]
  },
  {
    code: dedent`
      var geometry,
          rotate;`,
    options: [4, { VariableDeclarator: 1 }]
  },
  {
    code: [
      'var geometry,',
      '\trotate;'
    ].join('\n'),
    options: ['tab', { VariableDeclarator: 1 }]
  },
  {
    code: dedent`
      var geometry,
        rotate;`,
    options: [2, { VariableDeclarator: 1 }]
  },
  {
    code: dedent`
      var geometry,
          rotate;`,
    options: [2, { VariableDeclarator: 2 }]
  },
  {
    code: dedent`
      let geometry,
          rotate;`,
    options: [2, { VariableDeclarator: 2 }]
  },
  {
    code: dedent`
      const geometry = 2,
          rotate = 3;`,
    options: [2, { VariableDeclarator: 2 }]
  },
  {
    code: dedent`
      var items = [
        {
          foo: 'bar'
        }
      ];
      `,
    options: [2, { VariableDeclarator: 2 }]
  },
  {
    code: dedent`
      const a = 1,
            b = 2;
      const items1 = [
        {
          foo: 'bar'
        }
      ];
      const items2 = Items(
        {
          foo: 'bar'
        }
      );
      `,
    options: [2, { VariableDeclarator: 3 }]
  },
  {
    code: dedent`
      const geometry = 2,
            rotate = 3;
      var a = 1,
        b = 2;
      let light = true,
          shadow = false;`,
    options: [2, { VariableDeclarator: { const: 3, let: 2 } }]
  },
  {
    code: dedent`
        const YO = 'bah',
              TE = 'mah'

        var res,
            a = 5,
            b = 4
        `,
    options: [2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }]
  },
  {
    code: dedent`
        const YO = 'bah',
              TE = 'mah'

        var res,
            a = 5,
            b = 4

        if (YO) console.log(TE)`,
    options: [2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }]
  },
  {
    code: dedent`
        var Command = function() {
          var fileList = [],
              files = []

          files.concat(fileList)
        };
        `,
    options: [2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }]
  },
  {
    code: '\nvar geometry,\nrotate;',
    options: [2, { VariableDeclarator: 1 }],
    errors: expecting([[2, 2, 0]])
  },
  {
    code: '\nvar geometry,\n  rotate;',
    options: [2, { VariableDeclarator: 2 }],
    errors: expecting([[2, 4, 2]])
  },
  {
    code: '\nvar geometry,\n\trotate;',
    options: ['tab', { VariableDeclarator: 2 }],
    errors: expecting([[2, 2, 1]], 'tab')
  },
  {
    code: '\nlet geometry,\n  rotate;',
    options: [2, { VariableDeclarator: 2 }],
    errors: expecting([[2, 4, 2]])
  },
  {
    code: dedent`
      /**
       * @var {number}
       * @var {number}
       */
      var geometry,
          rotate;`,
    options: [4, { VariableDeclarator: 1 }]
  },
  {
    code: dedent`
      /**
       * @var {number}
       * @var {number}
       */
      var geometry,
         rotate;`,
    options: [4, { VariableDeclarator: 1 }],
    errors: expecting([[6, 4, 3]])
  },
  {
    code: dedent`
      var a = new Test({
            a: 1
          }),
          b = 4;
      const a = new Test({
            a: 1
          }),
          b = 4;`,
    options: [2, { VariableDeclarator: { var: 2 } }],
    errors: expecting([
      [6, 4, 6],
      [7, 2, 4],
      [8, 2, 4]
    ])
  }
]);

ruleTester.addTestGroup('switch-case', 'should handle switch case', [
  {
    code: dedent`
      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,
        height, rotate;
      `,
    options: [2, { SwitchCase: 1 }]
  },
  {
    code: dedent`
      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth;
      `,
    options: [2, { SwitchCase: 1 }]
  },
  {
    code: dedent`
      switch (x) {
          case "foo":
              a();
              break;
          case "bar":
              switch (y) {
                  case "1":
                      break;
                  case "2":
                      a = 6;
                      break;
              }
          case "test":
              break;
      }`,
    options: [4, { SwitchCase: 1 }]
  },
  {
    code: dedent`
      switch (x) {
              case "foo":
                  a();
                  break;
              case "bar":
                  switch (y) {
                          case "1":
                              break;
                          case "2":
                              a = 6;
                              break;
                  }
              case "test":
                  break;
      }`,
    options: [4, { SwitchCase: 2 }]
  },
  {
    code: dedent`
      switch(value){
          case "1":
          case "2":
              a();
              break;
          default:
              a();
              break;
      }
      switch(value){
          case "1":
              a();
              break;
          case "2":
              break;
          default:
              break;
      }`,
    options: [4, { SwitchCase: 1 }]
  },
  {
    code: dedent`
        function salutation () {
          switch (1) {
            case 0: return console.log('hi')
            case 1: return console.log('hey')
          }
        }
        `,
    options: [2, { SwitchCase: 1 }]
  },
  {
    code: dedent`
        switch(value){
            case "1":
                a();
            break;
            case "2":
                a();
            break;
            default:
                a();
                break;
        }`,
    options: [4, { SwitchCase: 1 }],
    errors: expecting([[4, 8, 4], [7, 8, 4]])
  },
  {
    code: dedent`
        switch(value){
            case "1":
                a();
                break;
            case "2":
                a();
                break;
            default:
            break;
        }`,
    options: [4, { SwitchCase: 1 }],
    errors: expecting([[9, 8, 4]])
  },
  {
    code: dedent`
        switch(value){
            case "1":
            case "2":
                a();
                break;
            default:
                break;
        }
        switch(value){
            case "1":
            break;
            case "2":
                a();
            break;
            default:
                a();
            break;
        }`,
    options: [4, { SwitchCase: 1 }],
    errors: expecting([[11, 8, 4], [14, 8, 4], [17, 8, 4]])
  },
  {
    code: dedent`
        switch (a) {
        case '1':
        b();
        break;
        default:
        c();
        break;
        }`,
    options: [4, { SwitchCase: 1 }],
    errors: expecting([
      [2, 4, 0],
      [3, 8, 0],
      [4, 8, 0],
      [5, 4, 0],
      [6, 8, 0],
      [7, 8, 0]
    ])
  },
  {
    code: dedent`
        function salutation () {
          switch (1) {
          case 0: return console.log('hi')
            case 1: return console.log('hey')
          }
        }`,
    options: [2, { SwitchCase: 1 }],
    errors: expecting([
      [3, 4, 2]
    ])
  },
  {
    code: dedent`
        var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,
        height, rotate;`,
    options: [2, { SwitchCase: 1 }],
    errors: expecting([
      [2, 2, 0]
    ])
  },
  {
    code: dedent`
        switch (a) {
        case '1':
        b();
        break;
        default:
        c();
        break;
        }`,
    options: [4, { SwitchCase: 2 }],
    errors: expecting([
      [2, 8, 0],
      [3, 12, 0],
      [4, 12, 0],
      [5, 8, 0],
      [6, 12, 0],
      [7, 12, 0]
    ])
  }
]);

ruleTester.addTestGroup('var-dec/switch-case', 'should handle var declarator and switch cases', [
  {
    code: '// hi',
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: '  ',
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      if(data) {
        console.log('hi');
        b = true;};`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      foo = () => {
        console.log('hi');
        return true;};`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      function test(data) {
        console.log('hi');
        return true;};`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var test = function(data) {
        console.log('hi');
      };`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      arr.forEach(function(data) {
        otherdata.forEach(function(zero) {
          console.log('hi');
        }) });`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      a = [
          ,3
      ]`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      [
        ['gzip', 'gunzip'],
        ['gzip', 'unzip'],
        ['deflate', 'inflate'],
        ['deflateRaw', 'inflateRaw'],
      ].forEach(function(method) {
        console.log(method);
      });
      `,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      test(123, {
          bye: {
              hi: [1,
                  {
                      b: 2
                  }
              ]
          }
      });`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var xyz = 2,
          lmn = [
              {
                  a: 1
              }
          ];`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      lmn = [{
          a: 1
      },
      {
          b: 2

      {
          x: 2
      }];`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      abc({
          test: [
              [
                  c,
                  xyz,
                  2
              ].join(',')
          ]
      });`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      abc = {
        test: [
          [
            c,
            xyz,
            2
          ]
        ]
      };`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      abc(
        {
          a: 1,
          b: 2
        }
      );`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      abc({
          a: 1,
          b: 2
      });`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var abc =
        [
          c,
          xyz,
          {
            a: 1,
            b: 2
          }
        ];`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var abc = [
        c,
        xyz,
        {
          a: 1,
          b: 2
        }
      ];`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var abc = 5,
          c = 2,
          xyz =
          {
            a: 1,
            b: 2
          };`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var abc =
          {
            a: 1,
            b: 2
          };`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var a = new abc({
              a: 1,
              b: 2
          }),
          b = 2;`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var a = 2,
        c = {
          a: 1,
          b: 2
        },
        b = 2;`,
    options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var x = 2,
          y = {
            a: 1,
            b: 2
          },
          b = 2;`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var e = {
            a: 1,
            b: 2
          },
          b = 2;`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var a = {
        a: 1,
        b: 2
      };`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      function test() {
        if (true ||
                  false){
          console.log(val);
        }
      }`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      for (var val in obj)
        if (true)
          console.log(val);`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      if(true)
        if (true)
          if (true)
            console.log(val);`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      function hi(){     var a = 1;
        y++;                   x++;
      }`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      for(;length > index; index++)if(NO_HOLES || index in self){
        x++;
      }`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      function test(){
        switch(length){
          case 1: return function(a){
            return fn.call(that, a);
          };
        }
      }`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      const abc = 5,
            c = 2,
            xyz =
            {
              a: 1,
              b: 2
            };
      let abc = 5,
        c = 2,
        xyz =
        {
          a: 1,
          b: 2
        };
      var abc = 5,
          c = 2,
          xyz =
          {
            a: 1,
            b: 2
          };
      `,
    options: [2, { VariableDeclarator: { var: 2, const: 3 }, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var a = 1,
          B = class {
            constructor(){}
            a(){}
            get b(){}
          };`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var a = 1,
          B =
          class {
            constructor(){}
            a(){}
            get b(){}
          },
          c = 3;`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
  },
  {
    code: dedent`
      class A{
          constructor(){}
          a(){}
          get b(){}
      }`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var A = class {
          constructor(){}
          a(){}
          get b(){}
      }`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var a =
      {
          actions:
          [
              {
                  name: 'compile'
              }
          ]
      };
      `,
    options: [4, { VariableDeclarator: 0, SwitchCase: 1 }]
  },
  {
    code: dedent`
      var a =
      [
          {
              name: 'compile'
          }
      ];
      `,
    options: [4, { VariableDeclarator: 0, SwitchCase: 1 }]
  },
  {
    code: dedent`
      class A{
        constructor(){}
          a(){}
          get b(){}
      }`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }],
    errors: expecting([[2, 4, 2]])
  },
  {
    code: dedent`
      var A = class {
        constructor(){}
          a(){}
        get b(){}
      };`,
    options: [4, { VariableDeclarator: 1, SwitchCase: 1 }],
    errors: expecting([[2, 4, 2], [4, 4, 2]])
  },
  {
    code: dedent`
      var a = 1,
          B = class {
          constructor(){}
            a(){}
            get b(){}
          };`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
    errors: expecting([[3, 6, 4]])
  },
  {
    code: dedent`
        var abc = 5,
            c = 2,
            xyz =
             {
               a: 1,
                b: 2
             };`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
    errors: expecting([
      [4, 4, 5],
      [5, 6, 7],
      [6, 6, 8],
      [7, 4, 5]
    ])
  },
  {
    code: dedent`
        var abc =
             {
               a: 1,
                b: 2
             };`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
    errors: expecting([
      [2, 4, 5],
      [3, 6, 7],
      [4, 6, 8],
      [5, 4, 5]
    ])
  },
  {
    code: dedent`
        if(true)
          if (true)
            if (true)
            console.log(val);`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
    errors: expecting([
      [4, 6, 4]
    ])
  },
  {
    code: dedent`
        var a = {
            a: 1,
            b: 2
        }`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
    errors: expecting([
      [2, 2, 4],
      [3, 2, 4]
    ])
  },
  {
    code: dedent`
        var a = [
            a,
            b
        ]`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
    errors: expecting([
      [2, 2, 4],
      [3, 2, 4]
    ])
  },
  {
    code: dedent`
        let a = [
            a,
            b
        ]`,
    options: [2, { VariableDeclarator: { let: 2 }, SwitchCase: 1 }],
    errors: expecting([
      [2, 2, 4],
      [3, 2, 4]
    ])
  }
]);

ruleTester.addTestGroup('outer-iife-body', 'should handle outer IIFE body', [
  {
    code: dedent`
      fs.readdirSync(path.join(__dirname, '../rules')).forEach(name => {
        files[name] = foo;
      });`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      (function(){
      function foo(x) {
        return x + 1;
      }
      })();`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      (function(){
              function foo(x) {
                  return x + 1;
              }
      })();`,
    options: [4, { outerIIFEBody: 2 }]
  },
  {
    code: dedent`
      (function(x, y){
      function foo(x) {
        return x + 1;
      }
      })(1, 2);`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      (function(){
      function foo(x) {
        return x + 1;
      }
      }());`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      !function(){
      function foo(x) {
        return x + 1;
      }
      }();`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: [
      '!function(){',
      '\t\t\tfunction foo(x) {',
      '\t\t\t\treturn x + 1;',
      '\t\t\t}',
      '}();'
    ].join('\n'),
    options: ['tab', { outerIIFEBody: 3 }]
  },
  {
    code: dedent`
      var out = function(){
        function fooVar(x) {
          return x + 1;
        }
      };`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      var ns = function(){
      function fooVar(x) {
        return x + 1;
      }
      }();`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      ns = function(){
      function fooVar(x) {
        return x + 1;
      }
      }();`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      var ns = (function(){
      function fooVar(x) {
        return x + 1;
      }
      }(x));`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      var ns = (function(){
              function fooVar(x) {
                  return x + 1;
              }
      }(x));`,
    options: [4, { outerIIFEBody: 2 }]
  },
  {
    code: dedent`
      var obj = {
        foo: function() {
          return true;
        }
      };`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      while (
        function() {
          return true;
        }()) {

        x = x + 1;
      };`,
    options: [2, { outerIIFEBody: 20 }]
  },
  {
    code: dedent`
      (() => {
      function foo(x) {
        return x + 1;
      }
      })();`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      function foo() {
      }`,
    options: ['tab', { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      ;(() => {
      function foo(x) {
        return x + 1;
      }
      })();`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      if(data) {
        console.log('hi');
      }`,
    options: [2, { outerIIFEBody: 0 }]
  },
  {
    code: dedent`
      (function(){
        function foo(x) {
          return x + 1;
        }
      })();`,
    options: [2, { outerIIFEBody: 0 }],
    errors: expecting([[2, 0, 2]])
  },
  {
    code: dedent`
      (function(){
          function foo(x) {
              return x + 1;
          }
      })();`,
    options: [4, { outerIIFEBody: 2 }],
    errors: expecting([[2, 8, 4]])
  },
  {
    code: dedent`
      if(data) {
      console.log('hi');
      }`,
    options: [2, { outerIIFEBody: 0 }],
    errors: expecting([[2, 2, 0]])
  },
  {
    code: dedent`
      var ns = function(){
          function fooVar(x) {
              return x + 1;
          }
      }(x);`,
    options: [4, { outerIIFEBody: 2 }],
    errors: expecting([[2, 8, 4]])
  },
  {
    code: dedent`
      var obj = {
        foo: function() {
        return true;
        }()
      };`,
    options: [2, { outerIIFEBody: 0 }],
    errors: expecting([[3, 4, 2]])
  },
  {
    code: dedent`
      typeof function() {
          function fooVar(x) {
            return x + 1;
          }
      }();`,
    options: [2, { outerIIFEBody: 2 }],
    errors: expecting([[2, 2, 4]])
  },
  {
    code: dedent`
      {
      \t!function(x) {
      \t\t\t\treturn x + 1;
      \t}()
      };`,
    options: ['tab', { outerIIFEBody: 3 }],
    errors: expecting([[3, 2, 4]], 'tab')
  }
]);

ruleTester.addTestGroup('functions', 'should handle functions body and parameters', [
  {
    code: dedent`
      function foo(aaa,
        bbb, ccc, ddd) {
          bar();
      }`,
    options: [2, { FunctionDeclaration: { parameters: 1, body: 2 } }]
  },
  {
    code: dedent`
      function foo(aaa, bbb,
            ccc, ddd) {
        bar();
      }`,
    options: [2, { FunctionDeclaration: { parameters: 3, body: 1 } }]
  },
  {
    code: dedent`
      function foo(aaa,
          bbb,
          ccc) {
                  bar();
      }`,
    options: [4, { FunctionDeclaration: { parameters: 1, body: 3 } }]
  },
  {
    code: dedent`
      function foo(aaa,
                   bbb, ccc,
                   ddd, eee, fff) {
        bar();
      }`,
    options: [2, { FunctionDeclaration: { parameters: 'first', body: 1 } }]
  },
  {
    code: dedent`
      function foo(aaa, bbb)
      {
            bar();
      }`,
    options: [2, { FunctionDeclaration: { body: 3 } }]
  },
  {
    code: dedent`
      function foo(
        aaa,
        bbb) {
          bar();
      }`,
    options: [2, { FunctionDeclaration: { parameters: 'first', body: 2 } }]
  },
  {
    code: dedent`
      var foo = function(aaa,
          bbb,
          ccc,
          ddd) {
      bar();
      }`,
    options: [2, { FunctionExpression: { parameters: 2, body: 0 } }]
  },
  {
    code: dedent`
      var foo = function(aaa,
        bbb,
        ccc) {
                          bar();
      }`,
    options: [2, { FunctionExpression: { parameters: 1, body: 10 } }]
  },
  {
    code: dedent`
      var foo = function(aaa,
                         bbb, ccc, ddd,
                         eee, fff) {
          bar();
      }`,
    options: [4, { FunctionExpression: { parameters: 'first', body: 1 } }]
  },
  {
    code: dedent`
      var foo = function(
        aaa, bbb, ccc,
        ddd, eee) {
            bar();
      }`,
    options: [2, { FunctionExpression: { parameters: 'first', body: 3 } }]
  },
  {
    code: dedent`
      function foo() {
        function bar() {
          baz();
        }
      }`,
    options: [2, { FunctionDeclaration: { body: 1 } }]
  },
  {
    code: dedent`
      function foo() {
        function bar(baz,
            qux) {
          foobar();
        }
      }`,
    options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }]
  },
  {
    code: dedent`
      function foo() {
        var bar = function(baz,
              qux) {
          foobar();
        };
      }`,
    options: [2, { FunctionExpression: { parameters: 3 } }]
  },
  {
    code: dedent`
      function foo() {
        function bar() {
              baz();
        }
      }`,
    options: [2, { FunctionDeclaration: { body: 1 } }],
    errors: expecting([[3, 4, 8]])
  },
  {
    code: dedent`
      function foo() {
        function bar(baz,
          qux) {
          foobar();
        }
      }`,
    options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
    errors: expecting([[3, 6, 4]])
  },
  {
    code: dedent`
      function foo() {
        var bar = function(baz,
                qux) {
          foobar();
        };
      }`,
    options: [2, { FunctionExpression: { parameters: 3 } }],
    errors: expecting([[3, 8, 10]])
  },
  {
    code: dedent`
      function foo(aaa,
          bbb, ccc, ddd) {
            bar();
      }`,
    options: [2, { FunctionDeclaration: { parameters: 1, body: 2 } }],
    errors: expecting([[2, 2, 4], [3, 4, 6]])
  },
  {
    code: dedent`
      function foo(aaa, bbb,
        ccc, ddd) {
      bar();
      }",
      utput:
      function foo(aaa, bbb,
            ccc, ddd) {
        bar();
      }`,
    options: [2, { FunctionDeclaration: { parameters: 3, body: 1 } }],
    errors: expecting([[2, 6, 2], [3, 2, 0]])
  },
  {
    code: dedent`
      function foo(aaa,
              bbb,
        ccc) {
            bar();
      }`,
    options: [4, { FunctionDeclaration: { parameters: 1, body: 3 } }],
    errors: expecting([[2, 4, 8], [3, 4, 2], [4, 12, 6]])
  },
  {
    code: dedent`
      function foo(aaa,
        bbb, ccc,
                         ddd, eee, fff) {
         bar();
      }`,
    options: [2, { FunctionDeclaration: { parameters: 'first', body: 1 } }],
    errors: expecting([[2, 13, 2], [3, 13, 19], [4, 2, 3]])
  },
  {
    code: dedent`
      function foo(aaa, bbb)
      {
      bar();
      }`,
    options: [2, { FunctionDeclaration: { body: 3 } }],
    errors: expecting([[3, 6, 0]])
  },
  {
    code: dedent`
      function foo(aaa, bbb)
        {
      bar();
      }`,
    options: [2, { FunctionDeclaration: { body: 3 } }],
    errors: expecting([[2, 0, 2], [3, 6, 0]])
  },
  {
    code: dedent`
      function foo(
        aaa,
        bbb
       )
      {
        bar();
      }`,
    options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
    errors: expecting([
      [2, 4, 2],
      [3, 4, 2],
      [4, 0, 1]
    ])
  },
  {
    code: dedent`
      {
        function foo(
       )
         {
          return null;
        }
      }`,
    options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
    errors: expecting([[3, 2, 1], [4, 2, 3]])
  },
  {
    code: dedent`
      function foo(
      aaa,
          bbb) {
      bar();
      }`,
    options: [2, { FunctionDeclaration: { parameters: 'first', body: 2 } }],
    errors: expecting([[3, 0, 4], [4, 4, 0]])
  },
  {
    code: dedent`
      var foo = function(aaa,
        bbb,
          ccc,
            ddd) {
        bar();
      }`,
    options: [2, { FunctionExpression: { parameters: 2, body: 0 } }],
    errors: expecting([[2, 4, 2], [4, 4, 6], [5, 0, 2]])
  },
  {
    code: dedent`
      var foo = function(aaa,
         bbb,
       ccc) {
        bar();
      }`,
    options: [2, { FunctionExpression: { parameters: 1, body: 10 } }],
    errors: expecting([[2, 2, 3], [3, 2, 1], [4, 20, 2]])
  },
  {
    code: dedent`
      var foo = function(aaa,
        bbb, ccc, ddd,
                              eee, fff) {
              bar();
      }`,
    options: [4, { FunctionExpression: { parameters: 'first', body: 1 } }],
    errors: expecting([[2, 19, 2], [3, 19, 24], [4, 4, 8]])
  },
  {
    code: dedent`
      var foo = function(
      aaa, bbb, ccc,
          ddd, eee) {
        bar();
      }`,
    options: [2, { FunctionExpression: { parameters: 'first', body: 3 } }],
    errors: expecting([[3, 0, 4], [4, 6, 2]])
  },
  {
    code: dedent`
      var foo = function(
      aaa, bbb, ccc,
          ddd, eee)
           {
        bar();
      }`,
    options: [2, { FunctionExpression: { parameters: 1, body: 3 } }],
    errors: expecting([
      [2, 2, 0],
      [3, 2, 4],
      [4, 0, 5],
      [5, 6, 2]
    ])
  }
]);

ruleTester.addTestGroup('methods', 'should handle methods body and parameters', [
  {
    code: dedent`
      class A {
        foo(aaa,
          bbb, ccc, ddd) {
            bar();
        }
      }`,
    options: [2, { FunctionExpression: { parameters: 1, body: 2 } }]
  },
  {
    code: dedent`
      class A {
        constructor(aaa,
          bbb, ccc, ddd) {
            bar();
        }
      }`,
    options: [2, { FunctionExpression: { parameters: 1, body: 2 } }]
  },
  {
    code: dedent`
      class A {
        foo(
         aaa,
          bbb,
           ccc,
          ddd
       )
         {
            bar();
        }
       }`,
    options: [2, { FunctionExpression: { parameters: 1, body: 2 } }],
    errors: expecting([
      [3, 4, 3],
      [5, 4, 5],
      [7, 2, 1],
      [8, 2, 3],
      [11, 0, 1]
    ])
  },
  {
    code: dedent`
      class A {
        constructor(
         aaa,
          bbb,
           ccc,
          ddd
       )
         {
            bar();
        }
      }`,
    output: dedent`
      class A {
        constructor(
          aaa,
          bbb,
          ccc,
          ddd
        )
        {
            bar();
        }
      }`,
    options: [2, { FunctionExpression: { parameters: 1, body: 2 } }],
    errors: expecting([
      [3, 4, 3],
      [5, 4, 5],
      [7, 2, 1],
      [8, 2, 3]
    ])
  }
]);

ruleTester.addTestGroup('call-expression', 'should handle call expressions', [
  {
    code: dedent`
      foo(
        bar,
        baz,
        qux
      );"`,
    options: [2, { CallExpression: { arguments: 1 } }]
  },
  {
    code: dedent`
      foo(
      \tbar,
      \tbaz,
      \tqux
      );"`,
    options: ['tab', { CallExpression: { arguments: 1 } }]
  },
  {
    code: dedent`
      foo(bar,
              baz,
              qux);"`,
    options: [4, { CallExpression: { arguments: 2 } }]
  },
  {
    code: dedent`
      foo(
      bar,
      baz,
      qux
      );"`,
    options: [2, { CallExpression: { arguments: 0 } }]
  },
  {
    code: dedent`
      foo(bar,
          baz,
          qux
      );"`,
    options: [2, { CallExpression: { arguments: 'first' } }]
  },
  {
    code: dedent`
      foo(bar, baz,
          qux, barbaz,
          barqux, bazqux);"`,
    options: [2, { CallExpression: { arguments: 'first' } }]
  },
  {
    code: dedent`
      foo(
                              bar, baz,
                              qux);"`,
    options: [2, { CallExpression: { arguments: 'first' } }]
  },
  {
    code: dedent`
      foo(bar,
              1 + 2,
              !baz,
              new Car('!')
      );"`,
    options: [2, { CallExpression: { arguments: 4 } }]
  }
]);

ruleTester.addTestGroup('new-batch', 'should handle try/catch/do and return statements', [
  {
    code: dedent`
      {
          try {
          }
      catch (err) {
          }
      finally {
          }
      }`,
    output: dedent`
      {
          try {
          }
          catch (err) {
          }
          finally {
          }
      }`,
    errors: expecting([
      [4, 4, 0],
      [6, 4, 0]
    ])
  },
  {
    code: dedent`
      {
          do {
          }
      while (true)
      }`,
    output: dedent`
      {
          do {
          }
          while (true)
      }`,
    errors: expecting([[4, 4, 0]])
  },
  {
    code: dedent`
      function foo() {
        bar();
      \t\t}`,
    output: dedent`
      function foo() {
        bar();
      }`,
    options: [2],
    errors: expecting([[3, '0 spaces', '2 tabs']])
  },
  {
    code: dedent`
      function foo() {
        return (
          1
          )
      }`,
    output: dedent`
      function foo() {
        return (
          1
        )
      }`,
    options: [2],
    errors: expecting([[4, '2 spaces', '4']])
  },
  {
    code: dedent`
      function foo() {
        return (
          1
          );
      }`,
    output: dedent`
      function foo() {
        return (
          1
        );
      }`,
    options: [2],
    errors: expecting([[4, '2 spaces', '4']])
  },
  {
    code: dedent`
      function foo() {
        bar();
      \t\t}`,
    output: dedent`
      function foo() {
        bar();
      }`,
    options: [2],
    errors: expecting([[3, '0 spaces', '2 tabs']])
  },
  {
    code: dedent`
      function test(){
        switch(length){
          case 1: return function(a){
          return fn.call(that, a);
          };
        }
      }`,
    output: dedent`
      function test(){
        switch(length){
          case 1: return function(a){
            return fn.call(that, a);
          };
        }
      }`,
    options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
    errors: expecting([[4, '6 spaces', '4']])
  },
  {
    code: dedent`
      function foo() {
         return 1
      }`,
    output: dedent`
      function foo() {
        return 1
      }`,
    options: [2],
    errors: expecting([[2, '2 spaces', '3']])
  },
  {
    code: dedent`
      function foo() {
         return 1;
      }`,
    output: dedent`
      function foo() {
        return 1;
      }`,
    options: [2],
    errors: expecting([[2, '2 spaces', '3']])
  },
  {
    code: dedent`
      foo(
      bar,
        baz,
          qux);`,
    output: dedent`
      foo(
        bar,
        baz,
        qux);`,
    options: [2, { CallExpression: { arguments: 1 } }],
    errors: expecting([[2, 2, 0], [4, 2, 4]])
  },
  {
    code: dedent`
      foo(
      \tbar,
      \tbaz);`,
    output: dedent`
      foo(
          bar,
          baz);`,
    options: [2, { CallExpression: { arguments: 2 } }],
    errors: expecting([[2, '4 spaces', '1 tab'], [3, '4 spaces', '1 tab']])
  },
  {
    code: dedent`
      foo(bar,
      \t\tbaz,
      \t\tqux);`,
    output: dedent`
      foo(bar,
      \tbaz,
      \tqux);`,
    options: ['tab', { CallExpression: { arguments: 1 } }],
    errors: expecting([[2, 1, 2], [3, 1, 2]], 'tab')
  },
  {
    code: dedent`
      foo(bar, baz,
               qux);`,
    output: dedent`
      foo(bar, baz,
          qux);`,
    options: [2, { CallExpression: { arguments: 'first' } }],
    errors: expecting([[2, 4, 9]])
  },
  {
    code: dedent`
      foo(
                bar,
          baz);`,
    output: dedent`
      foo(
                bar,
                baz);`,
    options: [2, { CallExpression: { arguments: 'first' } }],
    errors: expecting([[3, 10, 4]])
  },
  {
    code: dedent`
      foo(bar,
        1 + 2,
                    !baz,
              new Car('!')
      );`,
    output: dedent`
      foo(bar,
            1 + 2,
            !baz,
            new Car('!')
      );`,
    options: [2, { CallExpression: { arguments: 3 } }],
    errors: expecting([[2, 6, 2], [3, 6, 14], [4, 6, 8]])
  },

  // https://github.com/eslint/eslint/issues/7573
  {
    code: dedent`
      return (
          foo
          );`,
    output: dedent`
      return (
          foo
      );`,
    errors: expecting([[3, 0, 4]])
  },
  {
    code: dedent`
      return (
          foo
          )`,
    output: dedent`
      return (
          foo
      )`,
    errors: expecting([[3, 0, 4]])
  },
  // https://github.com/eslint/eslint/issues/7604
  {
    code: dedent`
      if (foo) {
              /* comment */bar();
      }`,
    output: dedent`
      if (foo) {
          /* comment */bar();
      }`,
    errors: expecting([[2, 4, 8]])
  },
  {
    code: dedent`
      foo('bar',
              /** comment */{
              ok: true    });`,
    output: dedent`
      foo('bar',
          /** comment */{
              ok: true    });`,
    errors: expecting([[2, 4, 8]])
  },
  {
    code: dedent`
      foo('bar',
              {
              ok: true    });`,
    output: dedent`
      foo('bar',
          {
              ok: true    });`,
    errors: expecting([[2, 4, 8]])
  }
]);

ruleTester.addTestGroup('variable-declaration', 'should handle variable declarations', [
  {
    code: dedent`
      /**
       * Returns the local state from inside the full redux store's state.
       */
      const getState = (store: Store) => store.foo
      `
  },
  {
    code: dedent`
      const getState = (store: Store) => store.foo
      `
  },
  {
    code: dedent`
      /**
       * Returns the local state from inside the full redux store's state.
       */
        const getState = (store: Store) => store.foo
      `,
    errors: expecting([[4, 0, 2]])
  },
  {
    code: dedent`
      const tough = require('tough-cookie')
      const jar = previousJar || new tough.CookieJar()
      ;(client.defaults as any).jar = jar
      `
  },
  {
    code: dedent`
      const tough = require('tough-cookie')
      const jar = previousJar || new tough.CookieJar()
       ;(client.defaults as any).jar = jar
      `,
    errors: expecting([[3, 0, 1]])
  }
]);

ruleTester.addTestGroup('interfaces', 'should check indentation on interfaces', [
  {
    code: dedent`
      interface Foo {
        a: number;
      }
      `,
    output: dedent`
      interface Foo {
          a: number;
      }
      `,
    errors: expecting([[2, 4, 2]])
  },
  {
    code: dedent`
      interface Foo extends Bar {
        a: number;
          b: {
             c: string;
           };
        }
      `,
    output: dedent`
      interface Foo extends Bar {
          a: number;
          b: {
              c: string;
          };
      }
      `,
    errors: expecting([
      [2, 4, 2],
      [4, 8, 7],
      [5, 4, 5],
      [6, 0, 2]
    ])
  },
  {
    code: dedent`
      interface Foo extends Bar {
        a: number;
        b: {
          c: string;
        };
      }
      `,
    options: [2]
  }
]);

ruleTester.addTestGroupWithConfig(
  'issue-254',
  'reporting as a false positive',
  [
    2,
    {
      'SwitchCase': 1,
      'MemberExpression': 1,
      'FunctionDeclaration': {
        'parameters': 1
      },
      'FunctionExpression': {
        'parameters': 1
      },
      'CallExpression': {
        arguments: 1
      }
    }
  ],
  [
    {
      code: dedent`
      foo = this.actions$
        .ofType(
          'foo',
          'bar'
        );
      `
    },
    {
      code: dedent`
      foo = this
        .actions$
        .ofType(
          'foo',
          'bar'
        );
      `
    },
    {
      code: dedent`
      foo = this.actions$.ofType(
        'foo',
        'bar'
      );
      `
    },
    {
      code: dedent`
      foo = this.actions$.ofType
        (
          'foo',
          'bar'
        );
      `
    }
  ]
);

ruleTester.runTests();
