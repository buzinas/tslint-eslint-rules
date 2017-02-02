"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-arrow-body-style');
function expecting(errors) {
    return errors.map(function (err) {
        var val = err[2] ? 'Expected' : 'Unexpected';
        var message = val + " block statement surrounding arrow body.";
        return {
            failure: message,
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass with no options', [
    'var foo = () => {};',
    'var foo = () => 0;',
    'var addToB = (a) => { b =  b + a };',
    'var foo = () => { /* do nothing */ };',
    'var foo = () => {\n /* do nothing */ \n};',
    'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
    'var foo = () => ({});',
    'var foo = () => bar();',
    'var foo = () => { bar(); };',
    'var foo = () => { b = a };',
    'var foo = () => { bar: 1 };'
]);
ruleTester.addTestGroup('valid-always', 'should pass when braces are "always" required', [
    { code: 'var foo = () => { return 0; };', options: ['always'] },
    { code: 'var foo = () => { return bar(); };', options: ['always'] }
]);
ruleTester.addTestGroup('valid-never', 'should pass when braces are "never" required', [
    { code: 'var foo = () => 0;', options: ['never'] },
    { code: 'var foo = () => ({ foo: 0 });', options: ['never'] }
]);
ruleTester.addTestGroup('valid-as-needed', 'should pass when braces are required "as-needed"', [
    { code: 'var foo = () => {};', options: ['as-needed', { requireReturnForObjectLiteral: true }] },
    { code: 'var foo = () => 0;', options: ['as-needed', { requireReturnForObjectLiteral: true }] },
    {
        code: 'var addToB = (a) => { b =  b + a };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => { /* do nothing */ };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => {\n /* do nothing */ \n};',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => bar();',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => { bar(); };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var addToB = (a) => { b =  b + a };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => { return { bar: 0 }; };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    }
]);
ruleTester.addTestGroup('invalid', 'should fail with no options', [
    {
        code: 'var foo = () => {\nreturn bar;\n};',
        output: 'var foo = () => bar;',
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => {\nreturn bar;};',
        output: 'var foo = () => bar;',
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => {return bar;\n};',
        output: 'var foo = () => bar;',
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: (_a = ["\n      var foo = () => {\n        return foo\n          .bar;\n      };"], _a.raw = ["\n      var foo = () => {\n        return foo\n          .bar;\n      };"], ruleTester_1.dedent(_a)),
        output: (_b = ["\n      var foo = () => foo\n          .bar;"], _b.raw = ["\n      var foo = () => foo\n          .bar;"], ruleTester_1.dedent(_b)),
        errors: expecting([
            [1, 16, false]
        ])
    },
    {
        code: (_c = ["\n      var foo = () => {\n        return {\n          bar: 1,\n          baz: 2\n        };\n      };"], _c.raw = ["\n      var foo = () => {\n        return {\n          bar: 1,\n          baz: 2\n        };\n      };"], ruleTester_1.dedent(_c)),
        output: (_d = ["\n      var foo = () => ({\n          bar: 1,\n          baz: 2\n        });"], _d.raw = ["\n      var foo = () => ({\n          bar: 1,\n          baz: 2\n        });"], ruleTester_1.dedent(_d)),
        errors: expecting([
            [1, 16, false]
        ])
    }
]);
ruleTester.addTestGroup('invalid-always', 'should fail when braces are "always" required', [
    {
        code: 'var foo = () => 0;',
        output: 'var foo = () => {return 0};',
        options: ['always'],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = () => ({});',
        output: 'var foo = () => {return ({})};',
        options: ['always'],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = () => (((((((5)))))));',
        output: 'var foo = () => {return (((((((5)))))))};',
        options: ['always'],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ ( /* e */ 5 /* f */ ) /* g */ ;',
        output: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ {return ( /* e */ 5 /* f */ )} /* g */ ;',
        options: ['always'],
        errors: expecting([
            [0, 49, true]
        ])
    }
]);
ruleTester.addTestGroup('invalid-never', 'should fail when braces are "never" required', [
    {
        code: 'var foo = () => {\nreturn 0;\n};',
        output: 'var foo = () => 0;',
        options: ['never'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar }\n' +
            '[1, 2, 3].map(foo)',
        output: 'var foo = () => { return bar }\n' +
            '[1, 2, 3].map(foo)',
        options: ['never'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar }\n' +
            '(1).toString();',
        output: 'var foo = () => { return bar }\n' +
            '(1).toString();',
        options: ['never'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar };\n' +
            '[1, 2, 3].map(foo)',
        output: 'var foo = () => bar;\n' +
            '[1, 2, 3].map(foo)',
        options: ['never'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
        output: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
        options: ['never'],
        errors: expecting([
            [0, 26, false]
        ])
    }
]);
ruleTester.addTestGroup('invalid-as-needed', 'should fail when braces are required "as-needed"', [
    {
        code: 'var foo = () => { return 0; };',
        output: 'var foo = () => 0;',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return 0 };',
        output: 'var foo = () => 0;',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar(); };',
        output: 'var foo = () => bar();',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return { bar: 0 }; };',
        output: 'var foo = () => ({ bar: 0 });',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return; };',
        output: 'var foo = () => { return; };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return ( /* a */ {ok: true} /* b */ ) };',
        output: 'var foo = () => ( /* a */ {ok: true} /* b */ );',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: "var foo = () => { return '{' };",
        output: "var foo = () => '{';",
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return { bar: 0 }.bar; };',
        output: 'var foo = () => ({ bar: 0 }.bar);',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return 0; };',
        output: 'var foo = () => 0;',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar(); };',
        output: 'var foo = () => bar();',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => ({});',
        output: 'var foo = () => {return ({})};',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = () => ({ bar: 0 });',
        output: 'var foo = () => {return ({ bar: 0 })};',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ { /* e */ return /* f */ 5 /* g */ ; /* h */ } /* i */ ;',
        output: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */  /* e */  /* f */ 5 /* g */  /* h */  /* i */ ;',
        options: ['as-needed'],
        errors: expecting([
            [0, 49, false]
        ])
    }
]);
ruleTester.runTests();
var _a, _b, _c, _d;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyQXJyb3dCb2R5U3R5bGVSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUFxRTtBQUdyRSxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUxRCxtQkFBbUIsTUFBbUM7SUFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1FBQ3BCLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsWUFBWSxDQUFDO1FBQy9DLElBQU0sT0FBTyxHQUFNLEdBQUcsNkNBQTBDLENBQUM7UUFDakUsTUFBTSxDQUFDO1lBQ0wsT0FBTyxFQUFFLE9BQU87WUFDaEIsYUFBYSxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLFdBQVcsRUFBRSxJQUFJLHFCQUFRLEVBQUU7U0FDNUIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLDZCQUE2QixFQUFFO0lBQzlELHFCQUFxQjtJQUNyQixvQkFBb0I7SUFDcEIscUNBQXFDO0lBQ3JDLHVDQUF1QztJQUN2QywyQ0FBMkM7SUFDM0MsbUVBQW1FO0lBQ25FLHVCQUF1QjtJQUN2Qix3QkFBd0I7SUFDeEIsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1Qiw2QkFBNkI7Q0FDOUIsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsK0NBQStDLEVBQUU7SUFDdkYsRUFBRSxJQUFJLEVBQUUsZ0NBQWdDLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDL0QsRUFBRSxJQUFJLEVBQUUsb0NBQW9DLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7Q0FD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O1lBQ2hCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUM7U0FDZixDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsTUFBTSxFQUFFLGdDQUFnQztRQUN4QyxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSw2QkFBNkIsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUMvRCxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7U0FDZCxDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSwrQkFBK0I7UUFDckMsTUFBTSxFQUFFLHdDQUF3QztRQUNoRCxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSw2QkFBNkIsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUMvRCxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7U0FDZCxDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSwyR0FBMkc7UUFDakgsTUFBTSxFQUFFLGtHQUFrRztRQUMxRyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdEIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDO1NBQ2YsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvdGVyQXJyb3dCb2R5U3R5bGVSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
