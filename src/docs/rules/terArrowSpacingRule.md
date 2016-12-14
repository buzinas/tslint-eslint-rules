<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-arrow-spacing (ESLint: [arrow-spacing](http://eslint.org/docs/rules/arrow-spacing))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terArrowSpacingRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terArrowSpacingRuleTests.ts)

require space before/after arrow function's arrow

#### Rationale

This rule normalizes the style of spacing before/after an arrow function’s arrow(`=>`).

### Config

This rule takes an object argument with `before` and `after` properties, each with a
Boolean value.

The default configuration is `{ "before": true, "after": true }`.

`true` means there should be one or more spaces and `false` means no spaces.

#### Examples

```json
"ter-arrow-spacing": [true]
```

```json
"ter-arrow-spacing": [true, {
  "before": false,
  "after": false
}]
```
#### Schema

```json
{
  "type": "array",
  "items": [
    {
      "type": "object",
      "properties": {
        "before": {
          "type": "boolean"
        },
        "after": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    }
  ],
  "maxLength": 1
}
```
<!-- End:AutoDoc -->
