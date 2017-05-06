<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-no-sparse-arrays (ESLint: [no-sparse-arrays](http://eslint.org/docs/rules/no-sparse-arrays))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terNoSparseArraysRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terNoSparseArraysRuleTests.ts)

disallow sparse arrays (recommended)

#### Rationale

Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code
harder to debug in a similar nature to mixed tabs and spaces.

### Config

#### Examples

```json
"ter-no-sparse-arrays": [true]
```
#### Schema

```json
{}
```
<!-- End:AutoDoc -->

#### TSLint Rule: [`no-sparse-arrays`]

[`no-sparse-arrays`]: https://palantir.github.io/tslint/rules/no-sparse-arrays/
