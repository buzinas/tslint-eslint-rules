<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## array-bracket-spacing (ESLint: [array-bracket-spacing](http://eslint.org/docs/rules/array-bracket-spacing))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/arrayBracketSpacingRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/arrayBracketSpacingRuleTests.ts)

enforce consistent spacing inside array brackets

#### Rationale

A number of style guides require or disallow spaces between array brackets and other tokens.
This rule applies to both array literals and destructuring assignments (ECMAScript 6).

### Config

The rule takes one or two options. The first is a string, which can be:

- `"never"` (default) disallows spaces inside array brackets
- `"always"`requires one or more spaces or newlines inside array brackets

The second option is an object for exceptions to the `"never"` option:

- `"singleValue": true` requires one or more spaces or newlines inside brackets of array
                          literals that contain a single element
- `"objectsInArrays": true` requires one or more spaces or newlines between brackets of
                              array literals and braces of their object literal elements
                              `[ {` or `} ]`
- `"arraysInArrays": true` requires one or more spaces or newlines between brackets of
                             array literals and brackets of their array literal elements
                             `[ [` or `] ]`

When using the `"always"` option the second option takes on these exceptions:

- `"singleValue": false` disallows spaces inside brackets of array literals that contain a
                           single element
- `"objectsInArrays": false` disallows spaces between brackets of array literals and braces
                               of their object literal elements `[ {` or `} ]`
- `"arraysInArrays": false` disallows spaces between brackets of array literals and brackets
                              of their array literal elements `[ [` or `] ]`

This rule has build-in exceptions:

- `"never"` (and also the exceptions to the `"always"` option) allows newlines inside
              array brackets, because this is a common pattern
- `"always"` does not require spaces or newlines in empty array literals `[]`

#### Examples

```json
"array-bracket-spacing": [true, "always"]
```

```json
"array-bracket-spacing": [true, "never"]
```

```json
"array-bracket-spacing": [true, "never", {
  "arraysInArrays": true
}]
```
#### Schema

```json
{
  "anyOf": [
    {
      "type": "array",
      "items": [
        {
          "enum": [
            "always",
            "never"
          ]
        }
      ],
      "minItems": 0,
      "maxItems": 1
    },
    {
      "type": "object",
      "properties": {
        "singleValue": {
          "type": "boolean"
        },
        "objectsInArrays": {
          "type": "boolean"
        },
        "arraysInArrays": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    }
  ]
}
```
<!-- End:AutoDoc -->
