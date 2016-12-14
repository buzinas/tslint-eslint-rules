<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-max-len (ESLint: [max-len](http://eslint.org/docs/rules/max-len))

enforce a maximum line length

#### Rationale

Limiting the length of a line of code improves code readability.
It also makes comparing code side-by-side easier and improves compatibility with
various editors, IDEs, and diff viewers.

### Config

An integer indicating the maximum length of lines followed by an optional integer specifying
the character width for tab characters.

An optional object may be provided to fine tune the rule:

* `"code"`: (default 80) enforces a maximum line length
* `"tabWidth"`: (default 4) specifies the character width for tab characters
* `"comments"`: enforces a maximum line length for comments; defaults to value of code
* `"ignorePattern"`: ignores lines matching a regular expression; can only match a single
                           line and need to be double escaped when written in JSON
* `"ignoreComments"`: true ignores all trailing comments and comments on their own line
* `"ignoreTrailingComments"`: true ignores only trailing comments
* `"ignoreUrls"`: true ignores lines that contain a URL
* `"ignoreStrings"`: true ignores lines that contain a double-quoted or single-quoted string
* `"ignoreTemplateLiterals"`: true ignores lines that contain a template literal
* `"ignoreRegExpLiterals"`: true ignores lines that contain a RegExp literal
* `"ignoreImports"`: true ignores lines that contain an import module specifier

#### Examples

```json
"ter-max-len": [true, 100]
```

```json
"ter-max-len": [
  true,
  100,
  2,
  {
    "ignoreUrls": true,
    "ignorePattern": "^\\s*(let|const)\\s.+=\\s*require\\s*\\("
  }
]
```

```json
"ter-max-len": [
  true,
  {
    "code": 100,
    "tabWidth": 2,
    "ignoreImports": true,
    "ignoreUrls": true,
    "ignorePattern": "^\\s*(let|const)\\s.+=\\s*require\\s*\\("
  }
]
```
#### Schema

```json
{
  "type": "array",
  "items": [
    {
      "type": "number",
      "minimum": "0"
    },
    {
      "type": "object",
      "properties": {
        "code": {
          "type": "number",
          "minumum": "1"
        },
        "comments": {
          "type": "number",
          "minumum": "1"
        },
        "tabWidth": {
          "type": "number",
          "minumum": "1"
        },
        "ignorePattern": {
          "type": "string"
        },
        "ignoreComments": {
          "type": "boolean"
        },
        "ignoreStrings": {
          "type": "boolean"
        },
        "ignoreUrls": {
          "type": "boolean"
        },
        "ignoreTemplateLiterals": {
          "type": "boolean"
        },
        "ignoreRegExpLiterals": {
          "type": "boolean"
        },
        "ignoreTrailingComments": {
          "type": "boolean"
        },
        "ignoreImports": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    }
  ],
  "minLength": 1,
  "maxLength": 3
}
```
**[:straight_ruler: Rule source](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terMaxLenRule.ts)**
**[:blue_book: Test source](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terMaxLenRuleTests.ts)**
<!-- End:AutoDoc -->
