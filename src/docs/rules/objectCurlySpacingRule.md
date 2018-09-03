<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## object-curly-spacing (ESLint: [object-curly-spacing](http://eslint.org/docs/rules/object-curly-spacing))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/objectCurlySpacingRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/objectCurlySpacingRuleTests.ts)

require or disallow padding inside curly braces

### Config

This rule takes one optional argument, an object which may include any of the following properties:

* `"arraysInObjects"` (default `true` if rule is set to `"always"`, otherwise default `false`)
                      When set to `true`, this option requires a space inside of braces ending with an array literal.
                      When set to `false`, this option requires no space inside of braces ending with an array literal.
* `"objectsInObjects"` (default `true` if rule is set to `"always"`, otherwise default `false`)
                       When set to `true`, this option requires a space inside of braces ending with an object literal, or object destructuring.
                       When set to `false`, this option requires no space inside of braces ending with an object literal, or object destructuring.

### Examples

```json
"object-curly-spacing": [true, "always"]
```

```json
"object-curly-spacing": [true, "never"]
```

```json
"object-curly-spacing": [true, "always", {"arraysInObjects": false, "objectsInObjects": false}]
```

#### Schema

```json
{
  "type": "array",
  "items": [
    {
      "type": "object",
      "properties": {
        "arraysInObjects": {
          "type": "boolean"
        },
        "objectsInObjects": {
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
