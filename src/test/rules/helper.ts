/// <reference path='../../../typings/chai/chai.d.ts' />

import {expect, assert} from 'chai';
import * as Lint from 'tslint/lib/lint';

export interface IScriptError {
  message: string;
}
export interface IScript {
  code: string;
  options?: any[];
  errors?: IScriptError[];
}
export type IScripts = (IScript|string)[];

export function testScript(rule: string, scriptText: string, config: Object): boolean {
  const options: Lint.ILinterOptions = {
    configuration: config,
    formatter: 'json',
    formattersDirectory: 'dist/formatters/',
    rulesDirectory: 'dist/rules/'
  };

  const linter = new Lint.Linter(`${rule}.ts`, scriptText, options);
  const result = linter.lint();

  const failures = JSON.parse(result.output);

  return failures.length === 0;
}

export function makeTest(rule: string, scripts: Array<string>, expected: boolean, config?: { rules: {} }) {
  if (!config) {
    config = {
      rules: {}
    };

    config.rules[rule] = true;
  }

  scripts.forEach(code => {
    const res = testScript(rule, code, config);
    expect(res).to.equal(expected, code);
  });
}

export function runScript(rule: string, scriptText: string, config: Object, errors: IScriptError[]): void {
  const options: Lint.ILinterOptions = {
    configuration: config,
    formatter: 'json',
    formattersDirectory: 'dist/formatters/',
    rulesDirectory: 'dist/rules/'
  };

  const linter = new Lint.Linter(`${rule}.ts`, scriptText, options);
  const result = linter.lint();

  const failures = JSON.parse(result.output);

  if (failures.length !== errors.length) {
    const errorMsgs = failures.map(x => `- ${x.failure}\n`).join('     ');
    const msg = `Expected ${errors.length} error(s) in:

     -------
     ${scriptText}
     -------
     
     Found ${failures.length} errors(s):

     ${errorMsgs}
    `;
    assert.fail(failures.length, errors.length, msg);
  } else {
    const expectedErrorMsgs = errors.map(x => `- ${x.message}\n`).join('       ');
    const actualErrorMsgs = failures.map(x => `- ${x.failure}\n`).join('       ');
    const msg = `Error mismatch in:

     -------
     ${scriptText}
     -------
     
     Expected:
     
       ${expectedErrorMsgs}
     
     Found:

       ${actualErrorMsgs}
    `;
    assert(actualErrorMsgs === expectedErrorMsgs, msg);
  }
}

export function runTest(rule: string, scripts: IScripts) {
  scripts.forEach(item => {
    const code: string = typeof item === 'string' ? item : item.code;
    const config = { rules: { [rule]: true } };
    const errors = [];
    if (typeof item === 'object') {
      if (item.options) {
        config.rules[rule] = [true, ...item.options];
      }
      if (item.errors) {
        errors.push(...item.errors);
      }
    }
    runScript(rule, code, config, errors);
  });
}
