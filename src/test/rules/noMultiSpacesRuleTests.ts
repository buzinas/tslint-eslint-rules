/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { runTest, IScripts } from './helper';

/**
 * Borrowing tests from eslint:
 *    https://github.com/eslint/eslint/blob/master/tests/lib/rules/no-multi-spaces.js
 */
const rule = 'no-multi-spaces';
const scripts: { valid: IScripts, invalid: IScripts } = {
  valid: [
    'var a = 1;',
    'var a=1;',
    'var a = 1, b = 2;',
    'var arr = [1, 2];',
    'var arr = [ (1), (2) ];',
    `var obj = {'a': 1, 'b': (2)};`,
    `var obj = {'a': 1,\n      'b': (2)};`,
    '\t\tvar x = 5,\n\t\t    y = 2;',
    'a, b',
    'a >>> b',
    'a ^ b',
    '(a) | (b)',
    'a & b',
    'a << b',
    'a !== b',
    'a >>>= b',
    'if (a & b) { }',
    'function foo(a,b) {}',
    'function foo(a, b) {}',
    'if ( a === 3 && b === 4) {}',
    'if ( a === 3||b === 4 ) {}',
    'if ( a <= 4) {}',
    'var foo = bar === 1 ? 2: 3',
    '[1, , 3]',
    '[1, ]',
    '[ ( 1 ) , ( 2 ) ]',
    'a = 1, b = 2;',
    '(function(a, b){})',
    'x.in = 0;',
    '(function(a,/* b, */c){})',
    '(function(a,/*b,*/c){})',
    '(function(a, /*b,*/c){})',
    '(function(a,/*b,*/ c){})',
    '(function(a, /*b,*/ c){})',
    '(function(/*a, b, */c){})',
    '(function(/*a, */b, c){})',
    '(function(a, b/*, c*/){})',
    '(function(a, b/*,c*/){})',
    '(function(a, b /*,c*/){})',
    '(function(a/*, b ,c*/){})',
    '(function(a /*, b ,c*/){})',
    '(function(a /*, b        ,c*/){})',
    '/**\n * hello\n * @param {foo} int hi\n *      set.\n * @private\n*/',
    '/**\n * hello\n * @param {foo} int hi\n *      set.\n *      set.\n * @private\n*/',
    'var a,/* b,*/c;',
    'var foo = [1,/* 2,*/3];',
    'var bar = {a: 1,/* b: 2*/c: 3};',
    'var foo = \'hello     world\';',
    'var foo = \'    \';',
    'var foo = `    `;',
    'var foo = "    ";',
    'var foo = "    \'  ";',
    'function foo() {\n    return;\n}',
    'function foo() {\n    if (foo) {\n        return;\n    }\n}',
    'var foo = `hello     world`;',
    '({ a:  b })',
    {
      code: '({ a: b })',
      options: [{ exceptions: { PropertyAssignment: false } }]
    },
    {
      code: 'var  answer = 6 *  7;',
      options: [{ exceptions: { VariableDeclaration: true, BinaryExpression: true } }]
    }
  ],
  invalid: [
    {
      code: 'function foo(a,  b) {}',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'var foo = (a,  b) => {}',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'var a =  1',
      errors: [{
        message: "Multiple spaces found before '1'."
      }]
    },
    {
      code: 'var a = 1,  b = 2;',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'a <<  b',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: "var arr = {'a': 1,   'b': 2};",
      errors: [{
        message: "Multiple spaces found before ''b''."
      }]
    },
    {
      code: 'if (a &  b) { }',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'if ( a === 3  &&  b === 4) {}',
      errors: [{
        message: "Multiple spaces found before '&&'."
      }, {
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'var foo = bar === 1 ?  2:  3',
      errors: [{
        message: "Multiple spaces found before '2'."
      }, {
        message: "Multiple spaces found before '3'."
      }]
    },
    {
      code: 'var a = [1,  2,  3,  4]',
      errors: [{
        message: "Multiple spaces found before '2'."
      }, {
        message: "Multiple spaces found before '3'."
      }, {
        message: "Multiple spaces found before '4'."
      }]
    },
    {
      code: 'var arr = [1,  2];',
      errors: [{
        message: "Multiple spaces found before '2'."
      }]
    },
    {
      code: '[  , 1,  , 3,  ,  ]',
      errors: [{
        message: "Multiple spaces found before ','."
      }, {
        message: "Multiple spaces found before ','."
      }, {
        message: "Multiple spaces found before ','."
      }, {
        message: "Multiple spaces found before ']'."
      }]
    },
    {
      code: 'a >>>  b',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'a = 1,  b =  2;',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }, {
        message: "Multiple spaces found before '2'."
      }]
    },
    {
      code: '(function(a,  b){})',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'function foo(a,  b){}',
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'var o = { fetch: function    () {} };',
      errors: [{
        message: "Multiple spaces found before '('."
      }]
    },
    {
      code: 'var o = { fetch: function    () {} };',
      errors: [{
        message: "Multiple spaces found before '('."
      }]
    },
    {
      code: 'function foo      () {}',
      errors: [{
        message: "Multiple spaces found before '('."
      }]
    },
    {
      code: 'if (foo)      {}',
      errors: [{
        message: "Multiple spaces found before '{'."
      }]
    },
    {
      code: 'function    foo(){}',
      errors: [{
        message: "Multiple spaces found before 'foo'."
      }]
    },
    {
      code: 'if    (foo) {}',
      errors: [{
        message: "Multiple spaces found before '('."
      }]
    },
    {
      code: 'try    {} catch(ex) {}',
      errors: [{
        message: "Multiple spaces found before '{'."
      }]
    },
    {
      code: 'try {} catch    (ex) {}',
      errors: [{
        message: "Multiple spaces found before '('."
      }]
    },
    {
      code: 'var o = { fetch: function    () {} };',
      errors: [{
        message: "Multiple spaces found before '('."
      }]
    },
    {
      code: 'throw  error;',
      errors: [{
        message: "Multiple spaces found before 'error'."
      }]
    },
    {
      code: 'function foo() { return      bar; }',
      errors: [{
        message: "Multiple spaces found before 'bar'."
      }]
    },
    {
      code: 'switch   (a) {default: foo(); break;}',
      errors: [{
        message: "Multiple spaces found before '('."
      }]
    },
    {
      code: 'var  answer = 6 *  7;',
      errors: [{
        message: "Multiple spaces found before 'answer'."
      }, {
        message: "Multiple spaces found before '7'."
      }]
    },
    {
      code: '({ a:  6  * 7 })',
      errors: [{
        message: "Multiple spaces found before '*'."
      }]
    },
    {
      code: '({ a:    (   6    /   4    * 7)   })',
      errors: [{
        message: "Multiple spaces found before '6'."
      }, {
        message: "Multiple spaces found before '/'."
      }, {
        message: "Multiple spaces found before '4'."
      }, {
        message: "Multiple spaces found before '*'."
      }, {
        message: "Multiple spaces found before '}'."
      }]
    },
    {
      code: '({ a:    (   6    /   4    * 7)   })',
      options: [{ exceptions: { PropertyAssignment: false } }],
      errors: [{
        message: "Multiple spaces found before '('."
      }, {
        message: "Multiple spaces found before '6'."
      }, {
        message: "Multiple spaces found before '/'."
      }, {
        message: "Multiple spaces found before '4'."
      }, {
        message: "Multiple spaces found before '*'."
      }, {
        message: "Multiple spaces found before '}'."
      }]
    },
    {
      code: '({ a:   b })',
      options: [{ exceptions: { PropertyAssignment: false } }],
      errors: [{
        message: "Multiple spaces found before 'b'."
      }]
    },
    {
      code: 'var foo = { bar: function() { return 1    + 2; } };',
      errors: [{
        message: "Multiple spaces found before '+'."
      }]
    },
    {
      code: '\t\tvar x = 5,\n\t\t    y =  2;',
      errors: [{
        message: "Multiple spaces found before '2'."
      }]
    },
    {
      code: 'var x =\t  5;',
      errors: [{
        message: "Multiple spaces found before '5'."
      }]
    }
  ]
};

describe(rule, () => {

  it('should pass when avoiding unnecessary spaces', () => {
    runTest(rule, scripts.valid);
  });

  it('should fail when using multiple spaces', () => {
    runTest(rule, scripts.invalid);
  });

});
