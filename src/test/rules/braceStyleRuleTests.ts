import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('brace-style');

const fail = {
  open: 'Opening curly brace does not appear on the same line as controlling statement.',
  openAllman: 'Opening curly brace appears on the same line as controlling statement.',
  body: 'Statement inside of curly braces should be on next line.',
  close: 'Closing curly brace does not appear on the same line as the subsequent block.',
  closeSingle: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
  closeStroustrupAllman: 'Closing curly brace appears on the same line as the subsequent block.'
};

// Only checking for messages for now. We should revisit these tests specifying the line numbers
// and make sure that we are getting the correct errors.
// Note: so far there are no test that check for `fail.close` and `fail.closeStroustrupAllman`.
function expecting(errors: string[]): Failure[] {
  return errors.map((err) => {
    return {
      failure: err,
      startPosition: new Position(),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroupWithConfig('onetbs-valid', 'should pass when "1tbs"', ['1tbs'], [
  dedent`
    function foo() {
      return true;
    }`,
  dedent`
    if (foo) {
      bar();
    }`,
  dedent`
    if (foo) {
      bar();
    } else {
      baz();
    }`,
  dedent`
    try {
      somethingRisky();
    } catch(e) {
      handleError();
    }`,
  dedent`
    try {
      somethingRisky();
    } catch(e) {
      handleError();
    } finally() {
      doSomething();
    }`,
  dedent`
    try {
      somethingRisky();
    } finally() {
      doSomething();
    } catch(e) {
      handleError();
    }`,
  dedent`
    try {
      somethingRisky();
    } finally() {
      doSomething();
    }`,
  // when there are no braces, there are no problems
  dedent`
    if (foo) bar();
    else if (baz) boom();`
]);

ruleTester.addTestGroupWithConfig('onetbs-invalid', 'should fail when "1tbs"', ['1tbs'], [
  {
    code: dedent`
      function foo()
      {
        return true;
      }`,
    errors: expecting([fail.open])
  },
  {
    code: dedent`
      if (foo)
      {
        bar();
      }`,
    errors: expecting([fail.open])
  },
  {
    code: dedent`
      try
      {
        somethingRisky();
      } catch(e)
      {
        handleError();
      }`,
    errors: expecting([fail.open])
  },
  {
    code: dedent`
      try
      {
        somethingRisky();
      } catch(e)
      {
        handleError();
      }
      } finally(e)
      {
        doSomething();
      }`,
    errors: expecting([fail.open])
  },
  {
    code: dedent`
      try
      {
        somethingRisky();
      } finally(e)
      {
        doSomething();
      }`,
    errors: expecting([fail.open])
  },
  {
    code: dedent`
      if (foo) {
        bar();
      }
      else {
        baz();
      }`,
    errors: expecting([fail.open])
  },
  {
    code: dedent`
      if (foo) {
        bar();
      } else { baz(); }`,
    errors: expecting([fail.body, fail.closeSingle])
  }
]);

ruleTester.addTestGroupWithConfig('stroustrup-valid', 'should pass when "stroustrup"', ['stroustrup'], [
  dedent`
    function foo() {
      return true;
    }`,
  dedent`
    if (foo) {
      bar();
    }`,
  dedent`
    if (foo) {
      bar();
    }
    else {
      baz();
    }`,
  dedent`
    try {
      somethingRisky();
    }
    catch(e) {
      handleError();
    }`,
  dedent`
    try {
      somethingRisky();
    }
    catch(e) {
      handleError();
    }
    finally() {
      doSomething();
    }
    `,
  dedent`
    try {
      somethingRisky();
    }
    finally {
      doSomething();
    }`,
  // when there are no braces, there are no problems
  dedent`
    if (foo) bar();
    else if (baz) boom();`
]);

ruleTester.addTestGroupWithConfig('stroustrup-invalid', 'should fail when "stroustrup"', ['stroustrup'], [
  {
    code: dedent`
      function foo()
      {
        return true;
      }`,
    errors: expecting([fail.open])
  },
  {
    code: dedent`
      if (foo)
      {
        bar();
      }`,
    errors: expecting([fail.open])
  },
  {
    code: dedent`
      try
      {
        somethingRisky();
      } catch(e)
      {
        handleError();
      }`,
    errors: expecting([fail.open, fail.openAllman])
  },
  {
    code: dedent`
      try
      {
        somethingRisky();
      } catch(e)
      {
        handleError();
      } finally()
      {
        doSomething();
      }`,
    errors: expecting([fail.open, fail.openAllman])
  },
  {
    code: dedent`
      try
      {
        somethingRisky();
      } finally()
      {
        doSomething();
      }`,
    errors: expecting([fail.open, fail.openAllman])
  },
  {
    code: dedent`
      if (foo) {
        bar();
      } else {
        baz();
      }`,
    errors: expecting([fail.openAllman])
  }
]);

ruleTester.addTestGroupWithConfig('allman-valid', 'should pass when "allman"', ['allman'], [
  dedent`
    function foo()
    {
      return true;
    }`,
  dedent`
    if (foo)
    {
      bar();
    }`,
  dedent`
    if (foo)
    {
      bar();
    }
    else
    {
      baz();
    }`,
  dedent`
    try
    {
      somethingRisky();
    }
    catch(e)
    {
      handleError();
    }`,
  dedent`
    try
    {
      somethingRisky();
    }
    catch(e)
    {
      handleError();
    }
    finally()
    {
      doSomething();
    }`,
  dedent`
    try
    {
      somethingRisky();
    }
    finally()
    {
      doSomething();
    }`,
  // when there are no braces, there are no problems
  dedent`
    if (foo) bar();
    else if (baz) boom();`
]);

ruleTester.addTestGroupWithConfig('allman-invalid', 'should fail when "allman"', ['allman'], [
  {
    code: dedent`
      function foo() {
        return true;
      }`,
    errors: expecting([fail.openAllman])
  },
  {
    code: dedent`
      if (foo)
      {
        bar(); }`,
    errors: expecting([fail.closeSingle])
  },
  {
    code: dedent`
      try
      {
        somethingRisky();
      } catch(e)
      {
        handleError();
      }`,
    errors: expecting([fail.openAllman])
  },
  {
    code: dedent`
      try {
        somethingRisky();
      } catch(e)
      {
        handleError();
      } finally()
      {
        doSomething();
      }`,
    errors: expecting([fail.openAllman])
  },
  {
    code: dedent`
      try {
        somethingRisky();
      } finally()
      {
        doSomething();
      }`,
    errors: expecting([fail.openAllman])
  },
  {
    code: dedent`
      if (foo) {
        bar();
      } else {
        baz();
      }`,
    errors: expecting([fail.openAllman])
  }
]);

ruleTester.addTestGroupWithConfig(
  'allowSingleLine-onetbs',
  'should pass when "1tbs" and "allowSingleLine" is true',
  ['1tbs', { allowSingleLine: true }],
  [
    `function nop() { return; }`,
    `if (foo) { bar(); }`,
    `if (foo) { bar(); } else { baz(); }`,
    `try { somethingRisky(); } catch(e) { handleError(); }`,
    `try { somethingRisky(); } catch(e) { handleError(); } finally() { doSomething(); }`,
    `try { somethingRisky(); } finally(e) { doSomething(); }`,
    dedent`
      if (foo) {
        bar();
      } else { baz(); }`,
    dedent`
      try {
        foo();
      } catch(e) { bar(); }`,
    dedent`
      try {
        foo();
      } catch(e) { bar(); }
      } finally() { doSomething(); }`,
    dedent`
      try {
        foo();
      } finally() { doSomething(); }`
  ]
);

ruleTester.addTestGroupWithConfig(
  'allowSingleLine-onetbs-invalid',
  'should fail when "1tbs" and "allowSingleLine" is false',
  ['1tbs', { allowSingleLine: false }],
  [
    {
      code: `function nop() { return; }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: `if (foo) { bar(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: `if (foo) { bar(); } else { baz(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: `try { somethingRisky(); } catch(e) { handleError(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: `try { somethingRisky(); } catch(e) { handleError(); } finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: `try { somethingRisky(); } finally(e) { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        if (foo) {
          bar();
        } else { baz(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try {
          foo();
        } catch(e) { bar(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try {
          foo();
        } catch(e) { bar(); }
        } finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try {
          foo();
        } finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'allowSingleLine-stroustrup',
  'should pass when "stroustrup" and "allowSingleLine" is true',
  ['stroustrup', { allowSingleLine: true }],
  [
    `function nop() { return; }`,
    `if (foo) { bar(); }`,
    dedent`
      if (foo) { bar(); }
      else { baz(); }`,
    dedent`
      try { somethingRisky(); }
      catch(e) { handleError(); }`,
    dedent`
      try { somethingRisky(); }
      catch(e) { handleError(); }
      finally() { doSomething(); }`,
    dedent`
      try { somethingRisky(); }
      finally() { doSomething(); }`,
    dedent`
      if (foo) {
        bar();
      }
      else { baz(); }`,
    dedent`
      try {
        foo();
      }
      catch(e) { bar(); }`,
    dedent`
      try {
        foo();
      }
      catch(e) { bar(); }
      finally() { doSomething(); }`,
    dedent`
      try {
        foo();
      }
      finally() { doSomething(); }`
  ]
);

ruleTester.addTestGroupWithConfig(
  'allowSingleLine-stroustrup-invalid',
  'should fail when "stroustrup" and "allowSingleLine" is false',
  ['stroustrup', { allowSingleLine: false }],
  [
    {
      code: `function nop() { return; }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: `if (foo) { bar(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        if (foo) { bar(); }
        else { baz(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try { somethingRisky(); }
        catch(e) { handleError(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try { somethingRisky(); }
        catch(e) { handleError(); }
        finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try { somethingRisky(); }
        finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        if (foo) {
          bar();
        }
        else { baz(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try {
          foo();
        }
        catch(e) { bar(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try {
          foo();
        }
        catch(e) { bar(); }
        finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    },
    {
      code: dedent`
        try {
          foo();
        }
        finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle])
    }
  ]
);

ruleTester.addTestGroupWithConfig(
  'allowSingleLine-allman',
  'should pass when "allman" and "allowSingleLine" is true',
  ['allman', { allowSingleLine: true }],
  [
    `function nop() { return; }`,
    `if (foo) { bar(); }`,
    dedent`
      if (foo) { bar(); }
      else { baz(); }`,
    dedent`
      try { somethingRisky(); }
      catch(e) { handleError(); }`,
    dedent`
      try { somethingRisky(); }
      catch(e) { handleError(); },
      finally() { doSomething(); }`,
    dedent`
      try { somethingRisky(); }
      finally(e) { doSomething(); }`,
    dedent`
      if (foo)
      {
        bar();
      } else { baz(); }`,
    dedent`
      try
      {
        foo();
      }
      catch(e) { bar(); }`,
    dedent`
      try
      {
        foo();
      }
      catch(e) { bar(); }
      finally() { doSomething(); }`,
    dedent`
      try
      {
        foo();
      }
      finally() { doSomething(); }`
  ]
);

ruleTester.addTestGroupWithConfig(
  'allowSingleLine-allman-invalid',
  'should fail when "allman" and "allowSingleLine" is false',
  ['allman', { allowSingleLine: false }],
  [
    {
      code: `function nop() { return; }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: `if (foo) { bar(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: dedent`
        if (foo) { bar(); }
        else { baz(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: dedent`
        try { somethingRisky(); }
        catch(e) { handleError(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: dedent`
        try { somethingRisky(); }
        catch(e) { handleError(); },
        finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: dedent`
        try { somethingRisky(); }
        finally(e) { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: dedent`
        if (foo)
        {
          bar();
        } else { baz(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: dedent`
        try
        {
          foo();
        }
        catch(e) { bar(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: dedent`
        try
        {
          foo();
        }
        catch(e) { bar(); }
        finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
      code: dedent`
        try
        {
          foo();
        }
        finally() { doSomething(); }`,
      errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    }
  ]
);

ruleTester.runTests();
