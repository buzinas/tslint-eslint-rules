<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## func-call-spacing (ESLint: [func-call-spacing](http://eslint.org/docs/rules/func-call-spacing))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/funcCallSpacingRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/funcCallSpacingRuleTests.ts)

require or disallow spacing between function identifiers and their invocations

#### Rationale

This rule will enforce consistency of spacing in function calls,
by disallowing or requiring one or more spaces before the open paren.

### Config

This rule has a string option:

* `"never"` (default) disallows space between the function name and the opening parenthesis.
* `"always"` requires space between the function name and the opening parenthesis.

Further, in `"always"` mode, a second object option is available that contains a single boolean `allowNewlines` property.

#### Examples

```json
"func-call-spacing": [true]
```

```json
"func-call-spacing": [true, "always"]
```

```json
"func-call-spacing": [true, "always", { allowNewlines: true }]
```
#### Schema

```json
{
  "type": "array",
  "items": [
    {
      "enum": [
        "always",
        "never"
      ]
    },
    {
      "type": "object",
      "properties": {
        "allowNewlines": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    }
  ],
  "minItems": 0,
  "maxItems": 2
}
```
<!-- End:AutoDoc -->
