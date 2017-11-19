<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-no-useless-concat (ESLint: [no-useless-concat](http://eslint.org/docs/rules/no-useless-concat))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terNoUselessConcatRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terNoUselessConcatRuleTests.ts)

disallow unnecessary concatenation of strings

#### Rationale
This rule aims to flag the concatenation of 2 literals when they could be combined into a single literal. Literals can be strings or template literals.
### Config

#### Examples

```json
"ter-no-useless-concat": true
```
#### Schema

```json
{}
```
<!-- End:AutoDoc -->
