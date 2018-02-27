<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-no-proto (ESLint: [no-proto](http://eslint.org/docs/rules/no-proto))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terNoProtoRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terNoProtoRuleTests.ts)

disallow the use of `__proto__` property

#### Rationale
`__proto__` property has been deprecated as of ECMAScript 3.1 and shouldn’t be used in the code. Use getPrototypeOf method instead.
### Config

#### Examples

```json
"ter-no-proto": true
```
#### Schema

```json
{}
```
<!-- End:AutoDoc -->
