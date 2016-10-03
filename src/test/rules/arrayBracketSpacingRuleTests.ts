/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'array-bracket-spacing';
const scripts = {
  always: {
    valid: [
      `var arr = [ 'foo', bar' ];`,
      `var [ x, y ] = z;`,
      `var arr = [];`,
      `var arr = [ ];`,
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
      `var [ x, ...y ] = z;`
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
      `var [ ,,x, ] = z;`,
      `var arr = [ ];`
    ]
  },
  exceptions: {
    always: {
      singleValue: {
        valid: [
          `var foo = ['foo'];`,
          `var foo = [1];`,
          `var foo = [[ 1, 1 ]];`,
          `var foo = [{ 'foo': 'bar' }];`
        ],
        invalid: [
          `var foo = [ 'foo' ];`,
          `var foo = [ 'foo'];`,
          `var foo = ['foo' ];`,
          `var foo = [ 1 ];`,
          `var foo = [ 1];`,
          `var foo = [1 ];`,
          `var foo = [ [ 1, 2 ] ];'`,
          `var foo = [ { 'foo': 'bar' } ];`
        ]
      },
      objectsInArrays: {
        valid: [
          `var arr = [{ 'foo': 'bar' }];`,
          `var arr = [{
            'foo': 'bar'
          }];`
        ],
        invalid: [
          `var arr = [ { 'foo': 'bar' } ];`,
          `var arr = [ {
            'foo': 'bar'
          } ]`
        ]
      },
      arraysInArrays: {
        valid: [
          `var arr = [[ 1, 2 ], 2, 3, 4 ];`,
          `var arr = [[ 1, 2 ], 2, [ 3, 4 ]];`
        ],
        invalid: [
          `var arr = [ [ 1, 2 ], 2, 3, 4 ];`,
          `var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];`
        ]
      }
    }
  }
};

describe(rule, function test() {

  const alwaysConfig = { rules: { 'array-bracket-spacing': [true, 'always'] } };
  const neverConfig = { rules: { 'array-bracket-spacing': [true, 'never'] } };

  it('should pass when "always"', function testVariables() {
    makeTest(rule, scripts.always.valid, true, alwaysConfig);
  });

  it('should fail when "always"', function testVariables() {
    makeTest(rule, scripts.always.invalid, false, alwaysConfig);
  });

  it('should pass when "never"', function testVariables() {
    makeTest(rule, scripts.never.valid, true, neverConfig);
  });

  it('should fail when "never"', function testVariables() {
    makeTest(rule, scripts.never.invalid, false, neverConfig);
  });

  const singleValueExceptionConfig = {
    rules: {
      'array-bracket-spacing': [
        true,
        'always',
        { singleValue: false }
      ]
    }
  };

  it('should pass when "always" with the singleValue exception', function testVariables() {
    makeTest(rule, scripts.exceptions.always.singleValue.valid, true, singleValueExceptionConfig);
  });

  it('should fail when "always" with the singleValue exception', function testVariables() {
    makeTest(rule, scripts.exceptions.always.singleValue.invalid, false, singleValueExceptionConfig);
  });

  const objectsInArraysExceptionConfig = {
    rules: {
      'array-bracket-spacing': [
        true,
        'always',
        { objectsInArrays: false }
      ]
    }
  };

  it('should pass when "always" with the objectsInArrays exception', function testVariables() {
    makeTest(rule, scripts.exceptions.always.objectsInArrays.valid, true, objectsInArraysExceptionConfig);
  });

  it('should fail when "always" with the objectsInArrays exception', function testVariables() {
    makeTest(rule, scripts.exceptions.always.objectsInArrays.invalid, false, objectsInArraysExceptionConfig);
  });

  const arraysInArraysExceptionConfig = {
    rules: {
      'array-bracket-spacing': [
        true,
        'always',
        { arraysInArrays: false }
      ]
    }
  };

  it('should pass when "always" with the arraysInArrays exception', function testVariables() {
    makeTest(rule, scripts.exceptions.always.arraysInArrays.valid, true, arraysInArraysExceptionConfig);
  });

  it('should fail when "always" with the arraysInArrays exception', function testVariables() {
    makeTest(rule, scripts.exceptions.always.arraysInArrays.invalid, false, arraysInArraysExceptionConfig);
  });
});
