"use strict";
var helper_1 = require("./helper");
var rule = 'no-sparse-arrays';
var scripts = {
    valid: [
        'const items = [];',
        'const colors = [ "red", "blue", ];',
        'const arr = new Array(23);'
    ],
    invalid: [
        'const items = [,,];',
        'const arr = [,];',
        'const colors = [ "red",, "blue" ];',
        'const foo = ["tire", 1, , "small ball"];'
    ]
};
describe(rule, function test() {
    it('should pass when using valid arrays or trailing comma', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using double comma in arrays', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9TcGFyc2VBcnJheXNSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG1DQUFvQztBQUVwQyxJQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUNoQyxJQUFNLE9BQU8sR0FBRztJQUNkLEtBQUssRUFBRTtRQUNMLG1CQUFtQjtRQUNuQixvQ0FBb0M7UUFDcEMsNEJBQTRCO0tBQzdCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQixvQ0FBb0M7UUFDcEMsMENBQTBDO0tBQzNDO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxJQUFJLEVBQUU7SUFDYixFQUFFLENBQUMsdURBQXVELEVBQUU7UUFDMUQsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtRQUNsRCxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9ub1NwYXJzZUFycmF5c1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
