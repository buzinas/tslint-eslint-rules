import { RuleTester, Position } from './ruleTester';

const ruleTester = new RuleTester('ter-no-script-url');

const noScriptUrlError = {
  failure: 'Script URL is a form of eval.',
  startPosition: new Position(0),
  endPosition: new Position(0)
};

ruleTester.addTestGroup('valid', 'no javascript: url', [
  'var a = "Hello World!";',
  'var a = 10;',
  'var url = "xjavascript:"'
]);

ruleTester.addTestGroup('invalid', 'with javascript: url', [
  { code: 'var a = "javascript:void(0);";', errors: [noScriptUrlError] },
  { code: 'var a = "javascript:";', errors: [noScriptUrlError] }
]);

ruleTester.runTests();
