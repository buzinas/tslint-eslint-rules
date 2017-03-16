import { toCamelCase } from '../readme/rules';
import * as fs from 'fs';
import * as path from 'path';

export function writeNewRule(ruleKebabName: string): void {
  const ruleCamelName = toCamelCase(ruleKebabName);
  const ruleTemplate = `import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = '${ruleKebabName}';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: '',
    rationale: Lint.Utils.dedent\`
      \`,
    optionsDescription: Lint.Utils.dedent\`
      \`,
    options: {
      type: 'array',
      items: [{
        type: 'object',
        properties: {
        },
        additionalProperties: false
      }],
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent\`
        "\${RULE_NAME}": [true]
        \`,
      Lint.Utils.dedent\`
        "\${RULE_NAME}": [true, {
        }]
        \`
    ],
    typescriptOnly: false,
    type: ''  // one of "functionality" | "maintainability" | "style" | "typescript"
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.RuleWalker {
  // ** RULE IMPLEMENTATION HERE **
}
`;
  const projectDir = path.dirname(__dirname);
  const rulePath = path.join(projectDir, `../src/rules/${ruleCamelName}Rule.ts`);
  fs.writeFileSync(rulePath, ruleTemplate, { flag: 'wx' });
}

export function writeNewRuleTests(ruleKebabName: string): void {
  const ruleCamelName = toCamelCase(ruleKebabName);
  const testTemplate = `import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('${ruleKebabName}');

function expecting(errors: string[]]): Failure[] {
  return errors.map((err) => {
    let message = '';
    return {
      failure: message,
      startPosition: new Position(err[0]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('group-name', 'should ...', [
  {
    code: dedent\`
     // code goes here
     \`,
    options: [],
    errors: expecting([
    ])
  }
]);

ruleTester.runTests();
`;
  const projectDir = path.dirname(__dirname);
  const testPath = path.join(projectDir, `../src/test/rules/${ruleCamelName}RuleTests.ts`);
  fs.writeFileSync(testPath, testTemplate, { flag: 'wx' });
}
