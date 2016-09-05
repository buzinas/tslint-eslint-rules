/// <reference path='../../../typings/mocha/mocha.d.ts' />
import { makeTest } from './helper';

const rule = 'no-irregular-whitespace';
const scripts = {
  valid: [
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
  ],
  invalid: [
    'var foo \u000B = "thing";',
    'var foo \u000C = "thing";',
    'var foo \u00A0 = "thing";',
    'var foo \u180E = "thing";',
    'var foo \ufeff = "thing";',
    'var foo \u2000 = "thing";',
    'var foo \u2001 = "thing";',
    'var foo \u2002 = "thing";',
    'var foo \u2003 = "thing";',
    'var foo \u2004 = "thing";',
    'var foo \u2005 = "thing";',
    'var foo \u2006 = "thing";',
    'var foo \u2007 = "thing";',
    'var foo \u2008 = "thing";',
    'var foo \u2009 = "thing";',
    'var foo \u200A = "thing";',
    'var foo \u2028 = "thing";',
    'var foo \u2029 = "thing";',
    'var foo \u202F = "thing";',
    'var foo \u205f = "thing";',
    'var foo \u3000 = "thing";',
    'var a = "b",\u2028c = "d",\ne = "f"\u2028',
    'var foo \u3000 = "thing", other \u3000 = "thing";\nvar third \u3000 = "thing";'
  ]
};

describe(rule, function test() {
  it('should pass when not using irregular whitespaces', function testValid() {
    makeTest(rule, scripts.valid, true);
  });

  it('should fail when using irregular whitespaces', function testInvalid() {
    makeTest(rule, scripts.invalid, false);
  });
});
