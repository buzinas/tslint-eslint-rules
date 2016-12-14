<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## no-multi-spaces (ESLint: [no-multi-spaces](http://eslint.org/docs/rules/no-multi-spaces))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/noMultiSpacesRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/noMultiSpacesRuleTests.ts)

disallow use of multiple spaces

### Usage

```json
"no-multi-spaces": [
    true,
    {
      "exceptions": { "PropertyAssignment": false, "OtherException": "true|false" }
    }
  ]
```

<!-- End:AutoDoc -->

### Note

The following are the exceptions available and their defaults

- `VariableDeclaration: false`
- `PropertyAssignment: true`
- `BinaryExpression: false`
