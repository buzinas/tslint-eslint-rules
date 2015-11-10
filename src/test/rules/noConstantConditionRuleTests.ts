/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />

import {testScript} from './helper';
import {expect} from 'chai';

const rule = 'no-constant-condition';
const scripts = {
  variables: `if (foo === true) {}
              if (bar === false) {}
              if (baz) {}
              if (qux == true) {}
              if (true == x) {}
              if (false === y) {}
              if (y === x) {}
              if (x > 0) {}
              if (100 > x) {}`,

  booleans: `if (true) {}
             if (false) {}`,

  numbers: `if (0) {}
            if (1) {}
            if (100) {}
            if (30.33) {}
            if (-1) {}`,

  objects: `if ({}) {}
            if ({ foo: 'bar' }) {}`,

  arrays: `if ([]) {}
           if ([1, 2, 3]) {}`,

  binary: `if (true === true) {}
           if (100 > 5) {}
           if (false != true) {}
           if (false !== true && true === true) {}`,

  ternary: `let foo = true ? 1 : 0;
            let bar = false ? 'a' : 'b';
            let baz = 100 ? 'x' : 'z';
            let qux = true === true ? 'p': 'w'`,

  whileVars: `while (y === x) {}
              while (x > 0) {}
              while (100 > x) {}`,

  whileLiterals: `while (true) {}
                  while (false) {}
                  while (0) {}
                  while (1) {}
                  while ({}) {}
                  while ([]) {}`,

  doWhileVars: `do {} while (y === x);
                do {} while (x > 0);
                do {} while (100 > x);`,

  doWhileLiterals: `do {} while (true);
                    do {} while (false);
                    do {} while (0);
                    do {} while (1);
                    do {} while ({});
                    do {} while ([]);`,

  forVars: `for (;y === x;) {}
            for (;x > 0;) {}
            fpr (;100 > x;) {}`,

  forLiterals: `for (;true;) {}
                for (;false;) {}
                for (;0;) {}
                for (;1;) {}
                for (;{};) {}
                for (;[];) {}`
};
  
describe('no-constant-condition', function test() {
  // if-tests
  it('should pass when using variables', function testVariables() {
    const res = testScript(rule, scripts.variables);
    expect(res).to.be.true;
  });
  
  it('should fail with literal booleans', function testBooleans() {
    const res = testScript(rule, scripts.booleans);
    expect(res).to.be.false;
  });
  
  it('should fail with literal numbers', function testNumbers() {
    const res = testScript(rule, scripts.numbers);
    expect(res).to.be.false;
  });
  
  it('should fail with literal objects', function testObjects() {
    const res = testScript(rule, scripts.objects);
    expect(res).to.be.false;
  });
  
  it('should fail with literal arrays', function testArrays() {
    const res = testScript(rule, scripts.arrays);
    expect(res).to.be.false;
  });
  
  it('should fail with literal on both sides of a binary expression', function testBinary() {
    const res = testScript(rule, scripts.binary);
    expect(res).to.be.false;
  });
  
  // ternary tests
  it('should fail on ternary literals (booleans / numbers)', function testTernary() {
    const res = testScript(rule, scripts.ternary);
    expect(res).to.be.false;
  });
  
  // while-tests
  it('should pass on while variables', function testWhileVariables() {
    const res = testScript(rule, scripts.whileVars);
    expect(res).to.be.true;
  });
  
  it('should fail on while literals', function testWhileLiterals() {
    const res = testScript(rule, scripts.whileLiterals);
    expect(res).to.be.false;
  });
  
  // do-while-tests
  it('should pass on do-while variables', function testDoWhileVariables() {
    const res = testScript(rule, scripts.doWhileVars);
    expect(res).to.be.true;
  });
  
  it('should fail on do-while literals', function testDoWhileLiterals() {
    const res = testScript(rule, scripts.doWhileLiterals);
    expect(res).to.be.false;
  });
  
  // for-tests
  it('should pass on for variables', function testForVariables() {
    const res = testScript(rule, scripts.forVars);
    expect(res).to.be.true;
  });
  
  it('should fail on for literals', function testForLiterals() {
    const res = testScript(rule, scripts.forLiterals);
    expect(res).to.be.false;
  });
});
