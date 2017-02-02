"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-arrow-parens');
var always = 'Expected parentheses around arrow function argument.';
var asNeeded = 'Unexpected parentheses around single function argument.';
var block = 'Unexpected parentheses around single function argument having a body with no curly braces.';
var blockNoParens = 'Expected parentheses around arrow function argument having a body with curly braces.';
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: err[4],
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position(err[2], err[3])
        };
    });
}
ruleTester.addTestGroup('valid-always', 'should pass with default values', [
    '() => {}',
    '(a) => {}',
    '(a) => a',
    '(a) => {\n}',
    'a.then((foo) => {});',
    'a.then((foo) => { if (true) {}; });',
    'a.then(async (foo) => { if (true) {}; });'
]);
ruleTester.addTestGroup('valid-always-explicit', 'should pass when always is on', [
    { code: '() => {}', options: ['always'] },
    { code: '(a) => {}', options: ['always'] },
    { code: '(a) => a', options: ['always'] },
    { code: '(a) => {\n}', options: ['always'] },
    { code: 'a.then((foo) => {});', options: ['always'] },
    { code: 'a.then((foo) => { if (true) {}; });', options: ['always'] },
    { code: 'a.then(async (foo) => { if (true) {}; });', options: ['always'] }
]);
ruleTester.addTestGroup('valid-as-needed', 'should pass with as-needed on', [
    { code: '() => {}', options: ['as-needed'] },
    { code: 'a => {}', options: ['as-needed'] },
    { code: 'a => a', options: ['as-needed'] },
    { code: '([a, b]) => {}', options: ['as-needed'] },
    { code: '({ a, b }) => {}', options: ['as-needed'] },
    { code: '(a = 10) => {}', options: ['as-needed'] },
    { code: '(...a) => a[0]', options: ['as-needed'] },
    { code: '(a, b) => {}', options: ['as-needed'] },
    { code: 'async ([a, b]) => {}', options: ['as-needed'] },
    { code: 'async (a, b) => {}', options: ['as-needed'] },
    { code: '(a: T) => a', options: ['as-needed'] },
    { code: '(a): T => a', options: ['as-needed'] }
]);
ruleTester.addTestGroup('valid-require-for-block', 'should pass with requireForBlockBody option', [
    { code: '() => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: 'a => a', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '([a, b]) => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '([a, b]) => a', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '({ a, b }) => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '({ a, b }) => a + b', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(a = 10) => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(...a) => a[0]', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(a, b) => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: 'a => ({})', options: ['as-needed', { requireForBlockBody: true }] },
    { code: 'async a => ({})', options: ['as-needed', { requireForBlockBody: true }] },
    { code: 'async a => a', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(a: T) => a', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(a): T => a', options: ['as-needed', { requireForBlockBody: true }] }
]);
ruleTester.addTestGroup('invalid-always', 'should fail with always on', [
    {
        code: 'a => {}',
        output: '(a) => {}',
        errors: expecting([
            [0, 0, 0, 1, always]
        ])
    },
    {
        code: 'a => a',
        output: '(a) => a',
        errors: expecting([
            [0, 0, 0, 1, always]
        ])
    },
    {
        code: 'a => {\n}',
        output: '(a) => {\n}',
        errors: expecting([
            [0, 0, 0, 1, always]
        ])
    },
    {
        code: 'a.then(foo => {});',
        output: 'a.then((foo) => {});',
        errors: expecting([
            [0, 7, 0, 10, always]
        ])
    },
    {
        code: 'a.then(foo => a);',
        output: 'a.then((foo) => a);',
        errors: expecting([
            [0, 7, 0, 10, always]
        ])
    },
    {
        code: 'a(foo => { if (true) {}; });',
        output: 'a((foo) => { if (true) {}; });',
        errors: expecting([
            [0, 2, 0, 5, always]
        ])
    },
    {
        code: 'a(async foo => { if (true) {}; });',
        output: 'a(async (foo) => { if (true) {}; });',
        errors: expecting([
            [0, 8, 0, 11, always]
        ])
    }
]);
ruleTester.addTestGroup('invalid-as-needed', 'should fail with as-needed on', [
    {
        code: '(a) => a',
        output: 'a => a',
        options: ['as-needed'],
        errors: expecting([
            [0, 0, 0, 3, asNeeded]
        ])
    },
    {
        code: 'async (a) => a',
        output: 'async a => a',
        options: ['as-needed'],
        errors: expecting([
            [0, 6, 0, 9, asNeeded]
        ])
    }
]);
ruleTester.addTestGroup('invalid-require-for-block', 'should fail when using option', [
    {
        code: 'a => {}',
        output: '(a) => {}',
        options: ['as-needed', { requireForBlockBody: true }],
        errors: expecting([
            [0, 0, 0, 1, blockNoParens]
        ])
    },
    {
        code: '(a) => a',
        output: 'a => a',
        options: ['as-needed', { requireForBlockBody: true }],
        errors: expecting([
            [0, 0, 0, 3, block]
        ])
    },
    {
        code: 'async a => {}',
        output: 'async (a) => {}',
        options: ['as-needed', { requireForBlockBody: true }],
        errors: expecting([
            [0, 6, 0, 7, blockNoParens]
        ])
    },
    {
        code: 'async (a) => a',
        output: 'async a => a',
        options: ['as-needed', { requireForBlockBody: true }],
        errors: expecting([
            [0, 6, 0, 9, block]
        ])
    }
]);
ruleTester.addTestGroup('tslint-valid-always', 'should pass with tslint tests', [
    'var a = (a) => {};',
    'var b = (a: number) => {};',
    'var c = (a, b) => {};',
    'var f = (...rest) => {};',
    'var f = a: number => {};',
    'class Foo { a: (a) =>{} }',
    'var bar = <T>(method: () => T) => { method(); };',
    'var barbar = <T>(method: (a: any) => T) => { method(""); };',
    'var barbarbar = <T>(method: (a) => T) => { method(""); };',
    'var piyo = <T, U>(method: () => T) => { method(); };',
    'var barbarbar = <T>(method: (a: T) => T = (x) => x) => { method(""); };',
    'const validAsync = async (param: any) => {};',
    'const validAsync = async (param) => {};'
]);
ruleTester.addTestGroup('tslint-invalid-always', 'should fail with tslint tests', [
    { code: 'var e = (a => {})(1);', errors: expecting([[0, 9, 0, 10, always]]) },
    { code: 'var f = ab => {};', errors: expecting([[0, 8, 0, 10, always]]) },
    {
        code: 'var barbarbar = <T>(method: (a: T) => T = x => x) => { method(""); };',
        errors: expecting([[0, 42, 0, 43, always]])
    }
]);
ruleTester.addTestGroup('generics-as-needed', 'should not complain with generics', [
    {
        code: 'var barbarbar = <T>(method: (a) => T) => { method(""); };',
        options: ['as-needed']
    },
    {
        code: 'var barbarbar = <T>(method: (a) => T) => { method(""); };',
        options: ['as-needed', { requireForBlockBody: true }]
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyQXJyb3dQYXJlbnNSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUE2RDtBQUU3RCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUV0RCxJQUFNLE1BQU0sR0FBRyxzREFBc0QsQ0FBQztBQUN0RSxJQUFNLFFBQVEsR0FBRyx5REFBeUQsQ0FBQztBQUMzRSxJQUFNLEtBQUssR0FBRyw0RkFBNEYsQ0FBQztBQUMzRyxJQUFNLGFBQWEsR0FBRyxzRkFBc0YsQ0FBQztBQUU3RyxtQkFBbUIsTUFBa0Q7SUFFbkUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1FBQ3BCLE1BQU0sQ0FBQztZQUNMLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2YsYUFBYSxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLFdBQVcsRUFBRSxJQUFJLHFCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLEVBQUU7SUFDekUsVUFBVTtJQUNWLFdBQVc7SUFDWCxVQUFVO0lBQ1YsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixxQ0FBcUM7SUFDckMsMkNBQTJDO0NBQzVDLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsK0JBQStCLEVBQUU7SUFDaEYsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ3pDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUs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LENBQUMsRUFBRTtJQUM3RSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3pFO1FBQ0UsSUFBSSxFQUFFLHVFQUF1RTtRQUM3RSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUM1QztDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsbUNBQW1DLEVBQUU7SUFDakY7UUFDRSxJQUFJLEVBQUUsMkRBQTJEO1FBQ2pFLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUN2QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLDJEQUEyRDtRQUNqRSxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN0RDtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL3RlckFycm93UGFyZW5zUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
