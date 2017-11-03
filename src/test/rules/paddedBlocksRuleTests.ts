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

ruleTester.addTestGroup('always-pass', 'should pass padded blocks', [
  { code: 'if (a) {\n\nb();\n\n}', options: ['always'] },
  { code: 'if (a) {\n\nb();\n\n} else {\n\nb();\n\n}', options: ['always'] }
]);

ruleTester.addTestGroup('never-pass', 'should pass non-padded blocks', [
  { code: 'if (a) {\nb();\n}', options: ['never'] },
  { code: 'if (a) {\nb();\n} else {\nb();\n}', options: ['never'] }
]);

ruleTester.addTestGroup('always-fail', 'should fail non-padded blocks', [
  {
    code: 'if (a) {\nb();\n}',
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [0, 7], [2, 0]]
    ])
  },
  {
    code: 'if (a) {\n\nb();\n\n} else {\nb()\n}',
    options: ['always'],
    errors: expecting([
      [FAILURE_STRING.always, [4, 7], [6, 0]]
    ])
  }
]);

ruleTester.addTestGroup('never-fail', 'should fail padded blocks', [
  {
    code: 'if (a) {\n\nb();\n\n}',
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [0, 7], [4, 0]]
    ])
  },
  {
    code: 'if (a) {\nb();\n} else {\n\nb()\n\n}',
    options: ['never'],
    errors: expecting([
      [FAILURE_STRING.never, [2, 7], [6, 0]]
    ])
  }
]);

ruleTester.runTests();
