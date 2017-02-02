"use strict";
var helper_1 = require("./helper");
var rule = 'block-spacing';
var scripts = {
    always: {
        valid: [
            "function foo() { return true; }",
            "if (foo) { bar = 0; }",
            "switch (myVar) { case 1: return true; }",
            "function foo() {}",
            "function foo() { }"
        ],
        invalid: [
            "function foo() {return true;}",
            "if (foo) { bar = 0;}",
            "switch (myVar) { case 1: return true;}",
            "switch (myVar) {case 1: return true; }",
            "switch (myVar) {case 1: return true;}"
        ]
    },
    never: {
        valid: [
            "function foo() {return true;}",
            "if (foo) {bar = 0;}",
            "switch (myVar) {case 1: return true;}",
            "function foo() {}",
            "function foo() { }"
        ],
        invalid: [
            "function foo() { return true; }",
            "if (foo) { bar = 0;}",
            "switch (myVar) { case 1: return true;}",
            "switch (myVar) {case 1: return true; }",
            "switch (myVar) { case 1: return true; }"
        ]
    }
};
describe(rule, function test() {
    var alwaysConfig = { rules: { 'block-spacing': [true, 'always'] } };
    var neverConfig = { rules: { 'block-spacing': [true, 'never'] } };
    it('should pass when "always" and there are spaces inside brackets', function testVariables() {
        helper_1.makeTest(rule, scripts.always.valid, true, alwaysConfig);
    });
    it('should fail when "always" and there are not spaces inside brackets', function testVariables() {
        helper_1.makeTest(rule, scripts.always.invalid, false, alwaysConfig);
    });
    it('should pass when "never" and there are not spaces inside brackets', function testVariables() {
        helper_1.makeTest(rule, scripts.never.valid, true, neverConfig);
    });
    it('should fail when "never" and there are spaces inside brackets', function testVariables() {
        helper_1.makeTest(rule, scripts.never.invalid, false, neverConfig);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvYmxvY2tTcGFjaW5nUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDO0FBQzdCLElBQU0sT0FBTyxHQUFHO0lBQ2QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1lBQ0wsaUNBQWlDO1lBQ2pDLHVCQUF1QjtZQUN2Qix5Q0FBeUM7WUFDekMsbUJBQW1CO1lBQ25CLG9CQUFvQjtTQUNyQjtRQUNELE9BQU8sRUFBRTtZQUNQLCtCQUErQjtZQUMvQixzQkFBc0I7WUFDdEIsd0NBQXdDO1lBQ3hDLHdDQUF3QztZQUN4Qyx1Q0FBdUM7U0FDeEM7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRTtZQUNMLCtCQUErQjtZQUMvQixxQkFBcUI7WUFDckIsdUNBQXVDO1lBQ3ZDLG1CQUFtQjtZQUNuQixvQkFBb0I7U0FDckI7UUFDRCxPQUFPLEVBQUU7WUFDUCxpQ0FBaUM7WUFDakMsc0JBQXNCO1lBQ3RCLHdDQUF3QztZQUN4Qyx3Q0FBd0M7WUFDeEMseUNBQXlDO1NBQzFDO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNiLElBQU0sWUFBWSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsZUFBZSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN0RSxJQUFNLFdBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLGVBQWUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7SUFFcEUsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO1FBQ25FLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvRUFBb0UsRUFBRTtRQUN2RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUVBQW1FLEVBQUU7UUFDdEUsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtEQUErRCxFQUFFO1FBQ2xFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvYmxvY2tTcGFjaW5nUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
