/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'array-bracket-spacing';
const scripts = {
  always: {
    valid: [
      `var arr = [ 'foo', bar' ];`,
      `var [ x, y ] = z;`,
      `var arr = [];`,
      `var arr = [ 'foo', 'bar', 'baz' ];`,
      `var arr = [ [ 'foo' ], 'bar', 'baz' ];`,
      `var arr = [ 'foo',
        'bar'
      ];`,
      `var arr = [
        'foo',
        'bar' ];`,
      `var arr = [
        'foo',
        'bar',
        'baz'
      ];`,
      `var [ x, y ] = z;`,
      `var [ x,y ] = z;`,
      `var [ x, ...y ] = z;`,
      `var [ ,,x, ] = z;`
    ],
    invalid: [
      `var arr = ['foo', 'bar'];`,
      `var arr = ['foo', 'bar' ];`,
      `var arr = [ ['foo'], 'bar' ];`,
      `var arr = ['foo',
        'bar'
      ];`,
      `var arr = [
        'foo',
        'bar'];`,
      `var [x, y] = z;`,
      `var [x,y] = z;`,
      `var [x, ...y] = z;`,
      `var [,,x,] = z;`
    ]
  },
  never: {
    valid: [
      `var arr = [];`,
      `var arr = ['foo', 'bar', 'baz'];`,
      `var arr = [['foo'], 'bar', 'baz'];`,
      `var arr = [
        'foo',
        'bar',
        'baz'
      ];`,
      `var arr = ['foo',
        'bar'
      ];`,
      `var arr = [
        'foo',
        'bar'];`,
      `var [x, y] = z;`,
      `var [x,y] = z;`,
      `var [x, ...y] = z;`,
      `var [,,x,] = z;`
    ],
    invalid: [
      `var arr = [ 'foo', 'bar' ];`,
      `var arr = ['foo', 'bar' ];`,
      `var arr = [ ['foo'], 'bar'];`,
      `var arr = [[ 'foo' ], 'bar'];`,
      `var arr = [ 'foo',
        'bar'
      ];`,
      `var [ x, y ] = z;`,
      `var [ x,y ] = z;`,
      `var [ x, ...y ] = z;`,
      `var [ ,,x, ] = z;`
    ]
  }
};

describe(rule, function test() {

  const alwaysConfig = { rules: { 'array-bracket-spacing': [true, 'always'] } };
  const neverConfig = { rules: { 'array-bracket-spacing': [true, 'never'] } };

  it('should pass when there is space inside of array brackets for rule option "always"', function testVariables() {
    makeTest(rule, scripts.always.valid, true, alwaysConfig);
  });

  it('should fail when there is not a space inside of array brackets for rule option "always"', function testVariables() {
    makeTest(rule, scripts.always.invalid, false, alwaysConfig);
  });

  it('should pass when there is no space inside of array brackets for rule option "never"', function testVariables() {
    makeTest(rule, scripts.never.valid, true, neverConfig);
  });

  it('should fail when there are spaces inside of array brackets for rule option "never"', function testVariables() {
    makeTest(rule, scripts.never.invalid, false, neverConfig);
  });
});
