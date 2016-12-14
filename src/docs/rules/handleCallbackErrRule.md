<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## handle-callback-err (ESLint: [handle-callback-err](http://eslint.org/docs/rules/handle-callback-err))

enforce error handling in callbacks

#### Rationale

In Node.js, a common pattern for dealing with asynchronous behavior is called the callback
pattern. This pattern expects an Error object or null as the first argument of the callback.
Forgetting to handle these errors can lead to some really strange behavior in your
application.

### Config

The rule takes a single string option: the name of the error parameter. The default is
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

#### Examples

```json
"handle-callback-err": [true, "error"]
      ```

```json
"handle-callback-err": [true, "^(err|error|anySpecificError)$"]
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
**[:straight_ruler: Rule source](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/handleCallbackErrRule.ts)**
**[:blue_book: Test source](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/handleCallbackErrRuleTests.ts)**
<!-- End:AutoDoc -->
