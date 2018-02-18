<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-padded-blocks (ESLint: [padded-blocks](http://eslint.org/docs/rules/padded-blocks))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terPaddedBlocksRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terPaddedBlocksRuleTests.ts)

enforce padding within blocks

#### Rationale

Some style guides require block statements to start and end with blank
lines. The goal is to improve readability by visually separating the
block content and the surrounding code.

### Config
This rule has one option, which can be a string option or an object option
#### Examples

```json
"ter-padded-blocks": [true]
```

```json
"ter-padded-blocks": [true, "always"]
```

```json
"ter-padded-blocks": [true, "never"]
```

```json
"ter-padded-blocks": [true, { "blocks": "always" }]
```

```json
"ter-padded-blocks": [true, { "blocks": "never" }]
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
        "blocks": {
          "enum": [
            "always",
            "never"
          ]
        },
        "classes": {
          "enum": [
            "always",
            "never"
          ]
        },
        "switches": {
          "enum": [
            "always",
            "never"
          ]
        }
      },
      "additionalProperties": false
    }
  ],
  "maxLength": 1
}
```
<!-- End:AutoDoc -->
