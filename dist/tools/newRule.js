"use strict";
var rules_1 = require("../readme/rules");
var fs = require("fs");
var path = require("path");
function writeNewRule(ruleKebabName) {
    var ruleCamelName = rules_1.toCamelCase(ruleKebabName);
    var ruleTemplate = "import * as ts from 'typescript';\nimport * as Lint from 'tslint';\n\nconst RULE_NAME = '" + ruleKebabName + "';\n\nexport class Rule extends Lint.Rules.AbstractRule {\n  public static metadata: Lint.IRuleMetadata = {\n    ruleName: RULE_NAME,\n    description: '',\n    rationale: Lint.Utils.dedent`\n      `,\n    optionsDescription: Lint.Utils.dedent`\n      `,\n    options: {\n      type: 'array',\n      items: [{\n        type: 'object',\n        properties: {\n        },\n        additionalProperties: false\n      }],\n      maxLength: 1\n    },\n    optionExamples: [\n      Lint.Utils.dedent`\n        \"${RULE_NAME}\": [true]\n        `,\n      Lint.Utils.dedent`\n        \"${RULE_NAME}\": [true, {\n        }]\n        `\n    ],\n    typescriptOnly: false,\n    type: ''  // one of \"functionality\" | \"maintainability\" | \"style\" | \"typescript\"\n  };\n\n  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {\n    const walker = new RuleWalker(sourceFile, this.getOptions());\n    return this.applyWithWalker(walker);\n  }\n}\n\nclass RuleWalker extends Lint.RuleWalker {\n  // ** RULE IMPLEMENTATION HERE **\n}\n";
    var projectDir = path.dirname(__dirname);
    var rulePath = path.join(projectDir, "../src/rules/" + ruleCamelName + "Rule.ts");
    fs.writeFileSync(rulePath, ruleTemplate, { flag: 'wx' });
}
exports.writeNewRule = writeNewRule;
function writeNewRuleTests(ruleKebabName) {
    var ruleCamelName = rules_1.toCamelCase(ruleKebabName);
    var testTemplate = "import { RuleTester, Failure, Position, dedent } from './ruleTester';\n\nconst ruleTester = new RuleTester('" + ruleKebabName + "');\n\nfunction expecting(errors: string[]]): Failure[] {\n  return errors.map((err) => {\n    let message = '';\n    return {\n      failure: message,\n      startPosition: new Position(err[0]),\n      endPosition: new Position()\n    };\n  });\n}\n\nruleTester.addTestGroup('group-name', 'should ...', [\n  {\n    code: dedent`\n     // code goes here\n     `,\n    options: [],\n    errors: expecting([\n    ])\n  }\n]);\n\nruleTester.runTests();\n";
    var projectDir = path.dirname(__dirname);
    var testPath = path.join(projectDir, "../src/test/rules/" + ruleCamelName + "RuleTests.ts");
    fs.writeFileSync(testPath, testTemplate, { flag: 'wx' });
}
exports.writeNewRuleTests = writeNewRuleTests;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvb2xzL25ld1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUE4QztBQUM5Qyx1QkFBeUI7QUFDekIsMkJBQTZCO0FBRTdCLHNCQUE2QixhQUFxQjtJQUNoRCxJQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELElBQU0sWUFBWSxHQUFHLDhGQUdGLGFBQWEsOGdDQTBDakMsQ0FBQztJQUNBLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsa0JBQWdCLGFBQWEsWUFBUyxDQUFDLENBQUM7SUFDL0UsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQW5ERCxvQ0FtREM7QUFFRCwyQkFBa0MsYUFBcUI7SUFDckQsSUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxJQUFNLFlBQVksR0FBRyxpSEFFYyxhQUFhLHdjQXlCakQsQ0FBQztJQUNBLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsdUJBQXFCLGFBQWEsaUJBQWMsQ0FBQyxDQUFDO0lBQ3pGLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFqQ0QsOENBaUNDIiwiZmlsZSI6InRvb2xzL25ld1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
