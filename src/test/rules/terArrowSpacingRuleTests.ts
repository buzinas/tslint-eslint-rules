import { RuleTester, Failure, Position } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/lib/rules/arrow-spacing.js

const ruleTester = new RuleTester('ter-arrow-spacing', true);

function expecting(errors: [number, number, string, boolean][]): Failure[] {
  // [line, column, 'before' | 'after', true means there should be a space]
  return errors.map((err) => {
    const status = err[3] ? 'Missing' : 'Unexpected';
    return {
      failure: `${status} space ${err[2]} =>.`,
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass valid', [
  {
    code: 'a => a',
    options: [{ after: true, before: true }]
  },
  {
    code: '() => {}',
    options: [{ after: true, before: true }]
  },
  {
    code: '(a) => {}',
    options: [{ after: true, before: true }]
  },
  {
    code: 'a=> a',
    options: [{ after: true, before: false }]
  },
  {
    code: '()=> {}',
    options: [{ after: true, before: false }]
  },
  {
    code: '(a)=> {}',
    options: [{ after: true, before: false }]
  },
  {
    code: 'a =>a',
    options: [{ after: false, before: true }]
  },
  {
    code: '() =>{}',
    options: [{ after: false, before: true }]
  },
  {
    code: '(a) =>{}',
    options: [{ after: false, before: true }]
  },
  {
    code: 'a=>a',
    options: [{ after: false, before: false }]
  },
  {
    code: '()=>{}',
    options: [{ after: false, before: false }]
  },
  {
    code: '(a)=>{}',
    options: [{ after: false, before: false }]
  },
  {
    code: 'a => a',
    options: [{}]
  },
  {
    code: '() => {}',
    options: [{}]
  },
  {
    code: '(a) => {}',
    options: [{}]
  },
  '(a) =>\n{}',
  '(a) =>\r\n{}',
  '(a) =>\n    0'
]);

ruleTester.addTestGroup('invalid', 'should fail invalid', [
  {
    code: 'a=>a',
    output: 'a => a',
    options: [{ after: true, before: true }],
    errors: expecting([
      [0, 1, 'before', true],
      [0, 1, 'after', true]
    ])
  },
  {
    code: '()=>{}',
    output: '() => {}',
    options: [{ after: true, before: true }],
    errors: expecting([
      [0, 2, 'before', true],
      [0, 2, 'after', true]
    ])
  },
  {
    code: '(a)=>{}',
    output: '(a) => {}',
    options: [{ after: true, before: true }],
    errors: expecting([
      [0, 3, 'before', true],
      [0, 3, 'after', true]
    ])
  },
  {
    code: 'a=> a',
    output: 'a =>a',
    options: [{ after: false, before: true }],
    errors: expecting([
      [0, 1, 'before', true],
      [0, 1, 'after', false]
    ])
  },
  {
    code: '()=> {}',
    output: '() =>{}',
    options: [{ after: false, before: true }],
    errors: expecting([
      [0, 2, 'before', true],
      [0, 2, 'after', false]
    ])
  },
  {
    code: '(a)=> {}',
    output: '(a) =>{}',
    options: [{ after: false, before: true }],
    errors: expecting([
      [0, 3, 'before', true],
      [0, 3, 'after', false]
    ])
  },
  {
    code: 'a=>  a',
    output: 'a =>a',
    options: [{ after: false, before: true }],
    errors: expecting([
      [0, 1, 'before', true],
      [0, 1, 'after', false]
    ])
  },
  {
    code: '()=>  {}',
    output: '() =>{}',
    options: [{ after: false, before: true }],
    errors: expecting([
      [0, 2, 'before', true],
      [0, 2, 'after', false]
    ])
  },
  {
    code: '(a)=>  {}',
    output: '(a) =>{}',
    options: [{ after: false, before: true }],
    errors: expecting([
      [0, 3, 'before', true],
      [0, 3, 'after', false]
    ])
  },
  {
    code: 'a =>a',
    output: 'a=> a',
    options: [{ after: true, before: false }],
    errors: expecting([
      [0, 2, 'before', false],
      [0, 2, 'after', true]
    ])
  },
  {
    code: '() =>{}',
    output: '()=> {}',
    options: [{ after: true, before: false }],
    errors: expecting([
      [0, 3, 'before', false],
      [0, 3, 'after', true]
    ])
  },
  {
    code: '(a) =>{}',
    output: '(a)=> {}',
    options: [{ after: true, before: false }],
    errors: expecting([
      [0, 4, 'before', false],
      [0, 4, 'after', true]
    ])
  },
  {
    code: 'a  =>a',
    output: 'a=> a',
    options: [{ after: true, before: false }],
    errors: expecting([
      [0, 3, 'before', false],
      [0, 3, 'after', true]
    ])
  },
  {
    code: '()  =>{}',
    output: '()=> {}',
    options: [{ after: true, before: false }],
    errors: expecting([
      [0, 4, 'before', false],
      [0, 4, 'after', true]
    ])
  },
  {
    code: '(a)  =>{}',
    output: '(a)=> {}',
    options: [{ after: true, before: false }],
    errors: expecting([
      [0, 5, 'before', false],
      [0, 5, 'after', true]
    ])
  },
  {
    code: 'a => a',
    output: 'a=>a',
    options: [{ after: false, before: false }],
    errors: expecting([
      [0, 2, 'before', false],
      [0, 2, 'after', false]
    ])
  },
  {
    code: '() => {}',
    output: '()=>{}',
    options: [{ after: false, before: false }],
    errors: expecting([
      [0, 3, 'before', false],
      [0, 3, 'after', false]
    ])
  },
  {
    code: '(a) => {}',
    output: '(a)=>{}',
    options: [{ after: false, before: false }],
    errors: expecting([
      [0, 4, 'before', false],
      [0, 4, 'after', false]
    ])
  },
  {
    code: 'a  =>  a',
    output: 'a=>a',
    options: [{ after: false, before: false }],
    errors: expecting([
      [0, 3, 'before', false],
      [0, 3, 'after', false]
    ])
  },
  {
    code: '()  =>  {}',
    output: '()=>{}',
    options: [{ after: false, before: false }],
    errors: expecting([
      [0, 4, 'before', false],
      [0, 4, 'after', false]
    ])
  },
  {
    code: '(a)  =>  {}',
    output: '(a)=>{}',
    options: [{ after: false, before: false }],
    errors: expecting([
      [0, 5, 'before', false],
      [0, 5, 'after', false]
    ])
  },
  {
    code: '(a)  =>\n{}',
    output: '(a)  =>{}',
    options: [{ after: false }],
    errors: expecting([
      [0, 5, 'after', false]
    ])
  },
  // https://github.com/eslint/eslint/issues/7079
  {
    code: '(a = ()=>0)=>1',
    output: '(a = () => 0) => 1',
    errors: expecting([
      [0, 11, 'before', true],
      [0, 11, 'after', true],
      [0, 7, 'before', true],
      [0, 7, 'after', true]
    ])
  },
  {
    code: '(a = ()=>0)=>(1)',
    output: '(a = () => 0) => (1)',
    errors: expecting([
      [0, 11, 'before', true],
      [0, 11, 'after', true],
      [0, 7, 'before', true],
      [0, 7, 'after', true]
    ])
  }
]);

ruleTester.runTests();
