/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'no-duplicate-case';
const scripts = {
  duplicateNumbers: [
    `switch (a) {
       case 1:
         break;
       case 2:
         break;
       case 1:
         break;
       default:
         break;
     }`
  ],
  duplicateStrings: [
    `switch (a) {
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
     }`
  ],
  duplicateVariables: [
    `switch (a) {
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
     }`
  ],
  noDupes: [
    `switch (a) {
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
     }`,
    `switch (a) {
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
     }`,
    `switch (a) {
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
  ]
};

describe(rule, function test() {
  it('should pass when there is no duplicate cases', function testNoDupes() {
    makeTest(rule, scripts.noDupes, true);
  });

  it('should fail when there is duplicate numbers', function testDupNumbers() {
    makeTest(rule, scripts.duplicateNumbers, false);
  });

  it('should fail when there is duplicate strings', function testDupStrings() {
    makeTest(rule, scripts.duplicateStrings, false);
  });

  it('should fail when there is duplicate variables', function testDupVariables() {
    makeTest(rule, scripts.duplicateVariables, false);
  });
});
