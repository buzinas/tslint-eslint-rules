<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-no-self-compare (ESLint: [no-self-compare](http://eslint.org/docs/rules/no-self-compare))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terNoSelfCompareRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terNoSelfCompareRuleTests.ts)

disallow comparisons where both sides are exactly the same

#### Rationale
Comparing a variable against itself is usually an error, either a typo or refactoring error. It is confusing to the reader and may potentially introduce a runtime error.
### Config

#### Examples

```json
"ter-no-self-compare": true
```
#### Schema

```json
{}
```
<!-- End:AutoDoc -->
