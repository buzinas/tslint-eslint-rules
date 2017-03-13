<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## sort-imports (ESLint: [sort-imports](http://eslint.org/docs/rules/sort-imports))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/sortImportsRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/sortImportsRuleTests.ts)

enforce sorting import declarations within module

#### Rationale

When declaring multiple imports, a sorted list of import declarations make it easier for developers to read the code and find necessary imports later. This rule is purely a matter of style.

This rule checks all import declarations and verifies that all imports are first sorted by the used member syntax and then alphabetically by the first member or alias name.

### Config

- `"ignore-case"` does case-insensitive comparisons (default: `false`)
- `"ignore-member-sort"` allows members in multiple type imports to occur in any order (default: `false`)
- `"member-syntax-sort-order"` (default: `["none", "all", "multiple", "single", "alias"]`); all 5 items must be present in the array, but you can change the order: 
  - `none` = import module without exported bindings.
  - `all` = import all members provided by exported bindings.
  - `multiple` = import multiple members.
  - `single` = import a single member.
  - `alias` = creates an alias for a member. This is unique to TER and not in ESLint's `sort-imports`.

#### Examples

```json
"sort-imports": [true]
```

```json
"sort-imports": [true, { "ignore-case" }]
```

```json
"sort-imports": [true, { "ignore-member-sort" }]
```

```json
"sort-imports": [true, { "member-syntax-sort-order": ["all", "single", "multiple", "none", "alias"] }]
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
#### TSLint Rule: [`ordered-imports`]

[`ordered-imports`]: https://palantir.github.io/tslint/rules/ordered-imports/
