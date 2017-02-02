"use strict";
var helper_1 = require("./helper");
var rule = 'no-extra-boolean-cast';
var scripts = {
    valid: [
        'if (!foo) {}',
        'const x = !foo;',
        'const foo = true;',
        'const foo = !!bar;',
        'function foo() { return !!bar }',
        'const foo = bar ? !!x : !!y;`'
    ],
    invalid: [
        'if (!!foo) {}',
        'const foo = !!!bar;',
        'const foo = !!bar ? baz : bat;',
        'const foo = Boolean(!!bar);',
        'const foo = new Boolean(!!bar);',
        'while (!!foo) {}',
        'do {} while (!!foo);',
        'for (; !!foo; ) {}`',
        'if (!!lastUpdated && !!savedJwt) {}'
    ]
};
describe(rule, function test() {
    it('should pass when using valid boolean casts outside of a boolean context', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using redundant boolean casts in a boolean context', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9FeHRyYUJvb2xlYW5DYXN0UnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcsdUJBQXVCLENBQUM7QUFDckMsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCxjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsaUNBQWlDO1FBQ2pDLCtCQUErQjtLQUNoQztJQUNELE9BQU8sRUFBRTtRQUNQLGVBQWU7UUFDZixxQkFBcUI7UUFDckIsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtRQUM3QixpQ0FBaUM7UUFDakMsa0JBQWtCO1FBQ2xCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIscUNBQXFDO0tBQ3RDO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxJQUFJLEVBQUU7SUFDYixFQUFFLENBQUMseUVBQXlFLEVBQUU7UUFDNUUsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxRUFBcUUsRUFBRTtRQUN4RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9ub0V4dHJhQm9vbGVhbkNhc3RSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
