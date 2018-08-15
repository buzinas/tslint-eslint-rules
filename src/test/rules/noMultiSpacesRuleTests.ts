import { RuleTester, Failure, Position } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/tests/lib/rules/no-multi-spaces.js

const ruleTester = new RuleTester('no-multi-spaces');

function expecting(errors: string[]): Failure[] {
  return errors.map((token) => {
    return {
      failure: `Multiple spaces found before '${token}'.`,
      startPosition: new Position(),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass when avoiding unnecessary spaces', [
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
  "message += type === 'ERROR' ? `${chalk.bgRed('ERROR')}  ` : ''",
  "message += type === 'ERROR' ? `  ${chalk.bgRed('ERROR')}` : ''",
  "message += type === 'ERROR' ? `${chalk.bgRed('ERROR')}  and  ${x}` : ''"
]);

ruleTester.addTestGroup('invalid', 'should fail when using multiple spaces', [
  {
    code: 'function foo(a,  b) {}',
    errors: expecting(['b'])
  },
  {
    code: 'var foo = (a,  b) => {}',
    errors: expecting(['b'])
  },
  {
    code: 'var a =  1',
    errors: expecting(['1'])
  },
  {
    code: 'var a = 1,  b = 2;',
    errors: expecting(['b'])
  },
  {
    code: 'a <<  b',
    errors: expecting(['b'])
  },
  {
    code: "var arr = {'a': 1,   'b': 2};",
    errors: expecting([`'b'`])
  },
  {
    code: 'if (a &  b) { }',
    errors: expecting(['b'])
  },
  {
    code: 'if ( a === 3  &&  b === 4) {}',
    errors: expecting(['&&', 'b'])
  },
  {
    code: 'var foo = bar === 1 ?  2:  3',
    errors: expecting(['2', '3'])
  },
  {
    code: 'var a = [1,  2,  3,  4]',
    errors: expecting(['2', '3', '4'])
  },
  {
    code: 'var arr = [1,  2];',
    errors: expecting(['2'])
  },
  {
    code: '[  , 1,  , 3,  ,  ]',
    errors: expecting([',', ',', ',', ']'])
  },
  {
    code: 'a >>>  b',
    errors: expecting(['b'])
  },
  {
    code: 'a = 1,  b =  2;',
    errors: expecting(['b', '2'])
  },
  {
    code: '(function(a,  b){})',
    errors: expecting(['b'])
  },
  {
    code: 'function foo(a,  b){}',
    errors: expecting(['b'])
  },
  {
    code: 'var o = { fetch: function    () {} };',
    errors: expecting(['('])
  },
  {
    code: 'function foo      () {}',
    errors: expecting(['('])
  },
  {
    code: 'if (foo)      {}',
    errors: expecting(['{'])
  },
  {
    code: 'function    foo(){}',
    errors: expecting(['foo'])
  },
  {
    code: 'if    (foo) {}',
    errors: expecting(['('])
  },
  {
    code: 'try    {} catch(ex) {}',
    errors: expecting(['{'])
  },
  {
    code: 'try {} catch    (ex) {}',
    errors: expecting(['('])
  },
  {
    code: 'var o = { fetch: function    () {} };',
    errors: expecting(['('])
  },
  {
    code: 'throw  error;',
    errors: expecting(['error'])
  },
  {
    code: 'function foo() { return      bar; }',
    errors: expecting(['bar'])
  },
  {
    code: 'switch   (a) {default: foo(); break;}',
    errors: expecting(['('])
  },
  {
    code: 'var  answer = 6 *  7;',
    errors: expecting(['answer', '7'])
  },
  {
    code: '({ a:  6  * 7 })',
    errors: expecting(['*'])
  },
  {
    code: '({ a:    (   6    /   4    * 7)   })',
    errors: expecting(['6', '/', '4', '*', '}'])
  },
  {
    code: 'var foo = { bar: function() { return 1    + 2; } };',
    errors: expecting(['+'])
  },
  {
    code: '\t\tvar x = 5,\n\t\t    y =  2;',
    errors: expecting(['2'])
  },
  {
    code: 'var x =\t  5;',
    errors: expecting(['5'])
  }
]);

ruleTester.addTestGroup('property-assignment', 'should report error when PropertyAssignment exception is off', [
  {
    code: '({ a: b })',
    options: [{ exceptions: { PropertyAssignment: false } }]
  },
  {
    code: '({ a:    (   6    /   4    * 7)   })',
    options: [{ exceptions: { PropertyAssignment: false } }],
    errors: expecting(['(', '6', '/', '4', '*', '}'])
  },
  {
    code: '({ a:   b })',
    options: [{ exceptions: { PropertyAssignment: false } }],
    errors: expecting(['b'])
  }
]);

ruleTester.addTestGroup('exceptions', 'should not report when exceptions are turn on', [
  {
    code: 'var  answer = 6 *  7;',
    options: [{ exceptions: { VariableDeclaration: true, BinaryExpression: true } }]
  }
]);

ruleTester.runTests();
