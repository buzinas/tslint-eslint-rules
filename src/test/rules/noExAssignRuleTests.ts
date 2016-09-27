/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'no-ex-assign';
const scripts = {
  valid: [
    'try { } catch (e) { three = 2 + 1; }',
    'try { } catch ({e}) { this.something = 2; }", ecmaFeatures: { destructuring: true } }',
    'function foo() { try { } catch (e) { return false; } }',
    `
    import {Aurelia} from "aurelia-framework";
    import {bootstrap} from "aurelia-bootstrapper";
    import {TemplateRegistryEntry, Loader} from "aurelia-loader";
    import {TextTemplateLoader} from "aurelia-loader-default";

    declare var frontendConfig: { translate: string, debug: boolean };

    (<any>TextTemplateLoader).prototype.standardLoadTemplate = TextTemplateLoader.prototype.loadTemplate;
    TextTemplateLoader.prototype.loadTemplate = function(loader: Loader, entry: TemplateRegistryEntry): Promise<any> {
        entry.address += "?translate=" + frontendConfig.language;
        return (<any>this).standardLoadTemplate(loader, entry);
    };

    export function bootstrapComponents(): void {
        "use strict";

        let paths: string[] = [];
        for (let i = 0; i < arguments.length; i++) {
            let component: string = arguments[i];
            paths.push("frontend/components/" + component + "/" + component);
        }

        bootstrap((aurelia: Aurelia) => { // line 23
            aurelia.use
                .defaultBindingLanguage()
                .defaultResources()
                .developmentLogging()
                .globalResources(paths);

            aurelia.start().then(()  => aurelia.enhance({}, document.body));
        });
    }
    `,
    `
    import {Component} from '@angular/core';

    @Component({

    })
    export class App {
    }
    `,
    `
    describe("The Basic Config", (): void => {
        it("shall have specific properties attached to it.", (done: (error?: Error) => void): void => {
            chai.expect(config).to.contain.all.keys(["extends", "rules", "rulesDirectory"]);

            chai.expect(config.extends).to.be.an("array");
            chai.expect(config.rulesDirectory).to.be.an("array");
            chai.expect(config.rules).to.be.an("object");

            done();
        });
    });
    `
  ],
  invalid: [
    'try { } catch (e) { e = 10; }',
    'try { } catch (ex) { ex = 10; }',
    'try { } catch (ex) { [ex] = []; }',
    'try { } catch (ex) { ({x: ex = 0}) = {}; }',
    `
    import {Component} from '@angular/core';

    @Component({
    })
    export class MyApp {
      public hi() {
        try {
          console.log('Hello World');
        }
        catch (e) {
          // Hi
          let z = 'xxxx';
          e = 2;
          let x = e;
          z.toString();
          z = 'gfdg';
          console.log('Done!', x, z);
          console.log(e);
        }
      }
    }
    `
  ]
};

describe(rule, function test() {
  it('should pass when not assigning a value to exception', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when assigning a value to exception', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
