<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## sort-imports (ESLint: [sort-imports](http://eslint.org/docs/rules/sort-imports))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/sortImportsRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/sortImportsRuleTests.ts)

enforce sorting import declarations within module

#### Rationale
undefined
### Config

      
#### Examples

```json
"sort-imports": [true]
```

```json
"sort-imports": [true, { 'ignore-case' }]
```

```json
"sort-imports": [true, { 'ignore-member-sort' }]
```

```json
"sort-imports": [true, { 'member-syntax-sort-order': ['all', 'single', 'multiple', 'none', 'alias'] }]
```
#### Schema

```json
{
  "type": "object",
  "properties": {
    "member-syntax-sort-order": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "none",
          "all",
          "multiple",
          "single",
          "alias"
        ]
      },
      "minLength": 5,
      "maxLength": 5
    },
    "ignore-case": {
      "type": "boolean"
    },
    "ignore-member-sort": {
      "type": "boolean"
    }
  }
}
```
<!-- End:AutoDoc -->
