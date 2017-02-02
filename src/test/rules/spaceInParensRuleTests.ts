/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'space-in-parens';

let data:any = {

    valid: [
        { code: "if( true )", options: ["always"] },
        { code: "foo()", options: ["always"] },
        { code: "foo( bar )", options: ["always"] },
        { code: "foo\n(\nbar\n)\n", options: ["always"] },
        { code: "foo\n(  \nbar\n )\n", options: ["always"] },
        { code: "foo\n(\n bar  \n)\n", options: ["always"] },
        { code: "foo\n( \n  bar \n  )\n", options: ["always"] },
        { code: "foo\n(\t\nbar\n)", options: ["always"] },
        { code: "\tfoo(\n\t\tbar\n\t)", options: ["always"] },
        { code: "\tfoo\n(\t\n\t\tbar\t\n\t)", options: ["always"] },
        { code: "var x = ( 1 + 2 ) * 3", options: ["always"] },
        { code: "var x = 'foo(bar)'", options: ["always"] },
        { code: "var x = 'bar( baz )'", options: ["always"] },
        { code: "var foo = `(bar)`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var foo = `(bar ${baz})`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var foo = `(bar ${( 1 + 2 )})`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "bar()", options: ["never"] },
        { code: "bar(baz)", options: ["never"] },
        { code: "var x = (4 + 5) * 6", options: ["never"] },
        { code: "foo\n(\nbar\n)\n", options: ["never"] },
        { code: "foo\n(  \nbar\n )\n", options: ["never"] },
        { code: "foo\n(\n bar  \n)\n", options: ["never"] },
        { code: "foo\n( \n  bar \n  )\n", options: ["never"] },
        { code: "var foo = `( bar )`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },
        { code: "var foo = `( bar ${baz} )`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },
        { code: "var foo = `(bar ${(1 + 2)})`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },

        // comments
        { code: "foo( /* bar */ )", options: ["always"] },
        { code: "foo( /* bar */baz )", options: ["always"] },
        { code: "foo( /* bar */ baz )", options: ["always"] },
        { code: "foo( baz/* bar */ )", options: ["always"] },
        { code: "foo( baz /* bar */ )", options: ["always"] },
        { code: "foo(/* bar */)", options: ["never"] },
        //{ code: "foo(/* bar */ baz)", options: ["never"] },
        { code: "foo( //some comment\nbar\n)\n", options: ["never"] },
        { code: "foo(//some comment\nbar\n)\n", options: ["never"] },
        { code: "foo( //some comment\nbar\n)\n", options: ["never"] },

        // exceptions
        { code: "foo({ bar: 'baz' })", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo( { bar: 'baz' } )", options: ["always", { exceptions: ["[]", "()"] }] },
        { code: "foo( 1, { bar: 'baz' })", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo({ bar: 'baz' }, 1 )", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo({ bar: 'baz' })", options: ["never", { exceptions: ["[]", "()"] }] },
        { code: "foo( { bar: 'baz' } )", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo(1, { bar: 'baz' } )", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo( { bar: 'baz' }, 1)", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo( {\nbar: 'baz',\nbaz: 'bar'\n} )", options: ["never", { exceptions: ["{}"] }] },

        { code: "foo([ 1, 2 ])", options: ["always", { exceptions: ["[]"] }] },
        { code: "foo( [ 1, 2 ] )", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo( 1, [ 1, 2 ])", options: ["always", { exceptions: ["[]"] }] },
        { code: "foo([ 1, 2 ], 1 )", options: ["always", { exceptions: ["[]"] }] },
        { code: "foo([\n1,\n2\n])", options: ["always", { exceptions: ["[]"] }] },
        { code: "foo([ 1, 2 ])", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo( [ 1, 2 ] )", options: ["never", { exceptions: ["[]"] }] },
        { code: "foo(1, [ 1, 2 ] )", options: ["never", { exceptions: ["[]"] }] },
        { code: "foo( [ 1, 2 ], 1)", options: ["never", { exceptions: ["[]"] }] },
        { code: "foo( [\n1,\n2\n] )", options: ["never", { exceptions: ["[]"] }] },

        { code: "foo(( 1 + 2 ))", options: ["always", { exceptions: ["()"] }] },
        { code: "foo( ( 1 + 2 ) )", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo( 1 / ( 1 + 2 ))", options: ["always", { exceptions: ["()"] }] },
        { code: "foo(( 1 + 2 ) / 1 )", options: ["always", { exceptions: ["()"] }] },
        { code: "foo((\n1 + 2\n))", options: ["always", { exceptions: ["()"] }] },
        { code: "foo((1 + 2))", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo( (1 + 2) )", options: ["never", { exceptions: ["()"] }] },
        { code: "foo(1 / (1 + 2) )", options: ["never", { exceptions: ["()"] }] },
        { code: "foo( (1 + 2) / 1)", options: ["never", { exceptions: ["()"] }] },
        { code: "foo( (\n1 + 2\n) )", options: ["never", { exceptions: ["()"] }] },


        { code: "foo()", options: ["always", { exceptions: ["empty"] }] },
        { code: "foo( )", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo(\n1 + 2\n)", options: ["always", { exceptions: ["empty"] }] },
        { code: "foo()", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo( )", options: ["never", { exceptions: ["empty"] }] },
        { code: "foo( \n1 + 2\n )", options: ["never", { exceptions: ["empty"] }] },

        { code: "foo({ bar: 'baz' }, [ 1, 2 ])", options: ["always", { exceptions: ["{}", "[]"] }] },
        { code: "foo({\nbar: 'baz'\n}, [\n1,\n2\n])", options: ["always", { exceptions: ["{}", "[]"] }] },
        { code: "foo(); bar({bar:'baz'}); baz([1,2])", options: ["always", { exceptions: ["{}", "[]", "()"] }] },
        { code: "foo( { bar: 'baz' }, [ 1, 2 ] )", options: ["never", { exceptions: ["{}", "[]"] }] },
        { code: "foo( {\nbar: 'baz'\n}, [\n1,\n2\n] )", options: ["never", { exceptions: ["{}", "[]"] }] },
        { code: "foo( ); bar( {bar:'baz'} ); baz( [1,2] )", options: ["never", { exceptions: ["{}", "[]", "empty"] }] },

        // faulty exceptions option
        { code: "foo( { bar: 'baz' } )", options: ["always", { exceptions: [] }] }

    ],
    invalid: [
        // {
        //     code: "foo( )",
        //     options: ["never"],
            
        // },
        {
            code: "foo( bar)",
            options: ["always"]
        },
        {
            code: "foo(bar)",
            options: ["always"]

        },
        {
            code: "var x = ( 1 + 2) * 3",
            options: ["always"],
        },
        {
            code: "var x = (1 + 2 ) * 3",
            options: ["always"],
        },
        {
            code: "foo\n(bar\n)\n",
            options: ["always"],
        },
        {
            code: "bar(baz )",
            options: ["never"],
        },
        {
            code: "bar( baz )",
            options: ["never"]
        },
        {
            code: "var x = ( 4 + 5) * 6",
            options: ["never"],
        },
        {
            code: "var x = (4 + 5 ) * 6",
            options: ["never"],
        },

        // comments
        // {
        //     code: "foo(/* bar */)",
        //     options: ["always"],
        // },
        // {
        //     code: "foo(/* bar */baz )",
        //     options: ["always"],
        // },
        // {
        //     code: "foo(/* bar */ baz )",
        //     options: ["always"],
        // },
        // {
        //     code: "foo( baz/* bar */)",
        //     options: ["always"],
        // },
        {
            code: "foo( baz /* bar */)",
            options: ["always"],
        },
        {
            code: "foo( /* bar */ )",
            options: ["never"],
        },
        {
            code: "foo( /* bar */ baz)",
            options: ["never"],
            
        },

        // exceptions
        {
            code: "foo({ bar: 'baz' })",
            options: ["always", { exceptions: ["[]"] }],
        },
        {
            code: "foo( { bar: 'baz' } )",
            options: ["always", { exceptions: ["{}"] }],
        },
        {
            code: "foo({ bar: 'baz' })",
            options: ["never", { exceptions: ["{}"] }],
        },
        {
            code: "foo( { bar: 'baz' } )",
            options: ["never", { exceptions: ["[]"] }],
        },
        {
            code: "foo( { bar: 'baz' })",
            options: ["always", { exceptions: ["{}"] }],
        },
        {
            code: "foo( { bar: 'baz' })",
            options: ["never", { exceptions: ["{}"] }],
        },
        {
            code: "foo({ bar: 'baz' } )",
            options: ["always", { exceptions: ["{}"] }],
        },
        {
            code: "foo({ bar: 'baz' } )",
            options: ["never", { exceptions: ["{}"] }],
        },
        {
            code: "foo([ 1, 2 ])",
            options: ["always", { exceptions: ["empty"] }],
        },
        {
            code: "foo( [ 1, 2 ] )",
            options: ["always", { exceptions: ["[]"] }],
        },
        {
            code: "foo([ 1, 2 ])",
            options: ["never", { exceptions: ["[]"] }],
        },
        {
            code: "foo( [ 1, 2 ] )",
            options: ["never", { exceptions: ["()"] }],
        },
        {
            code: "foo([ 1, 2 ] )",
            options: ["always", { exceptions: ["[]"] }],
        },
        {
            code: "foo([ 1, 2 ] )",
            options: ["never", { exceptions: ["[]"] }],
        },
        {
            code: "foo( [ 1, 2 ])",
            options: ["always", { exceptions: ["[]"] }],
        },
        {
            code: "foo( [ 1, 2 ])",
            options: ["never", { exceptions: ["[]"] }],
        },
        {
            code: "(( 1 + 2 ))",
            options: ["always", { exceptions: ["[]"] }],
        },
        {
            code: "( ( 1 + 2 ) )",
            options: ["always", { exceptions: ["()"] }],
        },
        {
            code: "(( 1 + 2 ))",
            options: ["always", { exceptions: ["[]"] }],
        },
        {
            code: "( ( 1 + 2 ) )",
            options: ["never"]
        },
        {
            code: "( ( 1 + 2 ) )",
            options: ["never", { exceptions: ["[]"] }],
        },
        {
            code: "( ( 1 + 2 ))",
            options: ["always", { exceptions: ["()"] }],
        },
        {
            code: "( (1 + 2))",
            options: ["never", { exceptions: ["()"] }],
        },
        {
            code: "(( 1 + 2 ) )",
            options: ["always", { exceptions: ["()"] }],
        },
        {
            code: "((1 + 2) )",
            options: ["never", { exceptions: ["()"] }],
        },
        {
            code: "var result = ( 1 / ( 1 + 2 ) ) + 3",
            options: ["always", { exceptions: ["()"] }],
        },
        {
            code: "var result = (1 / (1 + 2)) + 3",
            options: ["never", { exceptions: ["()"] }],
        },
        {
            code: "var result = ( 1 / ( 1 + 2)) + 3",
            options: ["always", { exceptions: ["()"] }],
        },
        {
            code: "var result = (1 / (1 + 2)) + 3",
            options: ["never", { exceptions: ["()"] }],
        },
        // {
        //     code: "foo( )",
        //     options: ["always", { exceptions: ["empty"] }],
            
        // },
        // {
        //     code: "foo()",
        //     options: ["never", { exceptions: ["empty"] }],
        // },
        {
            code: "foo\n(\nbar )\n",
            options: ["never"],
        },
        {
            code: "var foo = `(bar ${(1 + 2 )})`;",
            options: ["never"],
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "var foo = `(bar ${(1 + 2 )})`;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
        }
    ]
}

describe(rule, function test() {

  it('should pass all the valids', function testVariables() {
    data.valid.forEach( test  => {
      makeTest(rule, [ test.code ], true, { rules: { 'space-in-parens' : [ true, ...test.options ] } } );
    });
  });

  it('should fail all the invalids', function testVariables() {
    data.invalid.forEach( test  => {
      makeTest(rule, [ test.code ], false, { rules: { 'space-in-parens' : [ true, ...test.options ] } } );
    });
  });

});


