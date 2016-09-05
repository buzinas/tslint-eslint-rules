[![Build Status](https://travis-ci.org/buzinas/tslint-eslint-rules.svg)](https://travis-ci.org/buzinas/tslint-eslint-rules)
[![Downloads per Month](https://img.shields.io/npm/dm/tslint-eslint-rules.svg)](https://www.npmjs.com/package/tslint-eslint-rules)
[![NPM Version](https://img.shields.io/npm/v/tslint-eslint-rules.svg)](https://www.npmjs.com/package/tslint-eslint-rules)
[![ZenHub](https://img.shields.io/badge/supercharged%20by-ZenHub.io-3F4D9C.svg)](https://zenhub.io/)
[![Shields.io](https://img.shields.io/badge/badges%20by-shields.io-ff69b4.svg)](https://shields.io/)
[![License](https://img.shields.io/npm/l/tslint-eslint-rules.svg)](LICENSE)


# ESLint rules for TSLint

## Improve your TSLint with the missing ESLint Rules

You want to code in TypeScript but miss all the rules available in ESLint?

Now you can combine both worlds by using this TSLint plugin!


## Usage

### Install from NPM to your Dev Dependencies

```console
npm install --save-dev tslint-eslint-rules
```

### Configure TSLint to use `tslint-eslint-rules` folder:

In your `tslint.json` file, add the `rulesDirectory` property, e.g:

  ```json
  {
    "rulesDirectory": "node_modules/tslint-eslint-rules/dist/rules",
    "rules": {
      "no-constant-condition": true
    }
  }
  ```

  You can also pass an array of strings to the `rulesDirectory` property to combine this plugin with other community custom rules.


### Configure your rules

In your `tslint.json` file, insert the rules as described below.


## Rules (copied from [ESLint website](http://eslint.org/docs/rules/))

The list below shows all the existing ESLint rules and the similar rules available in TSLint.

### Possible Errors

The following rules point out areas where you might have made mistakes.

* [comma-dangle](http://eslint.org/docs/rules/comma-dangle) => trailing-comma (native)
  * Description: disallow or enforce trailing commas (recommended)
  * Usage

    ```json
    "trailing-comma": [
      true,
      {
        "multiline": "never",
        "singleline": "never"
      }
    ]
    ```

* [no-cond-assign](http://eslint.org/docs/rules/no-cond-assign) => no-conditional-assignment (native)
  * Description: disallow assignment in conditional expressions (recommended)
  * Usage

    ```json
    "no-conditional-assignment": true
    ```

* [no-console](http:/eslint.org/docs/rules/no-console) => no-console (native)
  * Description: disallow use of `console` in the node environment (recommended)
  * Usage

    ```json
    "no-console": [
      true,
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ]
    ```

* [no-constant-condition](http://eslint.org/docs/rules/no-constant-condition) => no-constant-condition (tslint-eslint-rules)
  * Description: disallow use of constant expressions in conditions (recommended)
  * Usage

    ```json
    "no-constant-condition": true
    ```

* [no-control-regex](http://eslint.org/docs/rules/no-control-regex) => no-control-regex (tslint-eslint-rules)
  * Description: disallow control characters in regular expressions (recommended)
  * Usage

    ```json
    "no-control-regex": true
    ```

* [no-debugger](http://eslint.org/docs/rules/no-debugger) => no-debugger (native)
  * Description: disallow use of `debugger` (recommended)
  * Usage

    ```json
    "no-debugger": true
    ```

* [no-dupe-args](http://eslint.org/docs/rules/no-dupe-args) => not applicable to TypeScript
  * Description: disallow duplicate arguments in functions (recommended)

* [no-dupe-keys](http://eslint.org/docs/rules/no-dupe-keys) => no-duplicate-key (native)
  * Description: disallow duplicate keys when creating object literals (recommended)
  * Usage

    ```json
    "no-duplicate-key": true
    ```

* [no-duplicate-case](http://eslint.org/docs/rules/no-duplicate-case) => no-duplicate-case (tslint-eslint-rules)
  * Description: disallow a duplicate case label. (recommended)
  * Usage

    ```json
    "no-duplicate-case": true
    ```

* [no-empty](http://eslint.org/docs/rules/no-empty) => no-empty (native)
  * Description: disallow empty statements (recommended)
  * Usage

    ```json
    "no-empty": true
    ```

* [no-empty-character-class](http://eslint.org/docs/rules/no-empty-character-class) => no-empty-character-class (tslint-eslint-rules)
  * Description: disallow the use of empty character classes in regular expressions (recommended)
  * Usage

    ```json
    "no-empty-character-class": true
    ```

* [no-ex-assign](http://eslint.org/docs/rules/no-ex-assign) => no-ex-assign (tslint-eslint-rules)
  * Description: disallow assigning to the exception in a `catch` block (recommended)
  * Usage

    ```json
    "no-ex-assign": true
    ```

* [no-extra-boolean-cast](http://eslint.org/docs/rules/no-extra-boolean-cast) => no-extra-boolean-cast (tslint-eslint-rules)
  * Description: disallow double-negation boolean casts in a boolean context (recommended)
  * Usage

    ```json
    "no-extra-boolean-cast": true
    ```

* [no-extra-parens](http://eslint.org/docs/rules/no-extra-parens) => no-extra-parens (tslint-eslint-rules) TODO (low priority)
  * Description: disallow unnecessary parentheses
  * Usage

    ```json
    "no-extra-parens": [
      true,
      "functions"
    ]
    ```

    ```json
    "no-extra-parens": [
      true,
      "all"
    ]
    ```

* [no-extra-semi](http://eslint.org/docs/rules/no-extra-semi) => no-extra-semi (tslint-eslint-rules)
  * Description: disallow unnecessary semicolons (recommended)
  * Usage

    ```json
    "no-extra-semi": true
    ```

* [no-func-assign](http://eslint.org/docs/rules/no-func-assign) => not applicable to TypeScript
  * Description: disallow overwriting functions written as function declarations (recommended)

* [no-inner-declarations](http://eslint.org/docs/rules/no-inner-declarations) => no-inner-declarations (tslint-eslint-rules)
  * Description: disallow function or variable declarations in nested blocks (recommended)
  * Usage

    ```json
    "no-inner-declarations": [
      true,
      "functions"
    ]
    ```

    ```json
    "no-inner-declarations": [
      true,
      "both"
    ]
    ```

* [no-invalid-regexp](http://eslint.org/docs/rules/no-invalid-regexp) => no-invalid-regex (tslint-eslint-rules)
  * Description: disallow invalid regular expression strings in the `RegExp` constructor (recommended)
  * Usage

    ```json
    "no-invalid-regexp": true
    ```

* [no-irregular-whitespace](http://eslint.org/docs/rules/no-irregular-whitespace) => no-irregular-whitespace (tslint-eslint-rules)
  * Description: disallow irregular whitespace outside of strings and comments (recommended)
  * Usage

    ```json
    "no-irregular-whitespace": true
    ```

* [no-negated-in-lhs](http://eslint.org/docs/rules/no-negated-in-lhs) => not applicable to TypeScript
  * Description: disallow negation of the left operand of an `in` expression (recommended)

* [no-obj-calls](http://eslint.org/docs/rules/no-obj-calls) => not applicable to TypeScript
  * Description: disallow the use of object properties of the global object (`Math` and `JSON`) as functions (recommended)

* [no-regex-spaces](http://eslint.org/docs/rules/no-regex-spaces) => no-regex-spaces (tslint-eslint-rules)
  * Description: disallow multiple spaces in a regular expression literal (recommended)
  * Usage

    ```json
    "no-regex-spaces": true
    ```

* [no-sparse-arrays](http://eslint.org/docs/rules/no-sparse-arrays) => no-sparse-arrays (tslint-eslint-rules)
  * Description: disallow sparse arrays (recommended)
  * Usage

    ```json
    "no-sparse-arrays": true
    ```

* [no-unexpected-multiline](http://eslint.org/docs/rules/no-unexpected-multiline) => no-unexpected-multiline (tslint-eslint-rules)
  * Description: Avoid code that looks like two expressions but is actually one
  * Usage

    ```json
    "no-unexpected-multiline": true
    ```

* [no-unreachable](http://eslint.org/docs/rules/no-unreachable) => no-unreachable (native)
  * Description: disallow unreachable statements after a return, throw, continue, or break statement (recommended)
  * Usage

    ```json
    "no-unreachable": true
    ```

* [use-isnan](http://eslint.org/docs/rules/use-isnan) => use-isnan (tslint-eslint-rules)
  * Description: disallow comparisons with the value `NaN` (recommended)
  * Usage

    ```json
    "use-isnan": true
    ```

* [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc) => valid-jsdoc (tslint-eslint-rules)
  * Description: Ensure JSDoc comments are valid
  * Usage

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
    ```

* [valid-typeof](http://eslint.org/docs/rules/valid-typeof) => valid-typeof (tslint-eslint-rules)
  * Description: Ensure that the results of typeof are compared against a valid string (recommended)
  * Usage

    ```json
    "valid-typeof": true
    ```

### Best Practices

These are rules designed to prevent you from making mistakes. They either prescribe a better way of doing something or help you avoid footguns.

* [accessor-pairs](http://eslint.org/docs/rules/accessor-pairs) => accessor-pairs (tslint-eslint-rules) [TODO]()
  * Description: Enforces getter/setter pairs in objects
  * Usage

    ```json
    "accessor-pairs": [
      true,
      {
        "getWithoutSet" : true,
        "setWithoutGet" : true
      }
    ]
    ```

* [array-callback-return](http://eslint.org/docs/rules/array-callback-return) => array-callback-return (tslint-eslint-rules) [TODO]()
  * Description: Enforce return statements in callbacks of array’s methods
  * Usage

    ```json
    "array-callback-return": true
    ```

* [block-scoped-var](http://eslint.org/docs/rules/block-scoped-var) => accessor-pairs (tslint-eslint-rules) [TODO]()
  * Description: treat `var` statements as if they were block scoped
  * Usage

    ```json
    "block-scoped-var": true
    ```

* [complexity](http://eslint.org/docs/rules/complexity) => complexity (tslint-eslint-rules) [TODO]()
  * Description: specify the maximum cyclomatic complexity allowed in a program
  * Usage

    ```json
    "complexity": [
      true,
      3
    ]
    ```

* [consistent-return](http://eslint.org/docs/rules/consistent-return) => consistent-return (tslint-eslint-rules) [TODO]()
  * Description: require `return` statements to either always or never specify values
  * Usage

    ```json
    "consistent-return": true
    ```

* [curly](http://eslint.org/docs/rules/curly) => curly (native)
  * Description: specify curly brace conventions for all control statements
  * Usage

    ```json
    "curly": true
    ```

* [default-case](http://eslint.org/docs/rules/default-case) => switch-default (native)
  * Description: require `default` case in `switch` statements
  * Usage

    ```json
    "default-case": true
    ```

* [dot-location](http://eslint.org/docs/rules/dot-location) => dot-location (tslint-eslint-rules) [TODO]()
  * Description: enforces consistent newlines before or after dots
  * Usage

    ```json
    "dot-location": [
        true,
        "object"
      ]
    ```

    ```json
    "dot-location": [
        true,
        "property"
      ]
    ```

* [dot-notation](http://eslint.org/docs/rules/dot-notation) => dot-notation (tslint-eslint-rules) [TODO]()
  * Description: encourages use of dot notation whenever possible
  * Usage

    ```json
    "dot-notation": [
        true,
        {
          "allowKeywords": true,
          "allowPattern": ""
        }
      ]
    ```

* [eqeqeq](http://eslint.org/docs/rules/eqeqeq) => triple-equals (native)
  * Description: require the use of `===` and `!==`
  * Usage

    ```json
    "eqeqeq": [
        true,
        "allow-null-check"
      ]
    ```

* [guard-for-in](http://eslint.org/docs/rules/guard-for-in) => forin (native)
  * Description: make sure `for-in` loops have an `if` statement
  * Usage

    ```json
    "forin": true
    ```

* [no-alert](http://eslint.org/docs/rules/no-alert) => no-alert (tslint-eslint-rules) [TODO]()
  * Description: disallow the use of `alert`, `confirm`, and `prompt`
  * Usage

    ```json
    "no-alert": true
    ```

* [no-caller](http://eslint.org/docs/rules/no-caller) => no-arg (native)
  * Description: disallow use of `arguments.caller` or `arguments.callee`
  * Usage

    ```json
    "no-arg": true
    ```

* [no-case-declarations](http://eslint.org/docs/rules/no-case-declarations) => no-case-declarations (tslint-eslint-rules) [TODO]()
  * Description: disallow lexical declarations in case clauses
  * Usage

    ```json
    "no-case-declarations": true
    ```

* [no-div-regex](http://eslint.org/docs/rules/no-div-regex) => no-div-regex (tslint-eslint-rules) [TODO]()
  * Description: disallow division operators explicitly at beginning of regular expression
  * Usage

    ```json
    "no-div-regex": true
    ```

* [no-else-return](http://eslint.org/docs/rules/no-else-return) => no-else-return (tslint-eslint-rules) [TODO]()
  * Description: disallow `else` after a `return` in an `if`
  * Usage

    ```json
    "no-else-return": true
    ```

* [no-empty-function](http://eslint.org/docs/rules/no-empty-function) => no-empty-function (tslint-eslint-rules) [TODO]()
  * Description: disallow use of empty functions
  * Usage

    ```json
    "no-empty-function": true
    ```

* [no-empty-pattern](http://eslint.org/docs/rules/no-empty-pattern) => no-empty-pattern (tslint-eslint-rules) [TODO]()
  * Description: disallow use of empty destructuring patterns
  * Usage

    ```json
    "no-empty-pattern": true
    ```

* [no-eq-null](http://eslint.org/docs/rules/no-eq-null) => no-eq-null (tslint-eslint-rules) [TODO]()
  * Description: disallow comparisons to null without a type-checking operator
  * Usage

    ```json
    "no-eq-null": true
    ```

* [no-eval](http://eslint.org/docs/rules/no-eval) => no-eval (native)
  * Description: disallow use of `eval()`
  * Usage

    ```json
    "no-eval": true
    ```

* [no-extend-native](http://eslint.org/docs/rules/no-extend-native) => no-extend-native (tslint-eslint-rules) [TODO]()
  * Description: disallow adding to native types
  * Usage

    ```json
    "no-extend-native": [
        true,
        {
          "exceptions": ["Object", "String"]
        }
      ]
    ```

* [no-extra-bind](http://eslint.org/docs/rules/no-extra-bind) => no-extra-bind (tslint-eslint-rules) [TODO]()
  * Description: disallow unnecessary function binding
  * Usage

    ```json
    "no-extra-bind": true
    ```

* [no-extra-label](http://eslint.org/docs/rules/no-extra-label) => no-extra-label (tslint-eslint-rules) [TODO]()
  * Description: disallow unnecessary labels
  * Usage

    ```json
    "no-extra-label": true
    ```

* [no-fallthrough](http://eslint.org/docs/rules/no-fallthrough) => no-switch-case-fall-through (native)
  * Description: disallow fallthrough of `case` statements (recommended)
  * Usage

    ```json
    "no-fallthrough": true
    ```

* [no-floating-decimal](http://eslint.org/docs/rules/no-floating-decimal) => no-floating-decimal (tslint-eslint-rules) [TODO]()
  * Description: disallow the use of leading or trailing decimal points in numeric literals
  * Usage

    ```json
    "no-floating-decimal": true
    ```

* [no-implicit-coercion](http://eslint.org/docs/rules/no-implicit-coercion) => no-implicit-coercion (tslint-eslint-rules) [TODO]()
  * Description: disallow the type conversions with shorter notations
  * Usage

    ```json
    "no-implicit-coercion": [
        true,
        {
          "boolean": true,
          "number": true,
          "string": true
        }
      ]
    ```

* [no-implicit-globals](http://eslint.org/docs/rules/no-implicit-globals) => no-implicit-globals (tslint-eslint-rules) [TODO]()
  * Description: disallow var and named functions in global scope
  * Usage

    ```json
    "no-implicit-coercion": true
    ```

* [no-implied-eval](http://eslint.org/docs/rules/no-implied-eval) => no-implied-eval (tslint-eslint-rules) [TODO]()
  * Description: disallow use of `eval()`-like methods
  * Usage

    ```json
    "no-implied-eval": true
    ```

* [no-invalid-this](http://eslint.org/docs/rules/no-invalid-this) => no-invalid-this (tslint-eslint-rules) [TODO]()
  * Description: disallow `this` keywords outside of classes or class-like objects
  * Usage

    ```json
    "no-invalid-this": true
    ```

* [no-iterator](http://eslint.org/docs/rules/no-iterator) => no-iterator (tslint-eslint-rules) [TODO]()
  * Description: disallow Usage of `__iterator__` property
  * Usage

    ```json
    "no-iterator": true
    ```

* [no-labels](http://eslint.org/docs/rules/no-labels) => no-labels (tslint-eslint-rules) [TODO]()
  * Description: disallow use of labeled statements
  * Usage

    ```json
    "no-labels": true
    ```

* [no-lone-blocks](http://eslint.org/docs/rules/no-lone-blocks) => no-lone-blocks (tslint-eslint-rules) [TODO]()
  * Description: disallow unnecessary nested blocks
  * Usage

    ```json
    "no-lone-blocks": true
    ```

* [no-loop-func](http://eslint.org/docs/rules/no-loop-func) => no-loop-func (tslint-eslint-rules) [TODO]()
  * Description: disallow creation of functions within loops
  * Usage

    ```json
    "no-loop-func": true
    ```

* [no-magic-numbers](http://eslint.org/docs/rules/no-magic-numbers) => no-magic-numbers (tslint-eslint-rules) [TODO]()
  * Description: disallow the use of magic numbers
  * Usage

    ```json
    "no-magic-numbers": [
        true,
        {
          "ignore": [0, 1, 2],
          "enforceConst": false,
          "detectObjects": false
        }
      ]
    ```

* [no-multi-spaces](http://eslint.org/docs/rules/no-multi-spaces) => no-multi-spaces (tslint-eslint-rules) [TODO]()
  * Description: disallow use of multiple spaces
  * Usage

    ```json
    "no-multi-spaces": [
        true,
        {
          "exceptions": [ { "ImportDeclation": true }, { "Property": false } ]
        }
      ]
    ```

* [no-multi-str](http://eslint.org/docs/rules/no-multi-str) => no-multi-str (tslint-eslint-rules) [TODO]()
  * Description: disallow use of multiline strings
  * Usage

    ```json
    "no-multi-str": true
    ```

* [no-native-reassign](http://eslint.org/docs/rules/no-native-reassign) => Not applicable to TypeScript
  * Description: disallow reassignments of native objects

* [no-new](http://eslint.org/docs/rules/no-new) => no-new (tslint-eslint-rules) [TODO]()
  * Description: disallow use of the `new` operator when not part of an assignment or comparison
  * Usage

    ```json
    "no-new": true
    ```

* [no-new-func](http://eslint.org/docs/rules/no-new-func) => no-new-func (tslint-eslint-rules) [TODO]()
  * Description: disallow use of new operator for `Function` object
  * Usage

    ```json
    "no-new-func": true
    ```

* [no-new-wrappers](http://eslint.org/docs/rules/no-new-wrappers) => no-new-wrappers (tslint-eslint-rules) [TODO]() // ou no-construct
  * Description: disallows creating new instances of `String`,`Number`, and `Boolean`
  * Usage

    ```json
    "no-new-wrappers": true
    ```

* [no-octal](http://eslint.org/docs/rules/no-octal) => Not applicable to TypeScript
  * Description: disallow use of octal literals (recommended)

* [no-octal-escape](http://eslint.org/docs/rules/no-octal-escape) => no-octal-escape (tslint-eslint-rules) [TODO]()
  * Description: disallow use of octal escape sequences in string literals, such as `var foo = "Copyright \251";`
  * Usage

    ```json
    "no-octal-escape": true
    ```

* [no-param-reassign](http://eslint.org/docs/rules/no-param-reassign) => no-param-reassign (tslint-eslint-rules) [TODO]()
  * Description: disallow reassignment of function parameters
  * Usage

    ```json
    "no-param-reassign": [
        true,
        {
          "props": false
        }
      ]
    ```

* [no-proto](http://eslint.org/docs/rules/no-proto) => no-proto (tslint-eslint-rules) [TODO]()
  * Description: disallow Usage of `__proto__` property
  * Usage

    ```json
    "no-proto": true
    ```

* [no-redeclare](http://eslint.org/docs/rules/no-redeclare) => no-duplicate-variable (native)
  * Description: disallow declaring the same variable more than once (http://eslint.org/docs/rules/recommended)
  * Usage

    ```json
    "no-duplicate-variable": true
    ```

* [no-return-assign](http://eslint.org/docs/rules/no-return-assign) => no-return-assign (tslint-eslint-rules) [TODO]()
  * Description: disallow use of assignment in `return` statement
  * Usage

    ```json
    "no-return-assign": [
        true,
        "except-parens"
      ]
    ```

    ```json
     "no-return-assign": [
        true,
        "always"
      ]
    ```

* [no-script-url](http://eslint.org/docs/rules/no-script-url) => no-script-url (tslint-eslint-rules) [TODO]()
  * Description: disallow use of `javascript:` urls.
  * Usage

    ```json
    "no-script-url": true
    ```

* [no-self-compare](http://eslint.org/docs/rules/no-self-compare) => no-self-compare (tslint-eslint-rules) [TODO]()
  * Description: disallow comparisons where both sides are exactly the same
  * Usage

    ```json
    "no-self-compare": true
    ```

* [no-sequences](http://eslint.org/docs/rules/no-sequences) => no-sequences (tslint-eslint-rules) [TODO]()
  * Description: disallow use of the comma operator
  * Usage

    ```json
    "no-sequences": true
    ```

* [no-throw-literal](http://eslint.org/docs/rules/no-throw-literal) => no-throw-literal (tslint-eslint-rules) [TODO]()
  * Description: restrict what can be thrown as an exception
  * Usage

    ```json
    "no-throw-literal": true
    ```

* [no-unmodified-loop-condition](http://eslint.org/docs/rules/no-unmodified-loop-condition) => no-unmodified-loop-condition (tslint-eslint-rules) [TODO]()
  * Description: disallow unmodified conditions of loops
  * Usage

    ```json
    "no-unmodified-loop-condition": true
    ```

* [no-unused-expressions](http://eslint.org/docs/rules/no-unused-expressions) => no-unused-expression (native)
  * Description: disallow Usage of expressions in statement position
  * Usage

    ```json
    "no-unused-expressions": true
    ```

* [no-unused-labels](http://eslint.org/docs/rules/no-unused-labels) => no-unused-labels (tslint-eslint-rules) [TODO]()
  * Description: disallow unused labels
  * Usage

    ```json
    "no-unused-labels": true
    ```

* [no-useless-call](http://eslint.org/docs/rules/no-useless-call) => no-useless-call (tslint-eslint-rules) [TODO]()
  * Description: disallow unnecessary `.call()` and `.apply()`
  * Usage

    ```json
    "no-useless-call": true
    ```

* [no-useless-concat](http://eslint.org/docs/rules/no-useless-concat) => no-useless-concat (tslint-eslint-rules) [TODO]()
  * Description: disallow unnecessary concatenation of literals or template literals
  * Usage

    ```json
    "no-useless-concat": true
    ```

* [no-useless-escape](http://eslint.org/docs/rules/no-useless-escape) => no-useless-escape (tslint-eslint-rules) [TODO]()
  * Description: disallow unnecessary usage of escape character
  * Usage

    ```json
    "no-useless-escape": true
    ```

* [no-void](http://eslint.org/docs/rules/no-void) => no-void (tslint-eslint-rules) [TODO]()
  * Description: disallow use of the `void` operator
  * Usage

    ```json
    "no-void":true
    ```

* [no-warning-comments](http://eslint.org/docs/rules/no-warning-comments) => no-warning-comments (tslint-eslint-rules) [TODO]()
  * Description: disallow Usage of configurable warning terms in comments e.g. `TODO` or `FIXME`
  * Usage

    ```json
    "no-warning-comments": [
        true,
        {
          "terms": ["todo", "fixme", "xxx"],
          "location": "start"
        }
      ]
    ```

* [no-with](http://eslint.org/docs/rules/no-with) => no-with (tslint-eslint-rules) [TODO]()
  * Description: disallow use of the `with` statement
  * Usage

    ```json
    "no-with": true
    ```

* [radix](http://eslint.org/docs/rules/radix) => radix (native)
  * Description: require use of the second argument for `parseInt()`
  * Usage

    ```json
    "radix": true
    ```

* [vars-on-top](http://eslint.org/docs/rules/vars-on-top) => vars-on-top (tslint-eslint-rules) [TODO]()
  * Description: require declaration of all vars at the top of their containing scope
  * Usage

    ```json
    "vars-on-top": true
    ```

* [wrap-iife](http://eslint.org/docs/rules/wrap-iife) => wrap-iife (tslint-eslint-rules) [TODO]()
  * Description: require immediate function invocation to be wrapped in parentheses
  * Usage

    ```json
    "wrap-iife": [
        true,
        "inside"
      ]
    ```

    ```json
    "wrap-iife": [
        true,
        "outside"
      ]
    ```

    ```json
    "wrap-iife": [
        true,
        "any"
      ]
    ```

* [yoda](http://eslint.org/docs/rules/yoda) => yoda (tslint-eslint-rules) [TODO]()
  * Description: require or disallow Yoda conditions
  * Usage

    ```json
    "yoda": [
        true,
        "never"
      ]
    ```

    ```json
    "yoda": [
        true,
        "always"
      ]
    ```

### Strict Mode

These rules relate to using strict mode.

* [strict](http://eslint.org/docs/rules/strict) => strict (tslint-eslint-rules) [TODO]()
  * Description: require effective use of strict mode directives
  * Usage

    ```json
    "strict": [
        true,
        "safe"
      ]
    ```

    ```json
    "strict": [
        true,
        "never"
      ]
    ```

    ```json
    "strict": [
        true,
        "global"
      ]
    ```

    ```json
    "strict": [
        true,
        "function"
      ]
    ```

### Variables

These rules have to do with variable declarations.

* [init-declarations](http://eslint.org/docs/rules/init-declarations) => init-declarations (tslint-eslint-rules) [TODO]()
  * Description: enforce or disallow variable initializations at definition
  * Usage

    ```json
    "init-declarations": [
        true,
        "always"
        {
          "ignoreForLoopInit": false
        }
      ]
    ```

    ```json
    "init-declarations": [
        true,
        "never"
        {
          "ignoreForLoopInit": false
        }
      ]
    ```

* [no-catch-shadow](http://eslint.org/docs/rules/no-catch-shadow) => no-catch-shadow (tslint-eslint-rules) [TODO]()
  * Description: disallow the catch clause parameter name being the same as a variable in the outer scope
  * Usage

    ```json
    "no-catch-shadow": true
    ```

* [no-delete-var](http://eslint.org/docs/rules/no-delete-var) => not applicable to TypeScript
  * Description: disallow deletion of variables (recommended)

* [no-label-var](http://eslint.org/docs/rules/no-label-var) => no-label-var (tslint-eslint-rules) [TODO]()
  * Description: disallow labels that share a name with a variable
  * Usage

    ```json
    "no-label-var": true
    ```

* [no-shadow](http://eslint.org/docs/rules/no-shadow) => no-shadowed-variable (native)
  * Description: disallow declaration of variables already declared in the outer scope
  * Usage

    ```json
    "no-shadowed-variable": true
    ```

* [no-shadow-restricted-names](http://eslint.org/docs/rules/no-shadow-restricted-names) => no-shadow-restricted-names (tslint-eslint-rules) [TODO]()
  * Description: disallow shadowing of names such as `arguments`
  * Usage

    ```json
    "no-shadow-restricted-names": true
    ```

* [no-undef](http://eslint.org/docs/rules/no-undef) => not applicable to TypeScript
  * Description: disallow use of undeclared variables unless mentioned in a `/*global */` block (recommended)

* [no-undef-init](http://eslint.org/docs/rules/no-undef-init) => no-undef-init (tslint-eslint-rules) [TODO]()
  * Description: disallow use of undefined when initializing variables
  * Usage

    ```json
    "no-undef-init": true
    ```

* [no-undefined](http://eslint.org/docs/rules/no-undefined) => no-undefined (tslint-eslint-rules) [TODO]()
  * Description: disallow use of `undefined` variable
  * Usage

    ```json
    "no-undefined": true
    ```

* [no-unused-vars](http://eslint.org/docs/rules/no-unused-vars) => no-unused-variable (native)
  * Description: disallow declaration of variables that are not used in the code (recommended)
  * Usage

    ```json
    "no-unused-variable": true
    ```

* [no-use-before-define](http://eslint.org/docs/rules/no-use-before-define) => no-use-before-define (native)
  * Description: disallow use of variables before they are defined
  * Usage

    ```json
    "no-use-before-define": true
    ```

### Node.js and CommonJS

These rules are specific to JavaScript running on Node.js or using CommonJS in the browser.

* [callback-return](http://eslint.org/docs/rules/callback-return) => callback-return (tslint-eslint-rules) [TODO]()
  * Description: enforce `return` after a callback
  * Usage

    ```json
    "callback-return": [
        true,
        [
          "callback",
          "cb",
          "next"
        ]
      ]
    ```

* [global-require](http://eslint.org/docs/rules/global-require) => global-require (tslint-eslint-rules) [TODO]()
  * Description: enforce `require()` on top-level module scope
  * Usage

    ```json
    "global-require": true
    ```

* [handle-callback-err](http://eslint.org/docs/rules/handle-callback-err) => handle-callback-err (tslint-eslint-rules)
  * Description: enforce error handling in callbacks
  * Usage

    ```json
    "handle-callback-err": [
        true,
        "^(err|error|anySpecificError)$"
      ]
    ```

* [no-mixed-requires](http://eslint.org/docs/rules/no-mixed-requires) => no-mixed-requires (tslint-eslint-rules) [TODO]()
  * Description: disallow mixing regular variable and require declarations
  * Usage

    ```json
    "no-mixed-requires": [
        true,
        {
          "grouping": false
        }
      ]
    ```

* [no-new-require](http://eslint.org/docs/rules/no-new-require) => no-new-require (tslint-eslint-rules) [TODO]()
  * Description: disallow use of `new` operator with the `require` function
  * Usage

    ```json
    "no-new-require": true
    ```

* [no-path-concat](http://eslint.org/docs/rules/no-path-concat) => no-path-concat (tslint-eslint-rules) [TODO]()
  * Description: disallow string concatenation with `__dirname` and `__filename`
  * Usage

    ```json
    "no-path-concat": true
    ```

* [no-process-env](http://eslint.org/docs/rules/no-process-env) => no-process-env (tslint-eslint-rules) [TODO]()
  * Description: disallow use of `process.env`
  * Usage

    ```json
    "no-process-env": true
    ```

* [no-process-exit](http://eslint.org/docs/rules/no-process-exit) => no-process-exit (tslint-eslint-rules) [TODO]()
  * Description: disallow `process.exit()`
  * Usage

    ```json
    "no-process-exit": true
    ```

* [no-restricted-modules](http://eslint.org/docs/rules/no-restricted-modules) => no-restricted-modules (tslint-eslint-rules) [TODO]()
  * Description: restrict Usage of specified node modules
  * Usage

    ```json
    "no-restricted-modules": [
        true,
        [
          "fs",
          "cluster",
          "moduleName"
        ]
      ]
    ```

* [no-sync](http://eslint.org/docs/rules/no-sync) => no-sync (tslint-eslint-rules) [TODO]()
  * Description: disallow use of synchronous methods
  * Usage

    ```json
    "no-sync": true
    ```

### Stylistic Issues

These rules are purely matters of style and are quite subjective.

* [array-bracket-spacing](http://eslint.org/docs/rules/array-bracket-spacing) => array-bracket-spacing (tslint-eslint-rules)
  * Description: enforce spacing inside array brackets
  * Usage

    ```json
    "array-bracket-spacing": [
        true,
        "always",
        {
          "singleValue": false,
          "objectsInArrays": false,
          "arraysInArrays": false
        }
      ]
    ```

    ```json
    "array-bracket-spacing": [
        true,
        "never",
        {
          "singleValue": true,
          "objectsInArrays": true,
          "arraysInArrays": true
        }
      ]
    ```

* [block-spacing](http://eslint.org/docs/rules/block-spacing) => block-spacing (tslint-eslint-rules)
  * Description: disallow or enforce spaces inside of single line blocks
  * Usage

    ```json
    "block-spacing": [
        true,
        "always"
      ]
    ```

    ```json
    "block-spacing": [
        true,
        "never"
      ]
    ```

* [brace-style](http://eslint.org/docs/rules/brace-style) => brace-style (tslint-eslint-rules)
  * Description: enforce one true brace style
  * Usage

    ```json
    "brace-style": [
        true,
        "1tbs",
        {
          "allowSingleLine": true
        }
      ]
    ```

    ```json
    "brace-style": [
        true,
        "stroustrup",
        {
          "allowSingleLine": true
        }
      ]
    ```

    ```json
    "brace-style": [
        true,
        "allman",
        {
          "allowSingleLine": true
        }
      ]
    ```

* [camelcase](http://eslint.org/docs/rules/camelcase) => variable-name (native)
  * Description: require camel case names
  * Usage

    ```json
    "variable-name": [
        true,
        "check-format"
      ]
    ```

* [comma-spacing](http://eslint.org/docs/rules/comma-spacing) => comma-spacing (tslint-eslint-rules) [TODO]()
  * Description: enforce spacing before and after comma
  * Usage

    ```json
    "comma-spacing": [
        true,
        {
          "before": false,
          "after": true
        }
      ]
    ```

* [comma-style](http://eslint.org/docs/rules/comma-style) => comma-style (tslint-eslint-rules) [TODO]()
  * Description: enforce one true comma style
  * Usage

    ```json
    "comma-style": [
        true,
        "first"
      ]
    ```

    ```json
    "comma-style": [
        true,
        "last"
      ]
    ```

* [computed-property-spacing](http://eslint.org/docs/rules/computed-property-spacing) => computed-property-spacing (tslint-eslint-rules) [TODO]()
  * Description: require or disallow padding inside computed properties
  * Usage

    ```json
    "computed-property-spacing": [
        true,
        "always"
      ]
    ```

    ```json
    "computed-property-spacing": [
        true,
        "never"
      ]
    ```

* [consistent-this](http://eslint.org/docs/rules/consistent-this) => consistent-this (tslint-eslint-rules) [TODO]()
  * Description: enforce consistent naming when capturing the current execution context
  * Usage

    ```json
    "consistent-this": [
        true,
        "self"
      ]
    ```

* [eol-last](http://eslint.org/docs/rules/eol-last) => eol-last (tslint-eslint-rules) [TODO]()
  * Description: enforce newline at the end of file, with no multiple empty lines
  * Usage

    ```json
    "eol-last": [
        true,
        "unix"
      ]
    ```

    ```json
    "eol-last": [
        true,
        "windows"
      ]
    ```

* [func-names](http://eslint.org/docs/rules/func-names) => func-names (tslint-eslint-rules) [TODO]()
  * Description: require function expressions to have a name
  * Usage

    ```json
    "func-names": true
    ```

* [func-style](http://eslint.org/docs/rules/func-style) => func-style (tslint-eslint-rules) [TODO]()
  * Description: enforce use of function declarations or expressions
  * Usage

    ```json
    "func-style": [
        true,
        "declaration"
        {
          "allowArrowFunctions": true
        }
      ]
    ```

    ```json
    "func-style": [
        true,
        "expression"
        {
          "allowArrowFunctions": true
        }
      ]
    ```

* [id-blacklist](http://eslint.org/docs/rules/id-blacklist) => id-blacklist (tslint-eslint-rules) [TODO]()
  * Description: disallow certain identifiers to prevent them being used
  * Usage

    ```json
    "id-blacklist": [
        true,
        ["error", "data", "err", "e", "cb", "callback"]
      ]
    ```

* [id-length](http://eslint.org/docs/rules/id-length) => id-length (tslint-eslint-rules) [TODO]()
  * Description: this option enforces minimum and maximum identifier lengths (variable names, property names etc.)
  * Usage

    ```json
    "id-length": [
        true,
        {
          "min": 2,
          "max": 10,
          "properties": "always",
          "exceptions": [ "x", "bolinha" ]
        }
      ]
    ```

    ```json
    "id-length": [
        true,
        {
          "min": 2,
          "max": 10,
          "properties": "never",
          "exceptions": [ "x", "bolinha" ]
        }
      ]
    ```

* [id-match](http://eslint.org/docs/rules/id-match) => id-match (tslint-eslint-rules) [TODO]()
  * Description: require identifiers to match the provided regular expression
  * Usage

    ```json
    "id-match": [
        true,
        "^[a-z]+([A-Z][a-z]+)*$",
        {
          "properties": false
        }
      ]
    ```

* [indent](http://eslint.org/docs/rules/indent) => indent (native)
  * Description: specify tab or space width for your code
  * Usage

    ```json
    "indent": [
        true,
        "spaces"
      ]
    ```

    ```json
    "indent": [
        true,
        "tabs"
      ]
    ```

* [jsx-quotes](http://eslint.org/docs/rules/jsx-quotes) => jsx-quotes (tslint-eslint-rules) [TODO]()
  * Description: specify whether double or single quotes should be used in JSX attributes
  * Usage

    ```json
    "jsx-quotes": [
        true,
        "prefer-double"
      ]
    ```

    ```json
    "jsx-quotes": [
        true,
        "prefer-single"
      ]
    ```

* [key-spacing](http://eslint.org/docs/rules/key-spacing) => key-spacing (tslint-eslint-rules) [TODO]()
  * Description: enforce spacing between keys and values in object literal properties
  * Usage

    ```json
    "key-spacing": [
        true,
        {
          "align": "value",
          "beforeColon": false,
          "afterColon": true,
          "mode": "minimum"
        }
      ]
    ```

* [keyword-spacing](http://eslint.org/docs/rules/keyword-spacing) => keyword-spacing (tslint-eslint-rules) [TODO]()
  * Description: enforce spacing before and after keywords
  * Usage

    ```json
    "keyword-spacing": [
        true,
        {
          "before": true,
          "after": true,
          "overrides": {
            "if": { "after": false },
            "for": { "after": false },
            "while": { "after": false }
          }
        }
      ]
    ```

* [linebreak-style](http://eslint.org/docs/rules/linebreak-style) => linebreak-style (tslint-eslint-rules) [TODO]()
  * Description: disallow mixed 'LF' and 'CRLF' as linebreaks
  * Usage

    ```json
    "linebreak-style": [
        true,
        "unix"
      ]
    ```

    ```json
    "linebreak-style": [
        true,
        "windows"
      ]
    ```

* [lines-around-comment](http://eslint.org/docs/rules/lines-around-comment) => lines-around-comment (tslint-eslint-rules) [TODO]()
  * Description: enforce empty lines around comments
  * Usage

    ```json
    "lines-around-comment": [
        true,
        {
          "beforeBlockComment": true,
          "afterBlockComment": false,
          "beforeLineComment": false,
          "afterLineComment": false,
          "allowBlockStart": false,
          "allowBlockEnd": false,
          "allowObjectStart": false,
          "allowObjectEnd": false,
          "allowArrayStart": false,
          "allowArrayEnd": false
        }
      ]
    ```

* [max-depth](http://eslint.org/docs/rules/max-depth) => max-depth (tslint-eslint-rules) [TODO]()
  * Description: specify the maximum depth that blocks can be nested
  * Usage

    ```json
    "max-depth": [
        true,
        10
      ]
    ```

    ```json
    "max-depth": [
        true,
        {
          "maximum": 10
        }
      ]
    ```

* [max-len](http://eslint.org/docs/rules/max-len) => max-len (tslint-eslint-rules) [TODO]()
  * Description: specify the maximum length of a line in your program
  * Usage

    ```json
    "max-len": [
        true,
        80,
        4,
        {
          "comments": 80,
          "ignoreComments": true
          "ignoreTrailingComments": true
          "ignoreUrls": true,
          "ignorePattern": true
        }
      ]
    ```

    ```json
    "max-len": [
        true,
        {
          "code": 80,
          "comments": 80,
          "tabWidth": 4,
          "ignoreComments": true
          "ignoreTrailingComments": true
          "ignoreUrls": true,
          "ignorePattern": true
        }
      ]
    ```


* [max-nested-callbacks](http://eslint.org/docs/rules/max-nested-callbacks) => max-nested-callbacks (tslint-eslint-rules) [TODO]()
  * Description: specify the maximum depth callbacks can be nested
  * Usage

    ```json
    "max-nested-callbacks": [
        true,
        3
      ]
    ```


* [max-params](http://eslint.org/docs/rules/max-params) => max-params (tslint-eslint-rules) [TODO]()
  * Description: specify the number of parameters that can be used in the function declaration
  * Usage

    ```json
    "max-params": [
        true,
        2
      ]
    ```

    ```json
    "max-params": [
        true,
        {
          "maximum": 2
        }
      ]
    ```

* [max-statements](http://eslint.org/docs/rulesmax-statements) => max-statements (tslint-eslint-rules) [TODO]()
  * Description: specify the maximum number of statement allowed in a function
  * Usage

    ```json
    "max-statements": [
        true,
        10,
        {
          "ignoreTopLevelFunctions": true
        }
      ]
    ```

    ```json
    "max-statements": [
        true,
        {
          "maximum": 10
        },
        {
          "ignoreTopLevelFunctions": true
        }
      ]
    ```

* [max-statements-per-line](http://eslint.org/docs/max-statements-per-line) => max-statements-per-line (tslint-eslint-rules) [TODO]()
  * Description: specify the maximum number of statements allowed per line
  * Usage

    ```json
    "max-statements-per-line": [
        true,
        1
      ]
    ```

    ```json
    "max-statements-per-line": [
        true,
        {
          "max": 1
        }
      ]
    ```

* [new-cap](http://eslint.org/docs/rules/new-cap) => Not applicable to TypeScript
  * Description: require a capital letter for constructors

* [new-parens](http://eslint.org/docs/rules/new-parens) => new-parens (tslint-eslint-rules) [TODO]()
  * Description: disallow the omission of parentheses when invoking a constructor with no arguments
  * Usage

    ```json
    "new-parens": true
    ```

* [newline-after-var](http://eslint.org/docs/rules/newline-after-var) => newline-after-var (tslint-eslint-rules) [TODO]()
  * Description: require or disallow an empty newline after variable declarations
  * Usage

    ```json
    "newline-after-var": [
        true,
        "never"
      ]
    ```

    ```json
    "newline-after-var": [
        true,
        "always"
      ]
    ```

* [newline-before-return](http://eslint.org/docs/rules/newline-before-return) => newline-before-return (tslint-eslint-rules) [TODO]()
  * Description: require newline before return statement
  * Usage

    ```json
    "newline-before-return": true
    ```

* [newline-per-chained-call](http://eslint.org/docs/rules/newline-per-chained-call) => newline-per-chained-call (tslint-eslint-rules) [TODO]()
  * Description: enforce newline after each call when chaining the calls
  * Usage

    ```json
    "newline-per-chained-call": [
        true,
        {
          "ignoreChainWithDepth": 3
        }
      ]
    ```

* [no-array-constructor](http://eslint.org/docs/rules/no-array-constructor) => no-array-constructor (tslint-eslint-rules) [TODO]()
  * Description: disallow use of the `Array` constructor
  * Usage

    ```json
    "no-array-constructor": true
    ```

* [no-continue](http://eslint.org/docs/rules/no-continue) => no-continue (tslint-eslint-rules) [TODO]()
  * Description: disallow use of the `continue` statement
  * Usage

    ```json
    "no-continue": true
    ```

* [no-inline-comments](http://eslint.org/docs/rules/no-inline-comments) => no-inline-comments (tslint-eslint-rules) [TODO]()
  * Description: disallow comments inline after code
  * Usage

    ```json
    "no-inline-comments": true
    ```

* [no-lonely-if](http://eslint.org/docs/rules/no-lonely-if) => no-lonely-if (tslint-eslint-rules) [TODO]()
  * Description: disallow `if` as the only statement in an `else` block
  * Usage

    ```json
    "no-lonely-if": true
    ```

* [no-mixed-spaces-and-tabs](http://eslint.org/docs/rules/no-mixed-spaces-and-tabs) => ident (native)
  * Description: disallow mixed spaces and tabs for indentation (recommended)
  * Usage

    ```json
    "ident": "spaces"
    ```

    ```json
    "ident": "tabs"
    ```

    Note: When using TSLint `ident` rule, it will enforce the consistent use of the chosen identation. The ESLint rule allows an option for Smart Tabs, but there are some open issues, and we're not going to support this.

* [no-multiple-empty-lines](http://eslint.org/docs/rules/no-multiple-empty-lines) => no-multiple-empty-lines (tslint-eslint-rules) [TODO]()
  * Description: disallow multiple empty lines
  * Usage

    ```json
    "no-multiple-empty-lines": [
        true,
        {
          "max": 2,
          "maxEOF": 1
        }
      ]
    ```

* [no-negated-condition](http://eslint.org/docs/rules/no-negated-condition) => no-negated-condition (tslint-eslint-rules) [TODO]()
  * Description: disallow negated conditions
  * Usage

    ```json
    "no-negated-condition": true
    ```

* [no-nested-ternary](http://eslint.org/docs/rules/no-nested-ternary) => no-nested-ternary (tslint-eslint-rules) [TODO]()
  * Description: disallow nested ternary expressions
  * Usage

    ```json
    "no-nested-ternary": true
    ```

* [no-new-object](http://eslint.org/docs/rules/no-new-object) => no-new-object (tslint-eslint-rules) [TODO]()
  * Description: disallow the use of the `Object` constructor
  * Usage

    ```json
    "no-new-object": true
    ```

* [no-restricted-syntax](http://eslint.org/docs/rules/no-restricted-syntax) => no-restricted-syntax (tslint-eslint-rules) [TODO]()
  * Description: disallow use of certain syntax in code
  * Usage

    ```json
    "no-restricted-syntax": [
        true,
        "FunctionExpression",
        "WithStatement"
      ]
    ```

* [no-spaced-func](http://eslint.org/docs/rules/no-spaced-func) => no-spaced-func (tslint-eslint-rules) [TODO]()
  * Description: disallow space between function identifier and application
  * Usage

    ```json
    "no-spaced-func": true
    ```

* [no-ternary](http://eslint.org/docs/rules/no-ternary) => no-ternary (tslint-eslint-rules) [TODO]()
  * Description: disallow the use of ternary operators
  * Usage

    ```json
    "no-ternary": true
    ```

* [no-trailing-spaces](http://eslint.org/docs/rules/no-trailing-spaces) => no-trailing-whitespace (native)
  * Description: disallow trailing whitespace at the end of lines
  * Usage

    ```json
    "no-trailing-whitespace": true
    ```

* [no-underscore-dangle](http://eslint.org/docs/rules/no-underscore-dangle) => no-underscore-dangle (tslint-eslint-rules) [TODO]()
  * Description: disallow dangling underscores in identifiers
  * Usage

    ```json
    "no-underscore-dangle": [
        true,
        {
          "allow": ["foo_", "_bar"]
        }
      ]
    ```

* [no-unneeded-ternary](http://eslint.org/docs/rules/no-unneeded-ternary) => no-unneeded-ternary (tslint-eslint-rules) [TODO]()
  * Description: disallow the use of ternary operators when a simpler alternative exists
  * Usage

    ```json
    "no-unneeded-ternary": [
        true,
        {
          "defaultAssignment": true
        }
      ]
    ```

* [no-whitespace-before-property](http://eslint.org/docs/rules/no-whitespace-before-property) => no-whitespace-before-property (tslint-eslint-rules) [TODO]()
  * Description: disallow whitespace before properties
  * Usage

    ```json
    "no-whitespace-before-property": true
    ```

* [object-curly-spacing](http://eslint.org/docs/rules/object-curly-spacing) => object-curly-spacing (tslint-eslint-rules)
  * Description: require or disallow padding inside curly braces
  * Usage

    ```json
    "object-curly-spacing": [
        true,
        "always"
      ]
    ```

    ```json
    "object-curly-spacing": [
        true,
        "never"
      ]
    ```

* [one-var](http://eslint.org/docs/rules/one-var) => one-var (tslint-eslint-rules) [TODO]()
  * Description: require or disallow one variable declaration per function
  * Usage

    ```json
    "one-var": [
        true,
        "always"
      ]
    ```

    ```json
    "one-var": [
        true,
        "never"
      ]
    ```

* [one-var-declaration-per-line](http://eslint.org/docs/rules/one-var-declaration-per-line) => one-var-declaration-per-line (tslint-eslint-rules) [TODO]()
  * Description: require or disallow a newline around variable declarations
  * Usage

    ```json
    "one-var-declaration-per-line": [
        true,
        "always"
      ]
    ```

    ```json
    "one-var-declaration-per-line": [
        true,
        "initializations"
      ]
    ```

* [operator-assignment](http://eslint.org/docs/rules/operator-assignment) => operator-assignment (tslint-eslint-rules) [TODO]()
  * Description: require assignment operator shorthand where possible or prohibit it entirely
  * Usage

    ```json
    "operator-assignment": [
        true,
        "always"
      ]
    ```

    ```json
    "operator-assignment": [
        true,
        "never"
      ]
    ```

* [operator-linebreak](http://eslint.org/docs/rules/operator-linebreak) => operator-linebreak (tslint-eslint-rules) [TODO]()
  * Description: enforce operators to be placed before or after line breaks
  * Usage

    ```json
    "operator-linebreak": [
        true,
        "before",
        {
          "overrides": { "?": "after"}
        }
      ]
    ```

    ```json
    "operator-linebreak": [
        true,
        "after",
        {
          "overrides": { "?": "after"}
        }
      ]
    ```

    ```json
    "operator-linebreak": [
        true,
        "none",
        {
          "overrides": { "?": "none", "+=": "none"}
        }
      ]
    ```

* [padded-blocks](http://eslint.org/docs/rules/padded-blocks) => padded-blocks (tslint-eslint-rules) [TODO]()
  * Description: enforce padding within blocks
  * Usage

    ```json
    "padded-blocks": [
        true,
        "always"
      ]
    ```

    ```json
    "padded-blocks": [
        true,
        "never"
      ]
    ```

* [quote-props](http://eslint.org/docs/rules/quote-props) => quote-props (tslint-eslint-rules) [TODO]()
  * Description: require quotes around object literal property names
  * Usage

    ```json
    "quote-props": [
        true,
        "always"
      ]
    ```

    ```json
    "quote-props": [
        true,
        "as-needed"
      ]
    ```

    ```json
    "quote-props": [
        true,
        "consistent"
      ]
    ```

    ```json
    "quote-props": [
        true,
        "consistent-as-needed"
      ]
    ```

* [quotes](http://eslint.org/docs/rules/quotes) => quote-props (tslint-eslint-rules) [TODO]()
  * Description: specify whether backticks, double or single quotes should be used
  * Usage

    ```json
    "quotes": [
        true,
        "single"
      ]
    ```

    ```json
    "quotes": [
        true,
        "single",
        "avoid-escape"
      ]
    ```

    ```json
    "quotes": [
        true,
        "double"
      ]
    ```

    ```json
    "quotes": [
        true,
        "double",
        "avoid-escape"
      ]
    ```

    ```json
    "quotes": [
        true,
        "backtick"
      ]
    ```

    ```json
    "quotes": [
        true,
        "backtick",
        "avoid-escape"
      ]
    ```

* [require-jsdoc](http://eslint.org/docs/rules/require-jsdoc) => require-jsdoc (tslint-eslint-rules) [TODO]()
  * Description: Require JSDoc comment
  * Usage

    ```json
    "require-jsdoc": [
        true,
        {
          "require":
          {
            "FunctionDeclaration": true,
            "MethodDefinition": false,
            "ClassDeclaration": false
          }
        }
      ]
    ```

* [semi](http://eslint.org/docs/rules/semi) => semi (tslint-eslint-rules) [TODO]()
  * Description: require or disallow use of semicolons instead of ASI
  * Usage

    ```json
    "semi": [
        true,
        "always"
      ]
    ```

    ```json
    "semi": [
        true,
        "never"
      ]
    ```

* [semi-spacing](http://eslint.org/docs/rules/semi-spacing) => semi-spacing (tslint-eslint-rules) [TODO]()
  * Description: enforce spacing before and after semicolons
  * Usage

    ```json
    "semi-spacing": [
        true,
        {
          "before": false,
          "after": true
        }
      ]
    ```

* [sort-imports](http://eslint.org/docs/rules/sort-imports) => sort-imports (tslint-eslint-rules) [TODO]()
  * Description: enforce sorting import declarations within module
  * Usage

    ```json
    "sort-imports": [
        true,
        {
          "ignoreCase": false,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": [
            "none",
            "all",
            "multiple",
            "single"
          ]
        }
      ]
    ```

* [sort-vars](http://eslint.org/docs/rules/sort-vars) => sort-vars (tslint-eslint-rules) [TODO]()
  * Description: sort variables within the same declaration block
  * Usage

    ```json
    "sort-vars": [
        true,
        {
          "ignoreCase": false
        }
      ]
    ```

* [space-before-blocks](http://eslint.org/docs/rules/space-before-blocks) => space-before-blocks (tslint-eslint-rules) [TODO]()
  * Description: require or disallow a space before blocks
  * Usage

    ```json
    "space-before-blocks": [
        true,
        "always"
      ]
    ```

    ```json
    "space-before-blocks": [
        true,
        "never"
      ]
    ```

    ```json
    "space-before-blocks": [
        true,
        {
          "functions": "never",
          "keywords": "always"
        }
      ]
    ```

* [space-before-function-paren](http://eslint.org/docs/rules/space-before-function-paren) => space-before-function-paren (tslint-eslint-rules) [TODO]()
  * Description: require or disallow a space before function opening parenthesis
  * Usage

    ```json
    "space-before-function-paren": [
        true,
        "always"
      ]
    ```

    ```json
    "space-before-function-paren": [
        true,
        "never"
      ]
    ```

    ```json
    "space-before-function-paren": [
        true,
        {
          "anonymous": "always",
          "named": "never"
        }
      ]
    ```

* [space-in-parens](http://eslint.org/docs/rules/space-in-parens) => space-in-parens (tslint-eslint-rules) [TODO]()
  * Description: require or disallow spaces inside parentheses
  * Usage

    ```json
    "space-in-parens": [
        true,
        "always"
      ]
    ```

    ```json
    "space-in-parens": [
        true,
        "never"
      ]
    ```

* [space-infix-ops](http://eslint.org/docs/rules/space-infix-ops) => space-infix-ops (tslint-eslint-rules) [TODO]()
  * Description: require spaces around operators
  * Usage

    ```json
    "space-infix-ops": [
        true,
        {
          "int32Hint": false
        }
      ]
    ```

* [space-unary-ops](http://eslint.org/docs/rules/space-unary-ops) => space-unary-ops (tslint-eslint-rules) [TODO]()
  * Description: require or disallow spaces before/after unary operators
  * Usage

    ```json
    "space-unary-ops": [
        true,
        {
          "words": true,
          "nonwords": false
        }
      ]
    ```

* [spaced-comment](http://eslint.org/docs/rules/spaced-comment) => spaced-comment (tslint-eslint-rules) [TODO]()
  * Description: require or disallow a space immediately following the `//` or `/*` in a comment
  * Usage

    ```json
    "spaced-comment": [
        true,
        "always"
      ]
    ```

    ```json
    "spaced-comment": [
        true,
        "never"
      ]
    ```

    ```json
    "spaced-comment": [
        true,
        "always",
        {
          "exceptions": ["-", "+"]
        }
      ]
    ```

    ```json
    "spaced-comment": [
        true,
        "always",
        {
          "line": {
            "markers": ["/"]
            "exceptions": ["-", "+"]
          },
          "block": {
            "markers": ["/"]
            "exceptions": ["-", "+"]
          }
        }
      ]
    ```

* [wrap-regex](http://eslint.org/docs/rules/wrap-regex) => wrap-regex (tslint-eslint-rules) [TODO]()
  * Description: require regex literals to be wrapped in parentheses
  * Usage

    ```json
    "wrap-regex": true
    ```

### ECMAScript 6

These rules are only relevant to ES6 environments.

* [arrow-body-style](http://eslint.org/docs/rules/arrow-body-style) => arrow-body-style (tslint-eslint-rules) [TODO]()
  * Description: require braces in arrow function body
  * Usage

    ```json
    "arrow-body-style": [
        true,
        "as-needed"
      ]
    ```

    ```json
    "arrow-body-style": [
        true,
        "always"
      ]
    ```

* [arrow-parens](http://eslint.org/docs/rules/arrow-parens) => arrow-parens (tslint-eslint-rules) [TODO]()
  * Description: require parens in arrow function arguments
  * Usage

    ```json
    "arrow-parens": [
        true,
        "as-needed"
      ]
    ```

    ```json
    "arrow-parens": [
        true,
        "always"
      ]
    ```

* [arrow-spacing](http://eslint.org/docs/rules/arrow-spacing) => arrow-spacing (tslint-eslint-rules) [TODO]()
  * Description: require space before/after arrow function's arrow
  * Usage

    ```json
    "arrow-spacing": [
        true,
        {
          "before": true,
          "after": true
        }
      ]
    ```

* [constructor-super](http://eslint.org/docs/rules/constructor-super) => constructor-super (tslint-eslint-rules) [TODO]()
  * Description: verify calls of `super()` in constructors
  * Usage

    ```json
    "constructor-super": true
    ```

* [generator-star-spacing](http://eslint.org/docs/rules/generator-star-spacing) => generator-star-spacing (tslint-eslint-rules) [TODO]()
  * Description: enforce spacing around the `*` in generator functions
  * Usage

    ```json
    "generator-star-spacing": [
        true,
        {
          "before": true,
          "after": true
        }
      ]
    ```

* [no-class-assign](http://eslint.org/docs/rules/no-class-assign) => no-class-assign (tslint-eslint-rules) [TODO]()
  * Description: disallow modifying variables of class declarations
  * Usage

    ```json
    "no-class-assign": true
    ```

* [no-confusing-arrow](http://eslint.org/docs/rules/no-confusing-arrow) => no-confusing-arrow (tslint-eslint-rules) [TODO]()
  * Description: disallow arrow functions where they could be confused with comparisons
  * Usage

    ```json
    "no-confusing-arrow": [
        true,
        {
          "allowParens": false
        }
      ]
    ```

* [no-const-assign](http://eslint.org/docs/rules/no-const-assign) => no-const-assign (tslint-eslint-rules) [TODO]()
  * Description: disallow modifying variables that are declared using `const`
  * Usage

    ```json
    "no-const-assign": true
    ```

* [no-dupe-class-members](http://eslint.org/docs/rules/no-dupe-class-members) => Not applicable to TypeScript
  * Description: disallow duplicate name in class members

* [no-duplicate-imports](http://eslint.org/docs/rules/no-duplicate-imports) => no-duplicate-imports (tslint-eslint-rules) [TODO]()
  * Description: disallow duplicate module imports
  * Usage

    ```json
    "no-duplicate-imports": [
        true,
        {
          includeExports: true
        }
      ]
    ```

* [no-new-symbol](http://eslint.org/docs/rules/no-new-symbol) => no-new-symbol (tslint-eslint-rules) [TODO]()
  * Description: disallow use of the `new` operator with the `Symbol` object
  * Usage

    ```json
    "no-new-symbol": true
    ```

* [no-restricted-imports](http://eslint.org/docs/rules/no-restricted-imports) => no-restricted-imports (tslint-eslint-rules) [TODO]()
  * Description: restrict usage of specified modules when loaded by `import` declaration
  * Usage

    ```json
    "no-restricted-imports": [
        true,
        "import1",
        "import2"
      ]
    ```

* [no-this-before-super](http://eslint.org/docs/rules/no-this-before-super) => no-this-before-super (tslint-eslint-rules) [TODO]()
  * Description: disallow use of `this`/`super` before calling `super()` in constructors.
  * Usage

    ```json
    "no-this-before-super": true
    ```

* [no-useless-constructor](http://eslint.org/docs/rules/no-useless-constructor) => no-useless-constructor (tslint-eslint-rules) [TODO]()
  * Description: disallow unnecessary constructor
  * Usage

    ```json
    "no-useless-constructor": true
    ```

* [no-var](http://eslint.org/docs/rules/no-var) => no-var-keyword (native)
  * Description: require `let` or `const` instead of `var`
  * Usage

    ```json
    "no-var-keyword": true
    ```

* [object-shorthand](http://eslint.org/docs/rules/object-shorthand) => object-shorthand (tslint-eslint-rules) [TODO]()
  * Description: require method and property shorthand syntax for object literals
  * Usage

    ```json
    "object-shorthand": [
        true,
        "always"
      ]
    ```

    ```json
    "object-shorthand": [
        true,
        "methods"
      ]
    ```

    ```json
    "object-shorthand": [
        true,
        "properties"
      ]
    ```

    ```json
    "object-shorthand": [
        true,
        "never"
      ]
    ```

* [prefer-arrow-callback](http://eslint.org/docs/rules/prefer-arrow-callback) => prefer-arrow-callback (tslint-eslint-rules) [TODO]()
  * Description: suggest using arrow functions as callbacks
  * Usage

    ```json
    "prefer-arrow-callback": true
    ```

* [prefer-const](http://eslint.org/docs/rules/prefer-const) => prefer-const (tslint-eslint-rules) [TODO]()
  * Description: suggest using `const` declaration for variables that are never modified after declared
  * Usage

    ```json
    "prefer-const": true
    ```

* [prefer-reflect](http://eslint.org/docs/rules/prefer-reflect) => prefer-reflect (tslint-eslint-rules) [TODO]()
  * Description: suggest using Reflect methods where applicable
  * Usage

    ```json
    "prefer-reflect": [
        true,
        {
          "exceptions": ["apply", "call", "defineProperty", "getOwnPropertyDescriptor", "getPrototypeOf", "setPrototypeOf", "isExtensible", "getOwnPropertyNames", "preventExtensions", "delete"]
        }
      ]
    ```

* [prefer-rest-params](http://eslint.org/docs/rules/prefer-rest-params) => prefer-rest-params (tslint-eslint-rules) [TODO]()
  * Description: suggest using the rest parameters instead of `arguments`
  * Usage

    ```json
    "prefer-rest-params": true
    ```

* [prefer-spread](http://eslint.org/docs/rules/prefer-spread) => prefer-spread (tslint-eslint-rules) [TODO]()
  * Description: suggest using the spread operator instead of `.apply()`.
  * Usage

    ```json
    "prefer-spread": true
    ```

* [prefer-template](http://eslint.org/docs/rules/prefer-template) => prefer-template (tslint-eslint-rules) [TODO]()
  * Description: suggest using template literals instead of strings concatenation
  * Usage

    ```json
    "prefer-template": true
    ```

* [require-yield](http://eslint.org/docs/rules/require-yield) => require-yield (tslint-eslint-rules) [TODO]()
  * Description: disallow generator functions that do not have `yield`
  * Usage

    ```json
    "require-yield": true
    ```

* [template-curly-spacing](http://eslint.org/docs/rules/template-curly-spacing) => template-curly-spacing (tslint-eslint-rules) [TODO]()
  * Description: enforce spacing around embedded expressions of template strings
  * Usage

    ```json
    "template-curly-spacing": [
        true,
        "always"
      ]
    ```

    ```json
    "template-curly-spacing": [
        true,
        "never"
      ]
    ```

* [yield-star-spacing](http://eslint.org/docs/rules/yield-star-spacing) => yield-star-spacing (tslint-eslint-rules) [TODO]()
  * Description: enforce spacing around the `*` in `yield*` expressions
  * Usage

    ```json
    "yield-star-spacing": true
    ```

## Contributing

Bugs, rules requests, doubts etc., open a Github Issue.

If you didn't find the rule, you can also create an ESLint custom rule for TSLint:

- Open an issue asking for the rule
- Fork this repository
- Create a branch with the rule name, e.g: no-if-usage
- Run `npm install`
- Run `gulp` to run the tests and watch for file changes
- Create your rule tests at `./src/test/rules` and your rule in `./src/rules` with the convetion:
  - Name: rule-name (hyphenated, e.g: no-if-usage)
  - File: ruleNameRule.ts (camelCased and with the `Rule` suffix, e.g: noIfUsageRule.ts)
  - Test File: ruleNameRuleTests.ts (camelCased and with the `RuleTests` suffix, e.g: noIfUsageRuleTests.ts)
- Check if single rule is passing with `gulp test --single rule-name` (hyphenated, e.g no-inner-declarations)
- Check if all the tests are passing with `gulp test`
- Commit the changes to your repo with the following convention:
  - Example: `[feat] added use-isnan rule (closes #20)`
- Finally, open a Pull Request

You can also contribute with PRs for fixing bugs, or improving documentation, performance. The commit convention for these are, respectively:
- Example: `[bug] fixed no-constant-condition rule (closes #9)`
- Example: `[docs] improved README.md file (closes #32)`
- Example: `[perf] improved valid-typeof rule (closes #48)`


## LICENSE

MIT
