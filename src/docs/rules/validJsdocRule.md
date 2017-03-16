<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## valid-jsdoc (ESLint: [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/validJsdocRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/validJsdocRuleTests.ts)

enforce valid JSDoc comments

#### Rationale

[JSDoc](http://usejsdoc.org/) generates application programming interface (API) documentation
from specially-formatted comments in JavaScript code. So does [typedoc](http://typedoc.org/).

If comments are invalid because of typing mistakes, then documentation will be incomplete.

If comments are inconsistent because they are not updated when function definitions are
modified, then readers might become confused.

### Config

This rule has an object option:

* `"prefer"` enforces consistent documentation tags specified by an object whose properties
               mean instead of key use value (for example, `"return": "returns"` means
               instead of `@return` use `@returns`)
* `"preferType"` enforces consistent type strings specified by an object whose properties
                   mean instead of key use value (for example, `"object": "Object"` means
                   instead of `object` use `Object`)
* `"requireReturn"` requires a return tag:
  * `true` (default) *even if* the function or method does not have a return statement
             (this option value does not apply to constructors)
  * `false` *if and only if* the function or method has a return statement (this option
              value does apply to constructors)
* `"requireParamType"`: `false` allows missing type in param tags
* `"requireReturnType"`: `false` allows missing type in return tags
* `"matchDescription"` specifies (as a string) a regular expression to match the description
                         in each JSDoc comment (for example, `".+"` requires a description;
                         this option does not apply to descriptions in parameter or return
                         tags)
* `"requireParamDescription"`: `false` allows missing description in parameter tags
* `"requireReturnDescription"`: `false` allows missing description in return tags

#### Examples

```json
"valid-jsdoc": [true]
```

```json
"valid-jsdoc": [true, {
  "prefer": {
    "return": "returns"
  },
  "requireReturn": false,
  "requireParamDescription": true,
  "requireReturnDescription": true,
  "matchDescription": "^[A-Z][A-Za-z0-9\\s]*[.]$"
}]
```
#### Schema

```json
{
  "type": "object",
  "properties": {
    "prefer": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "preferType": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "requireReturn": {
      "type": "boolean"
    },
    "requireParamDescription": {
      "type": "boolean"
    },
    "requireReturnDescription": {
      "type": "boolean"
    },
    "matchDescription": {
      "type": "string"
    },
    "requireParamType": {
      "type": "boolean"
    },
    "requireReturnType": {
      "type": "boolean"
    }
  },
  "additionalProperties": false
}
```
<!-- End:AutoDoc -->
