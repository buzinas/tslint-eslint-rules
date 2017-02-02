"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('space-in-parens');
var MISSING_SPACE_ERROR = 'there must be a space inside this paren.';
var REJECTED_SPACE_ERROR = 'there should be no spaces inside this paren.';
function expecting(errors) {
    return errors.map(function (err) {
        if (err.message && err.column) {
            return {
                failure: err.message,
                startPosition: new ruleTester_1.Position(err.line, err.column),
                endPosition: new ruleTester_1.Position(err.line, err.column)
            };
        }
    });
}
ruleTester.addTestGroup('valid', 'should pass valid', [
    { code: 'foo()', options: ['always'] },
    { code: 'foo\n(\nbar\n)\n', options: ['always'] },
    { code: 'foo\n(  \nbar\n )\n', options: ['always'] },
    { code: 'foo\n(\n bar  \n)\n', options: ['always'] },
    { code: 'foo\n( \n  bar \n  )\n', options: ['always'] },
    { code: 'foo\n(\t\nbar\n)', options: ['always'] },
    { code: '\tfoo(\n\t\tbar\n\t)', options: ['always'] },
    { code: '\tfoo\n(\t\n\t\tbar\t\n\t)', options: ['always'] },
    { code: 'var x = ( 1 + 2 ) * 3', options: ['always'] },
    { code: 'var x = `foo(bar)`', options: ['always'] },
    { code: 'var x = "bar( baz )"', options: ['always'] },
    { code: 'var foo = `(bar)`;', options: ['always'] },
    { code: 'var foo = `(bar ${baz})`;', options: ['always'] },
    { code: 'var foo = `(bar ${( 1 + 2 )})`;', options: ['always'] },
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
    { code: 'class Test { foo( bar:string, asdsd:number, asd:any ) : void {} }', options: ['always'] },
    { code: 'class Test { foo(bar:string, asdsd:number, asd:any) : void {} }', options: ['never'] },
    { code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }', options: ['always'] },
    { code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }', options: ['never'] },
    { code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}', options: ['always'] },
    { code: 'function foo(bar:string, asdsd:number, asd:any) : void {}', options: ['never'] },
    { code: 'function ( bar:string, asdsd:number, asd:any ) : void {}', options: ['always'] },
    { code: 'function (bar:string, asdsd:number, asd:any) : void {}', options: ['never'] },
    { code: 'constructor( bar:string, asdsd:number, asd:any ){}', options: ['always'] },
    { code: 'constructor(bar:string, asdsd:number, asd:any){}', options: ['never'] },
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
    { code: 'foo( { bar: "baz" } )', options: ['always', { exceptions: [] }] }
]);
ruleTester.addTestGroup('invalid', 'should fail invalid', [
    {
        code: 'foo( bar)',
        output: 'foo( bar )',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'foo(bar)',
        output: 'foo( bar )',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 4 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 8 }
        ])
    },
    {
        code: 'var x = ( 1 + 2) * 3',
        output: 'var x = ( 1 + 2 ) * 3',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 16 }])
    },
    {
        code: 'var x = (1 + 2 ) * 3',
        output: 'var x = ( 1 + 2 ) * 3',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'foo\n(bar\n)\n',
        output: 'foo\n( bar\n)\n',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 1, column: 1 }])
    },
    {
        code: 'bar(baz )',
        output: 'bar(baz)',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'bar( baz )',
        output: 'bar(baz)',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 }
        ])
    },
    {
        code: 'var x = ( 4 + 5) * 6',
        output: 'var x = (4 + 5) * 6',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'var x = (4 + 5 ) * 6',
        output: 'var x = (4 + 5) * 6',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 16 }])
    },
    {
        code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
        output: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 27 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 63 }
        ])
    },
    {
        code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
        output: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 27 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 61 }
        ])
    },
    {
        code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 13 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 49 }
        ])
    },
    {
        code: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
        output: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 13 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 47 }
        ])
    },
    {
        code: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'function (bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 46 }
        ])
    },
    {
        code: 'function (bar:string, asdsd:number, asd:any) : void {}',
        output: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 10 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 44 }
        ])
    },
    {
        code: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 48 }
        ])
    },
    {
        code: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
        output: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 12 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 46 }
        ])
    },
    {
        code: 'fooa({ bar: "baz" })',
        output: 'foo( { bar: "baz" } )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 20 }
        ])
    },
    {
        code: 'foob( { bar: "baz" } )',
        output: 'foo({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 22 }
        ])
    },
    {
        code: 'fooc({ bar: "baz" })',
        output: 'foo( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 20 }
        ])
    },
    {
        code: 'food( { bar: "baz" } )',
        output: 'foo({ bar: "baz" })',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 22 }
        ])
    },
    {
        code: 'foo1( { bar: "baz" })',
        output: 'foo({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foo2( { bar: "baz" })',
        output: 'foo( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 21 }])
    },
    {
        code: 'foo3({ bar: "baz" } )',
        output: 'foo({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 21 }])
    },
    {
        code: 'foo4({ bar: "baz" } )',
        output: 'foo( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foo6([ 1, 2 ])',
        output: 'foo( [ 1, 2 ] )',
        options: ['always', { exceptions: ['empty'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 14 }
        ])
    },
    {
        code: 'foo7( [ 1, 2 ] )',
        output: 'foo([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 16 }
        ])
    },
    {
        code: 'fooq([ 1, 2 ])',
        output: 'foo( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 14 }
        ])
    },
    {
        code: 'foow( [ 1, 2 ] )',
        output: 'foo([ 1, 2 ])',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 16 }
        ])
    },
    {
        code: 'fooe([ 1, 2 ] )',
        output: 'foo([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'foor([ 1, 2 ] )',
        output: 'foo( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foot( [ 1, 2 ])',
        output: 'foo([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'fooy( [ 1, 2 ])',
        output: 'foo( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: '(( 1 + 2 ))',
        output: '( ( 1 + 2 ) )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 1 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 11 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '(( 1 + 2 ))',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 13 }
        ])
    },
    {
        code: '(( 1 + 2 ))',
        output: '( ( 1 + 2 ) )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 1 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 11 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '((1 + 2))',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 11 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 13 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '((1 + 2))',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 11 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 13 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 13 }
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
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 10 }])
    },
    {
        code: '(( 1 + 2 ) )',
        output: '(( 1 + 2 ))',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 12 }])
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
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 30 }])
    },
    {
        code: 'var result = (1 / (1 + 2)) + 3',
        output: 'var result = (1 / (1 + 2) ) + 3',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 26 }])
    },
    {
        code: 'var result = ( 1 / ( 1 + 2)) + 3',
        output: 'var result = ( 1 / ( 1 + 2 )) + 3',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 27 }])
    },
    {
        code: 'var result = (1 / (1 + 2)) + 3',
        output: 'var result = (1 / (1 + 2) ) + 3',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 26 }])
    },
    {
        code: 'foo\n(\nbar )\n',
        output: 'foo\n(\nbar)\n',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 2, column: 5 }])
    },
    {
        code: 'var foo = `(bar ${(1 + 2 )})`;',
        output: 'var foo = `(bar ${(1 + 2)})`;',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 26 }])
    },
    {
        code: 'var foo = `(bar ${(1 + 2 )})`;',
        output: 'var foo = `(bar ${( 1 + 2 )})`;',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 19 }])
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvc3BhY2VJblBhcmVuc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQTZEO0FBQzdELElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JELElBQU0sbUJBQW1CLEdBQUcsMENBQTBDLENBQUM7QUFDdkUsSUFBTSxvQkFBb0IsR0FBRyw4Q0FBOEMsQ0FBQztBQUU1RSxtQkFBb0IsTUFBTTtJQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDbEIsRUFBRSxDQUFDLENBQUUsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUM7Z0JBQ0gsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2dCQUNwQixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDakQsV0FBVyxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUM7YUFDbEQsQ0FBQztRQUNOLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRTtJQUNsRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDdEMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDdEQsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbkQsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbkQsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDaEUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3JDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUN4QyxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNoRCxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSw2QkFBNkIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSwrQkFBK0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUc3RCxFQUFFLElBQUksRUFBRSxtRUFBbUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNsRyxFQUFFLElBQUksRUFBRSxpRUFBaUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUMvRixFQUFFLElBQUksRUFBRSw2RUFBNkUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUM1RyxFQUFFLElBQUksRUFBRSwyRUFBMkUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUd6RyxFQUFFLElBQUksRUFBRSw2REFBNkQsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUM1RixFQUFFLElBQUksRUFBRSwyREFBMkQsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUN6RixFQUFFLElBQUksRUFBRSwwREFBMEQsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUN6RixFQUFFLElBQUksRUFBRSx3REFBd0QsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUd0RixFQUFFLElBQUksRUFBRSxvREFBb0QsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNuRixFQUFFLElBQUksRUFBRSxrREFBa0QsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUdoRixFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDNUUsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNwRixFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDaEYsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2hGLEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUMzRixFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2pGLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM3RSxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDL0UsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQy9FLEVBQUUsSUFBSSxFQUFFLHNDQUFzQyxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUU1RixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3RFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN4RSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDMUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN6RSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3JFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDekUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3pFLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUUxRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdkUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3pFLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM1RSxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDNUUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3pFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDcEUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3RFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN6RSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDekUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBRTFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDakUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUMvRCxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDMUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM3RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2pFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUUzRSxFQUFFLElBQUksRUFBRSwrQkFBK0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzVGLEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDakcsRUFBRSxJQUFJLEVBQUUscUNBQXFDLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDeEcsRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM3RixFQUFFLElBQUksRUFBRSxzQ0FBc0MsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2xHLEVBQUUsSUFBSSxFQUFFLDBDQUEwQyxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBRy9HLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0NBQzdFLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFFO0lBRWxEO1FBQ0ksSUFBSSxFQUFFLFdBQVc7UUFDakIsTUFBTSxFQUFFLFlBQVk7UUFDcEIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzVFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsWUFBWTtRQUNwQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDbkIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNwRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7U0FDdkQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzdFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzVFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzVFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFFLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFFLENBQUM7S0FDL0U7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3JELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtTQUN6RCxDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsTUFBTSxFQUFFLHFCQUFxQjtRQUM3QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFFLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFFLENBQUM7S0FDL0U7SUFDRDtRQUNJLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsTUFBTSxFQUFFLHFCQUFxQjtRQUM3QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFFLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUM7S0FDaEY7SUFHRDtRQUNJLElBQUksRUFBRSw2RUFBNkU7UUFDbkYsTUFBTSxFQUFFLDJFQUEyRTtRQUNuRixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN0RCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDekQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsMkVBQTJFO1FBQ2pGLE1BQU0sRUFBRSw2RUFBNkU7UUFDckYsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDZCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDckQsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1NBQ3hELENBQUM7S0FDTDtJQUdEO1FBQ0ksSUFBSSxFQUFFLDZEQUE2RDtRQUNuRSxNQUFNLEVBQUUsMkRBQTJEO1FBQ25FLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3RELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtTQUN6RCxDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSwyREFBMkQ7UUFDakUsTUFBTSxFQUFFLDZEQUE2RDtRQUNyRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDbkIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNyRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDeEQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsMERBQTBEO1FBQ2hFLE1BQU0sRUFBRSx3REFBd0Q7UUFDaEUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDZCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDdEQsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1NBQ3pELENBQUM7S0FDTDtJQUNEO1FBQ0ksSUFBSSxFQUFFLHdEQUF3RDtRQUM5RCxNQUFNLEVBQUUsMERBQTBEO1FBQ2xFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3JELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtTQUN4RCxDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSw0REFBNEQ7UUFDbEUsTUFBTSxFQUFFLDBEQUEwRDtRQUNsRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN0RCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDekQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsMERBQTBEO1FBQ2hFLE1BQU0sRUFBRSw0REFBNEQ7UUFDcEUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDZCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDckQsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1NBQ3hELENBQUM7S0FDTDtJQUdEO1FBQ0ksSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixNQUFNLEVBQUUsdUJBQXVCO1FBQy9CLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDM0MsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNwRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDeEQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3JELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtTQUN6RCxDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsTUFBTSxFQUFFLHVCQUF1QjtRQUMvQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzFDLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDZCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDcEQsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1NBQ3hELENBQUM7S0FDTDtJQUNEO1FBQ0ksSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixNQUFNLEVBQUUscUJBQXFCO1FBQzdCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNyRCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDekQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUUsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztLQUMvRTtJQUNEO1FBQ0ksSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixNQUFNLEVBQUUsdUJBQXVCO1FBQy9CLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0U7SUFDRDtRQUNJLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsTUFBTSxFQUFFLHFCQUFxQjtRQUM3QixPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzNDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBRSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDO0tBQ2hGO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM1RTtJQUNEO1FBQ0ksSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDOUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNwRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDeEQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDM0MsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNyRCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDekQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3BELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtTQUN4RCxDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3JELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtTQUN6RCxDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUUsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQztLQUNoRjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDNUU7SUFDRDtRQUNJLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUUsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztLQUMvRTtJQUNEO1FBQ0ksSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0U7SUFDRDtRQUNJLElBQUksRUFBRSxhQUFhO1FBQ25CLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDM0MsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNkLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNwRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDeEQsQ0FBQztLQUNMO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzNDLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDZCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDckQsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1NBQ3pELENBQUM7S0FDTDtJQUNEO1FBQ0ksSUFBSSxFQUFFLGFBQWE7UUFDbkIsTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3BELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtTQUN4RCxDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxXQUFXO1FBQ25CLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3JELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNyRCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDdEQsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1NBQ3pELENBQUM7S0FDTDtJQUNEO1FBQ0ksSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLFdBQVc7UUFDbkIsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2QsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3JELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNyRCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDdEQsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3RELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtTQUN6RCxDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSxjQUFjO1FBQ3BCLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDM0MsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDN0U7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0U7SUFDRDtRQUNJLElBQUksRUFBRSxjQUFjO1FBQ3BCLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDM0MsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFFLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUM7S0FDaEY7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDNUU7SUFDRDtRQUNJLElBQUksRUFBRSxvQ0FBb0M7UUFDMUMsTUFBTSxFQUFFLG1DQUFtQztRQUMzQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzNDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBRSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDO0tBQ2hGO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZ0NBQWdDO1FBQ3RDLE1BQU0sRUFBRSxpQ0FBaUM7UUFDekMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM3RTtJQUNEO1FBQ0ksSUFBSSxFQUFFLGtDQUFrQztRQUN4QyxNQUFNLEVBQUUsbUNBQW1DO1FBQzNDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDM0MsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0U7SUFDRDtRQUNJLElBQUksRUFBRSxnQ0FBZ0M7UUFDdEMsTUFBTSxFQUFFLGlDQUFpQztRQUN6QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzdFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzdFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZ0NBQWdDO1FBQ3RDLE1BQU0sRUFBRSwrQkFBK0I7UUFDdkMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzlFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZ0NBQWdDO1FBQ3RDLE1BQU0sRUFBRSxpQ0FBaUM7UUFDekMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzdFO0NBRVIsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvc3BhY2VJblBhcmVuc1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
