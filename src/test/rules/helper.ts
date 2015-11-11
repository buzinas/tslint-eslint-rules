import * as ts from "tslint/node_modules/typescript";
import * as Lint from "tslint/lib/lint";

export function testScript(rule: string, scriptText: string) {
  const config = {
    rules: {
      [rule]: true
    }
  };

  const options: Lint.ILinterOptions = {
    formatter: 'json',
    configuration: config,
    rulesDirectory: 'dist/rules/',
    formattersDirectory: 'dist/formatters/'
  };

  const linter = new Lint.Linter(`${rule}.ts`, scriptText, options);
  const result = linter.lint();
  
  const failures = JSON.parse(result.output);
  
  return failures.length === 0;
}
