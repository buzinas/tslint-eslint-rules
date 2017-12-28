<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-newline-after-var (ESLint: [newline-after-var](http://eslint.org/docs/rules/newline-after-var))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terNewlineAfterVarRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terNewlineAfterVarRuleTests.ts)

require or disallow an empty newline after variable declarations

#### Rationale

This rule enforces a coding style where empty lines are required or disallowed after `var`, `let`, or `const`
statements to achieve a consistent coding style across the project.

### Config

This rule has a string option:

* `"always"` (default) requires an empty line after `var`, `let`, or `const`.
  Comments on a line directly after var statements are treated like additional var statements.
* `"never"` disallows empty lines after `var`, `let`, or `const`.

#### Examples

```json
"ter-newline-after-var": [true]
```

```json
"ter-newline-after-var": [true, "always"]
```

```json
"ter-newline-after-var": [true, "never"]
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
    }
  ],
  "maxLength": 1
}
```
<!-- End:AutoDoc -->
