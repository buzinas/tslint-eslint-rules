"use strict";
var helper_1 = require("./helper");
var rule = 'no-ex-assign';
var scripts = {
    valid: [
        'try { } catch (e) { three = 2 + 1; }',
        'try { } catch ({e}) { this.something = 2; }", ecmaFeatures: { destructuring: true } }',
        'function foo() { try { } catch (e) { return false; } }',
        "\n    import {Aurelia} from \"aurelia-framework\";\n    import {bootstrap} from \"aurelia-bootstrapper\";\n    import {TemplateRegistryEntry, Loader} from \"aurelia-loader\";\n    import {TextTemplateLoader} from \"aurelia-loader-default\";\n\n    declare var frontendConfig: { translate: string, debug: boolean };\n\n    (<any>TextTemplateLoader).prototype.standardLoadTemplate = TextTemplateLoader.prototype.loadTemplate;\n    TextTemplateLoader.prototype.loadTemplate = function(loader: Loader, entry: TemplateRegistryEntry): Promise<any> {\n        entry.address += \"?translate=\" + frontendConfig.language;\n        return (<any>this).standardLoadTemplate(loader, entry);\n    };\n\n    export function bootstrapComponents(): void {\n        \"use strict\";\n\n        let paths: string[] = [];\n        for (let i = 0; i < arguments.length; i++) {\n            let component: string = arguments[i];\n            paths.push(\"frontend/components/\" + component + \"/\" + component);\n        }\n\n        bootstrap((aurelia: Aurelia) => { // line 23\n            aurelia.use\n                .defaultBindingLanguage()\n                .defaultResources()\n                .developmentLogging()\n                .globalResources(paths);\n\n            aurelia.start().then(()  => aurelia.enhance({}, document.body));\n        });\n    }\n    ",
        "\n    import {Component} from '@angular/core';\n\n    @Component({\n\n    })\n    export class App {\n    }\n    ",
        "\n    describe(\"The Basic Config\", (): void => {\n        it(\"shall have specific properties attached to it.\", (done: (error?: Error) => void): void => {\n            chai.expect(config).to.contain.all.keys([\"extends\", \"rules\", \"rulesDirectory\"]);\n\n            chai.expect(config.extends).to.be.an(\"array\");\n            chai.expect(config.rulesDirectory).to.be.an(\"array\");\n            chai.expect(config.rules).to.be.an(\"object\");\n\n            done();\n        });\n    });\n    ",
        'try {} catch (err) { if (err instanceof Foo) {} }',
        'try {} catch (err) { if (err == err) {} }',
        'try {} catch (err) { if (err === err) {} }'
    ],
    invalid: [
        'try { } catch (e) { e = 10; }',
        'try { } catch (e) { e += 10; }',
        'try { } catch (e) { e -= 10; }',
        'try { } catch (ex) { ex = 10; }',
        'try { } catch (ex) { [ex] = []; }',
        'try { } catch (ex) { ({x: ex = 0}) = {}; }',
        "\n    import {Component} from '@angular/core';\n\n    @Component({\n    })\n    export class MyApp {\n      public hi() {\n        try {\n          console.log('Hello World');\n        }\n        catch (e) {\n          // Hi\n          let z = 'xxxx';\n          e = 2;\n          let x = e;\n          z.toString();\n          z = 'gfdg';\n          console.log('Done!', x, z);\n          console.log(e);\n        }\n      }\n    }\n    "
    ]
};
describe(rule, function test() {
    it('should pass when not assigning a value to exception', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when assigning a value to exception', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9FeEFzc2lnblJ1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQztBQUM1QixJQUFNLE9BQU8sR0FBRztJQUNkLEtBQUssRUFBRTtRQUNMLHNDQUFzQztRQUN0Qyx1RkFBdUY7UUFDdkYsd0RBQXdEO1FBQ3hELHEwQ0FpQ0M7UUFDRCxtSEFRQztRQUNELHdmQVlDO1FBQ0QsbURBQW1EO1FBQ25ELDJDQUEyQztRQUMzQyw0Q0FBNEM7S0FDN0M7SUFDRCxPQUFPLEVBQUU7UUFDUCwrQkFBK0I7UUFDL0IsZ0NBQWdDO1FBQ2hDLGdDQUFnQztRQUNoQyxpQ0FBaUM7UUFDakMsbUNBQW1DO1FBQ25DLDRDQUE0QztRQUM1Qyx3YkFzQkM7S0FDRjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsSUFBSSxFQUFFO0lBQ2IsRUFBRSxDQUFDLHFEQUFxRCxFQUFFO1FBQ3hELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaURBQWlELEVBQUU7UUFDcEQsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9FeEFzc2lnblJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
