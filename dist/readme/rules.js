"use strict";
var categories = {
    'Strict Mode': 'These rules relate to using strict mode.',
    'Stylistic Issues': 'These rules are purely matters of style and are quite subjective.',
    'Possible Errors': 'The following rules point out areas where you might have made mistakes.',
    'Node.js and CommonJS': 'These rules are specific to JavaScript running on Node.js or using CommonJS in the browser.',
    'ECMAScript 6': 'These rules are only relevant to ES6 environments.',
    'Variables': 'These rules have to do with variable declarations.',
    'Best Practices': "These are rules designed to prevent you from making mistakes. They either\n    prescribe a better way of doing something or help you avoid footguns."
};
exports.categories = categories;
var rules = [
    {
        available: true,
        eslintRule: 'comma-dangle',
        tslintRule: 'trailing-comma',
        category: 'Possible Errors',
        description: 'disallow or enforce trailing commas (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/comma-dangle',
        tslintUrl: 'http://palantir.github.io/tslint/rules/trailing-comma',
        provider: 'native',
        usage: "~~~json\n    \"trailing-comma\": [\n      true,\n      {\n        \"multiline\": \"never\",\n        \"singleline\": \"never\"\n      }\n    ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-cond-assign',
        tslintRule: 'no-conditional-assignment',
        category: 'Possible Errors',
        description: 'disallow assignment in conditional expressions (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-cond-assign',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-conditional-assignment',
        provider: 'native',
        usage: "~~~json\n    \"no-conditional-assignment\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-console',
        tslintRule: 'no-console',
        category: 'Possible Errors',
        description: 'disallow use of `console` in the node environment (recommended)',
        eslintUrl: 'http:/eslint.org/docs/rules/no-console',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-console',
        provider: 'native',
        usage: "~~~json\n    \"no-console\": [\n      true,\n      \"debug\",\n      \"info\",\n      \"time\",\n      \"timeEnd\",\n      \"trace\"\n    ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-constant-condition',
        tslintRule: 'no-constant-condition',
        category: 'Possible Errors',
        description: 'disallow use of constant expressions in conditions (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-constant-condition',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-constant-condition\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-control-regex',
        tslintRule: 'no-control-regex',
        category: 'Possible Errors',
        description: 'disallow control characters in regular expressions (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-control-regex',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-control-regex\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-debugger',
        tslintRule: 'no-debugger',
        category: 'Possible Errors',
        description: 'disallow use of `debugger` (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-debugger',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-debugger',
        provider: 'native',
        usage: "~~~json\n    \"no-debugger\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-dupe-args',
        tslintRule: 'Not applicable',
        category: 'Possible Errors',
        description: 'disallow duplicate arguments in functions (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-dupe-args',
        provider: 'Not applicable'
    },
    {
        available: false,
        eslintRule: 'no-dupe-keys',
        tslintRule: 'Not applicable',
        category: 'Possible Errors',
        description: 'disallow duplicate keys when creating object literals (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-dupe-keys',
        provider: 'Not applicable'
    },
    {
        available: true,
        eslintRule: 'no-duplicate-case',
        tslintRule: 'no-duplicate-case',
        category: 'Possible Errors',
        description: 'disallow a duplicate case label. (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-duplicate-case',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-duplicate-case\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-empty',
        tslintRule: 'no-empty',
        category: 'Possible Errors',
        description: 'disallow empty statements (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-empty',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-empty',
        provider: 'native',
        usage: "~~~json\n    \"no-empty\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-empty-character-class',
        tslintRule: 'no-empty-character-class',
        category: 'Possible Errors',
        description: 'disallow the use of empty character classes in regular expressions (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-empty-character-class',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-empty-character-class\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-ex-assign',
        tslintRule: 'no-ex-assign',
        category: 'Possible Errors',
        description: 'disallow assigning to the exception in a `catch` block (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-ex-assign',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-ex-assign\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-extra-boolean-cast',
        tslintRule: 'no-extra-boolean-cast',
        category: 'Possible Errors',
        description: 'disallow double-negation boolean casts in a boolean context (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-extra-boolean-cast',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-extra-boolean-cast\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-extra-parens',
        tslintRule: 'no-extra-parens',
        category: 'Possible Errors',
        description: 'disallow unnecessary parentheses',
        eslintUrl: 'http://eslint.org/docs/rules/no-extra-parens',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-extra-parens\": [\n      true,\n      \"functions\"\n    ]\n    ~~~\n    \n    ~~~json\n    \"no-extra-parens\": [\n      true,\n      \"all\"\n    ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-extra-semi',
        tslintRule: 'no-extra-semi',
        category: 'Possible Errors',
        description: 'disallow unnecessary semicolons (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-extra-semi',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-extra-semi\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-func-assign',
        tslintRule: 'Not applicable',
        category: 'Possible Errors',
        description: 'disallow overwriting functions written as function declarations (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-func-assign',
        tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
        provider: 'Not applicable',
        usage: ""
    },
    {
        available: true,
        eslintRule: 'no-inner-declarations',
        tslintRule: 'no-inner-declarations',
        category: 'Possible Errors',
        description: 'disallow function or variable declarations in nested blocks (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-inner-declarations',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-inner-declarations\": [\n      true,\n      \"functions\"\n    ]\n    ~~~\n\n    ~~~json\n    \"no-inner-declarations\": [\n      true,\n      \"both\"\n    ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-invalid-regexp',
        tslintRule: 'no-invalid-regexp',
        category: 'Possible Errors',
        description: 'disallow invalid regular expression strings in the `RegExp` constructor (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-invalid-regexp',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-invalid-regexp\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-irregular-whitespace',
        tslintRule: 'no-irregular-whitespace',
        category: 'Possible Errors',
        description: 'disallow irregular whitespace outside of strings and comments (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-irregular-whitespace',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-irregular-whitespace\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-negated-in-lhs',
        tslintRule: 'Not applicable',
        category: 'Possible Errors',
        description: 'disallow negation of the left operand of an `in` expression (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-negated-in-lhs',
        tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
        provider: 'Not applicable',
        usage: ""
    },
    {
        available: false,
        eslintRule: 'no-obj-calls',
        tslintRule: 'Not applicable',
        category: 'Possible Errors',
        description: 'disallow the use of object properties of the global object (`Math` and `JSON`) as functions (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-obj-calls',
        tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
        provider: 'Not applicable',
        usage: ""
    },
    {
        available: true,
        eslintRule: 'no-regex-spaces',
        tslintRule: 'no-regex-spaces',
        category: 'Possible Errors',
        description: 'disallow multiple spaces in a regular expression literal (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-regex-spaces',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-regex-spaces\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-sparse-arrays',
        tslintRule: 'no-sparse-arrays',
        category: 'Possible Errors',
        description: 'disallow sparse arrays (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-sparse-arrays',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-sparse-arrays\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-unexpected-multiline',
        tslintRule: 'no-unexpected-multiline',
        category: 'Possible Errors',
        description: 'Avoid code that looks like two expressions but is actually one',
        eslintUrl: 'http://eslint.org/docs/rules/no-unexpected-multiline',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-unexpected-multiline\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-unreachable',
        tslintRule: 'Not applicable',
        category: 'Possible Errors',
        description: 'disallow unreachable statements after a return, throw, continue, or break statement (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-unreachable',
        provider: 'Not applicable'
    },
    {
        available: true,
        eslintRule: 'no-unsafe-finally',
        tslintRule: 'no-unsafe-finally',
        category: 'Possible Errors',
        description: 'disallow control flow statements in finally blocks (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-unsafe-finally',
        tslintUrl: 'https://palantir.github.io/tslint/rules/no-unsafe-finally',
        provider: 'native'
    },
    {
        available: true,
        eslintRule: 'use-isnan',
        tslintRule: 'use-isnan',
        category: 'Possible Errors',
        description: 'disallow comparisons with the value `NaN` (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/use-isnan',
        tslintUrl: 'https://palantir.github.io/tslint/rules/use-isnan',
        provider: 'native'
    },
    {
        available: true,
        eslintRule: 'valid-jsdoc',
        tslintRule: 'valid-jsdoc',
        category: 'Possible Errors',
        description: 'Ensure JSDoc comments are valid',
        eslintUrl: 'http://eslint.org/docs/rules/valid-jsdoc',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"valid-jsdoc\": [\n      true,\n      {\n        \"prefer\": {\n          \"return\": \"returns\"\n        },\n        \"requireReturn\": false,\n        \"requireParamDescription\": true,\n        \"requireReturnDescription\": true,\n        \"matchDescription\": \"^[A-Z][A-Za-z0-9\\\\s]*[.]$\"\n      }\n    ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'valid-typeof',
        tslintRule: 'valid-typeof',
        category: 'Possible Errors',
        description: 'Ensure that the results of typeof are compared against a valid string (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/valid-typeof',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"valid-typeof\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'accessor-pairs',
        tslintRule: 'accessor-pairs',
        category: 'Best Practices',
        description: 'Enforces getter/setter pairs in objects',
        eslintUrl: 'http://eslint.org/docs/rules/accessor-pairs',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"accessor-pairs\": [\n      true,\n      {\n        \"getWithoutSet\" : true,\n        \"setWithoutGet\" : true\n      }\n    ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'array-callback-return',
        tslintRule: 'array-callback-return',
        category: 'Best Practices',
        description: 'Enforce return statements in callbacks of array’s methods',
        eslintUrl: 'http://eslint.org/docs/rules/array-callback-return',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"array-callback-return\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'block-scoped-var',
        tslintRule: 'accessor-pairs',
        category: 'Best Practices',
        description: 'treat `var` statements as if they were block scoped',
        eslintUrl: 'http://eslint.org/docs/rules/block-scoped-var',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"block-scoped-var\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'complexity',
        tslintRule: 'cyclomatic-complexity',
        category: 'Best Practices',
        description: 'specify the maximum cyclomatic complexity allowed in a program',
        eslintUrl: 'http://eslint.org/docs/rules/complexity',
        tslintUrl: 'https://palantir.github.io/tslint/rules/cyclomatic-complexity',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'consistent-return',
        tslintRule: 'consistent-return',
        category: 'Best Practices',
        description: 'require `return` statements to either always or never specify values',
        eslintUrl: 'http://eslint.org/docs/rules/consistent-return',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"consistent-return\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'curly',
        tslintRule: 'curly',
        category: 'Best Practices',
        description: 'specify curly brace conventions for all control statements',
        eslintUrl: 'http://eslint.org/docs/rules/curly',
        tslintUrl: 'http://palantir.github.io/tslint/rules/curly',
        provider: 'native',
        usage: "~~~json\n    \"curly\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'default-case',
        tslintRule: 'switch-default',
        category: 'Best Practices',
        description: 'require `default` case in `switch` statements',
        eslintUrl: 'http://eslint.org/docs/rules/default-case',
        tslintUrl: 'http://palantir.github.io/tslint/rules/switch-default',
        provider: 'native',
        usage: "~~~json\n    \"default-case\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'dot-location',
        tslintRule: 'dot-location',
        category: 'Best Practices',
        description: 'enforces consistent newlines before or after dots',
        eslintUrl: 'http://eslint.org/docs/rules/dot-location',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"dot-location\": [\n        true,\n        \"object\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"dot-location\": [\n        true,\n        \"property\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'dot-notation',
        tslintRule: 'dot-notation',
        category: 'Best Practices',
        description: 'encourages use of dot notation whenever possible',
        eslintUrl: 'http://eslint.org/docs/rules/dot-notation',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"dot-notation\": [\n        true,\n        {\n          \"allowKeywords\": true,\n          \"allowPattern\": \"\"\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'eqeqeq',
        tslintRule: 'triple-equals',
        category: 'Best Practices',
        description: 'require the use of `===` and `!==`',
        eslintUrl: 'http://eslint.org/docs/rules/eqeqeq',
        tslintUrl: 'http://palantir.github.io/tslint/rules/triple-equals',
        provider: 'native',
        usage: "~~~json\n    \"eqeqeq\": [\n        true,\n        \"allow-null-check\"\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'guard-for-in',
        tslintRule: 'forin',
        category: 'Best Practices',
        description: 'make sure `for-in` loops have an `if` statement',
        eslintUrl: 'http://eslint.org/docs/rules/guard-for-in',
        tslintUrl: 'http://palantir.github.io/tslint/rules/forin',
        provider: 'native',
        usage: "~~~json\n    \"forin\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-alert',
        tslintRule: 'ban',
        category: 'Best Practices',
        description: 'disallow the use of `alert`, `confirm`, and `prompt`<br>can be achieved using the `"ban": [true, ["alert"]]` tslint rule',
        eslintUrl: 'http://eslint.org/docs/rules/no-alert',
        tslintUrl: 'https://palantir.github.io/tslint/rules/ban',
        provider: 'native'
    },
    {
        available: true,
        eslintRule: 'no-caller',
        tslintRule: 'no-arg',
        category: 'Best Practices',
        description: 'disallow use of `arguments.caller` or `arguments.callee`',
        eslintUrl: 'http://eslint.org/docs/rules/no-caller',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-arg',
        provider: 'native',
        usage: "~~~json\n    \"no-arg\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-case-declarations',
        tslintRule: 'no-case-declarations',
        category: 'Best Practices',
        description: 'disallow lexical declarations in case clauses',
        eslintUrl: 'http://eslint.org/docs/rules/no-case-declarations',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-case-declarations\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-div-regex',
        tslintRule: 'no-div-regex',
        category: 'Best Practices',
        description: 'disallow division operators explicitly at beginning of regular expression',
        eslintUrl: 'http://eslint.org/docs/rules/no-div-regex',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-div-regex\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-else-return',
        tslintRule: 'no-else-return',
        category: 'Best Practices',
        description: 'disallow `else` after a `return` in an `if`',
        eslintUrl: 'http://eslint.org/docs/rules/no-else-return',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-else-return\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-empty-function',
        tslintRule: 'no-empty',
        category: 'Best Practices',
        description: 'disallow use of empty functions',
        eslintUrl: 'http://eslint.org/docs/rules/no-empty-function',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-empty',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'no-empty-pattern',
        tslintRule: 'no-empty-pattern',
        category: 'Best Practices',
        description: 'disallow use of empty destructuring patterns',
        eslintUrl: 'http://eslint.org/docs/rules/no-empty-pattern',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-empty-pattern\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-eq-null',
        tslintRule: 'no-eq-null',
        category: 'Best Practices',
        description: 'disallow comparisons to null without a type-checking operator',
        eslintUrl: 'http://eslint.org/docs/rules/no-eq-null',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-eq-null\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-eval',
        tslintRule: 'no-eval',
        category: 'Best Practices',
        description: 'disallow use of `eval()`',
        eslintUrl: 'http://eslint.org/docs/rules/no-eval',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-eval',
        provider: 'native',
        usage: "~~~json\n    \"no-eval\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-extend-native',
        tslintRule: 'no-extend-native',
        category: 'Best Practices',
        description: 'disallow adding to native types',
        eslintUrl: 'http://eslint.org/docs/rules/no-extend-native',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-extend-native\": [\n        true,\n        {\n          \"exceptions\": [\"Object\", \"String\"]\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-extra-bind',
        tslintRule: 'no-extra-bind',
        category: 'Best Practices',
        description: 'disallow unnecessary function binding',
        eslintUrl: 'http://eslint.org/docs/rules/no-extra-bind',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-extra-bind\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-extra-label',
        tslintRule: 'no-extra-label',
        category: 'Best Practices',
        description: 'disallow unnecessary labels',
        eslintUrl: 'http://eslint.org/docs/rules/no-extra-label',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-extra-label\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-fallthrough',
        tslintRule: 'no-switch-case-fall-through',
        category: 'Best Practices',
        description: 'disallow fallthrough of `case` statements (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-fallthrough',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-switch-case-fall-through',
        provider: 'native',
        usage: "~~~json\n    \"no-fallthrough\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-floating-decimal',
        tslintRule: 'no-floating-decimal',
        category: 'Best Practices',
        description: 'disallow the use of leading or trailing decimal points in numeric literals',
        eslintUrl: 'http://eslint.org/docs/rules/no-floating-decimal',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-floating-decimal\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-implicit-coercion',
        tslintRule: 'no-implicit-coercion',
        category: 'Best Practices',
        description: 'disallow the type conversions with shorter notations',
        eslintUrl: 'http://eslint.org/docs/rules/no-implicit-coercion',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-implicit-coercion\": [\n        true,\n        {\n          \"boolean\": true,\n          \"number\": true,\n          \"string\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-implicit-globals',
        tslintRule: 'no-implicit-globals',
        category: 'Best Practices',
        description: 'disallow var and named functions in global scope',
        eslintUrl: 'http://eslint.org/docs/rules/no-implicit-globals',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-implicit-coercion\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-implied-eval',
        tslintRule: 'no-implied-eval',
        category: 'Best Practices',
        description: 'disallow use of `eval()`-like methods',
        eslintUrl: 'http://eslint.org/docs/rules/no-implied-eval',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-implied-eval\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-invalid-this',
        tslintRule: 'no-invalid-this',
        category: 'Best Practices',
        description: 'disallow `this` keywords outside of classes or class-like objects',
        eslintUrl: 'http://eslint.org/docs/rules/no-invalid-this',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-invalid-this\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-iterator',
        tslintRule: 'no-iterator',
        category: 'Best Practices',
        description: 'disallow Usage of `__iterator__` property',
        eslintUrl: 'http://eslint.org/docs/rules/no-iterator',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-iterator\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-labels',
        tslintRule: 'label-position',
        category: 'Best Practices',
        description: 'disallow use of labeled statements',
        eslintUrl: 'http://eslint.org/docs/rules/no-labels',
        tslintUrl: 'https://palantir.github.io/tslint/rules/label-position',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'no-lone-blocks',
        tslintRule: 'no-lone-blocks',
        category: 'Best Practices',
        description: 'disallow unnecessary nested blocks',
        eslintUrl: 'http://eslint.org/docs/rules/no-lone-blocks',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-lone-blocks\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-loop-func',
        tslintRule: 'no-loop-func',
        category: 'Best Practices',
        description: 'disallow creation of functions within loops',
        eslintUrl: 'http://eslint.org/docs/rules/no-loop-func',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-loop-func\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-magic-numbers',
        tslintRule: 'no-magic-numbers',
        category: 'Best Practices',
        description: 'disallow the use of magic numbers',
        eslintUrl: 'http://eslint.org/docs/rules/no-magic-numbers',
        tslintUrl: 'https://palantir.github.io/tslint/rules/no-magic-numbers',
        provider: 'native'
    },
    {
        available: true,
        eslintRule: 'no-multi-spaces',
        tslintRule: 'no-multi-spaces',
        category: 'Best Practices',
        description: 'disallow use of multiple spaces',
        eslintUrl: 'http://eslint.org/docs/rules/no-multi-spaces',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-multi-spaces\": [\n        true,\n        {\n          \"exceptions\": { \"PropertyAssignment\": false, \"OtherException\": \"true|false\" }\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-multi-str',
        tslintRule: 'no-multi-str',
        category: 'Best Practices',
        description: 'disallow use of multiline strings',
        eslintUrl: 'http://eslint.org/docs/rules/no-multi-str',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-multi-str\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-native-reassign',
        tslintRule: 'Not applicable',
        category: 'Best Practices',
        description: 'disallow reassignments of native objects',
        eslintUrl: 'http://eslint.org/docs/rules/no-native-reassign',
        tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
        provider: 'Not applicable',
        usage: ""
    },
    {
        available: true,
        eslintRule: 'no-new',
        tslintRule: 'no-unused-new',
        category: 'Best Practices',
        description: 'disallow use of the `new` operator when not part of an assignment or comparison',
        eslintUrl: 'http://eslint.org/docs/rules/no-new',
        tslintUrl: 'https://palantir.github.io/tslint/rules/no-unused-new',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'no-new-func',
        tslintRule: 'no-new-func',
        category: 'Best Practices',
        description: 'disallow use of new operator for `Function` object',
        eslintUrl: 'http://eslint.org/docs/rules/no-new-func',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-new-func\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-new-wrappers',
        tslintRule: 'no-construct',
        category: 'Best Practices',
        description: 'disallows creating new instances of `String`,`Number`, and `Boolean`',
        eslintUrl: 'http://eslint.org/docs/rules/no-new-wrappers',
        tslintUrl: 'https://palantir.github.io/tslint/rules/no-construct',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'no-octal',
        tslintRule: 'Not applicable',
        category: 'Best Practices',
        description: 'disallow use of octal literals (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-octal',
        provider: 'Not applicable'
    },
    {
        available: false,
        eslintRule: 'no-octal-escape',
        tslintRule: 'no-octal-escape',
        category: 'Best Practices',
        description: 'disallow use of octal escape sequences in string literals, such as `var foo = "Copyright \\251";`',
        eslintUrl: 'http://eslint.org/docs/rules/no-octal-escape',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-octal-escape\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-param-reassign',
        tslintRule: 'no-param-reassign',
        category: 'Best Practices',
        description: 'disallow reassignment of function parameters',
        eslintUrl: 'http://eslint.org/docs/rules/no-param-reassign',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-param-reassign\": [\n        true,\n        {\n          \"props\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-proto',
        tslintRule: 'no-proto',
        category: 'Best Practices',
        description: 'disallow Usage of `__proto__` property',
        eslintUrl: 'http://eslint.org/docs/rules/no-proto',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-proto\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-redeclare',
        tslintRule: 'no-duplicate-variable',
        category: 'Best Practices',
        description: 'disallow declaring the same variable more than once (http://eslint.org/docs/rules/recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-redeclare',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-duplicate-variable',
        provider: 'native',
        usage: "~~~json\n    \"no-duplicate-variable\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-return-assign',
        tslintRule: 'no-return-assign',
        category: 'Best Practices',
        description: 'disallow use of assignment in `return` statement',
        eslintUrl: 'http://eslint.org/docs/rules/no-return-assign',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-return-assign\": [\n        true,\n        \"except-parens\"\n      ]\n    ~~~\n    \n    ~~~json\n     \"no-return-assign\": [\n        true,\n        \"always\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-script-url',
        tslintRule: 'no-script-url',
        category: 'Best Practices',
        description: 'disallow use of `javascript:` urls.',
        eslintUrl: 'http://eslint.org/docs/rules/no-script-url',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-script-url\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-self-assign',
        tslintRule: 'no-self-assign',
        category: 'Best Practices',
        description: 'disallow assignments where both sides are exactly the same',
        eslintUrl: 'http://eslint.org/docs/rules/no-self-assign',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-self-assign\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-self-compare',
        tslintRule: 'no-self-compare',
        category: 'Best Practices',
        description: 'disallow comparisons where both sides are exactly the same',
        eslintUrl: 'http://eslint.org/docs/rules/no-self-compare',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-self-compare\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-sequences',
        tslintRule: 'no-sequences',
        category: 'Best Practices',
        description: 'disallow use of the comma operator',
        eslintUrl: 'http://eslint.org/docs/rules/no-sequences',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-sequences\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-throw-literal',
        tslintRule: 'no-string-throw',
        category: 'Best Practices',
        description: 'restrict what can be thrown as an exception',
        eslintUrl: 'http://eslint.org/docs/rules/no-throw-literal',
        tslintUrl: 'https://palantir.github.io/tslint/rules/no-string-throw',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'no-unmodified-loop-condition',
        tslintRule: 'no-unmodified-loop-condition',
        category: 'Best Practices',
        description: 'disallow unmodified conditions of loops',
        eslintUrl: 'http://eslint.org/docs/rules/no-unmodified-loop-condition',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-unmodified-loop-condition\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-unused-expressions',
        tslintRule: 'no-unused-expression',
        category: 'Best Practices',
        description: 'disallow Usage of expressions in statement position',
        eslintUrl: 'http://eslint.org/docs/rules/no-unused-expressions',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-unused-expression',
        provider: 'native',
        usage: "~~~json\n    \"no-unused-expressions\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-unused-labels',
        tslintRule: 'no-unused-labels',
        category: 'Best Practices',
        description: 'disallow unused labels',
        eslintUrl: 'http://eslint.org/docs/rules/no-unused-labels',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-unused-labels\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-useless-call',
        tslintRule: 'no-useless-call',
        category: 'Best Practices',
        description: 'disallow unnecessary `.call()` and `.apply()`',
        eslintUrl: 'http://eslint.org/docs/rules/no-useless-call',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-useless-call\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-useless-concat',
        tslintRule: 'no-useless-concat',
        category: 'Best Practices',
        description: 'disallow unnecessary concatenation of literals or template literals',
        eslintUrl: 'http://eslint.org/docs/rules/no-useless-concat',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-useless-concat\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-useless-escape',
        tslintRule: 'no-useless-escape',
        category: 'Best Practices',
        description: 'disallow unnecessary usage of escape character',
        eslintUrl: 'http://eslint.org/docs/rules/no-useless-escape',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-useless-escape\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-void',
        tslintRule: 'no-void',
        category: 'Best Practices',
        description: 'disallow use of the `void` operator',
        eslintUrl: 'http://eslint.org/docs/rules/no-void',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-void\":true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-warning-comments',
        tslintRule: 'no-warning-comments',
        category: 'Best Practices',
        description: 'disallow Usage of configurable warning terms in comments e.g. `TODO` or `FIXME`',
        eslintUrl: 'http://eslint.org/docs/rules/no-warning-comments',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-warning-comments\": [\n        true,\n        {\n          \"terms\": [\"todo\", \"fixme\", \"xxx\"],\n          \"location\": \"start\"\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-with',
        tslintRule: 'no-with',
        category: 'Best Practices',
        description: 'disallow use of the `with` statement',
        eslintUrl: 'http://eslint.org/docs/rules/no-with',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-with\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'radix',
        tslintRule: 'radix',
        category: 'Best Practices',
        description: 'require use of the second argument for `parseInt()`',
        eslintUrl: 'http://eslint.org/docs/rules/radix',
        tslintUrl: 'http://palantir.github.io/tslint/rules/radix',
        provider: 'native',
        usage: "~~~json\n    \"radix\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'vars-on-top',
        tslintRule: 'vars-on-top',
        category: 'Best Practices',
        description: 'require declaration of all vars at the top of their containing scope',
        eslintUrl: 'http://eslint.org/docs/rules/vars-on-top',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"vars-on-top\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'wrap-iife',
        tslintRule: 'wrap-iife',
        category: 'Best Practices',
        description: 'require immediate function invocation to be wrapped in parentheses',
        eslintUrl: 'http://eslint.org/docs/rules/wrap-iife',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"wrap-iife\": [\n        true,\n        \"inside\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"wrap-iife\": [\n        true,\n        \"outside\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"wrap-iife\": [\n        true,\n        \"any\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'yoda',
        tslintRule: 'yoda',
        category: 'Best Practices',
        description: 'require or disallow Yoda conditions',
        eslintUrl: 'http://eslint.org/docs/rules/yoda',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"yoda\": [\n        true,\n        \"never\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"yoda\": [\n        true,\n        \"always\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'strict',
        tslintRule: 'Not applicable',
        category: 'Strict Mode',
        description: 'require effective use of strict mode directives',
        eslintUrl: 'http://eslint.org/docs/rules/strict',
        provider: 'Not applicable'
    },
    {
        available: false,
        eslintRule: 'init-declarations',
        tslintRule: 'init-declarations',
        category: 'Variables',
        description: 'enforce or disallow variable initializations at definition',
        eslintUrl: 'http://eslint.org/docs/rules/init-declarations',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"init-declarations\": [\n        true,\n        \"always\"\n        {\n          \"ignoreForLoopInit\": false\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"init-declarations\": [\n        true,\n        \"never\"\n        {\n          \"ignoreForLoopInit\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-catch-shadow',
        tslintRule: 'no-catch-shadow',
        category: 'Variables',
        description: 'disallow the catch clause parameter name being the same as a variable in the outer scope',
        eslintUrl: 'http://eslint.org/docs/rules/no-catch-shadow',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-catch-shadow\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-delete-var',
        tslintRule: 'Not applicable',
        category: 'Variables',
        description: 'disallow deletion of variables (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-delete-var',
        provider: 'Not applicable'
    },
    {
        available: false,
        eslintRule: 'no-label-var',
        tslintRule: 'no-label-var',
        category: 'Variables',
        description: 'disallow labels that share a name with a variable',
        eslintUrl: 'http://eslint.org/docs/rules/no-label-var',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-label-var\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-shadow',
        tslintRule: 'no-shadowed-variable',
        category: 'Variables',
        description: 'disallow declaration of variables already declared in the outer scope',
        eslintUrl: 'http://eslint.org/docs/rules/no-shadow',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-shadowed-variable',
        provider: 'native',
        usage: "~~~json\n    \"no-shadowed-variable\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-shadow-restricted-names',
        tslintRule: 'no-shadow-restricted-names',
        category: 'Variables',
        description: 'disallow shadowing of names such as `arguments`',
        eslintUrl: 'http://eslint.org/docs/rules/no-shadow-restricted-names',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-shadow-restricted-names\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-undef',
        tslintRule: 'Not applicable',
        category: 'Variables',
        description: 'disallow use of undeclared variables unless mentioned in a `/*global */` block (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-undef',
        provider: 'Not applicable'
    },
    {
        available: false,
        eslintRule: 'no-undef-init',
        tslintRule: 'no-undef-init',
        category: 'Variables',
        description: 'disallow use of undefined when initializing variables',
        eslintUrl: 'http://eslint.org/docs/rules/no-undef-init',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-undef-init\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-undefined',
        tslintRule: 'no-undefined',
        category: 'Variables',
        description: 'disallow use of `undefined` variable',
        eslintUrl: 'http://eslint.org/docs/rules/no-undefined',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-undefined\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-unused-vars',
        tslintRule: 'Not applicable',
        category: 'Variables',
        description: '[**DEPRECATED**: [no-unused-variable](https://github.com/palantir/tslint/issues/1481)] disallow declaration of variables that are not used in the code (recommended).',
        eslintUrl: 'http://eslint.org/docs/rules/no-unused-vars',
        provider: 'Not applicable'
    },
    {
        available: true,
        eslintRule: 'no-use-before-define',
        tslintRule: 'no-use-before-declare',
        category: 'Variables',
        description: 'disallow use of variables before they are defined',
        eslintUrl: 'http://eslint.org/docs/rules/no-use-before-define',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-use-before-declare',
        provider: 'native',
        usage: "~~~json\n    \"no-use-before-declare\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'callback-return',
        tslintRule: 'callback-return',
        category: 'Node.js and CommonJS',
        description: 'enforce `return` after a callback',
        eslintUrl: 'http://eslint.org/docs/rules/callback-return',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"callback-return\": [\n        true,\n        [\n          \"callback\",\n          \"cb\",\n          \"next\"\n        ]\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'global-require',
        tslintRule: 'global-require',
        category: 'Node.js and CommonJS',
        description: 'enforce `require()` on top-level module scope',
        eslintUrl: 'http://eslint.org/docs/rules/global-require',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"global-require\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'handle-callback-err',
        tslintRule: 'handle-callback-err',
        category: 'Node.js and CommonJS',
        description: 'enforce error handling in callbacks',
        eslintUrl: 'http://eslint.org/docs/rules/handle-callback-err',
        provider: 'tslint-eslint-rules'
    },
    {
        available: false,
        eslintRule: 'no-mixed-requires',
        tslintRule: 'no-mixed-requires',
        category: 'Node.js and CommonJS',
        description: 'disallow mixing regular variable and require declarations',
        eslintUrl: 'http://eslint.org/docs/rules/no-mixed-requires',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-mixed-requires\": [\n        true,\n        {\n          \"grouping\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-new-require',
        tslintRule: 'no-new-require',
        category: 'Node.js and CommonJS',
        description: 'disallow use of `new` operator with the `require` function',
        eslintUrl: 'http://eslint.org/docs/rules/no-new-require',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-new-require\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-path-concat',
        tslintRule: 'no-path-concat',
        category: 'Node.js and CommonJS',
        description: 'disallow string concatenation with `__dirname` and `__filename`',
        eslintUrl: 'http://eslint.org/docs/rules/no-path-concat',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-path-concat\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-process-env',
        tslintRule: 'no-process-env',
        category: 'Node.js and CommonJS',
        description: 'disallow use of `process.env`',
        eslintUrl: 'http://eslint.org/docs/rules/no-process-env',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-process-env\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-process-exit',
        tslintRule: 'no-process-exit',
        category: 'Node.js and CommonJS',
        description: 'disallow `process.exit()`',
        eslintUrl: 'http://eslint.org/docs/rules/no-process-exit',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-process-exit\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-restricted-modules',
        tslintRule: 'no-restricted-modules',
        category: 'Node.js and CommonJS',
        description: 'restrict Usage of specified node modules',
        eslintUrl: 'http://eslint.org/docs/rules/no-restricted-modules',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-restricted-modules\": [\n        true,\n        [\n          \"fs\",\n          \"cluster\",\n          \"moduleName\"\n        ]\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-sync',
        tslintRule: 'no-sync',
        category: 'Node.js and CommonJS',
        description: 'disallow use of synchronous methods',
        eslintUrl: 'http://eslint.org/docs/rules/no-sync',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-sync\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'array-bracket-spacing',
        tslintRule: 'array-bracket-spacing',
        category: 'Stylistic Issues',
        description: 'enforce spacing inside array brackets',
        eslintUrl: 'http://eslint.org/docs/rules/array-bracket-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"array-bracket-spacing\": [\n        true,\n        \"always\",\n        {\n          \"singleValue\": false,\n          \"objectsInArrays\": false,\n          \"arraysInArrays\": false\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"array-bracket-spacing\": [\n        true,\n        \"never\",\n        {\n          \"singleValue\": true,\n          \"objectsInArrays\": true,\n          \"arraysInArrays\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'block-spacing',
        tslintRule: 'block-spacing',
        category: 'Stylistic Issues',
        description: 'disallow or enforce spaces inside of single line blocks',
        eslintUrl: 'http://eslint.org/docs/rules/block-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"block-spacing\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"block-spacing\": [\n        true,\n        \"never\"\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'brace-style',
        tslintRule: 'brace-style',
        category: 'Stylistic Issues',
        description: 'enforce one true brace style',
        eslintUrl: 'http://eslint.org/docs/rules/brace-style',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"brace-style\": [\n        true,\n        \"1tbs\",\n        {\n          \"allowSingleLine\": true\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"brace-style\": [\n        true,\n        \"stroustrup\",\n        {\n          \"allowSingleLine\": true\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"brace-style\": [\n        true,\n        \"allman\",\n        {\n          \"allowSingleLine\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'camelcase',
        tslintRule: 'variable-name',
        category: 'Stylistic Issues',
        description: 'require camel case names',
        eslintUrl: 'http://eslint.org/docs/rules/camelcase',
        tslintUrl: 'http://palantir.github.io/tslint/rules/variable-name',
        provider: 'native',
        usage: "~~~json\n    \"variable-name\": [\n        true,\n        \"check-format\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'comma-spacing',
        tslintRule: 'comma-spacing',
        category: 'Stylistic Issues',
        description: 'enforce spacing before and after comma',
        eslintUrl: 'http://eslint.org/docs/rules/comma-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"comma-spacing\": [\n        true,\n        {\n          \"before\": false,\n          \"after\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'comma-style',
        tslintRule: 'comma-style',
        category: 'Stylistic Issues',
        description: 'enforce one true comma style',
        eslintUrl: 'http://eslint.org/docs/rules/comma-style',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"comma-style\": [\n        true,\n        \"first\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"comma-style\": [\n        true,\n        \"last\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'computed-property-spacing',
        tslintRule: 'computed-property-spacing',
        category: 'Stylistic Issues',
        description: 'require or disallow padding inside computed properties',
        eslintUrl: 'http://eslint.org/docs/rules/computed-property-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"computed-property-spacing\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"computed-property-spacing\": [\n        true,\n        \"never\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'consistent-this',
        tslintRule: 'consistent-this',
        category: 'Stylistic Issues',
        description: 'enforce consistent naming when capturing the current execution context',
        eslintUrl: 'http://eslint.org/docs/rules/consistent-this',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"consistent-this\": [\n        true,\n        \"self\"\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'eol-last',
        tslintRule: 'eofline',
        category: 'Stylistic Issues',
        description: 'enforce newline at the end of file, with no multiple empty lines',
        eslintUrl: 'http://eslint.org/docs/rules/eol-last',
        tslintUrl: 'https://palantir.github.io/tslint/rules/eofline',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'func-names',
        tslintRule: 'func-names',
        category: 'Stylistic Issues',
        description: 'require function expressions to have a name',
        eslintUrl: 'http://eslint.org/docs/rules/func-names',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"func-names\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'func-style',
        tslintRule: 'func-style',
        category: 'Stylistic Issues',
        description: 'enforce use of function declarations or expressions',
        eslintUrl: 'http://eslint.org/docs/rules/func-style',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"func-style\": [\n        true,\n        \"declaration\"\n        {\n          \"allowArrowFunctions\": true\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"func-style\": [\n        true,\n        \"expression\"\n        {\n          \"allowArrowFunctions\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'id-blacklist',
        tslintRule: 'id-blacklist',
        category: 'Stylistic Issues',
        description: 'disallow certain identifiers to prevent them being used',
        eslintUrl: 'http://eslint.org/docs/rules/id-blacklist',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"id-blacklist\": [\n        true,\n        [\"error\", \"data\", \"err\", \"e\", \"cb\", \"callback\"]\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'id-length',
        tslintRule: 'id-length',
        category: 'Stylistic Issues',
        description: 'this option enforces minimum and maximum identifier lengths (variable names, property names etc.)',
        eslintUrl: 'http://eslint.org/docs/rules/id-length',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"id-length\": [\n        true,\n        {\n          \"min\": 2,\n          \"max\": 10,\n          \"properties\": \"always\",\n          \"exceptions\": [ \"x\", \"bolinha\" ]\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"id-length\": [\n        true,\n        {\n          \"min\": 2,\n          \"max\": 10,\n          \"properties\": \"never\",\n          \"exceptions\": [ \"x\", \"bolinha\" ]\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'id-match',
        tslintRule: 'id-match',
        category: 'Stylistic Issues',
        description: 'require identifiers to match the provided regular expression',
        eslintUrl: 'http://eslint.org/docs/rules/id-match',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"id-match\": [\n        true,\n        \"^[a-z]+([A-Z][a-z]+)*$\",\n        {\n          \"properties\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'indent',
        tslintRule: 'ter-indent',
        category: 'Stylistic Issues',
        description: 'enforce consistent indentation',
        eslintUrl: 'http://eslint.org/docs/rules/indent',
        provider: 'tslint-eslint-rules'
    },
    {
        available: false,
        eslintRule: 'jsx-quotes',
        tslintRule: 'jsx-quotes',
        category: 'Stylistic Issues',
        description: 'specify whether double or single quotes should be used in JSX attributes',
        eslintUrl: 'http://eslint.org/docs/rules/jsx-quotes',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"jsx-quotes\": [\n        true,\n        \"prefer-double\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"jsx-quotes\": [\n        true,\n        \"prefer-single\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'key-spacing',
        tslintRule: 'key-spacing',
        category: 'Stylistic Issues',
        description: 'enforce spacing between keys and values in object literal properties<br>Tslint\'s [whitespace](https://palantir.github.io/tslint/rules/whitespace/) can partially be used',
        eslintUrl: 'http://eslint.org/docs/rules/key-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"key-spacing\": [\n        true,\n        {\n          \"align\": \"value\",\n          \"beforeColon\": false,\n          \"afterColon\": true,\n          \"mode\": \"minimum\"\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'keyword-spacing',
        tslintRule: 'keyword-spacing',
        category: 'Stylistic Issues',
        description: 'enforce spacing before and after keywords<br>Tslint\'s [whitespace](https://palantir.github.io/tslint/rules/whitespace/) can partially be used',
        eslintUrl: 'http://eslint.org/docs/rules/keyword-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"keyword-spacing\": [\n        true,\n        {\n          \"before\": true,\n          \"after\": true,\n          \"overrides\": {\n            \"if\": { \"after\": false },\n            \"for\": { \"after\": false },\n            \"while\": { \"after\": false }\n          }\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'linebreak-style',
        tslintRule: 'linebreak-style',
        category: 'Stylistic Issues',
        description: "disallow mixed 'LF' and 'CRLF' as linebreaks",
        eslintUrl: 'http://eslint.org/docs/rules/linebreak-style',
        tslintUrl: 'https://palantir.github.io/tslint/rules/linebreak-style',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'lines-around-comment',
        tslintRule: 'lines-around-comment',
        category: 'Stylistic Issues',
        description: 'enforce empty lines around comments',
        eslintUrl: 'http://eslint.org/docs/rules/lines-around-comment',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"lines-around-comment\": [\n        true,\n        {\n          \"beforeBlockComment\": true,\n          \"afterBlockComment\": false,\n          \"beforeLineComment\": false,\n          \"afterLineComment\": false,\n          \"allowBlockStart\": false,\n          \"allowBlockEnd\": false,\n          \"allowObjectStart\": false,\n          \"allowObjectEnd\": false,\n          \"allowArrayStart\": false,\n          \"allowArrayEnd\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'max-depth',
        tslintRule: 'max-depth',
        category: 'Stylistic Issues',
        description: 'specify the maximum depth that blocks can be nested',
        eslintUrl: 'http://eslint.org/docs/rules/max-depth',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"max-depth\": [\n        true,\n        10\n      ]\n    ~~~\n    \n    ~~~json\n    \"max-depth\": [\n        true,\n        {\n          \"maximum\": 10\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'max-len',
        tslintRule: 'ter-max-len',
        category: 'Stylistic Issues',
        description: 'enforce a maximum line length',
        eslintUrl: 'http://eslint.org/docs/rules/max-len',
        provider: 'tslint-eslint-rules'
    },
    {
        available: true,
        eslintRule: 'max-lines',
        tslintRule: 'max-file-line-count',
        category: 'Stylistic Issues',
        description: 'enforce a maximum number of lines per file',
        eslintUrl: 'http://eslint.org/docs/rules/max-lines',
        tslintUrl: 'http://palantir.github.io/tslint/rules/max-file-line-count',
        provider: 'native',
        usage: ''
    },
    {
        available: false,
        eslintRule: 'max-nested-callbacks',
        tslintRule: 'max-nested-callbacks',
        category: 'Stylistic Issues',
        description: 'specify the maximum depth callbacks can be nested',
        eslintUrl: 'http://eslint.org/docs/rules/max-nested-callbacks',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"max-nested-callbacks\": [\n        true,\n        3\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'max-params',
        tslintRule: 'max-params',
        category: 'Stylistic Issues',
        description: 'specify the number of parameters that can be used in the function declaration',
        eslintUrl: 'http://eslint.org/docs/rules/max-params',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"max-params\": [\n        true,\n        2\n      ]\n    ~~~\n    \n    ~~~json\n    \"max-params\": [\n        true,\n        {\n          \"maximum\": 2\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'max-statements',
        tslintRule: 'max-statements',
        category: 'Stylistic Issues',
        description: 'specify the maximum number of statement allowed in a function',
        eslintUrl: 'http://eslint.org/docs/rulesmax-statements',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"max-statements\": [\n        true,\n        10,\n        {\n          \"ignoreTopLevelFunctions\": true\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"max-statements\": [\n        true,\n        {\n          \"maximum\": 10\n        },\n        {\n          \"ignoreTopLevelFunctions\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'max-statements-per-line',
        tslintRule: 'max-statements-per-line',
        category: 'Stylistic Issues',
        description: 'specify the maximum number of statements allowed per line',
        eslintUrl: 'http://eslint.org/docs/max-statements-per-line',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"max-statements-per-line\": [\n        true,\n        1\n      ]\n    ~~~\n    \n    ~~~json\n    \"max-statements-per-line\": [\n        true,\n        {\n          \"max\": 1\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'new-cap',
        tslintRule: 'Not applicable',
        category: 'Stylistic Issues',
        description: 'require a capital letter for constructors',
        eslintUrl: 'http://eslint.org/docs/rules/new-cap',
        tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
        provider: 'Not applicable',
        usage: ""
    },
    {
        available: true,
        eslintRule: 'new-parens',
        tslintRule: 'new-parens',
        category: 'Stylistic Issues',
        description: 'disallow the omission of parentheses when invoking a constructor with no arguments',
        eslintUrl: 'http://eslint.org/docs/rules/new-parens',
        tslintUrl: 'https://palantir.github.io/tslint/rules/new-parens',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'newline-after-var',
        tslintRule: 'newline-after-var',
        category: 'Stylistic Issues',
        description: 'require or disallow an empty newline after variable declarations',
        eslintUrl: 'http://eslint.org/docs/rules/newline-after-var',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"newline-after-var\": [\n        true,\n        \"never\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"newline-after-var\": [\n        true,\n        \"always\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'newline-before-return',
        tslintRule: 'newline-before-return',
        category: 'Stylistic Issues',
        description: 'require newline before return statement',
        eslintUrl: 'http://eslint.org/docs/rules/newline-before-return',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"newline-before-return\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'newline-per-chained-call',
        tslintRule: 'newline-per-chained-call',
        category: 'Stylistic Issues',
        description: 'enforce newline after each call when chaining the calls',
        eslintUrl: 'http://eslint.org/docs/rules/newline-per-chained-call',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"newline-per-chained-call\": [\n        true,\n        {\n          \"ignoreChainWithDepth\": 3\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-array-constructor',
        tslintRule: 'no-array-constructor',
        category: 'Stylistic Issues',
        description: 'disallow use of the `Array` constructor',
        eslintUrl: 'http://eslint.org/docs/rules/no-array-constructor',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-array-constructor\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-bitwise',
        tslintRule: 'no-bitwise',
        category: 'Stylistic Issues',
        description: 'disallows bitwise operators',
        eslintUrl: 'http://eslint.org/docs/rules/no-bitwise',
        tslintUrl: 'https://palantir.github.io/tslint/rules/no-bitwise',
        provider: 'native',
        usage: "~~~json\n    \"no-array-constructor\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-continue',
        tslintRule: 'no-continue',
        category: 'Stylistic Issues',
        description: 'disallow use of the `continue` statement',
        eslintUrl: 'http://eslint.org/docs/rules/no-continue',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-continue\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-inline-comments',
        tslintRule: 'no-inline-comments',
        category: 'Stylistic Issues',
        description: 'disallow comments inline after code',
        eslintUrl: 'http://eslint.org/docs/rules/no-inline-comments',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-inline-comments\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-lonely-if',
        tslintRule: 'no-lonely-if',
        category: 'Stylistic Issues',
        description: 'disallow `if` as the only statement in an `else` block',
        eslintUrl: 'http://eslint.org/docs/rules/no-lonely-if',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-lonely-if\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-mixed-spaces-and-tabs',
        tslintRule: 'indent',
        category: 'Stylistic Issues',
        description: 'disallow mixed spaces and tabs for indentation (recommended)',
        eslintUrl: 'http://eslint.org/docs/rules/no-mixed-spaces-and-tabs',
        tslintUrl: 'http://palantir.github.io/tslint/rules/indent',
        provider: 'native',
        usage: "~~~json\n    \"indent\": \"spaces\"\n    ~~~\n    \n    ~~~json\n    \"indent\": \"tabs\"\n    ~~~",
        note: "When using TSLint `indent` rule, it will enforce the consistent use of the chosen\n    indentation. The ESLint rule allows an option for Smart Tabs, but there are some open issues,\n    and we're not going to support this."
    },
    {
        available: true,
        eslintRule: 'no-multiple-empty-lines',
        tslintRule: 'no-consecutive-blank-lines',
        category: 'Stylistic Issues',
        description: 'disallow multiple empty lines',
        eslintUrl: 'http://eslint.org/docs/rules/no-multiple-empty-lines',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-consecutive-blank-lines',
        provider: 'native',
        usage: ''
    },
    {
        available: false,
        eslintRule: 'no-negated-condition',
        tslintRule: 'no-negated-condition',
        category: 'Stylistic Issues',
        description: 'disallow negated conditions',
        eslintUrl: 'http://eslint.org/docs/rules/no-negated-condition',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-negated-condition\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-nested-ternary',
        tslintRule: 'no-nested-ternary',
        category: 'Stylistic Issues',
        description: 'disallow nested ternary expressions',
        eslintUrl: 'http://eslint.org/docs/rules/no-nested-ternary',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-nested-ternary\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-new-object',
        tslintRule: 'no-new-object',
        category: 'Stylistic Issues',
        description: 'disallow the use of the `Object` constructor',
        eslintUrl: 'http://eslint.org/docs/rules/no-new-object',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-new-object\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-restricted-syntax',
        tslintRule: 'no-restricted-syntax',
        category: 'Stylistic Issues',
        description: 'disallow use of certain syntax in code',
        eslintUrl: 'http://eslint.org/docs/rules/no-restricted-syntax',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-restricted-syntax\": [\n        true,\n        \"FunctionExpression\",\n        \"WithStatement\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-spaced-func',
        tslintRule: 'no-spaced-func',
        category: 'Stylistic Issues',
        description: 'disallow space between function identifier and application',
        eslintUrl: 'http://eslint.org/docs/rules/no-spaced-func',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-spaced-func\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-ternary',
        tslintRule: 'no-ternary',
        category: 'Stylistic Issues',
        description: 'disallow the use of ternary operators',
        eslintUrl: 'http://eslint.org/docs/rules/no-ternary',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-ternary\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-trailing-spaces',
        tslintRule: 'no-trailing-whitespace',
        category: 'Stylistic Issues',
        description: 'disallow trailing whitespace at the end of lines',
        eslintUrl: 'http://eslint.org/docs/rules/no-trailing-spaces',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-trailing-whitespace',
        provider: 'native',
        usage: "~~~json\n    \"no-trailing-whitespace\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-underscore-dangle',
        tslintRule: 'no-underscore-dangle',
        category: 'Stylistic Issues',
        description: 'disallow dangling underscores in identifiers',
        eslintUrl: 'http://eslint.org/docs/rules/no-underscore-dangle',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-underscore-dangle\": [\n        true,\n        {\n          \"allow\": [\"foo_\", \"_bar\"]\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-unneeded-ternary',
        tslintRule: 'no-unneeded-ternary',
        category: 'Stylistic Issues',
        description: 'disallow the use of ternary operators when a simpler alternative exists',
        eslintUrl: 'http://eslint.org/docs/rules/no-unneeded-ternary',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-unneeded-ternary\": [\n        true,\n        {\n          \"defaultAssignment\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-whitespace-before-property',
        tslintRule: 'no-whitespace-before-property',
        category: 'Stylistic Issues',
        description: 'disallow whitespace before properties',
        eslintUrl: 'http://eslint.org/docs/rules/no-whitespace-before-property',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-whitespace-before-property\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'object-curly-spacing',
        tslintRule: 'object-curly-spacing',
        category: 'Stylistic Issues',
        description: 'require or disallow padding inside curly braces',
        eslintUrl: 'http://eslint.org/docs/rules/object-curly-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"object-curly-spacing\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"object-curly-spacing\": [\n        true,\n        \"never\"\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'one-var',
        tslintRule: 'one-variable-per-declaration',
        category: 'Stylistic Issues',
        description: 'require or disallow one variable declaration per function',
        eslintUrl: 'http://eslint.org/docs/rules/one-var',
        tslintUrl: 'http://palantir.github.io/tslint/rules/one-variable-per-declaration/',
        provider: 'native',
        usage: "~~~json\n    \"one-var\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"one-var\": [\n        true,\n        \"never\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'one-var-declaration-per-line',
        tslintRule: 'one-var-declaration-per-line',
        category: 'Stylistic Issues',
        description: 'require or disallow a newline around variable declarations',
        eslintUrl: 'http://eslint.org/docs/rules/one-var-declaration-per-line',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"one-var-declaration-per-line\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"one-var-declaration-per-line\": [\n        true,\n        \"initializations\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'operator-assignment',
        tslintRule: 'operator-assignment',
        category: 'Stylistic Issues',
        description: 'require assignment operator shorthand where possible or prohibit it entirely',
        eslintUrl: 'http://eslint.org/docs/rules/operator-assignment',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"operator-assignment\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"operator-assignment\": [\n        true,\n        \"never\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'operator-linebreak',
        tslintRule: 'operator-linebreak',
        category: 'Stylistic Issues',
        description: 'enforce operators to be placed before or after line breaks',
        eslintUrl: 'http://eslint.org/docs/rules/operator-linebreak',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"operator-linebreak\": [\n        true,\n        \"before\",\n        {\n          \"overrides\": { \"?\": \"after\"}\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"operator-linebreak\": [\n        true,\n        \"after\",\n        {\n          \"overrides\": { \"?\": \"after\"}\n        }\n      ]\n    ~~~\n    \n    ~~~json\n    \"operator-linebreak\": [\n        true,\n        \"none\",\n        {\n          \"overrides\": { \"?\": \"none\", \"+=\": \"none\"}\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'padded-blocks',
        tslintRule: 'padded-blocks',
        category: 'Stylistic Issues',
        description: 'enforce padding within blocks',
        eslintUrl: 'http://eslint.org/docs/rules/padded-blocks',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"padded-blocks\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"padded-blocks\": [\n        true,\n        \"never\"\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'quote-props',
        tslintRule: 'object-literal-key-quotes',
        category: 'Stylistic Issues',
        description: 'require quotes around object literal property names',
        eslintUrl: 'http://eslint.org/docs/rules/quote-props',
        tslintUrl: 'https://palantir.github.io/tslint/rules/object-literal-key-quotes',
        provider: 'native'
    },
    {
        available: true,
        eslintRule: 'quotes',
        tslintRule: 'quotemark',
        category: 'Stylistic Issues',
        description: 'specify whether backticks, double or single quotes should be used',
        eslintUrl: 'http://eslint.org/docs/rules/quotes',
        tslintUrl: 'http://palantir.github.io/tslint/rules/quotemark/',
        provider: 'native',
        usage: "~~~json\n    \"quotes\": [\n        true,\n        \"single\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"quotes\": [\n        true,\n        \"single\",\n        \"avoid-escape\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"quotes\": [\n        true,\n        \"double\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"quotes\": [\n        true,\n        \"double\",\n        \"avoid-escape\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"quotes\": [\n        true,\n        \"backtick\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"quotes\": [\n        true,\n        \"backtick\",\n        \"avoid-escape\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'require-jsdoc',
        tslintRule: 'require-jsdoc',
        category: 'Stylistic Issues',
        description: 'Require JSDoc comment',
        eslintUrl: 'http://eslint.org/docs/rules/require-jsdoc',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"require-jsdoc\": [\n        true,\n        {\n          \"require\":\n          {\n            \"FunctionDeclaration\": true,\n            \"MethodDefinition\": false,\n            \"ClassDeclaration\": false\n          }\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'semi',
        tslintRule: 'semicolon',
        category: 'Stylistic Issues',
        description: 'require or disallow use of semicolons instead of ASI',
        eslintUrl: 'http://eslint.org/docs/rules/semi',
        tslintUrl: 'http://palantir.github.io/tslint/rules/semicolon',
        provider: 'native',
        usage: ''
    },
    {
        available: false,
        eslintRule: 'semi-spacing',
        tslintRule: 'semi-spacing',
        category: 'Stylistic Issues',
        description: 'enforce spacing before and after semicolons',
        eslintUrl: 'http://eslint.org/docs/rules/semi-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"semi-spacing\": [\n        true,\n        {\n          \"before\": false,\n          \"after\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'sort-imports',
        tslintRule: 'ordered-imports',
        category: 'Stylistic Issues',
        description: 'enforce sorting import declarations within module',
        eslintUrl: 'http://eslint.org/docs/rules/sort-imports',
        tslintUrl: 'https://palantir.github.io/tslint/rules/ordered-imports',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'sort-vars',
        tslintRule: 'sort-vars',
        category: 'Stylistic Issues',
        description: 'sort variables within the same declaration block',
        eslintUrl: 'http://eslint.org/docs/rules/sort-vars',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"sort-vars\": [\n        true,\n        {\n          \"ignoreCase\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'space-before-blocks',
        tslintRule: 'space-before-blocks',
        category: 'Stylistic Issues',
        description: 'require or disallow a space before blocks',
        eslintUrl: 'http://eslint.org/docs/rules/space-before-blocks',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"space-before-blocks\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"space-before-blocks\": [\n        true,\n        \"never\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"space-before-blocks\": [\n        true,\n        {\n          \"functions\": \"never\",\n          \"keywords\": \"always\"\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'space-before-function-paren',
        tslintRule: 'space-before-function-paren',
        category: 'Stylistic Issues',
        description: 'require or disallow a space before function opening parenthesis',
        eslintUrl: 'http://eslint.org/docs/rules/space-before-function-paren',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"space-before-function-paren\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"space-before-function-paren\": [\n        true,\n        \"never\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"space-before-function-paren\": [\n        true,\n        {\n          \"anonymous\": \"always\",\n          \"named\": \"never\"\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'space-in-parens',
        tslintRule: 'space-in-parens',
        category: 'Stylistic Issues',
        description: 'require or disallow spaces inside parentheses',
        eslintUrl: 'http://eslint.org/docs/rules/space-in-parens',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"space-in-parens\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"space-in-parens\": [\n        true,\n        \"never\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'space-infix-ops',
        tslintRule: 'space-infix-ops',
        category: 'Stylistic Issues',
        description: 'require spaces around operators<br>Tslint\'s [whitespace](https://palantir.github.io/tslint/rules/whitespace/) can partially be used',
        eslintUrl: 'http://eslint.org/docs/rules/space-infix-ops',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"space-infix-ops\": [\n        true,\n        {\n          \"int32Hint\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'space-unary-ops',
        tslintRule: 'space-unary-ops',
        category: 'Stylistic Issues',
        description: 'require or disallow spaces before/after unary operators',
        eslintUrl: 'http://eslint.org/docs/rules/space-unary-ops',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"space-unary-ops\": [\n        true,\n        {\n          \"words\": true,\n          \"nonwords\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'spaced-comment',
        tslintRule: 'comment-format',
        category: 'Stylistic Issues',
        description: 'require or disallow a space immediately following the `//` or `/*` in a comment',
        eslintUrl: 'http://eslint.org/docs/rules/spaced-comment',
        tslintUrl: 'https://palantir.github.io/tslint/rules/comment-format',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'wrap-regex',
        tslintRule: 'wrap-regex',
        category: 'Stylistic Issues',
        description: 'require regex literals to be wrapped in parentheses',
        eslintUrl: 'http://eslint.org/docs/rules/wrap-regex',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"wrap-regex\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'arrow-body-style',
        tslintRule: 'ter-arrow-body-style',
        category: 'ECMAScript 6',
        description: 'require braces in arrow function body',
        eslintUrl: 'http://eslint.org/docs/rules/arrow-body-style',
        provider: 'tslint-eslint-rules'
    },
    {
        available: true,
        eslintRule: 'arrow-parens',
        tslintRule: 'ter-arrow-parens',
        category: 'ECMAScript 6',
        description: 'require parens in arrow function arguments',
        eslintUrl: 'http://eslint.org/docs/rules/arrow-parens',
        provider: 'tslint-eslint-rules'
    },
    {
        available: true,
        eslintRule: 'arrow-spacing',
        tslintRule: 'ter-arrow-spacing',
        category: 'ECMAScript 6',
        description: "require space before/after arrow function's arrow",
        eslintUrl: 'http://eslint.org/docs/rules/arrow-spacing',
        provider: 'tslint-eslint-rules'
    },
    {
        available: false,
        eslintRule: 'constructor-super',
        tslintRule: 'Not applicable',
        category: 'ECMAScript 6',
        description: 'verify calls of `super()` in constructors',
        eslintUrl: 'http://eslint.org/docs/rules/constructor-super',
        provider: 'Not applicable'
    },
    {
        available: false,
        eslintRule: 'generator-star-spacing',
        tslintRule: 'generator-star-spacing',
        category: 'ECMAScript 6',
        description: 'enforce spacing around the `*` in generator functions',
        eslintUrl: 'http://eslint.org/docs/rules/generator-star-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"generator-star-spacing\": [\n        true,\n        {\n          \"before\": true,\n          \"after\": true\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-class-assign',
        tslintRule: 'no-class-assign',
        category: 'ECMAScript 6',
        description: 'disallow modifying variables of class declarations',
        eslintUrl: 'http://eslint.org/docs/rules/no-class-assign',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-class-assign\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-confusing-arrow',
        tslintRule: 'no-confusing-arrow',
        category: 'ECMAScript 6',
        description: 'disallow arrow functions where they could be confused with comparisons',
        eslintUrl: 'http://eslint.org/docs/rules/no-confusing-arrow',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-confusing-arrow\": [\n        true,\n        {\n          \"allowParens\": false\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-const-assign',
        tslintRule: 'Not applicable',
        category: 'ECMAScript 6',
        description: 'disallow modifying variables that are declared using `const`',
        eslintUrl: 'http://eslint.org/docs/rules/no-const-assign',
        provider: 'Not applicable'
    },
    {
        available: false,
        eslintRule: 'no-dupe-class-members',
        tslintRule: 'Not applicable',
        category: 'ECMAScript 6',
        description: 'disallow duplicate name in class members',
        eslintUrl: 'http://eslint.org/docs/rules/no-dupe-class-members',
        tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
        provider: 'Not applicable',
        usage: ""
    },
    {
        available: false,
        eslintRule: 'no-duplicate-imports',
        tslintRule: 'no-duplicate-imports',
        category: 'ECMAScript 6',
        description: 'disallow duplicate module imports',
        eslintUrl: 'http://eslint.org/docs/rules/no-duplicate-imports',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-duplicate-imports\": [\n        true,\n        {\n          includeExports: true\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-new-symbol',
        tslintRule: 'no-new-symbol',
        category: 'ECMAScript 6',
        description: 'disallow use of the `new` operator with the `Symbol` object',
        eslintUrl: 'http://eslint.org/docs/rules/no-new-symbol',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-new-symbol\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-restricted-imports',
        tslintRule: 'no-restricted-imports',
        category: 'ECMAScript 6',
        description: 'restrict usage of specified modules when loaded by `import` declaration',
        eslintUrl: 'http://eslint.org/docs/rules/no-restricted-imports',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-restricted-imports\": [\n        true,\n        \"import1\",\n        \"import2\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'no-this-before-super',
        tslintRule: 'Not applicable',
        category: 'ECMAScript 6',
        description: 'disallow use of `this`/`super` before calling `super()` in constructors.',
        eslintUrl: 'http://eslint.org/docs/rules/no-this-before-super',
        provider: 'Not applicable'
    },
    {
        available: false,
        eslintRule: 'no-useless-constructor',
        tslintRule: 'no-useless-constructor',
        category: 'ECMAScript 6',
        description: 'disallow unnecessary constructor',
        eslintUrl: 'http://eslint.org/docs/rules/no-useless-constructor',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"no-useless-constructor\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'no-var',
        tslintRule: 'no-var-keyword',
        category: 'ECMAScript 6',
        description: 'require `let` or `const` instead of `var`',
        eslintUrl: 'http://eslint.org/docs/rules/no-var',
        tslintUrl: 'http://palantir.github.io/tslint/rules/no-var-keyword',
        provider: 'native',
        usage: "~~~json\n    \"no-var-keyword\": true\n    ~~~"
    },
    {
        available: true,
        eslintRule: 'object-shorthand',
        tslintRule: 'object-literal-shorthand',
        category: 'ECMAScript 6',
        description: 'require method and property shorthand syntax for object literals',
        eslintUrl: 'http://eslint.org/docs/rules/object-shorthand',
        tslintUrl: 'https://palantir.github.io/tslint/rules/object-literal-shorthand',
        provider: 'native'
    },
    {
        available: true,
        eslintRule: 'prefer-arrow-callback',
        tslintRule: 'ter-prefer-arrow-callback',
        category: 'ECMAScript 6',
        description: 'suggest using arrow functions as callbacks',
        eslintUrl: 'http://eslint.org/docs/rules/prefer-arrow-callback',
        provider: 'tslint-eslint-rules'
    },
    {
        available: true,
        eslintRule: 'prefer-const',
        tslintRule: 'prefer-const',
        category: 'ECMAScript 6',
        description: 'suggest using `const` declaration for variables that are never modified after declared',
        eslintUrl: 'http://eslint.org/docs/rules/prefer-const',
        tslintUrl: 'https://palantir.github.io/tslint/rules/prefer-const',
        provider: 'native'
    },
    {
        available: false,
        eslintRule: 'prefer-reflect',
        tslintRule: 'prefer-reflect',
        category: 'ECMAScript 6',
        description: 'suggest using Reflect methods where applicable',
        eslintUrl: 'http://eslint.org/docs/rules/prefer-reflect',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"prefer-reflect\": [\n        true,\n        {\n          \"exceptions\": [\n            \"apply\",\n            \"call\",\n            \"defineProperty\",\n            \"getOwnPropertyDescriptor\",\n            \"getPrototypeOf\",\n            \"setPrototypeOf\",\n            \"isExtensible\",\n            \"getOwnPropertyNames\",\n            \"preventExtensions\",\n            \"delete\"\n          ]\n        }\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'prefer-rest-params',
        tslintRule: 'prefer-rest-params',
        category: 'ECMAScript 6',
        description: 'suggest using the rest parameters instead of `arguments`',
        eslintUrl: 'http://eslint.org/docs/rules/prefer-rest-params',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"prefer-rest-params\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'prefer-spread',
        tslintRule: 'prefer-spread',
        category: 'ECMAScript 6',
        description: 'suggest using the spread operator instead of `.apply()`.',
        eslintUrl: 'http://eslint.org/docs/rules/prefer-spread',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"prefer-spread\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'prefer-template',
        tslintRule: 'prefer-template',
        category: 'ECMAScript 6',
        description: 'suggest using template literals instead of strings concatenation',
        eslintUrl: 'http://eslint.org/docs/rules/prefer-template',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"prefer-template\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'require-yield',
        tslintRule: 'require-yield',
        category: 'ECMAScript 6',
        description: 'disallow generator functions that do not have `yield`',
        eslintUrl: 'http://eslint.org/docs/rules/require-yield',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"require-yield\": true\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'template-curly-spacing',
        tslintRule: 'template-curly-spacing',
        category: 'ECMAScript 6',
        description: 'enforce spacing around embedded expressions of template strings',
        eslintUrl: 'http://eslint.org/docs/rules/template-curly-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"template-curly-spacing\": [\n        true,\n        \"always\"\n      ]\n    ~~~\n    \n    ~~~json\n    \"template-curly-spacing\": [\n        true,\n        \"never\"\n      ]\n    ~~~"
    },
    {
        available: false,
        eslintRule: 'yield-star-spacing',
        tslintRule: 'yield-star-spacing',
        category: 'ECMAScript 6',
        description: 'enforce spacing around the `*` in `yield*` expressions',
        eslintUrl: 'http://eslint.org/docs/rules/yield-star-spacing',
        provider: 'tslint-eslint-rules',
        usage: "~~~json\n    \"yield-star-spacing\": true\n    ~~~"
    }
];
exports.rules = rules;
function toCamelCase(str) {
    var words = str.split('-').map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); });
    words[0] = words[0].toLowerCase();
    return words.join('');
}
exports.toCamelCase = toCamelCase;
var ruleTSMap = {};
exports.ruleTSMap = ruleTSMap;
var ruleESMap = {};
exports.ruleESMap = ruleESMap;
rules.forEach(function (rule) {
    ruleTSMap[toCamelCase(rule.tslintRule)] = rule;
    ruleESMap[toCamelCase(rule.eslintRule)] = rule;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlYWRtZS9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBdUJBLElBQU0sVUFBVSxHQUFHO0lBQ2pCLGFBQWEsRUFBRSwwQ0FBMEM7SUFDekQsa0JBQWtCLEVBQUUsbUVBQW1FO0lBQ3ZGLGlCQUFpQixFQUFFLHlFQUF5RTtJQUM1RixzQkFBc0IsRUFBRSw2RkFBNkY7SUFDckgsY0FBYyxFQUFFLG9EQUFvRDtJQUNwRSxXQUFXLEVBQUUsb0RBQW9EO0lBQ2pFLGdCQUFnQixFQUFFLHNKQUNzRDtDQUN6RSxDQUFDO0FBaWtHQSxnQ0FBVTtBQWhrR1osSUFBTSxLQUFLLEdBQVk7SUFDckI7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsbURBQW1EO1FBQ2hFLFNBQVMsRUFBRSwyQ0FBMkM7UUFDdEQsU0FBUyxFQUFFLHVEQUF1RDtRQUNsRSxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUseUpBUUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFVBQVUsRUFBRSwyQkFBMkI7UUFDdkMsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsOERBQThEO1FBQzNFLFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsU0FBUyxFQUFFLGtFQUFrRTtRQUM3RSxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsMkRBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsWUFBWTtRQUN4QixVQUFVLEVBQUUsWUFBWTtRQUN4QixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxpRUFBaUU7UUFDOUUsU0FBUyxFQUFFLHdDQUF3QztRQUNuRCxTQUFTLEVBQUUsbURBQW1EO1FBQzlELFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxzSkFTSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsVUFBVSxFQUFFLHVCQUF1QjtRQUNuQyxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsU0FBUyxFQUFFLG9EQUFvRDtRQUMvRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSx1REFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsU0FBUyxFQUFFLCtDQUErQztRQUMxRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxrREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLDBDQUEwQztRQUN2RCxTQUFTLEVBQUUsMENBQTBDO1FBQ3JELFNBQVMsRUFBRSxvREFBb0Q7UUFDL0QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLDZDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUseURBQXlEO1FBQ3RFLFNBQVMsRUFBRSwyQ0FBMkM7UUFDdEQsUUFBUSxFQUFFLGdCQUFnQjtLQUMzQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxxRUFBcUU7UUFDbEYsU0FBUyxFQUFFLDJDQUEyQztRQUN0RCxRQUFRLEVBQUUsZ0JBQWdCO0tBQzNCO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxnREFBZ0Q7UUFDN0QsU0FBUyxFQUFFLGdEQUFnRDtRQUMzRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxtREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLHlDQUF5QztRQUN0RCxTQUFTLEVBQUUsdUNBQXVDO1FBQ2xELFNBQVMsRUFBRSxpREFBaUQ7UUFDNUQsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLDBDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLDBCQUEwQjtRQUN0QyxVQUFVLEVBQUUsMEJBQTBCO1FBQ3RDLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLGtGQUFrRjtRQUMvRixTQUFTLEVBQUUsdURBQXVEO1FBQ2xFLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDBEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsc0VBQXNFO1FBQ25GLFNBQVMsRUFBRSwyQ0FBMkM7UUFDdEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsOENBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsdUJBQXVCO1FBQ25DLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsMkVBQTJFO1FBQ3hGLFNBQVMsRUFBRSxvREFBb0Q7UUFDL0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsdURBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLGtDQUFrQztRQUMvQyxTQUFTLEVBQUUsOENBQThDO1FBQ3pELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGtMQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGVBQWU7UUFDM0IsVUFBVSxFQUFFLGVBQWU7UUFDM0IsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsK0NBQStDO1FBQzVELFNBQVMsRUFBRSw0Q0FBNEM7UUFDdkQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsK0NBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLCtFQUErRTtRQUM1RixTQUFTLEVBQUUsNkNBQTZDO1FBQ3hELFNBQVMsRUFBRSx1REFBdUQ7UUFDbEUsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsVUFBVSxFQUFFLHVCQUF1QjtRQUNuQyxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSwyRUFBMkU7UUFDeEYsU0FBUyxFQUFFLG9EQUFvRDtRQUMvRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSwyTEFZSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSx1RkFBdUY7UUFDcEcsU0FBUyxFQUFFLGdEQUFnRDtRQUMzRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxtREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSx5QkFBeUI7UUFDckMsVUFBVSxFQUFFLHlCQUF5QjtRQUNyQyxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw2RUFBNkU7UUFDMUYsU0FBUyxFQUFFLHNEQUFzRDtRQUNqRSxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSx5REFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsMkVBQTJFO1FBQ3hGLFNBQVMsRUFBRSxnREFBZ0Q7UUFDM0QsU0FBUyxFQUFFLHVEQUF1RDtRQUNsRSxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsMkdBQTJHO1FBQ3hILFNBQVMsRUFBRSwyQ0FBMkM7UUFDdEQsU0FBUyxFQUFFLHVEQUF1RDtRQUNsRSxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLHdFQUF3RTtRQUNyRixTQUFTLEVBQUUsOENBQThDO1FBQ3pELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGlEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsK0NBQStDO1FBQzFELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGtEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLHlCQUF5QjtRQUNyQyxVQUFVLEVBQUUseUJBQXlCO1FBQ3JDLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLGdFQUFnRTtRQUM3RSxTQUFTLEVBQUUsc0RBQXNEO1FBQ2pFLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHlEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxtR0FBbUc7UUFDaEgsU0FBUyxFQUFFLDZDQUE2QztRQUN4RCxRQUFRLEVBQUUsZ0JBQWdCO0tBQzNCO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsU0FBUyxFQUFFLGdEQUFnRDtRQUMzRCxTQUFTLEVBQUUsMkRBQTJEO1FBQ3RFLFFBQVEsRUFBRSxRQUFRO0tBQ25CO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxTQUFTLEVBQUUsd0NBQXdDO1FBQ25ELFNBQVMsRUFBRSxtREFBbUQ7UUFDOUQsUUFBUSxFQUFFLFFBQVE7S0FDbkI7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGFBQWE7UUFDekIsVUFBVSxFQUFFLGFBQWE7UUFDekIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLFNBQVMsRUFBRSwwQ0FBMEM7UUFDckQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsaVZBYUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsY0FBYztRQUMxQixVQUFVLEVBQUUsY0FBYztRQUMxQixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxxRkFBcUY7UUFDbEcsU0FBUyxFQUFFLDJDQUEyQztRQUN0RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSw4Q0FFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUseUNBQXlDO1FBQ3RELFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsd0pBUUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHVCQUF1QjtRQUNuQyxVQUFVLEVBQUUsdUJBQXVCO1FBQ25DLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDJEQUEyRDtRQUN4RSxTQUFTLEVBQUUsb0RBQW9EO1FBQy9ELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHVEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxxREFBcUQ7UUFDbEUsU0FBUyxFQUFFLCtDQUErQztRQUMxRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxrREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsZ0VBQWdFO1FBQzdFLFNBQVMsRUFBRSx5Q0FBeUM7UUFDcEQsU0FBUyxFQUFFLCtEQUErRDtRQUMxRSxRQUFRLEVBQUUsUUFBUTtLQUNuQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLHNFQUFzRTtRQUNuRixTQUFTLEVBQUUsZ0RBQWdEO1FBQzNELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLG1EQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLE9BQU87UUFDbkIsVUFBVSxFQUFFLE9BQU87UUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsNERBQTREO1FBQ3pFLFNBQVMsRUFBRSxvQ0FBb0M7UUFDL0MsU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsdUNBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsY0FBYztRQUMxQixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFNBQVMsRUFBRSx1REFBdUQ7UUFDbEUsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLDhDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLG1EQUFtRDtRQUNoRSxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDBMQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLGtEQUFrRDtRQUMvRCxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLCtKQVFIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFFBQVE7UUFDcEIsVUFBVSxFQUFFLGVBQWU7UUFDM0IsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxxQ0FBcUM7UUFDaEQsU0FBUyxFQUFFLHNEQUFzRDtRQUNqRSxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsMkZBS0g7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsY0FBYztRQUMxQixVQUFVLEVBQUUsT0FBTztRQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxpREFBaUQ7UUFDOUQsU0FBUyxFQUFFLDJDQUEyQztRQUN0RCxTQUFTLEVBQUUsOENBQThDO1FBQ3pELFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSx1Q0FFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDBIQUEwSDtRQUN2SSxTQUFTLEVBQUUsdUNBQXVDO1FBQ2xELFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsUUFBUSxFQUFFLFFBQVE7S0FDbkI7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFdBQVc7UUFDdkIsVUFBVSxFQUFFLFFBQVE7UUFDcEIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsMERBQTBEO1FBQ3ZFLFNBQVMsRUFBRSx3Q0FBd0M7UUFDbkQsU0FBUyxFQUFFLCtDQUErQztRQUMxRCxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsd0NBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxTQUFTLEVBQUUsbURBQW1EO1FBQzlELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHNEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDJFQUEyRTtRQUN4RixTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDhDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsU0FBUyxFQUFFLDZDQUE2QztRQUN4RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxnREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsVUFBVSxFQUFFLFVBQVU7UUFDdEIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLFNBQVMsRUFBRSxnREFBZ0Q7UUFDM0QsU0FBUyxFQUFFLGlEQUFpRDtRQUM1RCxRQUFRLEVBQUUsUUFBUTtLQUNuQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDhDQUE4QztRQUMzRCxTQUFTLEVBQUUsK0NBQStDO1FBQzFELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGtEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLCtEQUErRDtRQUM1RSxTQUFTLEVBQUUseUNBQXlDO1FBQ3BELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDRDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFNBQVM7UUFDckIsVUFBVSxFQUFFLFNBQVM7UUFDckIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSxzQ0FBc0M7UUFDakQsU0FBUyxFQUFFLGdEQUFnRDtRQUMzRCxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUseUNBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxTQUFTLEVBQUUsK0NBQStDO1FBQzFELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGlKQU9IO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxlQUFlO1FBQzNCLFVBQVUsRUFBRSxlQUFlO1FBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUsNENBQTRDO1FBQ3ZELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLCtDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsU0FBUyxFQUFFLDZDQUE2QztRQUN4RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxnREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsVUFBVSxFQUFFLDZCQUE2QjtRQUN6QyxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSx5REFBeUQ7UUFDdEUsU0FBUyxFQUFFLDZDQUE2QztRQUN4RCxTQUFTLEVBQUUsb0VBQW9FO1FBQy9FLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxnREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsNEVBQTRFO1FBQ3pGLFNBQVMsRUFBRSxrREFBa0Q7UUFDN0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUscURBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLHNEQUFzRDtRQUNuRSxTQUFTLEVBQUUsbURBQW1EO1FBQzlELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHdMQVNIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsVUFBVSxFQUFFLHFCQUFxQjtRQUNqQyxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxrREFBa0Q7UUFDL0QsU0FBUyxFQUFFLGtEQUFrRDtRQUM3RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxzREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELFNBQVMsRUFBRSw4Q0FBOEM7UUFDekQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsaURBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLG1FQUFtRTtRQUNoRixTQUFTLEVBQUUsOENBQThDO1FBQ3pELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGlEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDJDQUEyQztRQUN4RCxTQUFTLEVBQUUsMENBQTBDO1FBQ3JELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDZDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFdBQVc7UUFDdkIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxvQ0FBb0M7UUFDakQsU0FBUyxFQUFFLHdDQUF3QztRQUNuRCxTQUFTLEVBQUUsd0RBQXdEO1FBQ25FLFFBQVEsRUFBRSxRQUFRO0tBQ25CO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsZ0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsNkNBQTZDO1FBQzFELFNBQVMsRUFBRSwyQ0FBMkM7UUFDdEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsOENBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSwrQ0FBK0M7UUFDMUQsU0FBUyxFQUFFLDBEQUEwRDtRQUNyRSxRQUFRLEVBQUUsUUFBUTtLQUNuQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLFNBQVMsRUFBRSw4Q0FBOEM7UUFDekQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsNkxBT0g7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSwyQ0FBMkM7UUFDdEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsOENBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDBDQUEwQztRQUN2RCxTQUFTLEVBQUUsaURBQWlEO1FBQzVELFNBQVMsRUFBRSx1REFBdUQ7UUFDbEUsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFVBQVUsRUFBRSxlQUFlO1FBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLGlGQUFpRjtRQUM5RixTQUFTLEVBQUUscUNBQXFDO1FBQ2hELFNBQVMsRUFBRSx1REFBdUQ7UUFDbEUsUUFBUSxFQUFFLFFBQVE7S0FDbkI7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLG9EQUFvRDtRQUNqRSxTQUFTLEVBQUUsMENBQTBDO1FBQ3JELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDZDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsY0FBYztRQUMxQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxzRUFBc0U7UUFDbkYsU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxTQUFTLEVBQUUsc0RBQXNEO1FBQ2pFLFFBQVEsRUFBRSxRQUFRO0tBQ25CO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsVUFBVTtRQUN0QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDhDQUE4QztRQUMzRCxTQUFTLEVBQUUsdUNBQXVDO1FBQ2xELFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0I7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxtR0FBbUc7UUFDaEgsU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxpREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsOENBQThDO1FBQzNELFNBQVMsRUFBRSxnREFBZ0Q7UUFDM0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsMEhBT0g7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLFVBQVU7UUFDdEIsVUFBVSxFQUFFLFVBQVU7UUFDdEIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsd0NBQXdDO1FBQ3JELFNBQVMsRUFBRSx1Q0FBdUM7UUFDbEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsMENBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsY0FBYztRQUMxQixVQUFVLEVBQUUsdUJBQXVCO1FBQ25DLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLGdHQUFnRztRQUM3RyxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFNBQVMsRUFBRSw4REFBOEQ7UUFDekUsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLHVEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxrREFBa0Q7UUFDL0QsU0FBUyxFQUFFLCtDQUErQztRQUMxRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSx3TUFZSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZUFBZTtRQUMzQixVQUFVLEVBQUUsZUFBZTtRQUMzQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsU0FBUyxFQUFFLDRDQUE0QztRQUN2RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSwrQ0FFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsNERBQTREO1FBQ3pFLFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsZ0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDREQUE0RDtRQUN6RSxTQUFTLEVBQUUsOENBQThDO1FBQ3pELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGlEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLG9DQUFvQztRQUNqRCxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDhDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDZDQUE2QztRQUMxRCxTQUFTLEVBQUUsK0NBQStDO1FBQzFELFNBQVMsRUFBRSx5REFBeUQ7UUFDcEUsUUFBUSxFQUFFLFFBQVE7S0FDbkI7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSw4QkFBOEI7UUFDMUMsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsU0FBUyxFQUFFLDJEQUEyRDtRQUN0RSxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSw4REFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxxREFBcUQ7UUFDbEUsU0FBUyxFQUFFLG9EQUFvRDtRQUMvRCxTQUFTLEVBQUUsNkRBQTZEO1FBQ3hFLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSx1REFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFNBQVMsRUFBRSwrQ0FBK0M7UUFDMUQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsa0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxTQUFTLEVBQUUsOENBQThDO1FBQ3pELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGlEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxxRUFBcUU7UUFDbEYsU0FBUyxFQUFFLGdEQUFnRDtRQUMzRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxtREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsZ0RBQWdEO1FBQzdELFNBQVMsRUFBRSxnREFBZ0Q7UUFDM0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsbURBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLFNBQVM7UUFDckIsVUFBVSxFQUFFLFNBQVM7UUFDckIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxzQ0FBc0M7UUFDakQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsd0NBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHFCQUFxQjtRQUNqQyxVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLGlGQUFpRjtRQUM5RixTQUFTLEVBQUUsa0RBQWtEO1FBQzdELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHlMQVFIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsc0NBQXNDO1FBQ2pELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHlDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLE9BQU87UUFDbkIsVUFBVSxFQUFFLE9BQU87UUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUscURBQXFEO1FBQ2xFLFNBQVMsRUFBRSxvQ0FBb0M7UUFDL0MsU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsdUNBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGFBQWE7UUFDekIsVUFBVSxFQUFFLGFBQWE7UUFDekIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsc0VBQXNFO1FBQ25GLFNBQVMsRUFBRSwwQ0FBMEM7UUFDckQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsNkNBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLFdBQVc7UUFDdkIsVUFBVSxFQUFFLFdBQVc7UUFDdkIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsb0VBQW9FO1FBQ2pGLFNBQVMsRUFBRSx3Q0FBd0M7UUFDbkQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsOFFBbUJIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxTQUFTLEVBQUUsbUNBQW1DO1FBQzlDLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHVLQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGFBQWE7UUFDdkIsV0FBVyxFQUFFLGlEQUFpRDtRQUM5RCxTQUFTLEVBQUUscUNBQXFDO1FBQ2hELFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0I7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsNERBQTREO1FBQ3pFLFNBQVMsRUFBRSxnREFBZ0Q7UUFDM0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsNlRBa0JIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsMEZBQTBGO1FBQ3ZHLFNBQVMsRUFBRSw4Q0FBOEM7UUFDekQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsaURBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGVBQWU7UUFDM0IsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsOENBQThDO1FBQzNELFNBQVMsRUFBRSw0Q0FBNEM7UUFDdkQsUUFBUSxFQUFFLGdCQUFnQjtLQUMzQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLG1EQUFtRDtRQUNoRSxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDhDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFdBQVc7UUFDdkIsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsdUVBQXVFO1FBQ3BGLFNBQVMsRUFBRSx3Q0FBd0M7UUFDbkQsU0FBUyxFQUFFLDZEQUE2RDtRQUN4RSxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsc0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLDRCQUE0QjtRQUN4QyxVQUFVLEVBQUUsNEJBQTRCO1FBQ3hDLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSxpREFBaUQ7UUFDOUQsU0FBUyxFQUFFLHlEQUF5RDtRQUNwRSxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSw0REFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsVUFBVTtRQUN0QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSw4RkFBOEY7UUFDM0csU0FBUyxFQUFFLHVDQUF1QztRQUNsRCxRQUFRLEVBQUUsZ0JBQWdCO0tBQzNCO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZUFBZTtRQUMzQixVQUFVLEVBQUUsZUFBZTtRQUMzQixRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLFNBQVMsRUFBRSw0Q0FBNEM7UUFDdkQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsK0NBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDhDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsdUtBQXVLO1FBQ3BMLFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsUUFBUSxFQUFFLGdCQUFnQjtLQUMzQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLG1EQUFtRDtRQUNoRSxTQUFTLEVBQUUsbURBQW1EO1FBQzlELFNBQVMsRUFBRSw4REFBOEQ7UUFDekUsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLHVEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSw0SkFTSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxXQUFXLEVBQUUsK0NBQStDO1FBQzVELFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsZ0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxrREFBa0Q7UUFDN0QsUUFBUSxFQUFFLHFCQUFxQjtLQUNoQztJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsV0FBVyxFQUFFLDJEQUEyRDtRQUN4RSxTQUFTLEVBQUUsZ0RBQWdEO1FBQzNELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDZIQU9IO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSw0REFBNEQ7UUFDekUsU0FBUyxFQUFFLDZDQUE2QztRQUN4RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxnREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxXQUFXLEVBQUUsaUVBQWlFO1FBQzlFLFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsZ0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsV0FBVyxFQUFFLCtCQUErQjtRQUM1QyxTQUFTLEVBQUUsNkNBQTZDO1FBQ3hELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGdEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxpREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsdUJBQXVCO1FBQ25DLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxXQUFXLEVBQUUsMENBQTBDO1FBQ3ZELFNBQVMsRUFBRSxvREFBb0Q7UUFDL0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsdUtBU0g7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLFNBQVM7UUFDckIsVUFBVSxFQUFFLFNBQVM7UUFDckIsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxzQ0FBc0M7UUFDakQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUseUNBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsdUJBQXVCO1FBQ25DLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELFNBQVMsRUFBRSxvREFBb0Q7UUFDL0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsa2RBc0JIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGVBQWU7UUFDM0IsVUFBVSxFQUFFLGVBQWU7UUFDM0IsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUseURBQXlEO1FBQ3RFLFNBQVMsRUFBRSw0Q0FBNEM7UUFDdkQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUseUxBWUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsYUFBYTtRQUN6QixVQUFVLEVBQUUsYUFBYTtRQUN6QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLDBDQUEwQztRQUNyRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSw0Y0E0Qkg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsV0FBVztRQUN2QixVQUFVLEVBQUUsZUFBZTtRQUMzQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsU0FBUyxFQUFFLHdDQUF3QztRQUNuRCxTQUFTLEVBQUUsc0RBQXNEO1FBQ2pFLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSw4RkFLSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZUFBZTtRQUMzQixVQUFVLEVBQUUsZUFBZTtRQUMzQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSx3Q0FBd0M7UUFDckQsU0FBUyxFQUFFLDRDQUE0QztRQUN2RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxtSkFRSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsYUFBYTtRQUN6QixVQUFVLEVBQUUsYUFBYTtRQUN6QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLDBDQUEwQztRQUNyRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxtTEFZSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsMkJBQTJCO1FBQ3ZDLFVBQVUsRUFBRSwyQkFBMkI7UUFDdkMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsd0RBQXdEO1FBQ3JFLFNBQVMsRUFBRSx3REFBd0Q7UUFDbkUsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsaU5BWUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHdFQUF3RTtRQUNyRixTQUFTLEVBQUUsOENBQThDO1FBQ3pELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHdGQUtIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFVBQVU7UUFDdEIsVUFBVSxFQUFFLFNBQVM7UUFDckIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsa0VBQWtFO1FBQy9FLFNBQVMsRUFBRSx1Q0FBdUM7UUFDbEQsU0FBUyxFQUFFLGlEQUFpRDtRQUM1RCxRQUFRLEVBQUUsUUFBUTtLQUNuQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsNkNBQTZDO1FBQzFELFNBQVMsRUFBRSx5Q0FBeUM7UUFDcEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsNENBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUscURBQXFEO1FBQ2xFLFNBQVMsRUFBRSx5Q0FBeUM7UUFDcEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsMlRBa0JIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHdJQUtIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLG1HQUFtRztRQUNoSCxTQUFTLEVBQUUsd0NBQXdDO1FBQ25ELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHFjQXNCSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsVUFBVTtRQUN0QixVQUFVLEVBQUUsVUFBVTtRQUN0QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw4REFBOEQ7UUFDM0UsU0FBUyxFQUFFLHVDQUF1QztRQUNsRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSwySkFRSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLGdDQUFnQztRQUM3QyxTQUFTLEVBQUUscUNBQXFDO1FBQ2hELFFBQVEsRUFBRSxxQkFBcUI7S0FDaEM7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDBFQUEwRTtRQUN2RixTQUFTLEVBQUUseUNBQXlDO1FBQ3BELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGtNQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDJLQUEySztRQUN4TCxTQUFTLEVBQUUsMENBQTBDO1FBQ3JELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDhOQVVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxnSkFBZ0o7UUFDN0osU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxrVUFhSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw4Q0FBOEM7UUFDM0QsU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxTQUFTLEVBQUUseURBQXlEO1FBQ3BFLFFBQVEsRUFBRSxRQUFRO0tBQ25CO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFVBQVUsRUFBRSxzQkFBc0I7UUFDbEMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxtREFBbUQ7UUFDOUQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUseWVBZ0JIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHFEQUFxRDtRQUNsRSxTQUFTLEVBQUUsd0NBQXdDO1FBQ25ELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHVNQWNIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFNBQVM7UUFDckIsVUFBVSxFQUFFLGFBQWE7UUFDekIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsK0JBQStCO1FBQzVDLFNBQVMsRUFBRSxzQ0FBc0M7UUFDakQsUUFBUSxFQUFFLHFCQUFxQjtLQUNoQztJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsV0FBVztRQUN2QixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxTQUFTLEVBQUUsd0NBQXdDO1FBQ25ELFNBQVMsRUFBRSw0REFBNEQ7UUFDdkUsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLG1EQUFtRDtRQUNoRSxTQUFTLEVBQUUsbURBQW1EO1FBQzlELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHNGQUtIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLCtFQUErRTtRQUM1RixTQUFTLEVBQUUseUNBQXlDO1FBQ3BELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHVNQWNIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSwrREFBK0Q7UUFDNUUsU0FBUyxFQUFFLDRDQUE0QztRQUN2RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSx5VkFvQkg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHlCQUF5QjtRQUNyQyxVQUFVLEVBQUUseUJBQXlCO1FBQ3JDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDJEQUEyRDtRQUN4RSxTQUFTLEVBQUUsZ0RBQWdEO1FBQzNELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDZOQWNIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsMkNBQTJDO1FBQ3hELFNBQVMsRUFBRSxzQ0FBc0M7UUFDakQsU0FBUyxFQUFFLHVEQUF1RDtRQUNsRSxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFlBQVk7UUFDeEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsb0ZBQW9GO1FBQ2pHLFNBQVMsRUFBRSx5Q0FBeUM7UUFDcEQsU0FBUyxFQUFFLG9EQUFvRDtRQUMvRCxRQUFRLEVBQUUsUUFBUTtLQUNuQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLGtFQUFrRTtRQUMvRSxTQUFTLEVBQUUsZ0RBQWdEO1FBQzNELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGlNQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsVUFBVSxFQUFFLHVCQUF1QjtRQUNuQyxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsU0FBUyxFQUFFLG9EQUFvRDtRQUMvRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSx1REFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsMEJBQTBCO1FBQ3RDLFVBQVUsRUFBRSwwQkFBMEI7UUFDdEMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUseURBQXlEO1FBQ3RFLFNBQVMsRUFBRSx1REFBdUQ7UUFDbEUsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsNElBT0g7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHlDQUF5QztRQUN0RCxTQUFTLEVBQUUsbURBQW1EO1FBQzlELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHNEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFlBQVk7UUFDeEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSx5Q0FBeUM7UUFDcEQsU0FBUyxFQUFFLG9EQUFvRDtRQUMvRCxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsc0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGFBQWE7UUFDekIsVUFBVSxFQUFFLGFBQWE7UUFDekIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsMENBQTBDO1FBQ3ZELFNBQVMsRUFBRSwwQ0FBMEM7UUFDckQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsNkNBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxTQUFTLEVBQUUsaURBQWlEO1FBQzVELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLG9EQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHdEQUF3RDtRQUNyRSxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDhDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLDBCQUEwQjtRQUN0QyxVQUFVLEVBQUUsUUFBUTtRQUNwQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw4REFBOEQ7UUFDM0UsU0FBUyxFQUFFLHVEQUF1RDtRQUNsRSxTQUFTLEVBQUUsK0NBQStDO1FBQzFELFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxvR0FNSDtRQUNKLElBQUksRUFBRSxnT0FFK0I7S0FDdEM7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLHlCQUF5QjtRQUNyQyxVQUFVLEVBQUUsNEJBQTRCO1FBQ3hDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLCtCQUErQjtRQUM1QyxTQUFTLEVBQUUsc0RBQXNEO1FBQ2pFLFNBQVMsRUFBRSxtRUFBbUU7UUFDOUUsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsbURBQW1EO1FBQzlELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHNEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsU0FBUyxFQUFFLGdEQUFnRDtRQUMzRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxtREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZUFBZTtRQUMzQixVQUFVLEVBQUUsZUFBZTtRQUMzQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw4Q0FBOEM7UUFDM0QsU0FBUyxFQUFFLDRDQUE0QztRQUN2RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSwrQ0FFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFVBQVUsRUFBRSxzQkFBc0I7UUFDbEMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsd0NBQXdDO1FBQ3JELFNBQVMsRUFBRSxtREFBbUQ7UUFDOUQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsdUlBTUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDREQUE0RDtRQUN6RSxTQUFTLEVBQUUsNkNBQTZDO1FBQ3hELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGdEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUseUNBQXlDO1FBQ3BELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDRDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxVQUFVLEVBQUUsd0JBQXdCO1FBQ3BDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLGtEQUFrRDtRQUMvRCxTQUFTLEVBQUUsaURBQWlEO1FBQzVELFNBQVMsRUFBRSwrREFBK0Q7UUFDMUUsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLHdEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxzQkFBc0I7UUFDbEMsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw4Q0FBOEM7UUFDM0QsU0FBUyxFQUFFLG1EQUFtRDtRQUM5RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSw0SUFPSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUseUVBQXlFO1FBQ3RGLFNBQVMsRUFBRSxrREFBa0Q7UUFDN0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsdUlBT0g7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLCtCQUErQjtRQUMzQyxVQUFVLEVBQUUsK0JBQStCO1FBQzNDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUsNERBQTREO1FBQ3ZFLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLCtEQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLGlEQUFpRDtRQUM5RCxTQUFTLEVBQUUsbURBQW1EO1FBQzlELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHVNQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLFNBQVM7UUFDckIsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsU0FBUyxFQUFFLHNDQUFzQztRQUNqRCxTQUFTLEVBQUUsc0VBQXNFO1FBQ2pGLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSw2S0FZSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsOEJBQThCO1FBQzFDLFVBQVUsRUFBRSw4QkFBOEI7UUFDMUMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsNERBQTREO1FBQ3pFLFNBQVMsRUFBRSwyREFBMkQ7UUFDdEUsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsaU9BWUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHFCQUFxQjtRQUNqQyxVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDhFQUE4RTtRQUMzRixTQUFTLEVBQUUsa0RBQWtEO1FBQzdELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHFNQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxvQkFBb0I7UUFDaEMsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSw0REFBNEQ7UUFDekUsU0FBUyxFQUFFLGlEQUFpRDtRQUM1RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSx3Z0JBNEJIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxlQUFlO1FBQzNCLFVBQVUsRUFBRSxlQUFlO1FBQzNCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLCtCQUErQjtRQUM1QyxTQUFTLEVBQUUsNENBQTRDO1FBQ3ZELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLHlMQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGFBQWE7UUFDekIsVUFBVSxFQUFFLDJCQUEyQjtRQUN2QyxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxxREFBcUQ7UUFDbEUsU0FBUyxFQUFFLDBDQUEwQztRQUNyRCxTQUFTLEVBQUUsbUVBQW1FO1FBQzlFLFFBQVEsRUFBRSxRQUFRO0tBQ25CO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLG1FQUFtRTtRQUNoRixTQUFTLEVBQUUscUNBQXFDO1FBQ2hELFNBQVMsRUFBRSxtREFBbUQ7UUFDOUQsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLDZtQkEyQ0g7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGVBQWU7UUFDM0IsVUFBVSxFQUFFLGVBQWU7UUFDM0IsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLFNBQVMsRUFBRSw0Q0FBNEM7UUFDdkQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsMlFBWUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsTUFBTTtRQUNsQixVQUFVLEVBQUUsV0FBVztRQUN2QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxzREFBc0Q7UUFDbkUsU0FBUyxFQUFFLG1DQUFtQztRQUM5QyxTQUFTLEVBQUUsa0RBQWtEO1FBQzdELFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDZDQUE2QztRQUMxRCxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGtKQVFIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxtREFBbUQ7UUFDaEUsU0FBUyxFQUFFLDJDQUEyQztRQUN0RCxTQUFTLEVBQUUseURBQXlEO1FBQ3BFLFFBQVEsRUFBRSxRQUFRO0tBQ25CO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsV0FBVztRQUN2QixVQUFVLEVBQUUsV0FBVztRQUN2QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxrREFBa0Q7UUFDL0QsU0FBUyxFQUFFLHdDQUF3QztRQUNuRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSx1SEFPSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsMkNBQTJDO1FBQ3hELFNBQVMsRUFBRSxrREFBa0Q7UUFDN0QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsd1hBc0JIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSw2QkFBNkI7UUFDekMsVUFBVSxFQUFFLDZCQUE2QjtRQUN6QyxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxpRUFBaUU7UUFDOUUsU0FBUyxFQUFFLDBEQUEwRDtRQUNyRSxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSw2WUFzQkg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxTQUFTLEVBQUUsOENBQThDO1FBQ3pELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLDZMQVlIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxzSUFBc0k7UUFDbkosU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSw0SEFPSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUseURBQXlEO1FBQ3RFLFNBQVMsRUFBRSw4Q0FBOEM7UUFDekQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsdUpBUUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsaUZBQWlGO1FBQzlGLFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsU0FBUyxFQUFFLHdEQUF3RDtRQUNuRSxRQUFRLEVBQUUsUUFBUTtLQUNuQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUscURBQXFEO1FBQ2xFLFNBQVMsRUFBRSx5Q0FBeUM7UUFDcEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsNENBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFVBQVUsRUFBRSxzQkFBc0I7UUFDbEMsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUsK0NBQStDO1FBQzFELFFBQVEsRUFBRSxxQkFBcUI7S0FDaEM7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsNENBQTRDO1FBQ3pELFNBQVMsRUFBRSwyQ0FBMkM7UUFDdEQsUUFBUSxFQUFFLHFCQUFxQjtLQUNoQztJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsZUFBZTtRQUMzQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSxtREFBbUQ7UUFDaEUsU0FBUyxFQUFFLDRDQUE0QztRQUN2RCxRQUFRLEVBQUUscUJBQXFCO0tBQ2hDO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDJDQUEyQztRQUN4RCxTQUFTLEVBQUUsZ0RBQWdEO1FBQzNELFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0I7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSx3QkFBd0I7UUFDcEMsVUFBVSxFQUFFLHdCQUF3QjtRQUNwQyxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLFNBQVMsRUFBRSxxREFBcUQ7UUFDaEUsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsMkpBUUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSxvREFBb0Q7UUFDakUsU0FBUyxFQUFFLDhDQUE4QztRQUN6RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxpREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLFVBQVUsRUFBRSxvQkFBb0I7UUFDaEMsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLHdFQUF3RTtRQUNyRixTQUFTLEVBQUUsaURBQWlEO1FBQzVELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLGlJQU9IO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsOERBQThEO1FBQzNFLFNBQVMsRUFBRSw4Q0FBOEM7UUFDekQsUUFBUSxFQUFFLGdCQUFnQjtLQUMzQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHVCQUF1QjtRQUNuQyxVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSwwQ0FBMEM7UUFDdkQsU0FBUyxFQUFFLG9EQUFvRDtRQUMvRCxTQUFTLEVBQUUsdURBQXVEO1FBQ2xFLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHNCQUFzQjtRQUNsQyxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLG1EQUFtRDtRQUM5RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxpSUFPSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsZUFBZTtRQUMzQixVQUFVLEVBQUUsZUFBZTtRQUMzQixRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLFNBQVMsRUFBRSw0Q0FBNEM7UUFDdkQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsK0NBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLHVCQUF1QjtRQUNuQyxVQUFVLEVBQUUsdUJBQXVCO1FBQ25DLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSx5RUFBeUU7UUFDdEYsU0FBUyxFQUFFLG9EQUFvRDtRQUMvRCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSx1SEFNSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDBFQUEwRTtRQUN2RixTQUFTLEVBQUUsbURBQW1EO1FBQzlELFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0I7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSx3QkFBd0I7UUFDcEMsVUFBVSxFQUFFLHdCQUF3QjtRQUNwQyxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxxREFBcUQ7UUFDaEUsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsd0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsUUFBUTtRQUNwQixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSwyQ0FBMkM7UUFDeEQsU0FBUyxFQUFFLHFDQUFxQztRQUNoRCxTQUFTLEVBQUUsdURBQXVEO1FBQ2xFLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxnREFFSDtLQUNMO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsVUFBVSxFQUFFLDBCQUEwQjtRQUN0QyxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsa0VBQWtFO1FBQy9FLFNBQVMsRUFBRSwrQ0FBK0M7UUFDMUQsU0FBUyxFQUFFLGtFQUFrRTtRQUM3RSxRQUFRLEVBQUUsUUFBUTtLQUNuQjtJQUNEO1FBQ0UsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsdUJBQXVCO1FBQ25DLFVBQVUsRUFBRSwyQkFBMkI7UUFDdkMsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxTQUFTLEVBQUUsb0RBQW9EO1FBQy9ELFFBQVEsRUFBRSxxQkFBcUI7S0FDaEM7SUFDRDtRQUNFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLHdGQUF3RjtRQUNyRyxTQUFTLEVBQUUsMkNBQTJDO1FBQ3RELFNBQVMsRUFBRSxzREFBc0Q7UUFDakUsUUFBUSxFQUFFLFFBQVE7S0FDbkI7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsZ0RBQWdEO1FBQzdELFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsbWNBa0JIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxvQkFBb0I7UUFDaEMsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsMERBQTBEO1FBQ3ZFLFNBQVMsRUFBRSxpREFBaUQ7UUFDNUQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsb0RBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGVBQWU7UUFDM0IsVUFBVSxFQUFFLGVBQWU7UUFDM0IsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDBEQUEwRDtRQUN2RSxTQUFTLEVBQUUsNENBQTRDO1FBQ3ZELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLCtDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsa0VBQWtFO1FBQy9FLFNBQVMsRUFBRSw4Q0FBOEM7UUFDekQsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsaURBRUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLGVBQWU7UUFDM0IsVUFBVSxFQUFFLGVBQWU7UUFDM0IsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxTQUFTLEVBQUUsNENBQTRDO1FBQ3ZELFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsS0FBSyxFQUFFLCtDQUVIO0tBQ0w7SUFDRDtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSx3QkFBd0I7UUFDcEMsVUFBVSxFQUFFLHdCQUF3QjtRQUNwQyxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsaUVBQWlFO1FBQzlFLFNBQVMsRUFBRSxxREFBcUQ7UUFDaEUsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixLQUFLLEVBQUUsMk1BWUg7S0FDTDtJQUNEO1FBQ0UsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsU0FBUyxFQUFFLGlEQUFpRDtRQUM1RCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLEtBQUssRUFBRSxvREFFSDtLQUNMO0NBQ0YsQ0FBQztBQW9CQSxzQkFBSztBQWxCUCxxQkFBcUIsR0FBRztJQUN0QixJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO0lBQ3ZGLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQWlCQyxrQ0FBVztBQWZiLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQWFuQiw4QkFBUztBQVpYLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQWFuQiw4QkFBUztBQVpYLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO0lBQ2pCLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQy9DLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InJlYWRtZS9ydWxlcy5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
