<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-prefer-arrow-callback (ESLint: [prefer-arrow-callback](http://eslint.org/docs/rules/prefer-arrow-callback))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terPreferArrowCallbackRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terPreferArrowCallbackRuleTests.ts)

require arrow functions as callbacks

#### Rationale

Arrow functions are suited to callbacks, because:

* `this` keywords in arrow functions bind to the upper scope’s.
* The notation of the arrow function is shorter than function expression’s.

### Config

This rule takes one optional argument, an object which is an options object. This object
may specify the following properties:

* `"allowNamedFunctions"` (default false) When set to `true`, the rule doesn't warn on
                            named functions used as callback.
* `"allowUnboundThis"` (default true) When set to `false`, this option allows the use of
                         `this` without restriction and checks for dynamically assigned
                         `this` values such as when using `Array.prototype.map` with a
                         `context` argument. Normally, the rule will flag the use of this
                         whenever a function does not use `bind()` to specify the value of
                         `this` constantly.

#### Examples

```json
"ter-prefer-arrow-callback": [true]
```

```json
"ter-prefer-arrow-callback": [true, {
  "allowNamedFunctions": true
}]
```

```json
"ter-prefer-arrow-callback": [true, {
  "allowUnboundThis": false
}]
```

```json
"ter-prefer-arrow-callback": [true, {
  "allowNamedFunctions": true,
  "allowUnboundThis": false
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
        "allowNamedFunctions": {
          "type": "boolean"
        },
        "allowUnboundThis": {
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

#### TSLint Rule: [`only-arrow-functions`]

[`only-arrow-functions`]: https://palantir.github.io/tslint/rules/only-arrow-functions/
