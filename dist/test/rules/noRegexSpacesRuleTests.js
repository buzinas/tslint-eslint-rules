"use strict";
var helper_1 = require("./helper");
var rule = 'no-regex-spaces';
var scripts = {
    valid: [
        'var foo = /bar {3}baz/;',
        'var foo = /bar\t\t\tbaz/;'
    ],
    invalid: [
        'var foo = /bar    baz/;'
    ]
};
describe(rule, function test() {
    it('should pass when not using multiple spaces in regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using multiple spaces in regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9SZWdleFNwYWNlc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLGlCQUFpQixDQUFDO0FBQy9CLElBQU0sT0FBTyxHQUFHO0lBQ2QsS0FBSyxFQUFFO1FBQ0wseUJBQXlCO1FBQ3pCLDJCQUEyQjtLQUM1QjtJQUNELE9BQU8sRUFBRTtRQUNQLHlCQUF5QjtLQUMxQjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsSUFBSSxFQUFFO0lBQ2IsRUFBRSxDQUFDLG1FQUFtRSxFQUFFO1FBQ3RFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0RBQStELEVBQUU7UUFDbEUsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9SZWdleFNwYWNlc1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9Xb3JrL0RldmVsb3BtZW50L3dvcmtzcGFjZS90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
