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


## Rules (copied from the [ESLint website](http://eslint.org/docs/rules/))

The following tables shows all the existing ESLint rules and the similar rules available in TSLint.
Please refer to the following icons as they provide the status of the rule.

| Icon                    | Description |
| :---                    | :--         |
| :no_entry_sign:         | The rule is not applicable to Typescript. |
| :ballot_box_with_check: | The rule is provided natively by [TSLint](http://palantir.github.io/tslint/rules/). |
| :white_check_mark:      | The rule is available via tslint-eslint-rules. |
| :x:                     | The rule is currently unavailable. |

<!-- Start:AutoTable:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->

### Possible Errors

The following rules point out areas where you might have made mistakes.

| :grey_question: | ESLint | TSLint | Description |
| :---            | :---:  | :---:  | :---        |
|:ballot_box_with_check:|[comma-dangle](http://eslint.org/docs/rules/comma-dangle)|[trailing-comma](http://palantir.github.io/tslint/rules/trailing-comma)|disallow or enforce trailing commas (recommended)|
|:ballot_box_with_check:|[no-cond-assign](http://eslint.org/docs/rules/no-cond-assign)|[no-conditional-assignment](http://palantir.github.io/tslint/rules/no-conditional-assignment)|disallow assignment in conditional expressions (recommended)|
|:ballot_box_with_check:|[no-console](http:/eslint.org/docs/rules/no-console)|[no-console](http://palantir.github.io/tslint/rules/no-console)|disallow use of `console` in the node environment (recommended)|
|:white_check_mark:|[no-constant-condition](http://eslint.org/docs/rules/no-constant-condition)|[no-constant-condition](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noConstantConditionRule.md)|disallow use of constant expressions in conditions (recommended)|
|:white_check_mark:|[no-control-regex](http://eslint.org/docs/rules/no-control-regex)|[no-control-regex](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noControlRegexRule.md)|disallow control characters in regular expressions (recommended)|
|:ballot_box_with_check:|[no-debugger](http://eslint.org/docs/rules/no-debugger)|[no-debugger](http://palantir.github.io/tslint/rules/no-debugger)|disallow use of `debugger` (recommended)|
|:no_entry_sign:|[no-dupe-args](http://eslint.org/docs/rules/no-dupe-args)|Not applicable|disallow duplicate arguments in functions (recommended)|
|:ballot_box_with_check:|[no-dupe-keys](http://eslint.org/docs/rules/no-dupe-keys)|[no-duplicate-key](http://palantir.github.io/tslint/rules/no-duplicate-key)|disallow duplicate keys when creating object literals (recommended)|
|:white_check_mark:|[no-duplicate-case](http://eslint.org/docs/rules/no-duplicate-case)|[no-duplicate-case](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noDuplicateCaseRule.md)|disallow a duplicate case label. (recommended)|
|:ballot_box_with_check:|[no-empty](http://eslint.org/docs/rules/no-empty)|[no-empty](http://palantir.github.io/tslint/rules/no-empty)|disallow empty statements (recommended)|
|:white_check_mark:|[no-empty-character-class](http://eslint.org/docs/rules/no-empty-character-class)|[no-empty-character-class](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noEmptyCharacterClassRule.md)|disallow the use of empty character classes in regular expressions (recommended)|
|:white_check_mark:|[no-ex-assign](http://eslint.org/docs/rules/no-ex-assign)|[no-ex-assign](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noExAssignRule.md)|disallow assigning to the exception in a `catch` block (recommended)|
|:white_check_mark:|[no-extra-boolean-cast](http://eslint.org/docs/rules/no-extra-boolean-cast)|[no-extra-boolean-cast](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noExtraBooleanCastRule.md)|disallow double-negation boolean casts in a boolean context (recommended)|
|:x:|[no-extra-parens](http://eslint.org/docs/rules/no-extra-parens)|no-extra-parens|disallow unnecessary parentheses|
|:white_check_mark:|[no-extra-semi](http://eslint.org/docs/rules/no-extra-semi)|[no-extra-semi](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noExtraSemiRule.md)|disallow unnecessary semicolons (recommended)|
|:no_entry_sign:|[no-func-assign](http://eslint.org/docs/rules/no-func-assign)|Not applicable|disallow overwriting functions written as function declarations (recommended)|
|:white_check_mark:|[no-inner-declarations](http://eslint.org/docs/rules/no-inner-declarations)|[no-inner-declarations](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noInnerDeclarationsRule.md)|disallow function or variable declarations in nested blocks (recommended)|
|:white_check_mark:|[no-invalid-regexp](http://eslint.org/docs/rules/no-invalid-regexp)|[no-invalid-regexp](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noInvalidRegexpRule.md)|disallow invalid regular expression strings in the `RegExp` constructor (recommended)|
|:white_check_mark:|[no-irregular-whitespace](http://eslint.org/docs/rules/no-irregular-whitespace)|[no-irregular-whitespace](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noIrregularWhitespaceRule.md)|disallow irregular whitespace outside of strings and comments (recommended)|
|:no_entry_sign:|[no-negated-in-lhs](http://eslint.org/docs/rules/no-negated-in-lhs)|Not applicable|disallow negation of the left operand of an `in` expression (recommended)|
|:no_entry_sign:|[no-obj-calls](http://eslint.org/docs/rules/no-obj-calls)|Not applicable|disallow the use of object properties of the global object (`Math` and `JSON`) as functions (recommended)|
|:white_check_mark:|[no-regex-spaces](http://eslint.org/docs/rules/no-regex-spaces)|[no-regex-spaces](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noRegexSpacesRule.md)|disallow multiple spaces in a regular expression literal (recommended)|
|:white_check_mark:|[no-sparse-arrays](http://eslint.org/docs/rules/no-sparse-arrays)|[no-sparse-arrays](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noSparseArraysRule.md)|disallow sparse arrays (recommended)|
|:white_check_mark:|[no-unexpected-multiline](http://eslint.org/docs/rules/no-unexpected-multiline)|[no-unexpected-multiline](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noUnexpectedMultilineRule.md)|Avoid code that looks like two expressions but is actually one|
|:ballot_box_with_check:|[no-unreachable](http://eslint.org/docs/rules/no-unreachable)|[no-unreachable](http://palantir.github.io/tslint/rules/no-unreachable)|disallow unreachable statements after a return, throw, continue, or break statement (recommended)|
|:white_check_mark:|[use-isnan](http://eslint.org/docs/rules/use-isnan)|[use-isnan](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/useIsnanRule.md)|disallow comparisons with the value `NaN` (recommended)|
|:white_check_mark:|[valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc)|[valid-jsdoc](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/validJsdocRule.md)|Ensure JSDoc comments are valid|
|:white_check_mark:|[valid-typeof](http://eslint.org/docs/rules/valid-typeof)|[valid-typeof](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/validTypeofRule.md)|Ensure that the results of typeof are compared against a valid string (recommended)|

### Best Practices

These are rules designed to prevent you from making mistakes. They either
    prescribe a better way of doing something or help you avoid footguns.

| :grey_question: | ESLint | TSLint | Description |
| :---            | :---:  | :---:  | :---        |
|:x:|[accessor-pairs](http://eslint.org/docs/rules/accessor-pairs)|accessor-pairs|Enforces getter/setter pairs in objects|
|:x:|[array-callback-return](http://eslint.org/docs/rules/array-callback-return)|array-callback-return|Enforce return statements in callbacks of array’s methods|
|:x:|[block-scoped-var](http://eslint.org/docs/rules/block-scoped-var)|accessor-pairs|treat `var` statements as if they were block scoped|
|:x:|[complexity](http://eslint.org/docs/rules/complexity)|complexity|specify the maximum cyclomatic complexity allowed in a program|
|:x:|[consistent-return](http://eslint.org/docs/rules/consistent-return)|consistent-return|require `return` statements to either always or never specify values|
|:ballot_box_with_check:|[curly](http://eslint.org/docs/rules/curly)|[curly](http://palantir.github.io/tslint/rules/curly)|specify curly brace conventions for all control statements|
|:ballot_box_with_check:|[default-case](http://eslint.org/docs/rules/default-case)|[switch-default](http://palantir.github.io/tslint/rules/switch-default)|require `default` case in `switch` statements|
|:x:|[dot-location](http://eslint.org/docs/rules/dot-location)|dot-location|enforces consistent newlines before or after dots|
|:x:|[dot-notation](http://eslint.org/docs/rules/dot-notation)|dot-notation|encourages use of dot notation whenever possible|
|:ballot_box_with_check:|[eqeqeq](http://eslint.org/docs/rules/eqeqeq)|[triple-equals](http://palantir.github.io/tslint/rules/triple-equals)|require the use of `===` and `!==`|
|:ballot_box_with_check:|[guard-for-in](http://eslint.org/docs/rules/guard-for-in)|[forin](http://palantir.github.io/tslint/rules/forin)|make sure `for-in` loops have an `if` statement|
|:x:|[no-alert](http://eslint.org/docs/rules/no-alert)|no-alert|disallow the use of `alert`, `confirm`, and `prompt`|
|:ballot_box_with_check:|[no-caller](http://eslint.org/docs/rules/no-caller)|[no-arg](http://palantir.github.io/tslint/rules/no-arg)|disallow use of `arguments.caller` or `arguments.callee`|
|:x:|[no-case-declarations](http://eslint.org/docs/rules/no-case-declarations)|no-case-declarations|disallow lexical declarations in case clauses|
|:x:|[no-div-regex](http://eslint.org/docs/rules/no-div-regex)|no-div-regex|disallow division operators explicitly at beginning of regular expression|
|:x:|[no-else-return](http://eslint.org/docs/rules/no-else-return)|no-else-return|disallow `else` after a `return` in an `if`|
|:x:|[no-empty-function](http://eslint.org/docs/rules/no-empty-function)|no-empty-function|disallow use of empty functions|
|:x:|[no-empty-pattern](http://eslint.org/docs/rules/no-empty-pattern)|no-empty-pattern|disallow use of empty destructuring patterns|
|:x:|[no-eq-null](http://eslint.org/docs/rules/no-eq-null)|no-eq-null|disallow comparisons to null without a type-checking operator|
|:ballot_box_with_check:|[no-eval](http://eslint.org/docs/rules/no-eval)|[no-eval](http://palantir.github.io/tslint/rules/no-eval)|disallow use of `eval()`|
|:x:|[no-extend-native](http://eslint.org/docs/rules/no-extend-native)|no-extend-native|disallow adding to native types|
|:x:|[no-extra-bind](http://eslint.org/docs/rules/no-extra-bind)|no-extra-bind|disallow unnecessary function binding|
|:x:|[no-extra-label](http://eslint.org/docs/rules/no-extra-label)|no-extra-label|disallow unnecessary labels|
|:ballot_box_with_check:|[no-fallthrough](http://eslint.org/docs/rules/no-fallthrough)|[no-switch-case-fall-through](http://palantir.github.io/tslint/rules/no-switch-case-fall-through)|disallow fallthrough of `case` statements (recommended)|
|:x:|[no-floating-decimal](http://eslint.org/docs/rules/no-floating-decimal)|no-floating-decimal|disallow the use of leading or trailing decimal points in numeric literals|
|:x:|[no-implicit-coercion](http://eslint.org/docs/rules/no-implicit-coercion)|no-implicit-coercion|disallow the type conversions with shorter notations|
|:x:|[no-implicit-globals](http://eslint.org/docs/rules/no-implicit-globals)|no-implicit-globals|disallow var and named functions in global scope|
|:x:|[no-implied-eval](http://eslint.org/docs/rules/no-implied-eval)|no-implied-eval|disallow use of `eval()`-like methods|
|:x:|[no-invalid-this](http://eslint.org/docs/rules/no-invalid-this)|no-invalid-this|disallow `this` keywords outside of classes or class-like objects|
|:x:|[no-iterator](http://eslint.org/docs/rules/no-iterator)|no-iterator|disallow Usage of `__iterator__` property|
|:x:|[no-labels](http://eslint.org/docs/rules/no-labels)|no-labels|disallow use of labeled statements|
|:x:|[no-lone-blocks](http://eslint.org/docs/rules/no-lone-blocks)|no-lone-blocks|disallow unnecessary nested blocks|
|:x:|[no-loop-func](http://eslint.org/docs/rules/no-loop-func)|no-loop-func|disallow creation of functions within loops|
|:x:|[no-magic-numbers](http://eslint.org/docs/rules/no-magic-numbers)|no-magic-numbers|disallow the use of magic numbers|
|:white_check_mark:|[no-multi-spaces](http://eslint.org/docs/rules/no-multi-spaces)|[no-multi-spaces](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/noMultiSpacesRule.md)|disallow use of multiple spaces|
|:x:|[no-multi-str](http://eslint.org/docs/rules/no-multi-str)|no-multi-str|disallow use of multiline strings|
|:no_entry_sign:|[no-native-reassign](http://eslint.org/docs/rules/no-native-reassign)|Not applicable|disallow reassignments of native objects|
|:x:|[no-new](http://eslint.org/docs/rules/no-new)|no-new|disallow use of the `new` operator when not part of an assignment or comparison|
|:x:|[no-new-func](http://eslint.org/docs/rules/no-new-func)|no-new-func|disallow use of new operator for `Function` object|
|:x:|[no-new-wrappers](http://eslint.org/docs/rules/no-new-wrappers)|no-new-wrappers|disallows creating new instances of `String`,`Number`, and `Boolean`|
|:no_entry_sign:|[no-octal](http://eslint.org/docs/rules/no-octal)|Not applicable|disallow use of octal literals (recommended)|
|:x:|[no-octal-escape](http://eslint.org/docs/rules/no-octal-escape)|no-octal-escape|disallow use of octal escape sequences in string literals, such as `var foo = "Copyright \251";`|
|:x:|[no-param-reassign](http://eslint.org/docs/rules/no-param-reassign)|no-param-reassign|disallow reassignment of function parameters|
|:x:|[no-proto](http://eslint.org/docs/rules/no-proto)|no-proto|disallow Usage of `__proto__` property|
|:ballot_box_with_check:|[no-redeclare](http://eslint.org/docs/rules/no-redeclare)|[no-duplicate-variable](http://palantir.github.io/tslint/rules/no-duplicate-variable)|disallow declaring the same variable more than once (http://eslint.org/docs/rules/recommended)|
|:x:|[no-return-assign](http://eslint.org/docs/rules/no-return-assign)|no-return-assign|disallow use of assignment in `return` statement|
|:x:|[no-script-url](http://eslint.org/docs/rules/no-script-url)|no-script-url|disallow use of `javascript:` urls.|
|:x:|[no-self-assign](http://eslint.org/docs/rules/no-self-assign)|no-self-assign|disallow assignments where both sides are exactly the same|
|:x:|[no-self-compare](http://eslint.org/docs/rules/no-self-compare)|no-self-compare|disallow comparisons where both sides are exactly the same|
|:x:|[no-sequences](http://eslint.org/docs/rules/no-sequences)|no-sequences|disallow use of the comma operator|
|:x:|[no-throw-literal](http://eslint.org/docs/rules/no-throw-literal)|no-throw-literal|restrict what can be thrown as an exception|
|:x:|[no-unmodified-loop-condition](http://eslint.org/docs/rules/no-unmodified-loop-condition)|no-unmodified-loop-condition|disallow unmodified conditions of loops|
|:ballot_box_with_check:|[no-unused-expressions](http://eslint.org/docs/rules/no-unused-expressions)|[no-unused-expression](http://palantir.github.io/tslint/rules/no-unused-expression)|disallow Usage of expressions in statement position|
|:x:|[no-unused-labels](http://eslint.org/docs/rules/no-unused-labels)|no-unused-labels|disallow unused labels|
|:x:|[no-useless-call](http://eslint.org/docs/rules/no-useless-call)|no-useless-call|disallow unnecessary `.call()` and `.apply()`|
|:x:|[no-useless-concat](http://eslint.org/docs/rules/no-useless-concat)|no-useless-concat|disallow unnecessary concatenation of literals or template literals|
|:x:|[no-useless-escape](http://eslint.org/docs/rules/no-useless-escape)|no-useless-escape|disallow unnecessary usage of escape character|
|:x:|[no-void](http://eslint.org/docs/rules/no-void)|no-void|disallow use of the `void` operator|
|:x:|[no-warning-comments](http://eslint.org/docs/rules/no-warning-comments)|no-warning-comments|disallow Usage of configurable warning terms in comments e.g. `TODO` or `FIXME`|
|:x:|[no-with](http://eslint.org/docs/rules/no-with)|no-with|disallow use of the `with` statement|
|:ballot_box_with_check:|[radix](http://eslint.org/docs/rules/radix)|[radix](http://palantir.github.io/tslint/rules/radix)|require use of the second argument for `parseInt()`|
|:x:|[vars-on-top](http://eslint.org/docs/rules/vars-on-top)|vars-on-top|require declaration of all vars at the top of their containing scope|
|:x:|[wrap-iife](http://eslint.org/docs/rules/wrap-iife)|wrap-iife|require immediate function invocation to be wrapped in parentheses|
|:x:|[yoda](http://eslint.org/docs/rules/yoda)|yoda|require or disallow Yoda conditions|

### Strict Mode

These rules relate to using strict mode.

| :grey_question: | ESLint | TSLint | Description |
| :---            | :---:  | :---:  | :---        |
|:ballot_box_with_check:|[strict](http://eslint.org/docs/rules/strict)|[use-strict](http://palantir.github.io/tslint/rules/use-strict)|require effective use of strict mode directives|

### Variables

These rules have to do with variable declarations.

| :grey_question: | ESLint | TSLint | Description |
| :---            | :---:  | :---:  | :---        |
|:x:|[init-declarations](http://eslint.org/docs/rules/init-declarations)|init-declarations|enforce or disallow variable initializations at definition|
|:x:|[no-catch-shadow](http://eslint.org/docs/rules/no-catch-shadow)|no-catch-shadow|disallow the catch clause parameter name being the same as a variable in the outer scope|
|:no_entry_sign:|[no-delete-var](http://eslint.org/docs/rules/no-delete-var)|Not applicable|disallow deletion of variables (recommended)|
|:x:|[no-label-var](http://eslint.org/docs/rules/no-label-var)|no-label-var|disallow labels that share a name with a variable|
|:ballot_box_with_check:|[no-shadow](http://eslint.org/docs/rules/no-shadow)|[no-shadowed-variable](http://palantir.github.io/tslint/rules/no-shadowed-variable)|disallow declaration of variables already declared in the outer scope|
|:x:|[no-shadow-restricted-names](http://eslint.org/docs/rules/no-shadow-restricted-names)|no-shadow-restricted-names|disallow shadowing of names such as `arguments`|
|:no_entry_sign:|[no-undef](http://eslint.org/docs/rules/no-undef)|Not applicable|disallow use of undeclared variables unless mentioned in a `/*global */` block (recommended)|
|:x:|[no-undef-init](http://eslint.org/docs/rules/no-undef-init)|no-undef-init|disallow use of undefined when initializing variables|
|:x:|[no-undefined](http://eslint.org/docs/rules/no-undefined)|no-undefined|disallow use of `undefined` variable|
|:ballot_box_with_check:|[no-unused-vars](http://eslint.org/docs/rules/no-unused-vars)|[no-unused-variable](http://palantir.github.io/tslint/rules/no-unused-variable)|disallow declaration of variables that are not used in the code (recommended)|
|:ballot_box_with_check:|[no-use-before-define](http://eslint.org/docs/rules/no-use-before-define)|[no-use-before-define](http://palantir.github.io/tslint/rules/no-use-before-define)|disallow use of variables before they are defined|

### Node.js and CommonJS

These rules are specific to JavaScript running on Node.js or using CommonJS in the browser.

| :grey_question: | ESLint | TSLint | Description |
| :---            | :---:  | :---:  | :---        |
|:x:|[callback-return](http://eslint.org/docs/rules/callback-return)|callback-return|enforce `return` after a callback|
|:x:|[global-require](http://eslint.org/docs/rules/global-require)|global-require|enforce `require()` on top-level module scope|
|:white_check_mark:|[handle-callback-err](http://eslint.org/docs/rules/handle-callback-err)|[handle-callback-err](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/handleCallbackErrRule.md)|enforce error handling in callbacks|
|:x:|[no-mixed-requires](http://eslint.org/docs/rules/no-mixed-requires)|no-mixed-requires|disallow mixing regular variable and require declarations|
|:x:|[no-new-require](http://eslint.org/docs/rules/no-new-require)|no-new-require|disallow use of `new` operator with the `require` function|
|:x:|[no-path-concat](http://eslint.org/docs/rules/no-path-concat)|no-path-concat|disallow string concatenation with `__dirname` and `__filename`|
|:x:|[no-process-env](http://eslint.org/docs/rules/no-process-env)|no-process-env|disallow use of `process.env`|
|:x:|[no-process-exit](http://eslint.org/docs/rules/no-process-exit)|no-process-exit|disallow `process.exit()`|
|:x:|[no-restricted-modules](http://eslint.org/docs/rules/no-restricted-modules)|no-restricted-modules|restrict Usage of specified node modules|
|:x:|[no-sync](http://eslint.org/docs/rules/no-sync)|no-sync|disallow use of synchronous methods|

### Stylistic Issues

These rules are purely matters of style and are quite subjective.

| :grey_question: | ESLint | TSLint | Description |
| :---            | :---:  | :---:  | :---        |
|:white_check_mark:|[array-bracket-spacing](http://eslint.org/docs/rules/array-bracket-spacing)|[array-bracket-spacing](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/arrayBracketSpacingRule.md)|enforce spacing inside array brackets|
|:white_check_mark:|[block-spacing](http://eslint.org/docs/rules/block-spacing)|[block-spacing](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/blockSpacingRule.md)|disallow or enforce spaces inside of single line blocks|
|:white_check_mark:|[brace-style](http://eslint.org/docs/rules/brace-style)|[brace-style](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/braceStyleRule.md)|enforce one true brace style|
|:ballot_box_with_check:|[camelcase](http://eslint.org/docs/rules/camelcase)|[variable-name](http://palantir.github.io/tslint/rules/variable-name)|require camel case names|
|:x:|[comma-spacing](http://eslint.org/docs/rules/comma-spacing)|comma-spacing|enforce spacing before and after comma|
|:x:|[comma-style](http://eslint.org/docs/rules/comma-style)|comma-style|enforce one true comma style|
|:x:|[computed-property-spacing](http://eslint.org/docs/rules/computed-property-spacing)|computed-property-spacing|require or disallow padding inside computed properties|
|:x:|[consistent-this](http://eslint.org/docs/rules/consistent-this)|consistent-this|enforce consistent naming when capturing the current execution context|
|:x:|[eol-last](http://eslint.org/docs/rules/eol-last)|eol-last|enforce newline at the end of file, with no multiple empty lines|
|:x:|[func-names](http://eslint.org/docs/rules/func-names)|func-names|require function expressions to have a name|
|:x:|[func-style](http://eslint.org/docs/rules/func-style)|func-style|enforce use of function declarations or expressions|
|:x:|[id-blacklist](http://eslint.org/docs/rules/id-blacklist)|id-blacklist|disallow certain identifiers to prevent them being used|
|:x:|[id-length](http://eslint.org/docs/rules/id-length)|id-length|this option enforces minimum and maximum identifier lengths (variable names, property names etc.)|
|:x:|[id-match](http://eslint.org/docs/rules/id-match)|id-match|require identifiers to match the provided regular expression|
|:ballot_box_with_check:|[indent](http://eslint.org/docs/rules/indent)|[indent](http://palantir.github.io/tslint/rules/indent)|specify tab or space width for your code|
|:x:|[jsx-quotes](http://eslint.org/docs/rules/jsx-quotes)|jsx-quotes|specify whether double or single quotes should be used in JSX attributes|
|:x:|[key-spacing](http://eslint.org/docs/rules/key-spacing)|key-spacing|enforce spacing between keys and values in object literal properties|
|:x:|[keyword-spacing](http://eslint.org/docs/rules/keyword-spacing)|keyword-spacing|enforce spacing before and after keywords|
|:x:|[linebreak-style](http://eslint.org/docs/rules/linebreak-style)|linebreak-style|disallow mixed 'LF' and 'CRLF' as linebreaks|
|:x:|[lines-around-comment](http://eslint.org/docs/rules/lines-around-comment)|lines-around-comment|enforce empty lines around comments|
|:x:|[max-depth](http://eslint.org/docs/rules/max-depth)|max-depth|specify the maximum depth that blocks can be nested|
|:ballot_box_with_check:|[max-len](http://eslint.org/docs/rules/max-len)|[max-line-length](http://palantir.github.io/tslint/rules/max-line-length)|specify the maximum length of a line in your program|
|:ballot_box_with_check:|[max-lines](http://eslint.org/docs/rules/max-lines)|[max-file-line-count](http://palantir.github.io/tslint/rules/max-file-line-count)|enforce a maximum number of lines per file|
|:x:|[max-nested-callbacks](http://eslint.org/docs/rules/max-nested-callbacks)|max-nested-callbacks|specify the maximum depth callbacks can be nested|
|:x:|[max-params](http://eslint.org/docs/rules/max-params)|max-params|specify the number of parameters that can be used in the function declaration|
|:x:|[max-statements](http://eslint.org/docs/rulesmax-statements)|max-statements|specify the maximum number of statement allowed in a function|
|:x:|[max-statements-per-line](http://eslint.org/docs/max-statements-per-line)|max-statements-per-line|specify the maximum number of statements allowed per line|
|:no_entry_sign:|[new-cap](http://eslint.org/docs/rules/new-cap)|Not applicable|require a capital letter for constructors|
|:x:|[new-parens](http://eslint.org/docs/rules/new-parens)|new-parens|disallow the omission of parentheses when invoking a constructor with no arguments|
|:x:|[newline-after-var](http://eslint.org/docs/rules/newline-after-var)|newline-after-var|require or disallow an empty newline after variable declarations|
|:x:|[newline-before-return](http://eslint.org/docs/rules/newline-before-return)|newline-before-return|require newline before return statement|
|:x:|[newline-per-chained-call](http://eslint.org/docs/rules/newline-per-chained-call)|newline-per-chained-call|enforce newline after each call when chaining the calls|
|:x:|[no-array-constructor](http://eslint.org/docs/rules/no-array-constructor)|no-array-constructor|disallow use of the `Array` constructor|
|:x:|[no-continue](http://eslint.org/docs/rules/no-continue)|no-continue|disallow use of the `continue` statement|
|:x:|[no-inline-comments](http://eslint.org/docs/rules/no-inline-comments)|no-inline-comments|disallow comments inline after code|
|:x:|[no-lonely-if](http://eslint.org/docs/rules/no-lonely-if)|no-lonely-if|disallow `if` as the only statement in an `else` block|
|:ballot_box_with_check:|[no-mixed-spaces-and-tabs](http://eslint.org/docs/rules/no-mixed-spaces-and-tabs)|[ident](http://palantir.github.io/tslint/rules/ident)|disallow mixed spaces and tabs for indentation (recommended)|
|:ballot_box_with_check:|[no-multiple-empty-lines](http://eslint.org/docs/rules/no-multiple-empty-lines)|[no-consecutive-blank-lines](http://palantir.github.io/tslint/rules/no-consecutive-blank-lines)|disallow multiple empty lines|
|:x:|[no-negated-condition](http://eslint.org/docs/rules/no-negated-condition)|no-negated-condition|disallow negated conditions|
|:x:|[no-nested-ternary](http://eslint.org/docs/rules/no-nested-ternary)|no-nested-ternary|disallow nested ternary expressions|
|:x:|[no-new-object](http://eslint.org/docs/rules/no-new-object)|no-new-object|disallow the use of the `Object` constructor|
|:x:|[no-restricted-syntax](http://eslint.org/docs/rules/no-restricted-syntax)|no-restricted-syntax|disallow use of certain syntax in code|
|:x:|[no-spaced-func](http://eslint.org/docs/rules/no-spaced-func)|no-spaced-func|disallow space between function identifier and application|
|:x:|[no-ternary](http://eslint.org/docs/rules/no-ternary)|no-ternary|disallow the use of ternary operators|
|:ballot_box_with_check:|[no-trailing-spaces](http://eslint.org/docs/rules/no-trailing-spaces)|[no-trailing-whitespace](http://palantir.github.io/tslint/rules/no-trailing-whitespace)|disallow trailing whitespace at the end of lines|
|:x:|[no-underscore-dangle](http://eslint.org/docs/rules/no-underscore-dangle)|no-underscore-dangle|disallow dangling underscores in identifiers|
|:x:|[no-unneeded-ternary](http://eslint.org/docs/rules/no-unneeded-ternary)|no-unneeded-ternary|disallow the use of ternary operators when a simpler alternative exists|
|:x:|[no-whitespace-before-property](http://eslint.org/docs/rules/no-whitespace-before-property)|no-whitespace-before-property|disallow whitespace before properties|
|:white_check_mark:|[object-curly-spacing](http://eslint.org/docs/rules/object-curly-spacing)|[object-curly-spacing](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/objectCurlySpacingRule.md)|require or disallow padding inside curly braces|
|:x:|[one-var](http://eslint.org/docs/rules/one-var)|one-var|require or disallow one variable declaration per function|
|:x:|[one-var-declaration-per-line](http://eslint.org/docs/rules/one-var-declaration-per-line)|one-var-declaration-per-line|require or disallow a newline around variable declarations|
|:x:|[operator-assignment](http://eslint.org/docs/rules/operator-assignment)|operator-assignment|require assignment operator shorthand where possible or prohibit it entirely|
|:x:|[operator-linebreak](http://eslint.org/docs/rules/operator-linebreak)|operator-linebreak|enforce operators to be placed before or after line breaks|
|:x:|[padded-blocks](http://eslint.org/docs/rules/padded-blocks)|padded-blocks|enforce padding within blocks|
|:x:|[quote-props](http://eslint.org/docs/rules/quote-props)|quote-props|require quotes around object literal property names|
|:x:|[quotes](http://eslint.org/docs/rules/quotes)|quote-props|specify whether backticks, double or single quotes should be used|
|:x:|[require-jsdoc](http://eslint.org/docs/rules/require-jsdoc)|require-jsdoc|Require JSDoc comment|
|:ballot_box_with_check:|[semi](http://eslint.org/docs/rules/semi)|[semicolon](http://palantir.github.io/tslint/rules/semicolon)|require or disallow use of semicolons instead of ASI|
|:x:|[semi-spacing](http://eslint.org/docs/rules/semi-spacing)|semi-spacing|enforce spacing before and after semicolons|
|:x:|[sort-imports](http://eslint.org/docs/rules/sort-imports)|sort-imports|enforce sorting import declarations within module|
|:x:|[sort-vars](http://eslint.org/docs/rules/sort-vars)|sort-vars|sort variables within the same declaration block|
|:x:|[space-before-blocks](http://eslint.org/docs/rules/space-before-blocks)|space-before-blocks|require or disallow a space before blocks|
|:x:|[space-before-function-paren](http://eslint.org/docs/rules/space-before-function-paren)|space-before-function-paren|require or disallow a space before function opening parenthesis|
|:x:|[space-in-parens](http://eslint.org/docs/rules/space-in-parens)|space-in-parens|require or disallow spaces inside parentheses|
|:x:|[space-infix-ops](http://eslint.org/docs/rules/space-infix-ops)|space-infix-ops|require spaces around operators|
|:x:|[space-unary-ops](http://eslint.org/docs/rules/space-unary-ops)|space-unary-ops|require or disallow spaces before/after unary operators|
|:x:|[spaced-comment](http://eslint.org/docs/rules/spaced-comment)|spaced-comment|require or disallow a space immediately following the `//` or `/*` in a comment|
|:x:|[wrap-regex](http://eslint.org/docs/rules/wrap-regex)|wrap-regex|require regex literals to be wrapped in parentheses|

### ECMAScript 6

These rules are only relevant to ES6 environments.

| :grey_question: | ESLint | TSLint | Description |
| :---            | :---:  | :---:  | :---        |
|:x:|[arrow-body-style](http://eslint.org/docs/rules/arrow-body-style)|arrow-body-style|require braces in arrow function body|
|:x:|[arrow-parens](http://eslint.org/docs/rules/arrow-parens)|arrow-parens|require parens in arrow function arguments|
|:x:|[arrow-spacing](http://eslint.org/docs/rules/arrow-spacing)|arrow-spacing|require space before/after arrow function's arrow|
|:x:|[constructor-super](http://eslint.org/docs/rules/constructor-super)|constructor-super|verify calls of `super()` in constructors|
|:x:|[generator-star-spacing](http://eslint.org/docs/rules/generator-star-spacing)|generator-star-spacing|enforce spacing around the `*` in generator functions|
|:x:|[no-class-assign](http://eslint.org/docs/rules/no-class-assign)|no-class-assign|disallow modifying variables of class declarations|
|:x:|[no-confusing-arrow](http://eslint.org/docs/rules/no-confusing-arrow)|no-confusing-arrow|disallow arrow functions where they could be confused with comparisons|
|:x:|[no-const-assign](http://eslint.org/docs/rules/no-const-assign)|no-const-assign|disallow modifying variables that are declared using `const`|
|:no_entry_sign:|[no-dupe-class-members](http://eslint.org/docs/rules/no-dupe-class-members)|Not applicable|disallow duplicate name in class members|
|:x:|[no-duplicate-imports](http://eslint.org/docs/rules/no-duplicate-imports)|no-duplicate-imports|disallow duplicate module imports|
|:x:|[no-new-symbol](http://eslint.org/docs/rules/no-new-symbol)|no-new-symbol|disallow use of the `new` operator with the `Symbol` object|
|:x:|[no-restricted-imports](http://eslint.org/docs/rules/no-restricted-imports)|no-restricted-imports|restrict usage of specified modules when loaded by `import` declaration|
|:x:|[no-this-before-super](http://eslint.org/docs/rules/no-this-before-super)|no-this-before-super|disallow use of `this`/`super` before calling `super()` in constructors.|
|:x:|[no-useless-constructor](http://eslint.org/docs/rules/no-useless-constructor)|no-useless-constructor|disallow unnecessary constructor|
|:ballot_box_with_check:|[no-var](http://eslint.org/docs/rules/no-var)|[no-var-keyword](http://palantir.github.io/tslint/rules/no-var-keyword)|require `let` or `const` instead of `var`|
|:x:|[object-shorthand](http://eslint.org/docs/rules/object-shorthand)|object-shorthand|require method and property shorthand syntax for object literals|
|:x:|[prefer-arrow-callback](http://eslint.org/docs/rules/prefer-arrow-callback)|prefer-arrow-callback|suggest using arrow functions as callbacks|
|:x:|[prefer-const](http://eslint.org/docs/rules/prefer-const)|prefer-const|suggest using `const` declaration for variables that are never modified after declared|
|:x:|[prefer-reflect](http://eslint.org/docs/rules/prefer-reflect)|prefer-reflect|suggest using Reflect methods where applicable|
|:x:|[prefer-rest-params](http://eslint.org/docs/rules/prefer-rest-params)|prefer-rest-params|suggest using the rest parameters instead of `arguments`|
|:x:|[prefer-spread](http://eslint.org/docs/rules/prefer-spread)|prefer-spread|suggest using the spread operator instead of `.apply()`.|
|:x:|[prefer-template](http://eslint.org/docs/rules/prefer-template)|prefer-template|suggest using template literals instead of strings concatenation|
|:x:|[require-yield](http://eslint.org/docs/rules/require-yield)|require-yield|disallow generator functions that do not have `yield`|
|:x:|[template-curly-spacing](http://eslint.org/docs/rules/template-curly-spacing)|template-curly-spacing|enforce spacing around embedded expressions of template strings|
|:x:|[yield-star-spacing](http://eslint.org/docs/rules/yield-star-spacing)|yield-star-spacing|enforce spacing around the `*` in `yield*` expressions|
<!-- End:AutoTable -->

## Contributing

Bugs, rules requests, doubts etc., open a Github Issue. If you want to create a new rule or
fix/improve some existing rule you can fork this repository and follow the instructions below.

- Open an issue asking for the rule or bug.
- Create a branch with the rule name, e.g: no-if-usage
- Run `npm install`
- Create your rule tests at `./src/test/rules` and your rule in `./src/rules` with the convention:
  - Name: rule-name (hyphenated, e.g: no-if-usage)
  - Rule File: ruleNameRule.ts (camelCased and with the `Rule` suffix, e.g: noIfUsageRule.ts)
  - Test File: ruleNameRuleTests.ts (camelCased and with the `RuleTests` suffix, e.g: noIfUsageRuleTests.ts)
- Check if your rule is passing with `gulp test --single rule-name` (hyphenated, e.g no-inner-declarations)
  - During development you may have some linting errors that won't let you run the test. You can
    disable the linting process with the `--no-lint` flag. That is run `gulp test --single rule-name --no-lint`
- Make sure that all the tests are passing with `gulp test`.
- Update the file `src/readme/rules.ts` with the rule information.
- To update the README file with the information you just updated run `gulp readme`. This will
  also update/create the rule documentation in `docs/rules`. You may add more details about the
  rule in this file.
- Commit the changes to your repo with the following convention:
  - Example: `[feat] added use-isnan rule (closes #20)`
- Finally, open a Pull Request.

You can also contribute with PRs for fixing bugs, or improving documentation, performance. The
commit convention for these are, respectively:

- Example: `[bug] fixed no-constant-condition rule (closes #9)`
- Example: `[docs] improved README.md file (closes #32)`
- Example: `[perf] improved valid-typeof rule (closes #48)`


## LICENSE

MIT
