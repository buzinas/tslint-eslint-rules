/// <reference path='../../../typings/chai/chai.d.ts' />
import { expect } from 'chai';
import * as Lint from 'tslint';

const options: Lint.ILinterOptions = {
  fix: false,
  formatter: 'json',
  formattersDirectory: 'dist/formatters/',
  rulesDirectory: 'dist/rules/'
};

/**
 * @deprecated Use ruleTester
 */
export function testScript(rule: string, scriptText: string, config: any): boolean {
  const linter = new Lint.Linter(options);
  linter.lint(`${rule}.ts`, scriptText, Lint.Configuration.parseConfigFile(config));

  const failures = JSON.parse(linter.getResult().output);

  return failures.length === 0;
}

/**
 * @deprecated Use ruleTester
 */
export function makeTest(rule: string, scripts: Array<string>, expected: boolean, config?: { rules: {} }) {
  if (!config) {
    config = {
      rules: {}
    };

    config.rules[rule] = true;
  }

  scripts.forEach((code) => {
    const res = testScript(rule, code, config);
    expect(res).to.equal(expected, code);
  });
}
