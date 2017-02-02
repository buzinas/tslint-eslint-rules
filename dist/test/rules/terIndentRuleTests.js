"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-indent');
function expecting(errors, indentType) {
    if (indentType === void 0) { indentType = 'space'; }
    return errors.map(function (err) {
        var message;
        if (typeof err[1] === 'string' && typeof err[2] === 'string') {
            message = "Expected indentation of " + err[1] + " but found " + err[2] + ".";
        }
        else {
            var chars = indentType + (err[1] === 1 ? '' : 's');
            message = "Expected indentation of " + err[1] + " " + chars + " but found " + err[2] + ".";
        }
        return {
            failure: message,
            startPosition: new ruleTester_1.Position(err[0]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('no-options', 'should capture the correct indentation with defaults', [
    'export let upgradeModule = angular.module("ui.router.upgrade", ["ui.router"]);',
    'switch (0) {\n}',
    'switch(value){ default: a(); break; }\n',
    (_a = ["\n    return (\n        foo\n    );"], _a.raw = ["\n    return (\n        foo\n    );"], ruleTester_1.dedent(_a)),
    (_b = ["\n    return (\n        foo\n    )"], _b.raw = ["\n    return (\n        foo\n    )"], ruleTester_1.dedent(_b)),
    (_c = ["\n    const array = [\n        ,\n        'd',\n        3\n    ];\n    "], _c.raw = ["\n    const array = [\n        ,\n        'd',\n        3\n    ];\n    "], ruleTester_1.dedent(_c)),
    (_d = ["\n    switch (a) {\n    case 'foo':\n        a();\n        break;\n    case 'bar':\n        switch(x){\n        case '1':\n            break;\n        case '2':\n            a = 6;\n            break;\n        }\n    }"], _d.raw = ["\n    switch (a) {\n    case 'foo':\n        a();\n        break;\n    case 'bar':\n        switch(x){\n        case '1':\n            break;\n        case '2':\n            a = 6;\n            break;\n        }\n    }"], ruleTester_1.dedent(_d)),
    (_e = ["\n    switch (a) {\n    case 'foo':\n        a();\n        break;\n    case 'bar':\n        if(x){\n            a = 2;\n        }\n        else{\n            a = 6;\n        }\n    }"], _e.raw = ["\n    switch (a) {\n    case 'foo':\n        a();\n        break;\n    case 'bar':\n        if(x){\n            a = 2;\n        }\n        else{\n            a = 6;\n        }\n    }"], ruleTester_1.dedent(_e)),
    (_f = ["\n    switch (a) {\n    case \"foo\":\n        a();\n        break;\n    case \"bar\":\n        if(x){\n            a = 2;\n        }\n        else\n            a = 6;\n    }"], _f.raw = ["\n    switch (a) {\n    case \"foo\":\n        a();\n        break;\n    case \"bar\":\n        if(x){\n            a = 2;\n        }\n        else\n            a = 6;\n    }"], ruleTester_1.dedent(_f)),
    (_g = ["\n    switch (a) {\n    case \"foo\":\n        a();\n        break;\n    case \"bar\":\n        a(); break;\n    case \"baz\":\n        a(); break;\n    }"], _g.raw = ["\n    switch (a) {\n    case \"foo\":\n        a();\n        break;\n    case \"bar\":\n        a(); break;\n    case \"baz\":\n        a(); break;\n    }"], ruleTester_1.dedent(_g)),
    (_h = ["\n    function foo() {\n        var a = \"a\";\n        switch(a) {\n        case \"a\":\n            return \"A\";\n        case \"b\":\n            return \"B\";\n        }\n    }\n    foo();"], _h.raw = ["\n    function foo() {\n        var a = \"a\";\n        switch(a) {\n        case \"a\":\n            return \"A\";\n        case \"b\":\n            return \"B\";\n        }\n    }\n    foo();"], ruleTester_1.dedent(_h)),
    (_j = ["\n    var obj = {foo: 1, bar: 2};\n    with (obj) {\n        console.log(foo + bar);\n    }\n    "], _j.raw = ["\n    var obj = {foo: 1, bar: 2};\n    with (obj) {\n        console.log(foo + bar);\n    }\n    "], ruleTester_1.dedent(_j)),
    (_k = ["\n    var a = 1\n       ,b = 2\n       ;\n    "], _k.raw = ["\n    var a = 1\n       ,b = 2\n       ;\n    "], ruleTester_1.dedent(_k)),
    (_l = ["\n    const a: number = 1\n         ,b: number = 2\n         ;\n    "], _l.raw = ["\n    const a: number = 1\n         ,b: number = 2\n         ;\n    "], ruleTester_1.dedent(_l)),
    (_m = ["\n    const someOtherFunction = argument => {\n            console.log(argument);\n        },\n        someOtherValue = 'someOtherValue';\n    "], _m.raw = ["\n    const someOtherFunction = argument => {\n            console.log(argument);\n        },\n        someOtherValue = 'someOtherValue';\n    "], ruleTester_1.dedent(_m)),
    (_o = ["\n    if (a) {\n        (1 + 2 + 3);\n    }\n    "], _o.raw = ["\n    if (a) {\n        (1 + 2 + 3);\n    }\n    "], ruleTester_1.dedent(_o))
]);
ruleTester.addTestGroup('indent-number', 'should force a certain indentation number', [
    {
        code: (_p = ["\n      /**\n       * @var {string}\n       */\n      const FOO = 'bar';"], _p.raw = ["\n      /**\n       * @var {string}\n       */\n      const FOO = 'bar';"], ruleTester_1.dedent(_p)),
        options: [4]
    },
    {
        code: (_q = ["\n      /**\n       * @var {string}\n       */\n       const FOO = 'bar';"], _q.raw = ["\n      /**\n       * @var {string}\n       */\n       const FOO = 'bar';"], ruleTester_1.dedent(_q)),
        options: [4],
        errors: expecting([[4, 0, 1]])
    },
    {
        code: (_r = ["\n      /**\n       * @param {string} text\n       */\n      const log = (text) => console.log(text);"], _r.raw = ["\n      /**\n       * @param {string} text\n       */\n      const log = (text) => console.log(text);"], ruleTester_1.dedent(_r)),
        options: [4]
    },
    {
        code: (_s = ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], _s.raw = ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], ruleTester_1.dedent(_s)),
        options: [4]
    },
    {
        code: (_t = ["\n      var x = ['a',\n          'b',\n          'c',\n      ];"], _t.raw = ["\n      var x = ['a',\n          'b',\n          'c',\n      ];"], ruleTester_1.dedent(_t)),
        options: [4]
    },
    {
        code: "import {addons} from 'react/addons'\nimport React from 'react'",
        options: [2]
    },
    {
        code: (_u = ["\n      bridge.callHandler(\n        'getAppVersion', 'test23', function(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        }\n      );\n      "], _u.raw = ["\n      bridge.callHandler(\n        'getAppVersion', 'test23', function(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        }\n      );\n      "], ruleTester_1.dedent(_u)),
        options: [2]
    },
    {
        code: (_v = ["\n      bridge.callHandler(\n        'getAppVersion', 'test23', function(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        });\n      "], _v.raw = ["\n      bridge.callHandler(\n        'getAppVersion', 'test23', function(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        });\n      "], ruleTester_1.dedent(_v)),
        options: [2]
    },
    {
        code: (_w = ["\n      bridge.callHandler(\n        'getAppVersion',\n        null,\n        function responseCallback(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        }\n      );\n      "], _w.raw = ["\n      bridge.callHandler(\n        'getAppVersion',\n        null,\n        function responseCallback(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        }\n      );\n      "], ruleTester_1.dedent(_w)),
        options: [2]
    },
    {
        code: (_x = ["\n      bridge.callHandler(\n        'getAppVersion',\n        null,\n        function responseCallback(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        });\n      "], _x.raw = ["\n      bridge.callHandler(\n        'getAppVersion',\n        null,\n        function responseCallback(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        });\n      "], ruleTester_1.dedent(_x)),
        options: [2]
    },
    {
        code: (_y = ["\n      function doStuff(keys) {\n          _.forEach(\n              keys,\n              key => {\n                  doSomething(key);\n              }\n         );\n      }\n      "], _y.raw = ["\n      function doStuff(keys) {\n          _.forEach(\n              keys,\n              key => {\n                  doSomething(key);\n              }\n         );\n      }\n      "], ruleTester_1.dedent(_y)),
        options: [4]
    },
    {
        code: (_z = ["\n      example(\n          function () {\n              console.log('example');\n          }\n      );\n      "], _z.raw = ["\n      example(\n          function () {\n              console.log('example');\n          }\n      );\n      "], ruleTester_1.dedent(_z)),
        options: [4]
    },
    {
        code: (_0 = ["\n      let foo = somethingList\n          .filter(x => {\n              return x;\n          })\n          .map(x => {\n              return 100 * x;\n          });\n      "], _0.raw = ["\n      let foo = somethingList\n          .filter(x => {\n              return x;\n          })\n          .map(x => {\n              return 100 * x;\n          });\n      "], ruleTester_1.dedent(_0)),
        options: [4]
    },
    {
        code: (_1 = ["\n      var x = 0 &&\n          {\n              a: 1,\n              b: 2\n          };\n      "], _1.raw = ["\n      var x = 0 &&\n          {\n              a: 1,\n              b: 2\n          };\n      "], ruleTester_1.dedent(_1)),
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
        code: (_2 = ["\n      var x = 0 &&\n          {\n              a: 1,\n              b: 2\n          }||\n          {\n              c: 3,\n              d: 4\n          };\n      "], _2.raw = ["\n      var x = 0 &&\n          {\n              a: 1,\n              b: 2\n          }||\n          {\n              c: 3,\n              d: 4\n          };\n      "], ruleTester_1.dedent(_2)),
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
        code: (_3 = ["\n      var x = 0 &&\n          (\n              1\n          );"], _3.raw = ["\n      var x = 0 &&\n          (\n              1\n          );"], ruleTester_1.dedent(_3)),
        options: [4]
    },
    {
        code: 'var x = 0 && { a: 1, b: 2 };',
        options: [4]
    },
    {
        code: (_4 = ["\n      require('http').request({hostname: 'localhost',\n        port: 80}, function(res) {\n        res.end();\n      });\n      "], _4.raw = ["\n      require('http').request({hostname: 'localhost',\n        port: 80}, function(res) {\n        res.end();\n      });\n      "], ruleTester_1.dedent(_4)),
        options: [2]
    },
    {
        code: (_5 = ["\n      function test() {\n        return client.signUp(email, PASSWORD, { preVerified: true })\n          .then(function (result) {\n            // hi\n          })\n          .then(function () {\n            return FunctionalHelpers.clearBrowserState(self, {\n              contentServer: true,\n              contentServer1: true\n            });\n          });\n      }"], _5.raw = ["\n      function test() {\n        return client.signUp(email, PASSWORD, { preVerified: true })\n          .then(function (result) {\n            // hi\n          })\n          .then(function () {\n            return FunctionalHelpers.clearBrowserState(self, {\n              contentServer: true,\n              contentServer1: true\n            });\n          });\n      }"], ruleTester_1.dedent(_5)),
        options: [2]
    },
    {
        code: (_6 = ["\n      it('should... some lengthy test description that is forced to be' +\n        'wrapped into two lines since the line length limit is set', () => {\n        expect(true).toBe(true);\n      });\n      "], _6.raw = ["\n      it('should... some lengthy test description that is forced to be' +\n        'wrapped into two lines since the line length limit is set', () => {\n        expect(true).toBe(true);\n      });\n      "], ruleTester_1.dedent(_6)),
        options: [2]
    },
    {
        code: (_7 = ["\n      function test() {\n          return client.signUp(email, PASSWORD, { preVerified: true })\n              .then(function (result) {\n                  var x = 1;\n                  var y = 1;\n              }, function(err){\n                  var o = 1 - 2;\n                  var y = 1 - 2;\n                  return true;\n              })\n      }"], _7.raw = ["\n      function test() {\n          return client.signUp(email, PASSWORD, { preVerified: true })\n              .then(function (result) {\n                  var x = 1;\n                  var y = 1;\n              }, function(err){\n                  var o = 1 - 2;\n                  var y = 1 - 2;\n                  return true;\n              })\n      }"], ruleTester_1.dedent(_7)),
        options: [4]
    },
    {
        code: (_8 = ["\n      if (1 < 2){\n      //hi sd\n      }"], _8.raw = ["\n      if (1 < 2){\n      //hi sd\n      }"], ruleTester_1.dedent(_8)),
        options: [2]
    },
    {
        code: (_9 = ["\n      while (1 < 2){\n        //hi sd\n      }"], _9.raw = ["\n      while (1 < 2){\n        //hi sd\n      }"], ruleTester_1.dedent(_9)),
        options: [2]
    },
    {
        code: (_10 = ["\n      while (1 < 2) console.log('hi');"], _10.raw = ["\n      while (1 < 2) console.log('hi');"], ruleTester_1.dedent(_10)),
        options: [2]
    },
    {
        code: (_11 = ["\n      [a, b,\n          c].forEach((index) => {\n              index;\n          });\n      "], _11.raw = ["\n      [a, b,\n          c].forEach((index) => {\n              index;\n          });\n      "], ruleTester_1.dedent(_11)),
        options: [4]
    },
    {
        code: (_12 = ["\n      [a, b, c].forEach((index) => {\n          index;\n      });\n      "], _12.raw = ["\n      [a, b, c].forEach((index) => {\n          index;\n      });\n      "], ruleTester_1.dedent(_12)),
        options: [4]
    },
    {
        code: (_13 = ["\n      [a, b, c].forEach(function(index){\n          return index;\n      });\n      "], _13.raw = ["\n      [a, b, c].forEach(function(index){\n          return index;\n      });\n      "], ruleTester_1.dedent(_13)),
        options: [4]
    },
    {
        code: (_14 = ["\n      var a = 1,\n          b = 2,\n          c = 3;\n      "], _14.raw = ["\n      var a = 1,\n          b = 2,\n          c = 3;\n      "], ruleTester_1.dedent(_14)),
        options: [4]
    },
    {
        code: (_15 = ["\n      var a = 1\n         ,b = 2\n         ,c = 3;\n      "], _15.raw = ["\n      var a = 1\n         ,b = 2\n         ,c = 3;\n      "], ruleTester_1.dedent(_15)),
        options: [4]
    },
    {
        code: "while (1 < 2) console.log('hi')\n",
        options: [2]
    },
    {
        code: (_16 = ["\n      module.exports =\n      {\n        'Unit tests':\n        {\n          rootPath: './',\n          environment: 'node',\n          tests:\n          [\n            'test/test-*.js'\n          ],\n          sources:\n          [\n            '*.js',\n            'test/**.js'\n          ]\n        }\n      };"], _16.raw = ["\n      module.exports =\n      {\n        'Unit tests':\n        {\n          rootPath: './',\n          environment: 'node',\n          tests:\n          [\n            'test/test-*.js'\n          ],\n          sources:\n          [\n            '*.js',\n            'test/**.js'\n          ]\n        }\n      };"], ruleTester_1.dedent(_16)),
        options: [2]
    },
    {
        code: (_17 = ["\n      var path     = require('path')\n        , crypto    = require('crypto')\n        ;\n      "], _17.raw = ["\n      var path     = require('path')\n        , crypto    = require('crypto')\n        ;\n      "], ruleTester_1.dedent(_17)),
        options: [2]
    },
    {
        code: (_18 = ["\n      export function create (some,\n                              argument) {\n        return Object.create({\n          a: some,\n          b: argument\n        });\n      };"], _18.raw = ["\n      export function create (some,\n                              argument) {\n        return Object.create({\n          a: some,\n          b: argument\n        });\n      };"], ruleTester_1.dedent(_18)),
        options: [2]
    },
    {
        code: (_19 = ["\n      export function create (id, xfilter, rawType,\n                              width=defaultWidth, height=defaultHeight,\n                              footerHeight=defaultFooterHeight,\n                              padding=defaultPadding) {\n        // ... function body, indented two spaces\n      }\n      "], _19.raw = ["\n      export function create (id, xfilter, rawType,\n                              width=defaultWidth, height=defaultHeight,\n                              footerHeight=defaultFooterHeight,\n                              padding=defaultPadding) {\n        // ... function body, indented two spaces\n      }\n      "], ruleTester_1.dedent(_19)),
        options: [2]
    },
    {
        code: (_20 = ["\n      var obj = {\n        foo: function () {\n          return new p()\n            .then(function (ok) {\n              return ok;\n            }, function () {\n              // ignore things\n            });\n        }\n      };\n      "], _20.raw = ["\n      var obj = {\n        foo: function () {\n          return new p()\n            .then(function (ok) {\n              return ok;\n            }, function () {\n              // ignore things\n            });\n        }\n      };\n      "], ruleTester_1.dedent(_20)),
        options: [2]
    },
    {
        code: (_21 = ["\n      a.b()\n        .c(function(){\n          var a;\n        }).d.e;\n      "], _21.raw = ["\n      a.b()\n        .c(function(){\n          var a;\n        }).d.e;\n      "], ruleTester_1.dedent(_21)),
        options: [2]
    },
    {
        code: (_22 = ["\n      var foo = 'foo',\n        bar = 'bar',\n        baz = function() {\n\n        }\n\n      function hello () {\n\n      }\n      "], _22.raw = ["\n      var foo = 'foo',\n        bar = 'bar',\n        baz = function() {\n\n        }\n\n      function hello () {\n\n      }\n      "], ruleTester_1.dedent(_22)),
        options: [2]
    },
    {
        code: (_23 = ["\n      var obj = {\n        send: function () {\n          return P.resolve({\n            type: 'POST'\n          })\n            .then(function () {\n              return true;\n            }, function () {\n              return false;\n            });\n        }\n      };\n      "], _23.raw = ["\n      var obj = {\n        send: function () {\n          return P.resolve({\n            type: 'POST'\n          })\n            .then(function () {\n              return true;\n            }, function () {\n              return false;\n            });\n        }\n      };\n      "], ruleTester_1.dedent(_23)),
        options: [2]
    },
    {
        code: (_24 = ["\n      [\n        'a',\n        'b'\n      ].sort().should.deepEqual([\n        'x',\n        'y'\n      ]);\n      "], _24.raw = ["\n      [\n        'a',\n        'b'\n      ].sort().should.deepEqual([\n        'x',\n        'y'\n      ]);\n      "], ruleTester_1.dedent(_24)),
        options: [2]
    },
    {
        code: (_25 = ["\n      var a = {\n        some: 1\n      , name: 2\n      };\n      "], _25.raw = ["\n      var a = {\n        some: 1\n      , name: 2\n      };\n      "], ruleTester_1.dedent(_25)),
        options: [2]
    },
    {
        code: (_26 = ["\n      a.c = {\n          aa: function() {\n              'test1';\n              return 'aa';\n          }\n          , bb: function() {\n              return this.bb();\n          }\n      };\n      "], _26.raw = ["\n      a.c = {\n          aa: function() {\n              'test1';\n              return 'aa';\n          }\n          , bb: function() {\n              return this.bb();\n          }\n      };\n      "], ruleTester_1.dedent(_26)),
        options: [4]
    },
    {
        code: (_27 = ["\n      const func = function (opts) {\n          return Promise.resolve()\n              .then(() => {\n                  [\n                      'ONE', 'TWO'\n                  ].forEach(command => { doSomething(); });\n              });\n      };"], _27.raw = ["\n      const func = function (opts) {\n          return Promise.resolve()\n              .then(() => {\n                  [\n                      'ONE', 'TWO'\n                  ].forEach(command => { doSomething(); });\n              });\n      };"], ruleTester_1.dedent(_27)),
        options: [4]
    },
    {
        code: (_28 = ["\n      var haveFun = function () {\n          SillyFunction(\n              {\n                  value: true,\n              },\n              {\n                  _id: true,\n              }\n          );\n      };"], _28.raw = ["\n      var haveFun = function () {\n          SillyFunction(\n              {\n                  value: true,\n              },\n              {\n                  _id: true,\n              }\n          );\n      };"], ruleTester_1.dedent(_28)),
        options: [4]
    },
    {
        code: (_29 = ["\n      var haveFun = function () {\n          new SillyFunction(\n              {\n                  value: true,\n              },\n              {\n                  _id: true,\n              }\n          );\n      };"], _29.raw = ["\n      var haveFun = function () {\n          new SillyFunction(\n              {\n                  value: true,\n              },\n              {\n                  _id: true,\n              }\n          );\n      };"], ruleTester_1.dedent(_29)),
        options: [4]
    },
    {
        code: (_30 = ["\n      let object1 = {\n        doThing() {\n          return _.chain([])\n            .map(v => (\n              {\n                value: true,\n              }\n            ))\n            .value();\n        }\n      };"], _30.raw = ["\n      let object1 = {\n        doThing() {\n          return _.chain([])\n            .map(v => (\n              {\n                value: true,\n              }\n            ))\n            .value();\n        }\n      };"], ruleTester_1.dedent(_30)),
        options: [2]
    },
    {
        code: (_31 = ["\n      class Foo\n        extends Bar {\n        baz() {}\n      }"], _31.raw = ["\n      class Foo\n        extends Bar {\n        baz() {}\n      }"], ruleTester_1.dedent(_31)),
        options: [2]
    },
    {
        code: (_32 = ["\n      class Foo extends\n        Bar {\n        baz() {}\n      }"], _32.raw = ["\n      class Foo extends\n        Bar {\n        baz() {}\n      }"], ruleTester_1.dedent(_32)),
        options: [2]
    },
    {
        code: (_33 = ["\n      if (foo) {\n        bar();\n      } else if (baz) {\n        foobar();\n      } else if (qux) {\n        qux();\n      }"], _33.raw = ["\n      if (foo) {\n        bar();\n      } else if (baz) {\n        foobar();\n      } else if (qux) {\n        qux();\n      }"], ruleTester_1.dedent(_33)),
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
        code: (_34 = ["\n      function foo() {\n        return (bar === 1 || bar === 2 &&\n          (/Function/.test(grandparent.type))) &&\n          directives(parent).indexOf(node) >= 0;\n      }"], _34.raw = ["\n      function foo() {\n        return (bar === 1 || bar === 2 &&\n          (/Function/.test(grandparent.type))) &&\n          directives(parent).indexOf(node) >= 0;\n      }"], ruleTester_1.dedent(_34)),
        options: [2]
    },
    {
        code: (_35 = ["\n      function foo() {\n        return (bar === 1 || bar === 2) &&\n          (z === 3 || z === 4);\n      }"], _35.raw = ["\n      function foo() {\n        return (bar === 1 || bar === 2) &&\n          (z === 3 || z === 4);\n      }"], ruleTester_1.dedent(_35)),
        options: [2]
    },
    {
        code: (_36 = ["\n      function foo() {\n        return ((bar === 1 || bar === 2) &&\n          (z === 3 || z === 4)\n        );\n      }"], _36.raw = ["\n      function foo() {\n        return ((bar === 1 || bar === 2) &&\n          (z === 3 || z === 4)\n        );\n      }"], ruleTester_1.dedent(_36)),
        options: [2]
    },
    {
        code: (_37 = ["\n      function foo() {\n        return ((bar === 1 || bar === 2) &&\n          (z === 3 || z === 4));\n      }"], _37.raw = ["\n      function foo() {\n        return ((bar === 1 || bar === 2) &&\n          (z === 3 || z === 4));\n      }"], ruleTester_1.dedent(_37)),
        options: [2]
    },
    {
        code: (_38 = ["\n      var foo = function() {\n        return bar(\n          [{\n          }].concat(baz)\n        );\n      };"], _38.raw = ["\n      var foo = function() {\n        return bar(\n          [{\n          }].concat(baz)\n        );\n      };"], ruleTester_1.dedent(_38)),
        options: [2]
    }
]);
ruleTester.addTestGroup('indent-number-errors', 'should warn of indentation errors', [
    {
        code: (_39 = ["\n      /**/var b; // NO ERROR: single line multi-line comments followed by code is OK\n      /*\n       *\n       */ var b; // ERROR: multi-line comments followed by code is not OK\n      "], _39.raw = ["\n      /**/var b; // NO ERROR: single line multi-line comments followed by code is OK\n      /*\n       *\n       */ var b; // ERROR: multi-line comments followed by code is not OK\n      "], ruleTester_1.dedent(_39)),
        options: [2],
        errors: expecting([[4, 0, 1]])
    },
    {
        code: (_40 = ["\n      var a = b;\n      if (a) {\n      b();\n      }"], _40.raw = ["\n      var a = b;\n      if (a) {\n      b();\n      }"], ruleTester_1.dedent(_40)),
        options: [2],
        errors: expecting([[3, 2, 0]])
    },
    {
        code: (_41 = ["\n      if (array.some(function(){\n        return true;\n      })) {\n      a++; // ->\n        b++;\n          c++; // <-\n      }"], _41.raw = ["\n      if (array.some(function(){\n        return true;\n      })) {\n      a++; // ->\n        b++;\n          c++; // <-\n      }"], ruleTester_1.dedent(_41)),
        options: [2],
        errors: expecting([[4, 2, 0], [6, 2, 4]])
    },
    {
        code: '\nif (a){\n\tb=c;\n\t\tc=d;\ne=f;\n}',
        options: ['tab'],
        errors: expecting([
            [3, 1, 2],
            [4, 1, 0]
        ], 'tab')
    },
    {
        code: '\nif (a){\n    b=c;\n      c=d;\n e=f;\n}',
        options: [4],
        errors: expecting([[3, 4, 6], [4, 4, 1]])
    },
    {
        code: (_42 = ["\n      var x = 0 &&\n          {\n             a: 1,\n                b: 2\n          };"], _42.raw = ["\n      var x = 0 &&\n          {\n             a: 1,\n                b: 2\n          };"], ruleTester_1.dedent(_42)),
        options: [4],
        errors: expecting([[3, 8, 7], [4, 8, 10]])
    },
    {
        code: (_43 = ["\n      switch(value){\n      case \"1\":\n              a();\n              break;\n          case \"2\":\n              break;\n          default:\n              break;\n      }"], _43.raw = ["\n      switch(value){\n      case \"1\":\n              a();\n              break;\n          case \"2\":\n              break;\n          default:\n              break;\n      }"], ruleTester_1.dedent(_43)),
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
        code: (_44 = ["\n      var obj = {foo: 1, bar: 2};\n      with (obj) {\n      console.log(foo + bar);\n      }"], _44.raw = ["\n      var obj = {foo: 1, bar: 2};\n      with (obj) {\n      console.log(foo + bar);\n      }"], ruleTester_1.dedent(_44)),
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
        code: (_45 = ["\n      do\n      b();\n      while(true)"], _45.raw = ["\n      do\n      b();\n      while(true)"], ruleTester_1.dedent(_45)),
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: '\nif(true) \nb();',
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: (_46 = ["\n      var test = {\n            a: 1,\n          b: 2\n          };"], _46.raw = ["\n      var test = {\n            a: 1,\n          b: 2\n          };"], ruleTester_1.dedent(_46)),
        options: [2],
        errors: expecting([
            [2, 2, 6],
            [3, 2, 4],
            [4, 0, 4]
        ])
    },
    {
        code: (_47 = ["\n      var a = function() {\n            a++;\n          b++;\n                c++;\n          },\n          b;"], _47.raw = ["\n      var a = function() {\n            a++;\n          b++;\n                c++;\n          },\n          b;"], ruleTester_1.dedent(_47)),
        options: [4],
        errors: expecting([
            [2, 8, 6],
            [3, 8, 4],
            [4, 8, 10]
        ])
    },
    {
        code: (_48 = ["\n      var a = 1,\n      b = 2,\n      c = 3;"], _48.raw = ["\n      var a = 1,\n      b = 2,\n      c = 3;"], ruleTester_1.dedent(_48)),
        options: [4],
        errors: expecting([
            [2, 4, 0],
            [3, 4, 0]
        ])
    },
    {
        code: (_49 = ["\n      [a, b,\n      c].forEach((index) => {\n        index;\n      });"], _49.raw = ["\n      [a, b,\n      c].forEach((index) => {\n        index;\n      });"], ruleTester_1.dedent(_49)),
        options: [4],
        errors: expecting([[2, 4, 0], [3, 4, 2]])
    },
    {
        code: (_50 = ["\n      [a, b,\n      c].forEach(function(index){\n        return index;\n      });"], _50.raw = ["\n      [a, b,\n      c].forEach(function(index){\n        return index;\n      });"], ruleTester_1.dedent(_50)),
        options: [4],
        errors: expecting([[2, 4, 0], [3, 4, 2]])
    },
    {
        code: (_51 = ["\n      [a, b,\n      c].forEach(function(index){\n          return index;\n      });"], _51.raw = ["\n      [a, b,\n      c].forEach(function(index){\n          return index;\n      });"], ruleTester_1.dedent(_51)),
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: (_52 = ["\n      [a, b, c].forEach((index) => {\n        index;\n      });"], _52.raw = ["\n      [a, b, c].forEach((index) => {\n        index;\n      });"], ruleTester_1.dedent(_52)),
        options: [4],
        errors: expecting([[2, 4, 2]])
    },
    {
        code: (_53 = ["\n      [a, b, c].forEach(function(index){\n        return index;\n      });"], _53.raw = ["\n      [a, b, c].forEach(function(index){\n        return index;\n      });"], ruleTester_1.dedent(_53)),
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
        code: (_54 = ["\n      var a = new Test({\n            a: 1\n        }),\n          b = 4;"], _54.raw = ["\n      var a = new Test({\n            a: 1\n        }),\n          b = 4;"], ruleTester_1.dedent(_54)),
        options: [4],
        errors: expecting([
            [2, 8, 6],
            [3, 4, 2]
        ])
    },
    {
        code: (_55 = ["\n      var path     = require('path')\n       , crypto    = require('crypto')\n      ;"], _55.raw = ["\n      var path     = require('path')\n       , crypto    = require('crypto')\n      ;"], ruleTester_1.dedent(_55)),
        options: [2],
        errors: expecting([[3, 1, 0]])
    },
    {
        code: (_56 = ["\n      var a = 1\n         ,b = 2\n      ;"], _56.raw = ["\n      var a = 1\n         ,b = 2\n      ;"], ruleTester_1.dedent(_56)),
        errors: expecting([[3, 3, 0]])
    },
    {
        code: (_57 = ["\n      {\n          if(a){\n              foo();\n          }\n        else{\n              bar();\n          }\n      }"], _57.raw = ["\n      {\n          if(a){\n              foo();\n          }\n        else{\n              bar();\n          }\n      }"], ruleTester_1.dedent(_57)),
        options: [4],
        errors: expecting([[5, 4, 2]])
    },
    {
        code: (_58 = ["\n      {\n          if(a){\n              foo();\n          }\n        else\n              bar();\n\n      }"], _58.raw = ["\n      {\n          if(a){\n              foo();\n          }\n        else\n              bar();\n\n      }"], ruleTester_1.dedent(_58)),
        options: [4],
        errors: expecting([[5, 4, 2]])
    },
    {
        code: (_59 = ["\n      {\n          if(a)\n              foo();\n        else\n              bar();\n      }"], _59.raw = ["\n      {\n          if(a)\n              foo();\n        else\n              bar();\n      }"], ruleTester_1.dedent(_59)),
        options: [4],
        errors: expecting([[4, 4, 2]])
    },
    {
        code: (_60 = ["\n      if (foo) bar();\n      else if (baz) foobar();\n        else if (qux) qux();"], _60.raw = ["\n      if (foo) bar();\n      else if (baz) foobar();\n        else if (qux) qux();"], ruleTester_1.dedent(_60)),
        options: [2],
        errors: expecting([[3, 0, 2]])
    },
    {
        code: (_61 = ["\n      if (foo) bar();\n      else if (baz) foobar();\n        else qux();"], _61.raw = ["\n      if (foo) bar();\n      else if (baz) foobar();\n        else qux();"], ruleTester_1.dedent(_61)),
        options: [2],
        errors: expecting([[3, 0, 2]])
    },
    {
        code: (_62 = ["\n      foo();\n        if (baz) foobar();\n        else qux();"], _62.raw = ["\n      foo();\n        if (baz) foobar();\n        else qux();"], ruleTester_1.dedent(_62)),
        options: [2],
        errors: expecting([[2, 0, 2], [3, 0, 2]])
    },
    {
        code: (_63 = ["\n      if (foo) bar();\n      else if (baz) foobar();\n           else if (bip) {\n             qux();\n           }"], _63.raw = ["\n      if (foo) bar();\n      else if (baz) foobar();\n           else if (bip) {\n             qux();\n           }"], ruleTester_1.dedent(_63)),
        options: [2],
        errors: expecting([[3, 0, 5]])
    },
    {
        code: (_64 = ["\n      if (foo) bar();\n      else if (baz) {\n          foobar();\n           } else if (boop) {\n             qux();\n           }"], _64.raw = ["\n      if (foo) bar();\n      else if (baz) {\n          foobar();\n           } else if (boop) {\n             qux();\n           }"], ruleTester_1.dedent(_64)),
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
        code: (_65 = ["\n      require('http').request({hostname: 'localhost',\n                        port: 80}, function(res) {\n        res.end();\n      });\n      "], _65.raw = ["\n      require('http').request({hostname: 'localhost',\n                        port: 80}, function(res) {\n        res.end();\n      });\n      "], ruleTester_1.dedent(_65)),
        options: [2],
        errors: expecting([[2, 2, 18]])
    },
    {
        code: (_66 = ["\n      var x = ['a',\n               'b',\n               'c'\n      ];"], _66.raw = ["\n      var x = ['a',\n               'b',\n               'c'\n      ];"], ruleTester_1.dedent(_66)),
        output: (_67 = ["\n      var x = ['a',\n          'b',\n          'c'\n      ];"], _67.raw = ["\n      var x = ['a',\n          'b',\n          'c'\n      ];"], ruleTester_1.dedent(_67)),
        options: [4],
        errors: expecting([
            [2, 4, 9],
            [3, 4, 9]
        ])
    },
    {
        code: (_68 = ["\n      var x = [\n               'a',\n               'b',\n               'c'\n      ];"], _68.raw = ["\n      var x = [\n               'a',\n               'b',\n               'c'\n      ];"], ruleTester_1.dedent(_68)),
        output: (_69 = ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], _69.raw = ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], ruleTester_1.dedent(_69)),
        options: [4],
        errors: expecting([
            [2, 4, 9],
            [3, 4, 9],
            [4, 4, 9]
        ])
    },
    {
        code: (_70 = ["\n      var x = [\n               'a',\n               'b',\n               'c',\n      'd'];"], _70.raw = ["\n      var x = [\n               'a',\n               'b',\n               'c',\n      'd'];"], ruleTester_1.dedent(_70)),
        output: (_71 = ["\n      var x = [\n          'a',\n          'b',\n          'c',\n          'd'];"], _71.raw = ["\n      var x = [\n          'a',\n          'b',\n          'c',\n          'd'];"], ruleTester_1.dedent(_71)),
        options: [4],
        errors: expecting([
            [2, 4, 9],
            [3, 4, 9],
            [4, 4, 9],
            [5, 4, 0]
        ])
    },
    {
        code: (_72 = ["\n      var x = [\n               'a',\n               'b',\n               'c'\n        ];"], _72.raw = ["\n      var x = [\n               'a',\n               'b',\n               'c'\n        ];"], ruleTester_1.dedent(_72)),
        output: (_73 = ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], _73.raw = ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], ruleTester_1.dedent(_73)),
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
        code: (_74 = ["\n      class MyComponent {\n          @Input prop: number;\n      }\n    "], _74.raw = ["\n      class MyComponent {\n          @Input prop: number;\n      }\n    "], ruleTester_1.dedent(_74))
    },
    {
        code: (_75 = ["\n      class MyComponent {\n       @Input prop: number;\n      }\n    "], _75.raw = ["\n      class MyComponent {\n       @Input prop: number;\n      }\n    "], ruleTester_1.dedent(_75)),
        errors: expecting([[2, 4, 1]])
    }
]);
ruleTester.addTestGroup('member-expression', 'should handle member expression statements', [
    {
        code: (_76 = ["\n      this.http.get('/')\n        .map(res => res.json())"], _76.raw = ["\n      this.http.get('/')\n        .map(res => res.json())"], ruleTester_1.dedent(_76)),
        options: [2, { MemberExpression: 1 }]
    },
    {
        code: (_77 = ["\n      function test() {\n          return client.signUp(email, PASSWORD, { preVerified: true })\n          .then(function (result) {\n              var x = 1;\n              var y = 1;\n          }, function(err){\n              var o = 1 - 2;\n              var y = 1 - 2;\n              return true;\n          });\n      }"], _77.raw = ["\n      function test() {\n          return client.signUp(email, PASSWORD, { preVerified: true })\n          .then(function (result) {\n              var x = 1;\n              var y = 1;\n          }, function(err){\n              var o = 1 - 2;\n              var y = 1 - 2;\n              return true;\n          });\n      }"], ruleTester_1.dedent(_77)),
        options: [4, { MemberExpression: 0 }]
    },
    {
        code: (_78 = ["\n      var obj = {\n        send: function () {\n          return P.resolve({\n            type: 'POST'\n          })\n          .then(function () {\n            return true;\n          }, function () {\n            return false;\n          });\n        }\n      };\n      "], _78.raw = ["\n      var obj = {\n        send: function () {\n          return P.resolve({\n            type: 'POST'\n          })\n          .then(function () {\n            return true;\n          }, function () {\n            return false;\n          });\n        }\n      };\n      "], ruleTester_1.dedent(_78)),
        options: [2, { MemberExpression: 0 }]
    },
    {
        code: (_79 = ["\n      const func = function (opts) {\n          return Promise.resolve()\n          .then(() => {\n              [\n                  'ONE', 'TWO'\n              ].forEach(command => { doSomething(); });\n          });\n      };"], _79.raw = ["\n      const func = function (opts) {\n          return Promise.resolve()\n          .then(() => {\n              [\n                  'ONE', 'TWO'\n              ].forEach(command => { doSomething(); });\n          });\n      };"], ruleTester_1.dedent(_79)),
        options: [4, { MemberExpression: 0 }]
    },
    {
        code: (_80 = ["\n      Buffer.length\n      "], _80.raw = ["\n      Buffer.length\n      "], ruleTester_1.dedent(_80)),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: (_81 = ["\n      Buffer\n          .indexOf('a')\n          .toString()\n      "], _81.raw = ["\n      Buffer\n          .indexOf('a')\n          .toString()\n      "], ruleTester_1.dedent(_81)),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: (_82 = ["\n      Buffer.\n          length\n      "], _82.raw = ["\n      Buffer.\n          length\n      "], ruleTester_1.dedent(_82)),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: (_83 = ["\n      Buffer\n          .foo\n          .bar\n      "], _83.raw = ["\n      Buffer\n          .foo\n          .bar\n      "], ruleTester_1.dedent(_83)),
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
        code: (_84 = ["\n      Buffer\n          .foo\n          .bar"], _84.raw = ["\n      Buffer\n          .foo\n          .bar"], ruleTester_1.dedent(_84)),
        options: [2, { MemberExpression: 2 }]
    },
    {
        code: (_85 = ["\n      MemberExpression\n      .\n        .o\n          .\n       .default();"], _85.raw = ["\n      MemberExpression\n      .\n        .o\n          .\n       .default();"], ruleTester_1.dedent(_85)),
        options: [4]
    },
    {
        code: (_86 = ["\n      foo = bar.baz()\n              .bip();"], _86.raw = ["\n      foo = bar.baz()\n              .bip();"], ruleTester_1.dedent(_86)),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: '\nBuffer\n.toString()',
        options: [4, { MemberExpression: 1 }],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: (_87 = ["\n      Buffer\n          .indexOf('a')\n      .toString()"], _87.raw = ["\n      Buffer\n          .indexOf('a')\n      .toString()"], ruleTester_1.dedent(_87)),
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
        code: (_88 = ["\n      var foo = function(){\n          foo\n                .bar\n      }"], _88.raw = ["\n      var foo = function(){\n          foo\n                .bar\n      }"], ruleTester_1.dedent(_88)),
        options: [4, { MemberExpression: 1 }],
        errors: expecting([[3, 8, 10]])
    },
    {
        code: (_89 = ["\n      var foo = function(){\n          foo\n                   .bar\n      }"], _89.raw = ["\n      var foo = function(){\n          foo\n                   .bar\n      }"], ruleTester_1.dedent(_89)),
        options: [4, { MemberExpression: 2 }],
        errors: expecting([[3, 12, 13]])
    },
    {
        code: (_90 = ["\n      var foo = () => {\n          foo\n                   .bar\n      }"], _90.raw = ["\n      var foo = () => {\n          foo\n                   .bar\n      }"], ruleTester_1.dedent(_90)),
        options: [4, { MemberExpression: 2 }],
        errors: expecting([[3, 12, 13]])
    },
    {
        code: (_91 = ["\n      TestClass.prototype.method = function () {\n        return Promise.resolve(3)\n            .then(function (x) {\n              return x;\n            });\n      };"], _91.raw = ["\n      TestClass.prototype.method = function () {\n        return Promise.resolve(3)\n            .then(function (x) {\n              return x;\n            });\n      };"], ruleTester_1.dedent(_91)),
        options: [2, { MemberExpression: 1 }],
        errors: expecting([[3, 4, 6]])
    }
]);
ruleTester.addTestGroup('fixture', 'should check the "indent-invalid.txt" fixture file', [
    {
        code: '\n' + ruleTester_1.readFixture('indent-invalid.txt'),
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
        code: (_92 = ["\n      var geometry = 2,\n      rotate = 2;"], _92.raw = ["\n      var geometry = 2,\n      rotate = 2;"], ruleTester_1.dedent(_92)),
        options: [2, { VariableDeclarator: 0 }]
    },
    {
        code: (_93 = ["\n      var geometry,\n          rotate;"], _93.raw = ["\n      var geometry,\n          rotate;"], ruleTester_1.dedent(_93)),
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
        code: (_94 = ["\n      var geometry,\n        rotate;"], _94.raw = ["\n      var geometry,\n        rotate;"], ruleTester_1.dedent(_94)),
        options: [2, { VariableDeclarator: 1 }]
    },
    {
        code: (_95 = ["\n      var geometry,\n          rotate;"], _95.raw = ["\n      var geometry,\n          rotate;"], ruleTester_1.dedent(_95)),
        options: [2, { VariableDeclarator: 2 }]
    },
    {
        code: (_96 = ["\n      let geometry,\n          rotate;"], _96.raw = ["\n      let geometry,\n          rotate;"], ruleTester_1.dedent(_96)),
        options: [2, { VariableDeclarator: 2 }]
    },
    {
        code: (_97 = ["\n      const geometry = 2,\n          rotate = 3;"], _97.raw = ["\n      const geometry = 2,\n          rotate = 3;"], ruleTester_1.dedent(_97)),
        options: [2, { VariableDeclarator: 2 }]
    },
    {
        code: (_98 = ["\n      var items = [\n        {\n          foo: 'bar'\n        }\n      ];\n      "], _98.raw = ["\n      var items = [\n        {\n          foo: 'bar'\n        }\n      ];\n      "], ruleTester_1.dedent(_98)),
        options: [2, { VariableDeclarator: 2 }]
    },
    {
        code: (_99 = ["\n      const a = 1,\n            b = 2;\n      const items1 = [\n        {\n          foo: 'bar'\n        }\n      ];\n      const items2 = Items(\n        {\n          foo: 'bar'\n        }\n      );\n      "], _99.raw = ["\n      const a = 1,\n            b = 2;\n      const items1 = [\n        {\n          foo: 'bar'\n        }\n      ];\n      const items2 = Items(\n        {\n          foo: 'bar'\n        }\n      );\n      "], ruleTester_1.dedent(_99)),
        options: [2, { VariableDeclarator: 3 }]
    },
    {
        code: (_100 = ["\n      const geometry = 2,\n            rotate = 3;\n      var a = 1,\n        b = 2;\n      let light = true,\n          shadow = false;"], _100.raw = ["\n      const geometry = 2,\n            rotate = 3;\n      var a = 1,\n        b = 2;\n      let light = true,\n          shadow = false;"], ruleTester_1.dedent(_100)),
        options: [2, { VariableDeclarator: { const: 3, let: 2 } }]
    },
    {
        code: (_101 = ["\n        const YO = 'bah',\n              TE = 'mah'\n\n        var res,\n            a = 5,\n            b = 4\n        "], _101.raw = ["\n        const YO = 'bah',\n              TE = 'mah'\n\n        var res,\n            a = 5,\n            b = 4\n        "], ruleTester_1.dedent(_101)),
        options: [2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }]
    },
    {
        code: (_102 = ["\n        const YO = 'bah',\n              TE = 'mah'\n\n        var res,\n            a = 5,\n            b = 4\n\n        if (YO) console.log(TE)"], _102.raw = ["\n        const YO = 'bah',\n              TE = 'mah'\n\n        var res,\n            a = 5,\n            b = 4\n\n        if (YO) console.log(TE)"], ruleTester_1.dedent(_102)),
        options: [2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }]
    },
    {
        code: (_103 = ["\n        var Command = function() {\n          var fileList = [],\n              files = []\n\n          files.concat(fileList)\n        };\n        "], _103.raw = ["\n        var Command = function() {\n          var fileList = [],\n              files = []\n\n          files.concat(fileList)\n        };\n        "], ruleTester_1.dedent(_103)),
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
        code: (_104 = ["\n      /**\n       * @var {number}\n       * @var {number}\n       */\n      var geometry,\n          rotate;"], _104.raw = ["\n      /**\n       * @var {number}\n       * @var {number}\n       */\n      var geometry,\n          rotate;"], ruleTester_1.dedent(_104)),
        options: [4, { VariableDeclarator: 1 }]
    },
    {
        code: (_105 = ["\n      /**\n       * @var {number}\n       * @var {number}\n       */\n      var geometry,\n         rotate;"], _105.raw = ["\n      /**\n       * @var {number}\n       * @var {number}\n       */\n      var geometry,\n         rotate;"], ruleTester_1.dedent(_105)),
        options: [4, { VariableDeclarator: 1 }],
        errors: expecting([[6, 4, 3]])
    },
    {
        code: (_106 = ["\n      var a = new Test({\n            a: 1\n          }),\n          b = 4;\n      const a = new Test({\n            a: 1\n          }),\n          b = 4;"], _106.raw = ["\n      var a = new Test({\n            a: 1\n          }),\n          b = 4;\n      const a = new Test({\n            a: 1\n          }),\n          b = 4;"], ruleTester_1.dedent(_106)),
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
        code: (_107 = ["\n      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,\n        height, rotate;\n      "], _107.raw = ["\n      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,\n        height, rotate;\n      "], ruleTester_1.dedent(_107)),
        options: [2, { SwitchCase: 1 }]
    },
    {
        code: (_108 = ["\n      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth;\n      "], _108.raw = ["\n      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth;\n      "], ruleTester_1.dedent(_108)),
        options: [2, { SwitchCase: 1 }]
    },
    {
        code: (_109 = ["\n      switch (x) {\n          case \"foo\":\n              a();\n              break;\n          case \"bar\":\n              switch (y) {\n                  case \"1\":\n                      break;\n                  case \"2\":\n                      a = 6;\n                      break;\n              }\n          case \"test\":\n              break;\n      }"], _109.raw = ["\n      switch (x) {\n          case \"foo\":\n              a();\n              break;\n          case \"bar\":\n              switch (y) {\n                  case \"1\":\n                      break;\n                  case \"2\":\n                      a = 6;\n                      break;\n              }\n          case \"test\":\n              break;\n      }"], ruleTester_1.dedent(_109)),
        options: [4, { SwitchCase: 1 }]
    },
    {
        code: (_110 = ["\n      switch (x) {\n              case \"foo\":\n                  a();\n                  break;\n              case \"bar\":\n                  switch (y) {\n                          case \"1\":\n                              break;\n                          case \"2\":\n                              a = 6;\n                              break;\n                  }\n              case \"test\":\n                  break;\n      }"], _110.raw = ["\n      switch (x) {\n              case \"foo\":\n                  a();\n                  break;\n              case \"bar\":\n                  switch (y) {\n                          case \"1\":\n                              break;\n                          case \"2\":\n                              a = 6;\n                              break;\n                  }\n              case \"test\":\n                  break;\n      }"], ruleTester_1.dedent(_110)),
        options: [4, { SwitchCase: 2 }]
    },
    {
        code: (_111 = ["\n      switch(value){\n          case \"1\":\n          case \"2\":\n              a();\n              break;\n          default:\n              a();\n              break;\n      }\n      switch(value){\n          case \"1\":\n              a();\n              break;\n          case \"2\":\n              break;\n          default:\n              break;\n      }"], _111.raw = ["\n      switch(value){\n          case \"1\":\n          case \"2\":\n              a();\n              break;\n          default:\n              a();\n              break;\n      }\n      switch(value){\n          case \"1\":\n              a();\n              break;\n          case \"2\":\n              break;\n          default:\n              break;\n      }"], ruleTester_1.dedent(_111)),
        options: [4, { SwitchCase: 1 }]
    },
    {
        code: (_112 = ["\n        function salutation () {\n          switch (1) {\n            case 0: return console.log('hi')\n            case 1: return console.log('hey')\n          }\n        }\n        "], _112.raw = ["\n        function salutation () {\n          switch (1) {\n            case 0: return console.log('hi')\n            case 1: return console.log('hey')\n          }\n        }\n        "], ruleTester_1.dedent(_112)),
        options: [2, { SwitchCase: 1 }]
    },
    {
        code: (_113 = ["\n        switch(value){\n            case \"1\":\n                a();\n            break;\n            case \"2\":\n                a();\n            break;\n            default:\n                a();\n                break;\n        }"], _113.raw = ["\n        switch(value){\n            case \"1\":\n                a();\n            break;\n            case \"2\":\n                a();\n            break;\n            default:\n                a();\n                break;\n        }"], ruleTester_1.dedent(_113)),
        options: [4, { SwitchCase: 1 }],
        errors: expecting([[4, 8, 4], [7, 8, 4]])
    },
    {
        code: (_114 = ["\n        switch(value){\n            case \"1\":\n                a();\n                break;\n            case \"2\":\n                a();\n                break;\n            default:\n            break;\n        }"], _114.raw = ["\n        switch(value){\n            case \"1\":\n                a();\n                break;\n            case \"2\":\n                a();\n                break;\n            default:\n            break;\n        }"], ruleTester_1.dedent(_114)),
        options: [4, { SwitchCase: 1 }],
        errors: expecting([[9, 8, 4]])
    },
    {
        code: (_115 = ["\n        switch(value){\n            case \"1\":\n            case \"2\":\n                a();\n                break;\n            default:\n                break;\n        }\n        switch(value){\n            case \"1\":\n            break;\n            case \"2\":\n                a();\n            break;\n            default:\n                a();\n            break;\n        }"], _115.raw = ["\n        switch(value){\n            case \"1\":\n            case \"2\":\n                a();\n                break;\n            default:\n                break;\n        }\n        switch(value){\n            case \"1\":\n            break;\n            case \"2\":\n                a();\n            break;\n            default:\n                a();\n            break;\n        }"], ruleTester_1.dedent(_115)),
        options: [4, { SwitchCase: 1 }],
        errors: expecting([[11, 8, 4], [14, 8, 4], [17, 8, 4]])
    },
    {
        code: (_116 = ["\n        switch (a) {\n        case '1':\n        b();\n        break;\n        default:\n        c();\n        break;\n        }"], _116.raw = ["\n        switch (a) {\n        case '1':\n        b();\n        break;\n        default:\n        c();\n        break;\n        }"], ruleTester_1.dedent(_116)),
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
        code: (_117 = ["\n        function salutation () {\n          switch (1) {\n          case 0: return console.log('hi')\n            case 1: return console.log('hey')\n          }\n        }"], _117.raw = ["\n        function salutation () {\n          switch (1) {\n          case 0: return console.log('hi')\n            case 1: return console.log('hey')\n          }\n        }"], ruleTester_1.dedent(_117)),
        options: [2, { SwitchCase: 1 }],
        errors: expecting([
            [3, 4, 2]
        ])
    },
    {
        code: (_118 = ["\n        var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,\n        height, rotate;"], _118.raw = ["\n        var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,\n        height, rotate;"], ruleTester_1.dedent(_118)),
        options: [2, { SwitchCase: 1 }],
        errors: expecting([
            [2, 2, 0]
        ])
    },
    {
        code: (_119 = ["\n        switch (a) {\n        case '1':\n        b();\n        break;\n        default:\n        c();\n        break;\n        }"], _119.raw = ["\n        switch (a) {\n        case '1':\n        b();\n        break;\n        default:\n        c();\n        break;\n        }"], ruleTester_1.dedent(_119)),
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
        code: (_120 = ["\n      if(data) {\n        console.log('hi');\n        b = true;};"], _120.raw = ["\n      if(data) {\n        console.log('hi');\n        b = true;};"], ruleTester_1.dedent(_120)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_121 = ["\n      foo = () => {\n        console.log('hi');\n        return true;};"], _121.raw = ["\n      foo = () => {\n        console.log('hi');\n        return true;};"], ruleTester_1.dedent(_121)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_122 = ["\n      function test(data) {\n        console.log('hi');\n        return true;};"], _122.raw = ["\n      function test(data) {\n        console.log('hi');\n        return true;};"], ruleTester_1.dedent(_122)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_123 = ["\n      var test = function(data) {\n        console.log('hi');\n      };"], _123.raw = ["\n      var test = function(data) {\n        console.log('hi');\n      };"], ruleTester_1.dedent(_123)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_124 = ["\n      arr.forEach(function(data) {\n        otherdata.forEach(function(zero) {\n          console.log('hi');\n        }) });"], _124.raw = ["\n      arr.forEach(function(data) {\n        otherdata.forEach(function(zero) {\n          console.log('hi');\n        }) });"], ruleTester_1.dedent(_124)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_125 = ["\n      a = [\n          ,3\n      ]"], _125.raw = ["\n      a = [\n          ,3\n      ]"], ruleTester_1.dedent(_125)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_126 = ["\n      [\n        ['gzip', 'gunzip'],\n        ['gzip', 'unzip'],\n        ['deflate', 'inflate'],\n        ['deflateRaw', 'inflateRaw'],\n      ].forEach(function(method) {\n        console.log(method);\n      });\n      "], _126.raw = ["\n      [\n        ['gzip', 'gunzip'],\n        ['gzip', 'unzip'],\n        ['deflate', 'inflate'],\n        ['deflateRaw', 'inflateRaw'],\n      ].forEach(function(method) {\n        console.log(method);\n      });\n      "], ruleTester_1.dedent(_126)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_127 = ["\n      test(123, {\n          bye: {\n              hi: [1,\n                  {\n                      b: 2\n                  }\n              ]\n          }\n      });"], _127.raw = ["\n      test(123, {\n          bye: {\n              hi: [1,\n                  {\n                      b: 2\n                  }\n              ]\n          }\n      });"], ruleTester_1.dedent(_127)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_128 = ["\n      var xyz = 2,\n          lmn = [\n              {\n                  a: 1\n              }\n          ];"], _128.raw = ["\n      var xyz = 2,\n          lmn = [\n              {\n                  a: 1\n              }\n          ];"], ruleTester_1.dedent(_128)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_129 = ["\n      lmn = [{\n          a: 1\n      },\n      {\n          b: 2\n\n      {\n          x: 2\n      }];"], _129.raw = ["\n      lmn = [{\n          a: 1\n      },\n      {\n          b: 2\n\n      {\n          x: 2\n      }];"], ruleTester_1.dedent(_129)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_130 = ["\n      abc({\n          test: [\n              [\n                  c,\n                  xyz,\n                  2\n              ].join(',')\n          ]\n      });"], _130.raw = ["\n      abc({\n          test: [\n              [\n                  c,\n                  xyz,\n                  2\n              ].join(',')\n          ]\n      });"], ruleTester_1.dedent(_130)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_131 = ["\n      abc = {\n        test: [\n          [\n            c,\n            xyz,\n            2\n          ]\n        ]\n      };"], _131.raw = ["\n      abc = {\n        test: [\n          [\n            c,\n            xyz,\n            2\n          ]\n        ]\n      };"], ruleTester_1.dedent(_131)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_132 = ["\n      abc(\n        {\n          a: 1,\n          b: 2\n        }\n      );"], _132.raw = ["\n      abc(\n        {\n          a: 1,\n          b: 2\n        }\n      );"], ruleTester_1.dedent(_132)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_133 = ["\n      abc({\n          a: 1,\n          b: 2\n      });"], _133.raw = ["\n      abc({\n          a: 1,\n          b: 2\n      });"], ruleTester_1.dedent(_133)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_134 = ["\n      var abc =\n        [\n          c,\n          xyz,\n          {\n            a: 1,\n            b: 2\n          }\n        ];"], _134.raw = ["\n      var abc =\n        [\n          c,\n          xyz,\n          {\n            a: 1,\n            b: 2\n          }\n        ];"], ruleTester_1.dedent(_134)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_135 = ["\n      var abc = [\n        c,\n        xyz,\n        {\n          a: 1,\n          b: 2\n        }\n      ];"], _135.raw = ["\n      var abc = [\n        c,\n        xyz,\n        {\n          a: 1,\n          b: 2\n        }\n      ];"], ruleTester_1.dedent(_135)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_136 = ["\n      var abc = 5,\n          c = 2,\n          xyz =\n          {\n            a: 1,\n            b: 2\n          };"], _136.raw = ["\n      var abc = 5,\n          c = 2,\n          xyz =\n          {\n            a: 1,\n            b: 2\n          };"], ruleTester_1.dedent(_136)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_137 = ["\n      var abc =\n          {\n            a: 1,\n            b: 2\n          };"], _137.raw = ["\n      var abc =\n          {\n            a: 1,\n            b: 2\n          };"], ruleTester_1.dedent(_137)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_138 = ["\n      var a = new abc({\n              a: 1,\n              b: 2\n          }),\n          b = 2;"], _138.raw = ["\n      var a = new abc({\n              a: 1,\n              b: 2\n          }),\n          b = 2;"], ruleTester_1.dedent(_138)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_139 = ["\n      var a = 2,\n        c = {\n          a: 1,\n          b: 2\n        },\n        b = 2;"], _139.raw = ["\n      var a = 2,\n        c = {\n          a: 1,\n          b: 2\n        },\n        b = 2;"], ruleTester_1.dedent(_139)),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_140 = ["\n      var x = 2,\n          y = {\n            a: 1,\n            b: 2\n          },\n          b = 2;"], _140.raw = ["\n      var x = 2,\n          y = {\n            a: 1,\n            b: 2\n          },\n          b = 2;"], ruleTester_1.dedent(_140)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_141 = ["\n      var e = {\n            a: 1,\n            b: 2\n          },\n          b = 2;"], _141.raw = ["\n      var e = {\n            a: 1,\n            b: 2\n          },\n          b = 2;"], ruleTester_1.dedent(_141)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_142 = ["\n      var a = {\n        a: 1,\n        b: 2\n      };"], _142.raw = ["\n      var a = {\n        a: 1,\n        b: 2\n      };"], ruleTester_1.dedent(_142)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_143 = ["\n      function test() {\n        if (true ||\n                  false){\n          console.log(val);\n        }\n      }"], _143.raw = ["\n      function test() {\n        if (true ||\n                  false){\n          console.log(val);\n        }\n      }"], ruleTester_1.dedent(_143)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_144 = ["\n      for (var val in obj)\n        if (true)\n          console.log(val);"], _144.raw = ["\n      for (var val in obj)\n        if (true)\n          console.log(val);"], ruleTester_1.dedent(_144)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_145 = ["\n      if(true)\n        if (true)\n          if (true)\n            console.log(val);"], _145.raw = ["\n      if(true)\n        if (true)\n          if (true)\n            console.log(val);"], ruleTester_1.dedent(_145)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_146 = ["\n      function hi(){     var a = 1;\n        y++;                   x++;\n      }"], _146.raw = ["\n      function hi(){     var a = 1;\n        y++;                   x++;\n      }"], ruleTester_1.dedent(_146)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_147 = ["\n      for(;length > index; index++)if(NO_HOLES || index in self){\n        x++;\n      }"], _147.raw = ["\n      for(;length > index; index++)if(NO_HOLES || index in self){\n        x++;\n      }"], ruleTester_1.dedent(_147)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_148 = ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n            return fn.call(that, a);\n          };\n        }\n      }"], _148.raw = ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n            return fn.call(that, a);\n          };\n        }\n      }"], ruleTester_1.dedent(_148)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_149 = ["\n      const abc = 5,\n            c = 2,\n            xyz =\n            {\n              a: 1,\n              b: 2\n            };\n      let abc = 5,\n        c = 2,\n        xyz =\n        {\n          a: 1,\n          b: 2\n        };\n      var abc = 5,\n          c = 2,\n          xyz =\n          {\n            a: 1,\n            b: 2\n          };\n      "], _149.raw = ["\n      const abc = 5,\n            c = 2,\n            xyz =\n            {\n              a: 1,\n              b: 2\n            };\n      let abc = 5,\n        c = 2,\n        xyz =\n        {\n          a: 1,\n          b: 2\n        };\n      var abc = 5,\n          c = 2,\n          xyz =\n          {\n            a: 1,\n            b: 2\n          };\n      "], ruleTester_1.dedent(_149)),
        options: [2, { VariableDeclarator: { var: 2, const: 3 }, SwitchCase: 1 }]
    },
    {
        code: (_150 = ["\n      var a = 1,\n          B = class {\n            constructor(){}\n            a(){}\n            get b(){}\n          };"], _150.raw = ["\n      var a = 1,\n          B = class {\n            constructor(){}\n            a(){}\n            get b(){}\n          };"], ruleTester_1.dedent(_150)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_151 = ["\n      var a = 1,\n          B =\n          class {\n            constructor(){}\n            a(){}\n            get b(){}\n          },\n          c = 3;"], _151.raw = ["\n      var a = 1,\n          B =\n          class {\n            constructor(){}\n            a(){}\n            get b(){}\n          },\n          c = 3;"], ruleTester_1.dedent(_151)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: (_152 = ["\n      class A{\n          constructor(){}\n          a(){}\n          get b(){}\n      }"], _152.raw = ["\n      class A{\n          constructor(){}\n          a(){}\n          get b(){}\n      }"], ruleTester_1.dedent(_152)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_153 = ["\n      var A = class {\n          constructor(){}\n          a(){}\n          get b(){}\n      }"], _153.raw = ["\n      var A = class {\n          constructor(){}\n          a(){}\n          get b(){}\n      }"], ruleTester_1.dedent(_153)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: (_154 = ["\n      var a =\n      {\n          actions:\n          [\n              {\n                  name: 'compile'\n              }\n          ]\n      };\n      "], _154.raw = ["\n      var a =\n      {\n          actions:\n          [\n              {\n                  name: 'compile'\n              }\n          ]\n      };\n      "], ruleTester_1.dedent(_154)),
        options: [4, { VariableDeclarator: 0, SwitchCase: 1 }]
    },
    {
        code: (_155 = ["\n      var a =\n      [\n          {\n              name: 'compile'\n          }\n      ];\n      "], _155.raw = ["\n      var a =\n      [\n          {\n              name: 'compile'\n          }\n      ];\n      "], ruleTester_1.dedent(_155)),
        options: [4, { VariableDeclarator: 0, SwitchCase: 1 }]
    },
    {
        code: (_156 = ["\n      class A{\n        constructor(){}\n          a(){}\n          get b(){}\n      }"], _156.raw = ["\n      class A{\n        constructor(){}\n          a(){}\n          get b(){}\n      }"], ruleTester_1.dedent(_156)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }],
        errors: expecting([[2, 4, 2]])
    },
    {
        code: (_157 = ["\n      var A = class {\n        constructor(){}\n          a(){}\n        get b(){}\n      };"], _157.raw = ["\n      var A = class {\n        constructor(){}\n          a(){}\n        get b(){}\n      };"], ruleTester_1.dedent(_157)),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }],
        errors: expecting([[2, 4, 2], [4, 4, 2]])
    },
    {
        code: (_158 = ["\n      var a = 1,\n          B = class {\n          constructor(){}\n            a(){}\n            get b(){}\n          };"], _158.raw = ["\n      var a = 1,\n          B = class {\n          constructor(){}\n            a(){}\n            get b(){}\n          };"], ruleTester_1.dedent(_158)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([[3, 6, 4]])
    },
    {
        code: (_159 = ["\n        var abc = 5,\n            c = 2,\n            xyz =\n             {\n               a: 1,\n                b: 2\n             };"], _159.raw = ["\n        var abc = 5,\n            c = 2,\n            xyz =\n             {\n               a: 1,\n                b: 2\n             };"], ruleTester_1.dedent(_159)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [4, 4, 5],
            [5, 6, 7],
            [6, 6, 8],
            [7, 4, 5]
        ])
    },
    {
        code: (_160 = ["\n        var abc =\n             {\n               a: 1,\n                b: 2\n             };"], _160.raw = ["\n        var abc =\n             {\n               a: 1,\n                b: 2\n             };"], ruleTester_1.dedent(_160)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [2, 4, 5],
            [3, 6, 7],
            [4, 6, 8],
            [5, 4, 5]
        ])
    },
    {
        code: (_161 = ["\n        if(true)\n          if (true)\n            if (true)\n            console.log(val);"], _161.raw = ["\n        if(true)\n          if (true)\n            if (true)\n            console.log(val);"], ruleTester_1.dedent(_161)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [4, 6, 4]
        ])
    },
    {
        code: (_162 = ["\n        var a = {\n            a: 1,\n            b: 2\n        }"], _162.raw = ["\n        var a = {\n            a: 1,\n            b: 2\n        }"], ruleTester_1.dedent(_162)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [2, 2, 4],
            [3, 2, 4]
        ])
    },
    {
        code: (_163 = ["\n        var a = [\n            a,\n            b\n        ]"], _163.raw = ["\n        var a = [\n            a,\n            b\n        ]"], ruleTester_1.dedent(_163)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [2, 2, 4],
            [3, 2, 4]
        ])
    },
    {
        code: (_164 = ["\n        let a = [\n            a,\n            b\n        ]"], _164.raw = ["\n        let a = [\n            a,\n            b\n        ]"], ruleTester_1.dedent(_164)),
        options: [2, { VariableDeclarator: { let: 2 }, SwitchCase: 1 }],
        errors: expecting([
            [2, 2, 4],
            [3, 2, 4]
        ])
    }
]);
ruleTester.addTestGroup('outer-iife-body', 'should handle outer IIFE body', [
    {
        code: (_165 = ["\n      fs.readdirSync(path.join(__dirname, '../rules')).forEach(name => {\n        files[name] = foo;\n      });"], _165.raw = ["\n      fs.readdirSync(path.join(__dirname, '../rules')).forEach(name => {\n        files[name] = foo;\n      });"], ruleTester_1.dedent(_165)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_166 = ["\n      (function(){\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], _166.raw = ["\n      (function(){\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], ruleTester_1.dedent(_166)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_167 = ["\n      (function(){\n              function foo(x) {\n                  return x + 1;\n              }\n      })();"], _167.raw = ["\n      (function(){\n              function foo(x) {\n                  return x + 1;\n              }\n      })();"], ruleTester_1.dedent(_167)),
        options: [4, { outerIIFEBody: 2 }]
    },
    {
        code: (_168 = ["\n      (function(x, y){\n      function foo(x) {\n        return x + 1;\n      }\n      })(1, 2);"], _168.raw = ["\n      (function(x, y){\n      function foo(x) {\n        return x + 1;\n      }\n      })(1, 2);"], ruleTester_1.dedent(_168)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_169 = ["\n      (function(){\n      function foo(x) {\n        return x + 1;\n      }\n      }());"], _169.raw = ["\n      (function(){\n      function foo(x) {\n        return x + 1;\n      }\n      }());"], ruleTester_1.dedent(_169)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_170 = ["\n      !function(){\n      function foo(x) {\n        return x + 1;\n      }\n      }();"], _170.raw = ["\n      !function(){\n      function foo(x) {\n        return x + 1;\n      }\n      }();"], ruleTester_1.dedent(_170)),
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
        code: (_171 = ["\n      var out = function(){\n        function fooVar(x) {\n          return x + 1;\n        }\n      };"], _171.raw = ["\n      var out = function(){\n        function fooVar(x) {\n          return x + 1;\n        }\n      };"], ruleTester_1.dedent(_171)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_172 = ["\n      var ns = function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }();"], _172.raw = ["\n      var ns = function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }();"], ruleTester_1.dedent(_172)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_173 = ["\n      ns = function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }();"], _173.raw = ["\n      ns = function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }();"], ruleTester_1.dedent(_173)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_174 = ["\n      var ns = (function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }(x));"], _174.raw = ["\n      var ns = (function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }(x));"], ruleTester_1.dedent(_174)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_175 = ["\n      var ns = (function(){\n              function fooVar(x) {\n                  return x + 1;\n              }\n      }(x));"], _175.raw = ["\n      var ns = (function(){\n              function fooVar(x) {\n                  return x + 1;\n              }\n      }(x));"], ruleTester_1.dedent(_175)),
        options: [4, { outerIIFEBody: 2 }]
    },
    {
        code: (_176 = ["\n      var obj = {\n        foo: function() {\n          return true;\n        }\n      };"], _176.raw = ["\n      var obj = {\n        foo: function() {\n          return true;\n        }\n      };"], ruleTester_1.dedent(_176)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_177 = ["\n      while (\n        function() {\n          return true;\n        }()) {\n\n        x = x + 1;\n      };"], _177.raw = ["\n      while (\n        function() {\n          return true;\n        }()) {\n\n        x = x + 1;\n      };"], ruleTester_1.dedent(_177)),
        options: [2, { outerIIFEBody: 20 }]
    },
    {
        code: (_178 = ["\n      (() => {\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], _178.raw = ["\n      (() => {\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], ruleTester_1.dedent(_178)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_179 = ["\n      function foo() {\n      }"], _179.raw = ["\n      function foo() {\n      }"], ruleTester_1.dedent(_179)),
        options: ['tab', { outerIIFEBody: 0 }]
    },
    {
        code: (_180 = ["\n      ;(() => {\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], _180.raw = ["\n      ;(() => {\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], ruleTester_1.dedent(_180)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_181 = ["\n      if(data) {\n        console.log('hi');\n      }"], _181.raw = ["\n      if(data) {\n        console.log('hi');\n      }"], ruleTester_1.dedent(_181)),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: (_182 = ["\n      (function(){\n        function foo(x) {\n          return x + 1;\n        }\n      })();"], _182.raw = ["\n      (function(){\n        function foo(x) {\n          return x + 1;\n        }\n      })();"], ruleTester_1.dedent(_182)),
        options: [2, { outerIIFEBody: 0 }],
        errors: expecting([[2, 0, 2]])
    },
    {
        code: (_183 = ["\n      (function(){\n          function foo(x) {\n              return x + 1;\n          }\n      })();"], _183.raw = ["\n      (function(){\n          function foo(x) {\n              return x + 1;\n          }\n      })();"], ruleTester_1.dedent(_183)),
        options: [4, { outerIIFEBody: 2 }],
        errors: expecting([[2, 8, 4]])
    },
    {
        code: (_184 = ["\n      if(data) {\n      console.log('hi');\n      }"], _184.raw = ["\n      if(data) {\n      console.log('hi');\n      }"], ruleTester_1.dedent(_184)),
        options: [2, { outerIIFEBody: 0 }],
        errors: expecting([[2, 2, 0]])
    },
    {
        code: (_185 = ["\n      var ns = function(){\n          function fooVar(x) {\n              return x + 1;\n          }\n      }(x);"], _185.raw = ["\n      var ns = function(){\n          function fooVar(x) {\n              return x + 1;\n          }\n      }(x);"], ruleTester_1.dedent(_185)),
        options: [4, { outerIIFEBody: 2 }],
        errors: expecting([[2, 8, 4]])
    },
    {
        code: (_186 = ["\n      var obj = {\n        foo: function() {\n        return true;\n        }()\n      };"], _186.raw = ["\n      var obj = {\n        foo: function() {\n        return true;\n        }()\n      };"], ruleTester_1.dedent(_186)),
        options: [2, { outerIIFEBody: 0 }],
        errors: expecting([[3, 4, 2]])
    },
    {
        code: (_187 = ["\n      typeof function() {\n          function fooVar(x) {\n            return x + 1;\n          }\n      }();"], _187.raw = ["\n      typeof function() {\n          function fooVar(x) {\n            return x + 1;\n          }\n      }();"], ruleTester_1.dedent(_187)),
        options: [2, { outerIIFEBody: 2 }],
        errors: expecting([[2, 2, 4]])
    },
    {
        code: (_188 = ["\n      {\n      \t!function(x) {\n      \t\t\t\treturn x + 1;\n      \t}()\n      };"], _188.raw = ["\n      {\n      \\t!function(x) {\n      \\t\\t\\t\\treturn x + 1;\n      \\t}()\n      };"], ruleTester_1.dedent(_188)),
        options: ['tab', { outerIIFEBody: 3 }],
        errors: expecting([[3, 2, 4]], 'tab')
    }
]);
ruleTester.addTestGroup('functions', 'should handle functions body and parameters', [
    {
        code: (_189 = ["\n      function foo(aaa,\n        bbb, ccc, ddd) {\n          bar();\n      }"], _189.raw = ["\n      function foo(aaa,\n        bbb, ccc, ddd) {\n          bar();\n      }"], ruleTester_1.dedent(_189)),
        options: [2, { FunctionDeclaration: { parameters: 1, body: 2 } }]
    },
    {
        code: (_190 = ["\n      function foo(aaa, bbb,\n            ccc, ddd) {\n        bar();\n      }"], _190.raw = ["\n      function foo(aaa, bbb,\n            ccc, ddd) {\n        bar();\n      }"], ruleTester_1.dedent(_190)),
        options: [2, { FunctionDeclaration: { parameters: 3, body: 1 } }]
    },
    {
        code: (_191 = ["\n      function foo(aaa,\n          bbb,\n          ccc) {\n                  bar();\n      }"], _191.raw = ["\n      function foo(aaa,\n          bbb,\n          ccc) {\n                  bar();\n      }"], ruleTester_1.dedent(_191)),
        options: [4, { FunctionDeclaration: { parameters: 1, body: 3 } }]
    },
    {
        code: (_192 = ["\n      function foo(aaa,\n                   bbb, ccc,\n                   ddd, eee, fff) {\n        bar();\n      }"], _192.raw = ["\n      function foo(aaa,\n                   bbb, ccc,\n                   ddd, eee, fff) {\n        bar();\n      }"], ruleTester_1.dedent(_192)),
        options: [2, { FunctionDeclaration: { parameters: 'first', body: 1 } }]
    },
    {
        code: (_193 = ["\n      function foo(aaa, bbb)\n      {\n            bar();\n      }"], _193.raw = ["\n      function foo(aaa, bbb)\n      {\n            bar();\n      }"], ruleTester_1.dedent(_193)),
        options: [2, { FunctionDeclaration: { body: 3 } }]
    },
    {
        code: (_194 = ["\n      function foo(\n        aaa,\n        bbb) {\n          bar();\n      }"], _194.raw = ["\n      function foo(\n        aaa,\n        bbb) {\n          bar();\n      }"], ruleTester_1.dedent(_194)),
        options: [2, { FunctionDeclaration: { parameters: 'first', body: 2 } }]
    },
    {
        code: (_195 = ["\n      var foo = function(aaa,\n          bbb,\n          ccc,\n          ddd) {\n      bar();\n      }"], _195.raw = ["\n      var foo = function(aaa,\n          bbb,\n          ccc,\n          ddd) {\n      bar();\n      }"], ruleTester_1.dedent(_195)),
        options: [2, { FunctionExpression: { parameters: 2, body: 0 } }]
    },
    {
        code: (_196 = ["\n      var foo = function(aaa,\n        bbb,\n        ccc) {\n                          bar();\n      }"], _196.raw = ["\n      var foo = function(aaa,\n        bbb,\n        ccc) {\n                          bar();\n      }"], ruleTester_1.dedent(_196)),
        options: [2, { FunctionExpression: { parameters: 1, body: 10 } }]
    },
    {
        code: (_197 = ["\n      var foo = function(aaa,\n                         bbb, ccc, ddd,\n                         eee, fff) {\n          bar();\n      }"], _197.raw = ["\n      var foo = function(aaa,\n                         bbb, ccc, ddd,\n                         eee, fff) {\n          bar();\n      }"], ruleTester_1.dedent(_197)),
        options: [4, { FunctionExpression: { parameters: 'first', body: 1 } }]
    },
    {
        code: (_198 = ["\n      var foo = function(\n        aaa, bbb, ccc,\n        ddd, eee) {\n            bar();\n      }"], _198.raw = ["\n      var foo = function(\n        aaa, bbb, ccc,\n        ddd, eee) {\n            bar();\n      }"], ruleTester_1.dedent(_198)),
        options: [2, { FunctionExpression: { parameters: 'first', body: 3 } }]
    },
    {
        code: (_199 = ["\n      function foo() {\n        function bar() {\n          baz();\n        }\n      }"], _199.raw = ["\n      function foo() {\n        function bar() {\n          baz();\n        }\n      }"], ruleTester_1.dedent(_199)),
        options: [2, { FunctionDeclaration: { body: 1 } }]
    },
    {
        code: (_200 = ["\n      function foo() {\n        function bar(baz,\n            qux) {\n          foobar();\n        }\n      }"], _200.raw = ["\n      function foo() {\n        function bar(baz,\n            qux) {\n          foobar();\n        }\n      }"], ruleTester_1.dedent(_200)),
        options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }]
    },
    {
        code: (_201 = ["\n      function foo() {\n        var bar = function(baz,\n              qux) {\n          foobar();\n        };\n      }"], _201.raw = ["\n      function foo() {\n        var bar = function(baz,\n              qux) {\n          foobar();\n        };\n      }"], ruleTester_1.dedent(_201)),
        options: [2, { FunctionExpression: { parameters: 3 } }]
    },
    {
        code: (_202 = ["\n      function foo() {\n        function bar() {\n              baz();\n        }\n      }"], _202.raw = ["\n      function foo() {\n        function bar() {\n              baz();\n        }\n      }"], ruleTester_1.dedent(_202)),
        options: [2, { FunctionDeclaration: { body: 1 } }],
        errors: expecting([[3, 4, 8]])
    },
    {
        code: (_203 = ["\n      function foo() {\n        function bar(baz,\n          qux) {\n          foobar();\n        }\n      }"], _203.raw = ["\n      function foo() {\n        function bar(baz,\n          qux) {\n          foobar();\n        }\n      }"], ruleTester_1.dedent(_203)),
        options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
        errors: expecting([[3, 6, 4]])
    },
    {
        code: (_204 = ["\n      function foo() {\n        var bar = function(baz,\n                qux) {\n          foobar();\n        };\n      }"], _204.raw = ["\n      function foo() {\n        var bar = function(baz,\n                qux) {\n          foobar();\n        };\n      }"], ruleTester_1.dedent(_204)),
        options: [2, { FunctionExpression: { parameters: 3 } }],
        errors: expecting([[3, 8, 10]])
    },
    {
        code: (_205 = ["\n      function foo(aaa,\n          bbb, ccc, ddd) {\n            bar();\n      }"], _205.raw = ["\n      function foo(aaa,\n          bbb, ccc, ddd) {\n            bar();\n      }"], ruleTester_1.dedent(_205)),
        options: [2, { FunctionDeclaration: { parameters: 1, body: 2 } }],
        errors: expecting([[2, 2, 4], [3, 4, 6]])
    },
    {
        code: (_206 = ["\n      function foo(aaa, bbb,\n        ccc, ddd) {\n      bar();\n      }\",\n      utput:\n      function foo(aaa, bbb,\n            ccc, ddd) {\n        bar();\n      }"], _206.raw = ["\n      function foo(aaa, bbb,\n        ccc, ddd) {\n      bar();\n      }\",\n      utput:\n      function foo(aaa, bbb,\n            ccc, ddd) {\n        bar();\n      }"], ruleTester_1.dedent(_206)),
        options: [2, { FunctionDeclaration: { parameters: 3, body: 1 } }],
        errors: expecting([[2, 6, 2], [3, 2, 0]])
    },
    {
        code: (_207 = ["\n      function foo(aaa,\n              bbb,\n        ccc) {\n            bar();\n      }"], _207.raw = ["\n      function foo(aaa,\n              bbb,\n        ccc) {\n            bar();\n      }"], ruleTester_1.dedent(_207)),
        options: [4, { FunctionDeclaration: { parameters: 1, body: 3 } }],
        errors: expecting([[2, 4, 8], [3, 4, 2], [4, 12, 6]])
    },
    {
        code: (_208 = ["\n      function foo(aaa,\n        bbb, ccc,\n                         ddd, eee, fff) {\n         bar();\n      }"], _208.raw = ["\n      function foo(aaa,\n        bbb, ccc,\n                         ddd, eee, fff) {\n         bar();\n      }"], ruleTester_1.dedent(_208)),
        options: [2, { FunctionDeclaration: { parameters: 'first', body: 1 } }],
        errors: expecting([[2, 13, 2], [3, 13, 19], [4, 2, 3]])
    },
    {
        code: (_209 = ["\n      function foo(aaa, bbb)\n      {\n      bar();\n      }"], _209.raw = ["\n      function foo(aaa, bbb)\n      {\n      bar();\n      }"], ruleTester_1.dedent(_209)),
        options: [2, { FunctionDeclaration: { body: 3 } }],
        errors: expecting([[3, 6, 0]])
    },
    {
        code: (_210 = ["\n      function foo(aaa, bbb)\n        {\n      bar();\n      }"], _210.raw = ["\n      function foo(aaa, bbb)\n        {\n      bar();\n      }"], ruleTester_1.dedent(_210)),
        options: [2, { FunctionDeclaration: { body: 3 } }],
        errors: expecting([[2, 0, 2], [3, 6, 0]])
    },
    {
        code: (_211 = ["\n      function foo(\n        aaa,\n        bbb\n       )\n      {\n        bar();\n      }"], _211.raw = ["\n      function foo(\n        aaa,\n        bbb\n       )\n      {\n        bar();\n      }"], ruleTester_1.dedent(_211)),
        options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
        errors: expecting([
            [2, 4, 2],
            [3, 4, 2],
            [4, 0, 1]
        ])
    },
    {
        code: (_212 = ["\n      {\n        function foo(\n       )\n         {\n          return null;\n        }\n      }"], _212.raw = ["\n      {\n        function foo(\n       )\n         {\n          return null;\n        }\n      }"], ruleTester_1.dedent(_212)),
        options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
        errors: expecting([[3, 2, 1], [4, 2, 3]])
    },
    {
        code: (_213 = ["\n      function foo(\n      aaa,\n          bbb) {\n      bar();\n      }"], _213.raw = ["\n      function foo(\n      aaa,\n          bbb) {\n      bar();\n      }"], ruleTester_1.dedent(_213)),
        options: [2, { FunctionDeclaration: { parameters: 'first', body: 2 } }],
        errors: expecting([[3, 0, 4], [4, 4, 0]])
    },
    {
        code: (_214 = ["\n      var foo = function(aaa,\n        bbb,\n          ccc,\n            ddd) {\n        bar();\n      }"], _214.raw = ["\n      var foo = function(aaa,\n        bbb,\n          ccc,\n            ddd) {\n        bar();\n      }"], ruleTester_1.dedent(_214)),
        options: [2, { FunctionExpression: { parameters: 2, body: 0 } }],
        errors: expecting([[2, 4, 2], [4, 4, 6], [5, 0, 2]])
    },
    {
        code: (_215 = ["\n      var foo = function(aaa,\n         bbb,\n       ccc) {\n        bar();\n      }"], _215.raw = ["\n      var foo = function(aaa,\n         bbb,\n       ccc) {\n        bar();\n      }"], ruleTester_1.dedent(_215)),
        options: [2, { FunctionExpression: { parameters: 1, body: 10 } }],
        errors: expecting([[2, 2, 3], [3, 2, 1], [4, 20, 2]])
    },
    {
        code: (_216 = ["\n      var foo = function(aaa,\n        bbb, ccc, ddd,\n                              eee, fff) {\n              bar();\n      }"], _216.raw = ["\n      var foo = function(aaa,\n        bbb, ccc, ddd,\n                              eee, fff) {\n              bar();\n      }"], ruleTester_1.dedent(_216)),
        options: [4, { FunctionExpression: { parameters: 'first', body: 1 } }],
        errors: expecting([[2, 19, 2], [3, 19, 24], [4, 4, 8]])
    },
    {
        code: (_217 = ["\n      var foo = function(\n      aaa, bbb, ccc,\n          ddd, eee) {\n        bar();\n      }"], _217.raw = ["\n      var foo = function(\n      aaa, bbb, ccc,\n          ddd, eee) {\n        bar();\n      }"], ruleTester_1.dedent(_217)),
        options: [2, { FunctionExpression: { parameters: 'first', body: 3 } }],
        errors: expecting([[3, 0, 4], [4, 6, 2]])
    },
    {
        code: (_218 = ["\n      var foo = function(\n      aaa, bbb, ccc,\n          ddd, eee)\n           {\n        bar();\n      }"], _218.raw = ["\n      var foo = function(\n      aaa, bbb, ccc,\n          ddd, eee)\n           {\n        bar();\n      }"], ruleTester_1.dedent(_218)),
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
        code: (_219 = ["\n      class A {\n        foo(aaa,\n          bbb, ccc, ddd) {\n            bar();\n        }\n      }"], _219.raw = ["\n      class A {\n        foo(aaa,\n          bbb, ccc, ddd) {\n            bar();\n        }\n      }"], ruleTester_1.dedent(_219)),
        options: [2, { FunctionExpression: { parameters: 1, body: 2 } }]
    },
    {
        code: (_220 = ["\n      class A {\n        constructor(aaa,\n          bbb, ccc, ddd) {\n            bar();\n        }\n      }"], _220.raw = ["\n      class A {\n        constructor(aaa,\n          bbb, ccc, ddd) {\n            bar();\n        }\n      }"], ruleTester_1.dedent(_220)),
        options: [2, { FunctionExpression: { parameters: 1, body: 2 } }]
    },
    {
        code: (_221 = ["\n      class A {\n        foo(\n         aaa,\n          bbb,\n           ccc,\n          ddd\n       )\n         {\n            bar();\n        }\n       }"], _221.raw = ["\n      class A {\n        foo(\n         aaa,\n          bbb,\n           ccc,\n          ddd\n       )\n         {\n            bar();\n        }\n       }"], ruleTester_1.dedent(_221)),
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
        code: (_222 = ["\n      class A {\n        constructor(\n         aaa,\n          bbb,\n           ccc,\n          ddd\n       )\n         {\n            bar();\n        }\n      }"], _222.raw = ["\n      class A {\n        constructor(\n         aaa,\n          bbb,\n           ccc,\n          ddd\n       )\n         {\n            bar();\n        }\n      }"], ruleTester_1.dedent(_222)),
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
        code: (_223 = ["\n      foo(\n        bar,\n        baz,\n        qux\n      );\""], _223.raw = ["\n      foo(\n        bar,\n        baz,\n        qux\n      );\""], ruleTester_1.dedent(_223)),
        options: [2, { CallExpression: { arguments: 1 } }]
    },
    {
        code: (_224 = ["\n      foo(\n      \tbar,\n      \tbaz,\n      \tqux\n      );\""], _224.raw = ["\n      foo(\n      \\tbar,\n      \\tbaz,\n      \\tqux\n      );\""], ruleTester_1.dedent(_224)),
        options: ['tab', { CallExpression: { arguments: 1 } }]
    },
    {
        code: (_225 = ["\n      foo(bar,\n              baz,\n              qux);\""], _225.raw = ["\n      foo(bar,\n              baz,\n              qux);\""], ruleTester_1.dedent(_225)),
        options: [4, { CallExpression: { arguments: 2 } }]
    },
    {
        code: (_226 = ["\n      foo(\n      bar,\n      baz,\n      qux\n      );\""], _226.raw = ["\n      foo(\n      bar,\n      baz,\n      qux\n      );\""], ruleTester_1.dedent(_226)),
        options: [2, { CallExpression: { arguments: 0 } }]
    },
    {
        code: (_227 = ["\n      foo(bar,\n          baz,\n          qux\n      );\""], _227.raw = ["\n      foo(bar,\n          baz,\n          qux\n      );\""], ruleTester_1.dedent(_227)),
        options: [2, { CallExpression: { arguments: 'first' } }]
    },
    {
        code: (_228 = ["\n      foo(bar, baz,\n          qux, barbaz,\n          barqux, bazqux);\""], _228.raw = ["\n      foo(bar, baz,\n          qux, barbaz,\n          barqux, bazqux);\""], ruleTester_1.dedent(_228)),
        options: [2, { CallExpression: { arguments: 'first' } }]
    },
    {
        code: (_229 = ["\n      foo(\n                              bar, baz,\n                              qux);\""], _229.raw = ["\n      foo(\n                              bar, baz,\n                              qux);\""], ruleTester_1.dedent(_229)),
        options: [2, { CallExpression: { arguments: 'first' } }]
    },
    {
        code: (_230 = ["\n      foo(bar,\n              1 + 2,\n              !baz,\n              new Car('!')\n      );\""], _230.raw = ["\n      foo(bar,\n              1 + 2,\n              !baz,\n              new Car('!')\n      );\""], ruleTester_1.dedent(_230)),
        options: [2, { CallExpression: { arguments: 4 } }]
    }
]);
ruleTester.addTestGroup('new-batch', 'should handle try/catch/do and return statements', [
    {
        code: (_231 = ["\n      {\n          try {\n          }\n      catch (err) {\n          }\n      finally {\n          }\n      }"], _231.raw = ["\n      {\n          try {\n          }\n      catch (err) {\n          }\n      finally {\n          }\n      }"], ruleTester_1.dedent(_231)),
        output: (_232 = ["\n      {\n          try {\n          }\n          catch (err) {\n          }\n          finally {\n          }\n      }"], _232.raw = ["\n      {\n          try {\n          }\n          catch (err) {\n          }\n          finally {\n          }\n      }"], ruleTester_1.dedent(_232)),
        errors: expecting([
            [4, 4, 0],
            [6, 4, 0]
        ])
    },
    {
        code: (_233 = ["\n      {\n          do {\n          }\n      while (true)\n      }"], _233.raw = ["\n      {\n          do {\n          }\n      while (true)\n      }"], ruleTester_1.dedent(_233)),
        output: (_234 = ["\n      {\n          do {\n          }\n          while (true)\n      }"], _234.raw = ["\n      {\n          do {\n          }\n          while (true)\n      }"], ruleTester_1.dedent(_234)),
        errors: expecting([[4, 4, 0]])
    },
    {
        code: (_235 = ["\n      function foo() {\n        bar();\n      \t\t}"], _235.raw = ["\n      function foo() {\n        bar();\n      \\t\\t}"], ruleTester_1.dedent(_235)),
        output: (_236 = ["\n      function foo() {\n        bar();\n      }"], _236.raw = ["\n      function foo() {\n        bar();\n      }"], ruleTester_1.dedent(_236)),
        options: [2],
        errors: expecting([[3, '0 spaces', '2 tabs']])
    },
    {
        code: (_237 = ["\n      function foo() {\n        return (\n          1\n          )\n      }"], _237.raw = ["\n      function foo() {\n        return (\n          1\n          )\n      }"], ruleTester_1.dedent(_237)),
        output: (_238 = ["\n      function foo() {\n        return (\n          1\n        )\n      }"], _238.raw = ["\n      function foo() {\n        return (\n          1\n        )\n      }"], ruleTester_1.dedent(_238)),
        options: [2],
        errors: expecting([[4, '2 spaces', '4']])
    },
    {
        code: (_239 = ["\n      function foo() {\n        return (\n          1\n          );\n      }"], _239.raw = ["\n      function foo() {\n        return (\n          1\n          );\n      }"], ruleTester_1.dedent(_239)),
        output: (_240 = ["\n      function foo() {\n        return (\n          1\n        );\n      }"], _240.raw = ["\n      function foo() {\n        return (\n          1\n        );\n      }"], ruleTester_1.dedent(_240)),
        options: [2],
        errors: expecting([[4, '2 spaces', '4']])
    },
    {
        code: (_241 = ["\n      function foo() {\n        bar();\n      \t\t}"], _241.raw = ["\n      function foo() {\n        bar();\n      \\t\\t}"], ruleTester_1.dedent(_241)),
        output: (_242 = ["\n      function foo() {\n        bar();\n      }"], _242.raw = ["\n      function foo() {\n        bar();\n      }"], ruleTester_1.dedent(_242)),
        options: [2],
        errors: expecting([[3, '0 spaces', '2 tabs']])
    },
    {
        code: (_243 = ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n          return fn.call(that, a);\n          };\n        }\n      }"], _243.raw = ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n          return fn.call(that, a);\n          };\n        }\n      }"], ruleTester_1.dedent(_243)),
        output: (_244 = ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n            return fn.call(that, a);\n          };\n        }\n      }"], _244.raw = ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n            return fn.call(that, a);\n          };\n        }\n      }"], ruleTester_1.dedent(_244)),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([[4, '6 spaces', '4']])
    },
    {
        code: (_245 = ["\n      function foo() {\n         return 1\n      }"], _245.raw = ["\n      function foo() {\n         return 1\n      }"], ruleTester_1.dedent(_245)),
        output: (_246 = ["\n      function foo() {\n        return 1\n      }"], _246.raw = ["\n      function foo() {\n        return 1\n      }"], ruleTester_1.dedent(_246)),
        options: [2],
        errors: expecting([[2, '2 spaces', '3']])
    },
    {
        code: (_247 = ["\n      function foo() {\n         return 1;\n      }"], _247.raw = ["\n      function foo() {\n         return 1;\n      }"], ruleTester_1.dedent(_247)),
        output: (_248 = ["\n      function foo() {\n        return 1;\n      }"], _248.raw = ["\n      function foo() {\n        return 1;\n      }"], ruleTester_1.dedent(_248)),
        options: [2],
        errors: expecting([[2, '2 spaces', '3']])
    },
    {
        code: (_249 = ["\n      foo(\n      bar,\n        baz,\n          qux);"], _249.raw = ["\n      foo(\n      bar,\n        baz,\n          qux);"], ruleTester_1.dedent(_249)),
        output: (_250 = ["\n      foo(\n        bar,\n        baz,\n        qux);"], _250.raw = ["\n      foo(\n        bar,\n        baz,\n        qux);"], ruleTester_1.dedent(_250)),
        options: [2, { CallExpression: { arguments: 1 } }],
        errors: expecting([[2, 2, 0], [4, 2, 4]])
    },
    {
        code: (_251 = ["\n      foo(\n      \tbar,\n      \tbaz);"], _251.raw = ["\n      foo(\n      \\tbar,\n      \\tbaz);"], ruleTester_1.dedent(_251)),
        output: (_252 = ["\n      foo(\n          bar,\n          baz);"], _252.raw = ["\n      foo(\n          bar,\n          baz);"], ruleTester_1.dedent(_252)),
        options: [2, { CallExpression: { arguments: 2 } }],
        errors: expecting([[2, '4 spaces', '1 tab'], [3, '4 spaces', '1 tab']])
    },
    {
        code: (_253 = ["\n      foo(bar,\n      \t\tbaz,\n      \t\tqux);"], _253.raw = ["\n      foo(bar,\n      \\t\\tbaz,\n      \\t\\tqux);"], ruleTester_1.dedent(_253)),
        output: (_254 = ["\n      foo(bar,\n      \tbaz,\n      \tqux);"], _254.raw = ["\n      foo(bar,\n      \\tbaz,\n      \\tqux);"], ruleTester_1.dedent(_254)),
        options: ['tab', { CallExpression: { arguments: 1 } }],
        errors: expecting([[2, 1, 2], [3, 1, 2]], 'tab')
    },
    {
        code: (_255 = ["\n      foo(bar, baz,\n               qux);"], _255.raw = ["\n      foo(bar, baz,\n               qux);"], ruleTester_1.dedent(_255)),
        output: (_256 = ["\n      foo(bar, baz,\n          qux);"], _256.raw = ["\n      foo(bar, baz,\n          qux);"], ruleTester_1.dedent(_256)),
        options: [2, { CallExpression: { arguments: 'first' } }],
        errors: expecting([[2, 4, 9]])
    },
    {
        code: (_257 = ["\n      foo(\n                bar,\n          baz);"], _257.raw = ["\n      foo(\n                bar,\n          baz);"], ruleTester_1.dedent(_257)),
        output: (_258 = ["\n      foo(\n                bar,\n                baz);"], _258.raw = ["\n      foo(\n                bar,\n                baz);"], ruleTester_1.dedent(_258)),
        options: [2, { CallExpression: { arguments: 'first' } }],
        errors: expecting([[3, 10, 4]])
    },
    {
        code: (_259 = ["\n      foo(bar,\n        1 + 2,\n                    !baz,\n              new Car('!')\n      );"], _259.raw = ["\n      foo(bar,\n        1 + 2,\n                    !baz,\n              new Car('!')\n      );"], ruleTester_1.dedent(_259)),
        output: (_260 = ["\n      foo(bar,\n            1 + 2,\n            !baz,\n            new Car('!')\n      );"], _260.raw = ["\n      foo(bar,\n            1 + 2,\n            !baz,\n            new Car('!')\n      );"], ruleTester_1.dedent(_260)),
        options: [2, { CallExpression: { arguments: 3 } }],
        errors: expecting([[2, 6, 2], [3, 6, 14], [4, 6, 8]])
    },
    {
        code: (_261 = ["\n      return (\n          foo\n          );"], _261.raw = ["\n      return (\n          foo\n          );"], ruleTester_1.dedent(_261)),
        output: (_262 = ["\n      return (\n          foo\n      );"], _262.raw = ["\n      return (\n          foo\n      );"], ruleTester_1.dedent(_262)),
        errors: expecting([[3, 0, 4]])
    },
    {
        code: (_263 = ["\n      return (\n          foo\n          )"], _263.raw = ["\n      return (\n          foo\n          )"], ruleTester_1.dedent(_263)),
        output: (_264 = ["\n      return (\n          foo\n      )"], _264.raw = ["\n      return (\n          foo\n      )"], ruleTester_1.dedent(_264)),
        errors: expecting([[3, 0, 4]])
    },
    {
        code: (_265 = ["\n      if (foo) {\n              /* comment */bar();\n      }"], _265.raw = ["\n      if (foo) {\n              /* comment */bar();\n      }"], ruleTester_1.dedent(_265)),
        output: (_266 = ["\n      if (foo) {\n          /* comment */bar();\n      }"], _266.raw = ["\n      if (foo) {\n          /* comment */bar();\n      }"], ruleTester_1.dedent(_266)),
        errors: expecting([[2, 4, 8]])
    },
    {
        code: (_267 = ["\n      foo('bar',\n              /** comment */{\n              ok: true    });"], _267.raw = ["\n      foo('bar',\n              /** comment */{\n              ok: true    });"], ruleTester_1.dedent(_267)),
        output: (_268 = ["\n      foo('bar',\n          /** comment */{\n              ok: true    });"], _268.raw = ["\n      foo('bar',\n          /** comment */{\n              ok: true    });"], ruleTester_1.dedent(_268)),
        errors: expecting([[2, 4, 8]])
    },
    {
        code: (_269 = ["\n      foo('bar',\n              {\n              ok: true    });"], _269.raw = ["\n      foo('bar',\n              {\n              ok: true    });"], ruleTester_1.dedent(_269)),
        output: (_270 = ["\n      foo('bar',\n          {\n              ok: true    });"], _270.raw = ["\n      foo('bar',\n          {\n              ok: true    });"], ruleTester_1.dedent(_270)),
        errors: expecting([[2, 4, 8]])
    }
]);
ruleTester.addTestGroup('variable-declaration', 'should handle variable declarations', [
    {
        code: (_271 = ["\n      /**\n       * Returns the local state from inside the full redux store's state.\n       */\n      const getState = (store: Store) => store.foo\n      "], _271.raw = ["\n      /**\n       * Returns the local state from inside the full redux store's state.\n       */\n      const getState = (store: Store) => store.foo\n      "], ruleTester_1.dedent(_271))
    },
    {
        code: (_272 = ["\n      const getState = (store: Store) => store.foo\n      "], _272.raw = ["\n      const getState = (store: Store) => store.foo\n      "], ruleTester_1.dedent(_272))
    },
    {
        code: (_273 = ["\n      /**\n       * Returns the local state from inside the full redux store's state.\n       */\n        const getState = (store: Store) => store.foo\n      "], _273.raw = ["\n      /**\n       * Returns the local state from inside the full redux store's state.\n       */\n        const getState = (store: Store) => store.foo\n      "], ruleTester_1.dedent(_273)),
        errors: expecting([[4, 0, 2]])
    },
    {
        code: (_274 = ["\n      const tough = require('tough-cookie')\n      const jar = previousJar || new tough.CookieJar()\n      ;(client.defaults as any).jar = jar\n      "], _274.raw = ["\n      const tough = require('tough-cookie')\n      const jar = previousJar || new tough.CookieJar()\n      ;(client.defaults as any).jar = jar\n      "], ruleTester_1.dedent(_274))
    },
    {
        code: (_275 = ["\n      const tough = require('tough-cookie')\n      const jar = previousJar || new tough.CookieJar()\n       ;(client.defaults as any).jar = jar\n      "], _275.raw = ["\n      const tough = require('tough-cookie')\n      const jar = previousJar || new tough.CookieJar()\n       ;(client.defaults as any).jar = jar\n      "], ruleTester_1.dedent(_275)),
        errors: expecting([[3, 0, 1]])
    }
]);
ruleTester.addTestGroup('interfaces', 'should check indentation on interfaces', [
    {
        code: (_276 = ["\n      interface Foo {\n        a: number;\n      }\n      "], _276.raw = ["\n      interface Foo {\n        a: number;\n      }\n      "], ruleTester_1.dedent(_276)),
        errors: expecting([[2, 4, 2]])
    },
    {
        code: (_277 = ["\n      interface Foo extends Bar {\n        a: number;\n          b: {\n             c: string;\n           };\n        }\n      "], _277.raw = ["\n      interface Foo extends Bar {\n        a: number;\n          b: {\n             c: string;\n           };\n        }\n      "], ruleTester_1.dedent(_277)),
        errors: expecting([
            [2, 4, 2],
            [4, 8, 7],
            [5, 4, 5],
            [6, 0, 2]
        ])
    },
    {
        code: (_278 = ["\n      interface Foo extends Bar {\n        a: number;\n        b: {\n          c: string;\n        };\n      }\n      "], _278.raw = ["\n      interface Foo extends Bar {\n        a: number;\n        b: {\n          c: string;\n        };\n      }\n      "], ruleTester_1.dedent(_278)),
        options: [2]
    }
]);
ruleTester.runTests();
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155, _156, _157, _158, _159, _160, _161, _162, _163, _164, _165, _166, _167, _168, _169, _170, _171, _172, _173, _174, _175, _176, _177, _178, _179, _180, _181, _182, _183, _184, _185, _186, _187, _188, _189, _190, _191, _192, _193, _194, _195, _196, _197, _198, _199, _200, _201, _202, _203, _204, _205, _206, _207, _208, _209, _210, _211, _212, _213, _214, _215, _216, _217, _218, _219, _220, _221, _222, _223, _224, _225, _226, _227, _228, _229, _230, _231, _232, _233, _234, _235, _236, _237, _238, _239, _240, _241, _242, _243, _244, _245, _246, _247, _248, _249, _250, _251, _252, _253, _254, _255, _256, _257, _258, _259, _260, _261, _262, _263, _264, _265, _266, _267, _268, _269, _270, _271, _272, _273, _274, _275, _276, _277, _278;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVySW5kZW50UnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQ0FBa0Y7QUFLbEYsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRWhELG1CQUFtQixNQUFrQyxFQUFFLFVBQTRCO0lBQTVCLDJCQUFBLEVBQUEsb0JBQTRCO0lBQ2pGLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixJQUFJLE9BQU8sQ0FBQztRQUVaLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELE9BQU8sR0FBRyw2QkFBMkIsR0FBRyxDQUFDLENBQUMsQ0FBQyxtQkFBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQztRQUNyRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFNLEtBQUssR0FBRyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNyRCxPQUFPLEdBQUcsNkJBQTJCLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBSSxLQUFLLG1CQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBRyxDQUFDO1FBQzlFLENBQUM7UUFFRCxNQUFNLENBQUM7WUFDTCxPQUFPLEVBQUUsT0FBTztZQUNoQixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxXQUFXLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxzREFBc0QsRUFBRTtJQUM1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QyxFQUFFLENBQUM7UUFDcEQsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZ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Q0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN2RCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDaEM7SUFDRDtRQUNFLElBQUksOEdBQVEsb0ZBSVIsR0FKRSxtQkFBTSxPQUlSO1FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2pFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUM7SUFDRDtRQUNFLElBQUksdU1BQVEsNktBU1IsR0FURSxtQkFBTSxPQVNSO1FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2pFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUM7SUFDRDtRQUNFLElBQUksc0hBQVEsNEZBS1IsR0FMRSxtQkFBTSxPQUtSO1FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2pFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FB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
