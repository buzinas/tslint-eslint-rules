"use strict";
var helper_1 = require("./helper");
var rule = 'no-control-regex';
var scripts = {
    'valid': [
        'var regex = /x1f/',
        'var regex = new RegExp("x1f")',
        'var regex = RegExp("x1f")',
        'new RegExp("[")',
        'RegExp("[")',
        'new (function foo(){})("\\x1f")'
    ],
    'invalid': [
        'var regex = /\\\u001f/',
        'var regex = new RegExp("\\x1f")',
        'var regex = RegExp("\\x1f")'
    ]
};
describe(rule, function test() {
    it('should pass when there are no control characters in regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when there are control characters in regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9Db250cm9sUmVnZXhSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG1DQUFvQztBQUVwQyxJQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUNoQyxJQUFNLE9BQU8sR0FBRztJQUNkLE9BQU8sRUFBRTtRQUNQLG1CQUFtQjtRQUNuQiwrQkFBK0I7UUFDL0IsMkJBQTJCO1FBQzNCLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2IsaUNBQWlDO0tBQ2xDO0lBQ0QsU0FBUyxFQUFFO1FBQ1Qsd0JBQXdCO1FBQ3hCLGlDQUFpQztRQUNqQyw2QkFBNkI7S0FDOUI7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNiLEVBQUUsQ0FBQyx5RUFBeUUsRUFBRTtRQUM1RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNFQUFzRSxFQUFFO1FBQ3pFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vQ29udHJvbFJlZ2V4UnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
