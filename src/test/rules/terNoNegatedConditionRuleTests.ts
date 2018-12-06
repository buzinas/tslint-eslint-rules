import { RuleTester, Position } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/lib/rules/no-negated-condition.js

const ruleTester = new RuleTester('ter-no-negated-condition');

const noNegatedConditionError = {
  failure: 'Unexpected negated condition.',
  startPosition: new Position(0),
  endPosition: new Position(0)
};

ruleTester.addTestGroup('valid', 'should pass when condition is not negated or cannot be converted', [
  'if (a) {}',
  'if (a) {} else {}',
  'if (!a) {}',
  'if (!a) {} else if (b) {}',
  'if (!a) {} else if (b) {} else {}',
  'if (a == b) {}',
  'if (a == b) {} else {}',
  'if (a != b) {}',
  'if (a != b) {} else if (b) {}',
  'if (a != b) {} else if (b) {} else {}',
  'if (a !== b) {}',
  'if (a === b) {} else {}',
  'a ? b : c',
  '!a && b ? c : d'
]);

ruleTester.addTestGroup('invalid', 'should fail condition is negated and second branch is available', [
  {
    code: 'if (!a) {;} else {;}',
    errors: [noNegatedConditionError]
  },
  {
    code: 'if (a != b) {;} else {;}',
    errors: [noNegatedConditionError]
  },
  {
    code: 'if (a !== b) {;} else {;}',
    errors: [noNegatedConditionError]
  },
  {
    code: '!a ? b : c',
    errors: [noNegatedConditionError]
  },
  {
    code: 'a != b ? c : d',
    errors: [noNegatedConditionError]
  },
  {
    code: 'a !== b ? c : d',
    errors: [noNegatedConditionError]
  }
]);

ruleTester.runTests();
