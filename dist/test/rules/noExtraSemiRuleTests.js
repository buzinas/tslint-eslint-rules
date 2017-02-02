"use strict";
var helper_1 = require("./helper");
var rule = 'no-extra-semi';
var scripts = {
    valid: [
        'const x = 5;',
        'function foo() { }',
        'for(;;);',
        'while(0);',
        'do;while(0);',
        'for(a in b);',
        'for(a of b);',
        'class A { }',
        'const A = class { };',
        "\n      class A {\n        foo = 'bar';\n        a() {\n          this;\n        }\n      }\n    ",
        "\n      const A = class {\n        a() {\n          this;\n          this.foo = 'bar';\n        }\n      };\n    ",
        'class A { } a;'
    ],
    invalid: [
        'const x = 5;;',
        'let y = "foo";;',
        'const z = {};;',
        'function foo() {};',
        'for(;;);;',
        'while(0);;',
        'do;while(0);;',
        'for(a in b);;',
        'for(a of b);;',
        'class A { ; }',
        'class A { /*a*/; }',
        "\n      class A {\n        ; a() {\n\n        }\n      }\n    ",
        "\n      class A {\n        a() {\n\n        };\n      }\n    ",
        "\n      class A {\n        a() {\n\n        };\n        b() {\n\n        }\n      }\n    ",
        "\n      class A {\n        ; a() {\n\n        };\n        b() {\n\n        };\n      }\n    ",
        "\n      class A {\n        a() {\n\n        };\n        get b() {\n\n        }\n      }\n    "
    ]
};
describe(rule, function test() {
    it('should pass when no extra-semi colons exist', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when there are extra semi-colons', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9FeHRyYVNlbWlSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG1DQUFvQztBQUVwQyxJQUFNLElBQUksR0FBRyxlQUFlLENBQUM7QUFDN0IsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCxjQUFjO1FBQ2Qsb0JBQW9CO1FBQ3BCLFVBQVU7UUFDVixXQUFXO1FBQ1gsY0FBYztRQUNkLGNBQWM7UUFDZCxjQUFjO1FBQ2QsYUFBYTtRQUNiLHNCQUFzQjtRQUN0QixtR0FPQztRQUNELG1IQU9DO1FBQ0QsZ0JBQWdCO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLFdBQVc7UUFDWCxZQUFZO1FBQ1osZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixnRUFNQztRQUNELCtEQU1DO1FBQ0QsMkZBU0M7UUFDRCw4RkFTQztRQUNELCtGQVNDO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNiLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtRQUNoRCxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO1FBQ2pELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vRXh0cmFTZW1pUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6IkM6XFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
