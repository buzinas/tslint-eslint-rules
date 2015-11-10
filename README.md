# ESLint rules for TSLint

## Improve your TSLint with the missing ESLint Rules

You want to code in TypeScript but miss all the rules available in ESLint?

Now you can combine both worlds by using this TSLint plugin.


## Usage (it will be available only in v0.2.x)

Install from NPM to your Dev Dependencies

```console
npm install --save-dev tsling-eslint-rules
```

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
        "multiline": "always",
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
    
* [no-control-regex](http://eslint.org/docs/rules/no-control-regex) => ???
  * Description: disallow control characters in regular expressions (recommended)
  * Usage

    ```json
    "no-control-regex": [
      true,
      {
        
      }
    ]
    ```
* [no-debugger](http://eslint.org/docs/rules/no-debugger) => 
  * Description: disallow use of `debugger` (recommended)
  * Usage

    ```json
    "no-debugger": [
      true,
      {
        
      }
    ]
    ```
* [no-dupe-args](http://eslint.org/docs/rules/no-dupe-args) => 
  * Description: disallow duplicate arguments in functions (recommended)
  * Usage

    ```json
    "no-dupe-args": [
      true,
      {
        
      }
    ]
    ```
* [no-dupe-keys](http://eslint.org/docs/rules/no-dupe-keys) => 
  * Description: disallow duplicate keys when creating object literals (recommended)
  * Usage

    ```json
    "no-dupe-keys": [
      true,
      {
        
      }
    ]
    ```
* [no-duplicate-case](http://eslint.org/docs/rules/no-duplicate-case) => 
  * Description: disallow a duplicate case label. (recommended)
  * Usage

    ```json
    "no-duplicate-case": [
      true,
      {
        
      }
    ]
    ```
* [no-empty-character-class](http://eslint.org/docs/rules/no-empty-character-class) => 
  * Description: disallow the use of empty character classes in regular expressions (recommended)
  * Usage

    ```json
    "no-empty-character-class": [
      true,
      {
        
      }
    ]
    ```
* [no-empty](http://eslint.org/docs/rules/no-empty) => 
  * Description: disallow empty statements (recommended)
  * Usage

    ```json
    "no-empty": [
      true,
      {
        
      }
    ]
    ```
* [no-ex-assign](http://eslint.org/docs/rules/no-ex-assign) => 
  * Description: disallow assigning to the exception in a `catch` block (recommended)
  * Usage

    ```json
    "no-ex-assign": [
      true,
      {
        
      }
    ]
    ```
* [no-extra-boolean-cast](http://eslint.org/docs/rules/no-extra-boolean-cast) => 
  * Description: disallow double-negation boolean casts in a boolean context (recommended)
  * Usage

    ```json
    "no-extra-boolean-cast": [
      true,
      {
        
      }
    ]
    ```
* [no-extra-parens](http://eslint.org/docs/rules/no-extra-parens) => 
  * Description: disallow unnecessary parentheses
  * Usage

    ```json
    "no-extra-parens": [
      true,
      {
        
      }
    ]
    ```
* [no-extra-semi](http://eslint.org/docs/rules/no-extra-semi) => 
  * Description: disallow unnecessary semicolons (recommended) (fixable)
  * Usage

    ```json
    "no-extra-semi": [
      true,
      {
        
      }
    ]
    ```
* [no-func-assign](http://eslint.org/docs/rules/no-func-assign) => 
  * Description: disallow overwriting functions written as function declarations (recommended)
  * Usage

    ```json
    "no-func-assign": [
      true,
      {
        
      }
    ]
    ```
* [no-inner-declarations](http://eslint.org/docs/rules/no-inner-declarations) => 
  * Description: disallow function or variable declarations in nested blocks (recommended)
  * Usage

    ```json
    "no-inner-declarations": [
      true,
      {
        
      }
    ]
    ```
* [no-invalid-regexp](http://eslint.org/docs/rules/no-invalid-regexp) => 
  * Description: disallow invalid regular expression strings in the `RegExp` constructor (recommended)
  * Usage

    ```json
    "no-invalid-regexp": [
      true,
      {
        
      }
    ]
    ```
* [no-irregular-whitespace](http://eslint.org/docs/rules/no-irregular-whitespace) => 
  * Description: disallow irregular whitespace outside of strings and comments (recommended)
  * Usage

    ```json
    "no-irregular-whitespace": [
      true,
      {
        
      }
    ]
    ```
* [no-negated-in-lhs](http://eslint.org/docs/rules/no-negated-in-lhs) => 
  * Description: disallow negation of the left operand of an `in` expression (recommended)
  * Usage

    ```json
    "no-negated-in-lhs": [
      true,
      {
        
      }
    ]
    ```
* [no-obj-calls](http://eslint.org/docs/rules/no-obj-calls) => 
  * Description: disallow the use of object properties of the global object (`Math` and `JSON`) as functions (recommended)
  * Usage

    ```json
    "no-obj-calls": [
      true,
      {
        
      }
    ]
    ```
* [no-regex-spaces](http://eslint.org/docs/rules/no-regex-spaces) => 
  * Description: disallow multiple spaces in a regular expression literal (recommended)
  * Usage

    ```json
    "no-regex-spaces": [
      true,
      {
        
      }
    ]
    ```
* [no-sparse-arrays](http://eslint.org/docs/rules/no-sparse-arrays) => 
  * Description: disallow sparse arrays (recommended)
  * Usage

    ```json
    "no-sparse-arrays": [
      true,
      {
        
      }
    ]
    ```
* [no-unexpected-multiline](http://eslint.org/docs/rules/no-unexpected-multiline) => 
  * Description: Avoid code that looks like two expressions but is actually one
  * Usage

    ```json
    "no-unexpected-multiline": [
      true,
      {
        
      }
    ]
    ```
* [no-unreachable](http://eslint.org/docs/rules/no-unreachable) => 
  * Description: disallow unreachable statements after a return, throw, continue, or break statement (recommended)
  * Usage

    ```json
    "no-unreachable": [
      true,
      {
        
      }
    ]
    ```
* [use-isnan](http://eslint.org/docs/rules/use-isnan) => 
  * Description: disallow comparisons with the value `NaN` (recommended)
  * Usage

    ```json
    "use-isnan": [
      true,
      {
        
      }
    ]
    ```
* [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc) => 
  * Description: Ensure JSDoc comments are valid
  * Usage

    ```json
    "valid-jsdoc": [
      true,
      {
        
      }
    ]
    ```
* [valid-typeof](http://eslint.org/docs/rules/valid-typeof) => 
  * Description: Ensure that the results of typeof are compared against a valid string (recommended)
  * Usage

    ```json
    "valid-typeof": [
      true,
      {
        
      }
    ]
    ```

### Best Practices

These are rules designed to prevent you from making mistakes. They either prescribe a better way of doing something or help you avoid footguns.

* [accessor-pairs](accessor-pairs) => 
  * Description: Enforces getter/setter pairs in objects
  * Usage

    ```json
    "accessor-pairs": [
        true,
        {
          
        }
      ]
    ```
* [block-scoped-var](block-scoped-var) => 
  * Description: treat `var` statements as if they were block scoped
  * Usage

    ```json
    "block-scoped-var": [
        true,
        {
          
        }
      ]
    ```
* [complexity](complexity) => 
  * Description: specify the maximum cyclomatic complexity allowed in a program
  * Usage

    ```json
    "complexity": [
        true,
        {
          
        }
      ]
    ```
* [consistent-return](consistent-return) => 
  * Description: require `return` statements to either always or never specify values
  * Usage

    ```json
    "consistent-return": [
        true,
        {
          
        }
      ]
    ```
* [curly](curly) => 
  * Description: specify curly brace conventions for all control statements
  * Usage

    ```json
    "curly": [
        true,
        {
          
        }
      ]
    ```
* [default-case](default-case) => 
  * Description: require `default` case in `switch` statements
  * Usage

    ```json
    "default-case": [
        true,
        {
          
        }
      ]
    ```
* [dot-location](dot-location) => 
  * Description: enforces consistent newlines before or after dots
  * Usage

    ```json
    "dot-location": [
        true,
        {
          
        }
      ]
    ```
* [dot-notation](dot-notation) => 
  * Description: encourages use of dot notation whenever possible
  * Usage

    ```json
    "dot-notation": [
        true,
        {
          
        }
      ]
    ```
* [eqeqeq](eqeqeq) => 
  * Description: require the use of `===` and `!==` (fixable)
  * Usage

    ```json
    "eqeqeq": [
        true,
        {
          
        }
      ]
    ```
* [guard-for-in](guard-for-in) => 
  * Description: make sure `for-in` loops have an `if` statement
  * Usage

    ```json
    "guard-for-in": [
        true,
        {
          
        }
      ]
    ```
* [no-alert](no-alert) => 
  * Description: disallow the use of `alert`, `confirm`, and `prompt`
  * Usage

    ```json
    "no-alert": [
        true,
        {
          
        }
      ]
    ```
* [no-caller](no-caller) => 
  * Description: disallow use of `arguments.caller` or `arguments.callee`
  * Usage

    ```json
    "no-caller": [
        true,
        {
          
        }
      ]
    ```
* [no-case-declarations](no-case-declarations) => 
  * Description: disallow lexical declarations in case clauses
  * Usage

    ```json
    "no-case-declarations": [
        true,
        {
          
        }
      ]
    ```
* [no-div-regex](no-div-regex) => 
  * Description: disallow division operators explicitly at beginning of regular expression
  * Usage

    ```json
    "no-div-regex": [
        true,
        {
          
        }
      ]
    ```
* [no-else-return](no-else-return) => 
  * Description: disallow `else` after a `return` in an `if`
  * Usage

    ```json
    "no-else-return": [
        true,
        {
          
        }
      ]
    ```
* [no-empty-label](no-empty-label) => 
  * Description: disallow use of labels for anything other than loops and switches
  * Usage

    ```json
    "no-empty-label": [
        true,
        {
          
        }
      ]
    ```
* [no-empty-pattern](no-empty-pattern) => 
  * Description: disallow use of empty destructuring patterns
  * Usage

    ```json
    "no-empty-pattern": [
        true,
        {
          
        }
      ]
    ```
* [no-eq-null](no-eq-null) => 
  * Description: disallow comparisons to null without a type-checking operator
  * Usage

    ```json
    "no-eq-null": [
        true,
        {
          
        }
      ]
    ```
* [no-eval](no-eval) => 
  * Description: disallow use of `eval()`
  * Usage

    ```json
    "no-eval": [
        true,
        {
          
        }
      ]
    ```
* [no-extend-native](no-extend-native) => 
  * Description: disallow adding to native types
  * Usage

    ```json
    "no-extend-native": [
        true,
        {
          
        }
      ]
    ```
* [no-extra-bind](no-extra-bind) => 
  * Description: disallow unnecessary function binding
  * Usage

    ```json
    "no-extra-bind": [
        true,
        {
          
        }
      ]
    ```
* [no-fallthrough](no-fallthrough) => 
  * Description: disallow fallthrough of `case` statements (recommended)
  * Usage

    ```json
    "no-fallthrough": [
        true,
        {
          
        }
      ]
    ```
* [no-floating-decimal](no-floating-decimal) => 
  * Description: disallow the use of leading or trailing decimal points in numeric literals
  * Usage

    ```json
    "no-floating-decimal": [
        true,
        {
          
        }
      ]
    ```
* [no-implicit-coercion](no-implicit-coercion) => 
  * Description: disallow the type conversions with shorter notations
  * Usage

    ```json
    "no-implicit-coercion": [
        true,
        {
          
        }
      ]
    ```
* [no-implied-eval](no-implied-eval) => 
  * Description: disallow use of `eval()`-like methods
  * Usage

    ```json
    "no-implied-eval": [
        true,
        {
          
        }
      ]
    ```
* [no-invalid-this](no-invalid-this) => 
  * Description: disallow `this` keywords outside of classes or class-like objects
  * Usage

    ```json
    "no-invalid-this": [
        true,
        {
          
        }
      ]
    ```
* [no-iterator](no-iterator) => 
  * Description: disallow Usage
 of `__iterator__` property
  * Usage

    ```json
    "no-iterator": [
        true,
        {
          
        }
      ]
    ```
* [no-labels](no-labels) => 
  * Description: disallow use of labeled statements
  * Usage

    ```json
    "no-labels": [
        true,
        {
          
        }
      ]
    ```
* [no-lone-blocks](no-lone-blocks) => 
  * Description: disallow unnecessary nested blocks
  * Usage

    ```json
    "no-lone-blocks": [
        true,
        {
          
        }
      ]
    ```
* [no-loop-func](no-loop-func) => 
  * Description: disallow creation of functions within loops
  * Usage

    ```json
    "no-loop-func": [
        true,
        {
          
        }
      ]
    ```
* [no-magic-numbers](no-magic-numbers) => 
  * Description: disallow the use of magic numbers
  * Usage

    ```json
    "no-magic-numbers": [
        true,
        {
          
        }
      ]
    ```
* [no-multi-spaces](no-multi-spaces) => 
  * Description: disallow use of multiple spaces (fixable)
  * Usage

    ```json
    "no-multi-spaces": [
        true,
        {
          
        }
      ]
    ```
* [no-multi-str](no-multi-str) => 
  * Description: disallow use of multiline strings
  * Usage

    ```json
    "no-multi-str": [
        true,
        {
          
        }
      ]
    ```
* [no-native-reassign](no-native-reassign) => 
  * Description: disallow reassignments of native objects
  * Usage

    ```json
    "no-native-reassign": [
        true,
        {
          
        }
      ]
    ```
* [no-new-func](no-new-func) => 
  * Description: disallow use of new operator for `Function` object
  * Usage

    ```json
    "no-new-func": [
        true,
        {
          
        }
      ]
    ```
* [no-new-wrappers](no-new-wrappers) => 
  * Description: disallows creating new instances of `String`,`Number`, and `Boolean`
  * Usage

    ```json
    "no-new-wrappers": [
        true,
        {
          
        }
      ]
    ```
* [no-new](no-new) => 
  * Description: disallow use of the `new` operator when not part of an assignment or comparison
  * Usage

    ```json
    "no-new": [
        true,
        {
          
        }
      ]
    ```
* [no-octal-escape](no-octal-escape) => 
  * Description: disallow use of octal escape sequences in string literals, such as `var foo = "Copyright \251";`
  * Usage

    ```json
    "no-octal-escape": [
        true,
        {
          
        }
      ]
    ```
* [no-octal](no-octal) => 
  * Description: disallow use of octal literals (recommended)
  * Usage

    ```json
    "no-octal": [
        true,
        {
          
        }
      ]
    ```
* [no-param-reassign](no-param-reassign) => 
  * Description: disallow reassignment of function parameters
  * Usage

    ```json
    "no-param-reassign": [
        true,
        {
          
        }
      ]
    ```
* [no-process-env](no-process-env) => 
  * Description: disallow use of `process.env`
  * Usage

    ```json
    "no-process-env": [
        true,
        {
          
        }
      ]
    ```
* [no-proto](no-proto) => 
  * Description: disallow Usage
 of `__proto__` property
  * Usage

    ```json
    "no-proto": [
        true,
        {
          
        }
      ]
    ```
* [no-redeclare](no-redeclare) => 
  * Description: disallow declaring the same variable more than once (recommended)
  * Usage

    ```json
    "no-redeclare": [
        true,
        {
          
        }
      ]
    ```
* [no-return-assign](no-return-assign) => 
  * Description: disallow use of assignment in `return` statement
  * Usage

    ```json
    "no-return-assign": [
        true,
        {
          
        }
      ]
    ```
* [no-script-url](no-script-url) => 
  * Description: disallow use of `javascript:` urls.
  * Usage

    ```json
    "no-script-url": [
        true,
        {
          
        }
      ]
    ```
* [no-self-compare](no-self-compare) => 
  * Description: disallow comparisons where both sides are exactly the same
  * Usage

    ```json
    "no-self-compare": [
        true,
        {
          
        }
      ]
    ```
* [no-sequences](no-sequences) => 
  * Description: disallow use of the comma operator
  * Usage

    ```json
    "no-sequences": [
        true,
        {
          
        }
      ]
    ```
* [no-throw-literal](no-throw-literal) => 
  * Description: restrict what can be thrown as an exception
  * Usage

    ```json
    "no-throw-literal": [
        true,
        {
          
        }
      ]
    ```
* [no-unused-expressions](no-unused-expressions) => 
  * Description: disallow Usage
 of expressions in statement position
  * Usage

    ```json
    "no-unused-expressions": [
        true,
        {
          
        }
      ]
    ```
* [no-useless-call](no-useless-call) => 
  * Description: disallow unnecessary `.call()` and `.apply()`
  * Usage

    ```json
    "no-useless-call": [
        true,
        {
          
        }
      ]
    ```
* [no-useless-concat](no-useless-concat) => 
  * Description: disallow unnecessary concatenation of literals or template literals
  * Usage

    ```json
    "no-useless-concat": [
        true,
        {
          
        }
      ]
    ```
* [no-void](no-void) => 
  * Description: disallow use of the `void` operator
  * Usage

    ```json
    "no-void": [
        true,
        {
          
        }
      ]
    ```
* [no-warning-comments](no-warning-comments) - disallow Usage
 of configurable warning terms in comments => 
  * Description: e.g. `TODO` or `FIXME`
  * Usage

    ```json
    "no-warning-comments": [
        true,
        {
          
        }
      ]
    ```
* [no-with](no-with) => 
  * Description: disallow use of the `with` statement
  * Usage

    ```json
    "no-with": [
        true,
        {
          
        }
      ]
    ```
* [radix](radix) => 
  * Description: require use of the second argument for `parseInt()`
  * Usage

    ```json
    "radix": [
        true,
        {
          
        }
      ]
    ```
* [vars-on-top](vars-on-top) => 
  * Description: require declaration of all vars at the top of their containing scope
  * Usage

    ```json
    "vars-on-top": [
        true,
        {
          
        }
      ]
    ```
* [wrap-iife](wrap-iife) => 
  * Description: require immediate function invocation to be wrapped in parentheses
  * Usage

    ```json
    "wrap-iife": [
        true,
        {
          
        }
      ]
    ```
* [yoda](yoda) => 
  * Description: require or disallow Yoda conditions
  * Usage

    ```json
    "yoda": [
        true,
        {
          
        }
      ]
    ```

### Strict Mode

These rules relate to using strict mode.

* [strict](strict) => 
  * Description: controls location of Use Strict Directives
  * Usage

    ```json
    "strict": [
        true,
        {
          
        }
      ]
    ```

### Variables

These rules have to do with variable declarations.

* [init-declarations](init-declarations) => 
  * Description: enforce or disallow variable initializations at definition
  * Usage

    ```json
    "init-declarations": [
        true,
        {
          
        }
      ]
    ```
* [no-catch-shadow](no-catch-shadow) => 
  * Description: disallow the catch clause parameter name being the same as a variable in the outer scope
  * Usage

    ```json
    "no-catch-shadow": [
        true,
        {
          
        }
      ]
    ```
* [no-delete-var](no-delete-var) => 
  * Description: disallow deletion of variables (recommended)
  * Usage

    ```json
    "no-delete-var": [
        true,
        {
          
        }
      ]
    ```
* [no-label-var](no-label-var) => 
  * Description: disallow labels that share a name with a variable
  * Usage

    ```json
    "no-label-var": [
        true,
        {
          
        }
      ]
    ```
* [no-shadow-restricted-names](no-shadow-restricted-names) => 
  * Description: disallow shadowing of names such as `arguments`
  * Usage

    ```json
    "no-shadow-restricted-names": [
        true,
        {
          
        }
      ]
    ```
* [no-shadow](no-shadow) => 
  * Description: disallow declaration of variables already declared in the outer scope
  * Usage

    ```json
    "no-shadow": [
        true,
        {
          
        }
      ]
    ```
* [no-undef-init](no-undef-init) => 
  * Description: disallow use of undefined when initializing variables
  * Usage

    ```json
    "no-undef-init": [
        true,
        {
          
        }
      ]
    ```
* [no-undef](no-undef) => 
  * Description: disallow use of undeclared variables unless mentioned in a `/*global */` block (recommended)
  * Usage

    ```json
    "no-undef": [
        true,
        {
          
        }
      ]
    ```
* [no-undefined](no-undefined) => 
  * Description: disallow use of `undefined` variable
  * Usage

    ```json
    "no-undefined": [
        true,
        {
          
        }
      ]
    ```
* [no-unused-vars](no-unused-vars) => 
  * Description: disallow declaration of variables that are not used in the code (recommended)
  * Usage

    ```json
    "no-unused-vars": [
        true,
        {
          
        }
      ]
    ```
* [no-use-before-define](no-use-before-define) => 
  * Description: disallow use of variables before they are defined
  * Usage

    ```json
    "no-use-before-define": [
        true,
        {
          
        }
      ]
    ```

### Node.js and CommonJS

These rules are specific to JavaScript running on Node.js or using CommonJS in the browser.

* [callback-return](callback-return) => 
  * Description: enforce `return` after a callback
  * Usage

    ```json
    "callback-return": [
        true,
        {
          
        }
      ]
    ```
* [global-require](global-require) => 
  * Description: enforce `require()` on top-level module scope
  * Usage

    ```json
    "global-require": [
        true,
        {
          
        }
      ]
    ```
* [handle-callback-err](handle-callback-err) => 
  * Description: enforce error handling in callbacks
  * Usage

    ```json
    "handle-callback-err": [
        true,
        {
          
        }
      ]
    ```
* [no-mixed-requires](no-mixed-requires) => 
  * Description: disallow mixing regular variable and require declarations
  * Usage

    ```json
    "no-mixed-requires": [
        true,
        {
          
        }
      ]
    ```
* [no-new-require](no-new-require) => 
  * Description: disallow use of `new` operator with the `require` function
  * Usage

    ```json
    "no-new-require": [
        true,
        {
          
        }
      ]
    ```
* [no-path-concat](no-path-concat) => 
  * Description: disallow string concatenation with `__dirname` and `__filename`
  * Usage

    ```json
    "no-path-concat": [
        true,
        {
          
        }
      ]
    ```
* [no-process-exit](no-process-exit) => 
  * Description: disallow `process.exit()`
  * Usage

    ```json
    "no-process-exit": [
        true,
        {
          
        }
      ]
    ```
* [no-restricted-modules](no-restricted-modules) => 
  * Description: restrict Usage
 of specified node modules
  * Usage

    ```json
    "no-restricted-modules": [
        true,
        {
          
        }
      ]
    ```
* [no-sync](no-sync) => 
  * Description: disallow use of synchronous methods
  * Usage

    ```json
    "no-sync": [
        true,
        {
          
        }
      ]
    ```

### Stylistic Issues

These rules are purely matters of style and are quite subjective.

* [array-bracket-spacing](array-bracket-spacing) => 
  * Description: enforce spacing inside array brackets (fixable)
  * Usage

    ```json
    "array-bracket-spacing": [
        true,
        {
          
        }
      ]
    ```
* [block-spacing](block-spacing) => 
  * Description: disallow or enforce spaces inside of single line blocks (fixable)
  * Usage

    ```json
    "block-spacing": [
        true,
        {
          
        }
      ]
    ```
* [brace-style](brace-style) => 
  * Description: enforce one true brace style
  * Usage

    ```json
    "brace-style": [
        true,
        {
          
        }
      ]
    ```
* [camelcase](camelcase) => 
  * Description: require camel case names
  * Usage

    ```json
    "camelcase": [
        true,
        {
          
        }
      ]
    ```
* [comma-spacing](comma-spacing) => 
  * Description: enforce spacing before and after comma (fixable)
  * Usage

    ```json
    "comma-spacing": [
        true,
        {
          
        }
      ]
    ```
* [comma-style](comma-style) => 
  * Description: enforce one true comma style
  * Usage

    ```json
    "comma-style": [
        true,
        {
          
        }
      ]
    ```
* [computed-property-spacing](computed-property-spacing) => 
  * Description: require or disallow padding inside computed properties (fixable)
  * Usage

    ```json
    "computed-property-spacing": [
        true,
        {
          
        }
      ]
    ```
* [consistent-this](consistent-this) => 
  * Description: enforce consistent naming when capturing the current execution context
  * Usage

    ```json
    "consistent-this": [
        true,
        {
          
        }
      ]
    ```
* [eol-last](eol-last) => 
  * Description: enforce newline at the end of file, with no multiple empty lines (fixable)
  * Usage

    ```json
    "eol-last": [
        true,
        {
          
        }
      ]
    ```
* [func-names](func-names) => 
  * Description: require function expressions to have a name
  * Usage

    ```json
    "func-names": [
        true,
        {
          
        }
      ]
    ```
* [func-style](func-style) => 
  * Description: enforce use of function declarations or expressions
  * Usage

    ```json
    "func-style": [
        true,
        {
          
        }
      ]
    ```
* [id-length](id-length) => 
  * Description: this option enforces minimum and maximum identifier lengths (variable names, property names etc.)
  * Usage

    ```json
    "id-length": [
        true,
        {
          
        }
      ]
    ```
* [id-match](id-match) => 
  * Description: require identifiers to match the provided regular expression
  * Usage

    ```json
    "id-match": [
        true,
        {
          
        }
      ]
    ```
* [indent](indent) => 
  * Description: specify tab or space width for your code (fixable)
  * Usage

    ```json
    "indent": [
        true,
        {
          
        }
      ]
    ```
* [jsx-quotes](jsx-quotes) => 
  * Description: specify whether double or single quotes should be used in JSX attributes
  * Usage

    ```json
    "jsx-quotes": [
        true,
        {
          
        }
      ]
    ```
* [key-spacing](key-spacing) => 
  * Description: enforce spacing between keys and values in object literal properties
  * Usage

    ```json
    "key-spacing": [
        true,
        {
          
        }
      ]
    ```
* [linebreak-style](linebreak-style) => 
  * Description: disallow mixed 'LF' and 'CRLF' as linebreaks
  * Usage

    ```json
    "linebreak-style": [
        true,
        {
          
        }
      ]
    ```
* [lines-around-comment](lines-around-comment) => 
  * Description: enforce empty lines around comments
  * Usage

    ```json
    "lines-around-comment": [
        true,
        {
          
        }
      ]
    ```
* [max-nested-callbacks](max-nested-callbacks) => 
  * Description: specify the maximum depth callbacks can be nested
  * Usage

    ```json
    "max-nested-callbacks": [
        true,
        {
          
        }
      ]
    ```
* [new-cap](new-cap) => 
  * Description: require a capital letter for constructors
  * Usage

    ```json
    "new-cap": [
        true,
        {
          
        }
      ]
    ```
* [new-parens](new-parens) => 
  * Description: disallow the omission of parentheses when invoking a constructor with no arguments
  * Usage

    ```json
    "new-parens": [
        true,
        {
          
        }
      ]
    ```
* [newline-after-var](newline-after-var) => 
  * Description: require or disallow an empty newline after variable declarations
  * Usage

    ```json
    "newline-after-var": [
        true,
        {
          
        }
      ]
    ```
* [no-array-constructor](no-array-constructor) => 
  * Description: disallow use of the `Array` constructor
  * Usage

    ```json
    "no-array-constructor": [
        true,
        {
          
        }
      ]
    ```
* [no-continue](no-continue) => 
  * Description: disallow use of the `continue` statement
  * Usage

    ```json
    "no-continue": [
        true,
        {
          
        }
      ]
    ```
* [no-inline-comments](no-inline-comments) => 
  * Description: disallow comments inline after code
  * Usage

    ```json
    "no-inline-comments": [
        true,
        {
          
        }
      ]
    ```
* [no-lonely-if](no-lonely-if) => 
  * Description: disallow `if` as the only statement in an `else` block
  * Usage

    ```json
    "no-lonely-if": [
        true,
        {
          
        }
      ]
    ```
* [no-mixed-spaces-and-tabs](no-mixed-spaces-and-tabs) => 
  * Description: disallow mixed spaces and tabs for indentation (recommended)
  * Usage

    ```json
    "no-mixed-spaces-and-tabs": [
        true,
        {
          
        }
      ]
    ```
* [no-multiple-empty-lines](no-multiple-empty-lines) => 
  * Description: disallow multiple empty lines
  * Usage

    ```json
    "no-multiple-empty-lines": [
        true,
        {
          
        }
      ]
    ```
* [no-negated-condition](no-negated-condition) => 
  * Description: disallow negated conditions
  * Usage

    ```json
    "no-negated-condition": [
        true,
        {
          
        }
      ]
    ```
* [no-nested-ternary](no-nested-ternary) => 
  * Description: disallow nested ternary expressions
  * Usage

    ```json
    "no-nested-ternary": [
        true,
        {
          
        }
      ]
    ```
* [no-new-object](no-new-object) => 
  * Description: disallow the use of the `Object` constructor
  * Usage

    ```json
    "no-new-object": [
        true,
        {
          
        }
      ]
    ```
* [no-restricted-syntax](no-restricted-syntax) => 
  * Description: disallow use of certain syntax in code
  * Usage

    ```json
    "no-restricted-syntax": [
        true,
        {
          
        }
      ]
    ```
* [no-spaced-func](no-spaced-func) => 
  * Description: disallow space between function identifier and application (fixable)
  * Usage

    ```json
    "no-spaced-func": [
        true,
        {
          
        }
      ]
    ```
* [no-ternary](no-ternary) => 
  * Description: disallow the use of ternary operators
  * Usage

    ```json
    "no-ternary": [
        true,
        {
          
        }
      ]
    ```
* [no-trailing-spaces](no-trailing-spaces) => 
  * Description: disallow trailing whitespace at the end of lines (fixable)
  * Usage

    ```json
    "no-trailing-spaces": [
        true,
        {
          
        }
      ]
    ```
* [no-underscore-dangle](no-underscore-dangle) => 
  * Description: disallow dangling underscores in identifiers
  * Usage

    ```json
    "no-underscore-dangle": [
        true,
        {
          
        }
      ]
    ```
* [no-unneeded-ternary](no-unneeded-ternary) => 
  * Description: disallow the use of ternary operators when a simpler alternative exists
  * Usage

    ```json
    "no-unneeded-ternary": [
        true,
        {
          
        }
      ]
    ```
* [object-curly-spacing](object-curly-spacing) => 
  * Description: require or disallow padding inside curly braces (fixable)
  * Usage

    ```json
    "object-curly-spacing": [
        true,
        {
          
        }
      ]
    ```
* [one-var](one-var) => 
  * Description: require or disallow one variable declaration per function
  * Usage

    ```json
    "one-var": [
        true,
        {
          
        }
      ]
    ```
* [operator-assignment](operator-assignment) => 
  * Description: require assignment operator shorthand where possible or prohibit it entirely
  * Usage

    ```json
    "operator-assignment": [
        true,
        {
          
        }
      ]
    ```
* [operator-linebreak](operator-linebreak) => 
  * Description: enforce operators to be placed before or after line breaks
  * Usage

    ```json
    "operator-linebreak": [
        true,
        {
          
        }
      ]
    ```
* [padded-blocks](padded-blocks) => 
  * Description: enforce padding within blocks
  * Usage

    ```json
    "padded-blocks": [
        true,
        {
          
        }
      ]
    ```
* [quote-props](quote-props) => 
  * Description: require quotes around object literal property names
  * Usage

    ```json
    "quote-props": [
        true,
        {
          
        }
      ]
    ```
* [quotes](quotes) => 
  * Description: specify whether backticks, double or single quotes should be used (fixable)
  * Usage

    ```json
    "quotes": [
        true,
        {
          
        }
      ]
    ```
* [require-jsdoc](require-jsdoc) => 
  * Description: Require JSDoc comment
  * Usage

    ```json
    "require-jsdoc": [
        true,
        {
          
        }
      ]
    ```
* [semi-spacing](semi-spacing) => 
  * Description: enforce spacing before and after semicolons
  * Usage

    ```json
    "semi-spacing": [
        true,
        {
          
        }
      ]
    ```
* [semi](semi) => 
  * Description: require or disallow use of semicolons instead of ASI (fixable)
  * Usage

    ```json
    "semi": [
        true,
        {
          
        }
      ]
    ```
* [sort-vars](sort-vars) => 
  * Description: sort variables within the same declaration block
  * Usage

    ```json
    "sort-vars": [
        true,
        {
          
        }
      ]
    ```
* [space-after-keywords](space-after-keywords) => 
  * Description: require a space after certain keywords (fixable)
  * Usage

    ```json
    "space-after-keywords": [
        true,
        {
          
        }
      ]
    ```
* [space-before-blocks](space-before-blocks) => 
  * Description: require or disallow a space before blocks (fixable)
  * Usage

    ```json
    "space-before-blocks": [
        true,
        {
          
        }
      ]
    ```
* [space-before-function-paren](space-before-function-paren) => 
  * Description: require or disallow a space before function opening parenthesis (fixable)
  * Usage

    ```json
    "space-before-function-paren": [
        true,
        {
          
        }
      ]
    ```
* [space-before-keywords](space-before-keywords) => 
  * Description: require a space before certain keywords (fixable)
  * Usage

    ```json
    "space-before-keywords": [
        true,
        {
          
        }
      ]
    ```
* [space-in-parens](space-in-parens) => 
  * Description: require or disallow spaces inside parentheses
  * Usage

    ```json
    "space-in-parens": [
        true,
        {
          
        }
      ]
    ```
* [space-infix-ops](space-infix-ops) => 
  * Description: require spaces around operators (fixable)
  * Usage

    ```json
    "space-infix-ops": [
        true,
        {
          
        }
      ]
    ```
* [space-return-throw-case](space-return-throw-case) => 
  * Description: require a space after `return`, `throw`, and `case` (fixable)
  * Usage

    ```json
    "space-return-throw-case": [
        true,
        {
          
        }
      ]
    ```
* [space-unary-ops](space-unary-ops) => 
  * Description: require or disallow spaces before/after unary operators (fixable)
  * Usage

    ```json
    "space-unary-ops": [
        true,
        {
          
        }
      ]
    ```
* [spaced-comment](spaced-comment) => 
  * Description: require or disallow a space immediately following the `//` or `/*` in a comment
  * Usage

    ```json
    "spaced-comment": [
        true,
        {
          
        }
      ]
    ```
* [wrap-regex](wrap-regex) => 
  * Description: require regex literals to be wrapped in parentheses
  * Usage

    ```json
    "wrap-regex": [
        true,
        {
          
        }
      ]
    ```

### ECMAScript 6

These rules are only relevant to ES6 environments.

* [arrow-body-style](arrow-body-style) => 
  * Description: require braces in arrow function body
  * Usage

    ```json
    "arrow-body-style": [
        true,
        {
          
        }
      ]
    ```
* [arrow-parens](arrow-parens) => 
  * Description: require parens in arrow function arguments
  * Usage

    ```json
    "arrow-parens": [
        true,
        {
          
        }
      ]
    ```
* [arrow-spacing](arrow-spacing) => 
  * Description: require space before/after arrow function's arrow (fixable)
  * Usage

    ```json
    "arrow-spacing": [
        true,
        {
          
        }
      ]
    ```
* [constructor-super](constructor-super) => 
  * Description: verify calls of `super()` in constructors
  * Usage

    ```json
    "constructor-super": [
        true,
        {
          
        }
      ]
    ```
* [generator-star-spacing](generator-star-spacing) => 
  * Description: enforce spacing around the `*` in generator functions (fixable)
  * Usage

    ```json
    "generator-star-spacing": [
        true,
        {
          
        }
      ]
    ```
* [no-arrow-condition](no-arrow-condition) => 
  * Description: disallow arrow functions where a condition is expected
  * Usage

    ```json
    "no-arrow-condition": [
        true,
        {
          
        }
      ]
    ```
* [no-class-assign](no-class-assign) => 
  * Description: disallow modifying variables of class declarations
  * Usage

    ```json
    "no-class-assign": [
        true,
        {
          
        }
      ]
    ```
* [no-const-assign](no-const-assign) => 
  * Description: disallow modifying variables that are declared using `const`
  * Usage

    ```json
    "no-const-assign": [
        true,
        {
          
        }
      ]
    ```
* [no-dupe-class-members](no-dupe-class-members) => 
  * Description: disallow duplicate name in class members
  * Usage

    ```json
    "no-dupe-class-members": [
        true,
        {
          
        }
      ]
    ```
* [no-this-before-super](no-this-before-super) => 
  * Description: disallow use of `this`/`super` before calling `super()` in constructors.
  * Usage

    ```json
    "no-this-before-super": [
        true,
        {
          
        }
      ]
    ```
* [no-var](no-var) => 
  * Description: require `let` or `const` instead of `var`
  * Usage

    ```json
    "no-var": [
        true,
        {
          
        }
      ]
    ```
* [object-shorthand](object-shorthand) => 
  * Description: require method and property shorthand syntax for object literals
  * Usage

    ```json
    "object-shorthand": [
        true,
        {
          
        }
      ]
    ```
* [prefer-arrow-callback](prefer-arrow-callback) => 
  * Description: suggest using arrow functions as callbacks
  * Usage

    ```json
    "prefer-arrow-callback": [
        true,
        {
          
        }
      ]
    ```
* [prefer-const](prefer-const) => 
  * Description: suggest using `const` declaration for variables that are never modified after declared
  * Usage

    ```json
    "prefer-const": [
        true,
        {
          
        }
      ]
    ```
* [prefer-reflect](prefer-reflect) => 
  * Description: suggest using Reflect methods where applicable
  * Usage

    ```json
    "prefer-reflect": [
        true,
        {
          
        }
      ]
    ```
* [prefer-spread](prefer-spread) => 
  * Description: suggest using the spread operator instead of `.apply()`.
  * Usage

    ```json
    "prefer-spread": [
        true,
        {
          
        }
      ]
    ```
* [prefer-template](prefer-template) => 
  * Description: suggest using template literals instead of strings concatenation
  * Usage

    ```json
    "prefer-template": [
        true,
        {
          
        }
      ]
    ```
* [require-yield](require-yield) => 
  * Description: disallow generator functions that do not have `yield`
  * Usage

    ```json
    "require-yield": [
        true,
        {
          
        }
      ]
    ```

### Legacy

The following rules are included for compatibility with [JSHint](http://jshint.com/) and [JSLint](http://jslint.com/). While the names of the rules may not match up with the JSHint/JSLint counterpart, the functionality is the same.

* [max-depth](max-depth) => 
  * Description: specify the maximum depth that blocks can be nested
  * Usage

    ```json
    "max-depth": [
        true,
        {
          
        }
      ]
    ```
* [max-len](max-len) => 
  * Description: specify the maximum length of a line in your program
  * Usage

    ```json
    "max-len": [
        true,
        {
          
        }
      ]
    ```
* [max-params](max-params) => 
  * Description: limits the number of parameters that can be used in the function declaration.
  * Usage

    ```json
    "max-params": [
        true,
        {
          
        }
      ]
    ```
* [max-statements](max-statements) => 
  * Description: specify the maximum number of statement allowed in a function
  * Usage

    ```json
    "max-statements": [
        true,
        {
          
        }
      ]
    ```
* [no-bitwise](no-bitwise) => 
  * Description: disallow use of bitwise operators
  * Usage

    ```json
    "no-bitwise": [
        true,
        {
          
        }
      ]
    ```
* [no-plusplus](no-plusplus) => 
  * Description: disallow use of unary operators, `++` and `--`
  * Usage

    ```json
    "no-plusplus": [
        true,
        {
          
        }
      ]
    ```

### Removed

These rules existed in a previous version of ESLint but have since been replaced by newer rules.

* [generator-star](generator-star) => 
  * Description: enforce the position of the `*` in generator functions (replaced by [generator-star-spacing](generator-star-spacing))
  * Usage

    ```json
    "generator-star": [
        true,
        {
          
        }
      ]
    ```
* [global-strict](global-strict) => 
  * Description: require or disallow the `"use strict"` pragma in the global scope (replaced by [strict](strict))
  * Usage

    ```json
    "global-strict": [
        true,
        {
          
        }
      ]
    ```
* [no-comma-dangle](no-comma-dangle) => 
  * Description: disallow trailing commas in object literals (replaced by [comma-dangle](comma-dangle))
  * Usage

    ```json
    "no-comma-dangle": [
        true,
        {
          
        }
      ]
    ```
* [no-empty-class](no-empty-class) => 
  * Description: disallow the use of empty character classes in regular expressions (replaced by [no-empty-character-class](no-empty-character-class))
  * Usage

    ```json
    "no-empty-class": [
        true,
        {
          
        }
      ]
    ```
* [no-extra-strict](no-extra-strict) => 
  * Description: disallow unnecessary use of `"use strict";` when already in strict mode (replaced by [strict](strict))
  * Usage

    ```json
    "no-extra-strict": [
        true,
        {
          
        }
      ]
    ```
* [no-reserved-keys](no-reserved-keys) => 
  * Description: disallow reserved words being used as object literal keys
  * Usage

    ```json
    "no-reserved-keys": [
        true,
        {
          
        }
      ]
    ```
* [no-space-before-semi](no-space-before-semi) => 
  * Description: disallow space before semicolon (replaced by [semi-spacing](semi-spacing))
  * Usage

    ```json
    "no-space-before-semi": [
        true,
        {
          
        }
      ]
    ```
* [no-wrap-func](no-wrap-func) => 
  * Description: disallow wrapping of non-IIFE statements in parens (replaced by [no-extra-parens](no-extra-parens))
  * Usage

    ```json
    "no-wrap-func": [
        true,
        {
          
        }
      ]
    ```
* [space-after-function-name](space-after-function-name) => 
  * Description: require a space after function names (replaced by [space-before-function-paren](space-before-function-paren))
  * Usage

    ```json
    "space-after-function-name": [
        true,
        {
          
        }
      ]
    ```
* [space-before-function-parentheses](space-before-function-parentheses) => 
  * Description: require or disallow space before function parentheses (replaced by [space-before-function-paren](space-before-function-paren))
  * Usage

    ```json
    "space-before-function-parentheses": [
        true,
        {
          
        }
      ]
    ```
* [space-in-brackets](space-in-brackets) => 
  * Description: require or disallow spaces inside brackets (replaced by [object-curly-spacing](object-curly-spacing) and [array-bracket-spacing](array-bracket-spacing))
  * Usage

    ```json
    "space-in-brackets": [
        true,
        {
          
        }
      ]
    ```
* [space-unary-word-ops](space-unary-word-ops) => 
  * Description: require or disallow spaces before/after unary operators (replaced by [space-unary-ops](space-unary-ops))
  * Usage

    ```json
    "space-unary-word-ops": [
        true,
        {
          
        }
      ]
    ```
* [spaced-line-comment](spaced-line-comment) => 
  * Description: require or disallow a space immediately following the `//` in a line comment (replaced by [spaced-comment](spaced-comment))
  * Usage

    ```json
    "spaced-line-comment": [
        true,
        {
          
        }
      ]
    ```


## Contributing

Bugs, rules requests, doubts etc., open a Github Issue.

If you didn't find the rule, you can also create an ESLint custom rule for TSLint:

- Forking this repo
- Run `npm isntall`
- Run `gulp` to run the tests and watch for file changes
- Create your rule tests at `./src/test/rules` and your rule in `./src/rules` with the convetion:
  - Name: rule-name (hyphenated)
  - File: ruleNameRule.ts (camelCased and with the `Rule` suffix)
  - Test File: ruleNameRuleTests.ts (camelCased and with the `RuleTests` suffix)
- Check if all the tests are passing
- Commit the changes to your repo and open a Pull Request


## LICENSE

MIT
