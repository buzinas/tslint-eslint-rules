"use strict";
var helper_1 = require("./helper");
var rule = 'no-invalid-regexp';
var scripts = {
    valid: [
        'RegExp(\'\')',
        'RegExp()',
        'RegExp(\'.\', \'g\')',
        'new RegExp(\'.\')',
        'new RegExp',
        'new RegExp(\'.\', \'im\')',
        'global.RegExp(\'\\\\\')'
    ],
    invalid: [
        'RegExp(\'[\');',
        'RegExp(\'.\', \'z\');',
        'new RegExp(\')\');'
    ]
};
describe(rule, function test() {
    it('should pass when using valid regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using invalid regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9JbnZhbGlkUmVnZXhwUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLENBQUM7QUFDakMsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCxjQUFjO1FBQ2QsVUFBVTtRQUNWLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLDJCQUEyQjtRQUMzQix5QkFBeUI7S0FDMUI7SUFDRCxPQUFPLEVBQUU7UUFDUCxnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLG9CQUFvQjtLQUNyQjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsSUFBSSxFQUFFO0lBQ2IsRUFBRSxDQUFDLGtEQUFrRCxFQUFFO1FBQ3JELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7UUFDdkQsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9JbnZhbGlkUmVnZXhwUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1dvcmsvRGV2ZWxvcG1lbnQvd29ya3NwYWNlL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
