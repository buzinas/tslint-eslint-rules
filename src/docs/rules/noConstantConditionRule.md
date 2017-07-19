<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## no-constant-condition (ESLint: [no-constant-condition](http://eslint.org/docs/rules/no-constant-condition))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/noConstantConditionRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/noConstantConditionRuleTests.ts)

disallow use of constant expressions in conditions (recommended)

#### Rationale

A constant expression (for example, a literal) as a test condition might be a typo or
development trigger for a specific behavior. For example, the following code looks as if it is
not ready for production.

### Config

- `"checkLoops"` Setting this option to `false` allows constant expressions in loops (default: `true`).

#### Examples

```json
"no-constant-condition": true
```

```json
"no-constant-condition": [true, { "checkLoops": false }]
```
#### Schema

```json
{
  "type": "object",
  "properties": {
    "checkLoops": {
      "type": "boolean"
    }
  },
  "additionalProperties": false
}
```
<!-- End:AutoDoc -->
