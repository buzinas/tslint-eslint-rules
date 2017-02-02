"use strict";
var helper_1 = require("./helper");
var rule = 'no-constant-condition';
var scripts = {
    variables: [
        'const a = "1"; const b = "2"; if (+a > +b) {}',
        'const a = { value: true }; if (a.value) {}',
        'if (foo === true) {}',
        'if (!foo === true) {}',
        'if (bar === false) {}',
        'if (!bar === false) {}',
        'if (baz) {}',
        'if (!baz) {}',
        'if (qux == true) {}',
        'if (!(qux == true)) {}',
        'if (true == x) {}',
        'if (!(true == x)) {}',
        'if (false === y) {}',
        'if (!(false === y)) {}',
        'if (y === x) {}',
        'if (!(y === x)) {}',
        'if (x > 0) {}',
        'if (!(x > 0)) {}',
        'if (100 > x) {}',
        'if (!(100 > x)) {}',
        'if (x === -y) {}',
        'if (!(x === -y)) {}',
        'if (len--)'
    ],
    booleans: [
        'if (true) {}',
        'if (!true) {}',
        'if (false) {}',
        'if (!false) {}'
    ],
    numbers: [
        'if (0) {}',
        'if (!0) {}',
        'if (1) {}',
        'if (!1) {}',
        'if (100) {}',
        'if (!100) {}',
        'if (30.33) {}',
        'if (!30.33) {}',
        'if (-1) {}',
        'if (!-1) {}',
        'if (x = 1) {}',
        'if (!(x = 1)) {}'
    ],
    objects: [
        'if ({}) {}',
        'if (!{}) {}',
        'if ({ foo: "bar" }) {}',
        'if (!{ foo: "bar" }) {}'
    ],
    arrays: [
        'if ([]) {}',
        'if (![]) {}',
        'if ([1, 2, 3]) {}',
        'if (![1, 2, 3]) {}'
    ],
    binary: [
        'if (true === true) {}',
        'if (!(true === true)) {}',
        'if (100 > -5) {}',
        'if (!(100 > -5)) {}',
        'if (false != true) {}',
        'if (!(false != true)) {}',
        'if (false !== true && true === true) {}',
        'if (!(false !== true && true === true)) {}',
        'if (!(false !== true) && true === true) {}',
        'if (false !== true && !(true === true)) {}',
        'if (!(false !== true) && !(true === true)) {}'
    ],
    ternary: [
        'let foo = true ? 1 : 0;',
        'let foo = !true ? 1 : 0;',
        'let bar = false ? "a" : "b";',
        'let bar = !false ? "a" : "b";',
        'let baz = 100 ? "x" : "z";',
        'let baz = !100 ? "x" : "z";',
        'let qux = true === true ? "p": "w";',
        'let qux = !(true === true) ? "p": "w";'
    ],
    whileVars: [
        'while (y === x) {}',
        'while (!(y === x)) {}',
        'while (x > -5) {}',
        'while (!(x > -5)) {}',
        'while (100 > x) {}',
        'while (!(100 > x)) {}',
        'while (foo) {}',
        'while (!foo) {}'
    ],
    whileLiterals: [
        'while (true) {}',
        'while (!true) {}',
        'while (false) {}',
        'while (!false) {}',
        'while (-5) {}',
        'while (!-5) {}',
        'while (1) {}',
        'while (!1) {}',
        'while ({}) {}',
        'while (!{}) {}',
        'while ([]) {}',
        'while (![]) {}'
    ],
    doWhileVars: [
        'do {} while (y === x);',
        'do {} while (!(y === x);',
        'do {} while (x > -5);',
        'do {} while (!(x > -5));',
        'do {} while (100 > x);',
        'do {} while (!(100 > x));',
        'do {} while (foo);',
        'do {} while (!foo);'
    ],
    doWhileLiterals: [
        'do {} while (true);',
        'do {} while (!true);',
        'do {} while (false);',
        'do {} while (!false);',
        'do {} while (-5);',
        'do {} while (!-5);',
        'do {} while (1);',
        'do {} while (!1);',
        'do {} while ({});',
        'do {} while (!{});',
        'do {} while ([]);',
        'do {} while (![]);'
    ],
    forVars: [
        'for (;y === x;) {}',
        'for (;(!y === x);) {}',
        'for (;x > -5;) {}',
        'for (;!(x > -5);) {}',
        'for (;100 > x;) {}',
        'for (;!(100 > x);) {}',
        'for (;foo;) {}',
        'for (;!foo;) {}'
    ],
    forLiterals: [
        'for (;true;) {}',
        'for (;!true;) {}',
        'for (;false;) {}',
        'for (;!false;) {}',
        'for (;-5;) {}',
        'for (;!-5;) {}',
        'for (;1;) {}',
        'for (;!1;) {}',
        'for (;{};) {}',
        'for (;!{};) {}',
        'for (;[];) {}',
        'for (;![];) {}'
    ]
};
describe(rule, function test() {
    it('should pass when using variables', function testVariables() {
        helper_1.makeTest(rule, scripts.variables, true);
    });
    it('should fail with literal booleans', function testBooleans() {
        helper_1.makeTest(rule, scripts.booleans, false);
    });
    it('should fail with literal numbers', function testNumbers() {
        helper_1.makeTest(rule, scripts.numbers, false);
    });
    it('should fail with literal objects', function testObjects() {
        helper_1.makeTest(rule, scripts.objects, false);
    });
    it('should fail with literal arrays', function testArrays() {
        helper_1.makeTest(rule, scripts.arrays, false);
    });
    it('should fail with literal on both sides of a binary expression', function testBinary() {
        helper_1.makeTest(rule, scripts.binary, false);
    });
    it('should fail on ternary literals (booleans / numbers)', function testTernary() {
        helper_1.makeTest(rule, scripts.ternary, false);
    });
    it('should pass on while variables', function testWhileVariables() {
        helper_1.makeTest(rule, scripts.whileVars, true);
    });
    it('should fail on while literals', function testWhileLiterals() {
        helper_1.makeTest(rule, scripts.whileLiterals, false);
    });
    it('should pass on do-while variables', function testDoWhileVariables() {
        helper_1.makeTest(rule, scripts.doWhileVars, true);
    });
    it('should fail on do-while literals', function testDoWhileLiterals() {
        helper_1.makeTest(rule, scripts.doWhileLiterals, false);
    });
    it('should pass on for variables', function testForVariables() {
        helper_1.makeTest(rule, scripts.forVars, true);
    });
    it('should fail on for literals', function testForLiterals() {
        helper_1.makeTest(rule, scripts.forLiterals, false);
    });
    it('should pass for literals in loops when checkLoops is false', function testCheckLoopsFalse() {
        var config = {
            rules: { 'no-constant-condition': [true, { checkLoops: false }] }
        };
        helper_1.makeTest(rule, scripts.forLiterals, true, config);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9Db25zdGFudENvbmRpdGlvblJ1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLHVCQUF1QixDQUFDO0FBQ3JDLElBQU0sT0FBTyxHQUFHO0lBQ2QsU0FBUyxFQUFFO1FBQ1QsK0NBQStDO1FBQy9DLDRDQUE0QztRQUM1QyxzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIsYUFBYTtRQUNiLGNBQWM7UUFDZCxxQkFBcUI7UUFDckIsd0JBQXdCO1FBQ3hCLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLHdCQUF3QjtRQUN4QixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLFlBQVk7S0FDYjtJQUNELFFBQVEsRUFBRTtRQUNSLGNBQWM7UUFDZCxlQUFlO1FBQ2YsZUFBZTtRQUNmLGdCQUFnQjtLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNQLFdBQVc7UUFDWCxZQUFZO1FBQ1osV0FBVztRQUNYLFlBQVk7UUFDWixhQUFhO1FBQ2IsY0FBYztRQUNkLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLGFBQWE7UUFDYixlQUFlO1FBQ2Ysa0JBQWtCO0tBQ25CO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsWUFBWTtRQUNaLGFBQWE7UUFDYix3QkFBd0I7UUFDeEIseUJBQXlCO0tBQzFCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sWUFBWTtRQUNaLGFBQWE7UUFDYixtQkFBbUI7UUFDbkIsb0JBQW9CO0tBQ3JCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sdUJBQXVCO1FBQ3ZCLDBCQUEwQjtRQUMxQixrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2QiwwQkFBMEI7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QUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBR0gsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ25DLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7UUFDbEMsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQztJQUdILEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtRQUN0QyxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtDQUFrQyxFQUFFO1FBQ3JDLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFHSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7UUFDakMsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtRQUNoQyxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDREQUE0RCxFQUFFO1FBQy9ELElBQU0sTUFBTSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtTQUNsRSxDQUFDO1FBRUYsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vQ29uc3RhbnRDb25kaXRpb25SdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiQzpcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
