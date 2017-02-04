/// <reference path='../../../typings/chai/chai.d.ts' />
import { expect } from 'chai';
import * as Lint from 'tslint';

const options: Lint.ILinterOptions = {
  fix: false,
  formatter: 'json',
  formattersDirectory: 'dist/formatters/',
  rulesDirectory: 'dist/rules/'
};

export function testScript(rule: string, scriptText: string, config: Object): boolean {
  const linter = new Lint.Linter(options);
  linter.lint(`${rule}.ts`, scriptText, config);

  const failures = JSON.parse(linter.getResult().output);

  return failures.length === 0;
}

export function fix(rule: string, scriptText: string, config: Object): string {
  const linter = new Lint.Linter(options);
  linter.lint(`${rule}.ts`, scriptText, config);

  const fixes = linter.getResult().failures.filter(f => f.hasFix()).map(f => f.getFix());
  return Lint.Fix.applyAll(scriptText, fixes);
}

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

export function makeFixTest(rule: string, inputs: Array<string>, outputs: Array<string>, config?: { rules: {} }) {
  if (!config) {
    config = {
      rules: {}
    };

    config.rules[rule] = true;
  }

  inputs.forEach((code, index) => {
    const res = fix(rule, code, config);
    expect(res).to.equal(outputs[index], code);
  });
}
