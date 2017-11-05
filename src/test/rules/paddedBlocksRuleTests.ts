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
  // If statements
  // -- Padded
  ifPadded: 'if (a) {\n\nb();\n\n}',
  ifPaddedElsePadded: 'if (a) {\n\nb();\n\n} else {\n\nb();\n\n}',
  ifCommentPadded: 'if (a) {\n\n// Comment\nb();\n\n}', // TODO
  ifEmptyPadded: 'if (a) {\n\n}', // TODO
  // -- !Padded
  if: 'if (a) {\nb();\n}',
  ifElse: 'if (a) {\nb();\n} else {\nb();\n}',
  ifComment: 'if (a) {\n// Comment\nb();\n}', // TODO
  ifEmpty: 'if (a) {\n}', // TODO
  // -- Mixed
  ifPaddedElse: 'if (a) {\n\nb();\n\n} else {\nb();\n}',
  ifElsePadded: 'if (a) {\nb();\n} else {\n\nb();\n\n}',

  // Class declarations
  // -- Padded
  classPadded: 'class Foo {\n\npublic a: any;\n\n}',
  // -- !Padded
  class: 'class Foo {\npublic a: any;\n}'
};

ruleTester.addTestGroup('always-pass', 'should pass padded blocks', [
  { code: fixtures.ifPadded, options: ['always'] },
  { code: fixtures.ifPaddedElsePadded, options: ['always'] },
  // { code: fixtures.ifCommentPadded, options: ['always'] },
  { code: fixtures.classPadded, options: ['always']}
]);

ruleTester.addTestGroup('never-pass', 'should pass non-padded blocks', [
  { code: fixtures.if, options: ['never'] },
  { code: fixtures.ifElse, options: ['never'] },
  // { code: fixtures.ifComment, options: ['never'] },
  { code: fixtures.class, options: ['never']}
]);

ruleTester.addTestGroup('always-fail', 'should fail non-padded blocks', [
  {
    code: fixtures.if,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [0, 7], [2, 0]]
    ])
  },
  {
    code: fixtures.ifElse,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [0, 7], [2, 0]],
      [FAILURE_STRING.always, [2, 7], [4, 0]]
    ])
  },
  {
    code: fixtures.ifPaddedElse,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [4, 7], [6, 0]]
    ])
  },
  {
    code: fixtures.ifElsePadded,
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [0, 7], [2, 0]]
    ])
  }
]);

ruleTester.addTestGroup('never-fail', 'should fail padded blocks', [
  {
    code: fixtures.ifPadded,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [0, 7], [4, 0]]
    ])
  },
  {
    code: fixtures.ifPaddedElsePadded,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [0, 7], [4, 0]],
      [FAILURE_STRING.never, [4, 7], [8, 0]]
    ])
  },
  {
    code: fixtures.ifPaddedElse,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [0, 7], [4, 0]]
    ])
  },
  {
    code: fixtures.ifElsePadded,
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [2, 7], [6, 0]]
    ])
  }
]);

ruleTester.runTests();
