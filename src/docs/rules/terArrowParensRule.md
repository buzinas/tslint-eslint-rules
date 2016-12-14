<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-arrow-parens (ESLint: [arrow-parens](http://eslint.org/docs/rules/arrow-parens))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terArrowParensRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terArrowParensRuleTests.ts)

require parens in arrow function arguments

#### Rationale

Arrow functions can omit parentheses when they have exactly one parameter. In all other cases
the parameter(s) must be wrapped in parentheses. This rule enforces the consistent use of
parentheses in arrow functions.

### Config

This rule has a string option and an object one.

String options are:

- `"always"` (default) requires parentheses around arguments in all cases.
- `"as-needed"` allows omitting parentheses when there is only one argument.

Object properties for variants of the `"as-needed"` option:

- `"requireForBlockBody": true` modifies the as-needed rule in order to require
  parentheses if the function body is in an instructions block (surrounded by braces).

#### Examples

```json
"ter-arrow-parens": [true]
```

```json
"ter-arrow-parens": [true, "always"]
```

```json
"ter-arrow-parens": [true, "as-needed"]
```

```json
"ter-arrow-parens": [true, "as-needed", { "requireForBlockBody": true }]
```
#### Schema

```json
{
  "type": "array",
  "items": [
    {
      "enum": [
        "always",
        "as-needed"
      ]
    },
    {
      "type": "object",
      "properties": {
        "requireForBlockBody": {
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

#### TSLint Rule: [`arrow-parens`]

[`arrow-parens`]: https://palantir.github.io/tslint/rules/arrow-parens/
