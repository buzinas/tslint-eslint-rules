"use strict";
var helper_1 = require("./helper");
var rule = 'no-duplicate-case';
var scripts = {
    duplicateNumbers: [
        "switch (a) {\n       case 1:\n         break;\n       case 2:\n         break;\n       case 1:\n         break;\n       default:\n         break;\n     }"
    ],
    duplicateStrings: [
        "switch (a) {\n       case 'foo':\n         break;\n       case 'bar':\n         break;\n       case 'baz':\n         break;\n       case 'bar':\n         break;\n       default:\n         break;\n     }"
    ],
    duplicateVariables: [
        "switch (a) {\n       case foo:\n         break;\n       case bar:\n         break;\n       case baz:\n         break;\n       case foo:\n         break;\n       default:\n         break;\n     }"
    ],
    noDupes: [
        "switch (a) {\n       case foo:\n         break;\n       case bar:\n         break;\n       case baz:\n         break;\n       case qux:\n         break;\n       case 'bar':\n         break;\n       default:\n         break;\n     }",
        "switch (a) {\n       case 'foo':\n         break;\n       case 'bar':\n         break;\n       case 'baz':\n         break;\n       case 'qux':\n         break;\n       default:\n         break;\n     }",
        "switch (a) {\n       case 0:\n         break;\n       case 1:\n         break;\n       case 2:\n         break;\n       case 3:\n         break;\n       default:\n         break;\n     }"
    ]
};
describe(rule, function test() {
    it('should pass when there is no duplicate cases', function testNoDupes() {
        helper_1.makeTest(rule, scripts.noDupes, true);
    });
    it('should fail when there is duplicate numbers', function testDupNumbers() {
        helper_1.makeTest(rule, scripts.duplicateNumbers, false);
    });
    it('should fail when there is duplicate strings', function testDupStrings() {
        helper_1.makeTest(rule, scripts.duplicateStrings, false);
    });
    it('should fail when there is duplicate variables', function testDupVariables() {
        helper_1.makeTest(rule, scripts.duplicateVariables, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9EdXBsaWNhdGVDYXNlUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLENBQUM7QUFDakMsSUFBTSxPQUFPLEdBQUc7SUFDZCxnQkFBZ0IsRUFBRTtRQUNoQiwySkFTRztLQUNKO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsNE1BV0c7S0FDSjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLG9NQVdHO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDUCx5T0FhRztRQUNILDRNQVdHO1FBQ0gsNExBV0c7S0FDSjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsSUFBSSxFQUFFO0lBQ2IsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO1FBQ2pELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkNBQTZDLEVBQUU7UUFDaEQsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFO1FBQ2hELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtRQUNsRCxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vRHVwbGljYXRlQ2FzZVJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
