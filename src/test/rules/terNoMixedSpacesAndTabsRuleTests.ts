import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('ter-no-mixed-spaces-and-tabs');

function expecting(errors: [number, number, string][]): Failure[] {
  return errors.map((err) => {
    return {
      failure: err[2],
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('allow-unmixed-indentation', 'should pass with default option of unmixed indentation', [
  dedent`
  function testFn() {
   let foo = 1;
  \t\t\tlet bar = 2;
    if (foo === bar) {
      console.log('foo equals bar');
  \t\t}
  }`
]);

ruleTester.addTestGroup('allow-tabs', 'should pass with option of "tabs"', [
  {
    code: dedent`
    function testFn() {
    \tlet foo = 1;
    \tlet bar = 2;
    \tif (foo === bar) {
    \t\tconsole.log('foo equals bar');
    \t}
    }`,
    options: [{ type: 'tabs' }]
  },
  {
    code: dedent`
    function testFn() {
    \tlet foo = 1;
    \tlet bar = 2;
    \tif (foo === bar) {
    \t\tconsole.log('foo equals bar');
    \t}
    }`,
    options: [{ type: 'tabs', smartTabs: true }]
  }
]);

ruleTester.addTestGroup('allow-spaces', 'should pass with option of "spaces"', [
  {
    code: dedent`
    function testFn() {
     let foo = 1;
     let bar = 2;
     if (foo === bar) {
      console.log('foo equals bar');
     }
    }`,
    options: [{ type: 'spaces' }]
  },
  {
    code: dedent`
    function testFn() {
     let foo = 1;
     let bar = 2;
     if (foo === bar) {
      console.log('foo equals bar');
     }
    }`,
    options: [{ type: 'spaces', smartTabs: true }]
  }
]);

ruleTester.addTestGroup('fail-mixed', 'should fail mixed indentation', [
  {
    code: dedent`
    function testFn() {
     let foo = 1;
     let bar = 2;
     if (foo === bar) {
     \tconsole.log('foo equals bar');
     }
    }`,
    options: [],
    errors: expecting([
      [5, 0, 'indentation has mixed tabs and spaces']
    ])
  },
  {
    code: dedent`
    function testFn() {
     let foo = 1;
     let bar = 2;
     if (foo === bar) {
    \t console.log('foo equals bar');
     }
    }`,
    options: [],
    errors: expecting([
      [5, 0, 'indentation has mixed tabs and spaces']
    ])
  },
  {
    code: dedent`
    function testFn() {
     let foo = 1;
     let bar = 2;
     if (foo === bar) {
     \tconsole.log('foo equals bar');
     }
    }`,
    options: [{ smartTabs: true }],
    errors: expecting([
      [5, 0, 'indentation has mixed tabs and spaces']
    ])
  }
]);

ruleTester.addTestGroup('fail-wrong-indent-type', 'should fail spaces in tabs or tabs in spaces', [
  {
    code: dedent`
    function testFn() {
    \tlet foo = 1;
    \tlet bar = 2;
    \tif (foo === bar) {
      console.log('foo equals bar');
    \t}
    }`,
    options: [{ type: 'tabs' }],
    errors: expecting([
      [5, 0, 'tab indentation expected']
    ])
  },
  {
    code: dedent`
    function testFn() {
     let foo = 1;
     let bar = 2;
     if (foo === bar) {
    \t\tconsole.log('foo equals bar');
     }
    }`,
    options: [{ type: 'spaces' }],
    errors: expecting([
      [5, 0, 'space indentation expected']
    ])
  },
  {
    code: dedent`
    function testFn() {
    \tlet foo = 1;
    \tlet bar = 2;
    \tif (foo === bar) {
      console.log('foo equals bar');
    \t}
    }`,
    options: [{ type: 'tabs', smartTabs: true }] // Not an error because smart tabs allows zero tabs and some spaces for alignment
  },
  {
    code: dedent`
    function testFn() {
     let foo = 1;
     let bar = 2;
     if (foo === bar) {
    \t\tconsole.log('foo equals bar');
     }
    }`,
    options: [{ type: 'spaces', smartTabs: true }],
    errors: expecting([
      [5, 0, 'space indentation expected']
    ])
  }
]);

ruleTester.addTestGroup('smart-tabs', 'should pass with smart tabs and fail without', [
  {
    code: dedent`
    function testFn() {
    \tconst foo = 1,
    \t      bar = 2;
    \tif (foo === bar) {
    \t\tconsole.log('foo equals bar');
    \t}
    }`,
    options: [{ type: 'tabs' }],
    errors: expecting([
      [3, 0, 'tab indentation expected']
    ])
  },
  {
    code: dedent`
    function testFn() {
    \tconst foo = 1,
    \t      bar = 2;
    \tif (foo === bar) {
    \t\tconsole.log('foo equals bar');
    \t}
    }`,
    options: [{ type: 'tabs', smartTabs: true }]
  }
]);

ruleTester.runTests();
