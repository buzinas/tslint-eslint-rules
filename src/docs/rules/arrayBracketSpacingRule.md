<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## array-bracket-spacing (ESLint: [array-bracket-spacing](http://eslint.org/docs/rules/array-bracket-spacing))

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
**[:straight_ruler: Rule source](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/arrayBracketSpacingRule.ts)**
**[:blue_book: Test source](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/arrayBracketSpacingRuleTests.ts)**

<!-- End:AutoDoc -->
