<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-no-mixed-spaces-and-tabs (ESLint: [no-mixed-spaces-and-tabs](http://eslint.org/docs/rules/no-mixed-spaces-and-tabs))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terNoMixedSpacesAndTabsRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terNoMixedSpacesAndTabsRuleTests.ts)

disallow mixed spaces and tabs for indentation (recommended)

#### Rationale

Using only one of tabs or spaces for indentation leads to more consistent editor behavior,
cleaner diffs in version control, and easier programmatic manipulation.
### Config

This rule takes an object argument with an optional `type` property which can be set to:

* `spaces` enforces consistent spaces for indentation.
* `tabs` enforces consistent tabs for indentation.

If the above is not provided, the rule will enforce either all tabs or all spaces on each
line, although different lines may differ between tabs and spaces.

Optionally, a `smartTabs` boolean property can be specified.  If set to true, smart tabs
allow mixing tabs and spaces if tabs are used for indentation and spaces for alignment, eg.

    function main() {
    // --->const a = 1,
    // --->......b = 2;

        const a = 1,
              b = 2;
    }

#### Examples

```json
"ter-no-mixed-spaces-and-tabs": { type: OPTION_USE_TABS } ]
```

```json
"ter-no-mixed-spaces-and-tabs": { type: OPTION_USE_SPACES } ]
```

```json
"ter-no-mixed-spaces-and-tabs": { smartTabs: true } ]
```

```json
"ter-no-mixed-spaces-and-tabs": { type: OPTION_USE_TABS, smartTabs: true } ]
```
#### Schema

```json
{
  "type": "array",
  "items": [
    {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "tabs",
            "spaces"
          ]
        },
        "smartTabs": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    }
  ],
  "minLength": 0,
  "maxLength": 1
}
```
<!-- End:AutoDoc -->
