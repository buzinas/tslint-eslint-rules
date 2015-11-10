/// <reference path='../../../node_modules/tslint/typings/typescriptServices.d.ts' />
/// <reference path='../../../node_modules/tslint/lib/tslint.d.ts' />
/// <reference path='../../../typings/node/node.d.ts' />
const tslint = require('tslint');
Lint.Linter = tslint;

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
