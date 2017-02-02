"use strict";
var helper_1 = require("./helper");
var rule = 'use-isnan';
var scripts = {
    valid: [
        'if (isNaN(foo)) {}',
        'if (isNaN(NaN)) {}'
    ],
    invalid: [
        'if (foo == NaN) {}',
        'if (foo === NaN) {}',
        'if (foo != NaN) {}',
        'if (foo !== NaN) {}',
        'if (NaN == foo) {}',
        'if (NaN === foo) {}',
        'if (NaN != foo) {}',
        'if (NaN !== foo) {}',
        'if (NaN == NaN) {}',
        'if (NaN === NaN) {}',
        'if (NaN != NaN) {}',
        'if (NaN !== NaN) {}'
    ]
};
describe(rule, function test() {
    it('should pass when using isNaN', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when comparing to NaN', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdXNlSXNuYW5SdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG1DQUFvQztBQUVwQyxJQUFNLElBQUksR0FBRyxXQUFXLENBQUM7QUFDekIsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCxvQkFBb0I7UUFDcEIsb0JBQW9CO0tBQ3JCO0lBQ0QsT0FBTyxFQUFFO1FBQ1Asb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixxQkFBcUI7S0FDdEI7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNiLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUNqQyxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1FBQ3RDLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL3VzZUlzbmFuUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1dvcmsvRGV2ZWxvcG1lbnQvd29ya3NwYWNlL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
