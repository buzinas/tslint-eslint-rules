"use strict";
var helper_1 = require("./helper");
var rule = 'valid-typeof';
var scripts = {
    valid: [
        'if (typeof foo === "string") {}',
        'if (typeof bar == \'undefined\') {}',
        'if (typeof foo === baz) {}',
        'if (typeof bar === typeof qux) {}'
    ],
    invalid: [
        'if (typeof foo === "strnig") {}',
        'if (typeof foo == "undefimed") {}',
        'if (typeof bar != \'nunber\') {}',
        'if (typeof bar !== "fucntion") {}'
    ]
};
describe(rule, function test() {
    it('should pass when using valid strings or variables', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using invalid strings', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdmFsaWRUeXBlb2ZSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG1DQUFvQztBQUVwQyxJQUFNLElBQUksR0FBRyxjQUFjLENBQUM7QUFDNUIsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCxpQ0FBaUM7UUFDakMscUNBQXFDO1FBQ3JDLDRCQUE0QjtRQUM1QixtQ0FBbUM7S0FDcEM7SUFFRCxPQUFPLEVBQUU7UUFDUCxpQ0FBaUM7UUFDakMsbUNBQW1DO1FBQ25DLGtDQUFrQztRQUNsQyxtQ0FBbUM7S0FDcEM7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNiLEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtRQUN0RCxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBQzNDLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL3ZhbGlkVHlwZW9mUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
