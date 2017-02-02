"use strict";
var helper_1 = require("./helper");
var rule = 'no-unexpected-multiline';
var scripts = {
    valid: [
        '(x || y).aFunction()',
        '[a, b, c].forEach(doSomething)',
        "\n      var a = b;\n      (x || y).doSomething()\n    ",
        "\n      var a = b\n      ;(x || y).doSomething()\n    ",
        "\n      var a = b\n      void (x || y).doSomething()\n    ",
        "\n      var a = b;\n      [1, 2, 3].forEach(console.log)\n    ",
        "\n      var a = b\n      void [1, 2, 3].forEach(console.log)\n    ",
        "\n      'abc      (123)      '\n    ",
        "\n      var a = (\n      (123)\n      )\n    ",
        "\n      var x = {\n        foo: 1,\n        bar: 2,\n        baz: 3\n      };\n    ",
        "\n      function a() {\n\n      }\n    ",
        "\n      if (a === 1\n        && (b === 2 || c === 3)) { }\n    ",
        "\n      myArray\n        .map();\n    ",
        "\n      tag `hello world`\n    ",
        "\n      tag `hello ${expression} world`\n    "
    ],
    invalid: [
        "\n      var a = b\n      (x || y).doSomething()\n    ",
        "\n      var a = (a || b)\n      (x || y).doSomething()\n    ",
        "\n      var a = (a || b)\n      (x).doSomething()\n    ",
        "\n      var a = b\n      [a, b, c].forEach(doSomething)\n    ",
        "\n      var a = b\n          (x || y).doSomething()\n    ",
        "\n      var a = b\n        [a, b, c].forEach(doSomething)\n    ",
        "\n      tag\n        `hello world`\n    ",
        "\n      tag\n        `hello ${expression} world`\n    "
    ]
};
describe(rule, function test() {
    it('should pass when using expected parenthesis, brackets, or templates', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using unexpected parenthesis, brackets, or templates', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9VbmV4cGVjdGVkTXVsdGlsaW5lUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcseUJBQXlCLENBQUM7QUFDdkMsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCxzQkFBc0I7UUFDdEIsZ0NBQWdDO1FBQ2hDLHdEQUdDO1FBQ0Qsd0RBR0M7UUFDRCw0REFHQztRQUNELGdFQUdDO1FBQ0Qsb0VBR0M7UUFDRCxzQ0FJQztRQUNELCtDQUlDO1FBQ0QscUZBTUM7UUFDRCx5Q0FJQztRQUNELGlFQUdDO1FBQ0Qsd0NBR0M7UUFDRCxpQ0FFQztRQUNELCtDQUVDO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCx1REFHQztRQUNELDhEQUdDO1FBQ0QseURBR0M7UUFDRCwrREFHQztRQUNELDJEQUdDO1FBQ0QsaUVBR0M7UUFDRCwwQ0FHQztRQUNELHdEQUdDO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNiLEVBQUUsQ0FBQyxxRUFBcUUsRUFBRTtRQUN4RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVFQUF1RSxFQUFFO1FBQzFFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vVW5leHBlY3RlZE11bHRpbGluZVJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9Xb3JrL0RldmVsb3BtZW50L3dvcmtzcGFjZS90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
