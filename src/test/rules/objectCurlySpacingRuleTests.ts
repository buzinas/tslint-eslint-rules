import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('object-curly-spacing', true);

function expecting(errors: [number, number, '{' | '}', boolean][]): Failure[] {
  // [line, column, 'before' | 'after', true means there should be a space]
  return errors.map((err) => {
    const status = err[3] ? 'A space is required' : 'There should be no space';
    const token = err[2] === '}' ? "before '}'" : "after '{'";
    return {
      failure: `${status} ${token}`,
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('always-obj', 'always with object literals', [
  { code: 'var obj = { foo: bar, baz: qux };', options: ['always'] },
  { code: 'var obj = { foo: { bar: quxx }, baz: qux };', options: ['always'] },
  { code: 'var obj = {\nfoo: bar,\nbaz: qux\n};', options: ['always'] }
]);

ruleTester.addTestGroup('always-dest', 'always with destructuring', [
  { code: 'var { x } = y', options: ['always'] },
  { code: 'var { x, y } = y', options: ['always'] },
  { code: 'var { x,y } = y', options: ['always'] },
  { code: 'var {\nx,y } = y', options: ['always'] },
  { code: 'var {\nx,y\n} = z', options: ['always'] },
  { code: 'var { x = 10, y } = y', options: ['always'] },
  { code: 'var { x: { z }, y } = y', options: ['always'] },
  { code: 'var {\ny,\n} = x', options: ['always'] },
  { code: 'var { y, } = x', options: ['always'] },
  { code: 'var { y: x } = x', options: ['always'] }
]);

ruleTester.addTestGroup('always-imp-exp', 'always with import/export', [
  { code: "import door from 'room'", options: ['always'] },
  { code: "import * as door from 'room'", options: ['always'] },
  { code: "import { door } from 'room'", options: ['always'] },
  { code: "import {\ndoor } from 'room'", options: ['always'] },
  { code: "export { door } from 'room'", options: ['always'] },
  { code: "import { house, mouse } from 'caravan'", options: ['always'] },
  { code: "import house, { mouse } from 'caravan'", options: ['always'] },
  { code: "import door, { house, mouse } from 'caravan'", options: ['always'] },
  { code: 'export { door }', options: ['always'] },
  { code: "import 'room'", options: ['always'] },
  { code: "import { bar as x } from 'foo';", options: ['always'] },
  { code: "import { x, } from 'foo';", options: ['always'] },
  { code: "import {\nx,\n} from 'foo';", options: ['always'] },
  { code: "export { x, } from 'foo';", options: ['always'] },
  { code: "export {\nx,\n} from 'foo';", options: ['always'] }
]);

ruleTester.addTestGroup('empty-object', 'always with empty object', [
  { code: 'var foo = {};', options: ['always'] }
]);

/* Disabled: objectsInObjects option is not yet supported
ruleTester.addTestGroup('obj-obj', 'always with objects in objects', [
  { code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};", options: ['always', { objectsInObjects: false }] },
  { code: 'var a = { noop: function () {} };', options: ['always', { objectsInObjects: false }] },
  { code: 'var { y: { z }} = x', options: ['always', { objectsInObjects: false }] }
]);
*/

/* Disabled: arraysInObjects option is not yet supported
ruleTester.addTestGroup('arr-obj', 'always with arrays in objects', [
  { code: "var obj = { 'foo': [ 1, 2 ]};", options: ['always', { arraysInObjects: false }] },
  { code: 'var a = { thingInList: list[0] };', options: ['always', { arraysInObjects: false }] }
]);
*/

/* Disabled: arraysInObjects option is not yet supported
ruleTester.addTestGroup('arr-obj-obj', '', [
  { code: "var obj = { 'qux': [ 1, 2 ], 'foo': { 'bar': 1, 'baz': 2 }};", options: ['always', { arraysInObjects: false, objectsInObjects: false }] },
  { code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }, 'qux': [ 1, 2 ]};", options: ['always', { arraysInObjects: false, objectsInObjects: false }] }
]);
*/

ruleTester.addTestGroup('never-obj', 'never with object literals', [
  { code: 'var obj = {foo: bar,\nbaz: qux\n};', options: ['never'] },
  { code: 'var obj = {\nfoo: bar,\nbaz: qux};', options: ['never'] },
  { code: 'var obj = {foo: bar, baz: qux};', options: ['never'] },
  { code: 'var obj = {foo: {bar: quxx}, baz: qux};', options: ['never'] },
  { code: 'var obj = {foo: {\nbar: quxx}, baz: qux\n};', options: ['never'] },
  { code: 'var obj = {foo: {\nbar: quxx\n}, baz: qux};', options: ['never'] },
  { code: 'var obj = {\nfoo: bar,\nbaz: qux\n};', options: ['never'] }
]);

ruleTester.addTestGroup('never-dest', 'never with destructuring', [
  { code: 'var {x} = y', options: ['never'] },
  { code: 'var {x, y} = y', options: ['never'] },
  { code: 'var {x,y} = y', options: ['never'] },
  { code: 'var {\nx,y\n} = y', options: ['never'] },
  { code: 'var {x = 10} = y', options: ['never'] },
  { code: 'var {x = 10, y} = y', options: ['never'] },
  { code: 'var {x: {z}, y} = y', options: ['never'] },
  { code: 'var {\nx: {z\n}, y} = y', options: ['never'] },
  { code: 'var {\ny,\n} = x', options: ['never'] },
  { code: 'var {y,} = x', options: ['never'] },
  { code: 'var {y:x} = x', options: ['never'] }
]);

ruleTester.addTestGroup('never-imp-exp', 'never with import/export', [
  { code: "import door from 'room'", options: ['never'] },
  { code: "import * as door from 'room'", options: ['never'] },
  { code: "import {door} from 'room'", options: ['never'] },
  { code: "export {door} from 'room'", options: ['never'] },
  { code: "import {\ndoor} from 'room'", options: ['never'] },
  { code: "export {\ndoor\n} from 'room'", options: ['never'] },
  { code: "import {house,mouse} from 'caravan'", options: ['never'] },
  { code: "import {house, mouse} from 'caravan'", options: ['never'] },
  { code: 'export {door}', options: ['never'] },
  { code: "import 'room'", options: ['never'] },
  { code: "import x, {bar} from 'foo';", options: ['never'] },
  { code: "import x, {bar, baz} from 'foo';", options: ['never'] },
  { code: "import {bar as y} from 'foo';", options: ['never'] },
  { code: "import {x,} from 'foo';", options: ['never'] },
  { code: "import {\nx,\n} from 'foo';", options: ['never'] },
  { code: "export {x,} from 'foo';", options: ['never'] },
  { code: "export {\nx,\n} from 'foo';", options: ['never'] }
]);

ruleTester.addTestGroup('empty-object-never', 'never with empty object', [
  { code: 'var foo = {};', options: ['never'] }
]);

/* Disabled: objectsInObjects option is not yet supported
ruleTester.addTestGroup('never-obj-obj', 'never with objects in objects', [
  { code: "var obj = {'foo': {'bar': 1, 'baz': 2} };", options: ["never", { objectsInObjects: true }] },
]);
 */

ruleTester.addTestGroup('empty-cases', 'empty cases: https://github.com/eslint/eslint/issues/3658', [
  { code: 'var {} = foo;' },
  { code: 'var [] = foo;' },
  // { code: 'var {a: {}} = foo;' },
  // { code: 'var {a: []} = foo;' },
  { code: "import {} from 'foo';" },
  { code: "export {} from 'foo';" },
  { code: 'export {};' },
  { code: 'var {} = foo;', options: ['never'] },
  { code: 'var [] = foo;', options: ['never'] },
  { code: 'var {a: {}} = foo;', options: ['never'] },
  { code: 'var {a: []} = foo;', options: ['never'] },
  { code: "import {} from 'foo';", options: ['never'] },
  { code: "export {} from 'foo';", options: ['never'] },
  { code: 'export {};', options: ['never'] }
]);

ruleTester.addTestGroup('types', 'using types: https://github.com/eslint/eslint/issues/6940', [
  { code: 'function foo ({a, b}: Props) {\n}', options: ['never'] }
]);

ruleTester.addTestGroup('invalid', 'should fail with invalid code', [
  {
    code: "import {bar} from 'foo.js';",
    output: "import { bar } from 'foo.js';",
    options: ['always'],
    errors: expecting([
      [0, 7, '{', true],
      [0, 11, '}', true]
    ])
  },
  {
    code: "import { bar as y} from 'foo.js';",
    output: "import { bar as y } from 'foo.js';",
    options: ['always'],
    errors: expecting([
      [0, 17, '}', true]
    ])
  },
  {
    code: "import {bar as y} from 'foo.js';",
    output: "import { bar as y } from 'foo.js';",
    options: ['always'],
    errors: expecting([
      [0, 7, '{', true],
      [0, 16, '}', true]
    ])
  },
  {
    code: "import { bar} from 'foo.js';",
    output: "import { bar } from 'foo.js';",
    options: ['always'],
    errors: expecting([
      [0, 12, '}', true]
    ])
  },
  {
    code: "import x, { bar} from 'foo';",
    output: "import x, { bar } from 'foo';",
    options: ['always'],
    errors: expecting([
      [0, 15, '}', true]
    ])
  },
  {
    code: "import x, { bar, baz} from 'foo';",
    output: "import x, { bar, baz } from 'foo';",
    options: ['always'],
    errors: expecting([
      [0, 20, '}', true]
    ])
  },
  {
    code: "import x, {bar} from 'foo';",
    output: "import x, { bar } from 'foo';",
    options: ['always'],
    errors: expecting([
      [0, 10, '{', true],
      [0, 14, '}', true]
    ])
  },
  {
    code: "import x, {bar, baz} from 'foo';",
    output: "import x, { bar, baz } from 'foo';",
    options: ['always'],
    errors: expecting([
      [0, 10, '{', true],
      [0, 19, '}', true]
    ])
  },
  {
    code: "import {bar,} from 'foo';",
    output: "import { bar, } from 'foo';",
    options: ['always'],
    errors: expecting([
      [0, 7, '{', true],
      [0, 12, '}', true]
    ])
  },
  {
    code: "import { bar, } from 'foo';",
    output: "import {bar,} from 'foo';",
    options: ['never'],
    errors: expecting([
      [0, 7, '{', false],
      [0, 14, '}', false]
    ])
  },
  {
    code: 'export {bar};',
    output: 'export { bar };',
    options: ['always'],
    errors: expecting([
      [0, 7, '{', true],
      [0, 11, '}', true]
    ])
  }
]);

/* Disabled objectsInObjects option is not yet supported
ruleTester.addTestGroup('invalid-always-arr-obj', 'invalid always - arrays in objects', [
  {
    code: "var obj = { 'foo': [ 1, 2 ] };",
    output: "var obj = { 'foo': [ 1, 2 ]};",
    options: ['always', { arraysInObjects: false }]
  },
  {
    code: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ] };",
    output: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ]};",
    options: ['always', { arraysInObjects: false }]
  }
]);
*/

/* Disabled objectsInObjects option is not yet supported
ruleTester.addTestGroup('invalid-obj-obj', 'invalid always - objects in objects', [
  {
    code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 } };",
    output: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};",
    options: ['always', { objectsInObjects: false }],
    errors: expecting([
      [0, 42, '}', false]
    ])
  },
  {
    code: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 } };",
    output: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 }};",
    options: ['always', { objectsInObjects: false }],
    errors: expecting([
      [0, 60, '}', false]
    ])
  }
]);
*/

ruleTester.addTestGroup('invalid-always-dest', 'invalid always - destructuring trailing comma', [
  {
    code: 'var { a,} = x;',
    output: 'var { a, } = x;',
    options: ['always'],
    errors: expecting([
      [0, 8, '}', true]
    ])
  },
  {
    code: 'var {a, } = x;',
    output: 'var {a,} = x;',
    options: ['never'],
    errors: expecting([
      [0, 8, '}', false]
    ])
  },
  {
    code: 'var {a:b } = x;',
    output: 'var {a:b} = x;',
    options: ['never'],
    errors: expecting([
      [0, 9, '}', false]
    ])
  },
  {
    code: 'var { a:b } = x;',
    output: 'var {a:b} = x;',
    options: ['never'],
    errors: expecting([
      [0, 4, '{', false],
      [0, 10, '}', false]
    ])
  }
]);

/* Disabled objectsInObjects option is not yet supported
ruleTester.addTestGroup('invalid-never-obj-obj', 'invalid never - objects in objects', [
  {
    code: "var obj = {'foo': {'bar': 1, 'baz': 2}};",
    output: "var obj = {'foo': {'bar': 1, 'baz': 2} };",
    options: ['never', { objectsInObjects: true }],
    errors: expecting([
      [0, 38, '}', true]
    ])
  },
  {
    code: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2}};",
    output: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2} };",
    options: ['never', { objectsInObjects: true }],
    errors: expecting([
      [0, 54, '}', true]
    ])
  }
]);
*/

/* Disabled objectsInObjects option is not yet supported
ruleTester.addTestGroup('invalid-never-arr-obj', 'invalid never - arrays in objects', [
  {
    code: "var obj = {'foo': [1, 2]};",
    output: "var obj = {'foo': [1, 2] };",
    options: ['never', { arraysInObjects: true }]
  },
  {
    code: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux']};",
    output: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux'] };",
    options: ['never', { arraysInObjects: true }]
  }
]);
*/

ruleTester.addTestGroup('invalid-always-never', 'invalid always/never', [
  {
    code: 'var obj = {foo: bar, baz: qux};',
    output: 'var obj = { foo: bar, baz: qux };',
    options: ['always'],
    errors: expecting([
      [0, 10, '{', true],
      [0, 29, '}', true]
    ])
  },
  {
    code: 'var obj = {foo: bar, baz: qux };',
    output: 'var obj = { foo: bar, baz: qux };',
    options: ['always'],
    errors: expecting([
      [0, 10, '{', true]
    ])
  },
  {
    code: 'var obj = { foo: bar, baz: qux};',
    output: 'var obj = { foo: bar, baz: qux };',
    options: ['always'],
    errors: expecting([
      [0, 30, '}', true]
    ])
  },
  {
    code: 'var obj = { foo: bar, baz: qux };',
    output: 'var obj = {foo: bar, baz: qux};',
    options: ['never'],
    errors: expecting([
      [0, 10, '{', false],
      [0, 31, '}', false]
    ])
  },
  {
    code: 'var obj = {foo: bar, baz: qux };',
    output: 'var obj = {foo: bar, baz: qux};',
    options: ['never'],
    errors: expecting([
      [0, 30, '}', false]
    ])
  },
  {
    code: 'var obj = { foo: bar, baz: qux};',
    output: 'var obj = {foo: bar, baz: qux};',
    options: ['never'],
    errors: expecting([
      [0, 10, '{', false]
    ])
  },
  {
    code: 'var obj = { foo: { bar: quxx}, baz: qux};',
    output: 'var obj = {foo: {bar: quxx}, baz: qux};',
    options: ['never'],
    errors: expecting([
      [0, 10, '{', false],
      [0, 17, '{', false]
    ])
  },
  {
    code: 'var obj = {foo: {bar: quxx }, baz: qux };',
    output: 'var obj = {foo: {bar: quxx}, baz: qux};',
    options: ['never'],
    errors: expecting([
      [0, 27, '}', false],
      [0, 39, '}', false]
    ])
  },
  {
    code: 'export const thing = {value: 1 };',
    output: 'export const thing = { value: 1 };',
    options: ['always'],
    errors: expecting([
      [0, 21, '{', true]
    ])
  }
]);

ruleTester.addTestGroup('invalid-dest', 'invalid destructuring', [
  {
    code: 'var {x, y} = y',
    output: 'var { x, y } = y',
    options: ['always'],
    errors: expecting([
      [0, 4, '{', true],
      [0, 9, '}', true]
    ])
  },
  {
    code: 'var { x, y} = y',
    output: 'var { x, y } = y',
    options: ['always'],
    errors: expecting([
      [0, 10, '}', true]
    ])
  },
  {
    code: 'var { x, y } = y',
    output: 'var {x, y} = y',
    options: ['never'],
    errors: expecting([
      [0, 4, '{', false],
      [0, 11, '}', false]
    ])
  },
  {
    code: 'var {x, y } = y',
    output: 'var {x, y} = y',
    options: ['never'],
    errors: expecting([
      [0, 10, '}', false]
    ])
  },
  {
    code: 'var { x=10} = y',
    output: 'var { x=10 } = y',
    options: ['always'],
    errors: expecting([
      [0, 10, '}', true]
    ])
  },
  {
    code: 'var {x=10 } = y',
    output: 'var { x=10 } = y',
    options: ['always'],
    errors: expecting([
      [0, 4, '{', true]
    ])
  }
]);

ruleTester.addTestGroup('eslint-6940', 'https://github.com/eslint/eslint/issues/6940', [
  {
    code: 'function foo ({a, b }: Props) {\n}',
    output: 'function foo ({a, b}: Props) {\n}',
    options: ['never'],
    errors: expecting([
      [0, 20, '}', false]
    ])
  }
]);

ruleTester.runTests();
