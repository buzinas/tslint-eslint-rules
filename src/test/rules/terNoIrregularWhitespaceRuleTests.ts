import { RuleTester, Position, Failure } from './ruleTester';

const ruleTester = new RuleTester('ter-no-irregular-whitespace');

// There is only one message, checking for line and column
function expecting(errors: [number, number][]): Failure[] {
  return errors.map((err) => {
    return {
      failure: 'irregular whitespace not allowed',
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('valid', 'should pass when not using irregular whitespaces', [
  '"\\u000B";',
  '"\\u000C";',
  '"\\u0085";',
  '"\\u00A0"',
  '"\\u180E";',
  '"\\ufeff";',
  '"\\u2000";',
  '"\\u2001";',
  '"\\u2002";',
  '"\\u2003";',
  '"\\u2004";',
  '"\\u2005";',
  '"\\u2006";',
  '"\\u2007";',
  '"\\u2008";',
  '"\\u2009";',
  '"\\u200A";',
  '"\\u200B";',
  '"\\u2028";',
  '"\\u2029";',
  '"\\u202F";',
  '"\\u205f";',
  '"\\u3000";',
  '"\u000B";',
  '"\u000C";',
  '"\u0085";',
  '"\u00A0"',
  '"\u180E";',
  '"\ufeff";',
  '"\u2000";',
  '"\u2001";',
  '"\u2002";',
  '"\u2003";',
  '"\u2004";',
  '"\u2005";',
  '"\u2006";',
  '"\u2007";',
  '"\u2008";',
  '"\u2009";',
  '"\u200A";',
  '"\u200B";',
  '"\\\u2028";', // multiline string
  '"\\\u2029";', // multiline string
  '"\u202F";',
  '"\u205f";',
  '"\u3000";'
]);

ruleTester.addTestGroup('invalid', 'should fail when using irregular whitespaces', [
  { code: 'var foo \u000B = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u000C = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u00A0 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u180E = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \ufeff = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2000 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2001 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2002 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2003 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2004 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2005 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2006 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2007 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2008 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2009 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u200A = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2028 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u2029 = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u202F = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u205f = "thing";', errors: expecting([[0, 8]]) },
  { code: 'var foo \u3000 = "thing";', errors: expecting([[0, 8]]) },
  {
    code: 'var a = "b",\u2028c = "d",\ne = "f"\u2028',
    errors: expecting([[0, 12], [1, 7]])
  },
  {
    code: 'var foo \u3000 = "thing", other \u3000 = "thing";\nvar third \u3000 = "thing";',
    errors: expecting([[0, 8], [0, 27], [1, 10]])
  }
]);

ruleTester.runTests();
