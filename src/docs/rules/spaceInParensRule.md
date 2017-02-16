<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## space-in-parens (ESLint: [space-in-parens](http://eslint.org/docs/rules/space-in-parens))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/spaceInParensRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/spaceInParensRuleTests.ts)

require or disallow spaces inside parentheses

#### Rationale

This rule will enforce consistency of spacing directly inside of parentheses,
by disallowing or requiring one or more spaces to the right of (and to the
left of). In either case, () will still be allowed. 

### Config

There are two options for this rule:

- `"never"` (default) enforces zero spaces inside of parentheses
- `"always"` enforces a space inside of parentheses

Depending on your coding conventions, you can choose either option by specifying
it in your configuration.

#### Examples

```json
"space-in-parens": [true, "always"]
```

```json
"space-in-parens": [true, "never"]
```

```json
"space-in-parens": [true, "always", { "exceptions": [ "{}", "[]", "()", "empty" ] }]
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
        "exceptions": {
          "type": "array",
          "items": [
            {
              "enum": [
                "{}",
                "[]",
                "()",
                "empty"
              ]
            }
          ],
          "uniqueItems": true
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
