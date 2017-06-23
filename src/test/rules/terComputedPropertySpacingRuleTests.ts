import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('ter-computed-property-spacing', true);

function expecting(errors: ['yesBefore' | 'yesAfter' | 'noBefore' | 'noAfter', number ][]): Failure[] {
  const errorMessages = {
    yesBefore: "A space is required before ']'.",
    yesAfter: "A space is required after '['.",
    noBefore: "There should be no space before ']'.",
    noAfter: "There should be no space after '['."
  };

  return errors.map((err) => {
    const message = errorMessages[err[0]];

    return {
      failure: message,
      startPosition: new Position(0, err[1]),
      endPosition: new Position(0, err[1] + 1)
    };
  });
}

ruleTester.addTestGroup('default-never-valid', 'default is never', [
  { code: 'obj[foo]' },
  { code: "obj['foo']" },
  { code: 'var x = {[b]: a}' }
]);

ruleTester.addTestGroup('always-valid', 'when always, spaces are required', [
  { code: 'obj[ foo ]', options: ['always'] },
  { code: 'obj[\nfoo\n]', options: ['always'] },
  { code: "obj[ 'foo' ]", options: ['always'] },
  { code: "obj[ 'foo' + 'bar' ]", options: ['always'] },
  { code: 'obj[ obj2[ foo ] ]', options: ['always'] },
  { code: 'obj.map(function(item) { return [\n1,\n2,\n3,\n4\n]; })', options: ['always'] },
  { code: "obj[ 'map' ](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['always'] },
  { code: "obj[ 'for' + 'Each' ](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['always'] },
  { code: 'obj[ obj2[ foo ] ]', options: ['always'] },
  { code: 'var foo = obj[ 1 ]', options: ['always'] },
  { code: "var foo = obj[ 'foo' ];", options: ['always'] },
  { code: 'var foo = obj[ [1, 1] ];', options: ['always'] }
]);

ruleTester.addTestGroup('always-valid-objectLiteralComputedProperties', 'when always, spaces are required inside a computed property name', [
  { code: 'var x = {[ "a" ]: a}', options: ['always'] },
  { code: 'var y = {[ x ]: a}', options: ['always'] },
  { code: 'var x = {[ "a" ]() {}}', options: ['always'] },
  { code: 'var y = {[ x ]() {}}', options: ['always'] }
]);

ruleTester.addTestGroup('always-valid-unrelatedCases', "defining an empty object or array doesn't require spaces", [
  { code: 'var foo = {};', options: ['always'] },
  { code: 'var foo = [];', options: ['always'] }
]);

ruleTester.addTestGroup('never-valid', 'when never, accept no spaces', [
  { code: 'obj[foo]', options: ['never'] },
  { code: "obj['foo']", options: ['never'] },
  { code: "obj['foo' + 'bar']", options: ['never'] },
  { code: "obj['foo'+'bar']", options: ['never'] },
  { code: 'obj[obj2[foo]]', options: ['never'] },
  { code: 'obj.map(function(item) { return [\n1,\n2,\n3,\n4\n]; })', options: ['never'] },
  { code: "obj['map'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
  { code: "obj['for' + 'Each'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
  { code: "obj['for' + 'Each'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
  { code: 'obj[\nfoo]', options: ['never'] },
  { code: 'obj[foo\n]', options: ['never'] },
  { code: 'var foo = obj[1]', options: ['never'] },
  { code: "var foo = obj['foo'];", options: ['never'] },
  { code: 'var foo = obj[[ 1, 1 ]];', options: ['never'] }
]);

ruleTester.addTestGroup('never-valid-objectLiteralComputedProperties', 'when never, spaces are forbidden inside a computed property name', [
  { code: 'var x = {["a"]: a}', options: ['never'] },
  { code: 'var y = {[x]: a}', options: ['never'] },
  { code: 'var x = {["a"]() {}}', options: ['never'] },
  { code: 'var y = {[x]() {}}', options: ['never'] }
]);

ruleTester.addTestGroup('never-valid-unrelatedCases', "defining an empty object or array doesn't require spaces", [
  { code: 'var foo = {};', options: ['never'] },
  { code: 'var foo = [];', options: ['never'] }
]);

ruleTester.addTestGroup('always-invalid', 'when always, no spaces are forbidden', [
  {
    code: 'var foo = obj[ 1];',
    output: 'var foo = obj[ 1 ];',
    options: ['always'],
    errors: expecting([[ 'yesBefore', 16 ]])
  },
  {
    code: 'var foo = obj[1 ];',
    output: 'var foo = obj[ 1 ];',
    options: ['always'],
    errors: expecting([[ 'yesAfter', 13 ]])
  },
  {
    code: 'var foo = obj[ 1];',
    output: 'var foo = obj[ 1 ];',
    options: ['always'],
    errors: expecting([[ 'yesBefore', 16 ]])
  },
  {
    code: 'var foo = obj[1 ];',
    output: 'var foo = obj[ 1 ];',
    options: ['always'],
    errors: expecting([[ 'yesAfter', 13 ]])
  },
  {
    code: 'var foo = obj[1]',
    output: 'var foo = obj[ 1 ]',
    options: ['always'],
    errors: expecting([
      [ 'yesAfter', 13 ],
      [ 'yesBefore', 15 ]
    ])
  }
]);

ruleTester.addTestGroup('never-invalid', 'when never, spaces are prohibited', [
  {
    code: 'var foo = obj[ 1];',
    output: 'var foo = obj[1];',
    options: ['never'],
    errors: expecting([[ 'noAfter', 13 ]])
  },
  {
    code: 'var foo = obj[1 ];',
    output: 'var foo = obj[1];',
    options: ['never'],
    errors: expecting([[ 'noBefore', 16 ]])
  },
  {
    code: 'obj[ foo ]',
    output: 'obj[foo]',
    options: ['never'],
    errors: expecting([
      [ 'noAfter', 3 ],
      [ 'noBefore', 9 ]
    ])
  },
  {
    code: 'obj[foo ]',
    output: 'obj[foo]',
    options: ['never'],
    errors: expecting([[ 'noBefore', 8 ]])
  },
  {
    code: 'obj[ foo]',
    output: 'obj[foo]',
    options: ['never'],
    errors: expecting([[ 'noAfter', 3 ]])
  }
]);

ruleTester.addTestGroup('always-invalid-objectLiteralComputedProperties', 'when always, space is required inside object literal computed properties', [
  {
    code: 'var x = {[a]: b}',
    output: 'var x = {[ a ]: b}',
    options: ['always'],
    errors: expecting([
      [ 'yesAfter', 9 ],
      [ 'yesBefore', 11 ]
    ])
  },
  {
    code: 'var x = {[a ]: b}',
    output: 'var x = {[ a ]: b}',
    options: ['always'],
    errors: expecting([[ 'yesAfter', 9 ]])
  },
  {
    code: 'var x = {[ a]: b}',
    output: 'var x = {[ a ]: b}',
    options: ['always'],
    errors: expecting([[ 'yesBefore', 12 ]])
  }
]);

ruleTester.addTestGroup('never-invalid-objectLiteralComputedProperties', 'when never, spaces prohibited inside object literal computed properties', [
  {
    code: 'var x = {[ a ]: b}',
    output: 'var x = {[a]: b}',
    options: ['never'],
    errors: expecting([
      [ 'noAfter', 9 ],
      [ 'noBefore', 13 ]
    ])
  },
  {
    code: 'var x = {[a ]: b}',
    output: 'var x = {[a]: b}',
    options: ['never'],
    errors: expecting([[ 'noBefore', 12 ]])
  },
  {
    code: 'var x = {[ a]: b}',
    output: 'var x = {[a]: b}',
    options: ['never'],
    errors: expecting([[ 'noAfter', 9 ]])
  },
  {
    code: 'var x = {[ a\n]: b}',
    output: 'var x = {[a\n]: b}',
    options: ['never'],
    errors: expecting([[ 'noAfter', 9 ]])
  }
]);

ruleTester.runTests();
