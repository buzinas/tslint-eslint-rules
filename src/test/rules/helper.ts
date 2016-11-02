/// <reference path='../../../typings/chai/chai.d.ts' />
import { expect, assert } from 'chai';
import * as Lint from 'tslint/lib/lint';

export interface IScriptError {
  message: string;
  line?: number;
}
export interface IScript {
  code: string;
  options?: any[];
  errors?: IScriptError[];
}
export type IScripts = (IScript|string)[];

function arrayDiff(source, target) {
  return source.filter(item => target.indexOf(item) === -1);
}

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
  const line = errors[0] ? 'line' in errors[0] : false;

  if (failures.length !== errors.length) {
    const errorMsgs = failures.map((x) => {
      const start = `(${x.startPosition.line})`;
      return `${start} ${x.failure}\n`;
    });
    const msg = `Expected ${errors.length} error(s) in:

     -------
     ${scriptText}
     -------

     Found ${failures.length} error(s):

       ${errorMsgs.join('       ')}
    `;
    assert.fail(failures.length, errors.length, msg);
  } else {
    const expectedErrorMsgs = errors.map((x) => {
      const start = line ? `(${x.line})` : '-';
      return `${start} ${x.message}\n`;
    });
    const actualErrorMsgs = failures.map((x) => {
      const start = line ? `(${x.startPosition.line})` : '-';
      return `${start} ${x.failure}\n`;
    });
    const expected = arrayDiff(expectedErrorMsgs, actualErrorMsgs);
    const found = arrayDiff(actualErrorMsgs, expectedErrorMsgs);
    const msg = `Error mismatch in:

     -------
     ${scriptText}
     -------

     Expected:

       ${expected.join('       ')}

     Found:

       ${found.join('       ')}
    `;
    assert(expected.length === 0 && found.length === 0, msg);
  }
}

export function runTest(rule: string, scripts: IScripts) {
  scripts.forEach(item => {
    const code: string = typeof item === 'string' ? item : item.code;
    const config: any = { rules: { [rule]: true } };
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
