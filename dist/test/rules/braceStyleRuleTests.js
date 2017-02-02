"use strict";
var helper_1 = require("./helper");
var rule = 'brace-style';
var scripts = {
    onetbs: {
        valid: [
            "function foo() {\n        return true;\n      }",
            "if (foo) {\n        bar();\n      }",
            "if (foo) {\n        bar();\n      } else {\n        baz();\n      }",
            "try {\n        somethingRisky();\n      } catch(e) {\n        handleError();\n      }",
            "try {\n        somethingRisky();\n      } catch(e) {\n        handleError();\n      } finally() {\n        doSomething();\n      }",
            "try {\n        somethingRisky();\n      } finally() {\n        doSomething();\n      } catch(e) {\n        handleError();\n      }",
            "try {\n        somethingRisky();\n      } finally() {\n        doSomething();\n      }",
            "if (foo) bar();\n      else if (baz) boom();"
        ],
        invalid: [
            "function foo()\n      {\n        return true;\n      }",
            "if (foo)\n      {\n        bar();\n      }",
            "try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }",
            "try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }\n      } finally(e)\n      {\n        doSomething();\n      }",
            "try\n      {\n        somethingRisky();\n      } finally(e)\n      {\n        doSomething();\n      }",
            "if (foo) {\n        bar();\n      }\n      else {\n        baz();\n      }",
            "if (foo) {\n        bar();\n      } else { baz(); }"
        ]
    },
    stroustrup: {
        valid: [
            "function foo() {\n        return true;\n      }",
            "if (foo) {\n        bar();\n      }",
            "if (foo) {\n        bar();\n      }\n      else {\n        baz();\n      }",
            "try {\n        somethingRisky();\n      }\n      catch(e) {\n        handleError();\n      }",
            "try {\n        somethingRisky();\n      }\n      catch(e) {\n        handleError();\n      }\n      finally() {\n        doSomething();\n      }\n      ",
            "try {\n        somethingRisky();\n      }\n      finally {\n        doSomething();\n      }",
            "if (foo) bar();\n      else if (baz) boom();"
        ],
        invalid: [
            "function foo()\n      {\n        return true;\n      }",
            "if (foo)\n      {\n        bar();\n      }",
            "try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }",
            "try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      } finally()\n      {\n        doSomething();\n      }\n      ",
            "try\n      {\n        somethingRisky();\n      } finally()\n      {\n        doSomething();\n      }\n      ",
            "if (foo) {\n        bar();\n      } else {\n        baz();\n      }"
        ]
    },
    allman: {
        valid: [
            "function foo()\n      {\n        return true;\n      }",
            "if (foo)\n      {\n        bar();\n      }",
            "if (foo)\n      {\n        bar();\n      }\n      else\n      {\n        baz();\n      }",
            "try\n      {\n        somethingRisky();\n      }\n      catch(e)\n      {\n        handleError();\n      }",
            "try\n      {\n        somethingRisky();\n      }\n      catch(e)\n      {\n        handleError();\n      }\n      finally()\n      {\n        doSomething();\n      }\n      ",
            "try\n      {\n        somethingRisky();\n      }\n      finally()\n      {\n        doSomething();\n      }\n      ",
            "if (foo) bar();\n      else if (baz) boom();"
        ],
        invalid: [
            "function foo() {\n        return true;\n      }",
            "if (foo)\n      {\n        bar(); }",
            "try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }",
            "try {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      } finally()\n      {\n        doSomething();\n      }\n      ",
            "try {\n        somethingRisky();\n      } finally()\n      {\n        doSomething();\n      }\n      ",
            "if (foo) {\n        bar();\n      } else {\n        baz();\n      }"
        ]
    },
    allowSingleLine: {
        onetbs: {
            valid: [
                "function nop() { return; }",
                "if (foo) { bar(); }",
                "if (foo) { bar(); } else { baz(); }",
                "try { somethingRisky(); } catch(e) { handleError(); }",
                "try { somethingRisky(); } catch(e) { handleError(); } finally() { doSomething(); }",
                "try { somethingRisky(); } finally(e) { doSomething(); }",
                "if (foo) {\n          bar();\n        } else { baz(); }",
                "try {\n          foo();\n        } catch(e) { bar(); }",
                "try {\n          foo();\n        } catch(e) { bar(); }\n        } finally() { doSomething(); }",
                "try {\n          foo();\n        } finally() { doSomething(); }"
            ]
        },
        stroustrup: {
            valid: [
                "function nop() { return; }",
                "if (foo) { bar(); }",
                "if (foo) { bar(); }\n        else { baz(); }",
                "try { somethingRisky(); }\n        catch(e) { handleError(); }",
                "try { somethingRisky(); }\n        catch(e) { handleError(); }\n        finally() { doSomething(); }",
                "try { somethingRisky(); }\n        finally() { doSomething(); }",
                "if (foo) {\n          bar();\n        }\n        else { baz(); }",
                "try {\n          foo();\n        }\n        catch(e) { bar(); }",
                "try {\n          foo();\n        }\n        catch(e) { bar(); }\n        finally() { doSomething(); }",
                "try {\n          foo();\n        }\n        finally() { doSomething(); }"
            ]
        },
        allman: {
            valid: [
                "function nop() { return; }",
                "if (foo) { bar(); }",
                "if (foo) { bar(); }\n        else { baz(); }",
                "try { somethingRisky(); }\n        catch(e) { handleError(); }",
                "try { somethingRisky(); }\n        catch(e) { handleError(); },\n        finally() { doSomething(); }",
                "try { somethingRisky(); }\n        finally(e) { doSomething(); }",
                "if (foo)\n        {\n          bar();\n        } else { baz(); }",
                "try\n        {\n          foo();\n        }\n        catch(e) { bar(); }",
                "try\n        {\n          foo();\n        }\n        catch(e) { bar(); }\n        finally() { doSomething(); }",
                "try\n        {\n          foo();\n        }\n        finally() { doSomething(); }"
            ]
        }
    }
};
describe(rule, function test() {
    var onetbsConfig = { rules: { 'brace-style': [true, '1tbs'] } };
    var stroustrupConfig = { rules: { 'brace-style': [true, 'stroustrup'] } };
    var allmanConfig = { rules: { 'brace-style': [true, 'allman'] } };
    var onetbsConfigWithException = { rules: { 'brace-style': [true, '1tbs', { allowSingleLine: true }] } };
    var stroustrupConfigWithException = { rules: { 'brace-style': [true, 'stroustrup', { allowSingleLine: true }] } };
    var allmanConfigWithException = { rules: { 'brace-style': [true, 'allman', { allowSingleLine: true }] } };
    it('should pass when "1tbs"', function testVariables() {
        helper_1.makeTest(rule, scripts.onetbs.valid, true, onetbsConfig);
    });
    it('should fail when "1tbs"', function testVariables() {
        helper_1.makeTest(rule, scripts.onetbs.invalid, false, onetbsConfig);
    });
    it('should pass when "stroustrup"', function testVariables() {
        helper_1.makeTest(rule, scripts.stroustrup.valid, true, stroustrupConfig);
    });
    it('should fail when "stroustrup"', function testVariables() {
        helper_1.makeTest(rule, scripts.stroustrup.invalid, false, stroustrupConfig);
    });
    it('should pass when "allman"', function testVariables() {
        helper_1.makeTest(rule, scripts.allman.valid, true, allmanConfig);
    });
    it('should fail when "allman"', function testVariables() {
        helper_1.makeTest(rule, scripts.allman.invalid, false, allmanConfig);
    });
    it('should pass when "1tbs" and "allowSingleLine" is true', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.onetbs.valid, true, onetbsConfigWithException);
    });
    it('should pass when "stroustrup" and "allowSingleLine" is true', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.stroustrup.valid, true, stroustrupConfigWithException);
    });
    it('should pass when "allman" and "allowSingleLine" is true', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.allman.valid, true, allmanConfigWithException);
    });
    it('should fail when "1tbs"', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.onetbs.valid, false, onetbsConfig);
    });
    it('should fail when "stroustrup"', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.stroustrup.valid, false, stroustrupConfig);
    });
    it('should fail when "allman"', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.allman.valid, false, allmanConfig);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvYnJhY2VTdHlsZVJ1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQztBQUMzQixJQUFNLE9BQU8sR0FBRztJQUNkLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRTtZQUNMLGlEQUVFO1lBRUYscUNBRUU7WUFFRixxRUFJRTtZQUVGLHVGQUlFO1lBRUYsb0lBTUU7WUFFRixvSUFNRTtZQUVGLHdGQUlFO1lBR0YsOENBQ3NCO1NBQ3ZCO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asd0RBR0U7WUFFRiw0Q0FHRTtZQUVGLHFHQU1FO1lBRUYsbUtBVUU7WUFFRix1R0FNRTtZQUVGLDRFQUtFO1lBRUYscURBRWtCO1NBQ25CO0tBQ0Y7SUFDRCxVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUU7WUFDTCxpREFFRTtZQUVGLHFDQUVFO1lBRUYsNEVBS0U7WUFFRiw4RkFLRTtZQUVGLDBKQVNDO1lBRUQsNkZBS0U7WUFHRiw4Q0FDc0I7U0FDdkI7UUFDRCxPQUFPLEVBQUU7WUFDUCx3REFHRTtZQUVGLDRDQUdFO1lBRUYscUdBTUU7WUFFRixpS0FVQztZQUVELDhHQU9DO1lBRUQscUVBSUU7U0FDSDtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1lBQ0wsd0RBR0U7WUFFRiw0Q0FHRTtZQUVGLDBGQU9FO1lBRUYsNEdBT0U7WUFFRiwrS0FZQztZQUVELHFIQVFDO1lBR0QsOENBQ3NCO1NBQ3ZCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsaURBRUU7WUFFRixxQ0FFVztZQUVYLHFHQU1FO1lBRUYsMEpBU0M7WUFFRCx1R0FNQztZQUVELHFFQUlFO1NBQ0g7S0FDRjtJQUNELGVBQWUsRUFBRTtRQUNmLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRTtnQkFDTCw0QkFBNEI7Z0JBRTVCLHFCQUFxQjtnQkFFckIscUNBQXFDO2dCQUVyQyx1REFBdUQ7Z0JBRXZELG9GQUFv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MkIsRUFBRTtRQUM5QixpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdURBQXVELEVBQUU7UUFDMUQsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3hGLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZEQUE2RCxFQUFFO1FBQ2hFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUNoRyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRTtRQUM1RCxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDeEYsQ0FBQyxDQUFDLENBQUM7SUFLSCxFQUFFLENBQUMseUJBQXlCLEVBQUU7UUFDNUIsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM1RSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtRQUNsQyxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDcEYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkJBQTJCLEVBQUU7UUFDOUIsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM1RSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvYnJhY2VTdHlsZVJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9Xb3JrL0RldmVsb3BtZW50L3dvcmtzcGFjZS90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
