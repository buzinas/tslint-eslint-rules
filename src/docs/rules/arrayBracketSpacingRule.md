<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## array-bracket-spacing (ESLint: [array-bracket-spacing](http://eslint.org/docs/rules/array-bracket-spacing))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/arrayBracketSpacingRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/arrayBracketSpacingRuleTests.ts)

enforce spacing inside array brackets

### Usage

```json
"array-bracket-spacing": [
    true,
    "always",
    {
      "singleValue": false,
      "objectsInArrays": false,
      "arraysInArrays": false
    }
  ]
```

```json
"array-bracket-spacing": [
    true,
    "never",
    {
      "singleValue": true,
      "objectsInArrays": true,
      "arraysInArrays": true
    }
  ]
```

<!-- End:AutoDoc -->
