/// <reference path='../../../typings/chai/chai.d.ts' />
import { expect } from 'chai';
import * as Lint from 'tslint';
import { IOptions } from 'tslint';

const options: Lint.ILinterOptions = {
  fix: false,
  formatter: 'json',
  formattersDirectory: 'dist/formatters/',
  rulesDirectory: 'dist/rules/'
};

/**
 * @deprecated Use ruleTester
 */
export function testScript(rule: string, scriptText: string, config: Lint.Configuration.IConfigurationFile): boolean {
  const linter = new Lint.Linter(options);
  linter.lint(`${rule}.ts`, scriptText, config);

  const failures = JSON.parse(linter.getResult().output);

  return failures.length === 0;
}

/**
 * @deprecated Use ruleTester
 */
export function makeTest(rule: string, scripts: Array<string>, expected: boolean, config?: Lint.Configuration.IConfigurationFile) {
  if (!config) {
    config = {
      rulesDirectory: [],
      rules: new Map<string, Partial<IOptions>>(),
      extends: [],
      jsRules: new Map<string, Partial<IOptions>>()
    };

    config.rules[rule] = true;
  }

  scripts.forEach((code) => {
    const res = testScript(rule, code, config);
    expect(res).to.equal(expected, code);
  });
}
