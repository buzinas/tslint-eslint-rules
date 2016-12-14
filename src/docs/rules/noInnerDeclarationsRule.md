<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## no-inner-declarations (ESLint: [no-inner-declarations](http://eslint.org/docs/rules/no-inner-declarations))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/noInnerDeclarationsRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/noInnerDeclarationsRuleTests.ts)

disallow function or variable declarations in nested blocks (recommended)

### Usage

```json
"no-inner-declarations": [
  true,
  "functions"
]
```

```json
"no-inner-declarations": [
  true,
  "both"
]
```

<!-- End:AutoDoc -->
