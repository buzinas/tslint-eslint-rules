import { RuleTester, Failure, Position, dedent } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/tests/lib/rules/arrow-body-style.js

const ruleTester = new RuleTester('ter-arrow-body-style');

function expecting(errors: [number, number, boolean][]): Failure[] {
  return errors.map((err) => {
    const val = err[2] ? 'Expected' : 'Unexpected';
    const message = `${val} block statement surrounding arrow body.`;
    return {
      failure: message,
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass with no options', [
  'var foo = () => {};',
  'var foo = () => 0;',
  'var addToB = (a) => { b =  b + a };',
  'var foo = () => { /* do nothing */ };',
  'var foo = () => {\n /* do nothing */ \n};',
  'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
  'var foo = () => ({});',
  'var foo = () => bar();',
  'var foo = () => { bar(); };',
  'var foo = () => { b = a };',
  'var foo = () => { bar: 1 };'
]);

ruleTester.addTestGroup('valid-always', 'should pass when braces are "always" required', [
  { code: 'var foo = () => { return 0; };', options: ['always'] },
  { code: 'var foo = () => { return bar(); };', options: ['always'] }
]);

ruleTester.addTestGroup('valid-never', 'should pass when braces are "never" required', [
  { code: 'var foo = () => 0;', options: ['never'] },
  { code: 'var foo = () => ({ foo: 0 });', options: ['never'] }
]);

ruleTester.addTestGroup('valid-as-needed', 'should pass when braces are required "as-needed"', [
  { code: 'var foo = () => {};', options: ['as-needed', { requireReturnForObjectLiteral: true }] },
  { code: 'var foo = () => 0;', options: ['as-needed', { requireReturnForObjectLiteral: true }] },
  {
    code: 'var addToB = (a) => { b =  b + a };',
    options: ['as-needed', { requireReturnForObjectLiteral: true }]
  },
  {
    code: 'var foo = () => { /* do nothing */ };',
    options: ['as-needed', { requireReturnForObjectLiteral: true }]
  },
  {
    code: 'var foo = () => {\n /* do nothing */ \n};',
    options: ['as-needed', { requireReturnForObjectLiteral: true }]
  },
  {
    code: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
    options: ['as-needed', { requireReturnForObjectLiteral: true }]
  },
  {
    code: 'var foo = () => bar();',
    options: ['as-needed', { requireReturnForObjectLiteral: true }]
  },
  {
    code: 'var foo = () => { bar(); };',
    options: ['as-needed', { requireReturnForObjectLiteral: true }]
  },
  {
    code: 'var addToB = (a) => { b =  b + a };',
    options: ['as-needed', { requireReturnForObjectLiteral: true }]
  },
  {
    code: 'var foo = () => { return { bar: 0 }; };',
    options: ['as-needed', { requireReturnForObjectLiteral: true }]
  }
]);

ruleTester.addTestGroup('invalid', 'should fail with no options', [
  {
    code: 'var foo = () => {\nreturn bar;\n};',
    output: 'var foo = () => bar;',
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => {\nreturn bar;};',
    output: 'var foo = () => bar;',
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => {return bar;\n};',
    output: 'var foo = () => bar;',
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: dedent`
      var foo = () => {
        return foo
          .bar;
      };`,
    output: dedent`
      var foo = () => foo
          .bar;`,
    errors: expecting([
      [1, 16, false]
    ])
  },
  {
    code: dedent`
      var foo = () => {
        return {
          bar: 1,
          baz: 2
        };
      };`,
    output: dedent`
      var foo = () => ({
          bar: 1,
          baz: 2
        });`,
    errors: expecting([
      [1, 16, false]
    ])
  }
]);

ruleTester.addTestGroup('invalid-always', 'should fail when braces are "always" required', [
  {
    code: 'var foo = () => 0;',
    output: 'var foo = () => {return 0};',
    options: ['always'],
    errors: expecting([
      [0, 16, true]
    ])
  },
  {
    code: 'var foo = () => ({});',
    output: 'var foo = () => {return ({})};',
    options: ['always'],
    errors: expecting([
      [0, 16, true]
    ])
  },
  {
    code: 'var foo = () => (((((((5)))))));',
    output: 'var foo = () => {return (((((((5)))))))};',
    options: ['always'],
    errors: expecting([
      [0, 16, true]
    ])
  },
  {
    code: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ ( /* e */ 5 /* f */ ) /* g */ ;',
    output: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ {return ( /* e */ 5 /* f */ )} /* g */ ;',
    options: ['always'],
    errors: expecting([
      [0, 49, true]
    ])
  }
]);

ruleTester.addTestGroup('invalid-never', 'should fail when braces are "never" required', [
  {
    code: 'var foo = () => {\nreturn 0;\n};',
    output: 'var foo = () => 0;',
    options: ['never'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    // Not fixed; fixing would cause ASI issues.
    code:
      'var foo = () => { return bar }\n' +
      '[1, 2, 3].map(foo)',
    output:
    'var foo = () => { return bar }\n' +
    '[1, 2, 3].map(foo)',
    options: ['never'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    // Not fixed; fixing would cause ASI issues.
    code:
      'var foo = () => { return bar }\n' +
      '(1).toString();',
    output:
      'var foo = () => { return bar }\n' +
      '(1).toString();',
    options: ['never'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    // Fixing here is ok because the arrow function has a semicolon afterwards.
    code:
      'var foo = () => { return bar };\n' +
      '[1, 2, 3].map(foo)',
    output:
      'var foo = () => bar;\n' +
      '[1, 2, 3].map(foo)',
    options: ['never'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
    output: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};', // not fixed
    options: ['never'],
    errors: expecting([
      [0, 26, false]
    ])
  }
]);

ruleTester.addTestGroup('invalid-as-needed', 'should fail when braces are required "as-needed"', [
  {
    code: 'var foo = () => { return 0; };',
    output: 'var foo = () => 0;',
    options: ['as-needed'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => { return 0 };',
    output: 'var foo = () => 0;',
    options: ['as-needed'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => { return bar(); };',
    output: 'var foo = () => bar();',
    options: ['as-needed'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => { return { bar: 0 }; };',
    output: 'var foo = () => ({ bar: 0 });',
    options: ['as-needed'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => { return; };',
    output: 'var foo = () => { return; };', // not fixed
    options: ['as-needed', { requireReturnForObjectLiteral: true }],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => { return ( /* a */ {ok: true} /* b */ ) };',
    output: 'var foo = () => ( /* a */ {ok: true} /* b */ );',
    options: ['as-needed'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: "var foo = () => { return '{' };",
    output: "var foo = () => '{';",
    options: ['as-needed'],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => { return { bar: 0 }.bar; };',
    output: 'var foo = () => ({ bar: 0 }.bar);',
    options: ['as-needed'],
    errors: expecting([
      [0, 16, false]
    ])
  },

  {
    code: 'var foo = () => { return 0; };',
    output: 'var foo = () => 0;',
    options: ['as-needed', { requireReturnForObjectLiteral: true }],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => { return bar(); };',
    output: 'var foo = () => bar();',
    options: ['as-needed', { requireReturnForObjectLiteral: true }],
    errors: expecting([
      [0, 16, false]
    ])
  },
  {
    code: 'var foo = () => ({});',
    output: 'var foo = () => {return ({})};',
    options: ['as-needed', { requireReturnForObjectLiteral: true }],
    errors: expecting([
      [0, 16, true]
    ])
  },
  {
    code: 'var foo = () => ({ bar: 0 });',
    output: 'var foo = () => {return ({ bar: 0 })};',
    options: ['as-needed', { requireReturnForObjectLiteral: true }],
    errors: expecting([
      [0, 16, true]
    ])
  },
  {
    code: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ { /* e */ return /* f */ 5 /* g */ ; /* h */ } /* i */ ;',
    output: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */  /* e */  /* f */ 5 /* g */  /* h */  /* i */ ;',
    options: ['as-needed'],
    errors: expecting([
      [0, 49, false]
    ])
  }
]);

ruleTester.runTests();
