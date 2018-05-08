import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('space-in-parens', true);
const MISSING_SPACE_ERROR = 'there must be a space inside this paren.';
const REJECTED_SPACE_ERROR = 'there should be no spaces inside this paren.';

function expecting(errors: { message: string; line: number; column: number }[]): Failure[] {
  return errors.map((err) => {
    if (err.message && err.column) {
      return {
        failure: err.message,
        startPosition: new Position(err.line, err.column),
        endPosition: new Position(err.line, err.column)
      };
    }
    return {
      failure: err.message,
      startPosition: new Position(),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid-function-calls', 'should pass for valid function calls', [
  { code: 'foo()', options: ['always'] },
  { code: 'foo\n(\nbar\n)\n', options: ['always'] },
  { code: 'foo\n(  \nbar\n )\n', options: ['always'] },
  { code: 'foo\n(\n bar  \n)\n', options: ['always'] },
  { code: 'foo\n( \n  bar \n  )\n', options: ['always'] },
  { code: 'foo\n(\t\nbar\n)', options: ['always'] },
  { code: '\tfoo(\n\t\tbar\n\t)', options: ['always'] },
  { code: '\tfoo\n(\t\n\t\tbar\t\n\t)', options: ['always'] },
  { code: 'foo()', options: [] },
  { code: 'foo(bar)', options: ['never'] },
  { code: 'foo(bar)\n', options: ['never'] },
  { code: '\tfoo(bar)', options: ['never'] },
  { code: 'foo(bar)\t', options: ['never'] },
  { code: 'foo()' },
  { code: 'foo(bar)' },
  { code: 'foo(bar)\n' },
  { code: '\tfoo(bar)' },
  { code: 'foo(bar)\t' }
]);
ruleTester.addTestGroup('valid-expressions', 'should pass for valid expressions', [
  { code: 'var x = ( 1 + 2 ) * 3', options: ['always'] },
  { code: 'var x = `foo(bar)`', options: ['always'] },
  { code: 'var x = "bar( baz )"', options: ['always'] },
  { code: 'var foo = `(bar)`;', options: ['always'] },
  { code: 'var foo = `(bar ${baz})`;', options: ['always'] },
  { code: 'var foo = `(bar ${( 1 + 2 )})`;', options: ['always'] },
  { code: 'new MyClass( somethimg )', options: ['always'] },
  { code: 'bar()', options: ['never'] },
  { code: 'bar(baz)', options: ['never'] },
  { code: 'var x = (4 + 5) * 6', options: ['never'] },
  { code: 'foo\n(\nbar\n)\n', options: ['never'] },
  { code: 'foo\n(  \nbar\n )\n', options: ['never'] },
  { code: 'foo\n(\n bar  \n)\n', options: ['never'] },
  { code: 'foo\n( \n  bar \n  )\n', options: ['never'] },
  { code: 'var foo = `( bar )`;', options: ['never'] },
  { code: 'var foo = `( bar ${baz} )`;', options: ['never'] },
  { code: 'var foo = `(bar ${(1 + 2)})`;', options: ['never'] },
  { code: 'new MyClass(somethimg)', options: ['never'] },
  { code: 'bar()' },
  { code: 'bar(baz)' },
  { code: 'var x = (4 + 5) * 6' },
  { code: 'foo\n(\nbar\n)\n' },
  { code: 'foo\n(  \nbar\n )\n' },
  { code: 'foo\n(\n bar  \n)\n' },
  { code: 'foo\n( \n  bar \n  )\n' },
  { code: 'var foo = `( bar )`;' },
  { code: 'var foo = `( bar ${baz} )`;' },
  { code: 'var foo = `(bar ${(1 + 2)})`;' },
  { code: 'new MyClass(somethimg)' }
]);
ruleTester.addTestGroup('valid-conditions-and-loops', 'should pass for valid conditions and loops', [
  { code: 'if ( true ) {}', options: ['always'] },
  { code: 'if (true) {}', options: ['never'] },
  { code: 'if (true) {}' },
  { code: 'while ( true ) {}', options: ['always'] },
  { code: 'while (true) {}', options: ['never'] },
  { code: 'while (true) {}' },
  { code: 'for ( let i=0; i<100; i++ ) {}', options: ['always'] },
  { code: 'for (let i=0; i<100; i++) {}', options: ['never'] },
  { code: 'for (let i=0; i<100; i++) {}' },
  { code: 'for ( let i in foo ) {}', options: ['always'] },
  { code: 'for (let i in foo) {}', options: ['never'] },
  { code: 'for (let i in foo) {}' },
  { code: 'for ( let i of foo ) {}', options: ['always'] },
  { code: 'for (let i of foo) {}', options: ['never'] },
  { code: 'for (let i of foo) {}' }
]);
ruleTester.addTestGroup('valid-classes', 'should pass for valid classes', [
  { code: 'class Test { foo( bar:string, asdsd:number, asd:any ) : void {} }', options: ['always'] },
  { code: 'class Test { foo(bar:string, asdsd:number, asd:any) : void {} }', options: ['never'] },
  { code: 'class Test { foo(bar:string, asdsd:number, asd:any) : void {} }' },
  { code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }', options: ['always'] },
  { code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }', options: ['never'] },
  { code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }' }
]);
ruleTester.addTestGroup('valid-function-declarations', 'should pass for valid function declarations', [
  { code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}', options: ['always'] },
  { code: 'function foo(bar:string, asdsd:number, asd:any) : void {}', options: ['never'] },
  { code: 'function foo(bar:string, asdsd:number, asd:any) : void {}' },
  { code: 'function ( bar:string, asdsd:number, asd:any ) : void {}', options: ['always'] },
  { code: 'function (bar:string, asdsd:number, asd:any) : void {}', options: ['never'] },
  { code: 'function (bar:string, asdsd:number, asd:any) : void {}' }
]);
ruleTester.addTestGroup('valid-constructors', 'should pass for valid constructors', [
  { code: 'constructor( bar:string, asdsd:number, asd:any ){}', options: ['always'] },
  { code: 'constructor(bar:string, asdsd:number, asd:any){}', options: ['never'] },
  { code: 'constructor(bar:string, asdsd:number, asd:any){}' }
]);
ruleTester.addTestGroup('valid-exceptions', 'should pass for valid exceptions', [
  { code: 'foo({ bar: "baz" })', options: ['always', { exceptions: ['{}'] }] },
  { code: 'foo( { bar: "baz" } )', options: ['always', { exceptions: ['[]', '()'] }] },
  { code: 'foo( 1, { bar: "baz" })', options: ['always', { exceptions: ['{}'] }] },
  { code: 'foo({ bar: "baz" }, 1 )', options: ['always', { exceptions: ['{}'] }] },
  { code: 'foo({\nbar: "baz",\nbaz: "bar"\n})', options: ['always', { exceptions: ['{}'] }] },
  { code: 'foo({ bar: "baz" })', options: ['never', { exceptions: ['[]', '()'] }] },
  { code: 'foo( { bar: "baz" } )', options: ['never', { exceptions: ['{}'] }] },
  { code: 'foo(1, { bar: "baz" } )', options: ['never', { exceptions: ['{}'] }] },
  { code: 'foo( { bar: "baz" }, 1)', options: ['never', { exceptions: ['{}'] }] },
  { code: 'foo( {\nbar: "baz",\nbaz: "bar"\n} )', options: ['never', { exceptions: ['{}'] }] },

  { code: 'foo([ 1, 2 ])', options: ['always', { exceptions: ['[]'] }] },
  { code: 'foo( [ 1, 2 ] )', options: ['always', { exceptions: ['{}'] }] },
  { code: 'foo( 1, [ 1, 2 ])', options: ['always', { exceptions: ['[]'] }] },
  { code: 'foo([ 1, 2 ], 1 )', options: ['always', { exceptions: ['[]'] }] },
  { code: 'foo([\n1,\n2\n])', options: ['always', { exceptions: ['[]'] }] },
  { code: 'foo([ 1, 2 ])', options: ['never', { exceptions: ['{}'] }] },
  { code: 'foo( [ 1, 2 ] )', options: ['never', { exceptions: ['[]'] }] },
  { code: 'foo(1, [ 1, 2 ] )', options: ['never', { exceptions: ['[]'] }] },
  { code: 'foo( [ 1, 2 ], 1)', options: ['never', { exceptions: ['[]'] }] },
  { code: 'foo( [\n1,\n2\n] )', options: ['never', { exceptions: ['[]'] }] },

  { code: 'foo(( 1 + 2 ))', options: ['always', { exceptions: ['()'] }] },
  { code: 'foo( ( 1 + 2 ) )', options: ['always', { exceptions: ['{}'] }] },
  { code: 'foo( 1 / ( 1 + 2 ))', options: ['always', { exceptions: ['()'] }] },
  { code: 'foo(( 1 + 2 ) / 1 )', options: ['always', { exceptions: ['()'] }] },
  { code: 'foo((\n1 + 2\n))', options: ['always', { exceptions: ['()'] }] },
  { code: 'foo((1 + 2))', options: ['never', { exceptions: ['{}'] }] },
  { code: 'foo( (1 + 2) )', options: ['never', { exceptions: ['()'] }] },
  { code: 'foo(1 / (1 + 2) )', options: ['never', { exceptions: ['()'] }] },
  { code: 'foo( (1 + 2) / 1)', options: ['never', { exceptions: ['()'] }] },
  { code: 'foo( (\n1 + 2\n) )', options: ['never', { exceptions: ['()'] }] },

  { code: 'foo()', options: ['always', { exceptions: ['empty'] }] },
  { code: 'foo( )', options: ['always', { exceptions: ['{}'] }] },
  { code: 'foo(\n1 + 2\n)', options: ['always', { exceptions: ['empty'] }] },
  { code: 'foo()', options: ['never', { exceptions: ['{}'] }] },
  { code: 'foo( )', options: ['never', { exceptions: ['empty'] }] },
  { code: 'foo( \n1 + 2\n )', options: ['never', { exceptions: ['empty'] }] },

  { code: 'foo({ bar: "baz" }, [ 1, 2 ])', options: ['always', { exceptions: ['{}', '[]'] }] },
  { code: 'foo({\nbar: "baz"\n}, [\n1,\n2\n])', options: ['always', { exceptions: ['{}', '[]'] }] },
  { code: 'foo(); bar({bar:"baz"}); baz([1,2])', options: ['always', { exceptions: ['{}', '[]', '()'] }] },
  { code: 'foo( { bar: "baz" }, [ 1, 2 ] )', options: ['never', { exceptions: ['{}', '[]'] }] },
  { code: 'foo( {\nbar: "baz"\n}, [\n1,\n2\n] )', options: ['never', { exceptions: ['{}', '[]'] }] },
  { code: 'foo( ); bar( {bar:"baz"} ); baz( [1,2] )', options: ['never', { exceptions: ['{}', '[]', 'empty'] }] },
    // faulty exceptions option
  { code: 'foo( { bar: "baz" } )', options: ['always', { exceptions: [] }] }
]);

ruleTester.addTestGroup('invalid-function-calls', 'should fail when declaring invalid spaces in function calls', [
  {
    code: 'foo( bar)',
    output: 'foo( bar )',
    options: ['always'],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 8 }])
  },
  {
    code: 'foo( bar)',
    output: 'foo(bar)',
    options: ['never'],
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 4 }])
  },
  {
    code: 'foo( bar)',
    output: 'foo(bar)',
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 4 }])
  },
  {
    code: 'foo(bar)',
    output: 'foo( bar )',
    options: ['always'],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 4 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 7 }
    ])
  },
  {
    code: 'foo( bar )',
    output: 'foo(bar)',
    options: ['never'],
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
    ])
  },
  {
    code: 'foo( bar )',
    output: 'foo(bar)',
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
    ])
  },
  {
    code: 'var x = ( 1 + 2) * 3',
    output: 'var x = ( 1 + 2 ) * 3',
    options: ['always'],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 15 }])
  },
  {
    code: 'var x = ( 1 + 2) * 3',
    output: 'var x = (1 + 2) * 3',
    options: ['never'],
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
  },
  {
    code: 'var x = ( 1 + 2) * 3',
    output: 'var x = (1 + 2) * 3',
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
  },
  {
    code: 'var x = (1 + 2 ) * 3',
    output: 'var x = ( 1 + 2 ) * 3',
    options: ['always'],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 9 }])
  },
  {
    code: 'var x = (1 + 2 ) * 3',
    output: 'var x = (1 + 2) * 3',
    options: ['never'],
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
  },
  {
    code: 'var x = (1 + 2 ) * 3',
    output: 'var x = (1 + 2) * 3',
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
  },
  {
    code: 'foo\n(bar\n)\n',
    output: 'foo\n( bar\n)\n',
    options: ['always'],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 1, column: 1 }])
  },
  {
    code: 'foo\n( bar\n)\n',
    output: 'foo\n(bar\n)\n',
    options: ['never'],
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 1, column: 1 }])
  },
  {
    code: 'foo\n( bar\n)\n',
    output: 'foo\n(bar\n)\n',
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 1, column: 1 }])
  },
  {
    code: 'bar(baz )',
    output: 'bar(baz)',
    options: ['never'],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 8 } ])
  },
  {
    code: 'bar(baz )',
    output: 'bar(baz)',
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 8 } ])
  },
  {
    code: 'bar(baz        )',
    output: 'bar(baz)',
    options: ['never'],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 15 } ])
  },
  {
    code: 'bar(baz        )',
    output: 'bar(baz)',
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 15 } ])
  },
  {
    code: 'bar( baz )',
    output: 'bar(baz)',
    options: ['never'],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
    ])
  },
  {
    code: 'bar( baz )',
    output: 'bar(baz)',
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
    ])
  },
  {
    code: 'bar(     baz         )',
    output: 'bar(baz)',
    options: ['never'],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
    ])
  },
  {
    code: 'bar(     baz         )',
    output: 'bar(baz)',
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
    ])
  }
]);
ruleTester.addTestGroup('invalid-expressions', 'should fail when declaring invalid spaces in expressions', [
  {
    code: 'var x = ( 4 + 5) * 6',
    output: 'var x = (4 + 5) * 6',
    options: ['never'],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 9 } ])
  },
  {
    code: 'var x = ( 4 + 5) * 6',
    output: 'var x = (4 + 5) * 6',
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 9 } ])
  },
  {
    code: 'var x = (4 + 5    ) * 6',
    output: 'var x = (4 + 5) * 6',
    options: ['never'],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 18 } ])
  },
  {
    code: 'var x = (4 + 5    ) * 6',
    output: 'var x = (4 + 5) * 6',
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 18 } ])
  },
  {
    code: 'var x = (4 + 5 ) * 6',
    output: 'var x = (4 + 5) * 6',
    options: ['never'],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 15 } ])
  },
  {
    code: 'var x = (4 + 5 ) * 6',
    output: 'var x = (4 + 5) * 6',
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 15 } ])
  }
]);
ruleTester.addTestGroup('invalid-classes', 'should fail when declaring invalid spaces in methods', [
  {
    code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
    output: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
    options: ['never'],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 27 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 62 }
    ])
  },
  {
    code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
    output: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 27 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 62 }
    ])
  },
  {
    code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
    output: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
    options: ['always'],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 27 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 60 }
    ])
  },
  {
    code: 'new MyClass( hey)',
    output: 'new MyClass( hey )',
    options: ['always'],
    errors: expecting([ { message: MISSING_SPACE_ERROR, line: 0, column: 16 } ])
  },
  {
    code: 'new MyClass( hey)',
    output: 'new MyClass(hey)',
    options: ['never'],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 12 } ])
  },
  {
    code: 'new MyClass( hey)',
    output: 'new MyClass(hey)',
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 12 } ])
  },
  {
    code: 'new MyClass(      hey)',
    output: 'new MyClass(hey)',
    options: ['never'],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 12 } ])
  },
  {
    code: 'new MyClass(      hey)',
    output: 'new MyClass(hey)',
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 12 } ])
  }
]);
ruleTester.addTestGroup('invalid-function-declarations', 'should fail when declaring invalid spaces in functions', [
  {
    code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
    output: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
    options: ['never'],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 13 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 48 }
    ])
  },
  {
    code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
    output: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 13 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 48 }
    ])
  },
  {
    code: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
    output: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
    options: ['always'],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 13 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 46 }
    ])
  },
  {
    code: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
    output: 'function (bar:string, asdsd:number, asd:any) : void {}',
    options: ['never'],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 45 }
    ])
  },
  {
    code: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
    output: 'function (bar:string, asdsd:number, asd:any) : void {}',
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 45 }
    ])
  },
  {
    code: 'function (bar:string, asdsd:number, asd:any) : void {}',
    output: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
    options: ['always'],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 10 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 43 }
    ])
  },
  {
    code: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
    output: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
    options: ['never'],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 12 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 47 }
    ])
  },
  {
    code: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
    output: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 12 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 47 }
    ])
  },
  {
    code: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
    output: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
    options: ['always'],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 12 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 45 }
    ])
  }
]);
ruleTester.addTestGroup('invalid-exceptions', 'should fail when declaring invalid spaces', [
  {
    code: 'fooa({ bar: "baz" })',
    output: 'fooa( { bar: "baz" } )',
    options: ['always', { exceptions: ['[]'] }],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 19 }
    ])
  },
  {
    code: 'foob( { bar: "baz" } )',
    output: 'foob({ bar: "baz" })',
    options: ['always', { exceptions: ['{}'] }],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
    ])
  },
  {
    code: 'fooc({ bar: "baz" })',
    output: 'fooc( { bar: "baz" } )',
    options: ['never', { exceptions: ['{}'] }],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 19 }
    ])
  },
  {
    code: 'food( { bar: "baz" } )',
    output: 'food({ bar: "baz" })',
    options: ['never', { exceptions: ['[]'] }],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
    ])
  },
  {
    code: 'foo1( { bar: "baz" })',
    output: 'foo1({ bar: "baz" })',
    options: ['always', { exceptions: ['{}'] }],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 5 } ])
  },
  {
    code: 'foo2( { bar: "baz" })',
    output: 'foo2( { bar: "baz" } )',
    options: ['never', { exceptions: ['{}'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 20 }])
  },
  {
    code: 'foo3({ bar: "baz" } )',
    output: 'foo3({ bar: "baz" })',
    options: ['always', { exceptions: ['{}'] }],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 20 } ])
  },
  {
    code: 'foo4({ bar: "baz" } )',
    output: 'foo4( { bar: "baz" } )',
    options: ['never', { exceptions: ['{}'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 5 }])
  },
  {
    code: 'foo6([ 1, 2 ])',
    output: 'foo6( [ 1, 2 ] )',
    options: ['always', { exceptions: ['empty'] }],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 13 }
    ])
  },
  {
    code: 'foo7( [ 1, 2 ] )',
    output: 'foo7([ 1, 2 ])',
    options: ['always', { exceptions: ['[]'] }],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 15 }
    ])
  },
  {
    code: 'fooq([ 1, 2 ])',
    output: 'fooq( [ 1, 2 ] )',
    options: ['never', { exceptions: ['[]'] }],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 13 }
    ])
  },
  {
    code: 'foow( [ 1, 2 ] )',
    output: 'foow([ 1, 2 ])',
    options: ['never', { exceptions: ['()'] }],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 15 }
    ])
  },
  {
    code: 'fooe([ 1, 2 ] )',
    output: 'fooe([ 1, 2 ])',
    options: ['always', { exceptions: ['[]'] }],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 14 } ])
  },
  {
    code: 'foor([ 1, 2 ] )',
    output: 'foor( [ 1, 2 ] )',
    options: ['never', { exceptions: ['[]'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 5 }])
  },
  {
    code: 'foot( [ 1, 2 ])',
    output: 'foot([ 1, 2 ])',
    options: ['always', { exceptions: ['[]'] }],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 5 } ])
  },
  {
    code: 'fooy( [ 1, 2 ])',
    output: 'fooy( [ 1, 2 ] )',
    options: ['never', { exceptions: ['[]'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 14 }])
  },
  {
    code: '(( 1 + 2 ))',
    output: '( ( 1 + 2 ) )',
    options: ['always', { exceptions: ['[]'] }],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 1 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 10 }
    ])
  },
  {
    code: '( ( 1 + 2 ) )',
    output: '(( 1 + 2 ))',
    options: ['always', { exceptions: ['()'] }],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
    ])
  },
  {
    code: '(( 1 + 2 ))',
    output: '( ( 1 + 2 ) )',
    options: ['always', { exceptions: ['[]'] }],
    errors: expecting([
    { message: MISSING_SPACE_ERROR, line: 0, column: 1 },
    { message: MISSING_SPACE_ERROR, line: 0, column: 10 }
    ])
  },
  {
    code: '( ( 1 + 2 ) )',
    output: '((1 + 2))',
    options: ['never'],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
    ])
  },
  {
    code: '( ( 1 + 2 ) )',
    output: '((1 + 2))',
    errors: expecting([
      { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
      { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
    ])
  },
  {
    code: '( ( 1 + 2 ) )',
    output: '((1 + 2))',
    options: ['never', { exceptions: ['[]'] }],
    errors: expecting([
    { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
    { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
    ])
  },
  {
    code: '( ( 1 + 2 ))',
    output: '(( 1 + 2 ))',
    options: ['always', { exceptions: ['()'] }],
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 1 }])
  },
  {
    code: '( (1 + 2))',
    output: '( (1 + 2) )',
    options: ['never', { exceptions: ['()'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 9 }])
  },
  {
    code: '(( 1 + 2 ) )',
    output: '(( 1 + 2 ))',
    options: ['always', { exceptions: ['()'] }],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 11 } ])
  },
  {
    code: '((1 + 2) )',
    output: '( (1 + 2) )',
    options: ['never', { exceptions: ['()'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 1 }])
  },
  {
    code: 'var result = ( 1 / ( 1 + 2 ) ) + 3',
    output: 'var result = ( 1 / ( 1 + 2 )) + 3',
    options: ['always', { exceptions: ['()'] }],
    errors: expecting([ { message: REJECTED_SPACE_ERROR, line: 0, column: 29 } ])
  },
  {
    code: 'var result = (1 / (1 + 2)) + 3',
    output: 'var result = (1 / (1 + 2) ) + 3',
    options: ['never', { exceptions: ['()'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 25 }])
  },
  {
    code: 'var result = ( 1 / ( 1 + 2)) + 3',
    output: 'var result = ( 1 / ( 1 + 2 )) + 3',
    options: ['always', { exceptions: ['()'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 26 }])
  },
  {
    code: 'var result = (1 / (1 + 2)) + 3',
    output: 'var result = (1 / (1 + 2) ) + 3',
    options: ['never', { exceptions: ['()'] }],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 25 }])
  },
  {
    code: 'foo\n(\nbar )\n',
    output: 'foo\n(\nbar)\n',
    options: ['never'],
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 2, column: 4 }])
  },
  {
    code: 'var foo = `(bar ${(1 + 2 )})`;',
    output: 'var foo = `(bar ${(1 + 2)})`;',
    options: ['never'],
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 25 }])
  },
  {
    code: 'foo\n(\nbar )\n',
    output: 'foo\n(\nbar)\n',
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 2, column: 4 }])
  },
  {
    code: 'var foo = `(bar ${(1 + 2 )})`;',
    output: 'var foo = `(bar ${(1 + 2)})`;',
    errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 25 }])
  },
  {
    code: 'var foo = `(bar ${(1 + 2 )})`;',
    output: 'var foo = `(bar ${( 1 + 2 )})`;',
    options: ['always'],
    errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 19 }])
  }
]);

ruleTester.runTests();
