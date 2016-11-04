<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## ter-indent (ESLint: [indent](http://eslint.org/docs/rules/indent))

enforce consistent indentation

#### Rationale

Using only one of tabs or spaces for indentation leads to more consistent editor behavior,
cleaner diffs in version control, and easier programmatic manipulation.

### Config

The string 'tab' or an integer indicating the number of spaces to use per tab.

An object may be provided to fine tune the indentation rules:
      
  * `"SwitchCase"` (default: 0) enforces indentation level for `case` clauses in
                     `switch` statements
  * `"VariableDeclarator"` (default: 1) enforces indentation level for `var` declarators;
                             can also take an object to define separate rules for `var`,
                             `let` and `const` declarations.
  * `"outerIIFEBody"` (default: 1) enforces indentation level for file-level IIFEs.
  * `"MemberExpression"` (off by default) enforces indentation level for multi-line
                           property chains (except in variable declarations and assignments)
  * `"FunctionDeclaration"` takes an object to define rules for function declarations.
      * `"parameters"` (off by default) enforces indentation level for parameters in a
                         function declaration. This can either be a number indicating
                         indentation level, or the string `"first"` indicating that all
                         parameters of the declaration must be aligned with the first parameter.
      * `"body"` (default: 1) enforces indentation level for the body of a function expression.
  * `"FunctionExpression"` takes an object to define rules for function declarations.
      * `"parameters"` (off by default) enforces indentation level for parameters in a
                         function declaration. This can either be a number indicating
                         indentation level, or the string `"first"` indicating that all
                         parameters of the declaration must be aligned with the first parameter.
      * `"body"` (default: 1) enforces indentation level for the body of a function expression.

#### Examples

```json
"ter-indent": [true, "tab"]
```

```json
"ter-indent": [true, 2]
```

```json
"ter-indent": [
  true,
  2,
  {
    "FunctionExpression": {
      "parameters": 1,
      "body": 1
    }
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
      "type": "string",
      "enum": [
        "tab"
      ]
    },
    {
      "type": "object",
      "properties": {
        "SwitchCase": {
          "type": "number",
          "minimum": 0
        },
        "VariableDeclarator": {
          "type": "object",
          "properties": {
            "var": {
              "type": "number",
              "minimum": 0
            },
            "let": {
              "type": "number",
              "minimum": 0
            },
            "const": {
              "type": "number",
              "minimum": 0
            }
          }
        },
        "outerIIFEBody": {
          "type": "number"
        },
        "FunctionDeclaration": {
          "type": "object",
          "properties": {
            "parameters": {
              "type": "number",
              "minimum": 0
            },
            "body": {
              "type": "number",
              "minimum": 0
            }
          }
        },
        "FunctionExpression": {
          "type": "object",
          "properties": {
            "parameters": {
              "type": "number",
              "minimum": 0
            },
            "body": {
              "type": "number",
              "minimum": 0
            }
          }
        },
        "MemberExpression": {
          "type": "number"
        }
      },
      "additionalProperties": false
    }
  ],
  "minLength": 1,
  "maxLength": 2
}
```
<!-- End:AutoDoc -->

### TSLint Rule: `indent`

TSLint provides the [`indent`] rule but it currently only checks if we are using tabs or spaces.
As of 11/1/2016 there is an open issue to add enhancements to the rule: https://github.com/palantir/tslint/issues/581.

[`indent`]: http://palantir.github.io/tslint/rules/indent
