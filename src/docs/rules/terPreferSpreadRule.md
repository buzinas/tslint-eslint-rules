<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-prefer-spread (ESLint: [prefer-spread](http://eslint.org/docs/rules/prefer-spread))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terPreferSpreadRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terPreferSpreadRuleTests.ts)

suggest using the spread operator instead of `.apply()`.

#### Rationale

This rule is aimed to flag usage of Function.prototype.apply() in situations where the spread operator could be used instead.
        
### Config

      
#### Examples


#### Schema

```json
null
```
<!-- End:AutoDoc -->