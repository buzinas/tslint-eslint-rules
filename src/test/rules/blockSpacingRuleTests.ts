import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('block-spacing');

// Only checking if there should be a space or not
function expecting(errors: boolean[]): Failure[] {
  // true means there should be a space
  return errors.map((err) => {
    const status = err ? 'Requires a space' : 'Unexpected space(s)';
    return {
      failure: status,
      startPosition: new Position(),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('always-valid', 'passes with "always" and there are spaces inside brackets', [
  `function foo() { return true; }`,
  `if (foo) { bar = 0; }`,
  `switch (myVar) { case 1: return true; }`,
  `function foo() {}`,
  `function foo() { }`
]);

ruleTester.addTestGroup('always-invalid', 'fails with "always" and missing spaces inside brackets', [
  { code: `function foo() {return true;}`, errors: expecting([true]) },
  { code: `if (foo) { bar = 0;}`, errors: expecting([true]) },
  { code: `switch (myVar) { case 1: return true;}`, errors: expecting([true]) },
  { code: `switch (myVar) {case 1: return true; }`, errors: expecting([true]) },
  { code: `switch (myVar) {case 1: return true;}`, errors: expecting([true]) }
]);

ruleTester.addTestGroupWithConfig(
  'never-valid',
  'passes with "never" and missing spaces inside brackets',
  ['never'],
  [
    `function foo() {return true;}`,
    `if (foo) {bar = 0;}`,
    `switch (myVar) {case 1: return true;}`,
    `function foo() {}`,
    `function foo() { }`
  ]
);

ruleTester.addTestGroupWithConfig(
  'never-invalid',
  'fails with "never" and there are spaces inside brackets',
  ['never'],
  [
    { code: `function foo() { return true; }`, errors: expecting([false]) },
    { code: `if (foo) { bar = 0;}`, errors: expecting([false]) },
    { code: `switch (myVar) { case 1: return true;}`, errors: expecting([false]) },
    { code: `switch (myVar) {case 1: return true; }`, errors: expecting([false]) },
    { code: `switch (myVar) { case 1: return true; }`, errors: expecting([false]) }
  ]
);

ruleTester.runTests();
