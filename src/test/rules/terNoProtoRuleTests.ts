import { RuleTester, Position } from './ruleTester';

const ruleTester = new RuleTester('ter-no-proto');

const noProtoError = {
  failure: 'The `__proto__` property is deprecated.',
  startPosition: new Position(0),
  endPosition: new Position(0)
};

ruleTester.addTestGroup(
  'valid',
  'should pass when using __proto__ as variable name',
  ['var __proto__ = null;']
);

ruleTester.addTestGroup(
  'valid',
  'should pass when using __proto__ variable as array index',
  ['var a = test[__proto__];']
);

ruleTester.addTestGroup(
  'invalid',
  'should fail when using __proto__ string as array index',
  [
    {
      code: 'var a = test["__proto__"];',
      errors: [noProtoError]
    }
  ]
);

ruleTester.addTestGroup(
  'invalid',
  'should fail when using __proto__ to get Object prototype',
  [
    {
      code: 'var a = test.__proto__;',
      errors: [noProtoError]
    }
  ]
);

ruleTester.runTests();
