import { Failure, Position, RuleTester } from './ruleTester';

const ruleTester = new RuleTester('ter-prefer-spread', true);

function expecting(lineEnd: number, characterEnd: number, positionEnd: number): Failure[] {
  return [{
    failure: 'Use the spread operator instead of \'.apply()\'',
    startPosition: new Position(0, 0, 0),
    endPosition: new Position(lineEnd, characterEnd, positionEnd)
  }];
}

ruleTester.addTestGroup('valid', 'should pass when target is different', [
  'foo.apply(obj, args);',
  'obj.foo.apply(null, args);',
  'obj.foo.apply(otherObj, args);',
  'a.b(x, y).c.foo.apply(a.b(x, z).c, args);',
  'a.b.foo.apply(a.b.c, args);'
]);

ruleTester.addTestGroup('valid', 'should pass when non variadic', [
  'foo.apply(undefined, [1, 2]);',
  'foo.apply(null, [1, 2]);',
  'obj.foo.apply(obj, [1, 2]);'
]);

ruleTester.addTestGroup('valid', 'should pass when property is computed', [
  'var apply; foo[apply](null, args);'
]);

ruleTester.addTestGroup('valid', 'should pass when incomplete', [
  'foo.apply();',
  'obj.foo.apply();',
  'obj.foo.apply(obj, ...args)'
]);

ruleTester.addTestGroup('invalid', 'should report an error', [
  {
    code: 'foo.apply(undefined, args);',
    output: 'foo(...args);',
    errors: expecting(0, 26, 26)
  },
  {
    code: 'foo.apply(void 0, args);',
    output: 'foo(...args);',
    errors: expecting(0, 23, 23)
  },
  {
    code: 'foo.apply(null, args);',
    output: 'foo(...args);',
    errors: expecting(0, 21, 21)
  },
  {
    code: 'obj.foo.apply(obj, args);',
    output: 'obj.foo(...args);',
    errors: expecting(0, 24, 24)
  },
  {
    // Not fixed: a.b.c might activate getters
    code: 'a.b.c.foo.apply(a.b.c, args);',
    errors: expecting(0, 28, 28)
  },
  {
    // Not fixed: a.b(x, y).c might activate getters
    code: 'a.b(x, y).c.foo.apply(a.b(x, y).c, args);',
    errors: expecting(0, 40, 40)
  },
  {
    // Not fixed (not an identifier)
    code: '[].concat.apply([ ], args);',
    errors: expecting(0, 26, 26)
  },
  {
    // Not fixed (not an identifier)
    code: '[].concat.apply([\n/*empty*/\n], args);',
    errors: expecting(2, 8, 36)
  }
]);

ruleTester.runTests();
