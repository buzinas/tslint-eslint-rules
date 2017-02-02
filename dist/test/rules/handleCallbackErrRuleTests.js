"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('handle-callback-err');
var error = {
    failure: 'Expected error to be handled',
    startPosition: new ruleTester_1.Position(),
    endPosition: new ruleTester_1.Position()
};
var strictError = {
    failure: 'Expected error to be handled without property access at least once',
    startPosition: new ruleTester_1.Position(),
    endPosition: new ruleTester_1.Position()
};
ruleTester.addTestGroup('standard-pass', 'should pass with standard config', [
    'function(stream) {}',
    (_a = ["\n    function loadData (err, data) {\n      if (err) {\n          console.log(err.stack);\n      }\n      doSomething();\n    }"], _a.raw = ["\n    function loadData (err, data) {\n      if (err) {\n          console.log(err.stack);\n      }\n      doSomething();\n    }"], ruleTester_1.dedent(_a)),
    (_b = ["\n    function loadData (Err, data) {\n      if (Err) {\n          console.log(Err.stack);\n      }\n      doSomething();\n    }"], _b.raw = ["\n    function loadData (Err, data) {\n      if (Err) {\n          console.log(Err.stack);\n      }\n      doSomething();\n    }"], ruleTester_1.dedent(_b)),
    (_c = ["\n    function test (cb) {\n      doSomething(function (err) {\n        cb(err)\n      })\n    }"], _c.raw = ["\n    function test (cb) {\n      doSomething(function (err) {\n        cb(err)\n      })\n    }"], ruleTester_1.dedent(_c)),
    (_d = ["\n    app.listen(PORT, err => {\n      if (err) {\n        console.log(err);\n        return;\n      }\n    }\n    "], _d.raw = ["\n    app.listen(PORT, err => {\n      if (err) {\n        console.log(err);\n        return;\n      }\n    }\n    "], ruleTester_1.dedent(_d)),
    (_e = ["\n    app.listen(PORT, (err) => {\n      if (err) {\n        console.log(err);\n        return;\n      }\n    }\n    "], _e.raw = ["\n    app.listen(PORT, (err) => {\n      if (err) {\n        console.log(err);\n        return;\n      }\n    }\n    "], ruleTester_1.dedent(_e)),
    "function handle (arg, err) {}"
]);
ruleTester.addTestGroup('standard-fail', 'should fail with standard config', [
    {
        code: "function(err, stream) { stream.on('done', function(){exit(0)} }",
        errors: [error]
    },
    {
        code: "function loadData (err, data) { doSomething(); }",
        errors: [error]
    },
    {
        code: (_f = ["\n      test(function (err) {\n        console.log('hello world')\n      })"], _f.raw = ["\n      test(function (err) {\n        console.log('hello world')\n      })"], ruleTester_1.dedent(_f)),
        errors: [error]
    },
    { code: "test(err => undefined)", errors: [error] },
    { code: "const cb = (err) => null", errors: [error] },
    { code: "var cb = function (err) {}", errors: [error] },
    { code: (_g = ["\n    function loadData (err, data) {\n      if (error) {\n          console.log(error.stack);\n      }\n      doSomething();\n    }"], _g.raw = ["\n    function loadData (err, data) {\n      if (error) {\n          console.log(error.stack);\n      }\n      doSomething();\n    }"], ruleTester_1.dedent(_g)),
        errors: [error]
    }
]);
ruleTester.addTestGroup('custom-error-name-pass', 'should pass with custom error name', [
    {
        code: (_h = ["\n      function isRecoverable (error: TSError) {\n        return error.diagnostics.every(x => RECOVERY_CODES.indexOf(x.code) > -1)\n     }"], _h.raw = ["\n      function isRecoverable (error: TSError) {\n        return error.diagnostics.every(x => RECOVERY_CODES.indexOf(x.code) > -1)\n     }"], ruleTester_1.dedent(_h)),
        options: ['error']
    },
    {
        code: (_j = ["\n      const foo = (error: TSError) => {\n        return error.one.two.three.four.five(0);\n      }"], _j.raw = ["\n      const foo = (error: TSError) => {\n        return error.one.two.three.four.five(0);\n      }"], ruleTester_1.dedent(_j)),
        options: ['error']
    },
    { code: "function(errorMsg, stream) { console.error(errorMsg) }", options: ['errorMsg'] },
    { code: "function(err, stream) { }", options: ['errorMsg'] }
]);
ruleTester.addTestGroup('custom-error-name-fail', 'should fail with custom error name', [
    {
        code: (_k = ["\n      const foo = (error: TSError) => {\n        return one.two.three.error.four.five(0);\n      }"], _k.raw = ["\n      const foo = (error: TSError) => {\n        return one.two.three.error.four.five(0);\n      }"], ruleTester_1.dedent(_k)),
        options: ['error'],
        errors: [error]
    },
    {
        code: (_l = ["\n      const foo = (error: TSError) => {\n        return error.one.two.three.four.five(0);\n      }"], _l.raw = ["\n      const foo = (error: TSError) => {\n        return error.one.two.three.four.five(0);\n      }"], ruleTester_1.dedent(_l)),
        options: ['error', { allowProperties: false }],
        errors: [strictError]
    },
    { code: "function(errorMsg, stream) { }", options: ['errorMsg'], errors: [error] },
    {
        code: "error => console.error('Could not print the document');",
        options: ['error'],
        errors: [error]
    },
    {
        code: "error => something.something.error.something.err('Could not print the document');",
        options: ['^(err|error)$'],
        errors: [error]
    },
    {
        code: "error => console.error(error.stack);",
        options: ['^(err|error)$']
    },
    {
        code: "error => console.error(error.stack);",
        options: ['^(err|error)$', { allowProperties: false }],
        errors: [strictError]
    },
    {
        code: 'var test = err => err.message;',
        options: [{ allowProperties: false }],
        errors: [strictError]
    },
    {
        code: "error => error ? console.error(error.stack) : console.log('no error');",
        options: ['^(err|error)$']
    },
    {
        code: "error => error ? console.error(error.stack) : console.log('no error');",
        options: ['^(err|error)$', { allowProperties: false }]
    }
]);
ruleTester.addTestGroup('custom-error-regex-pass', 'should pass with custom error regex', [
    {
        code: "function(errorMsg, stream) { console.error(errorMsg) }",
        options: ['^(err|error|errorMsg)$']
    },
    {
        code: (_m = ["\n      function query (cb) {\n        doThing(function (err) {\n          closeConnection(function (closeErr) {\n            cb(err || closeErr)\n          })\n        })\n      }"], _m.raw = ["\n      function query (cb) {\n        doThing(function (err) {\n          closeConnection(function (closeErr) {\n            cb(err || closeErr)\n          })\n        })\n      }"], ruleTester_1.dedent(_m)),
        options: ['^(err|closeErr)$']
    }
]);
ruleTester.addTestGroup('custom-error-regex-fail', 'should fail with custom error regex', [
    {
        code: "function(err, stream) { }",
        options: ['^(err|error|errorMsg)$'],
        errors: [error]
    },
    {
        code: "function(error, stream) { }",
        options: ['^(err|error|errorMsg)$'],
        errors: [error]
    },
    {
        code: "function(errorMsg, stream) { }",
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
        code: (_o = ["\n      function test(err) {\n        try {\n          console.log('error', err);\n          throw Error('some error');\n        } catch (err) {\n          console.log('Did you handle the original error?', err);\n        }\n      }"], _o.raw = ["\n      function test(err) {\n        try {\n          console.log('error', err);\n          throw Error('some error');\n        } catch (err) {\n          console.log('Did you handle the original error?', err);\n        }\n      }"], ruleTester_1.dedent(_o))
    },
    (_p = ["\n    getData(function(err, data) {\n      if (err) {}\n      getMoreDataWith(data, function(err, moreData) {\n        if (err) {}\n        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n          if (err) {}\n        });\n      });\n    });"], _p.raw = ["\n    getData(function(err, data) {\n      if (err) {}\n      getMoreDataWith(data, function(err, moreData) {\n        if (err) {}\n        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n          if (err) {}\n        });\n      });\n    });"], ruleTester_1.dedent(_p)),
    'var test = function(err) {if(! err){doSomethingHere();}};',
    (_q = ["\n    function test(err, data) {\n      if (data) {\n        doSomething(function(err) {\n          console.error(err);\n        });\n      } else if (err) {\n        console.log(err);\n      }\n    }"], _q.raw = ["\n    function test(err, data) {\n      if (data) {\n        doSomething(function(err) {\n          console.error(err);\n        });\n      } else if (err) {\n        console.log(err);\n      }\n    }"], ruleTester_1.dedent(_q)),
    (_r = ["\n    function handler(err, data) {\n      if (data) {\n        doSomethingWith(data);\n      } else if (err) {\n        console.log(err);\n      }\n    }"], _r.raw = ["\n    function handler(err, data) {\n      if (data) {\n        doSomethingWith(data);\n      } else if (err) {\n        console.log(err);\n      }\n    }"], ruleTester_1.dedent(_r)),
    'function handler(err) {logThisAction(function(err) {if (err) {}}); console.log(err);}',
    'function userHandler(err) {process.nextTick(function() {if (err) {}})}',
    (_s = ["\n    function help() {\n      function userHandler(err) {\n        function tester() {\n          err;\n          process.nextTick(function() {\n            err;\n          });\n        }\n      }\n    }"], _s.raw = ["\n    function help() {\n      function userHandler(err) {\n        function tester() {\n          err;\n          process.nextTick(function() {\n            err;\n          });\n        }\n      }\n    }"], ruleTester_1.dedent(_s)),
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
        code: (_t = ["\n      function test(err) {\n        try{}\n        catch(err) {\n          console.log('did not handle the test err', err);\n        }\n      }"], _t.raw = ["\n      function test(err) {\n        try{}\n        catch(err) {\n          console.log('did not handle the test err', err);\n        }\n      }"], ruleTester_1.dedent(_t)),
        errors: [error]
    },
    { code: (_u = ["\n      function test(err, callback) {\n        foo(function(err, callback) {\n        });\n      }"], _u.raw = ["\n      function test(err, callback) {\n        foo(function(err, callback) {\n        });\n      }"], ruleTester_1.dedent(_u)),
        errors: [error, error]
    },
    { code: 'var test = (err) => {};', errors: [error] },
    { code: 'var test = function(err) {};', errors: [error] },
    { code: 'var test = function test(err, data) {};', errors: [error] },
    { code: 'var test = function test(err) {/* if(err){} */};', errors: [error] },
    { code: (_v = ["\n      function test(err) {\n        doSomethingHere(function(err){\n          console.log(err);\n        })\n      }"], _v.raw = ["\n      function test(err) {\n        doSomethingHere(function(err){\n          console.log(err);\n        })\n      }"], ruleTester_1.dedent(_v)),
        errors: [error]
    },
    { code: 'function test(error) {}', options: ['error'], errors: [error] },
    {
        code: (_w = ["\n      getData(function(err, data) {\n        getMoreDataWith(data, function(err, moreData) {\n          if (err) {}\n          getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n            if (err) {}\n          });\n        }); \n      });"], _w.raw = ["\n      getData(function(err, data) {\n        getMoreDataWith(data, function(err, moreData) {\n          if (err) {}\n          getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n            if (err) {}\n          });\n        }); \n      });"], ruleTester_1.dedent(_w)),
        errors: [error]
    },
    { code: (_x = ["\n    getData(function(err, data) {\n      getMoreDataWith(data, function(err, moreData) {\n        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n          if (err) {}\n        });\n      });\n    });"], _x.raw = ["\n    getData(function(err, data) {\n      getMoreDataWith(data, function(err, moreData) {\n        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n          if (err) {}\n        });\n      });\n    });"], ruleTester_1.dedent(_x)),
        errors: [error, error]
    },
    { code: (_y = ["\n    function userHandler(err) {\n      logThisAction(function(err) {\n        if (err) {\n          console.log(err);\n        }\n      })\n    }"], _y.raw = ["\n    function userHandler(err) {\n      logThisAction(function(err) {\n        if (err) {\n          console.log(err);\n        }\n      })\n    }"], ruleTester_1.dedent(_y)),
        errors: [error] },
    { code: (_z = ["\n    function help() {\n      function userHandler(err) {\n        function tester(err) {\n          err;\n          process.nextTick(function() {\n            err;\n          });\n        }\n      }\n    }"], _z.raw = ["\n    function help() {\n      function userHandler(err) {\n        function tester(err) {\n          err;\n          process.nextTick(function() {\n            err;\n          });\n        }\n      }\n    }"], ruleTester_1.dedent(_z)),
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
        errors: [error]
    },
    {
        code: 'var test = function(err) { console.log(error); };',
        options: ['^(err|error)$'],
        errors: [error]
    }
]);
ruleTester.runTests();
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvaGFuZGxlQ2FsbGJhY2tFcnJSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUFxRTtBQUdyRSxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUV6RCxJQUFNLEtBQUssR0FBWTtJQUNyQixPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLGFBQWEsRUFBRSxJQUFJLHFCQUFRLEVBQUU7SUFDN0IsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtDQUM1QixDQUFDO0FBQ0YsSUFBTSxXQUFXLEdBQVk7SUFDM0IsT0FBTyxFQUFFLG9FQUFvRTtJQUM3RSxhQUFhLEVBQUUsSUFBSSxxQkFBUSxFQUFFO0lBQzdCLFdBQVcsRUFBRSxJQUFJLHFCQUFRLEVBQUU7Q0FDNUIsQ0FBQztBQUVGLFVBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLGtDQUFrQyxFQUFFO0lBQzNFLHFCQUFxQjswSkFDZixrSUFNRixHQU5KLG1CQUFNOzBKQU9BLGtJQU1GLEdBTkosbUJBQU07MEhBT0Esa0dBS0YsR0FMSixtQkFBTTs2SUFNQSxxSEFPSCxHQVBILG1CQUFNOytJQVFBLHVIQU9ILEdBUEgsbUJBQU07SUFRTiwrQkFBK0I7Q0FDaEMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsa0NBQWtDLEVBQUU7SUFDM0U7UUFDRSxJQUFJLEVBQUUsaUVBQWlFO1FBQ3ZFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNoQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGtEQUFrRDtRQUN4RCxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDaEI7SUFDRDtRQUNFLElBQUksbUdBQVEsNkVBR1AsR0FIQyxtQkFBTSxLQUdQO1FBQ0wsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLENBQUMs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UUFDSixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0tBQ3ZCO0lBQ0QsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUseUNBQXlDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDcEUsRUFBRSxJQUFJLEVBQUUsa0RBQWtELEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDN0UsRUFBRSxJQUFJLDhJQUFRLHdIQUtSLEdBTEUsbUJBQU0sS0FLUjtRQUNKLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNoQjtJQUNELEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ3hFO1FBQ0UsSUFBSSx1UkFBUSxpUUFRTixHQVJBLG1CQUFNLEtBUU47UUFDTixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDaEI7SUFDRCxFQUFFLElBQUksaVBBQVEsMk5BT1IsR0FQRSxtQkFBTSxLQU9SO1FBQ0osTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztLQUN2QjtJQUNELEVBQUUsSUFBSSwyS0FBUSxxSkFPVixHQVBJLG1CQUFNLEtBT1Y7UUFDRixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBQztJQUNsQixFQUFFLElBQUksdU9BQVEsaU5BVVYsR0FWSSxtQkFBTSxLQVVWO1FBQ0YsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsNkRBQTZEO1FBQ25FLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUN0QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDaEI7SUFDRDtRQUNFLElBQUksRUFBRSxvQ0FBb0M7UUFDMUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUFDO0lBQ2xCO1FBQ0UsSUFBSSxFQUFFLG1EQUFtRDtRQUN6RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDMUIsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvaGFuZGxlQ2FsbGJhY2tFcnJSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
