import { RuleTester, Failure, Position } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/lib/rules/array-bracket-spacing.js

const ruleTester = new RuleTester('array-bracket-spacing', true);

function expecting(errors: [number, number, boolean, 'before' | 'after'][]): Failure[] {
  // [line, column, true means there should be a space, 'before' | 'after']
  return errors.map((err) => {
    const status = err[2] ? 'A space is required' : 'There should be no space';
    const token = err[3] === 'before' ? ']' : '[';
    return {
      failure: `${status} ${err[3]} "${token}"`,
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'simple valid space test', [
  { code: 'var foo = obj[ 1 ]', options: ['always'] },
  { code: "var foo = obj[ 'foo' ];", options: ['always'] },
  { code: 'var foo = obj[ [ 1, 1 ] ];', options: ['always'] }
]);

ruleTester.addTestGroup('always-single', 'should pass single value', [
  { code: "var foo = ['foo']", options: ['always', { singleValue: false }] },
  { code: 'var foo = [2]', options: ['always', { singleValue: false }] },
  { code: 'var foo = [[ 1, 1 ]]', options: ['always', { singleValue: false }] },
  { code: "var foo = [{ 'foo': 'bar' }]", options: ['always', { singleValue: false }] },
  { code: 'var foo = [bar]', options: ['always', { singleValue: false }] }
]);

ruleTester.addTestGroup('always-obj-in-arr', 'should pass with objects in arrays', [
  { code: "var foo = [{ 'bar': 'baz' }, 1,  5 ];", options: ['always', { objectsInArrays: false }] },
  { code: "var foo = [ 1, 5, { 'bar': 'baz' }];", options: ['always', { objectsInArrays: false }] },
  { code: "var foo = [{\n'bar': 'baz', \n'qux': [{ 'bar': 'baz' }], \n'quxx': 1 \n}]", options: ['always', { objectsInArrays: false }] },
  { code: "var foo = [{ 'bar': 'baz' }]", options: ['always', { objectsInArrays: false }] },
  { code: "var foo = [{ 'bar': 'baz' }, 1, { 'bar': 'baz' }];", options: ['always', { objectsInArrays: false }] },
  { code: "var foo = [ 1, { 'bar': 'baz' }, 5 ];", options: ['always', { objectsInArrays: false }] },
  { code: "var foo = [ 1, { 'bar': 'baz' }, [{ 'bar': 'baz' }] ];", options: ['always', { objectsInArrays: false }] },
  { code: 'var foo = [ function(){} ];', options: ['always', { objectsInArrays: false }] }
]);

ruleTester.addTestGroup('valid-arr-in-arrs', 'should pass when always with arrays exceptions', [
  { code: 'var arr = [[ 1, 2 ], 2, 3, 4 ];', options: ['always', { arraysInArrays: false }] },
  { code: 'var arr = [[ 1, 2 ], [[[ 1 ]]], 3, 4 ];', options: ['always', { arraysInArrays: false }] },
  { code: 'var foo = [ arr[i], arr[j] ];', options: ['always', { arraysInArrays: false }] }
]);

ruleTester.addTestGroup('valid-arr-obj', 'should pass with array and obj exception', [
  { code: "var arr = [[ 1, 2 ], 2, 3, { 'foo': 'bar' }];", options: ['always', { arraysInArrays: false, objectsInArrays: false }] }

]);

ruleTester.addTestGroup('valid-arr-obj-single', 'should pass with all exceptions', [
  { code: "var arr = [[ 1, 2 ], [2], 3, { 'foo': 'bar' }];", options: ['always', { arraysInArrays: false, objectsInArrays: false, singleValue: false }] }
]);

ruleTester.addTestGroup('valid-always', 'should pass with always', [
  { code: 'obj[ foo ]', options: ['always'] },
  { code: 'obj[\nfoo\n]', options: ['always'] },
  { code: "obj[ 'foo' ]", options: ['always'] },
  { code: "obj[ 'foo' + 'bar' ]", options: ['always'] },
  { code: 'obj[ obj2[ foo ] ]', options: ['always'] },
  { code: 'obj.map(function(item) { return [\n1,\n2,\n3,\n4\n]; })', options: ['always'] },
  { code: "obj[ 'map' ](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['always'] },
  { code: "obj[ 'for' + 'Each' ](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['always'] },

  { code: 'var arr = [ 1, 2, 3, 4 ];', options: ['always'] },
  { code: 'var arr = [ [ 1, 2 ], 2, 3, 4 ];', options: ['always'] },
  { code: 'var arr = [\n1, 2, 3, 4\n];', options: ['always'] },
  { code: 'var foo = [];', options: ['always'] }
]);

ruleTester.addTestGroup('valid-ex', 'should with exceptions', [
  {
    code: "this.db.mappings.insert([\n { alias: 'a', url: 'http://www.amazon.de' },\n { alias: 'g', url: 'http://www.google.de' }\n], function() {});",
    options: ['always', { singleValue: false, objectsInArrays: true, arraysInArrays: true }]
  }
]);

ruleTester.addTestGroup('valid-always-destruct', 'should pass with always destructuring assignment', [
  { code: 'var [ x, y ] = z', options: ['always'] },
  { code: 'var [ x,y ] = z', options: ['always'] },
  { code: 'var [ x, y\n] = z', options: ['always'] },
  { code: 'var [\nx, y ] = z', options: ['always'] },
  { code: 'var [\nx, y\n] = z', options: ['always'] },
  { code: 'var [\nx, y\n] = z', options: ['always'] },
  { code: 'var [\nx,,,\n] = z', options: ['always'] },
  { code: 'var [ ,x, ] = z', options: ['always'] },
  { code: 'var [\nx, ...y\n] = z', options: ['always'] },
  { code: 'var [\nx, ...y ] = z', options: ['always'] },
  { code: 'var [[ x, y ], z ] = arr;', options: ['always', { arraysInArrays: false }] },
  { code: 'var [ x, [ y, z ]] = arr;', options: ['always', { arraysInArrays: false }] },
  { code: '[{ x, y }, z ] = arr;', options: ['always', { objectsInArrays: false }] },
  { code: '[ x, { y, z }] = arr;', options: ['always', { objectsInArrays: false }] }
]);

ruleTester.addTestGroup('never', 'should pass when never', [
  { code: 'obj[foo]', options: ['never'] },
  { code: "obj['foo']", options: ['never'] },
  { code: "obj['foo' + 'bar']", options: ['never'] },
  { code: "obj['foo'+'bar']", options: ['never'] },
  { code: 'obj[obj2[foo]]', options: ['never'] },
  { code: 'obj.map(function(item) { return [\n1,\n2,\n3,\n4\n]; })', options: ['never'] },
  { code: "obj['map'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
  { code: "obj['for' + 'Each'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
  { code: "obj['for' + 'Each'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
  { code: 'var arr = [1, 2, 3, 4];', options: ['never'] },
  { code: 'var arr = [[1, 2], 2, 3, 4];', options: ['never'] },
  { code: 'var arr = [\n1, 2, 3, 4\n];', options: ['never'] },
  { code: 'obj[\nfoo]', options: ['never'] },
  { code: 'obj[foo\n]', options: ['never'] },
  { code: 'var arr = [1,\n2,\n3,\n4\n];', options: ['never'] },
  { code: 'var arr = [\n1,\n2,\n3,\n4];', options: ['never'] }
]);

ruleTester.addTestGroup('never-destruct', 'should pass with destructuring assignment', [
  { code: 'var [x, y] = z', options: ['never'] },
  { code: 'var [x,y] = z', options: ['never'] },
  { code: 'var [x, y\n] = z', options: ['never'] },
  { code: 'var [\nx, y] = z', options: ['never'] },
  { code: 'var [\nx, y\n] = z', options: ['never'] },
  { code: 'var [\nx, y\n] = z', options: ['never'] },
  { code: 'var [\nx,,,\n] = z', options: ['never'] },
  { code: 'var [,x,] = z', options: ['never'] },
  { code: 'var [\nx, ...y\n] = z', options: ['never'] },
  { code: 'var [\nx, ...y] = z', options: ['never'] },
  { code: 'var [ [x, y], z] = arr;', options: ['never', { arraysInArrays: true }] },
  { code: 'var [x, [y, z] ] = arr;', options: ['never', { arraysInArrays: true }] },
  { code: '[ { x, y }, z] = arr;', options: ['never', { objectsInArrays: true }] },
  { code: '[x, { y, z } ] = arr;', options: ['never', { objectsInArrays: true }] }
]);

ruleTester.addTestGroup('never-single', 'should pass with never single exception', [
  { code: "var foo = [ 'foo' ]", options: ['never', { singleValue: true }] },
  { code: 'var foo = [ 2 ]', options: ['never', { singleValue: true }] },
  { code: 'var foo = [ [1, 1] ]', options: ['never', { singleValue: true }] },
  { code: "var foo = [ {'foo': 'bar'} ]", options: ['never', { singleValue: true }] },
  { code: 'var foo = [ bar ]', options: ['never', { singleValue: true }] }
]);

ruleTester.addTestGroup('never-obj-in-arr', 'should pass with never obj in arr exception', [
  { code: "var foo = [ {'bar': 'baz'}, 1, 5];", options: ['never', { objectsInArrays: true }] },
  { code: "var foo = [1, 5, {'bar': 'baz'} ];", options: ['never', { objectsInArrays: true }] },
  { code: "var foo = [ {\n'bar': 'baz', \n'qux': [ {'bar': 'baz'} ], \n'quxx': 1 \n} ]", options: ['never', { objectsInArrays: true }] },
  { code: "var foo = [ {'bar': 'baz'} ]", options: ['never', { objectsInArrays: true }] },
  { code: "var foo = [ {'bar': 'baz'}, 1, {'bar': 'baz'} ];", options: ['never', { objectsInArrays: true }] },
  { code: "var foo = [1, {'bar': 'baz'} , 5];", options: ['never', { objectsInArrays: true }] },
  { code: "var foo = [1, {'bar': 'baz'}, [ {'bar': 'baz'} ]];", options: ['never', { objectsInArrays: true }] },
  { code: 'var foo = [function(){}];', options: ['never', { objectsInArrays: true }] },
  { code: 'var foo = [];', options: ['never', { objectsInArrays: true }] }
]);
ruleTester.addTestGroup('never-arr-in-arr', 'should pass with never arr in arr exception', [
  { code: 'var arr = [ [1, 2], 2, 3, 4];', options: ['never', { arraysInArrays: true }] },
  { code: 'var foo = [arr[i], arr[j]];', options: ['never', { arraysInArrays: true }] },
  { code: 'var foo = [];', options: ['never', { arraysInArrays: true }] }
]);

ruleTester.addTestGroup('never-ex', 'should pass with never and other exceptions', [
  { code: "var arr = [ [1, 2], 2, 3, {'foo': 'bar'} ];", options: ['never', { arraysInArrays: true, objectsInArrays: true }] },
  { code: 'var arr = [ [1, 2], [ [ [ 1 ] ] ], 3, 4];', options: ['never', { arraysInArrays: true, singleValue: true }] }
]);

ruleTester.addTestGroup('no-warn', 'should not warn', [
  { code: 'var foo = {};', options: ['never'] },
  { code: 'var foo = [];', options: ['never'] },

  { code: "var foo = [{'bar':'baz'}, 1, {'bar': 'baz'}];", options: ['never'] },
  { code: "var foo = [{'bar': 'baz'}];", options: ['never'] },
  { code: "var foo = [{\n'bar': 'baz', \n'qux': [{'bar': 'baz'}], \n'quxx': 1 \n}]", options: ['never'] },
  { code: "var foo = [1, {'bar': 'baz'}, 5];", options: ['never'] },
  { code: "var foo = [{'bar': 'baz'}, 1,  5];", options: ['never'] },
  { code: "var foo = [1, 5, {'bar': 'baz'}];", options: ['never'] },
  { code: "var obj = {'foo': [1, 2]}", options: ['never'] }
]);

ruleTester.addTestGroup('with-types', 'should handle types', [
  { code: '([ a, b ]: Array<any>) => {}', options: ['always'] },
  { code: '([a, b]: Array< any >) => {}', options: ['never'] }
]);

ruleTester.addTestGroup('invalid', 'simple invalid space test', [
  {
    code: 'var foo = [ ]',
    output: 'var foo = []',
    options: ['never'],
    errors: expecting([
      [0, 10, false, 'after']
    ])
  }
]);

ruleTester.addTestGroup('invalid-obj-in-arr', 'should handle the objects in arrays exception', [
  {
    code: "var foo = [ { 'bar': 'baz' }, 1,  5];",
    output: "var foo = [{ 'bar': 'baz' }, 1,  5 ];",
    options: ['always', { objectsInArrays: false }],
    errors: expecting([
      [0, 10, false, 'after'],
      [0, 35, true, 'before']
    ])
  },
  {
    code: "var foo = [1, 5, { 'bar': 'baz' } ];",
    output: "var foo = [ 1, 5, { 'bar': 'baz' }];",
    options: ['always', { objectsInArrays: false }],
    errors: expecting([
      [0, 10, true, 'after'],
      [0, 34, false, 'before']
    ])
  },
  {
    code: "var foo = [ { 'bar':'baz' }, 1, { 'bar': 'baz' } ];",
    output: "var foo = [{ 'bar':'baz' }, 1, { 'bar': 'baz' }];",
    options: ['always', { objectsInArrays: false }],
    errors: expecting([
      [0, 10, false, 'after'],
      [0, 49, false, 'before']
    ])
  }
]);

ruleTester.addTestGroup('invalid-single-value', 'should handle single value exceptions', [
  {
    code: "var obj = [ 'foo' ];",
    output: "var obj = ['foo'];",
    options: ['always', { singleValue: false }],
    errors: expecting([
      [0, 10, false, 'after'],
      [0, 18, false, 'before']
    ])
  },
  {
    code: "var obj = ['foo' ];",
    output: "var obj = ['foo'];",
    options: ['always', { singleValue: false }],
    errors: expecting([
      [0, 17, false, 'before']
    ])
  },
  {
    code: "var obj = ['foo'];",
    output: "var obj = [ 'foo' ];",
    options: ['never', { singleValue: true }],
    errors: expecting([
      [0, 10, true, 'after'],
      [0, 16, true, 'before']
    ])
  }
]);

ruleTester.addTestGroup('always-arr-in-arr', 'should handle array and arrays exception', [
  {
    code: 'var arr = [ [ 1, 2 ], 2, 3, 4 ];',
    output: 'var arr = [[ 1, 2 ], 2, 3, 4 ];',
    options: ['always', { arraysInArrays: false }],
    errors: expecting([
      [0, 10, false, 'after']
    ])
  },
  {
    code: 'var arr = [ 1, 2, 2, [ 3, 4 ] ];',
    output: 'var arr = [ 1, 2, 2, [ 3, 4 ]];',
    options: ['always', { arraysInArrays: false }],
    errors: expecting([
      [0, 30, false, 'before']
    ])
  },
  {
    code: 'var arr = [[ 1, 2 ], 2, [ 3, 4 ] ];',
    output: 'var arr = [[ 1, 2 ], 2, [ 3, 4 ]];',
    options: ['always', { arraysInArrays: false }],
    errors: expecting([
      [0, 33, false, 'before']
    ])
  },
  {
    code: 'var arr = [ [ 1, 2 ], 2, [ 3, 4 ]];',
    output: 'var arr = [[ 1, 2 ], 2, [ 3, 4 ]];',
    options: ['always', { arraysInArrays: false }],
    errors: expecting([
      [0, 10, false, 'after']
    ])
  },
  {
    code: 'var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];',
    output: 'var arr = [[ 1, 2 ], 2, [ 3, 4 ]];',
    options: ['always', { arraysInArrays: false }],
    errors: expecting([
      [0, 10, false, 'after'],
      [0, 34, false, 'before']
    ])
  }
]);

ruleTester.addTestGroup('always-destructuring', 'should array destructuring', [
  {
    code: 'var [x,y] = y',
    output: 'var [ x,y ] = y',
    options: ['always'],
    errors: expecting([
      [0, 4, true, 'after'],
      [0, 8, true, 'before']
    ])
  },
  {
    code: 'var [x,y ] = y',
    output: 'var [ x,y ] = y',
    options: ['always'],
    errors: expecting([
      [0, 4, true, 'after']
    ])
  },
  {
    code: 'var [,,,x,,] = y',
    output: 'var [ ,,,x,, ] = y',
    options: ['always'],
    errors: expecting([
      [0, 4, true, 'after'],
      [0, 11, true, 'before']
    ])
  },
  {
    code: 'var [ ,,,x,,] = y',
    output: 'var [ ,,,x,, ] = y',
    options: ['always'],
    errors: expecting([
      [0, 12, true, 'before']
    ])
  },
  {
    code: 'var [...horse] = y',
    output: 'var [ ...horse ] = y',
    options: ['always'],
    errors: expecting([
      [0, 4, true, 'after'],
      [0, 13, true, 'before']
    ])
  },
  {
    code: 'var [...horse ] = y',
    output: 'var [ ...horse ] = y',
    options: ['always'],
    errors: expecting([
      [0, 4, true, 'after']
    ])
  },
  {
    code: 'var [ [ x, y ], z ] = arr;',
    output: 'var [[ x, y ], z ] = arr;',
    options: ['always', { arraysInArrays: false }],
    errors: expecting([
      [0, 4, false, 'after']
    ])
  },
  {
    code: '[ { x, y }, z ] = arr;',
    output: '[{ x, y }, z ] = arr;',
    options: ['always', { objectsInArrays: false }],
    errors: expecting([
      [0, 0, false, 'after']
    ])
  },
  {
    code: '[ x, { y, z } ] = arr;',
    output: '[ x, { y, z }] = arr;',
    options: ['always', { objectsInArrays: false }],
    errors: expecting([
      [0, 14, false, 'before']
    ])
  }
]);

ruleTester.addTestGroup('never-arr-in-arr', 'should handle arrays in arrays exception when never', [
  {
    code: 'var arr = [[1, 2], 2, [3, 4]];',
    output: 'var arr = [ [1, 2], 2, [3, 4] ];',
    options: ['never', { arraysInArrays: true }],
    errors: expecting([
      [0, 10, true, 'after'],
      [0, 28, true, 'before']
    ])
  },
  {
    code: 'var arr = [ ];',
    output: 'var arr = [];',
    options: ['never', { arraysInArrays: true }],
    errors: expecting([
      [0, 10, false, 'after']
    ])
  }
]);

ruleTester.addTestGroup('never-obj-in-arr', 'should handle object in arrays exception when never', [
  {
    code: 'var arr = [ ];',
    output: 'var arr = [];',
    options: ['never', { objectsInArrays: true }],
    errors: expecting([
      [0, 10, false, 'after']
    ])
  }
]);

ruleTester.addTestGroup('always-fail', 'should handle always', [
  {
    code: 'var arr = [1, 2, 3, 4];',
    output: 'var arr = [ 1, 2, 3, 4 ];',
    options: ['always'],
    errors: expecting([
      [0, 10, true, 'after'],
      [0, 21, true, 'before']
    ])
  },
  {
    code: 'var arr = [1, 2, 3, 4 ];',
    output: 'var arr = [ 1, 2, 3, 4 ];',
    options: ['always'],
    errors: expecting([
      [0, 10, true, 'after']
    ])
  },
  {
    code: 'var arr = [ 1, 2, 3, 4];',
    output: 'var arr = [ 1, 2, 3, 4 ];',
    options: ['always'],
    errors: expecting([
      [0, 22, true, 'before']
    ])
  }
]);

ruleTester.addTestGroup('never-fail', 'should handle never', [
  {
    code: 'var arr = [ 1, 2, 3, 4 ];',
    output: 'var arr = [1, 2, 3, 4];',
    options: ['never'],
    errors: expecting([
      [0, 10, false, 'after'],
      [0, 23, false, 'before']
    ])
  },
  {
    code: 'var arr = [1, 2, 3, 4 ];',
    output: 'var arr = [1, 2, 3, 4];',
    options: ['never'],
    errors: expecting([
      [0, 22, false, 'before']
    ])
  },
  {
    code: 'var arr = [ 1, 2, 3, 4];',
    output: 'var arr = [1, 2, 3, 4];',
    options: ['never'],
    errors: expecting([
      [0, 10, false, 'after']
    ])
  },
  {
    code: 'var arr = [ [ 1], 2, 3, 4];',
    output: 'var arr = [[1], 2, 3, 4];',
    options: ['never'],
    errors: expecting([
      [0, 10, false, 'after'],
      [0, 12, false, 'after']
    ])
  },
  {
    code: 'var arr = [[1 ], 2, 3, 4 ];',
    output: 'var arr = [[1], 2, 3, 4];',
    options: ['never'],
    errors: expecting([
      [0, 14, false, 'before'],
      [0, 25, false, 'before']
    ])
  }
]);

ruleTester.addTestGroup('with-types', 'should handle always and never with types', [
  {
    code: '([ a, b ]: Array<any>) => {}',
    output: '([a, b]: Array<any>) => {}',
    options: ['never'],
    errors: expecting([
      [0, 1, false, 'after'],
      [0, 8, false, 'before']
    ])
  },
  {
    code: '([a, b]: Array< any >) => {}',
    output: '([ a, b ]: Array< any >) => {}',
    options: ['always'],
    errors: expecting([
      [0, 1, true, 'after'],
      [0, 6, true, 'before']
    ])
  }
]);

ruleTester.addTestGroup('issue162', 'should handle comments', [
  {
    code: 'const foo = [42/* , 51 */];',
    options: ['never']
  },
  {
    code: 'const foo = [42/* , 51 */  ];',
    output: 'const foo = [42/* , 51 */];',
    options: ['never'],
    errors: expecting([
      [0, 27, false, 'before']
    ])
  },
  {
    code: 'const foo = [ /*39, */ 41, 42/* , 51 */ ];',
    output: 'const foo = [/*39, */ 41, 42/* , 51 */];',
    options: ['never'],
    errors: expecting([
      [0, 12, false, 'after'],
      [0, 40, false, 'before']
    ])
  },
  {
    code: `const foo = [ /*
      39, */ 41, 42/* , 51 
      */ ];`,
    options: ['never']
  }
]);

ruleTester.runTests();
