/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />

import {testScript} from './helper';
import {expect} from 'chai';

const rule = 'no-duplicate-case';
const scripts = {
  duplicateNumbers: `switch (a) {
                       case 1:
                         break;
                       case 2:
                         break;
                       case 1:
                         break;
                       default:
                         break;
                     }`,
  duplicateStrings: `switch (a) {
                       case 'foo':
                         break;
                       case 'bar':
                         break;
                       case 'baz':
                         break;
                       case 'bar':
                         break;
                       default:
                         break;
                     }`,
  duplicateVariables: `switch (a) {
                         case foo:
                           break;
                         case bar:
                           break;
                         case baz:
                           break;
                         case foo:
                           break;
                         default:
                           break;
                       }`,
  noDupes: `switch (a) {
              case foo:
                break;
              case bar:
                break;
              case baz:
                break;
              case qux:
                break;
              case 'bar':
                break;
              default:
                break;
            }
            
            switch (a) {
              case 'foo':
                break;
              case 'bar':
                break;
              case 'baz':
                break;
              case 'qux':
                break;
              default:
                break;
            }
            
            switch (a) {
              case 0:
                break;
              case 1:
                break;
              case 2:
                break;
              case 3:
                break;
              default:
                break;
            }`
};
  
describe(rule, function test() {
  it('should pass when there is no duplicate cases', function testNoDupes() {
    const res = testScript(rule, scripts.noDupes);
    expect(res).to.equal(0);
  });
  
  it('should fail when there is duplicate numbers', function testDupNumbers() {
    const res = testScript(rule, scripts.duplicateNumbers);
    expect(res).to.equal(1);
  });
  
  it('should fail when there is duplicate strings', function testDupStrings() {
    const res = testScript(rule, scripts.duplicateStrings);
    expect(res).to.equal(1);
  });
  
  it('should fail when there is duplicate variables', function testDupVariables() {
    const res = testScript(rule, scripts.duplicateVariables);
    expect(res).to.equal(1);
  });
});
