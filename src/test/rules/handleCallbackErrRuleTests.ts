/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'handle-callback-err';
const scripts = {
  standardConfig: {
    valid: [
      'function(stream) {}',
      `function loadData (err, data) {
        if (err) {
            console.log(err.stack);
        }
        doSomething();
    }`,
      `function loadData (Err, data) {
        if (Err) {
            console.log(Err.stack);
        }
        doSomething();
    }`
    ],
    invalid: [
      `function(err, stream) { stream.on('done', function(){exit(0)} }`,
      `function loadData (err, data) { doSomething(); }`,
      `function loadData (err, data) {
        if (error) {
            console.log(error.stack);
        }
        doSomething();
    }`
    ]
  },
  customErrorNameConfig: {
    valid: [
      `function(errorMsg, stream) { console.error(errorMsg) }`,
      `function(err, stream) { }`
    ],
    invalid: [
      `function(errorMsg, stream) { }`
    ]
  },
  customErrorRegexConfig: {
    valid: [
      `function(errorMsg, stream) { console.error(errorMsg) }`
    ],
    invalid: [
      `function(err, stream) { }`,
      `function(error, stream) { }`,
      `function(errorMsg, stream) { }`
    ]
  }
};

describe(rule, function test() {

  const standardConfig = { rules: { 'handle-callback-err': [true] } };
  const customErrorNameConfig = { rules: { 'handle-callback-err': [true, 'errorMsg'] } };
  const customErrorRegexConfig = { rules: { 'handle-callback-err': [true, '^(err|error|errorMsg)$'] } };

  it('should pass with standard config', function testVariables() {
    makeTest(rule, scripts.standardConfig.valid, true, standardConfig);
  });

  it('should fail with standard config', function testVariables() {
    makeTest(rule, scripts.standardConfig.invalid, false, standardConfig);
  });

  it('should pass with custom error name', function testVariables() {
    makeTest(rule, scripts.customErrorNameConfig.valid, true, customErrorNameConfig);
  });

  it('should fail with custom error name', function testVariables() {
    makeTest(rule, scripts.customErrorNameConfig.invalid, false, customErrorNameConfig);
  });

  it('should pass with custom error regex', function testVariables() {
    makeTest(rule, scripts.customErrorRegexConfig.valid, true, customErrorRegexConfig);
  });

  it('should fail with custom error regex', function testVariables() {
    makeTest(rule, scripts.customErrorRegexConfig.invalid, false, customErrorRegexConfig);
  });
});
