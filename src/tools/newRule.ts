import { toCamelCase } from '../readme/rules';
import * as fs from 'fs';
import * as path from 'path';

export function writeNewRule(ruleKebabName: string): void {
  const ruleCamelName = toCamelCase(ruleKebabName);
  const ruleOptionsName = `I${toCamelCase(ruleKebabName, true)}Options`;
  const ruleTemplate = `import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = '${ruleKebabName}';
interface ${ruleOptionsName} {
  // Add the options properties
}

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

  private formatOptions(ruleArguments: any[]): ${ruleOptionsName} {
    // handle the ruleArguments
    return {};
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    // Convert the 'ruleArguments' into a useful format before passing it to the constructor of AbstractWalker.
    const opt = this.formatOptions(this.ruleArguments);
    const walker = new RuleWalker(sourceFile, this.ruleName, opt);
    return this.applyWithWalker(walker);
  }
}

// NOTE: please remove this comment after reading: https://palantir.github.io/tslint/develop/custom-rules/walker-design.html
class RuleWalker extends Lint.AbstractWalker<${ruleOptionsName}> {
  public walk(sourceFile: ts.SourceFile) {
  }
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

// Change this function to better test the rule. In some cases the message never changes so we
// can avoid passing it in. See other rule tests for examples.
function expecting(errors: [string, number, number][]): Failure[] {
  return errors.map((err) => {
    let message = err[0];
    return {
      failure: message,
      startPosition: new Position(err[1]),
      endPosition: new Position(err[2])
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
