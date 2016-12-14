<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## valid-jsdoc (ESLint: [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/validJsdocRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/validJsdocRuleTests.ts)

Ensure JSDoc comments are valid

### Usage

```json
"valid-jsdoc": [
  true,
  {
    "prefer": {
      "return": "returns"
    },
    "requireReturn": false,
    "requireParamDescription": true,
    "requireReturnDescription": true,
    "matchDescription": "^[A-Z][A-Za-z0-9\\s]*[.]$"
  }
]
```

<!-- End:AutoDoc -->
