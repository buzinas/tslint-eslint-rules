"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('no-multi-spaces');
function expecting(errors) {
    return errors.map(function (token) {
        return {
            failure: "Multiple spaces found before '" + token + "'.",
            startPosition: new ruleTester_1.Position(),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass when avoiding unnecessary spaces', [
    'var a = 1;',
    'var a=1;',
    'var a = 1, b = 2;',
    'var arr = [1, 2];',
    'var arr = [ (1), (2) ];',
    "var obj = {'a': 1, 'b': (2)};",
    "var obj = {'a': 1,\n      'b': (2)};",
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
    '({ a:  b })'
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
        errors: expecting(["'b'"])
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9NdWx0aVNwYWNlc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQTZEO0FBRzdELElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXJELG1CQUFtQixNQUFnQjtJQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUs7UUFDdEIsTUFBTSxDQUFDO1lBQ0wsT0FBTyxFQUFFLG1DQUFpQyxLQUFLLE9BQUk7WUFDbkQsYUFBYSxFQUFFLElBQUkscUJBQVEsRUFBRTtZQUM3QixXQUFXLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRTtJQUMvRSxZQUFZO0lBQ1osVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLCtCQUErQjtJQUMvQixzQ0FBc0M7SUFDdEMsZ0NBQWdDO0lBQ2hDLE1BQU07SUFDTixTQUFTO0lBQ1QsT0FBTztJQUNQLFdBQVc7SUFDWCxPQUFPO0lBQ1AsUUFBUTtJQUNSLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1QixpQkFBaUI7SUFDakIsNEJBQTRCO0lBQzVCLFVBQVU7SUFDVixPQUFPO0lBQ1AsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsV0FBVztJQUNYLDJCQUEyQjtJQUMzQix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQiwyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsMEJBQTBCO0lBQzFCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFD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LEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDN0M7SUFDRDtRQUNFLElBQUksRUFBRSxxREFBcUQ7UUFDM0QsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUNBQWlDO1FBQ3ZDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSw4REFBOEQsRUFBRTtJQUM3RztRQUNFLElBQUksRUFBRSxZQUFZO1FBQ2xCLE9BQU8sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztLQUN6RDtJQUNEO1FBQ0UsSUFBSSxFQUFFLHNDQUFzQztRQUM1QyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDeEQsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbEQ7SUFDRDtRQUNFLElBQUksRUFBRSxjQUFjO1FBQ3BCLE9BQU8sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN4RCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSwrQ0FBK0MsRUFBRTtJQUNyRjtRQUNFLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztLQUNqRjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vTXVsdGlTcGFjZXNSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiQzpcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
