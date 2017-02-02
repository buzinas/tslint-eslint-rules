"use strict";
var helper_1 = require("./helper");
var rule = 'object-curly-spacing';
var scripts = {
    always: {
        valid: [
            "const obj = { foo: 'bar' };",
            "const obj = { foo: { zoo: 'bar' } };",
            "const { x, y } = y;",
            "import { foo } from 'bar';",
            "export { foo };"
        ],
        invalid: [
            "const obj = {foo: 'bar'};",
            "const obj = {foo: { zoo: 'bar' } };",
            "const {x, y} = y;",
            "import {foo } from 'bar';",
            "export { foo};"
        ]
    },
    never: {
        valid: [
            "const obj = {foo: 'bar'};",
            "const obj = {foo: {zoo: 'bar'}};",
            "const {x, y} = y;",
            "import {foo} from 'bar';",
            "export {foo};"
        ],
        invalid: [
            "const obj = { foo: 'bar' };",
            "const obj = { foo: { zoo: 'bar' } };",
            "const { x, y } = y;",
            "import {foo } from 'bar';",
            "export { foo};"
        ]
    }
};
describe(rule, function test() {
    var alwaysConfig = { rules: { 'object-curly-spacing': [true, 'always'] } };
    var neverConfig = { rules: { 'object-curly-spacing': [true, 'never'] } };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvb2JqZWN0Q3VybHlTcGFjaW5nUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcsc0JBQXNCLENBQUM7QUFDcEMsSUFBTSxPQUFPLEdBQUc7SUFDZCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUU7WUFDTCw2QkFBNkI7WUFDN0Isc0NBQXNDO1lBQ3RDLHFCQUFxQjtZQUNyQiw0QkFBNEI7WUFDNUIsaUJBQWlCO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsMkJBQTJCO1lBQzNCLHFDQUFxQztZQUNyQyxtQkFBbUI7WUFDbkIsMkJBQTJCO1lBQzNCLGdCQUFnQjtTQUNqQjtLQUNGO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFO1lBQ0wsMkJBQTJCO1lBQzNCLGtDQUFrQztZQUNsQyxtQkFBbUI7WUFDbkIsMEJBQTBCO1lBQzFCLGVBQWU7U0FDaEI7UUFDRCxPQUFPLEVBQUU7WUFDUCw2QkFBNkI7WUFDN0Isc0NBQXNDO1lBQ3RDLHFCQUFxQjtZQUNyQiwyQkFBMkI7WUFDM0IsZ0JBQWdCO1NBQ2pCO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRTtJQUViLElBQU0sWUFBWSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzdFLElBQU0sV0FBVyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRTNFLEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtRQUNuRSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0VBQW9FLEVBQUU7UUFDdkUsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1FQUFtRSxFQUFFO1FBQ3RFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrREFBK0QsRUFBRTtRQUNsRSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL29iamVjdEN1cmx5U3BhY2luZ1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
