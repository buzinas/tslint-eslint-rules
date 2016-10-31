/// <reference path='../../../typings/mocha/mocha.d.ts' />
import * as fs from 'fs';
import * as path from 'path';
import * as Lint from 'tslint/lib/lint';
import { runTest, IScripts, IScriptError } from './helper';

const fixture = fs.readFileSync(
  path.join(__dirname, '../../../src/test/fixtures/indent-invalid.txt'), 'utf8'
);
type NumStr = number | string;

function expectedErrors(errors: [[number, NumStr, NumStr]], indentType: string = 'space'): IScriptError[] {
  return errors.map((err) => {
    let message;

    if (typeof err[1] === 'string' && typeof err[2] === 'string') {
      message = `Expected indentation of ${err[1]} but found ${err[2]}.`;
    } else {
      const chars = indentType + (err[1] === 1 ? '' : 's');
      message = `Expected indentation of ${err[1]} ${chars} but found ${err[2]}.`;
    }
    return { message, line: err[0] };
  });
}

/**
 * Borrowing tests from eslint:
 *    https://github.com/eslint/eslint/blob/master/tests/lib/rules/no-multi-spaces.js
 */
const rule = 'ter-indent';
const scripts: { valid: IScripts, invalid: IScripts } = {
  valid: [
    {
      code: Lint.Utils.dedent`
      const array = [
          ,
          'd',
          3
      ];
      `
    },
    {
      code: 'export let upgradeModule = angular.module("ui.router.upgrade", ["ui.router"]);'
    },
    {
      code: Lint.Utils.dedent`
        bridge.callHandler(
          'getAppVersion', 'test23', function(responseData) {
            window.ah.mobileAppVersion = responseData;
          }
        );
        `,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        bridge.callHandler(
          'getAppVersion', 'test23', function(responseData) {
            window.ah.mobileAppVersion = responseData;
          });
        `,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        example(
            function () {
                console.log('example');
            }
        );
        `,
      options: [4]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        require('http').request({hostname: 'localhost',
                                 port: 80}, function(res) {
          res.end();
        });
        `,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        it('should... some lengthy test description that is forced to be' +
          'wrapped into two lines since the line length limit is set', () => {
          expect(true).toBe(true);
        });
        `,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: '// hi',
      options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
      code: Lint.Utils.dedent`
        var Command = function() {
          var fileList = [],
              files = []
        
          files.concat(fileList)
        };
        `,
      options: [2, {VariableDeclarator: { var: 2, let: 2, const: 3}}]
    },
    {
      code: '  ',
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        if(data) {
          console.log('hi');
          b = true;};`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        foo = () => {
          console.log('hi');
          return true;};`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        function test(data) {
          console.log('hi');
          return true;};`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var test = function(data) {
          console.log('hi');
        };`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        arr.forEach(function(data) {
          otherdata.forEach(function(zero) {
            console.log('hi');
          }) });`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        a = [
            ,3
        ]`,
      options: [4, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        [
          ['gzip', 'gunzip'],
          ['gzip', 'unzip'],
          ['deflate', 'inflate'],
          ['deflateRaw', 'inflateRaw'],
        ].forEach(function(method) {
          console.log(method);
        });
        `,
      options: [2, {SwitchCase: 1, VariableDeclarator: 2}]
    },
    {
      code: Lint.Utils.dedent`
        test(123, {
            bye: {
                hi: [1,
                    {
                        b: 2
                    }
                ]
            }
        });`,
      options: [4, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var xyz = 2,
            lmn = [
                {
                    a: 1
                }
            ];`,
      options: [4, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        lmn = [{
            a: 1
        },
        {
            b: 2
        
        {
            x: 2
        }];`,
      options: [4, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        abc({
            test: [
                [
                    c,
                    xyz,
                    2
                ].join(',')
            ]
        });`,
      options: [4, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        abc = {
          test: [
            [
              c,
              xyz,
              2
            ]
          ]
        };`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        abc(
          {
            a: 1,
            b: 2
          }
        );`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        abc({
            a: 1,
            b: 2
        });`,
      options: [4, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var abc = 
          [
            c,
            xyz,
            {
              a: 1,
              b: 2
            }
          ];`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var abc = [
          c,
          xyz,
          {
            a: 1,
            b: 2
          }
        ];`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var abc = 5,
            c = 2,
            xyz = 
            {
              a: 1,
              b: 2
            };`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var abc = 
            {
              a: 1,
              b: 2
            };`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var a = new abc({
                a: 1,
                b: 2
            }),
            b = 2;`,
      options: [4, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var a = 2,
          c = {
            a: 1,
            b: 2
          },
          b = 2;`,
      options: [2, {VariableDeclarator: 1, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var x = 2,
            y = {
              a: 1,
              b: 2
            },
            b = 2;`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var e = {
              a: 1,
              b: 2
            },
            b = 2;`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var a = {
          a: 1,
          b: 2
        };`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        function test() {
          if (true ||
                    false){
            console.log(val);
          }
        }`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        for (var val in obj)
          if (true)
            console.log(val);`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        if(true)
          if (true)
            if (true)
              console.log(val);`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        function hi(){     var a = 1;
          y++;                   x++;
        }`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        for(;length > index; index++)if(NO_HOLES || index in self){
          x++;
        }`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        function test(){
          switch(length){
            case 1: return function(a){
              return fn.call(that, a);
            };
          }
        }`,
      options: [2, {VariableDeclarator: 2, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var geometry = 2,
        rotate = 2;`,
      options: [2, {VariableDeclarator: 0}]
    },
    {
      code: Lint.Utils.dedent`
        var geometry,
            rotate;`,
      options: [4, {VariableDeclarator: 1}]
    },
    {
      code: [
        'var geometry,',
        '\trotate;'
      ].join('\n'),
      options: ['tab', {VariableDeclarator: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var geometry,
          rotate;`,
      options: [2, {VariableDeclarator: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var geometry,
            rotate;`,
      options: [2, {VariableDeclarator: 2}]
    },
    {
      code: Lint.Utils.dedent`
        let geometry,
            rotate;`,
      options: [2, {VariableDeclarator: 2}]
    },
    {
      code: Lint.Utils.dedent`
        const geometry = 2,
            rotate = 3;`,
      options: [2, {VariableDeclarator: 2}]
    },
    {
      code: Lint.Utils.dedent`
        var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,
          height, rotate;`,
      options: [2, {SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth;`,
      options: [2, {SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        if (1 < 2){
        //hi sd
        }`,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        while (1 < 2){
          //hi sd
        }`,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        while (1 < 2) console.log('hi');`,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        [a, b, 
        c].forEach((index) => {
            index;
        });
        `,
      options: [4]
    },
    {
      code: Lint.Utils.dedent`
        [a, b, 
        c].forEach(function(index){
            return index;
        });
        `,
      options: [4]
    },
    {
      code: Lint.Utils.dedent`
        [a, b, c].forEach((index) => {
            index;
        });
        `,
      options: [4]
    },
    {
      code: Lint.Utils.dedent`
        [a, b, c].forEach(function(index){
            return index;
        });
        `,
      options: [4]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      options: [4, {SwitchCase: 2}]
    },
    {
      code: Lint.Utils.dedent`
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
        }`
    },
    {
      code: Lint.Utils.dedent`
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
        }`
    },
    {
      code: Lint.Utils.dedent`
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
        }`
    },
    {
      code: Lint.Utils.dedent`
        switch (a) {
        case "foo":
            a();
            break;
        case "bar":
            a(); break;
        case "baz":
            a(); break;
        }`
    },
    {
      code: 'switch (0) {\n}'
    },
    {
      code: Lint.Utils.dedent`
        function foo() {
            var a = "a";
            switch(a) {
            case "a":
                return "A";
            case "b":
                return "B";
            }
        }
        foo();`
    },
    {
      code: Lint.Utils.dedent`
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
      options: [4, {SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        var obj = {foo: 1, bar: 2};
        with (obj) {
            console.log(foo + bar);
        }
        `
    },
    {
      code: [
        'if (a) {',
        '    (1 + 2 + 3);', // no error on this line
        '}'
      ].join('\n')
    },
    {
      code: 'switch(value){ default: a(); break; }\n'
    },
    {
      code: "import {addons} from 'react/addons'\nimport React from 'react'",
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        var a = 1,
            b = 2,
            c = 3;
        `,
      options: [4]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        var items = [
          {
            foo: 'bar'
          }
        ];
        `,
      options: [2, { VariableDeclarator: 2 }]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        const geometry = 2,
              rotate = 3;
        var a = 1,
          b = 2;
        let light = true,
            shadow = false;`,
      options: [2, { VariableDeclarator: { const: 3, let: 2 } }]
    },
    {
      code: Lint.Utils.dedent`
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
      options: [2, { VariableDeclarator: { var: 2, const: 3 }, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        var path     = require('path')
          , crypto    = require('crypto')
          ;
        `,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        var a = 1
           ,b = 2
           ;`
    },
    {
      code: Lint.Utils.dedent`
        const a: number = 1
             ,b: number = 2
             ;`
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        a.b()
          .c(function(){
            var a;
          }).d.e;
        `,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        const YO = 'bah',
              TE = 'mah'

        var res,
            a = 5,
            b = 4
        `,
      options: [2, {VariableDeclarator: { var: 2, let: 2, const: 3}}]
    },
    {
      code: Lint.Utils.dedent`
        const YO = 'bah',
              TE = 'mah'

        var res,
            a = 5,
            b = 4

        if (YO) console.log(TE)`,
      options: [2, {VariableDeclarator: { var: 2, let: 2, const: 3}}]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      options: [2, {MemberExpression: 0}]
    },
    {
      code: Lint.Utils.dedent`
        const someOtherFunction = argument => {
                console.log(argument);
            },
            someOtherValue = 'someOtherValue';
        `
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        var a = 1,
            B = class {
              constructor(){}
              a(){}
              get b(){}
            };`,
      options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        class A{
            constructor(){}
            a(){}
            get b(){}
        }`,
      options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
      code: Lint.Utils.dedent`
        var A = class {
            constructor(){}
            a(){}
            get b(){}
        }`,
      options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
      code: Lint.Utils.dedent`
        var a = {
          some: 1
        , name: 2
        };
        `,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        var a =
        [
            {
                name: 'compile'
            }
        ];
        `,
      options: [4, {VariableDeclarator: 0, SwitchCase: 1}]
    },
    {
      code: Lint.Utils.dedent`
        const func = function (opts) {
            return Promise.resolve()
            .then(() => {
                [
                    'ONE', 'TWO'
                ].forEach(command => { doSomething(); });
            });
        };`,
      options: [4, {MemberExpression: 0}]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        class Foo
          extends Bar {
          baz() {}
        }`,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        class Foo extends
          Bar {
          baz() {}
        }`,
      options: [2]
    },
    {
      code: Lint.Utils.dedent`
        fs.readdirSync(path.join(__dirname, '../rules')).forEach(name => {
          files[name] = foo;
        });`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        (function(){
        function foo(x) {
          return x + 1;
        }
        })();`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        (function(){
                function foo(x) {
                    return x + 1;
                }
        })();`,
      options: [4, { outerIIFEBody: 2 }]
    },
    {
      code: Lint.Utils.dedent`
        (function(x, y){
        function foo(x) {
          return x + 1;
        }
        })(1, 2);`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        (function(){
        function foo(x) {
          return x + 1;
        }
        }());`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        var out = function(){
          function fooVar(x) {
            return x + 1;
          }
        };`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        var ns = function(){
        function fooVar(x) {
          return x + 1;
        }
        }();`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        ns = function(){
        function fooVar(x) {
          return x + 1;
        }
        }();`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        var ns = (function(){
        function fooVar(x) {
          return x + 1;
        }
        }(x));`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        var ns = (function(){
                function fooVar(x) {
                    return x + 1;
                }
        }(x));`,
      options: [4, { outerIIFEBody: 2 }]
    },
    {
      code: Lint.Utils.dedent`
        var obj = {
          foo: function() {
            return true;
          }
        };`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        while (
          function() {
            return true;
          }()) {

          x = x + 1;
        };`,
      options: [2, { outerIIFEBody: 20 }]
    },
    {
      code: Lint.Utils.dedent`
        (() => {
        function foo(x) {
          return x + 1;
        }
        })();`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        function foo() {
        }`,
      options: ['tab', { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        ;(() => {
        function foo(x) {
          return x + 1;
        }
        })();`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        if(data) {
          console.log('hi');
        }`,
      options: [2, { outerIIFEBody: 0 }]
    },
    {
      code: Lint.Utils.dedent`
        Buffer.length`,
      options: [4, { MemberExpression: 1 }]
    },
    {
      code: Lint.Utils.dedent`
        Buffer
            .indexOf('a')
            .toString()`,
      options: [4, { MemberExpression: 1 }]
    },
    {
      code: Lint.Utils.dedent`
        Buffer.
            length`,
      options: [4, { MemberExpression: 1 }]
    },
    {
      code: Lint.Utils.dedent`
        Buffer
            .foo
            .bar`,
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
      code: Lint.Utils.dedent`
        Buffer
            .foo
            .bar`,
      options: [2, {MemberExpression: 2}]
    },
    {
      code: Lint.Utils.dedent`
        MemberExpression
        .
          .o
            .
         .default();`,
      options: [4]
    },
    {
      code: Lint.Utils.dedent`
        foo = bar.baz()
                .bip();`,
      options: [4, {MemberExpression: 1}]
    },
    {
      code: Lint.Utils.dedent`
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
      code: Lint.Utils.dedent`
        function foo(aaa,
          bbb, ccc, ddd) {
            bar();
        }`,
      options: [2, {FunctionDeclaration: {parameters: 1, body: 2}}]
    },
    {
      code: Lint.Utils.dedent`
        function foo(aaa, bbb,
              ccc, ddd) {
          bar();
        }`,
      options: [2, {FunctionDeclaration: {parameters: 3, body: 1}}]
    },
    {
      code: Lint.Utils.dedent`
        function foo(aaa,
            bbb,
            ccc) {
                    bar();
        }`,
      options: [4, {FunctionDeclaration: {parameters: 1, body: 3}}]
    },
    {
      code: Lint.Utils.dedent`
        function foo(aaa,
                     bbb, ccc,
                     ddd, eee, fff) {
          bar();
        }`,
      options: [2, {FunctionDeclaration: {parameters: 'first', body: 1}}]
    },
    {
      code: Lint.Utils.dedent`
        function foo(aaa, bbb)
        {
              bar();
        }`,
      options: [2, {FunctionDeclaration: {body: 3}}] // FIXME: what is the default for `parameters`?
    },
    {
      code: Lint.Utils.dedent`
        function foo(
          aaa,
          bbb) {
            bar();
        }`,
      options: [2, {FunctionDeclaration: {parameters: 'first', body: 2}}] // FIXME: make sure this is correct
    },
    {
      code: Lint.Utils.dedent`
        var foo = function(aaa,
            bbb,
            ccc,
            ddd) {
        bar();
        }`,
      options: [2, {FunctionExpression: {parameters: 2, body: 0}}]
    },
    {
      code: Lint.Utils.dedent`
        var foo = function(aaa,
          bbb,
          ccc) {
                            bar();
        }`,
      options: [2, {FunctionExpression: {parameters: 1, body: 10}}]
    },
    {
      code: Lint.Utils.dedent`
        var foo = function(aaa,
                           bbb, ccc, ddd,
                           eee, fff) {
            bar();
        }`,
      options: [4, {FunctionExpression: {parameters: 'first', body: 1}}]
    },
    {
      code: Lint.Utils.dedent`
        var foo = function(
          aaa, bbb, ccc,
          ddd, eee) {
              bar();
        }`,
      options: [2, {FunctionExpression: {parameters: 'first', body: 3}}] // FIXME: make sure this is correct
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
      code: Lint.Utils.dedent`
        function foo() {
          function bar() {
            baz();
          }
        }`,
      options: [2, {FunctionDeclaration: {body: 1}}]
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
      code: Lint.Utils.dedent`
        function foo() {
          function bar(baz,
              qux) {
            foobar();
          }
        }`,
      options: [2, {FunctionDeclaration: {body: 1, parameters: 2}}]
    },
    {
      code: Lint.Utils.dedent`
        function foo() {
          var bar = function(baz,
                qux) {
            foobar();
          };
        }`,
      options: [2, {FunctionExpression: {parameters: 3}}]
    }
  ],
  invalid: [
    {
      code: Lint.Utils.dedent`
        var a = b;
        if (a) {
        b();
        }`,
      options: [2],
      errors: expectedErrors([[3, 2, 0]])
    },
    {
      code: Lint.Utils.dedent`
        if (array.some(function(){
          return true;
        })) {
        a++; // ->
          b++;
            c++; // <-
        }`,
      options: [2],
      errors: expectedErrors([[4, 2, 0], [6, 2, 4]])
    },
    {
      code: '\nif (a){\n\tb=c;\n\t\tc=d;\ne=f;\n}',
      options: ['tab'],
      errors: expectedErrors(
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
      errors: expectedErrors([[3, 4, 6], [4, 4, 1]])
    },
    {
      code: Lint.Utils.dedent`
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
      errors: expectedErrors([[4, 8, 4], [7, 8, 4]])
    },
    {
      code: Lint.Utils.dedent`
        var x = 0 &&
            {
               a: 1,
                  b: 2
            };`,
      options: [4],
      errors: expectedErrors([[3, 8, 7], [4, 8, 10]])
    },
    {
      code: Lint.Utils.dedent`
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
      options: [4, {SwitchCase: 1}],
      errors: expectedErrors([[9, 8, 4]])
    },
    {
      code: Lint.Utils.dedent`
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
      errors: expectedErrors([[11, 8, 4], [14, 8, 4], [17, 8, 4]])
    },
    {
      code: Lint.Utils.dedent`
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
      errors: expectedErrors([
        [3, 4, 8],
        [4, 4, 8],
        [5, 0, 4],
        [6, 4, 8],
        [7, 0, 4],
        [8, 4, 8]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var obj = {foo: 1, bar: 2};
        with (obj) {
        console.log(foo + bar);
        }`,
      errors: expectedErrors([[3, 4, 0]])
    },
    {
      code: Lint.Utils.dedent`
        switch (a) {
        case '1':
        b();
        break;
        default:
        c();
        break;
        }`,
      options: [4, { SwitchCase: 1 }],
      errors: expectedErrors([
        [2, 4, 0],
        [3, 8, 0],
        [4, 8, 0],
        [5, 4, 0],
        [6, 8, 0],
        [7, 8, 0]
      ])
    },
    {
      code: '\nwhile (a)\nb();\n',
      options: [4],
      errors: expectedErrors([
        [2, 4, 0]
      ])
    },
    {
      code: '\nfor (;;) \nb();\n',
      options: [4],
      errors: expectedErrors([
        [2, 4, 0]
      ])
    },
    {
      code: '\nfor (a in x) \nb();',
      options: [4],
      errors: expectedErrors([
        [2, 4, 0]
      ])
    },
    {
      code: Lint.Utils.dedent`
        do
        b();
        while(true)`,
      options: [4],
      errors: expectedErrors([
        [2, 4, 0]
      ])
    },
    {
      code: '\nif(true) \nb();',
      options: [4],
      errors: expectedErrors([
        [2, 4, 0]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var test = {
              a: 1,
            b: 2
            };`,
      options: [2],
      errors: expectedErrors([
        [2, 2, 6],
        [3, 2, 4],
        [4, 0, 4]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var a = function() {
              a++;
            b++;
                  c++;
            },
            b;`,
      options: [4],
      errors: expectedErrors([
        [2, 8, 6],
        [3, 8, 4],
        [4, 8, 10]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var a = 1,
        b = 2,
        c = 3;`,
      options: [4],
      errors: expectedErrors([
        [2, 4, 0],
        [3, 4, 0]
      ])
    },
    {
      code: Lint.Utils.dedent`
        [a, b,
        c].forEach((index) => {
          index;
        });`,
      options: [4],
      errors: expectedErrors([
        [3, 4, 2]
      ])
    },
    {
      code: Lint.Utils.dedent`
        [a, b,
        c].forEach(function(index){
          return index;
        });`,
      options: [4],
      errors: expectedErrors([
        [3, 4, 2]
      ])
    },
    {
      code: Lint.Utils.dedent`
        [a, b, c].forEach((index) => {
          index;
        });`,
      options: [4],
      errors: expectedErrors([
        [2, 4, 2]
      ])
    },
    {
      code: Lint.Utils.dedent`
        [a, b, c].forEach(function(index){
          return index;
        });`,
      options: [4],
      errors: expectedErrors([
        [2, 4, 2]
      ])
    },
    {
      code: "\nwhile (1 < 2)\nconsole.log('foo')\n  console.log('bar')",
      options: [2],
      errors: expectedErrors([
        [2, 2, 0],
        [3, 0, 2]
      ])
    },
    {
      code: Lint.Utils.dedent`
        function salutation () {
          switch (1) {
          case 0: return console.log('hi')
            case 1: return console.log('hey')
          }
        }`,
      options: [2, { SwitchCase: 1 }],
      errors: expectedErrors([
        [3, 4, 2]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,
        height, rotate;`,
      options: [2, { SwitchCase: 1 }],
      errors: expectedErrors([
        [2, 2, 0]
      ])
    },
    {
      code: Lint.Utils.dedent`
        switch (a) {
        case '1':
        b();
        break;
        default:
        c();
        break;
        }`,
      options: [4, { SwitchCase: 2 }],
      errors: expectedErrors([
        [2, 8, 0],
        [3, 12, 0],
        [4, 12, 0],
        [5, 8, 0],
        [6, 12, 0],
        [7, 12, 0]
      ])
    },
    {
      code: '\nvar geometry,\nrotate;',
      options: [2, { VariableDeclarator: 1 }],
      errors: expectedErrors([
        [2, 2, 0]
      ])
    },
    {
      code: '\nvar geometry,\n  rotate;',
      options: [2, { VariableDeclarator: 2 }],
      errors: expectedErrors([
        [2, 4, 2]
      ])
    },
    {
      code: '\nvar geometry,\n\trotate;',
      options: ['tab', { VariableDeclarator: 2 }],
      errors: expectedErrors(
        [
          [2, 2, 1]
        ],
        'tab'
      )
    },
    {
      code: '\nlet geometry,\n  rotate;',
      options: [2, { VariableDeclarator: 2 }],
      errors: expectedErrors([
        [2, 4, 2]
      ])
    },
    {
      code: Lint.Utils.dedent`
        if(true)
          if (true)
            if (true)
            console.log(val);`,
      options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
      errors: expectedErrors([
        [4, 6, 4]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var a = {
            a: 1,
            b: 2
        }`,
      options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
      errors: expectedErrors([
        [2, 2, 4],
        [3, 2, 4]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var a = [
            a,
            b
        ]`,
      options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
      errors: expectedErrors([
        [2, 2, 4],
        [3, 2, 4]
      ])
    },
    {
      code: Lint.Utils.dedent`
        let a = [
            a,
            b
        ]`,
      options: [2, { VariableDeclarator: { let: 2 }, SwitchCase: 1 }],
      errors: expectedErrors([
        [2, 2, 4],
        [3, 2, 4]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var a = new Test({
              a: 1
          }),
            b = 4;`,
      options: [4],
      errors: expectedErrors([
        [2, 8, 6],
        [3, 4, 2]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var a = new Test({
              a: 1
            }),
            b = 4;
        const a = new Test({
              a: 1
            }),
            b = 4;`,
      options: [2, { VariableDeclarator: { var: 2 } }],
      errors: expectedErrors([
        [6, 4, 6],
        [7, 2, 4],
        [8, 2, 4]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var abc = 5,
            c = 2,
            xyz =
             {
               a: 1,
                b: 2
             };`,
      options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
      errors: expectedErrors([
        [4, 4, 5],
        [5, 6, 7],
        [6, 6, 8],
        [7, 4, 5]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var abc =
             {
               a: 1,
                b: 2
             };`,
      options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
      errors: expectedErrors([
        [2, 4, 5],
        [3, 6, 7],
        [4, 6, 8],
        [5, 4, 5]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var path     = require('path')
         , crypto    = require('crypto')
        ;`,
      options: [2],
      errors: expectedErrors([
        [3, 1, 0]
      ])
    },
    {
      code: Lint.Utils.dedent`
        var a = 1
           ,b = 2
        ;`,
      errors: expectedErrors([
        [3, 3, 0]
      ])
    },
    {
      code: Lint.Utils.dedent`
        class A{
          constructor(){}
            a(){}
            get b(){}
        }`,
      options: [4, { VariableDeclarator: 1, SwitchCase: 1 }],
      errors: expectedErrors([[2, 4, 2]])
    },
    {
      code: Lint.Utils.dedent`
        var A = class {
          constructor(){}
            a(){}
          get b(){}
        };`,
      options: [4, { VariableDeclarator: 1, SwitchCase: 1 }],
      errors: expectedErrors([[2, 4, 2], [4, 4, 2]])
    },
    {
      code: Lint.Utils.dedent`
        var a = 1,
            B = class {
            constructor(){}
              a(){}
              get b(){}
            };`,
      options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
      errors: expectedErrors([[3, 6, 4]])
    },
    {
      code: Lint.Utils.dedent`
        {
            if(a){
                foo();
            }
          else{
                bar();
            }
        }`,
      options: [4],
      errors: expectedErrors([[5, 4, 2]])
    },
    {
      code: Lint.Utils.dedent`
        {
            if(a){
                foo();
            }
          else
                bar();

        }`,
      options: [4],
      errors: expectedErrors([[5, 4, 2]])
    },
    {
      code: Lint.Utils.dedent`
        {
            if(a)
                foo();
          else
                bar();
        }`,
      options: [4],
      errors: expectedErrors([[4, 4, 2]])
    },
    {
      code: Lint.Utils.dedent`
        (function(){
          function foo(x) {
            return x + 1;
          }
        })();`,
      options: [2, { outerIIFEBody: 0 }],
      errors: expectedErrors([[2, 0, 2]])
    },
    {
      code: Lint.Utils.dedent`
        (function(){
            function foo(x) {
                return x + 1;
            }
        })();`,
      options: [4, { outerIIFEBody: 2 }],
      errors: expectedErrors([[2, 8, 4]])
    },
    {
      code: Lint.Utils.dedent`
        if(data) {
        console.log('hi');
        }`,
      options: [2, { outerIIFEBody: 0 }],
      errors: expectedErrors([[2, 2, 0]])
    },
    {
      code: Lint.Utils.dedent`
        var ns = function(){
            function fooVar(x) {
                return x + 1;
            }
        }(x);`,
      options: [4, { outerIIFEBody: 2 }],
      errors: expectedErrors([[2, 8, 4]])
    },
    {
      code: Lint.Utils.dedent`
        var obj = {
          foo: function() {
          return true;
          }()
        };`,
      options: [2, { outerIIFEBody: 0 }],
      errors: expectedErrors([[3, 4, 2]])
    },
    {
      code: Lint.Utils.dedent`
        typeof function() {
            function fooVar(x) {
              return x + 1;
            }
        }();`,
      options: [2, { outerIIFEBody: 2 }],
      errors: expectedErrors([[2, 2, 4]])
    },
    {
      code: Lint.Utils.dedent`
        {
        \t!function(x) {
        \t\t\t\treturn x + 1;
        \t}()
        };`,
      options: ['tab', { outerIIFEBody: 3 }],
      errors: expectedErrors([[3, 2, 4]], 'tab')
    },
    {
      code: '\nBuffer\n.toString()',
      options: [4, { MemberExpression: 1 }],
      errors: expectedErrors([[2, 4, 0]])
    },
    {
      code: Lint.Utils.dedent`
        Buffer
            .indexOf('a')
        .toString()`,
      options: [4, { MemberExpression: 1 }],
      errors: expectedErrors([[3, 4, 0]])
    },
    {
      code: '\nBuffer.\nlength',
      options: [4, { MemberExpression: 1 }],
      errors: expectedErrors([[2, 4, 0]])
    },
    {
      code: '\nBuffer.\n\t\tlength',
      options: ['tab', { MemberExpression: 1 }],
      errors: expectedErrors([[2, 1, 2]], 'tab')
    },
    {
      code: '\nBuffer\n  .foo\n  .bar',
      options: [2, { MemberExpression: 2 }],
      errors: expectedErrors([[2, 4, 2], [3, 4, 2]])
    },
    {
      code: Lint.Utils.dedent`
        if (foo) bar();
        else if (baz) foobar();
          else if (qux) qux();`,
      options: [2],
      errors: expectedErrors([[3, 0, 2]])
    },
    {
      code: Lint.Utils.dedent`
        if (foo) bar();
        else if (baz) foobar();
          else qux();`,
      options: [2],
      errors: expectedErrors([[3, 0, 2]])
    },
    {
      code: Lint.Utils.dedent`
        foo();
          if (baz) foobar();
          else qux();`,
      options: [2],
      errors: expectedErrors([[2, 0, 2], [3, 0, 2]])
    },
    {
      code: Lint.Utils.dedent`
        if (foo) bar();
        else if (baz) foobar();
             else if (bip) {
               qux();
             }`,
      options: [2],
      errors: expectedErrors([[3, 0, 5]])
    },
    {
      code: Lint.Utils.dedent`
        if (foo) bar();
        else if (baz) {
            foobar();
             } else if (boop) {
               qux();
             }`,
      options: [2],
      errors: expectedErrors([[3, 2, 4], [4, 0, 5]])
    },
    {
      code: Lint.Utils.dedent`
        function foo(aaa,
            bbb, ccc, ddd) {
              bar();
        }`,
      options: [2, { FunctionDeclaration: { parameters: 1, body: 2 } }],
      errors: expectedErrors([[2, 2, 4], [3, 4, 6]])
    },
    {
      code: Lint.Utils.dedent`
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
      errors: expectedErrors([[2, 6, 2], [3, 2, 0]])
    },
    {
      code: Lint.Utils.dedent`
        function foo(aaa,
                bbb,
          ccc) {
              bar();
        }`,
      options: [4, { FunctionDeclaration: { parameters: 1, body: 3 } }],
      errors: expectedErrors([[2, 4, 8], [3, 4, 2], [4, 12, 6]])
    },
    {
      code: Lint.Utils.dedent`
        function foo(aaa,
          bbb, ccc,
                           ddd, eee, fff) {
           bar();
        }`,
      options: [2, { FunctionDeclaration: { parameters: 'first', body: 1 } }],
      errors: expectedErrors([[2, 13, 2], [3, 13, 19], [4, 2, 3]])
    },
    {
      code: Lint.Utils.dedent`
        function foo(aaa, bbb)
        {
        bar();
        }`,
      options: [2, { FunctionDeclaration: { body: 3 } }],
      errors: expectedErrors([[3, 6, 0]])
    },
    {
      code: Lint.Utils.dedent`
        function foo(
        aaa,
            bbb) {
        bar();
        }`,
      options: [2, { FunctionDeclaration: { parameters: 'first', body: 2 } }],
      errors: expectedErrors([[3, 0, 4], [4, 4, 0]])
    },
    {
      code: Lint.Utils.dedent`
        var foo = function(aaa,
          bbb,
            ccc,
              ddd) {
          bar();
        }`,
      options: [2, { FunctionExpression: { parameters: 2, body: 0 } }],
      errors: expectedErrors([[2, 4, 2], [4, 4, 6], [5, 0, 2]])
    },
    {
      code: Lint.Utils.dedent`
        var foo = function(aaa,
           bbb,
         ccc) {
          bar();
        }`,
      options: [2, { FunctionExpression: { parameters: 1, body: 10 }}],
      errors: expectedErrors([[2, 2, 3], [3, 2, 1], [4, 20, 2]])
    },
    {
      code: Lint.Utils.dedent`
        var foo = function(aaa,
          bbb, ccc, ddd,
                                eee, fff) {
                bar();
        }`,
      options: [4, { FunctionExpression: { parameters: 'first', body: 1 } }],
      errors: expectedErrors([[2, 19, 2], [3, 19, 24], [4, 4, 8]])
    },
    {
      code: Lint.Utils.dedent`
        var foo = function(
        aaa, bbb, ccc,
            ddd, eee) {
          bar();
        }`,
      options: [2, {FunctionExpression: { parameters: 'first', body: 3 } }],
      errors: expectedErrors([[3, 0, 4], [4, 6, 2]])
    },
    {
      code: '\nvar foo = bar;\n\t\t\tvar baz = qux;',
      options: [2],
      errors: expectedErrors([[2, '0 spaces', '3 tabs']])
    },
    {
      code: '\nfunction foo() {\n\tbar();\n  baz();\n              qux();\n}',
      options: ['tab'],
      errors: expectedErrors([[3, '1 tab', '2 spaces'], [4, '1 tab', '14 spaces']], 'tab')
    },
    {
      code: [
        '\nfunction foo() {',
        '  bar();',
        '\t\t}'
      ].join('\n'),
      options: [2],
      errors: expectedErrors([[3, '0 spaces', '2 tabs']])
    },
    {
      code: Lint.Utils.dedent`
        function foo() {
          function bar() {
                baz();
          }
        }`,
      options: [2, { FunctionDeclaration: { body: 1 } }],
      errors: expectedErrors([[3, 4, 8]])
    },
    {
      code: Lint.Utils.dedent`
        function foo() {
          function bar(baz,
            qux) {
            foobar();
          }
        }`,
      options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
      errors: expectedErrors([[3, 6, 4]])
    },
    {
      code: Lint.Utils.dedent`
        function foo() {
          var bar = function(baz,
                  qux) {
            foobar();
          };
        }`,
      options: [2, { FunctionExpression: { parameters: 3 } }],
      errors: expectedErrors([[3, 8, 10]])
    },
    {
      code: Lint.Utils.dedent`
        /**/var b; // NO ERROR: single line multi-line comments followed by code is OK
        /*
         *
         */ var b; // ERROR: multi-line comments followed by code is not OK
        `,
      options: [2],
      errors: expectedErrors([
        [4, 0, 1]
      ])
    },
    {
      code: '\n' + fixture,
      options: [2, { SwitchCase: 1, MemberExpression: 1 }],
      errors: expectedErrors([
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
  ]
};

describe(rule, () => {

  it('should pass when using the correct indentation', () => {
    runTest(rule, scripts.valid);
  });

  it('should fail when using wrong indentation', () => {
    runTest(rule, scripts.invalid);
  });

});
