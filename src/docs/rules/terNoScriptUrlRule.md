<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-no-script-url (ESLint: [no-script-url](http://eslint.org/docs/rules/no-script-url))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terNoScriptUrlRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terNoScriptUrlRuleTests.ts)

disallow use of `javascript:` urls.

#### Rationale
Using `javascript:` URLs is considered by some as a form of `eval`. Code passed in `javascript:` URLs has to be parsed and evaluated by the browser in the same way that eval is processed.
### Config

#### Examples

```json
"ter-no-script-url": true
```
#### Schema

```json
{}
```
<!-- End:AutoDoc -->
