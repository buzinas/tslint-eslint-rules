import { RuleTester, IFailure, Position, dedent } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/tests/lib/rules/max-len.js

const ruleTester = new RuleTester('ter-max-len');

function expecting(errors: [[number, number] | [number, number, boolean]]): IFailure[] {
  return errors.map((err) => {
    let message = `Line ${err[0] + 1} exceeds the maximum line length of ${err[1]}.`;
    if (err[2]) {
      message = `Line ${err[0] + 1} exceeds the maximum comment line length of ${err[1]}.`;
    }

    return {
      failure: message,
      startPosition: new Position(err[0]),
      endPosition: new Position()
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
    code: dedent`
      var dep = require('really/really/really/really/really/really/really/long/module');
      const dep = require('another/really/really/really/really/really/really/long/module');
                       foobar = 'this line will be ignored because it starts with foobar ...';
      `,
    options: [50, { ignorePattern: '^\\s*(var|const)\\s.+=\\s*require\\s*\\(|^\\s*foobar' }]
  },
  {
    code: `foo(bar(bazz('this is a long'), 'line of'), 'stuff');`,
    options: [40, 4, { ignorePattern: 'foo.+bazz\\(' }]
  },
  {
    code: `foo(bar(bazz('this is a long'), 'line of'), 'stuff');`,
    options: [40, 4],  // ignorePattern is disabled
    errors: expecting([[0, 40]])
  },
  {
    code: dedent`
      var foobar = 'this line isn\\'t matched by the regexp';
      var fizzbuzz = 'but this one is matched by the regexp';
      `,
    options: [20, 4, { ignorePattern: 'fizzbuzz' }],
    errors: expecting([[1, 20]])
  }
]);

ruleTester.addTestGroup('imports', 'should ignore long module specifiers', [
  {
    code: dedent`
        import { obj1, obj2, obj3, obj4 } from 'my-favorite-module/with/lots/of/deep/nested/modules';
        import {
            obj1,
            obj2,
            obj3,
            obj4,
        } from 'my-favorite-module/with/lots/of/deep/nested/modules';
        `,
    options: [50, { ignoreImports: true }]
  },
  {
    code: dedent`
        import {
          obj1, obj2, obj3, obj4, just, trying, to, be, a, rebel, here
        } from 'my-favorite-module/with/lots/of/deep/nested/modules';
        `,
    options: [50, { ignoreImports: true }],
    errors: expecting([[2, 50]])
  }
]);

ruleTester.addTestGroup('urls', 'should ignore lines that contain urls', [
  {
    code: `foo('http://example.com/this/is/?a=longish&url=in#here');`,
    options: [40, 4, { ignoreUrls: true }]
  },
  {
    code: `foo('http://example.com/this/is/?a=longish&url=in#here');`,
    options: [40, 4],  // ignoreUrls is disabled
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
    code: dedent`
      /* hey there! this is a multiline
         comment with longish lines in various places
         but
         with a short line-length */`,
    options: [10, 4, { ignoreComments: true }]
  },
  {
    code: dedent`
      // I like short comments
      function butLongSourceLines() { weird(eh()) }`,
    options: [80, {tabWidth: 4, comments: 30}]
  },
  {
    code: dedent`
      // Full line comment
      someCode(); // With a long trailing comment.`,
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
    code: dedent`
      function foo() {
      //this line has 29 characters
      }`,
    options: [40, 4, { comments: 29 }]
  },
  {
    code: dedent`
      function foo() {
          //this line has 33 characters
      }`,
    options: [40, 4, { comments: 33 }]
  },
  {
    code: dedent`
      function foo() {
      /*this line has 29 characters
      and this one has 21*/
      }`,
    options: [40, 4, { comments: 29 }]
  },
  {
    code: dedent`
      function foo() {
          /*this line has 33 characters
          and this one has 25*/
      }`,
    options: [40, 4, { comments: 33 }]
  },
  {
    code: dedent`
      function foo() {
          var a; /*this line has 40 characters
          and this one has 36 characters*/
      }`,
    options: [40, 4, { comments: 36 }]
  },
  {
    code: dedent`
      function foo() {
          /*this line has 33 characters
          and this one has 43 characters*/ var a;
      }`,
    options: [43, 4, { comments: 33 }]
  },
  {
    code: dedent`
      function foo() {
      //this line has 29 characters
      }`,
    options: [40, 4, { comments: 28 }],
    errors: expecting([[2, 28, true]])
  },
  {
    code: dedent`
      function foo() {
          //this line has 33 characters
      }`,
    options: [40, 4, { comments: 32 }],
    errors: expecting([[2, 32, true]])
  },
  {
    code: dedent`
      function foo() {
      /*this line has 29 characters
      and this one has 32 characters*/
      }`,
    options: [40, 4, { comments: 28 }],
    errors: expecting([
      [2, 28, true],
      [3, 28, true]
    ])
  },
  {
    code: dedent`
      function foo() {
          /*this line has 33 characters
          and this one has 36 characters*/
      }`,
    options: [40, 4, { comments: 32 }],
    errors: expecting([
      [2, 32, true],
      [3, 32, true]
    ])
  },
  {
    code: dedent`
      function foo() {
          var a; /*this line has 40 characters
          and this one has 36 characters*/
      }`,
    options: [39, 4, { comments: 35 }],
    errors: expecting([
      [2, 39],
      [3, 35, true]
    ])
  },
  {
    code: dedent`
      function foo() {
          /*this line has 33 characters
          and this one has 43 characters*/ var a;
      }`,
    options: [42, 4, { comments: 32 }],
    errors: expecting([
      [2, 32, true],
      [3, 42]
    ])
  },
  // check comments with the same length as non-comments - https://github.com/eslint/eslint/issues/6564
  {
    code: dedent`
      // This commented line has precisely 51 characters.
      var x = 'This line also has exactly 51 characters';`,
    options: [20, { ignoreComments: true }],
    errors: expecting([[2, 20]])
  },
  {
    code: 'var /*this is a long non-removed inline comment*/ i = 1;',
    options: [20, { tabWidth: 4, ignoreComments: true }],
    errors: expecting([[0, 20]])
  },
  {
    code: `var longLine = 'will trigger'; // even with a comment`,
    options: [10, 4, { ignoreComments: true }],
    errors: expecting([[0, 10]])
  },
  {
    code: `var foo = module.exports = {}; // really long trailing comment`,
    options: [40, 4],  // ignoreComments is disabled
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
    code: dedent`
        var foo = veryLongIdentifier;
        var bar = \`this is a very long string
        and this is another line that is very long
        and here is another
         and another!\`;`,
    options: [29, 4, { ignoreTemplateLiterals: true }]
  }
]);

ruleTester.addTestGroup('strings', 'should ignore strings', [
  {
    code: `var foo = veryLongIdentifier;\nvar bar = 'this is a very long string';`,
    options: [29, 4, { ignoreStrings: true }]
  },
  {
    code: `var foo = veryLongIdentifier;\nvar bar = "this is a very long string";`,
    options: [29, 4, { ignoreStrings: true }]
  },
  {
    code: dedent`
      var str = "this is a very long string\
      with continuation";`,
    options: [29, 4, { ignoreStrings: true }]
  },
  {
    code: 'var str = \"this is a very long string\\\nwith continuation\\\nand with another very very long continuation\\\nand ending\";',
    options: [29, 4, { ignoreStrings: true }]
  }
]);

ruleTester.addTestGroup('strings-regex', 'should handle ignoreStrings and ignoreRegExpLiterals options', [
  {
    code: `var foo = veryLongIdentifier;\nvar bar = /this is a very very long pattern/;`,
    options: [29, { ignoreStrings: false, ignoreRegExpLiterals: false }],
    errors: expecting([[1, 29]])
  },
  {
    code: `var foo = veryLongIdentifier;\nvar bar = new RegExp('this is a very very long pattern');`,
    options: [29, { ignoreStrings: false, ignoreRegExpLiterals: true }],
    errors: expecting([[1, 29]])
  }
]);

ruleTester.addTestGroup('strings-templates', 'should handle the ignoreStrings and ignoreTemplateLiterals options', [
  {
    code: `var foo = veryLongIdentifier;\nvar bar = 'this is a very long string';`,
    options: [29, { ignoreStrings: false, ignoreTemplateLiterals: true }],
    errors: expecting([[1, 29]])
  },
  {
    code: `var foo = veryLongIdentifier;\nvar bar = \"this is a very long string\";`,
    options: [29, { ignoreStrings: false, ignoreTemplateLiterals: true }],
    errors: expecting([[1, 29]])
  },
  {
    code: 'var foo = veryLongIdentifier;\nvar bar = `this is a very long string`;',
    options: [29, { ignoreStrings: false, ignoreTemplateLiterals: false }],
    errors: expecting([[1, 29]])
  },
  {
    code: dedent`
      var foo = veryLongIdentifier;
      var bar = \`this is a very long string
      and this is another line that is very long\`;`,
    options: [29, { ignoreStrings: false, ignoreTemplateLiterals: false }],
    errors: expecting([
      [2, 29],
      [3, 29]
    ])
  }
]);

ruleTester.runTests();
