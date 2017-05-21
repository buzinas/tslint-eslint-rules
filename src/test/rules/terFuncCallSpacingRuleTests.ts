import { RuleTester, Failure, Position, dedent } from './ruleTester';

const MISSING_SPACE = 'Missing space between function name and paren.';
const UNEXPECTED_SPACE = 'Unexpected space between function name and paren.';
const UNEXPECTED_NEWLINE = 'Unexpected newline between function name and paren.';

const ruleTester = new RuleTester('ter-func-call-spacing');

function expecting(errors: [number, number, string][]): Failure[] {
  return errors.map((err) => {
    return {
      failure: err[2],
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('default-to-never', 'should pass with default option of "never"', [
  'f();',
  'f(a, b);',
  'f.b();',
  'f.b().c();',
  'f()()',
  '(function() {}())',
  'var f = new Foo()',
  'var f = new Foo',
  'f( (0) )',
  '( f )( 0 )',
  '( (f) )( (0) )',
  '( f()() )(0)',
  '(function(){ if (foo) { bar(); } }());',
  'f(0, (1))',
  "describe/**/('foo', function () {});",
  'new (foo())',
  'new Foo<Bar>()'
]);

ruleTester.addTestGroupWithConfig('specify-as-never', 'should pass when specifying "never"', ['never'], [
  'f();',
  'f(a, b);',
  'f.b();',
  'f.b().c();',
  'f()()',
  '(function() {}())',
  'var f = new Foo()',
  'var f = new Foo',
  'f( (0) )',
  '( f )( 0 )',
  '( (f) )( (0) )',
  '( f()() )(0)',
  '(function(){ if (foo) { bar(); } }());',
  'f(0, (1))',
  "describe/**/('foo', function () {});",
  'new (foo())',
  'new Foo<Bar>()'
]);

ruleTester.addTestGroupWithConfig('specify-as-always', 'should pass when specifying "always"', ['always'], [
  'f ();',
  'f (a, b);',
  'f.b ();',
  'f.b ().c ();',
  'f () ()',
  '(function() {} ())',
  'var f = new Foo ()',
  'var f = new Foo',
  'f ( (0) )',
  'f (0) (1)',
  '(f) (0)',
  'f ();\n t   ();',
  'foo<Bar> ()',
  'new Foo<Bar> ()'
]);

ruleTester.addTestGroupWithConfig('allow-new-lines', 'should pass when allowing new lines', ['always', { allowNewlines: true }], [
  'f\n();',
  'f.b \n ();',
  'f\n() ().b \n()\n ()',
  'var f = new Foo\n();',
  'f// comment\n()',
  'f // comment\n ()',
  'f// comment\n()',
  'f\n/*\n*/\n()',
  'f\r();',
  'f\u2028();',
  'f\u2029();',
  'f\r\n();',
  'foo<Bar> ()',
  'new Foo<Bar>\n()'
]);

ruleTester.addTestGroup('fix-default', 'should remove spaces with default config', [
  {
    code: 'f ();',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE]
    ]),
    output: 'f();'
  },
  {
    code: 'f (a, b);',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE]
    ]),
    output: 'f(a, b);'
  },
  {
    code: 'f.b ();',
    errors: expecting([
      [0, 3, UNEXPECTED_SPACE]
    ]),
    output: 'f.b();'
  },
  {
    code: 'f.b().c ();',
    errors: expecting([
      [0, 7, UNEXPECTED_SPACE]
    ]),
    output: 'f.b().c();'
  },
  {
    code: 'f() ()',
    errors: expecting([
      [0, 3, UNEXPECTED_SPACE]
    ]),
    output: 'f()()'
  },
  {
    code: '(function() {} ())',
    errors: expecting([
      [0, 14, UNEXPECTED_SPACE]
    ]),
    output: '(function() {}())'
  },
  {
    code: 'var f = new Foo ()',
    errors: expecting([
      [0, 15, UNEXPECTED_SPACE]
    ]),
    output: 'var f = new Foo()'
  },
  {
    code: 'f ( (0) )',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE]
    ]),
    output: 'f( (0) )'
  },
  {
    code: 'f(0) (1)',
    errors: expecting([
      [0, 4, UNEXPECTED_SPACE]
    ]),
    output: 'f(0)(1)'
  },
  {
    code: '(f) (0)',
    errors: expecting([
      [0, 3, UNEXPECTED_SPACE]
    ]),
    output: '(f)(0)'
  },
  {
    code: 'f ();\n t   ();',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE],
      [1, 2, UNEXPECTED_SPACE]
    ]),
    output: 'f();\n t();'
  },
  {
    code: 'foo<Bar> ()',
    errors: expecting([
      [0, 8, UNEXPECTED_SPACE]
    ]),
    output: 'foo<Bar>()'
  },
  {
    code: 'new Foo<Bar> ()',
    errors: expecting([
      [0, 12, UNEXPECTED_SPACE]
    ]),
    output: 'new Foo<Bar>()'
  }
]);

ruleTester.addTestGroupWithConfig('fix-never', 'should remove spaces when configured as "never"', ['never'], [
  {
    code: 'f ();',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE]
    ]),
    output: 'f();'
  },
  {
    code: 'f (a, b);',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE]
    ]),
    output: 'f(a, b);'
  },
  {
    code: 'f.b ();',
    errors: expecting([
      [0, 3, UNEXPECTED_SPACE]
    ]),
    output: 'f.b();'
  },
  {
    code: 'f.b().c ();',
    errors: expecting([
      [0, 7, UNEXPECTED_SPACE]
    ]),
    output: 'f.b().c();'
  },
  {
    code: 'f() ()',
    errors: expecting([
      [0, 3, UNEXPECTED_SPACE]
    ]),
    output: 'f()()'
  },
  {
    code: '(function() {} ())',
    errors: expecting([
      [0, 14, UNEXPECTED_SPACE]
    ]),
    output: '(function() {}())'
  },
  {
    code: 'var f = new Foo ()',
    errors: expecting([
      [0, 15, UNEXPECTED_SPACE]
    ]),
    output: 'var f = new Foo()'
  },
  {
    code: 'f ( (0) )',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE]
    ]),
    output: 'f( (0) )'
  },
  {
    code: 'f(0) (1)',
    errors: expecting([
      [0, 4, UNEXPECTED_SPACE]
    ]),
    output: 'f(0)(1)'
  },
  {
    code: '(f) (0)',
    errors: expecting([
      [0, 3, UNEXPECTED_SPACE]
    ]),
    output: '(f)(0)'
  },
  {
    code: 'f ();\n t   ();',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE],
      [1, 2, UNEXPECTED_SPACE]
    ]),
    output: 'f();\n t();'
  },
  {
    code: 'f\n();',
    errors: expecting([
      [0, 1, UNEXPECTED_NEWLINE]
    ]),
    output: 'f();'
  },
  {
    code: dedent`
      this.cancelled.add(request)
      this.decrement(request)
      (0, request.reject)(new api.Cancel())
    `,
    errors: expecting([
      [2, 23, UNEXPECTED_NEWLINE]
    ]),
    output: dedent`
      this.cancelled.add(request)
      this.decrement(request)(0, request.reject)(new api.Cancel())
    `
  },
  {
    code: 'var a = foo\n(function(global) {}(this));',
    errors: expecting([
      [0, 11, UNEXPECTED_NEWLINE]
    ]),
    output: 'var a = foo(function(global) {}(this));'
  },
  {
    code: 'var a = foo\n(0, baz())',
    errors: expecting([
      [0, 11, UNEXPECTED_NEWLINE]
    ]),
    output: 'var a = foo(0, baz())'
  },
  {
    code: 'f\r();',
    errors: expecting([
      [0, 1, UNEXPECTED_NEWLINE]
    ]),
    output: 'f();'
  },
  {
    code: 'f\u2028();',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE]
    ]),
    output: 'f();'
  },
  {
    code: 'f\u2029();',
    errors: expecting([
      [0, 1, UNEXPECTED_SPACE]
    ]),
    output: 'f();'
  },
  {
    code: 'f\r\n();',
    errors: expecting([
      [0, 1, UNEXPECTED_NEWLINE]
    ]),
    output: 'f();'
  },
  {
    code: 'foo<Bar> ()',
    errors: expecting([
      [0, 8, UNEXPECTED_SPACE]
    ]),
    output: 'foo<Bar>()'
  },
  {
    code: 'new Foo<Bar> ()',
    errors: expecting([
      [0, 12, UNEXPECTED_SPACE]
    ]),
    output: 'new Foo<Bar>()'
  }
]);

ruleTester.addTestGroupWithConfig('fix-always', 'should add a space when configured as "always"', ['always'], [
  {
    code: 'f();',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ();'
  },
  {
    code: 'f\n();',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ();'
  },
  {
    code: 'f(a, b);',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f (a, b);'
  },
  {
    code: 'f\n(a, b);',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f (a, b);'
  },
  {
    code: 'f.b();',
    errors: expecting([
      [0, 3, MISSING_SPACE]
    ]),
    output: 'f.b ();'
  },
  {
    code: 'f.b\n();',
    errors: expecting([
      [0, 3, MISSING_SPACE]
    ]),
    output: 'f.b ();'
  },
  {
    code: 'f.b().c ();',
    errors: expecting([
      [0, 3, MISSING_SPACE]
    ]),
    output: 'f.b ().c ();'
  },
  {
    code: 'f.b\n().c ();',
    errors: expecting([
      [0, 3, MISSING_SPACE]
    ]),
    output: 'f.b ().c ();'
  },
  {
    code: 'f() ()',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f () ()'
  },
  {
    code: 'f\n() ()',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f () ()'
  },
  {
    code: 'f\n()()',
    errors: expecting([
      [0, 1, MISSING_SPACE],
      [1, 2, MISSING_SPACE]
    ]),
    output: 'f () ()'
  },
  {
    code: '(function() {}())',
    errors: expecting([
      [0, 14, MISSING_SPACE]
    ]),
    output: '(function() {} ())'
  },
  {
    code: 'var f = new Foo()',
    errors: expecting([
      [0, 15, MISSING_SPACE]
    ]),
    output: 'var f = new Foo ()'
  },
  {
    code: 'f( (0) )',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ( (0) )'
  },
  {
    code: 'f(0) (1)',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f (0) (1)'
  },
  {
    code: '(f)(0)',
    errors: expecting([
      [0, 3, MISSING_SPACE]
    ]),
    output: '(f) (0)'
  },
  {
    code: 'f();\n t();',
    errors: expecting([
      [0, 1, MISSING_SPACE],
      [1, 2, MISSING_SPACE]
    ]),
    output: 'f ();\n t ();'
  },
  {
    code: 'f\r();',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ();'
  },
  {
    code: 'f\u2028();',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ();'
  },
  {
    code: 'f\u2029();',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ();'
  },
  {
    code: 'f\r\n();',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ();'
  },
  {
    code: 'foo<Bar>()',
    errors: expecting([
      [0, 8, MISSING_SPACE]
    ]),
    output: 'foo<Bar> ()'
  },
  {
    code: 'new Foo<Bar>()',
    errors: expecting([
      [0, 12, MISSING_SPACE]
    ]),
    output: 'new Foo<Bar> ()'
  }
]);

ruleTester.addTestGroupWithConfig('fix-new-lines', 'should add a space when configured as "always" with new lines', ['always', { allowNewLines: true }], [
  {
    code: 'f();',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ();'
  },
  {
    code: 'f(a, b);',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f (a, b);'
  },
  {
    code: 'f.b();',
    errors: expecting([
      [0, 3, MISSING_SPACE]
    ]),
    output: 'f.b ();'
  },
  {
    code: 'f.b().c ();',
    errors: expecting([
      [0, 3, MISSING_SPACE]
    ]),
    output: 'f.b ().c ();'
  },
  {
    code: 'f() ()',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f () ()'
  },
  {
    code: '(function() {}())',
    errors: expecting([
      [0, 14, MISSING_SPACE]
    ]),
    output: '(function() {} ())'
  },
  {
    code: 'var f = new Foo()',
    errors: expecting([
      [0, 15, MISSING_SPACE]
    ]),
    output: 'var f = new Foo ()'
  },
  {
    code: 'f( (0) )',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f ( (0) )'
  },
  {
    code: 'f(0) (1)',
    errors: expecting([
      [0, 1, MISSING_SPACE]
    ]),
    output: 'f (0) (1)'
  },
  {
    code: '(f)(0)',
    errors: expecting([
      [0, 3, MISSING_SPACE]
    ]),
    output: '(f) (0)'
  },
  {
    code: 'f();\n t();',
    errors: expecting([
      [0, 1, MISSING_SPACE],
      [1, 2, MISSING_SPACE]
    ]),
    output: 'f ();\n t ();'
  },
  {
    code: 'foo<Bar>()',
    errors: expecting([
      [0, 8, MISSING_SPACE]
    ]),
    output: 'foo<Bar> ()'
  },
  {
    code: 'new Foo<Bar>()',
    errors: expecting([
      [0, 12, MISSING_SPACE]
    ]),
    output: 'new Foo<Bar> ()'
  }
]);

ruleTester.runTests();
