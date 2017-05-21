import { RuleTester, Failure, Position, dedent } from './ruleTester';
// ESLint Tests: https://github.com/eslint/eslint/blob/master/tests/lib/rules/handle-callback-err.js

const ruleTester = new RuleTester('handle-callback-err');

const error: Failure = {
  failure: 'Expected error to be handled',
  startPosition: new Position(),
  endPosition: new Position()
};
const strictError: Failure = {
  failure: 'Expected error to be handled without property access at least once',
  startPosition: new Position(),
  endPosition: new Position()
};

ruleTester.addTestGroup('standard-pass', 'should pass with standard config', [
  'function(stream) {}',
  dedent`
    function loadData (err, data) {
      if (err) {
          console.log(err.stack);
      }
      doSomething();
    }`,
  dedent`
    function loadData (Err, data) {
      if (Err) {
          console.log(Err.stack);
      }
      doSomething();
    }`,
  dedent`
    function test (cb) {
      doSomething(function (err) {
        cb(err)
      })
    }`,
  dedent`
    app.listen(PORT, err => {
      if (err) {
        console.log(err);
        return;
      }
    }
    `,
  dedent`
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    }
    `,
  `function handle (arg, err) {}`
]);

ruleTester.addTestGroup('standard-fail', 'should fail with standard config', [
  {
    code: `function(err, stream) { stream.on('done', function(){exit(0)} }`,
    errors: [error]
  },
  {
    code: `function loadData (err, data) { doSomething(); }`,
    errors: [error]
  },
  {
    code: dedent`
      test(function (err) {
        console.log('hello world')
      })`,
    errors: [error]
  },
  { code: `test(err => undefined)`, errors: [error] },
  { code: `const cb = (err) => null`, errors: [error] },
  { code: `var cb = function (err) {}`, errors: [error] },
  { code: dedent`
    function loadData (err, data) {
      if (error) {
          console.log(error.stack);
      }
      doSomething();
    }`,
    errors: [error]
  }
]);

ruleTester.addTestGroup('custom-error-name-pass', 'should pass with custom error name', [
  {
    code: dedent`
      function isRecoverable (error: TSError) {
        return error.diagnostics.every(x => RECOVERY_CODES.indexOf(x.code) > -1)
     }`,
    options: ['error']
  },
  {
    code: dedent`
      const foo = (error: TSError) => {
        return error.one.two.three.four.five(0);
      }`,
    options: ['error']
  },
  { code: `function(errorMsg, stream) { console.error(errorMsg) }`, options: ['errorMsg'] },
  { code: `function(err, stream) { }`, options: ['errorMsg'] }
]);

ruleTester.addTestGroup('custom-error-name-fail', 'should fail with custom error name', [
  {
    code: dedent`
      const foo = (error: TSError) => {
        return one.two.three.error.four.five(0);
      }`,
    options: ['error'],
    errors: [error]
  },
  {
    code: dedent`
      const foo = (error: TSError) => {
        return error.one.two.three.four.five(0);
      }`,
    options: ['error', { allowProperties: false }],
    errors: [strictError]
  },
  { code: `function(errorMsg, stream) { }`, options: ['errorMsg'], errors: [error] },
  {
    code: `error => console.error('Could not print the document');`,
    options: ['error'],
    errors: [error]
  },
  {
    code: `error => something.something.error.something.err('Could not print the document');`,
    options: ['^(err|error)$'],
    errors: [error]
  },
  {
    code: `error => console.error(error.stack);`,
    options: ['^(err|error)$']
  },
  {
    code: `error => console.error(error.stack);`,
    options: ['^(err|error)$', { allowProperties: false }],
    errors: [strictError]
  },
  {
    code: 'var test = err => err.message;',
    options: [{ allowProperties: false }],
    errors: [strictError]
  },
  {
    code: `error => error ? console.error(error.stack) : console.log('no error');`,
    options: ['^(err|error)$']
  },
  {
    code: `error => error ? console.error(error.stack) : console.log('no error');`,
    options: ['^(err|error)$', { allowProperties: false }]
  }
]);

ruleTester.addTestGroup('custom-error-regex-pass', 'should pass with custom error regex', [
  {
    code: `function(errorMsg, stream) { console.error(errorMsg) }`,
    options: ['^(err|error|errorMsg)$']
  },
  {
    code: dedent`
      function query (cb) {
        doThing(function (err) {
          closeConnection(function (closeErr) {
            cb(err || closeErr)
          })
        })
      }`,
    options: ['^(err|closeErr)$']
  }
]);

ruleTester.addTestGroup('custom-error-regex-fail', 'should fail with custom error regex', [
  {
    code: `function(err, stream) { }`,
    options: ['^(err|error|errorMsg)$'],
    errors: [error]
  },
  {
    code: `function(error, stream) { }`,
    options: ['^(err|error|errorMsg)$'],
    errors: [error]
  },
  {
    code: `function(errorMsg, stream) { }`,
    options: ['^(err|error|errorMsg)$'],
    errors: [error]
  }
]);

ruleTester.addTestGroup('eslint-valid', 'should pass eslint valid tests', [
  'function test(error) {}',
  'function test(err) {console.log(err);}',
  "function test(err, data) {if(err){ data = 'ERROR';}}",
  'var test = function(err) {console.log(err);};',
  'var test = function(err) {if(err){/* do nothing */}};',
  'var test = function(err) {if(!err){doSomethingHere();}else{};}',
  'var test = function(err, data) {if(!err) { good(); } else { bad(); }}',
  'try { } catch(err) {}',
  {
    code: dedent`
      function test(err) {
        try {
          console.log('error', err);
          throw Error('some error');
        } catch (err) {
          console.log('Did you handle the original error?', err);
        }
      }`
  },
  dedent`
    getData(function(err, data) {
      if (err) {}
      getMoreDataWith(data, function(err, moreData) {
        if (err) {}
        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {
          if (err) {}
        });
      });
    });`,
  'var test = function(err) {if(! err){doSomethingHere();}};',
  dedent`
    function test(err, data) {
      if (data) {
        doSomething(function(err) {
          console.error(err);
        });
      } else if (err) {
        console.log(err);
      }
    }`,
  dedent`
    function handler(err, data) {
      if (data) {
        doSomethingWith(data);
      } else if (err) {
        console.log(err);
      }
    }`,
  'function handler(err) {logThisAction(function(err) {if (err) {}}); console.log(err);}',
  'function userHandler(err) {process.nextTick(function() {if (err) {}})}',
  dedent`
    function help() {
      function userHandler(err) {
        function tester() {
          err;
          process.nextTick(function() {
            err;
          });
        }
      }
    }`,
  "function help(done) { var err = new Error('error'); done(); }",
  { code: 'var test = err => err;' },
  { code: 'var test = err => !err;' },
  { code: 'var test = err => err.message;' },
  { code: 'var test = function(error) {if(error){/* do nothing */}};', options: ['error'] },
  { code: 'var test = (error) => {if(error){/* do nothing */}};', options: ['error'] },
  { code: 'var test = function(error) {if(! error){doSomethingHere();}};', options: ['error'] },
  { code: 'var test = function(err) { console.log(err); };', options: ['^(err|error)$'] },
  { code: 'var test = function(error) { console.log(error); };', options: ['^(err|error)$'] },
  { code: 'var test = function(anyError) { console.log(anyError); };', options: ['^.+Error$'] },
  { code: 'var test = function(any_error) { console.log(anyError); };', options: ['^.+Error$'] },
  {
    code: 'var test = function(any_error) { console.log(any_error); };',
    options: ['^.+(e|E)rror$']
  }
]);

ruleTester.addTestGroup('eslint-invalid', 'should fail eslint invalid tests', [
  { code: 'function test(err) {}', errors: [error] },
  { code: 'function test(err, data) {}', errors: [error] },
  { code: 'function test(err) {errorLookingWord();}', errors: [error] },
  { code: 'function test(err) {try{} catch(err) {}}', errors: [error] },
  {
    code: dedent`
      function test(err) {
        try{}
        catch(err) {
          console.log('did not handle the test err', err);
        }
      }`,
    errors: [error]
  },
  { code: dedent`
      function test(err, callback) {
        foo(function(err, callback) {
        });
      }`,
    errors: [error, error]
  },
  { code: 'var test = (err) => {};', errors: [error] },
  { code: 'var test = function(err) {};', errors: [error] },
  { code: 'var test = function test(err, data) {};', errors: [error] },
  { code: 'var test = function test(err) {/* if(err){} */};', errors: [error] },
  { code: dedent`
      function test(err) {
        doSomethingHere(function(err){
          console.log(err);
        })
      }`,
    errors: [error]
  },
  { code: 'function test(error) {}', options: ['error'], errors: [error] },
  {
    code: dedent`
      getData(function(err, data) {
        getMoreDataWith(data, function(err, moreData) {
          if (err) {}
          getEvenMoreDataWith(moreData, function(err, allOfTheThings) {
            if (err) {}
          });
        });
      });`,
    errors: [error]
  },
  { code: dedent`
    getData(function(err, data) {
      getMoreDataWith(data, function(err, moreData) {
        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {
          if (err) {}
        });
      });
    });`,
    errors: [error, error]
  },
  { code: dedent`
    function userHandler(err) {
      logThisAction(function(err) {
        if (err) {
          console.log(err);
        }
      })
    }`,
    errors: [error]},
  { code: dedent`
    function help() {
      function userHandler(err) {
        function tester(err) {
          err;
          process.nextTick(function() {
            err;
          });
        }
      }
    }`,
    errors: [error]
  },
  {
    code: 'var test = function(anyError) { console.log(otherError); };',
    options: ['^.+Error$'],
    errors: [error]
  },
  {
    code: 'var test = function(anyError) { };',
    options: ['^.+Error$'],
    errors: [error]},
  {
    code: 'var test = function(err) { console.log(error); };',
    options: ['^(err|error)$'],
    errors: [error]
  }
]);

ruleTester.runTests();
