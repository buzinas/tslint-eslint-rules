<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## handle-callback-err (ESLint: [handle-callback-err](http://eslint.org/docs/rules/handle-callback-err))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/handleCallbackErrRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/handleCallbackErrRuleTests.ts)

enforce error handling in callbacks

#### Rationale

In Node.js, a common pattern for dealing with asynchronous behavior is called the callback
pattern. This pattern expects an Error object or null as the first argument of the callback.
Forgetting to handle these errors can lead to some really strange behavior in your
application.

### Config

The rule takes a string option: the name of the error parameter. The default is
`"err"`.

Sometimes the name of the error variable is not consistent across the project, so you need a
more flexible configuration to ensure that the rule reports all unhandled errors.

If the configured name of the error variable begins with a `^` it is considered to be a
regexp pattern.

- If the option is `"^(err|error|anySpecificError)$"`, the rule reports unhandled errors
  where the parameter name can be `err`, `error` or `anySpecificError`.
- If the option is `"^.+Error$"`, the rule reports unhandled errors where the parameter
  name ends with `Error` (for example, `connectionError` or `validationError` will
  match).
- If the option is `"^.*(e|E)rr"`, the rule reports unhandled errors where the parameter
  name matches any string that contains `err` or `Err` (for example, `err`, `error`,
  `anyError`, `some_err` will match).

In addition to the string we may specify an options object with the following property:

- `allowProperties`: (`true` by default) When this is set to `false` the rule will not
  report unhandled errors as long as the error object is handled without accessing any of its
  properties at least once. For instance, `(err) => console.log(err.stack)` would report an
  issue when `allowProperties` is set to `false` because `err` is not handled on its
  own.

#### Examples

```json
"handle-callback-err": [true, "error"]
```

```json
"handle-callback-err": [true, "^(err|error|anySpecificError)$"]
```

```json
"handle-callback-err": [true, { "allowProperties": false }]
```

```json
"handle-callback-err": [true, "^(err|error|anySpecificError)$", { "allowProperties": false }]
```
#### Schema

```json
{
  "type": "array",
  "items": [
    {
      "type": "string"
    }
  ],
  "minLength": 0,
  "maxLength": 1
}
```
<!-- End:AutoDoc -->
