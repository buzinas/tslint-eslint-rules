import { RuleTester, Failure, Position, dedent } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/tests/lib/rules/handle-callback-err.js

const ruleTester = new RuleTester('handle-callback-err');

const error: Failure = {
  failure: 'Expected error to be handled',
  startPosition: new Position(),
  endPosition: new Position()
};

ruleTester.addTestGroup('standard-pass', 'should pass with standard config', [
  'function(stream) {}',
  dedent`
    function loadData (err, data) {
      if (err) {
          console.log(err.stack);
      }
      doSomething();
    }`,
  dedent`
    function loadData (Err, data) {
      if (Err) {
          console.log(Err.stack);
      }
      doSomething();
    }`,
  dedent`
    function test (cb) {
      doSomething(function (err) {
        cb(err)
      })
    }`,
  `function handle (arg, err) {}`
]);

ruleTester.addTestGroup('standard-fail', 'should fail with standard config', [
  {
    code: `function(err, stream) { stream.on('done', function(){exit(0)} }`,
    errors: [error]
  },
  {
    code: `function loadData (err, data) { doSomething(); }`,
    errors: [error]
  },
  {
    code: dedent`
      test(function (err) {
        console.log('hello world')
      })`,
    errors: [error]
  },
  { code: `test(err => undefined)`, errors: [error] },
  { code: `const cb = (err) => null`, errors: [error] },
  { code: `var cb = function (err) {}`, errors: [error] },
  { code: dedent`
    function loadData (err, data) {
      if (error) {
          console.log(error.stack);
      }
      doSomething();
    }`,
    errors: [error]
  }
]);

ruleTester.addTestGroup('custom-error-name-pass', 'should pass with custom error name', [
  { code: `function(errorMsg, stream) { console.error(errorMsg) }`, options: ['errorMsg'] },
  { code: `function(err, stream) { }`, options: ['errorMsg'] }
]);

ruleTester.addTestGroup('custom-error-name-fail', 'should fail with custom error name', [
  { code: `function(errorMsg, stream) { }`, options: ['errorMsg'], errors: [error] }
]);

ruleTester.addTestGroup('custom-error-regex-pass', 'should pass with custom error regex', [
  {
    code: `function(errorMsg, stream) { console.error(errorMsg) }`,
    options: ['^(err|error|errorMsg)$']
  }
]);

ruleTester.addTestGroup('custom-error-regex-fail', 'should fail with custom error regex', [
  {
    code: `function(err, stream) { }`,
    options: ['^(err|error|errorMsg)$'],
    errors: [error]
  },
  {
    code: `function(error, stream) { }`,
    options: ['^(err|error|errorMsg)$'],
    errors: [error]
  },
  {
    code: `function(errorMsg, stream) { }`,
    options: ['^(err|error|errorMsg)$'],
    errors: [error]
  }
]);

ruleTester.runTests();
