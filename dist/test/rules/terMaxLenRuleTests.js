"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-max-len');
function expecting(errors) {
    return errors.map(function (err) {
        var message = "Line " + (err[0] + 1) + " exceeds the maximum line length of " + err[1] + ".";
        if (err[2]) {
            message = "Line " + (err[0] + 1) + " exceeds the maximum comment line length of " + err[1] + ".";
        }
        return {
            failure: message,
            startPosition: new ruleTester_1.Position(err[0]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('no-options', 'should warn when the line exceeds the limit', [
    {
        code: ''
    },
    {
        code: 'var x = 5;\nvar x = 2;'
    },
    {
        code: 'var x = 5;\nvar x = 2;',
        options: [80]
    },
    {
        code: 'var one\t\t= 1;\nvar three\t= 3;',
        options: [16, 4]
    },
    {
        code: '\tvar one\t\t= 1;\n\tvar three\t= 3;',
        options: [20, 4]
    },
    {
        code: 'var i = 1;\r\nvar i = 1;\n',
        options: [10, 4]
    },
    {
        code: '\n// Blank line on top\nvar foo = module.exports = {};\n',
        options: [80, 4]
    },
    {
        code: '\n// Blank line on top\nvar foo = module.exports = {};\n'
    },
    {
        code: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar i = 1;',
        errors: expecting([[0, 80]])
    },
    {
        code: 'var x = 5, y = 2, z = 5;',
        options: [10],
        errors: expecting([[0, 10]])
    },
    {
        code: '\t\t\tvar i = 1;',
        options: [15],
        errors: expecting([[0, 15]])
    },
    {
        code: '\t\t\tvar i = 1;\n\t\t\tvar j = 1;',
        options: [15, { tabWidth: 4 }],
        errors: expecting([[0, 15], [1, 15]])
    }
]);
ruleTester.addTestGroup('patterns', 'should ignore specified patterns', [
    {
        code: (_a = ["\n      var dep = require('really/really/really/really/really/really/really/long/module');\n      const dep = require('another/really/really/really/really/really/really/long/module');\n                       foobar = 'this line will be ignored because it starts with foobar ...';\n      "], _a.raw = ["\n      var dep = require('really/really/really/really/really/really/really/long/module');\n      const dep = require('another/really/really/really/really/really/really/long/module');\n                       foobar = 'this line will be ignored because it starts with foobar ...';\n      "], ruleTester_1.dedent(_a)),
        options: [50, { ignorePattern: '^\\s*(var|const)\\s.+=\\s*require\\s*\\(|^\\s*foobar' }]
    },
    {
        code: "foo(bar(bazz('this is a long'), 'line of'), 'stuff');",
        options: [40, 4, { ignorePattern: 'foo.+bazz\\(' }]
    },
    {
        code: "foo(bar(bazz('this is a long'), 'line of'), 'stuff');",
        options: [40, 4],
        errors: expecting([[0, 40]])
    },
    {
        code: (_b = ["\n      var foobar = 'this line isn\\'t matched by the regexp';\n      var fizzbuzz = 'but this one is matched by the regexp';\n      "], _b.raw = ["\n      var foobar = 'this line isn\\\\'t matched by the regexp';\n      var fizzbuzz = 'but this one is matched by the regexp';\n      "], ruleTester_1.dedent(_b)),
        options: [20, 4, { ignorePattern: 'fizzbuzz' }],
        errors: expecting([[1, 20]])
    }
]);
ruleTester.addTestGroup('imports', 'should ignore long module specifiers', [
    {
        code: (_c = ["\n        import { obj1, obj2, obj3, obj4 } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        import {\n            obj1,\n            obj2,\n            obj3,\n            obj4,\n        } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        "], _c.raw = ["\n        import { obj1, obj2, obj3, obj4 } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        import {\n            obj1,\n            obj2,\n            obj3,\n            obj4,\n        } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        "], ruleTester_1.dedent(_c)),
        options: [50, { ignoreImports: true }]
    },
    {
        code: (_d = ["\n        import {\n          obj1, obj2, obj3, obj4, just, trying, to, be, a, rebel, here\n        } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        "], _d.raw = ["\n        import {\n          obj1, obj2, obj3, obj4, just, trying, to, be, a, rebel, here\n        } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        "], ruleTester_1.dedent(_d)),
        options: [50, { ignoreImports: true }],
        errors: expecting([[2, 50]])
    }
]);
ruleTester.addTestGroup('urls', 'should ignore lines that contain urls', [
    {
        code: "foo('http://example.com/this/is/?a=longish&url=in#here');",
        options: [40, 4, { ignoreUrls: true }]
    },
    {
        code: "foo('http://example.com/this/is/?a=longish&url=in#here');",
        options: [40, 4],
        errors: expecting([[0, 40]])
    }
]);
ruleTester.addTestGroup('comments', 'should handle comments', [
    {
        code: 'var foo = module.exports = {}; // really long trailing comment',
        options: [40, 4, { ignoreComments: true }]
    },
    {
        code: 'foo(); \t// strips entire comment *and* trailing whitespace',
        options: [6, 4, { ignoreComments: true }]
    },
    {
        code: '// really long comment on its own line sitting here',
        options: [40, 4, { ignoreComments: true }]
    },
    {
        code: 'var /*inline-comment*/ i = 1;'
    },
    {
        code: 'var /*inline-comment*/ i = 1; // with really long trailing comment',
        options: [40, 4, { ignoreComments: true }]
    },
    {
        code: (_e = ["\n      /* hey there! this is a multiline\n         comment with longish lines in various places\n         but\n         with a short line-length */"], _e.raw = ["\n      /* hey there! this is a multiline\n         comment with longish lines in various places\n         but\n         with a short line-length */"], ruleTester_1.dedent(_e)),
        options: [10, 4, { ignoreComments: true }]
    },
    {
        code: (_f = ["\n      // I like short comments\n      function butLongSourceLines() { weird(eh()) }"], _f.raw = ["\n      // I like short comments\n      function butLongSourceLines() { weird(eh()) }"], ruleTester_1.dedent(_f)),
        options: [80, { tabWidth: 4, comments: 30 }]
    },
    {
        code: (_g = ["\n      // Full line comment\n      someCode(); // With a long trailing comment."], _g.raw = ["\n      // Full line comment\n      someCode(); // With a long trailing comment."], ruleTester_1.dedent(_g)),
        options: [{ code: 30, tabWidth: 4, comments: 20, ignoreTrailingComments: true }]
    },
    {
        code: 'var foo = module.exports = {}; // really long trailing comment',
        options: [40, 4, { ignoreTrailingComments: true }]
    }, {
        code: 'var foo = module.exports = {}; // really long trailing comment',
        options: [40, 4, { ignoreComments: true, ignoreTrailingComments: false }]
    },
    {
        code: (_h = ["\n      function foo() {\n      //this line has 29 characters\n      }"], _h.raw = ["\n      function foo() {\n      //this line has 29 characters\n      }"], ruleTester_1.dedent(_h)),
        options: [40, 4, { comments: 29 }]
    },
    {
        code: (_j = ["\n      function foo() {\n          //this line has 33 characters\n      }"], _j.raw = ["\n      function foo() {\n          //this line has 33 characters\n      }"], ruleTester_1.dedent(_j)),
        options: [40, 4, { comments: 33 }]
    },
    {
        code: (_k = ["\n      function foo() {\n      /*this line has 29 characters\n      and this one has 21*/\n      }"], _k.raw = ["\n      function foo() {\n      /*this line has 29 characters\n      and this one has 21*/\n      }"], ruleTester_1.dedent(_k)),
        options: [40, 4, { comments: 29 }]
    },
    {
        code: (_l = ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 25*/\n      }"], _l.raw = ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 25*/\n      }"], ruleTester_1.dedent(_l)),
        options: [40, 4, { comments: 33 }]
    },
    {
        code: (_m = ["\n      function foo() {\n          var a; /*this line has 40 characters\n          and this one has 36 characters*/\n      }"], _m.raw = ["\n      function foo() {\n          var a; /*this line has 40 characters\n          and this one has 36 characters*/\n      }"], ruleTester_1.dedent(_m)),
        options: [40, 4, { comments: 36 }]
    },
    {
        code: (_o = ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 43 characters*/ var a;\n      }"], _o.raw = ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 43 characters*/ var a;\n      }"], ruleTester_1.dedent(_o)),
        options: [43, 4, { comments: 33 }]
    },
    {
        code: (_p = ["\n      function foo() {\n      //this line has 29 characters\n      }"], _p.raw = ["\n      function foo() {\n      //this line has 29 characters\n      }"], ruleTester_1.dedent(_p)),
        options: [40, 4, { comments: 28 }],
        errors: expecting([[2, 28, true]])
    },
    {
        code: (_q = ["\n      function foo() {\n          //this line has 33 characters\n      }"], _q.raw = ["\n      function foo() {\n          //this line has 33 characters\n      }"], ruleTester_1.dedent(_q)),
        options: [40, 4, { comments: 32 }],
        errors: expecting([[2, 32, true]])
    },
    {
        code: (_r = ["\n      function foo() {\n      /*this line has 29 characters\n      and this one has 32 characters*/\n      }"], _r.raw = ["\n      function foo() {\n      /*this line has 29 characters\n      and this one has 32 characters*/\n      }"], ruleTester_1.dedent(_r)),
        options: [40, 4, { comments: 28 }],
        errors: expecting([
            [2, 28, true],
            [3, 28, true]
        ])
    },
    {
        code: (_s = ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 36 characters*/\n      }"], _s.raw = ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 36 characters*/\n      }"], ruleTester_1.dedent(_s)),
        options: [40, 4, { comments: 32 }],
        errors: expecting([
            [2, 32, true],
            [3, 32, true]
        ])
    },
    {
        code: (_t = ["\n      function foo() {\n          var a; /*this line has 40 characters\n          and this one has 36 characters*/\n      }"], _t.raw = ["\n      function foo() {\n          var a; /*this line has 40 characters\n          and this one has 36 characters*/\n      }"], ruleTester_1.dedent(_t)),
        options: [39, 4, { comments: 35 }],
        errors: expecting([
            [2, 39],
            [3, 35, true]
        ])
    },
    {
        code: (_u = ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 43 characters*/ var a;\n      }"], _u.raw = ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 43 characters*/ var a;\n      }"], ruleTester_1.dedent(_u)),
        options: [42, 4, { comments: 32 }],
        errors: expecting([
            [2, 32, true],
            [3, 42]
        ])
    },
    {
        code: (_v = ["\n      // This commented line has precisely 51 characters.\n      var x = 'This line also has exactly 51 characters';"], _v.raw = ["\n      // This commented line has precisely 51 characters.\n      var x = 'This line also has exactly 51 characters';"], ruleTester_1.dedent(_v)),
        options: [20, { ignoreComments: true }],
        errors: expecting([[2, 20]])
    },
    {
        code: 'var /*this is a long non-removed inline comment*/ i = 1;',
        options: [20, { tabWidth: 4, ignoreComments: true }],
        errors: expecting([[0, 20]])
    },
    {
        code: "var longLine = 'will trigger'; // even with a comment",
        options: [10, 4, { ignoreComments: true }],
        errors: expecting([[0, 10]])
    },
    {
        code: "var foo = module.exports = {}; // really long trailing comment",
        options: [40, 4],
        errors: expecting([[0, 40]])
    },
    {
        code: '// A comment that exceeds the max comment length.',
        options: [80, 4, { comments: 20 }],
        errors: expecting([[0, 20, true]])
    },
    {
        code: '// A comment that exceeds the max comment length.',
        options: [{ code: 20 }],
        errors: expecting([[0, 20]])
    },
    {
        code: '//This is very long comment with more than 40 characters which is invalid',
        options: [40, 4, { ignoreTrailingComments: true }],
        errors: expecting([[0, 40]])
    }
]);
ruleTester.addTestGroup('regex', 'should ignore long regular expression literals', [
    {
        code: 'var foo = /this is a very long pattern/;',
        options: [29, 4, { ignoreRegExpLiterals: true }]
    }
]);
ruleTester.addTestGroup('template-literals', 'should ignore template literals', [
    {
        code: 'var foo = veryLongIdentifier;\nvar bar = `this is a very long string`;',
        options: [29, 4, { ignoreTemplateLiterals: true }]
    },
    {
        code: 'var foo = veryLongIdentifier;\nvar bar = `this is a very long string\nand this is another line that is very long`;',
        options: [29, 4, { ignoreTemplateLiterals: true }]
    },
    {
        code: (_w = ["\n        var foo = veryLongIdentifier;\n        var bar = `this is a very long string\n        and this is another line that is very long\n        and here is another\n         and another!`;"], _w.raw = ["\n        var foo = veryLongIdentifier;\n        var bar = \\`this is a very long string\n        and this is another line that is very long\n        and here is another\n         and another!\\`;"], ruleTester_1.dedent(_w)),
        options: [29, 4, { ignoreTemplateLiterals: true }]
    }
]);
ruleTester.addTestGroup('strings', 'should ignore strings', [
    {
        code: "var foo = veryLongIdentifier;\nvar bar = 'this is a very long string';",
        options: [29, 4, { ignoreStrings: true }]
    },
    {
        code: "var foo = veryLongIdentifier;\nvar bar = \"this is a very long string\";",
        options: [29, 4, { ignoreStrings: true }]
    },
    {
        code: (_x = ["\n      var str = \"this is a very long string      with continuation\";"], _x.raw = ["\n      var str = \"this is a very long string\\\n      with continuation\";"], ruleTester_1.dedent(_x)),
        options: [29, 4, { ignoreStrings: true }]
    },
    {
        code: 'var str = \"this is a very long string\\\nwith continuation\\\nand with another very very long continuation\\\nand ending\";',
        options: [29, 4, { ignoreStrings: true }]
    }
]);
ruleTester.addTestGroup('strings-regex', 'should handle ignoreStrings and ignoreRegExpLiterals options', [
    {
        code: "var foo = veryLongIdentifier;\nvar bar = /this is a very very long pattern/;",
        options: [29, { ignoreStrings: false, ignoreRegExpLiterals: false }],
        errors: expecting([[1, 29]])
    },
    {
        code: "var foo = veryLongIdentifier;\nvar bar = new RegExp('this is a very very long pattern');",
        options: [29, { ignoreStrings: false, ignoreRegExpLiterals: true }],
        errors: expecting([[1, 29]])
    }
]);
ruleTester.addTestGroup('strings-templates', 'should handle the ignoreStrings and ignoreTemplateLiterals options', [
    {
        code: "var foo = veryLongIdentifier;\nvar bar = 'this is a very long string';",
        options: [29, { ignoreStrings: false, ignoreTemplateLiterals: true }],
        errors: expecting([[1, 29]])
    },
    {
        code: "var foo = veryLongIdentifier;\nvar bar = \"this is a very long string\";",
        options: [29, { ignoreStrings: false, ignoreTemplateLiterals: true }],
        errors: expecting([[1, 29]])
    },
    {
        code: 'var foo = veryLongIdentifier;\nvar bar = `this is a very long string`;',
        options: [29, { ignoreStrings: false, ignoreTemplateLiterals: false }],
        errors: expecting([[1, 29]])
    },
    {
        code: (_y = ["\n      var foo = veryLongIdentifier;\n      var bar = `this is a very long string\n      and this is another line that is very long`;"], _y.raw = ["\n      var foo = veryLongIdentifier;\n      var bar = \\`this is a very long string\n      and this is another line that is very long\\`;"], ruleTester_1.dedent(_y)),
        options: [29, { ignoreStrings: false, ignoreTemplateLiterals: false }],
        errors: expecting([
            [2, 29],
            [3, 29]
        ])
    }
]);
ruleTester.runTests();
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyTWF4TGVuUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQ0FBcUU7QUFHckUsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRWpELG1CQUFtQixNQUFzRDtJQUN2RSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDcEIsSUFBSSxPQUFPLEdBQUcsV0FBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyw2Q0FBdUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFHLENBQUM7UUFDakYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sR0FBRyxXQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLHFEQUErQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQztRQUN2RixDQUFDO1FBRUQsTUFBTSxDQUFDO1lBQ0wsT0FBTyxFQUFFLE9BQU87WUFDaEIsYUFBYSxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsNkNBQTZDLEVBQUU7SUFDbkY7UUFDRSxJQUFJLEVBQUUsRUFBRTtLQUNUO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsd0JBQXdCO0tBQy9CO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUNkO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0NBQWtDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDakI7SUFDRDtRQUNFLElBQUksRUFBRSxzQ0FBc0M7UUFDNUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNqQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLDRCQUE0QjtRQUNsQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2pCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsMERBQTBEO1FBQ2hFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDakI7SUFDRDtRQUNFLElBQUksRUFBRSwwREFBMEQ7S0FDakU7SUFDRDtRQUNFLElBQUksRUFBRSxrREFBa0Q7UUFDeEQsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSwwQkFBMEI7UUFDaEMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2IsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2IsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSxvQ0FBb0M7UUFDMUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsa0NBQWtDLEVBQUU7SUFDdEU7UUFDRSxJQUFJLHVUQUFRLGlTQUlULEdBSkcsbUJBQU0sS0FJVDtRQUNILE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxzREFBc0QsRUFBRSxDQUFDO0tBQ3pGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsdURBQXVEO1FBQzdELE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLENBQUM7S0FDcEQ7SUFDRDtRQUNFLElBQUksRUFBRSx1REFBdUQ7UUFDN0QsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3QjtJQUNEO1FBQ0UsSUFBSSw4SkFBUSwwSUFHVCxHQUhHLG1CQUFNLEtBR1Q7UUFDSCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDO1FBQy9DLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsc0NBQXNDLEVBQUU7SUFDekU7UUFDRSxJQUFJLDhTQUFRLHdSQVFQLEdBUkMsbUJBQU0sS0FRUDtRQUNMLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN2QztJQUNEO1FBQ0UsSUFBSSxtTUFBUSw2S0FJUCxHQUpDLG1CQUFNLEtBSVA7UUFDTCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdEMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSx1Q0FBdUMsRUFBRTtJQUN2RTtRQUNFLElBQUksRUFBRSwyREFBMkQ7UUFDakUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN2QztJQUNEO1FBQ0UsSUFBSSxFQUFFLDJEQUEyRDtRQUNqRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsd0JBQXdCLEVBQUU7SUFDNUQ7UUFDRSxJQUFJLEVBQUUsZ0VBQWdFO1FBQ3RFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDM0M7SUFDRDtRQUNFLElBQUksRUFBRSw2REFBNkQ7UUFDbkUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUMxQztJQUNEO1FBQ0UsSUFBSSxFQUFFLHFEQUFxRDtRQUMzRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzNDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsK0JBQStCO0tBQ3RDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsb0VBQW9FO1FBQzFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDM0M7SUFDRDtRQUNFLElBQUksNEtBQVEsc0pBSXFCLEdBSjNCLG1CQUFNLEtBSXFCO1FBQ2pDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDM0M7SUFDRDtRQUNFLElBQUksNkdBQVEsdUZBRW9DLEdBRjFDLG1CQUFNLEtBRW9DO1FBQ2hELE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO0tBQzdDO0lBQ0Q7UUFDRSxJQUFJLHdHQUFRLGtGQUVtQyxHQUZ6QyxtQkFBTSxLQUVtQztRQUMvQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxDQUFDO0tBQ2pGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZ0VBQWdFO1FBQ3RFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNuRCxFQUFFO1FBQ0QsSUFBSSxFQUFFLGdFQUFnRTtRQUN0RSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUMxRTtJQUNEO1FBQ0UsSUFBSSw4RkFBUSx3RUFHUixHQUhFLG1CQUFNLEtBR1I7UUFDSixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO0tBQ25DO0lBQ0Q7UUFDRSxJQUFJLGtHQUFRLDRFQUdSLEdBSEUsbUJBQU0sS0FHUjtRQUNKLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDbkM7SUFDRDtRQUNFLElBQUksMkhBQVEscUdBSVIsR0FKRSxtQkFBTSxLQUlSO1FBQ0osT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQztLQUNuQztJQUNEO1FBQ0UsSUFBSSxtSUFBUSw2R0FJUixHQUpFLG1CQUFNLEtBSVI7UUFDSixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO0tBQ25DO0lBQ0Q7UUFDRSxJQUFJLHFKQUFRLCtIQUlSLEdBSkUsbUJBQU0sS0FJUjtRQUNKLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDbkM7SUFDRDtRQUNFLElBQUkscUpBQVEsK0hBSVIsR0FKRSxtQkFBTSxLQUlSO1FBQ0osT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQztLQUNuQztJQUNEO1FBQ0UsSUFBSSw4RkFBUSx3RUFHUixHQUhFLG1CQUFNLEtBR1I7UUFDSixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNuQztJQUNEO1FBQ0UsSUFBSSxrR0FBUSw0RUFHUixHQUhFLG1CQUFNLEtBR1I7UUFDSixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNuQztJQUNEO1FBQ0UsSUFBSSxzSUFBUSxnSEFJUixHQUpFLG1CQUFNLEtBSVI7UUFDSixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQztZQUNiLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7U0FDZCxDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksOElBQVEsd0hBSVIsR0FKRSxtQkFBTSxLQUlSO1FBQ0osT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNsQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7WUFDYixDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDO1NBQ2QsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLHFKQUFRLCtIQUlSLEdBSkUsbUJBQU0sS0FJUjtRQUNKLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDbEMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDUCxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDO1NBQ2QsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLHFKQUFRLCtIQUlSLEdBSkUsbUJBQU0sS0FJUjtRQUNKLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDbEMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDO1lBQ2IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ1IsQ0FBQztLQUNIO0lBRUQ7UUFDRSxJQUFJLDhJQUFRLHdIQUUwQyxHQUZoRCxtQkFBTSxLQUUwQztRQUN0RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSwwREFBMEQ7UUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEQsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSx1REFBdUQ7UUFDN0QsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGdFQUFnRTtRQUN0RSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCO0lBRUQ7UUFDRSxJQUFJLEVBQUUsbURBQW1EO1FBQ3pELE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDbEMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbURBQW1EO1FBQ3pELE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsMkVBQTJFO1FBQ2pGLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNsRCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3QjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGdEQUFnRCxFQUFFO0lBQ2pGO1FBQ0UsSUFBSSxFQUFFLDBDQUEwQztRQUNoRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDakQ7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLGlDQUFpQyxFQUFFO0lBQzlFO1FBQ0UsSUFBSSxFQUFFLHdFQUF3RTtRQUM5RSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDbkQ7SUFDRDtRQUNFLElBQUksRUFBRSxvSEFBb0g7UUFDMUgsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxDQUFDO0tBQ25EO0lBQ0Q7UUFDRSxJQUFJLHdOQUFRLHNNQUtTLEdBTGYsbUJBQU0sS0FLUztRQUNyQixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDbkQ7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSx1QkFBdUIsRUFBRTtJQUMxRDtRQUNFLElBQUksRUFBRSx3RUFBd0U7UUFDOUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUMxQztJQUNEO1FBQ0UsSUFBSSxFQUFFLDBFQUF3RTtRQUM5RSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzFDO0lBQ0Q7UUFDRSxJQUFJLGdHQUFRLDhFQUVVLEdBRmhCLG1CQUFNLEtBRVU7UUFDdEIsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUMxQztJQUNEO1FBQ0UsSUFBSSxFQUFFLDhIQUE4SDtRQUNwSSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsOERBQThELEVBQUU7SUFDdkc7UUFDRSxJQUFJLEVBQUUsOEVBQThFO1FBQ3BGLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDcEUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSwwRkFBMEY7UUFDaEcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNuRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3QjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsb0VBQW9FLEVBQUU7SUFDakg7UUFDRSxJQUFJLEVBQUUsd0VBQXdFO1FBQzlFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDckUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSwwRUFBMEU7UUFDaEYsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNyRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLHdFQUF3RTtRQUM5RSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3RFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCO0lBQ0Q7UUFDRSxJQUFJLDhKQUFRLDRJQUdvQyxHQUgxQyxtQkFBTSxLQUdvQztRQUNoRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3RFLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ1AsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ1IsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvdGVyTWF4TGVuUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1dvcmsvRGV2ZWxvcG1lbnQvd29ya3NwYWNlL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
