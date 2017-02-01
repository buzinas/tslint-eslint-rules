/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'space-in-parens';
// const scripts = {
//   always: {
//     valid: [
//         "foo()",
//         "foo( bar )",
//         "foo\n(\nbar\n)\n",
//         "foo\n(  \nbar\n )\n",
//         "foo\n(\n bar  \n)\n",
//         "foo\n( \n  bar \n  )\n",
//         "foo\n(\t\nbar\n)",
//         "\tfoo(\n\t\tbar\n\t)",
//         "\tfoo\n(\t\n\t\tbar\t\n\t)",
//         "var x = ( 1 + 2 ) * 3", 
//         "var x = 'foo(bar)'", 
//         "var x = 'bar( baz )'",

//         "foo( /* bar */ )",
//         "foo( /* bar */baz )",
//         "foo( /* bar */ baz )",
//         "foo( baz/* bar */ )",
//         "foo( baz /* bar */ )",
//     ],
//     invalid: [
//       // "foo( )" ,
//       // "foo(bar)" ,
//       // `(foo , 'bar' )`
//     ]
//   },
//   never: {
//     valid: [
//        "bar()", 
//        "bar(baz)", 
//        "var x = (4 + 5) * 6", 
//        "foo\n(\nbar\n)\n", 
//        "foo\n(  \nbar\n )\n", 
//        "foo\n(\n bar  \n)\n", 
//        "foo\n( \n  bar \n  )\n", 
//        "foo(/* bar */)",
//        //"foo(/* bar */ baz)",
//        "foo( //some comment\nbar\n)\n",
//        "foo(//some comment\nbar\n)\n",
//        "foo( //some comment\nbar\n)\n",

//     ],
//     invalid: [
//       `( foo , 'bar')`
//     ]
//   }
// };




describe(rule, function test() {

  // const alwaysConfig = { rules: { 'space-in-parens' : [true, 'always'] } };
  // const neverConfig = { rules: { 'space-in-parens' : [true, 'never'] } };

  it('should pass all the valids', function testVariables() {
    //makeTest(rule, scripts.always.valid, true, alwaysConfig);
    data.valid.forEach( test  => {
      makeTest(rule, [ test.code ], true, { rules: { 'space-in-parens' : [ true, ...test.options ] } } );
    });
  });

  // it('should fail when "always" and there are not spaces inside brackets', function testVariables() {
  //   data.valid.forEach( test  => {
  //     makeTest(rule, test.code, false, { rules: { 'space-in-parens' : [true, test.options] } } );
  //   });
    
  // });

  // it('should pass when "never" and there are not spaces inside brackets', function testVariables() {
  //   makeTest(rule, scripts.never.valid, true, neverConfig);
  // });

  // it('should fail when "never" and there are spaces inside brackets', function testVariables() {
  //   makeTest(rule, scripts.never.invalid, false, neverConfig);
  // });
});


let data:any = {

    valid: [
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
        // { code: "var foo = `(bar)`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        // { code: "var foo = `(bar ${baz})`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        // { code: "var foo = `(bar ${( 1 + 2 )})`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "bar()", options: ["never"] },
        { code: "bar(baz)", options: ["never"] },
        { code: "var x = (4 + 5) * 6", options: ["never"] },
        { code: "foo\n(\nbar\n)\n", options: ["never"] },
        { code: "foo\n(  \nbar\n )\n", options: ["never"] },
        { code: "foo\n(\n bar  \n)\n", options: ["never"] },
        { code: "foo\n( \n  bar \n  )\n", options: ["never"] },
        // { code: "var foo = `( bar )`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },
        // { code: "var foo = `( bar ${baz} )`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },
        // { code: "var foo = `(bar ${(1 + 2)})`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },

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
        //{ code: "foo( { bar: 'baz' } )", options: ["always", { exceptions: ["[]", "()"] }] },
        { code: "foo( \n1, { bar: 'baz' })", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo({ bar: 'baz' }, 1 )", options: ["always", { exceptions: ["{}"] }] },
        { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["always", { exceptions: ["{}"] }] },
        //{ code: "foo({ bar: 'baz' })", options: ["never", { exceptions: ["[]", "()"] }] },
        { code: "foo( { bar: 'baz' } )", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo(1, { bar: 'baz' } )", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo( { bar: 'baz' }, 1)", options: ["never", { exceptions: ["{}"] }] },
        { code: "foo( {\nbar: 'baz',\nbaz: 'bar'\n} )", options: ["never", { exceptions: ["{}"] }] },
    ],

}