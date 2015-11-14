/// <reference path='../../../typings/mocha/mocha.d.ts' />
import {makeTest} from './helper';

const rule = 'no-ex-assign';
const scripts = {
  valid: [
    'try { } catch (e) { three = 2 + 1; }',
    'try { } catch ({e}) { this.something = 2; }", ecmaFeatures: { destructuring: true } }',
    'function foo() { try { } catch (e) { return false; } }'
  ],
  invalid: [
    'try { } catch (e) { e = 10; }',
    'try { } catch (ex) { ex = 10; }',
    'try { } catch (ex) { [ex] = []; }',
    'try { } catch (ex) { ({x: ex = 0}) = {}; }',
    'try { } catch ({message}) { message = 10; }'
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
