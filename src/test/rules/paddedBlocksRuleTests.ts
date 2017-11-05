import { RuleTester, Failure, Position } from './ruleTester';
import { Rule as PaddedBlocksRule } from '../../rules/paddedBlocksRule';

const ruleTester = new RuleTester('padded-blocks');
const FAILURE_STRING = PaddedBlocksRule.FAILURE_STRING;

function expecting(errors: [string, [number, number], [number, number]][]): Failure[] {
  return errors.map(([message, start, end]) => {
    return {
      failure: message,
      startPosition: new Position(start[0], start[1]),
      endPosition: new Position(end[0], end[1])
    };
  });
}

const fixtures = {
  padded: {
    if: 'if (a) {\n\nb();\n\n}',
    ifElse: 'if (a) {\n\nb();\n\n} else {\n\nb();\n\n}',
    ifComment: 'if (a) {\n\n// Comment\nb();\n\n}',
    ifEmpty: 'if (a) {\n\n}',
    class: 'class Foo {\n\npublic a: any;\n\n}'
  },
  notPadded: {
    if: 'if (a) {\nb();\n}',
    ifElse: 'if (a) {\nb();\n} else {\nb();\n}',
    ifComment: 'if (a) {\n// Comment\nb();\n}',
    ifEmpty: 'if (a) {\n}',
    class: 'class Foo {\npublic a: any;\n}'
  },
  mixed: {
    ifPaddedElse: 'if (a) {\n\nb();\n\n} else {\nb();\n}',
    ifElsePadded: 'if (a) {\nb();\n} else {\n\nb();\n\n}'
  }
};

ruleTester.addTestGroup(
  'always-pass',
  'should pass padded blocks',
  Object.keys(fixtures.padded).map(key => ({ code: fixtures.padded[key], options: ['always'] })));

ruleTester.addTestGroup(
  'never-pass',
  'should pass non-padded blocks',
  Object.keys(fixtures.notPadded).map(key => ({ code: fixtures.notPadded[key], options: ['never'] })));

ruleTester.addTestGroup('always-fail', 'should fail non-padded blocks', [
  {
    code: fixtures.notPadded.if,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [0, 7], [2, 1]]
    ])
  },
  {
    code: fixtures.notPadded.ifElse,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [0, 7], [2, 1]],
      [FAILURE_STRING.always, [2, 7], [4, 1]]
    ])
  },
  {
    code: fixtures.mixed.ifPaddedElse,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [4, 7], [6, 1]]
    ])
  },
  {
    code: fixtures.mixed.ifElsePadded,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [0, 7], [2, 1]]
    ])
  },
  {
    code: fixtures.notPadded.class,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [0, 10], [2, 1]]
    ])
  }
]);

ruleTester.addTestGroup('never-fail', 'should fail padded blocks', [
  {
    code: fixtures.padded.if,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [0, 7], [4, 1]]
    ])
  },
  {
    code: fixtures.padded.ifElse,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [0, 7], [4, 1]],
      [FAILURE_STRING.never, [4, 7], [8, 1]]
    ])
  },
  {
    code: fixtures.mixed.ifPaddedElse,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [0, 7], [4, 1]]
    ])
  },
  {
    code: fixtures.mixed.ifElsePadded,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [2, 7], [6, 1]]
    ])
  },
  {
    code: fixtures.padded.class,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [0, 10], [4, 1]]
    ])
  }
]);

ruleTester.runTests();
