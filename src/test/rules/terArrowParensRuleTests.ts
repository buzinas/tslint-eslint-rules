import { RuleTester, Failure, Position } from './ruleTester';

const ruleTester = new RuleTester('ter-arrow-parens');

const always = 'Expected parentheses around arrow function argument.';
const asNeeded = 'Unexpected parentheses around single function argument.';
const block = 'Unexpected parentheses around single function argument having a body with no curly braces.';
const blockNoParens = 'Expected parentheses around arrow function argument having a body with curly braces.';

function expecting(errors: [number, number, number, number, string][]): Failure[] {
  // [line, column, message]
  return errors.map((err) => {
    return {
      failure: err[4],
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position(err[2], err[3])
    };
  });
}

ruleTester.addTestGroup('valid-always', 'should pass with default values', [
  '() => {}',
  '(a) => {}',
  '(a) => a',
  '(a) => {\n}',
  'a.then((foo) => {});',
  'a.then((foo) => { if (true) {}; });',
  'a.then(async (foo) => { if (true) {}; });'
]);

ruleTester.addTestGroup('valid-always-explicit', 'should pass when always is on', [
  { code: '() => {}', options: ['always'] },
  { code: '(a) => {}', options: ['always'] },
  { code: '(a) => a', options: ['always'] },
  { code: '(a) => {\n}', options: ['always'] },
  { code: 'a.then((foo) => {});', options: ['always'] },
  { code: 'a.then((foo) => { if (true) {}; });', options: ['always'] },
  { code: 'a.then(async (foo) => { if (true) {}; });', options: ['always'] }
]);

ruleTester.addTestGroup('valid-as-needed', 'should pass with as-needed on', [
  { code: '() => {}', options: ['as-needed'] },
  { code: 'a => {}', options: ['as-needed'] },
  { code: 'a => a', options: ['as-needed'] },
  { code: '([a, b]) => {}', options: ['as-needed'] },
  { code: '({ a, b }) => {}', options: ['as-needed'] },
  { code: '(a = 10) => {}', options: ['as-needed'] },
  { code: '(...a) => a[0]', options: ['as-needed'] },
  { code: '(a, b) => {}', options: ['as-needed'] },
  { code: 'async ([a, b]) => {}', options: ['as-needed'] },
  { code: 'async (a, b) => {}', options: ['as-needed'] },
  { code: '(a: T) => a', options: ['as-needed'] },
  { code: '(a): T => a', options: ['as-needed'] }
]);

ruleTester.addTestGroup('valid-require-for-block', 'should pass with requireForBlockBody option', [
  { code: '() => {}', options: ['as-needed', { requireForBlockBody: true }] },
  { code: 'a => a', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '([a, b]) => {}', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '([a, b]) => a', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '({ a, b }) => {}', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '({ a, b }) => a + b', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '(a = 10) => {}', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '(...a) => a[0]', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '(a, b) => {}', options: ['as-needed', { requireForBlockBody: true }] },
  { code: 'a => ({})', options: ['as-needed', { requireForBlockBody: true }] },
  { code: 'async a => ({})', options: ['as-needed', { requireForBlockBody: true }] },
  { code: 'async a => a', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '(a: T) => a', options: ['as-needed', { requireForBlockBody: true }] },
  { code: '(a): T => a', options: ['as-needed', { requireForBlockBody: true }] }
]);

ruleTester.addTestGroup('invalid-always', 'should fail with always on', [
  {
    code: 'a => {}',
    output: '(a) => {}',
    errors: expecting([
      [0, 0, 0, 1, always]
    ])
  },
  {
    code: 'a => a',
    output: '(a) => a',
    errors: expecting([
      [0, 0, 0, 1, always]
    ])
  },
  {
    code: 'a => {\n}',
    output: '(a) => {\n}',
    errors: expecting([
      [0, 0, 0, 1, always]
    ])
  },
  {
    code: 'a.then(foo => {});',
    output: 'a.then((foo) => {});',
    errors: expecting([
      [0, 7, 0, 10, always]
    ])
  },
  {
    code: 'a.then(foo => a);',
    output: 'a.then((foo) => a);',
    errors: expecting([
      [0, 7, 0, 10, always]
    ])
  },
  {
    code: 'a(foo => { if (true) {}; });',
    output: 'a((foo) => { if (true) {}; });',
    errors: expecting([
      [0, 2, 0, 5, always]
    ])
  },
  {
    code: 'a(async foo => { if (true) {}; });',
    output: 'a(async (foo) => { if (true) {}; });',
    errors: expecting([
      [0, 8, 0, 11, always]
    ])
  }
]);

ruleTester.addTestGroup('invalid-as-needed', 'should fail with as-needed on', [
  {
    code: '(a) => a',
    output: 'a => a',
    options: ['as-needed'],
    errors: expecting([
      [0, 0, 0, 3, asNeeded]
    ])
  },
  {
    code: 'async (a) => a',
    output: 'async a => a',
    options: ['as-needed'],
    errors: expecting([
      [0, 6, 0, 9, asNeeded]
    ])
  }
]);

ruleTester.addTestGroup('invalid-require-for-block', 'should fail when using option', [
  {
    code: 'a => {}',
    output: '(a) => {}',
    options: ['as-needed', { requireForBlockBody: true }],
    errors: expecting([
      [0, 0, 0, 1, blockNoParens]
    ])
  },
  {
    code: '(a) => a',
    output: 'a => a',
    options: ['as-needed', { requireForBlockBody: true }],
    errors: expecting([
      [0, 0, 0, 3, block]
    ])
  },
  {
    code: 'async a => {}',
    output: 'async (a) => {}',
    options: ['as-needed', { requireForBlockBody: true }],
    errors: expecting([
      [0, 6, 0, 7, blockNoParens]
    ])
  },
  {
    code: 'async (a) => a',
    output: 'async a => a',
    options: ['as-needed', { requireForBlockBody: true }],
    errors: expecting([
      [0, 6, 0, 9, block]
    ])
  }
]);

ruleTester.addTestGroup('tslint-valid-always', 'should pass with tslint tests', [
  'var a = (a) => {};',
  'var b = (a: number) => {};',
  'var c = (a, b) => {};',
  'var f = (...rest) => {};',
  'var f = a: number => {};',
  'class Foo { a: (a) =>{} }',
  'var bar = <T>(method: () => T) => { method(); };',
  'var barbar = <T>(method: (a: any) => T) => { method(""); };',
  'var barbarbar = <T>(method: (a) => T) => { method(""); };',
  'var piyo = <T, U>(method: () => T) => { method(); };',
  'var barbarbar = <T>(method: (a: T) => T = (x) => x) => { method(""); };',
  'const validAsync = async (param: any) => {};',
  'const validAsync = async (param) => {};'
]);

ruleTester.addTestGroup('tslint-invalid-always', 'should fail with tslint tests', [
  { code: 'var e = (a => {})(1);', errors: expecting([[0, 9, 0, 10, always]]) },
  { code: 'var f = ab => {};', errors: expecting([[0, 8, 0, 10, always]]) },
  {
    code: 'var barbarbar = <T>(method: (a: T) => T = x => x) => { method(""); };',
    errors: expecting([[0, 42, 0, 43, always]])
  }
]);

ruleTester.addTestGroup('generics-as-needed', 'should not complain with generics', [
  {
    code: 'var barbarbar = <T>(method: (a) => T) => { method(""); };',
    options: ['as-needed']
  },
  {
    code: 'var barbarbar = <T>(method: (a) => T) => { method(""); };',
    options: ['as-needed', { requireForBlockBody: true }]
  }
]);

ruleTester.runTests();
