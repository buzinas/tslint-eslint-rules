<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-no-irregular-whitespace (ESLint: [no-irregular-whitespace](http://eslint.org/docs/rules/no-irregular-whitespace))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terNoIrregularWhitespaceRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terNoIrregularWhitespaceRuleTests.ts)

disallow irregular whitespace (recommended)

#### Rationale

Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code
harder to debug in a similar nature to mixed tabs and spaces.

### Config

#### Examples

```json
"ter-no-irregular-whitespace": [true]
```
#### Schema

```json
{}
```
<!-- End:AutoDoc -->

#### TSLint Rule: [`no-irregular-whitespace`]

[`no-irregular-whitespace`]: https://github.com/palantir/tslint/blob/master/src/rules/noIrregularWhitespaceRule.ts
