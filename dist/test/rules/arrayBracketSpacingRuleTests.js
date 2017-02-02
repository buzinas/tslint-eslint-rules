"use strict";
var helper_1 = require("./helper");
var rule = 'array-bracket-spacing';
var scripts = {
    always: {
        valid: [
            "var arr = [ 'foo', bar' ];",
            "var [ x, y ] = z;",
            "var arr = [];",
            "var arr = [ ];",
            "var arr = [ 'foo', 'bar', 'baz' ];",
            "var arr = [ [ 'foo' ], 'bar', 'baz' ];",
            "var arr = [ 'foo',\n        'bar'\n      ];",
            "var arr = [\n        'foo',\n        'bar' ];",
            "var arr = [\n        'foo',\n        'bar',\n        'baz'\n      ];",
            "var [ x, y ] = z;",
            "var [ x,y ] = z;",
            "var [ x, ...y ] = z;"
        ],
        invalid: [
            "var arr = ['foo', 'bar'];",
            "var arr = ['foo', 'bar' ];",
            "var arr = [ ['foo'], 'bar' ];",
            "var arr = ['foo',\n        'bar'\n      ];",
            "var arr = [\n        'foo',\n        'bar'];",
            "var [x, y] = z;",
            "var [x,y] = z;",
            "var [x, ...y] = z;",
            "var [,,x,] = z;"
        ]
    },
    never: {
        valid: [
            "var arr = [];",
            "var arr = ['foo', 'bar', 'baz'];",
            "var arr = [['foo'], 'bar', 'baz'];",
            "var arr = [\n        'foo',\n        'bar',\n        'baz'\n      ];",
            "var arr = ['foo',\n        'bar'\n      ];",
            "var arr = [\n        'foo',\n        'bar'];",
            "var [x, y] = z;",
            "var [x,y] = z;",
            "var [x, ...y] = z;",
            "var [,,x,] = z;"
        ],
        invalid: [
            "var arr = [ 'foo', 'bar' ];",
            "var arr = ['foo', 'bar' ];",
            "var arr = [ ['foo'], 'bar'];",
            "var arr = [[ 'foo' ], 'bar'];",
            "var arr = [ 'foo',\n        'bar'\n      ];",
            "var [ x, y ] = z;",
            "var [ x,y ] = z;",
            "var [ x, ...y ] = z;",
            "var [ ,,x, ] = z;",
            "var arr = [ ];"
        ]
    },
    exceptions: {
        always: {
            singleValue: {
                valid: [
                    "var foo = ['foo'];",
                    "var foo = [1];",
                    "var foo = [[ 1, 1 ]];",
                    "var foo = [{ 'foo': 'bar' }];"
                ],
                invalid: [
                    "var foo = [ 'foo' ];",
                    "var foo = [ 'foo'];",
                    "var foo = ['foo' ];",
                    "var foo = [ 1 ];",
                    "var foo = [ 1];",
                    "var foo = [1 ];",
                    "var foo = [ [ 1, 2 ] ];'",
                    "var foo = [ { 'foo': 'bar' } ];"
                ]
            },
            objectsInArrays: {
                valid: [
                    "var arr = [{ 'foo': 'bar' }];",
                    "var arr = [{\n            'foo': 'bar'\n          }];"
                ],
                invalid: [
                    "var arr = [ { 'foo': 'bar' } ];",
                    "var arr = [ {\n            'foo': 'bar'\n          } ]"
                ]
            },
            arraysInArrays: {
                valid: [
                    "var arr = [[ 1, 2 ], 2, 3, 4 ];",
                    "var arr = [[ 1, 2 ], 2, [ 3, 4 ]];"
                ],
                invalid: [
                    "var arr = [ [ 1, 2 ], 2, 3, 4 ];",
                    "var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];"
                ]
            }
        }
    }
};
describe(rule, function test() {
    var alwaysConfig = { rules: { 'array-bracket-spacing': [true, 'always'] } };
    var neverConfig = { rules: { 'array-bracket-spacing': [true, 'never'] } };
    it('should pass when "always"', function testVariables() {
        helper_1.makeTest(rule, scripts.always.valid, true, alwaysConfig);
    });
    it('should fail when "always"', function testVariables() {
        helper_1.makeTest(rule, scripts.always.invalid, false, alwaysConfig);
    });
    it('should pass when "never"', function testVariables() {
        helper_1.makeTest(rule, scripts.never.valid, true, neverConfig);
    });
    it('should fail when "never"', function testVariables() {
        helper_1.makeTest(rule, scripts.never.invalid, false, neverConfig);
    });
    var singleValueExceptionConfig = {
        rules: {
            'array-bracket-spacing': [
                true,
                'always',
                { singleValue: false }
            ]
        }
    };
    it('should pass when "always" with the singleValue exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.singleValue.valid, true, singleValueExceptionConfig);
    });
    it('should fail when "always" with the singleValue exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.singleValue.invalid, false, singleValueExceptionConfig);
    });
    var objectsInArraysExceptionConfig = {
        rules: {
            'array-bracket-spacing': [
                true,
                'always',
                { objectsInArrays: false }
            ]
        }
    };
    it('should pass when "always" with the objectsInArrays exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.objectsInArrays.valid, true, objectsInArraysExceptionConfig);
    });
    it('should fail when "always" with the objectsInArrays exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.objectsInArrays.invalid, false, objectsInArraysExceptionConfig);
    });
    var arraysInArraysExceptionConfig = {
        rules: {
            'array-bracket-spacing': [
                true,
                'always',
                { arraysInArrays: false }
            ]
        }
    };
    it('should pass when "always" with the arraysInArrays exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.arraysInArrays.valid, true, arraysInArraysExceptionConfig);
    });
    it('should fail when "always" with the arraysInArrays exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.arraysInArrays.invalid, false, arraysInArraysExceptionConfig);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvYXJyYXlCcmFja2V0U3BhY2luZ1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLHVCQUF1QixDQUFDO0FBQ3JDLElBQU0sT0FBTyxHQUFHO0lBQ2QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1lBQ0wsNEJBQTRCO1lBQzVCLG1CQUFtQjtZQUNuQixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLG9DQUFvQztZQUNwQyx3Q0FBd0M7WUFDeEMsNkNBRUc7WUFDSCwrQ0FFVztZQUNYLHNFQUlHO1lBQ0gsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixzQkFBc0I7U0FDdkI7UUFDRCxPQUFPLEVBQUU7WUFDUCwyQkFBMkI7WUFDM0IsNEJBQTRCO1lBQzVCLCtCQUErQjtZQUMvQiw0Q0FFRztZQUNILDhDQUVVO1lBQ1YsaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQixvQkFBb0I7WUFDcEIsaUJBQWlCO1NBQ2xCO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxlQUFlO1lBQ2Ysa0NBQWtDO1lBQ2xDLG9DQUFvQztZQUNwQyxzRUFJRztZQUNILDRDQUVHO1lBQ0gsOENBRVU7WUFDVixpQkFBaUI7WUFDakIsZ0JBQWdCO1lBQ2hCLG9CQUFvQjtZQUNwQixpQkFBaUI7U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDUCw2QkFBNkI7WUFDN0IsNEJBQTRCO1lBQzVCLDhCQUE4QjtZQUM5QiwrQkFBK0I7WUFDL0IsNkNBRUc7WUFDSCxtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLHNCQUFzQjtZQUN0QixtQkFBbUI7WUFDbkIsZ0JBQWdCO1NBQ2pCO0tBQ0Y7SUFDRCxVQUFVLEVBQUU7UUFDVixNQUFNLEVBQUU7WUFDTixXQUFXLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFO29CQUNMLG9CQUFvQjtvQkFDcEIsZ0JBQWdCO29CQUNoQix1QkFBdUI7b0JBQ3ZCLCtCQUErQjtpQkFDaEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLDBCQUEwQjtvQkFDMUIsaUNBQWlDO2lCQUNsQzthQUNGO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLEtBQUssRUFBRTtvQkFDTCwrQkFBK0I7b0JBQy9CLHVEQUVJO2lCQUNMO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxpQ0FBaUM7b0JBQ2pDLHdEQUVJO2lCQUNMO2FBQ0Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFO29CQUNMLGlDQUFpQztvQkFDakMsb0NBQW9DO2lCQUNyQztnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asa0NBQWtDO29CQUNsQyxzQ0FBc0M7aUJBQ3ZDO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxJQUFJLEVBQUU7SUFFYixJQUFNLFlBQVksR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLHVCQUF1QixFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM5RSxJQUFNLFdBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLHVCQUF1QixFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUU1RSxFQUFFLENBQUMsMkJBQTJCLEVBQUU7UUFDOUIsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzlCLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM5RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtRQUM3QixpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7UUFDN0IsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBTSwwQkFBMEIsR0FBRztRQUNqQyxLQUFLLEVBQUU7WUFDTCx1QkFBdUIsRUFBRTtnQkFDdkIsSUFBSTtnQkFDSixRQUFRO2dCQUNSLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTthQUN2QjtTQUNGO0tBQ0YsQ0FBQztJQUVGLEVBQUUsQ0FBQywwREFBMEQsRUFBRTtRQUM3RCxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBQ2hHLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBEQUEwRCxFQUFFO1FBQzdELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDbkcsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFNLDhCQUE4QixHQUFHO1FBQ3JDLEtBQUssRUFBRTtZQUNMLHVCQUF1QixFQUFFO2dCQUN2QixJQUFJO2dCQUNKLFFBQVE7Z0JBQ1IsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFO2FBQzNCO1NBQ0Y7S0FDRixDQUFDO0lBRUYsRUFBRSxDQUFDLDhEQUE4RCxFQUFFO1FBQ2pFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLDhCQUE4QixDQUFDLENBQUM7SUFDeEcsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOERBQThELEVBQUU7UUFDakUsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsOEJBQThCLENBQUMsQ0FBQztJQUMzRyxDQUFDLENBQUMsQ0FBQztJQUVILElBQU0sNkJBQTZCLEdBQUc7UUFDcEMsS0FBSyxFQUFFO1lBQ0wsdUJBQXVCLEVBQUU7Z0JBQ3ZCLElBQUk7Z0JBQ0osUUFBUTtnQkFDUixFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUU7YUFDMUI7U0FDRjtLQUNGLENBQUM7SUFFRixFQUFFLENBQUMsNkRBQTZELEVBQUU7UUFDaEUsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUN0RyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2REFBNkQsRUFBRTtRQUNoRSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3pHLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9hcnJheUJyYWNrZXRTcGFjaW5nUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1dvcmsvRGV2ZWxvcG1lbnQvd29ya3NwYWNlL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
