<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-arrow-body-style (ESLint: [arrow-body-style](http://eslint.org/docs/rules/arrow-body-style))

require braces in arrow function body

#### Rationale

Arrow functions have two syntactic forms for their function bodies. They may be defined with
a block body (denoted by curly braces) `() => { ... }` or with a single expression
`() => ...`, whose value is implicitly returned.

### Config

The rule takes one or two options. The first is a string, which can be:

- `"always"` enforces braces around the function body
- `"as-needed"` enforces no braces where they can be omitted (default)
- `"never"` enforces no braces around the function body (constrains arrow functions to the
              role of returning an expression)

The second one is an object for more fine-grained configuration when the first option is
`"as-needed"`. Currently, the only available option is `requireReturnForObjectLiteral`, a
boolean property. It’s false by default. If set to true, it requires braces and an explicit
return for object literals.

#### Examples

```json
"ter-arrow-body-style": [true, "always"]
```

```json
"ter-arrow-body-style": [true, "never"]
```

```json
"ter-arrow-body-style": [true, "as-needed", {
  "requireReturnForObjectLiteral": true
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
      "type": "array",
      "items": [
        {
          "enum": [
            "as-needed"
          ]
        },
        {
          "type": "object",
          "properties": {
            "requireReturnForObjectLiteral": {
              "type": "boolean"
            }
          },
          "additionalProperties": false
        }
      ],
      "minItems": 0,
      "maxItems": 2
    }
  ]
}
```
**[:straight_ruler: Rule source](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terArrowBodyStyleRule.ts)**
**[:blue_book: Test source](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terArrowBodyStyleRuleTests.ts)**
<!-- End:AutoDoc -->
