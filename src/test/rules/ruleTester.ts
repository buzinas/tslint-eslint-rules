import { assert, expect } from 'chai';
import * as Lint from 'tslint';
import * as fs from 'fs';
import * as path from 'path';

const dedent = Lint.Utils.dedent;
const empty = '░';

class Position {
  private line: number | undefined;
  private character: number | undefined;
  private position: number | undefined;

  constructor(line?: number, character?: number, position?: number) {
    this.line = line;
    this.character = character;
    this.position = position;
  }

  /**
   * Returns the string representation of a Position in the form of `[line:char|pos]`. If
   * any of its properties is undefined an empty block will appear. For instance, if we only
   * provide only the line then the result will be `[line:░|░]`.
   * @returns {string}
   */
  public toString(): string {
    const line = this.line === undefined ? empty : this.line;
    const char = this.character === undefined ? empty : this.character;
    const pos = this.position === undefined ? empty : this.position;
    return `[${line}:${char}|${pos}]`;
  }

  /**
   * A comparable Position to the calling object is a Position that has the same undefined
   * properties. For instance, `new Position(1)` and `new Position(10, 2)` are not comparable
   * since the second position defines its character location.
   *
   * Returns a copy of the Position parameter object with some properties set to undefined. Those
   * properties are set to undefined only in the case the calling object has them to set to
   * undefined. Thus, the returned object will be comparable to the calling object.
   *
   * @param pos The object we wish to compare.
   * @returns {Position} A comparable position.
   */
  public getComparablePosition(obj: Position): Position {
    const line = this.line === undefined ? undefined : obj.line;
    const char = this.character === undefined ? undefined : obj.character;
    const pos = this.position === undefined ? undefined : obj.position;
    return new Position(line, char, pos);
  }
}

interface Failure {
  failure: string;
  startPosition: Position;
  endPosition: Position;
}

class LintFailure {
  private name: string;
  private ruleName: string;
  private failure: string;
  private startPosition: Position;
  private endPosition: Position;

  constructor(name: string, ruleName: string, failure: string, start?: Position, end?: Position) {
    this.name = name;
    this.ruleName = ruleName;
    this.failure = failure;
    this.startPosition = start || new Position();
    this.endPosition = end || new Position();
  }

  /**
   * Returns the string representation of the Failure object in the following form:
   *
   * ```
   * [name@{startPos -> endPos}] ruleName: failure
   * ```
   *
   * @returns {string}
   */
  public toString(): string {
    const pos = `${this.name}@{${this.startPosition} -> ${this.endPosition}}`;
    return `[${pos}] ${this.ruleName}: ${this.failure}`;
  }

  /**
   * Return a clone of the Failure where the start and end positions are comparable to the
   * ones of the calling Failure.
   * @param obj The Failure to compare.
   * @returns {Failure} A comparable Failure.
   */
  public getComparableFailure(obj: LintFailure): LintFailure {
    return new LintFailure(
      obj.name,
      obj.ruleName,
      obj.failure,
      this.startPosition.getComparablePosition(obj.startPosition),
      this.endPosition.getComparablePosition(obj.endPosition)
    );
  }
}

interface ITest {
  code: string;
  output?: string;
  options?: any;
  errors?: Failure[];
}

class Test {
  private name: string;
  private testFixer: boolean;
  public code: string;
  public output: string;
  public options: any;
  public errors: LintFailure[];

  constructor(
    name: string,
    code: string,
    output: string,
    options: any,
    errors: LintFailure[],
    testFixer: boolean = false
  ) {
    this.name = name;
    this.code = code;
    this.output = output;
    this.options = options;
    this.errors = errors;
    this.testFixer = testFixer;
  }

  public runTest(): void {
    const options: Lint.ILinterOptions = {
      fix: false,
      formatter: 'json',
      formattersDirectory: 'dist/formatters/',
      rulesDirectory: 'dist/rules/'
    };

    const linter = new Lint.Linter(options);
    linter.lint(this.name, this.code, this.options);
    const failures = JSON.parse(linter.getResult().output);
    this.compareErrors(
      this.errors || [],
      failures.map((error: any) => {
        const start = error.startPosition;
        const end = error.endPosition;
        return new LintFailure(
          error.name,
          error.ruleName,
          error.failure,
          new Position(start.line, start.character, start.position),
          new Position(end.line, end.character, end.position)
        );
      }),
      linter
    );
  }

  private compareErrors(
    expectedErrors: LintFailure[],
    foundErrors: LintFailure[],
    linter: Lint.Linter
  ): void {
    const expected = this.arrayDiff(expectedErrors, foundErrors);
    const found = this.arrayDiff(foundErrors, expectedErrors, false);

    const codeLines = this.code.split('\n');
    const total = codeLines.length.toString().length;
    const codeStr = codeLines.map((x, i) => `     ${this.pad(i, total)}| ${x}`).join('\n');
    const expectedStr = expected.length ? `Expected:\n       ${expected.join('\n       ')}` : '';
    const foundStr = found.length ? `Found:\n       ${found.join('\n       ')}` : '';
    const msg = [
      `Error mismatch in ${this.name}:`,
      '',
      codeStr,
      '',
      `     ${expectedStr}`,
      '',
      `     ${foundStr}`,
      ''
    ].join('\n');
    assert(expected.length === 0 && found.length === 0, msg);
    if (this.testFixer && this.output) {
      const fixes = linter.getResult().failures.filter(f => f.hasFix()).map(f => f.getFix());
      const fixedCode = Lint.Fix.applyAll(this.code, fixes);
      const fixerMsg = [
        `Fixer output mismatch in ${this.name}:`,
        '',
        codeStr,
        '',
        '      '
      ].join('\n');
      expect(fixedCode).to.equal(this.output, fixerMsg);
    }
  }

  private arrayDiff(source: LintFailure[], target: LintFailure[], compareToTarget: boolean = true) {
    return source
      .filter(item => this.findIndex(target, item, compareToTarget) === -1)
      .map((x) => {
        if (compareToTarget) {
          return x.toString();
        } else {
          return target.length ? target[0].getComparableFailure(x).toString() : x.toString();
        }
      });
  }

  private findIndex(source: LintFailure[], error: LintFailure, compareToError: boolean = true) {
    const len = source.length;
    let k = 0;
    while (k < len) {
      if (compareToError && `${error}` === `${error.getComparableFailure(source[k])}`) {
        return k;
      } else if (`${source[k]}` === `${source[k].getComparableFailure(error)}`) {
        return k;
      }
      k++;
    }
    return -1;
  }

  private pad(n: number, width: number) {
    const numStr: string = n.toString();
    const padding: string = new Array(width - numStr.length + 1).join(' ');
    return numStr.length >= width ? numStr : padding + numStr;
  }
}

class TestGroup {
  public name: string;
  public ruleName: string;
  public description: string;
  public tests: Test[];

  constructor(
    name: string,
    description: string,
    ruleName: string,
    tests: (ITest | string)[],
    testFixer: boolean = false
  ) {
    this.name = name;
    this.ruleName = ruleName;
    this.description = description;
    this.tests = tests.map((test: ITest | string, index) => {
      const config: any = { rules: { [ruleName]: true } };
      const codeFileName = `${name}-${index}.ts`;
      if (typeof test === 'string') {
        return new Test(codeFileName, test, undefined, config, []);
      }
      if (test.options) {
        config.rules[ruleName] = [true, ...test.options];
      }
      const failures: LintFailure[] = (test.errors || []).map((error) => {
        return new LintFailure(
          codeFileName,
          ruleName,
          error.failure,
          error.startPosition,
          error.endPosition
        );
      });
      return new Test(codeFileName, test.code, test.output, config, failures, testFixer);
    });
  }
}

class RuleTester {
  private ruleName: string;
  private testFixer: boolean;
  private groups: TestGroup[] = [];

  constructor(ruleName: string, testFixer: boolean = false) {
    this.ruleName = ruleName;
    this.testFixer = testFixer;
  }

  public addTestGroup(name: string, description: string, tests: (ITest | string)[]): this {
    this.groups.push(new TestGroup(name, description, this.ruleName, tests, this.testFixer));
    return this;
  }

  public runTests(): void {
    const singleTest = JSON.parse(process.env.SINGLE_TEST || 'null');
    const runGroup = singleTest === null || singleTest.group === null;
    const runIndex = singleTest === null || singleTest.num === null;
    describe(this.ruleName, () => {
      this.groups.forEach((group) => {
        if (runGroup || group.name === singleTest.group) {
          it(group.description, () => {
            group.tests.forEach((test, index) => {
              if (runIndex || singleTest.num === index) {
                test.runTest();
              }
            });
          });
        }
      });
    });
  }
}

function readFixture(name: string): string {
  return fs.readFileSync(path.join(__dirname, `../../../src/test/fixtures/${name}`), 'utf8');
}

export {
  dedent,
  Position,
  Failure,
  TestGroup,
  RuleTester,
  readFixture,
}
