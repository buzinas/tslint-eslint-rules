<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-padding-line-between-statements (ESLint: [padding-line-between-statements](https://eslint.org/docs/rules/padding-line-between-statements))
[![rule_source](https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/rules/terPaddingLineBetweenStatementsRule.ts)
[![test_source](https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg)](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/test/rules/terPaddingLineBetweenStatementsRuleTests.ts)

Require or disallow padding lines between statements 

#### Rationale

This rule requires or disallows blank lines between the given 2 kinds of statements.
Properly blank lines help developers to understand the code.

### Config

This rule does nothing if no configurations are provided.
A configuration is an object which has 3 properties; `blankLine`, `prev` and `next`.

`prev` and `next` specify the type of statements between which to check for blank lines.
They can be one of the following, or an array of the following.

- `"*"` is a wildcard that matches any statement.
- `"block"`
- `"block-like"`
- `"break"`
- `"case"`
- `"class"`
- `"const"`
- `"continue"`
- `"debugger"`
- `"default"`
- `"do"`
- `"empty"`
- `"enum"`
- `"export"`
- `"expression"`
- `"for"`
- `"function"`
- `"if"`
- `"import"`
- `"interface"`
- `"let"`
- `"return"`
- `"switch"`
- `"throw"`
- `"try"`
- `"var"`
- `"while"`
- `"with"`

`blankLine` can be one of `"always"`, `"never"` or `"any"`

- `"always"` requires one or more blank lines between the statement pair.
- `"never"` disallows blank lines between the statement pair.
- `"any"` just ignores the statement pair.

If a statement pair matches multiple configurations, the last matched configuration will be used.

#### Examples

```json
"ter-padding-line-between-statements": [
  true,
  { "blankLine": "always", "prev": "interface", "next": "*" },
  { "blankLine": "always", "prev": "*", "next": "interface" }
]
```

```json
"ter-padding-line-between-statements": [
  true,
  { "blankLine": "never", "prev": ["var", "let", "const"], "next": ["var", "let", "const"] }
]
```
#### Schema

```json
{
  "type": "array",
  "items": [
    {
      "type": "object",
      "properties": {
        "blankLine": {
          "enum": [
            "always",
            "never",
            "any"
          ]
        },
        "prev": {
          "enum": [
            "*",
            "block",
            "block-like",
            "break",
            "case",
            "class",
            "const",
            "continue",
            "debugger",
            "default",
            "do",
            "empty",
            "enum",
            "export",
            "expression",
            "for",
            "function",
            "if",
            "import",
            "interface",
            "let",
            "return",
            "switch",
            "throw",
            "try",
            "var",
            "while",
            "with"
          ]
        },
        "next": {
          "enum": [
            "*",
            "block",
            "block-like",
            "break",
            "case",
            "class",
            "const",
            "continue",
            "debugger",
            "default",
            "do",
            "empty",
            "enum",
            "export",
            "expression",
            "for",
            "function",
            "if",
            "import",
            "interface",
            "let",
            "return",
            "switch",
            "throw",
            "try",
            "var",
            "while",
            "with"
          ]
        }
      },
      "additionalProperties": false
    }
  ]
}
```
<!-- End:AutoDoc -->
