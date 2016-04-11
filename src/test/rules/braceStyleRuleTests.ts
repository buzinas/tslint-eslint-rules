/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'brace-style';
const scripts = {
  onetbs: {
    valid: [
      `function foo() {
        return true;
      }`,

      `if (foo) {
        bar();
      }`,

      `if (foo) {
        bar();
      } else {
        baz();
      }`,

      `try {
        somethingRisky();
      } catch(e) {
        handleError();
      }`,

      // when there are no braces, there are no problems
      `if (foo) bar();
      else if (baz) boom();`
    ],
    invalid: [
      `function foo()
      {
        return true;
      }`,

      `if (foo)
      {
        bar();
      }`,

      `try
      {
        somethingRisky();
      } catch(e)
      {
        handleError();
      }`,

      `if (foo) {
        bar();
      }
      else {
        baz();
      }`,

      `if (foo) {
        bar(); 
      } else { baz(); }`
    ]
  },
  stroustrup: {
    valid: [
      `function foo() {
        return true;
      }`,

      `if (foo) {
        bar();
      }`,

      `if (foo) {
        bar();
      }
      else {
        baz();
      }`,

      `try {
        somethingRisky();
      }
      catch(e) {
        handleError();
      }`,

      // when there are no braces, there are no problems
      `if (foo) bar();
      else if (baz) boom();`
    ],
    invalid: [
      `function foo()
      {
        return true;
      }`,

      `if (foo)
      {
        bar();
      }`,

      `try
      {
        somethingRisky();
      } catch(e)
      {
        handleError();
      }`,

      `if (foo) {
        bar();
      } else {
        baz();
      }`
    ]
  },
  allman: {
    valid: [
      `function foo()
      {
        return true;
      }`,

      `if (foo)
      {
        bar();
      }`,

      `if (foo)
      {
        bar();
      }
      else
      {
        baz();
      }`,

      `try
      {
        somethingRisky();
      }
      catch(e)
      {
        handleError();
      }`,

      // when there are no braces, there are no problems
      `if (foo) bar();
      else if (baz) boom();`
    ],
    invalid: [
      `function foo() {
        return true;
      }`,

      `if (foo)
      {
        bar(); }`,

      `try
      {
        somethingRisky();
      } catch(e)
      {
        handleError();
      }`,

      `if (foo) {
        bar();
      } else {
        baz();
      }`
    ]
  },
  allowSingleLine: {
    onetbs: {
      valid: [
        `function nop() { return; }`,

        `if (foo) { bar(); }`,

        `if (foo) { bar(); } else { baz(); }`,

        `try { somethingRisky(); } catch(e) { handleError(); }`,

        `if (foo) { 
          bar();    
        } else { baz(); }`,

        `try { 
          foo();
        } catch(e) { bar(); }`
      ]
    },
    stroustrup: {
      valid: [
        `function nop() { return; }`,

        `if (foo) { bar(); }`,

        `if (foo) { bar(); }
        else { baz(); }`,

        `try { somethingRisky(); }
        catch(e) { handleError(); }`,

        `if (foo) { 
          bar();
        } 
        else { baz(); }`,

        `try { 
          foo();
        } 
        catch(e) { bar(); }`
      ]
    },
    allman: {
      valid: [
        `function nop() { return; }`,

        `if (foo) { bar(); }`,

        `if (foo) { bar(); }
        else { baz(); }`,

        `try { somethingRisky(); }
        catch(e) { handleError(); }`,

        `if (foo) 
        { 
          bar();
        } else { baz(); }`,

        `try  
        { 
          foo();
        } 
        catch(e) { bar(); }`
      ]
    }
  }
};

describe(rule, function test() {
  const onetbsConfig = { rules: { 'brace-style': [true, '1tbs'] } };
  const stroustrupConfig = { rules: { 'brace-style': [true, 'stroustrup'] } };
  const allmanConfig = { rules: { 'brace-style': [true, 'allman'] } };
  const onetbsConfigWithException = { rules: { 'brace-style': [true, 'stroustrup', { allowSingleLine: true }] } };
  const stroustrupConfigWithException = { rules: { 'brace-style': [true, '1tbs', { allowSingleLine: true }] } };
  const allmanConfigWithException = { rules: { 'brace-style': [true, 'allman', { allowSingleLine: true }] } };

  it('should pass when "1tbs"', function testVariables() {
    makeTest(rule, scripts.onetbs.valid, true, onetbsConfig);
  });

  it('should fail when "1tbs"', function testVariables() {
    makeTest(rule, scripts.onetbs.invalid, false, onetbsConfig);
  });

  it('should pass when "stroustrup"', function testVariables() {
    makeTest(rule, scripts.stroustrup.valid, true, stroustrupConfig);
  });

  it('should fail when "stroustrup"', function testVariables() {
    makeTest(rule, scripts.stroustrup.invalid, false, stroustrupConfig);
  });

  it('should pass when "allman"', function testVariables() {
    makeTest(rule, scripts.allman.valid, true, allmanConfig);
  });

  it('should fail when "allman"', function testVariables() {
    makeTest(rule, scripts.allman.invalid, false, allmanConfig);
  });

  it('should pass when "1tbs" and "allowSingleLine" is true', function testVariables() {
    makeTest(rule, scripts.allowSingleLine.onetbs.valid, true, onetbsConfigWithException);
  });

  it('should pass when "stroustrup" and "allowSingleLine" is true', function testVariables() {
    makeTest(rule, scripts.allowSingleLine.stroustrup.valid, true, stroustrupConfigWithException);
  });

  it('should pass when "allman" and "allowSingleLine" is true', function testVariables() {
    makeTest(rule, scripts.allowSingleLine.allman.valid, true, allmanConfigWithException);
  });

  // all scripts in the "allowSingleLine" object should *only* pass if 
  // allowSingleLine === true, so let's check to make sure they 
  // fail if allowSingleLine === false
  it('should fail when "1tbs"', function testVariables() {
    makeTest(rule, scripts.allowSingleLine.onetbs.valid, false, onetbsConfig);
  });

  it('should fail when "stroustrup"', function testVariables() {
    makeTest(rule, scripts.allowSingleLine.stroustrup.valid, false, stroustrupConfig);
  });

  it('should fail when "allman"', function testVariables() {
    makeTest(rule, scripts.allowSingleLine.allman.valid, false, allmanConfig);
  });
});
