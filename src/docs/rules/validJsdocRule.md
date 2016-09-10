<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
## valid-jsdoc (eslint: [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc))

Ensure JSDoc comments are valid

### Usage

```json
"valid-jsdoc": [
  true,
  {
    "prefer": {
      "return": "returns"
    },
    "requireReturn": false,
    "requireParamDescription": true,
    "requireReturnDescription": true,
    "matchDescription": "^[A-Z][A-Za-z0-9\\s]*[.]$"
  }
]
```;
<!-- End:AutoDoc -->
