<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-computed-property-spacing (ESLint: [computed-property-spacing](http://eslint.org/docs/rules/computed-property-spacing))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terComputedPropertySpacingRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terComputedPropertySpacingRuleTests.ts)

require or disallow padding inside computed properties

#### Rationale

While formatting preferences are very personal, a number of style guides require or disallow spaces between computed properties in the following situations:
    
### Config

The rule takes in one option, which defines to require or forbid whitespace.

* `"never"` (default) disallows spaces inside computed property brackets
* `"always"` requires one or more spaces inside computed property brackets
    
#### Examples

```json
"ter-computed-property-spacing": [true]
```

```json
"ter-computed-property-spacing": [true, "always"]
 ```

```json
"ter-computed-property-spacing": [true, "never"]
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
