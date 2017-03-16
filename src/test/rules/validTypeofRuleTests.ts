import { RuleTester, Position, Failure } from './ruleTester';

const ruleTester = new RuleTester('valid-typeof');

// There is only one message, checking start and end
function expecting(errors: [number, number]): Failure[] {
  return [{
    failure: 'invalid typeof comparison value',
    startPosition: new Position(0, errors[0]),
    endPosition: new Position(0, errors[1])
  }];
}

ruleTester.addTestGroup('valid', 'should pass when using valid strings or variables', [
  'if (typeof foo === "string") {}',
  'if (typeof bar == \'undefined\') {}',
  'if (typeof foo === baz) {}',
  'if (typeof bar === typeof qux) {}'
]);

ruleTester.addTestGroup('invalid', 'should fail when using invalid strings', [
  { code: 'if (typeof foo === "strnig") {}', errors: expecting([4, 14]) },
  { code: 'if (typeof fooz == "undefimed") {}', errors: expecting([4, 15]) },
  { code: 'if (typeof bar != \'nunber\') {}', errors: expecting([4, 14]) },
  { code: 'if (typeof barz !== "fucntion") {}', errors: expecting([4, 15]) }
]);

ruleTester.runTests();
