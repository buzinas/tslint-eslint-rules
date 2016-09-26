type Provider = 'native' | 'tslint-eslint-rules' | 'Not applicable';

type Category = 'Strict Mode'
  | 'Stylistic Issues'
  | 'Possible Errors'
  | 'Node.js and CommonJS'
  | 'ECMAScript 6'
  | 'Variables'
  | 'Best Practices';

interface IRule {
  available: boolean;
  eslintRule: string;
  tslintRule: string;
  category: Category;
  description: string;
  eslintUrl: string;
  tslintUrl?: string;
  provider: Provider;
  usage: string;
  note?: string;
}

const categories = {
  'Strict Mode': 'These rules relate to using strict mode.',
  'Stylistic Issues': 'These rules are purely matters of style and are quite subjective.',
  'Possible Errors': 'The following rules point out areas where you might have made mistakes.',
  'Node.js and CommonJS': 'These rules are specific to JavaScript running on Node.js or using CommonJS in the browser.',
  'ECMAScript 6': 'These rules are only relevant to ES6 environments.',
  'Variables': 'These rules have to do with variable declarations.',
  'Best Practices': `These are rules designed to prevent you from making mistakes. They either
    prescribe a better way of doing something or help you avoid footguns.`
};
const rules: IRule[] = [
  {
    available: true,
    eslintRule: 'comma-dangle',
    tslintRule: 'trailing-comma',
    category: 'Possible Errors',
    description: 'disallow or enforce trailing commas (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/comma-dangle',
    tslintUrl: 'http://palantir.github.io/tslint/rules/trailing-comma',
    provider: 'native',
    usage: `~~~json
    "trailing-comma": [
      true,
      {
        "multiline": "never",
        "singleline": "never"
      }
    ]
    ~~~`
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
    usage: `~~~json
    "no-conditional-assignment": true
    ~~~`
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
    usage: `~~~json
    "no-console": [
      true,
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-constant-condition',
    tslintRule: 'no-constant-condition',
    category: 'Possible Errors',
    description: 'disallow use of constant expressions in conditions (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-constant-condition',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-constant-condition": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-control-regex',
    tslintRule: 'no-control-regex',
    category: 'Possible Errors',
    description: 'disallow control characters in regular expressions (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-control-regex',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-control-regex": true
    ~~~`
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
    usage: `~~~json
    "no-debugger": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-dupe-args',
    tslintRule: 'Not applicable',
    category: 'Possible Errors',
    description: 'disallow duplicate arguments in functions (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-dupe-args',
    tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
    provider: 'Not applicable',
    usage: ``
  },
  {
    available: true,
    eslintRule: 'no-dupe-keys',
    tslintRule: 'no-duplicate-key',
    category: 'Possible Errors',
    description: 'disallow duplicate keys when creating object literals (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-dupe-keys',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-duplicate-key',
    provider: 'native',
    usage: `~~~json
    "no-duplicate-key": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-duplicate-case',
    tslintRule: 'no-duplicate-case',
    category: 'Possible Errors',
    description: 'disallow a duplicate case label. (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-duplicate-case',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-duplicate-case": true
    ~~~`
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
    usage: `~~~json
    "no-empty": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-empty-character-class',
    tslintRule: 'no-empty-character-class',
    category: 'Possible Errors',
    description: 'disallow the use of empty character classes in regular expressions (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-empty-character-class',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-empty-character-class": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-ex-assign',
    tslintRule: 'no-ex-assign',
    category: 'Possible Errors',
    description: 'disallow assigning to the exception in a `catch` block (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-ex-assign',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-ex-assign": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-extra-boolean-cast',
    tslintRule: 'no-extra-boolean-cast',
    category: 'Possible Errors',
    description: 'disallow double-negation boolean casts in a boolean context (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-extra-boolean-cast',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-extra-boolean-cast": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-extra-parens',
    tslintRule: 'no-extra-parens',
    category: 'Possible Errors',
    description: 'disallow unnecessary parentheses',
    eslintUrl: 'http://eslint.org/docs/rules/no-extra-parens',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-extra-parens": [
      true,
      "functions"
    ]
    ~~~
    
    ~~~json
    "no-extra-parens": [
      true,
      "all"
    ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-extra-semi',
    tslintRule: 'no-extra-semi',
    category: 'Possible Errors',
    description: 'disallow unnecessary semicolons (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-extra-semi',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-extra-semi": true
    ~~~`
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
    usage: ``
  },
  {
    available: true,
    eslintRule: 'no-inner-declarations',
    tslintRule: 'no-inner-declarations',
    category: 'Possible Errors',
    description: 'disallow function or variable declarations in nested blocks (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-inner-declarations',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-inner-declarations": [
      true,
      "functions"
    ]
    ~~~

    ~~~json
    "no-inner-declarations": [
      true,
      "both"
    ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-invalid-regexp',
    tslintRule: 'no-invalid-regexp',
    category: 'Possible Errors',
    description: 'disallow invalid regular expression strings in the `RegExp` constructor (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-invalid-regexp',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-invalid-regexp": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-irregular-whitespace',
    tslintRule: 'no-irregular-whitespace',
    category: 'Possible Errors',
    description: 'disallow irregular whitespace outside of strings and comments (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-irregular-whitespace',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-irregular-whitespace": true
    ~~~`
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
    usage: ``
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
    usage: ``
  },
  {
    available: true,
    eslintRule: 'no-regex-spaces',
    tslintRule: 'no-regex-spaces',
    category: 'Possible Errors',
    description: 'disallow multiple spaces in a regular expression literal (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-regex-spaces',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-regex-spaces": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-sparse-arrays',
    tslintRule: 'no-sparse-arrays',
    category: 'Possible Errors',
    description: 'disallow sparse arrays (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-sparse-arrays',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-sparse-arrays": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-unexpected-multiline',
    tslintRule: 'no-unexpected-multiline',
    category: 'Possible Errors',
    description: 'Avoid code that looks like two expressions but is actually one',
    eslintUrl: 'http://eslint.org/docs/rules/no-unexpected-multiline',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-unexpected-multiline": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-unreachable',
    tslintRule: 'no-unreachable',
    category: 'Possible Errors',
    description: 'disallow unreachable statements after a return, throw, continue, or break statement (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-unreachable',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-unreachable',
    provider: 'native',
    usage: `~~~json
    "no-unreachable": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'use-isnan',
    tslintRule: 'use-isnan',
    category: 'Possible Errors',
    description: 'disallow comparisons with the value `NaN` (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/use-isnan',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "use-isnan": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'valid-jsdoc',
    tslintRule: 'valid-jsdoc',
    category: 'Possible Errors',
    description: 'Ensure JSDoc comments are valid',
    eslintUrl: 'http://eslint.org/docs/rules/valid-jsdoc',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "valid-jsdoc": [
      true,
      {
        "prefer": {
          "return": "returns"
        },
        "requireReturn": false,
        "requireParamDescription": true,
        "requireReturnDescription": true,
        "matchDescription": "^[A-Z][A-Za-z0-9\\\\s]*[.]$"
      }
    ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'valid-typeof',
    tslintRule: 'valid-typeof',
    category: 'Possible Errors',
    description: 'Ensure that the results of typeof are compared against a valid string (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/valid-typeof',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "valid-typeof": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'accessor-pairs',
    tslintRule: 'accessor-pairs',
    category: 'Best Practices',
    description: 'Enforces getter/setter pairs in objects',
    eslintUrl: 'http://eslint.org/docs/rules/accessor-pairs',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "accessor-pairs": [
      true,
      {
        "getWithoutSet" : true,
        "setWithoutGet" : true
      }
    ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'array-callback-return',
    tslintRule: 'array-callback-return',
    category: 'Best Practices',
    description: 'Enforce return statements in callbacks of array’s methods',
    eslintUrl: 'http://eslint.org/docs/rules/array-callback-return',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "array-callback-return": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'block-scoped-var',
    tslintRule: 'accessor-pairs',
    category: 'Best Practices',
    description: 'treat `var` statements as if they were block scoped',
    eslintUrl: 'http://eslint.org/docs/rules/block-scoped-var',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "block-scoped-var": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'complexity',
    tslintRule: 'complexity',
    category: 'Best Practices',
    description: 'specify the maximum cyclomatic complexity allowed in a program',
    eslintUrl: 'http://eslint.org/docs/rules/complexity',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "complexity": [
      true,
      3
    ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'consistent-return',
    tslintRule: 'consistent-return',
    category: 'Best Practices',
    description: 'require `return` statements to either always or never specify values',
    eslintUrl: 'http://eslint.org/docs/rules/consistent-return',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "consistent-return": true
    ~~~`
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
    usage: `~~~json
    "curly": true
    ~~~`
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
    usage: `~~~json
    "default-case": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'dot-location',
    tslintRule: 'dot-location',
    category: 'Best Practices',
    description: 'enforces consistent newlines before or after dots',
    eslintUrl: 'http://eslint.org/docs/rules/dot-location',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "dot-location": [
        true,
        "object"
      ]
    ~~~
    
    ~~~json
    "dot-location": [
        true,
        "property"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'dot-notation',
    tslintRule: 'dot-notation',
    category: 'Best Practices',
    description: 'encourages use of dot notation whenever possible',
    eslintUrl: 'http://eslint.org/docs/rules/dot-notation',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "dot-notation": [
        true,
        {
          "allowKeywords": true,
          "allowPattern": ""
        }
      ]
    ~~~`
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
    usage: `~~~json
    "eqeqeq": [
        true,
        "allow-null-check"
      ]
    ~~~`
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
    usage: `~~~json
    "forin": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-alert',
    tslintRule: 'no-alert',
    category: 'Best Practices',
    description: 'disallow the use of `alert`, `confirm`, and `prompt`',
    eslintUrl: 'http://eslint.org/docs/rules/no-alert',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-alert": true
    ~~~`
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
    usage: `~~~json
    "no-arg": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-case-declarations',
    tslintRule: 'no-case-declarations',
    category: 'Best Practices',
    description: 'disallow lexical declarations in case clauses',
    eslintUrl: 'http://eslint.org/docs/rules/no-case-declarations',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-case-declarations": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-div-regex',
    tslintRule: 'no-div-regex',
    category: 'Best Practices',
    description: 'disallow division operators explicitly at beginning of regular expression',
    eslintUrl: 'http://eslint.org/docs/rules/no-div-regex',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-div-regex": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-else-return',
    tslintRule: 'no-else-return',
    category: 'Best Practices',
    description: 'disallow `else` after a `return` in an `if`',
    eslintUrl: 'http://eslint.org/docs/rules/no-else-return',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-else-return": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-empty-function',
    tslintRule: 'no-empty-function',
    category: 'Best Practices',
    description: 'disallow use of empty functions',
    eslintUrl: 'http://eslint.org/docs/rules/no-empty-function',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-empty-function": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-empty-pattern',
    tslintRule: 'no-empty-pattern',
    category: 'Best Practices',
    description: 'disallow use of empty destructuring patterns',
    eslintUrl: 'http://eslint.org/docs/rules/no-empty-pattern',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-empty-pattern": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-eq-null',
    tslintRule: 'no-eq-null',
    category: 'Best Practices',
    description: 'disallow comparisons to null without a type-checking operator',
    eslintUrl: 'http://eslint.org/docs/rules/no-eq-null',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-eq-null": true
    ~~~`
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
    usage: `~~~json
    "no-eval": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-extend-native',
    tslintRule: 'no-extend-native',
    category: 'Best Practices',
    description: 'disallow adding to native types',
    eslintUrl: 'http://eslint.org/docs/rules/no-extend-native',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-extend-native": [
        true,
        {
          "exceptions": ["Object", "String"]
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-extra-bind',
    tslintRule: 'no-extra-bind',
    category: 'Best Practices',
    description: 'disallow unnecessary function binding',
    eslintUrl: 'http://eslint.org/docs/rules/no-extra-bind',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-extra-bind": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-extra-label',
    tslintRule: 'no-extra-label',
    category: 'Best Practices',
    description: 'disallow unnecessary labels',
    eslintUrl: 'http://eslint.org/docs/rules/no-extra-label',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-extra-label": true
    ~~~`
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
    usage: `~~~json
    "no-fallthrough": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-floating-decimal',
    tslintRule: 'no-floating-decimal',
    category: 'Best Practices',
    description: 'disallow the use of leading or trailing decimal points in numeric literals',
    eslintUrl: 'http://eslint.org/docs/rules/no-floating-decimal',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-floating-decimal": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-implicit-coercion',
    tslintRule: 'no-implicit-coercion',
    category: 'Best Practices',
    description: 'disallow the type conversions with shorter notations',
    eslintUrl: 'http://eslint.org/docs/rules/no-implicit-coercion',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-implicit-coercion": [
        true,
        {
          "boolean": true,
          "number": true,
          "string": true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-implicit-globals',
    tslintRule: 'no-implicit-globals',
    category: 'Best Practices',
    description: 'disallow var and named functions in global scope',
    eslintUrl: 'http://eslint.org/docs/rules/no-implicit-globals',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-implicit-coercion": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-implied-eval',
    tslintRule: 'no-implied-eval',
    category: 'Best Practices',
    description: 'disallow use of `eval()`-like methods',
    eslintUrl: 'http://eslint.org/docs/rules/no-implied-eval',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-implied-eval": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-invalid-this',
    tslintRule: 'no-invalid-this',
    category: 'Best Practices',
    description: 'disallow `this` keywords outside of classes or class-like objects',
    eslintUrl: 'http://eslint.org/docs/rules/no-invalid-this',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-invalid-this": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-iterator',
    tslintRule: 'no-iterator',
    category: 'Best Practices',
    description: 'disallow Usage of `__iterator__` property',
    eslintUrl: 'http://eslint.org/docs/rules/no-iterator',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-iterator": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-labels',
    tslintRule: 'no-labels',
    category: 'Best Practices',
    description: 'disallow use of labeled statements',
    eslintUrl: 'http://eslint.org/docs/rules/no-labels',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-labels": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-lone-blocks',
    tslintRule: 'no-lone-blocks',
    category: 'Best Practices',
    description: 'disallow unnecessary nested blocks',
    eslintUrl: 'http://eslint.org/docs/rules/no-lone-blocks',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-lone-blocks": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-loop-func',
    tslintRule: 'no-loop-func',
    category: 'Best Practices',
    description: 'disallow creation of functions within loops',
    eslintUrl: 'http://eslint.org/docs/rules/no-loop-func',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-loop-func": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-magic-numbers',
    tslintRule: 'no-magic-numbers',
    category: 'Best Practices',
    description: 'disallow the use of magic numbers',
    eslintUrl: 'http://eslint.org/docs/rules/no-magic-numbers',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-magic-numbers": [
        true,
        {
          "ignore": [0, 1, 2],
          "enforceConst": false,
          "detectObjects": false
        }
      ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-multi-spaces',
    tslintRule: 'no-multi-spaces',
    category: 'Best Practices',
    description: 'disallow use of multiple spaces',
    eslintUrl: 'http://eslint.org/docs/rules/no-multi-spaces',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-multi-spaces": [
        true,
        {
          "exceptions": { "PropertyAssignment": false, "OtherException": "true|false" }
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-multi-str',
    tslintRule: 'no-multi-str',
    category: 'Best Practices',
    description: 'disallow use of multiline strings',
    eslintUrl: 'http://eslint.org/docs/rules/no-multi-str',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-multi-str": true
    ~~~`
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
    usage: ``
  },
  {
    available: false,
    eslintRule: 'no-new',
    tslintRule: 'no-new',
    category: 'Best Practices',
    description: 'disallow use of the `new` operator when not part of an assignment or comparison',
    eslintUrl: 'http://eslint.org/docs/rules/no-new',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-new-func',
    tslintRule: 'no-new-func',
    category: 'Best Practices',
    description: 'disallow use of new operator for `Function` object',
    eslintUrl: 'http://eslint.org/docs/rules/no-new-func',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new-func": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-new-wrappers',
    tslintRule: 'no-new-wrappers',
    category: 'Best Practices',
    description: 'disallows creating new instances of `String`,`Number`, and `Boolean`',
    eslintUrl: 'http://eslint.org/docs/rules/no-new-wrappers',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new-wrappers": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-octal',
    tslintRule: 'Not applicable',
    category: 'Best Practices',
    description: 'disallow use of octal literals (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-octal',
    tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
    provider: 'Not applicable',
    usage: ``
  },
  {
    available: false,
    eslintRule: 'no-octal-escape',
    tslintRule: 'no-octal-escape',
    category: 'Best Practices',
    description: 'disallow use of octal escape sequences in string literals, such as `var foo = "Copyright \\251";`',
    eslintUrl: 'http://eslint.org/docs/rules/no-octal-escape',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-octal-escape": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-param-reassign',
    tslintRule: 'no-param-reassign',
    category: 'Best Practices',
    description: 'disallow reassignment of function parameters',
    eslintUrl: 'http://eslint.org/docs/rules/no-param-reassign',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-param-reassign": [
        true,
        {
          "props": false
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-proto',
    tslintRule: 'no-proto',
    category: 'Best Practices',
    description: 'disallow Usage of `__proto__` property',
    eslintUrl: 'http://eslint.org/docs/rules/no-proto',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-proto": true
    ~~~`
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
    usage: `~~~json
    "no-duplicate-variable": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-return-assign',
    tslintRule: 'no-return-assign',
    category: 'Best Practices',
    description: 'disallow use of assignment in `return` statement',
    eslintUrl: 'http://eslint.org/docs/rules/no-return-assign',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-return-assign": [
        true,
        "except-parens"
      ]
    ~~~
    
    ~~~json
     "no-return-assign": [
        true,
        "always"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-script-url',
    tslintRule: 'no-script-url',
    category: 'Best Practices',
    description: 'disallow use of `javascript:` urls.',
    eslintUrl: 'http://eslint.org/docs/rules/no-script-url',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-script-url": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-self-assign',
    tslintRule: 'no-self-assign',
    category: 'Best Practices',
    description: 'disallow assignments where both sides are exactly the same',
    eslintUrl: 'http://eslint.org/docs/rules/no-self-assign',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-self-assign": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-self-compare',
    tslintRule: 'no-self-compare',
    category: 'Best Practices',
    description: 'disallow comparisons where both sides are exactly the same',
    eslintUrl: 'http://eslint.org/docs/rules/no-self-compare',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-self-compare": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-sequences',
    tslintRule: 'no-sequences',
    category: 'Best Practices',
    description: 'disallow use of the comma operator',
    eslintUrl: 'http://eslint.org/docs/rules/no-sequences',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-sequences": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-throw-literal',
    tslintRule: 'no-throw-literal',
    category: 'Best Practices',
    description: 'restrict what can be thrown as an exception',
    eslintUrl: 'http://eslint.org/docs/rules/no-throw-literal',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-throw-literal": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-unmodified-loop-condition',
    tslintRule: 'no-unmodified-loop-condition',
    category: 'Best Practices',
    description: 'disallow unmodified conditions of loops',
    eslintUrl: 'http://eslint.org/docs/rules/no-unmodified-loop-condition',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-unmodified-loop-condition": true
    ~~~`
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
    usage: `~~~json
    "no-unused-expressions": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-unused-labels',
    tslintRule: 'no-unused-labels',
    category: 'Best Practices',
    description: 'disallow unused labels',
    eslintUrl: 'http://eslint.org/docs/rules/no-unused-labels',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-unused-labels": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-useless-call',
    tslintRule: 'no-useless-call',
    category: 'Best Practices',
    description: 'disallow unnecessary `.call()` and `.apply()`',
    eslintUrl: 'http://eslint.org/docs/rules/no-useless-call',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-useless-call": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-useless-concat',
    tslintRule: 'no-useless-concat',
    category: 'Best Practices',
    description: 'disallow unnecessary concatenation of literals or template literals',
    eslintUrl: 'http://eslint.org/docs/rules/no-useless-concat',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-useless-concat": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-useless-escape',
    tslintRule: 'no-useless-escape',
    category: 'Best Practices',
    description: 'disallow unnecessary usage of escape character',
    eslintUrl: 'http://eslint.org/docs/rules/no-useless-escape',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-useless-escape": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-void',
    tslintRule: 'no-void',
    category: 'Best Practices',
    description: 'disallow use of the `void` operator',
    eslintUrl: 'http://eslint.org/docs/rules/no-void',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-void":true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-warning-comments',
    tslintRule: 'no-warning-comments',
    category: 'Best Practices',
    description: 'disallow Usage of configurable warning terms in comments e.g. `TODO` or `FIXME`',
    eslintUrl: 'http://eslint.org/docs/rules/no-warning-comments',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-warning-comments": [
        true,
        {
          "terms": ["todo", "fixme", "xxx"],
          "location": "start"
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-with',
    tslintRule: 'no-with',
    category: 'Best Practices',
    description: 'disallow use of the `with` statement',
    eslintUrl: 'http://eslint.org/docs/rules/no-with',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-with": true
    ~~~`
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
    usage: `~~~json
    "radix": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'vars-on-top',
    tslintRule: 'vars-on-top',
    category: 'Best Practices',
    description: 'require declaration of all vars at the top of their containing scope',
    eslintUrl: 'http://eslint.org/docs/rules/vars-on-top',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "vars-on-top": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'wrap-iife',
    tslintRule: 'wrap-iife',
    category: 'Best Practices',
    description: 'require immediate function invocation to be wrapped in parentheses',
    eslintUrl: 'http://eslint.org/docs/rules/wrap-iife',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "wrap-iife": [
        true,
        "inside"
      ]
    ~~~
    
    ~~~json
    "wrap-iife": [
        true,
        "outside"
      ]
    ~~~
    
    ~~~json
    "wrap-iife": [
        true,
        "any"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'yoda',
    tslintRule: 'yoda',
    category: 'Best Practices',
    description: 'require or disallow Yoda conditions',
    eslintUrl: 'http://eslint.org/docs/rules/yoda',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "yoda": [
        true,
        "never"
      ]
    ~~~
    
    ~~~json
    "yoda": [
        true,
        "always"
      ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'strict',
    tslintRule: 'use-strict',
    category: 'Strict Mode',
    description: 'require effective use of strict mode directives',
    eslintUrl: 'http://eslint.org/docs/rules/strict',
    tslintUrl: 'http://palantir.github.io/tslint/rules/use-strict',
    provider: 'native',
    usage: ''
  },
  {
    available: false,
    eslintRule: 'init-declarations',
    tslintRule: 'init-declarations',
    category: 'Variables',
    description: 'enforce or disallow variable initializations at definition',
    eslintUrl: 'http://eslint.org/docs/rules/init-declarations',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "init-declarations": [
        true,
        "always"
        {
          "ignoreForLoopInit": false
        }
      ]
    ~~~
    
    ~~~json
    "init-declarations": [
        true,
        "never"
        {
          "ignoreForLoopInit": false
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-catch-shadow',
    tslintRule: 'no-catch-shadow',
    category: 'Variables',
    description: 'disallow the catch clause parameter name being the same as a variable in the outer scope',
    eslintUrl: 'http://eslint.org/docs/rules/no-catch-shadow',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-catch-shadow": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-delete-var',
    tslintRule: 'Not applicable',
    category: 'Variables',
    description: 'disallow deletion of variables (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-delete-var',
    tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
    provider: 'Not applicable',
    usage: ``
  },
  {
    available: false,
    eslintRule: 'no-label-var',
    tslintRule: 'no-label-var',
    category: 'Variables',
    description: 'disallow labels that share a name with a variable',
    eslintUrl: 'http://eslint.org/docs/rules/no-label-var',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-label-var": true
    ~~~`
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
    usage: `~~~json
    "no-shadowed-variable": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-shadow-restricted-names',
    tslintRule: 'no-shadow-restricted-names',
    category: 'Variables',
    description: 'disallow shadowing of names such as `arguments`',
    eslintUrl: 'http://eslint.org/docs/rules/no-shadow-restricted-names',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-shadow-restricted-names": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-undef',
    tslintRule: 'Not applicable',
    category: 'Variables',
    description: 'disallow use of undeclared variables unless mentioned in a `/*global */` block (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-undef',
    tslintUrl: 'http://palantir.github.io/tslint/rules/Not applicable',
    provider: 'Not applicable',
    usage: ``
  },
  {
    available: false,
    eslintRule: 'no-undef-init',
    tslintRule: 'no-undef-init',
    category: 'Variables',
    description: 'disallow use of undefined when initializing variables',
    eslintUrl: 'http://eslint.org/docs/rules/no-undef-init',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-undef-init": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-undefined',
    tslintRule: 'no-undefined',
    category: 'Variables',
    description: 'disallow use of `undefined` variable',
    eslintUrl: 'http://eslint.org/docs/rules/no-undefined',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-undefined": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-unused-vars',
    tslintRule: 'no-unused-variable',
    category: 'Variables',
    description: 'disallow declaration of variables that are not used in the code (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-unused-vars',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-unused-variable',
    provider: 'native',
    usage: `~~~json
    "no-unused-variable": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-use-before-define',
    tslintRule: 'no-use-before-define',
    category: 'Variables',
    description: 'disallow use of variables before they are defined',
    eslintUrl: 'http://eslint.org/docs/rules/no-use-before-define',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-use-before-define',
    provider: 'native',
    usage: `~~~json
    "no-use-before-define": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'callback-return',
    tslintRule: 'callback-return',
    category: 'Node.js and CommonJS',
    description: 'enforce `return` after a callback',
    eslintUrl: 'http://eslint.org/docs/rules/callback-return',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "callback-return": [
        true,
        [
          "callback",
          "cb",
          "next"
        ]
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'global-require',
    tslintRule: 'global-require',
    category: 'Node.js and CommonJS',
    description: 'enforce `require()` on top-level module scope',
    eslintUrl: 'http://eslint.org/docs/rules/global-require',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "global-require": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'handle-callback-err',
    tslintRule: 'handle-callback-err',
    category: 'Node.js and CommonJS',
    description: 'enforce error handling in callbacks',
    eslintUrl: 'http://eslint.org/docs/rules/handle-callback-err',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "handle-callback-err": [
        true,
        "^(err|error|anySpecificError)$"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-mixed-requires',
    tslintRule: 'no-mixed-requires',
    category: 'Node.js and CommonJS',
    description: 'disallow mixing regular variable and require declarations',
    eslintUrl: 'http://eslint.org/docs/rules/no-mixed-requires',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-mixed-requires": [
        true,
        {
          "grouping": false
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-new-require',
    tslintRule: 'no-new-require',
    category: 'Node.js and CommonJS',
    description: 'disallow use of `new` operator with the `require` function',
    eslintUrl: 'http://eslint.org/docs/rules/no-new-require',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new-require": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-path-concat',
    tslintRule: 'no-path-concat',
    category: 'Node.js and CommonJS',
    description: 'disallow string concatenation with `__dirname` and `__filename`',
    eslintUrl: 'http://eslint.org/docs/rules/no-path-concat',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-path-concat": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-process-env',
    tslintRule: 'no-process-env',
    category: 'Node.js and CommonJS',
    description: 'disallow use of `process.env`',
    eslintUrl: 'http://eslint.org/docs/rules/no-process-env',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-process-env": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-process-exit',
    tslintRule: 'no-process-exit',
    category: 'Node.js and CommonJS',
    description: 'disallow `process.exit()`',
    eslintUrl: 'http://eslint.org/docs/rules/no-process-exit',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-process-exit": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-restricted-modules',
    tslintRule: 'no-restricted-modules',
    category: 'Node.js and CommonJS',
    description: 'restrict Usage of specified node modules',
    eslintUrl: 'http://eslint.org/docs/rules/no-restricted-modules',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-restricted-modules": [
        true,
        [
          "fs",
          "cluster",
          "moduleName"
        ]
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-sync',
    tslintRule: 'no-sync',
    category: 'Node.js and CommonJS',
    description: 'disallow use of synchronous methods',
    eslintUrl: 'http://eslint.org/docs/rules/no-sync',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-sync": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'array-bracket-spacing',
    tslintRule: 'array-bracket-spacing',
    category: 'Stylistic Issues',
    description: 'enforce spacing inside array brackets',
    eslintUrl: 'http://eslint.org/docs/rules/array-bracket-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "array-bracket-spacing": [
        true,
        "always",
        {
          "singleValue": false,
          "objectsInArrays": false,
          "arraysInArrays": false
        }
      ]
    ~~~
    
    ~~~json
    "array-bracket-spacing": [
        true,
        "never",
        {
          "singleValue": true,
          "objectsInArrays": true,
          "arraysInArrays": true
        }
      ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'block-spacing',
    tslintRule: 'block-spacing',
    category: 'Stylistic Issues',
    description: 'disallow or enforce spaces inside of single line blocks',
    eslintUrl: 'http://eslint.org/docs/rules/block-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "block-spacing": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "block-spacing": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'brace-style',
    tslintRule: 'brace-style',
    category: 'Stylistic Issues',
    description: 'enforce one true brace style',
    eslintUrl: 'http://eslint.org/docs/rules/brace-style',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "brace-style": [
        true,
        "1tbs",
        {
          "allowSingleLine": true
        }
      ]
    ~~~
    
    ~~~json
    "brace-style": [
        true,
        "stroustrup",
        {
          "allowSingleLine": true
        }
      ]
    ~~~
    
    ~~~json
    "brace-style": [
        true,
        "allman",
        {
          "allowSingleLine": true
        }
      ]
    ~~~`
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
    usage: `~~~json
    "variable-name": [
        true,
        "check-format"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'comma-spacing',
    tslintRule: 'comma-spacing',
    category: 'Stylistic Issues',
    description: 'enforce spacing before and after comma',
    eslintUrl: 'http://eslint.org/docs/rules/comma-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "comma-spacing": [
        true,
        {
          "before": false,
          "after": true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'comma-style',
    tslintRule: 'comma-style',
    category: 'Stylistic Issues',
    description: 'enforce one true comma style',
    eslintUrl: 'http://eslint.org/docs/rules/comma-style',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "comma-style": [
        true,
        "first"
      ]
    ~~~
    
    ~~~json
    "comma-style": [
        true,
        "last"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'computed-property-spacing',
    tslintRule: 'computed-property-spacing',
    category: 'Stylistic Issues',
    description: 'require or disallow padding inside computed properties',
    eslintUrl: 'http://eslint.org/docs/rules/computed-property-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "computed-property-spacing": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "computed-property-spacing": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'consistent-this',
    tslintRule: 'consistent-this',
    category: 'Stylistic Issues',
    description: 'enforce consistent naming when capturing the current execution context',
    eslintUrl: 'http://eslint.org/docs/rules/consistent-this',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "consistent-this": [
        true,
        "self"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'eol-last',
    tslintRule: 'eol-last',
    category: 'Stylistic Issues',
    description: 'enforce newline at the end of file, with no multiple empty lines',
    eslintUrl: 'http://eslint.org/docs/rules/eol-last',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "eol-last": [
        true,
        "unix"
      ]
    ~~~
    
    ~~~json
    "eol-last": [
        true,
        "windows"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'func-names',
    tslintRule: 'func-names',
    category: 'Stylistic Issues',
    description: 'require function expressions to have a name',
    eslintUrl: 'http://eslint.org/docs/rules/func-names',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "func-names": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'func-style',
    tslintRule: 'func-style',
    category: 'Stylistic Issues',
    description: 'enforce use of function declarations or expressions',
    eslintUrl: 'http://eslint.org/docs/rules/func-style',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "func-style": [
        true,
        "declaration"
        {
          "allowArrowFunctions": true
        }
      ]
    ~~~
    
    ~~~json
    "func-style": [
        true,
        "expression"
        {
          "allowArrowFunctions": true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'id-blacklist',
    tslintRule: 'id-blacklist',
    category: 'Stylistic Issues',
    description: 'disallow certain identifiers to prevent them being used',
    eslintUrl: 'http://eslint.org/docs/rules/id-blacklist',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "id-blacklist": [
        true,
        ["error", "data", "err", "e", "cb", "callback"]
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'id-length',
    tslintRule: 'id-length',
    category: 'Stylistic Issues',
    description: 'this option enforces minimum and maximum identifier lengths (variable names, property names etc.)',
    eslintUrl: 'http://eslint.org/docs/rules/id-length',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "id-length": [
        true,
        {
          "min": 2,
          "max": 10,
          "properties": "always",
          "exceptions": [ "x", "bolinha" ]
        }
      ]
    ~~~
    
    ~~~json
    "id-length": [
        true,
        {
          "min": 2,
          "max": 10,
          "properties": "never",
          "exceptions": [ "x", "bolinha" ]
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'id-match',
    tslintRule: 'id-match',
    category: 'Stylistic Issues',
    description: 'require identifiers to match the provided regular expression',
    eslintUrl: 'http://eslint.org/docs/rules/id-match',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "id-match": [
        true,
        "^[a-z]+([A-Z][a-z]+)*$",
        {
          "properties": false
        }
      ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'indent',
    tslintRule: 'indent',
    category: 'Stylistic Issues',
    description: 'specify tab or space width for your code',
    eslintUrl: 'http://eslint.org/docs/rules/indent',
    tslintUrl: 'http://palantir.github.io/tslint/rules/indent',
    provider: 'native',
    usage: `~~~json
    "indent": [
        true,
        "spaces"
      ]
    ~~~
    
    ~~~json
    "indent": [
        true,
        "tabs"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'jsx-quotes',
    tslintRule: 'jsx-quotes',
    category: 'Stylistic Issues',
    description: 'specify whether double or single quotes should be used in JSX attributes',
    eslintUrl: 'http://eslint.org/docs/rules/jsx-quotes',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "jsx-quotes": [
        true,
        "prefer-double"
      ]
    ~~~
    
    ~~~json
    "jsx-quotes": [
        true,
        "prefer-single"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'key-spacing',
    tslintRule: 'key-spacing',
    category: 'Stylistic Issues',
    description: 'enforce spacing between keys and values in object literal properties',
    eslintUrl: 'http://eslint.org/docs/rules/key-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "key-spacing": [
        true,
        {
          "align": "value",
          "beforeColon": false,
          "afterColon": true,
          "mode": "minimum"
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'keyword-spacing',
    tslintRule: 'keyword-spacing',
    category: 'Stylistic Issues',
    description: 'enforce spacing before and after keywords',
    eslintUrl: 'http://eslint.org/docs/rules/keyword-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
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
    ~~~`
  },
  {
    available: false,
    eslintRule: 'linebreak-style',
    tslintRule: 'linebreak-style',
    category: 'Stylistic Issues',
    description: "disallow mixed 'LF' and 'CRLF' as linebreaks",
    eslintUrl: 'http://eslint.org/docs/rules/linebreak-style',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "linebreak-style": [
        true,
        "unix"
      ]
    ~~~
    
    ~~~json
    "linebreak-style": [
        true,
        "windows"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'lines-around-comment',
    tslintRule: 'lines-around-comment',
    category: 'Stylistic Issues',
    description: 'enforce empty lines around comments',
    eslintUrl: 'http://eslint.org/docs/rules/lines-around-comment',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
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
    ~~~`
  },
  {
    available: false,
    eslintRule: 'max-depth',
    tslintRule: 'max-depth',
    category: 'Stylistic Issues',
    description: 'specify the maximum depth that blocks can be nested',
    eslintUrl: 'http://eslint.org/docs/rules/max-depth',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "max-depth": [
        true,
        10
      ]
    ~~~
    
    ~~~json
    "max-depth": [
        true,
        {
          "maximum": 10
        }
      ]
    ~~~`
  },
  {
    available: true,
    eslintRule: 'max-len',
    tslintRule: 'max-line-length',
    category: 'Stylistic Issues',
    description: 'specify the maximum length of a line in your program',
    eslintUrl: 'http://eslint.org/docs/rules/max-len',
    tslintUrl: 'http://palantir.github.io/tslint/rules/max-line-length',
    provider: 'native',
    usage: ''
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
    usage: `~~~json
    "max-nested-callbacks": [
        true,
        3
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'max-params',
    tslintRule: 'max-params',
    category: 'Stylistic Issues',
    description: 'specify the number of parameters that can be used in the function declaration',
    eslintUrl: 'http://eslint.org/docs/rules/max-params',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "max-params": [
        true,
        2
      ]
    ~~~
    
    ~~~json
    "max-params": [
        true,
        {
          "maximum": 2
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'max-statements',
    tslintRule: 'max-statements',
    category: 'Stylistic Issues',
    description: 'specify the maximum number of statement allowed in a function',
    eslintUrl: 'http://eslint.org/docs/rulesmax-statements',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "max-statements": [
        true,
        10,
        {
          "ignoreTopLevelFunctions": true
        }
      ]
    ~~~
    
    ~~~json
    "max-statements": [
        true,
        {
          "maximum": 10
        },
        {
          "ignoreTopLevelFunctions": true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'max-statements-per-line',
    tslintRule: 'max-statements-per-line',
    category: 'Stylistic Issues',
    description: 'specify the maximum number of statements allowed per line',
    eslintUrl: 'http://eslint.org/docs/max-statements-per-line',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "max-statements-per-line": [
        true,
        1
      ]
    ~~~
    
    ~~~json
    "max-statements-per-line": [
        true,
        {
          "max": 1
        }
      ]
    ~~~`
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
    usage: ``
  },
  {
    available: false,
    eslintRule: 'new-parens',
    tslintRule: 'new-parens',
    category: 'Stylistic Issues',
    description: 'disallow the omission of parentheses when invoking a constructor with no arguments',
    eslintUrl: 'http://eslint.org/docs/rules/new-parens',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "new-parens": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'newline-after-var',
    tslintRule: 'newline-after-var',
    category: 'Stylistic Issues',
    description: 'require or disallow an empty newline after variable declarations',
    eslintUrl: 'http://eslint.org/docs/rules/newline-after-var',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "newline-after-var": [
        true,
        "never"
      ]
    ~~~
    
    ~~~json
    "newline-after-var": [
        true,
        "always"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'newline-before-return',
    tslintRule: 'newline-before-return',
    category: 'Stylistic Issues',
    description: 'require newline before return statement',
    eslintUrl: 'http://eslint.org/docs/rules/newline-before-return',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "newline-before-return": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'newline-per-chained-call',
    tslintRule: 'newline-per-chained-call',
    category: 'Stylistic Issues',
    description: 'enforce newline after each call when chaining the calls',
    eslintUrl: 'http://eslint.org/docs/rules/newline-per-chained-call',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "newline-per-chained-call": [
        true,
        {
          "ignoreChainWithDepth": 3
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-array-constructor',
    tslintRule: 'no-array-constructor',
    category: 'Stylistic Issues',
    description: 'disallow use of the `Array` constructor',
    eslintUrl: 'http://eslint.org/docs/rules/no-array-constructor',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-array-constructor": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-continue',
    tslintRule: 'no-continue',
    category: 'Stylistic Issues',
    description: 'disallow use of the `continue` statement',
    eslintUrl: 'http://eslint.org/docs/rules/no-continue',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-continue": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-inline-comments',
    tslintRule: 'no-inline-comments',
    category: 'Stylistic Issues',
    description: 'disallow comments inline after code',
    eslintUrl: 'http://eslint.org/docs/rules/no-inline-comments',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-inline-comments": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-lonely-if',
    tslintRule: 'no-lonely-if',
    category: 'Stylistic Issues',
    description: 'disallow `if` as the only statement in an `else` block',
    eslintUrl: 'http://eslint.org/docs/rules/no-lonely-if',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-lonely-if": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'no-mixed-spaces-and-tabs',
    tslintRule: 'ident',
    category: 'Stylistic Issues',
    description: 'disallow mixed spaces and tabs for indentation (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-mixed-spaces-and-tabs',
    tslintUrl: 'http://palantir.github.io/tslint/rules/ident',
    provider: 'native',
    usage: `~~~json
    "ident": "spaces"
    ~~~
    
    ~~~json
    "ident": "tabs"
    ~~~`,
    note: `When using TSLint \`ident\` rule, it will enforce the consistent use of the chosen
    indentation. The ESLint rule allows an option for Smart Tabs, but there are some open issues,
    and we're not going to support this.`
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
    usage: `~~~json
    "no-negated-condition": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-nested-ternary',
    tslintRule: 'no-nested-ternary',
    category: 'Stylistic Issues',
    description: 'disallow nested ternary expressions',
    eslintUrl: 'http://eslint.org/docs/rules/no-nested-ternary',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-nested-ternary": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-new-object',
    tslintRule: 'no-new-object',
    category: 'Stylistic Issues',
    description: 'disallow the use of the `Object` constructor',
    eslintUrl: 'http://eslint.org/docs/rules/no-new-object',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new-object": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-restricted-syntax',
    tslintRule: 'no-restricted-syntax',
    category: 'Stylistic Issues',
    description: 'disallow use of certain syntax in code',
    eslintUrl: 'http://eslint.org/docs/rules/no-restricted-syntax',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-restricted-syntax": [
        true,
        "FunctionExpression",
        "WithStatement"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-spaced-func',
    tslintRule: 'no-spaced-func',
    category: 'Stylistic Issues',
    description: 'disallow space between function identifier and application',
    eslintUrl: 'http://eslint.org/docs/rules/no-spaced-func',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-spaced-func": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-ternary',
    tslintRule: 'no-ternary',
    category: 'Stylistic Issues',
    description: 'disallow the use of ternary operators',
    eslintUrl: 'http://eslint.org/docs/rules/no-ternary',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-ternary": true
    ~~~`
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
    usage: `~~~json
    "no-trailing-whitespace": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-underscore-dangle',
    tslintRule: 'no-underscore-dangle',
    category: 'Stylistic Issues',
    description: 'disallow dangling underscores in identifiers',
    eslintUrl: 'http://eslint.org/docs/rules/no-underscore-dangle',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-underscore-dangle": [
        true,
        {
          "allow": ["foo_", "_bar"]
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-unneeded-ternary',
    tslintRule: 'no-unneeded-ternary',
    category: 'Stylistic Issues',
    description: 'disallow the use of ternary operators when a simpler alternative exists',
    eslintUrl: 'http://eslint.org/docs/rules/no-unneeded-ternary',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-unneeded-ternary": [
        true,
        {
          "defaultAssignment": true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-whitespace-before-property',
    tslintRule: 'no-whitespace-before-property',
    category: 'Stylistic Issues',
    description: 'disallow whitespace before properties',
    eslintUrl: 'http://eslint.org/docs/rules/no-whitespace-before-property',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-whitespace-before-property": true
    ~~~`
  },
  {
    available: true,
    eslintRule: 'object-curly-spacing',
    tslintRule: 'object-curly-spacing',
    category: 'Stylistic Issues',
    description: 'require or disallow padding inside curly braces',
    eslintUrl: 'http://eslint.org/docs/rules/object-curly-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "object-curly-spacing": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "object-curly-spacing": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'one-var',
    tslintRule: 'one-var',
    category: 'Stylistic Issues',
    description: 'require or disallow one variable declaration per function',
    eslintUrl: 'http://eslint.org/docs/rules/one-var',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "one-var": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "one-var": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'one-var-declaration-per-line',
    tslintRule: 'one-var-declaration-per-line',
    category: 'Stylistic Issues',
    description: 'require or disallow a newline around variable declarations',
    eslintUrl: 'http://eslint.org/docs/rules/one-var-declaration-per-line',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "one-var-declaration-per-line": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "one-var-declaration-per-line": [
        true,
        "initializations"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'operator-assignment',
    tslintRule: 'operator-assignment',
    category: 'Stylistic Issues',
    description: 'require assignment operator shorthand where possible or prohibit it entirely',
    eslintUrl: 'http://eslint.org/docs/rules/operator-assignment',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "operator-assignment": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "operator-assignment": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'operator-linebreak',
    tslintRule: 'operator-linebreak',
    category: 'Stylistic Issues',
    description: 'enforce operators to be placed before or after line breaks',
    eslintUrl: 'http://eslint.org/docs/rules/operator-linebreak',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "operator-linebreak": [
        true,
        "before",
        {
          "overrides": { "?": "after"}
        }
      ]
    ~~~
    
    ~~~json
    "operator-linebreak": [
        true,
        "after",
        {
          "overrides": { "?": "after"}
        }
      ]
    ~~~
    
    ~~~json
    "operator-linebreak": [
        true,
        "none",
        {
          "overrides": { "?": "none", "+=": "none"}
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'padded-blocks',
    tslintRule: 'padded-blocks',
    category: 'Stylistic Issues',
    description: 'enforce padding within blocks',
    eslintUrl: 'http://eslint.org/docs/rules/padded-blocks',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "padded-blocks": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "padded-blocks": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'quote-props',
    tslintRule: 'quote-props',
    category: 'Stylistic Issues',
    description: 'require quotes around object literal property names',
    eslintUrl: 'http://eslint.org/docs/rules/quote-props',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "quote-props": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "quote-props": [
        true,
        "as-needed"
      ]
    ~~~
    
    ~~~json
    "quote-props": [
        true,
        "consistent"
      ]
    ~~~
    
    ~~~json
    "quote-props": [
        true,
        "consistent-as-needed"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'quotes',
    tslintRule: 'quote-props',
    category: 'Stylistic Issues',
    description: 'specify whether backticks, double or single quotes should be used',
    eslintUrl: 'http://eslint.org/docs/rules/quotes',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "quotes": [
        true,
        "single"
      ]
    ~~~
    
    ~~~json
    "quotes": [
        true,
        "single",
        "avoid-escape"
      ]
    ~~~
    
    ~~~json
    "quotes": [
        true,
        "double"
      ]
    ~~~
    
    ~~~json
    "quotes": [
        true,
        "double",
        "avoid-escape"
      ]
    ~~~
    
    ~~~json
    "quotes": [
        true,
        "backtick"
      ]
    ~~~
    
    ~~~json
    "quotes": [
        true,
        "backtick",
        "avoid-escape"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'require-jsdoc',
    tslintRule: 'require-jsdoc',
    category: 'Stylistic Issues',
    description: 'Require JSDoc comment',
    eslintUrl: 'http://eslint.org/docs/rules/require-jsdoc',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
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
    ~~~`
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
    usage: `~~~json
    "semi-spacing": [
        true,
        {
          "before": false,
          "after": true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'sort-imports',
    tslintRule: 'sort-imports',
    category: 'Stylistic Issues',
    description: 'enforce sorting import declarations within module',
    eslintUrl: 'http://eslint.org/docs/rules/sort-imports',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
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
    ~~~`
  },
  {
    available: false,
    eslintRule: 'sort-vars',
    tslintRule: 'sort-vars',
    category: 'Stylistic Issues',
    description: 'sort variables within the same declaration block',
    eslintUrl: 'http://eslint.org/docs/rules/sort-vars',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "sort-vars": [
        true,
        {
          "ignoreCase": false
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'space-before-blocks',
    tslintRule: 'space-before-blocks',
    category: 'Stylistic Issues',
    description: 'require or disallow a space before blocks',
    eslintUrl: 'http://eslint.org/docs/rules/space-before-blocks',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "space-before-blocks": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "space-before-blocks": [
        true,
        "never"
      ]
    ~~~
    
    ~~~json
    "space-before-blocks": [
        true,
        {
          "functions": "never",
          "keywords": "always"
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'space-before-function-paren',
    tslintRule: 'space-before-function-paren',
    category: 'Stylistic Issues',
    description: 'require or disallow a space before function opening parenthesis',
    eslintUrl: 'http://eslint.org/docs/rules/space-before-function-paren',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "space-before-function-paren": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "space-before-function-paren": [
        true,
        "never"
      ]
    ~~~
    
    ~~~json
    "space-before-function-paren": [
        true,
        {
          "anonymous": "always",
          "named": "never"
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'space-in-parens',
    tslintRule: 'space-in-parens',
    category: 'Stylistic Issues',
    description: 'require or disallow spaces inside parentheses',
    eslintUrl: 'http://eslint.org/docs/rules/space-in-parens',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "space-in-parens": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "space-in-parens": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'space-infix-ops',
    tslintRule: 'space-infix-ops',
    category: 'Stylistic Issues',
    description: 'require spaces around operators',
    eslintUrl: 'http://eslint.org/docs/rules/space-infix-ops',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "space-infix-ops": [
        true,
        {
          "int32Hint": false
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'space-unary-ops',
    tslintRule: 'space-unary-ops',
    category: 'Stylistic Issues',
    description: 'require or disallow spaces before/after unary operators',
    eslintUrl: 'http://eslint.org/docs/rules/space-unary-ops',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "space-unary-ops": [
        true,
        {
          "words": true,
          "nonwords": false
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'spaced-comment',
    tslintRule: 'spaced-comment',
    category: 'Stylistic Issues',
    description: 'require or disallow a space immediately following the `//` or `/*` in a comment',
    eslintUrl: 'http://eslint.org/docs/rules/spaced-comment',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "spaced-comment": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "spaced-comment": [
        true,
        "never"
      ]
    ~~~
    
    ~~~json
    "spaced-comment": [
        true,
        "always",
        {
          "exceptions": ["-", "+"]
        }
      ]
    ~~~
    
    ~~~json
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
    ~~~`
  },
  {
    available: false,
    eslintRule: 'wrap-regex',
    tslintRule: 'wrap-regex',
    category: 'Stylistic Issues',
    description: 'require regex literals to be wrapped in parentheses',
    eslintUrl: 'http://eslint.org/docs/rules/wrap-regex',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "wrap-regex": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'arrow-body-style',
    tslintRule: 'arrow-body-style',
    category: 'ECMAScript 6',
    description: 'require braces in arrow function body',
    eslintUrl: 'http://eslint.org/docs/rules/arrow-body-style',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "arrow-body-style": [
        true,
        "as-needed"
      ]
    ~~~
    
    ~~~json
    "arrow-body-style": [
        true,
        "always"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'arrow-parens',
    tslintRule: 'arrow-parens',
    category: 'ECMAScript 6',
    description: 'require parens in arrow function arguments',
    eslintUrl: 'http://eslint.org/docs/rules/arrow-parens',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "arrow-parens": [
        true,
        "as-needed"
      ]
    ~~~
    
    ~~~json
    "arrow-parens": [
        true,
        "always"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'arrow-spacing',
    tslintRule: 'arrow-spacing',
    category: 'ECMAScript 6',
    description: "require space before/after arrow function's arrow",
    eslintUrl: 'http://eslint.org/docs/rules/arrow-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "arrow-spacing": [
        true,
        {
          "before": true,
          "after": true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'constructor-super',
    tslintRule: 'constructor-super',
    category: 'ECMAScript 6',
    description: 'verify calls of `super()` in constructors',
    eslintUrl: 'http://eslint.org/docs/rules/constructor-super',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "constructor-super": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'generator-star-spacing',
    tslintRule: 'generator-star-spacing',
    category: 'ECMAScript 6',
    description: 'enforce spacing around the `*` in generator functions',
    eslintUrl: 'http://eslint.org/docs/rules/generator-star-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "generator-star-spacing": [
        true,
        {
          "before": true,
          "after": true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-class-assign',
    tslintRule: 'no-class-assign',
    category: 'ECMAScript 6',
    description: 'disallow modifying variables of class declarations',
    eslintUrl: 'http://eslint.org/docs/rules/no-class-assign',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-class-assign": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-confusing-arrow',
    tslintRule: 'no-confusing-arrow',
    category: 'ECMAScript 6',
    description: 'disallow arrow functions where they could be confused with comparisons',
    eslintUrl: 'http://eslint.org/docs/rules/no-confusing-arrow',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-confusing-arrow": [
        true,
        {
          "allowParens": false
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-const-assign',
    tslintRule: 'no-const-assign',
    category: 'ECMAScript 6',
    description: 'disallow modifying variables that are declared using `const`',
    eslintUrl: 'http://eslint.org/docs/rules/no-const-assign',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-const-assign": true
    ~~~`
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
    usage: ``
  },
  {
    available: false,
    eslintRule: 'no-duplicate-imports',
    tslintRule: 'no-duplicate-imports',
    category: 'ECMAScript 6',
    description: 'disallow duplicate module imports',
    eslintUrl: 'http://eslint.org/docs/rules/no-duplicate-imports',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-duplicate-imports": [
        true,
        {
          includeExports: true
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-new-symbol',
    tslintRule: 'no-new-symbol',
    category: 'ECMAScript 6',
    description: 'disallow use of the `new` operator with the `Symbol` object',
    eslintUrl: 'http://eslint.org/docs/rules/no-new-symbol',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new-symbol": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-restricted-imports',
    tslintRule: 'no-restricted-imports',
    category: 'ECMAScript 6',
    description: 'restrict usage of specified modules when loaded by `import` declaration',
    eslintUrl: 'http://eslint.org/docs/rules/no-restricted-imports',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-restricted-imports": [
        true,
        "import1",
        "import2"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-this-before-super',
    tslintRule: 'no-this-before-super',
    category: 'ECMAScript 6',
    description: 'disallow use of `this`/`super` before calling `super()` in constructors.',
    eslintUrl: 'http://eslint.org/docs/rules/no-this-before-super',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-this-before-super": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'no-useless-constructor',
    tslintRule: 'no-useless-constructor',
    category: 'ECMAScript 6',
    description: 'disallow unnecessary constructor',
    eslintUrl: 'http://eslint.org/docs/rules/no-useless-constructor',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-useless-constructor": true
    ~~~`
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
    usage: `~~~json
    "no-var-keyword": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'object-shorthand',
    tslintRule: 'object-shorthand',
    category: 'ECMAScript 6',
    description: 'require method and property shorthand syntax for object literals',
    eslintUrl: 'http://eslint.org/docs/rules/object-shorthand',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "object-shorthand": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "object-shorthand": [
        true,
        "methods"
      ]
    ~~~
    
    ~~~json
    "object-shorthand": [
        true,
        "properties"
      ]
    ~~~
    
    ~~~json
    "object-shorthand": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'prefer-arrow-callback',
    tslintRule: 'prefer-arrow-callback',
    category: 'ECMAScript 6',
    description: 'suggest using arrow functions as callbacks',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-arrow-callback',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-arrow-callback": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'prefer-const',
    tslintRule: 'prefer-const',
    category: 'ECMAScript 6',
    description: 'suggest using `const` declaration for variables that are never modified after declared',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-const',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-const": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'prefer-reflect',
    tslintRule: 'prefer-reflect',
    category: 'ECMAScript 6',
    description: 'suggest using Reflect methods where applicable',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-reflect',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-reflect": [
        true,
        {
          "exceptions": [
            "apply",
            "call",
            "defineProperty",
            "getOwnPropertyDescriptor",
            "getPrototypeOf",
            "setPrototypeOf",
            "isExtensible",
            "getOwnPropertyNames",
            "preventExtensions",
            "delete"
          ]
        }
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'prefer-rest-params',
    tslintRule: 'prefer-rest-params',
    category: 'ECMAScript 6',
    description: 'suggest using the rest parameters instead of `arguments`',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-rest-params',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-rest-params": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'prefer-spread',
    tslintRule: 'prefer-spread',
    category: 'ECMAScript 6',
    description: 'suggest using the spread operator instead of `.apply()`.',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-spread',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-spread": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'prefer-template',
    tslintRule: 'prefer-template',
    category: 'ECMAScript 6',
    description: 'suggest using template literals instead of strings concatenation',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-template',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-template": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'require-yield',
    tslintRule: 'require-yield',
    category: 'ECMAScript 6',
    description: 'disallow generator functions that do not have `yield`',
    eslintUrl: 'http://eslint.org/docs/rules/require-yield',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "require-yield": true
    ~~~`
  },
  {
    available: false,
    eslintRule: 'template-curly-spacing',
    tslintRule: 'template-curly-spacing',
    category: 'ECMAScript 6',
    description: 'enforce spacing around embedded expressions of template strings',
    eslintUrl: 'http://eslint.org/docs/rules/template-curly-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "template-curly-spacing": [
        true,
        "always"
      ]
    ~~~
    
    ~~~json
    "template-curly-spacing": [
        true,
        "never"
      ]
    ~~~`
  },
  {
    available: false,
    eslintRule: 'yield-star-spacing',
    tslintRule: 'yield-star-spacing',
    category: 'ECMAScript 6',
    description: 'enforce spacing around the `*` in `yield*` expressions',
    eslintUrl: 'http://eslint.org/docs/rules/yield-star-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "yield-star-spacing": true
    ~~~`
  }
];

function toCamelCase(str) {
  const words = str.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  words[0] = words[0].toLowerCase();
  return words.join('');
}

const ruleTSMap = {};
const ruleESMap = {};
rules.forEach((rule) => {
  ruleTSMap[toCamelCase(rule.tslintRule)] = rule;
  ruleESMap[toCamelCase(rule.eslintRule)] = rule;
});

export {
  Provider,
  Category,
  IRule,
  categories,
  rules,
  ruleTSMap,
  ruleESMap,
  toCamelCase,
};
