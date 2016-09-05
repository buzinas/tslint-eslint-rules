const categories = {
  'Strict Mode': 'These rules relate to using strict mode.',
  'Stylistic Issues': 'These rules are purely matters of style and are quite subjective.',
  'Possible Errors': 'The following rules point out areas where you might have made mistakes.',
  'Node.js and CommonJS': 'These rules are specific to JavaScript running on Node.js or using CommonJS in the browser.',
  'ECMAScript 6': 'These rules are only relevant to ES6 environments.',
};
const rules = [
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
    ~~~`,
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
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'no-control-regex',
    tslintRule: 'no-control-regex',
    category: 'Possible Errors',
    description: 'disallow control characters in regular expressions (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-control-regex',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-control-regex',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-control-regex": true
    ~~~`,
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
    usage: ``,
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
    ~~~`,
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
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'no-ex-assign',
    tslintRule: 'no-ex-assign',
    category: 'Possible Errors',
    description: 'disallow assigning to the exception in a `catch` block (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-ex-assign',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-ex-assign',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-ex-assign": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-extra-parens',
    tslintRule: 'no-extra-parens',
    category: 'Possible Errors',
    description: 'disallow unnecessary parentheses',
    eslintUrl: 'http://eslint.org/docs/rules/no-extra-parens',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-extra-parens',
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
    ~~~`,
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
    usage: ``,
  },
  {
    available: true,
    eslintRule: 'no-inner-declarations',
    tslintRule: 'no-inner-declarations',
    category: 'Possible Errors',
    description: 'disallow function or variable declarations in nested blocks (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-inner-declarations',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-inner-declarations',
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
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'no-irregular-whitespace',
    tslintRule: 'no-irregular-whitespace',
    category: 'Possible Errors',
    description: 'disallow irregular whitespace outside of strings and comments (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-irregular-whitespace',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-irregular-whitespace',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-irregular-whitespace": true
    ~~~`,
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
    usage: ``,
  },
  {
    available: true,
    eslintRule: 'no-regex-spaces',
    tslintRule: 'no-regex-spaces',
    category: 'Possible Errors',
    description: 'disallow multiple spaces in a regular expression literal (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-regex-spaces',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-regex-spaces',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-regex-spaces": true
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'no-unexpected-multiline',
    tslintRule: 'no-unexpected-multiline',
    category: 'Possible Errors',
    description: 'Avoid code that looks like two expressions but is actually one',
    eslintUrl: 'http://eslint.org/docs/rules/no-unexpected-multiline',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-unexpected-multiline',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-unexpected-multiline": true
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'use-isnan',
    tslintRule: 'use-isnan',
    category: 'Possible Errors',
    description: 'disallow comparisons with the value `NaN` (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/use-isnan',
    tslintUrl: 'http://palantir.github.io/tslint/rules/use-isnan',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "use-isnan": true
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'valid-typeof',
    tslintRule: 'valid-typeof',
    category: 'Possible Errors',
    description: 'Ensure that the results of typeof are compared against a valid string (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/valid-typeof',
    tslintUrl: 'http://palantir.github.io/tslint/rules/valid-typeof',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "valid-typeof": true
    ~~~
    
    Best Practices
    
    e are rules designed to prevent you from making mistakes. They either prescribe a better way of doing something or help you avoid footguns.`,
  },
  {
    available: false,
    eslintRule: 'array-callback-return',
    tslintRule: 'array-callback-return',
    category: 'Possible Errors',
    description: 'Enforce return statements in callbacks of array’s methods',
    eslintUrl: 'http://eslint.org/docs/rules/array-callback-return',
    tslintUrl: 'http://palantir.github.io/tslint/rules/array-callback-return',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "array-callback-return": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'complexity',
    tslintRule: 'complexity',
    category: 'Possible Errors',
    description: 'specify the maximum cyclomatic complexity allowed in a program',
    eslintUrl: 'http://eslint.org/docs/rules/complexity',
    tslintUrl: 'http://palantir.github.io/tslint/rules/complexity',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "complexity": [
      true,
      3
    ]
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'curly',
    tslintRule: 'curly',
    category: 'Possible Errors',
    description: 'specify curly brace conventions for all control statements',
    eslintUrl: 'http://eslint.org/docs/rules/curly',
    tslintUrl: 'http://palantir.github.io/tslint/rules/curly',
    provider: 'native',
    usage: `~~~json
    "curly": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'dot-location',
    tslintRule: 'dot-location',
    category: 'Possible Errors',
    description: 'enforces consistent newlines before or after dots',
    eslintUrl: 'http://eslint.org/docs/rules/dot-location',
    tslintUrl: 'http://palantir.github.io/tslint/rules/dot-location',
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
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'eqeqeq',
    tslintRule: 'triple-equals',
    category: 'Possible Errors',
    description: 'require the use of `===` and `!==`',
    eslintUrl: 'http://eslint.org/docs/rules/eqeqeq',
    tslintUrl: 'http://palantir.github.io/tslint/rules/triple-equals',
    provider: 'native',
    usage: `~~~json
    "eqeqeq": [
        true,
        "allow-null-check"
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-alert',
    tslintRule: 'no-alert',
    category: 'Possible Errors',
    description: 'disallow the use of `alert`, `confirm`, and `prompt`',
    eslintUrl: 'http://eslint.org/docs/rules/no-alert',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-alert',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-alert": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-case-declarations',
    tslintRule: 'no-case-declarations',
    category: 'Possible Errors',
    description: 'disallow lexical declarations in case clauses',
    eslintUrl: 'http://eslint.org/docs/rules/no-case-declarations',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-case-declarations',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-case-declarations": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-else-return',
    tslintRule: 'no-else-return',
    category: 'Possible Errors',
    description: 'disallow `else` after a `return` in an `if`',
    eslintUrl: 'http://eslint.org/docs/rules/no-else-return',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-else-return',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-else-return": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-empty-pattern',
    tslintRule: 'no-empty-pattern',
    category: 'Possible Errors',
    description: 'disallow use of empty destructuring patterns',
    eslintUrl: 'http://eslint.org/docs/rules/no-empty-pattern',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-empty-pattern',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-empty-pattern": true
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'no-eval',
    tslintRule: 'no-eval',
    category: 'Possible Errors',
    description: 'disallow use of `eval()`',
    eslintUrl: 'http://eslint.org/docs/rules/no-eval',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-eval',
    provider: 'native',
    usage: `~~~json
    "no-eval": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-extra-bind',
    tslintRule: 'no-extra-bind',
    category: 'Possible Errors',
    description: 'disallow unnecessary function binding',
    eslintUrl: 'http://eslint.org/docs/rules/no-extra-bind',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-extra-bind',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-extra-bind": true
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'no-fallthrough',
    tslintRule: 'no-switch-case-fall-through',
    category: 'Possible Errors',
    description: 'disallow fallthrough of `case` statements (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-fallthrough',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-switch-case-fall-through',
    provider: 'native',
    usage: `~~~json
    "no-fallthrough": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-implicit-coercion',
    tslintRule: 'no-implicit-coercion',
    category: 'Possible Errors',
    description: 'disallow the type conversions with shorter notations',
    eslintUrl: 'http://eslint.org/docs/rules/no-implicit-coercion',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-implicit-coercion',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-implied-eval',
    tslintRule: 'no-implied-eval',
    category: 'Possible Errors',
    description: 'disallow use of `eval()`-like methods',
    eslintUrl: 'http://eslint.org/docs/rules/no-implied-eval',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-implied-eval',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-implied-eval": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-iterator',
    tslintRule: 'no-iterator',
    category: 'Possible Errors',
    description: 'disallow Usage of `__iterator__` property',
    eslintUrl: 'http://eslint.org/docs/rules/no-iterator',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-iterator',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-iterator": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-lone-blocks',
    tslintRule: 'no-lone-blocks',
    category: 'Possible Errors',
    description: 'disallow unnecessary nested blocks',
    eslintUrl: 'http://eslint.org/docs/rules/no-lone-blocks',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-lone-blocks',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-lone-blocks": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-magic-numbers',
    tslintRule: 'no-magic-numbers',
    category: 'Possible Errors',
    description: 'disallow the use of magic numbers',
    eslintUrl: 'http://eslint.org/docs/rules/no-magic-numbers',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-magic-numbers',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-multi-str',
    tslintRule: 'no-multi-str',
    category: 'Possible Errors',
    description: 'disallow use of multiline strings',
    eslintUrl: 'http://eslint.org/docs/rules/no-multi-str',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-multi-str',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-multi-str": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-new',
    tslintRule: 'no-new',
    category: 'Possible Errors',
    description: 'disallow use of the `new` operator when not part of an assignment or comparison',
    eslintUrl: 'http://eslint.org/docs/rules/no-new',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-new',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-new-wrappers',
    tslintRule: 'no-new-wrappers',
    category: 'Possible Errors',
    description: 'disallows creating new instances of `String`,`Number`, and `Boolean`',
    eslintUrl: 'http://eslint.org/docs/rules/no-new-wrappers',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-new-wrappers',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new-wrappers": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-octal-escape',
    tslintRule: 'no-octal-escape',
    category: 'Possible Errors',
    description: 'disallow use of octal escape sequences in string literals, such as `var foo = "Copyright \251";`',
    eslintUrl: 'http://eslint.org/docs/rules/no-octal-escape',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-octal-escape',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-octal-escape": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-proto',
    tslintRule: 'no-proto',
    category: 'Possible Errors',
    description: 'disallow Usage of `__proto__` property',
    eslintUrl: 'http://eslint.org/docs/rules/no-proto',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-proto',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-proto": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-return-assign',
    tslintRule: 'no-return-assign',
    category: 'Possible Errors',
    description: 'disallow use of assignment in `return` statement',
    eslintUrl: 'http://eslint.org/docs/rules/no-return-assign',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-return-assign',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-self-compare',
    tslintRule: 'no-self-compare',
    category: 'Possible Errors',
    description: 'disallow comparisons where both sides are exactly the same',
    eslintUrl: 'http://eslint.org/docs/rules/no-self-compare',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-self-compare',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-self-compare": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-throw-literal',
    tslintRule: 'no-throw-literal',
    category: 'Possible Errors',
    description: 'restrict what can be thrown as an exception',
    eslintUrl: 'http://eslint.org/docs/rules/no-throw-literal',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-throw-literal',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-throw-literal": true
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'no-unused-expressions',
    tslintRule: 'no-unused-expression',
    category: 'Possible Errors',
    description: 'disallow Usage of expressions in statement position',
    eslintUrl: 'http://eslint.org/docs/rules/no-unused-expressions',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-unused-expression',
    provider: 'native',
    usage: `~~~json
    "no-unused-expressions": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-useless-call',
    tslintRule: 'no-useless-call',
    category: 'Possible Errors',
    description: 'disallow unnecessary `.call()` and `.apply()`',
    eslintUrl: 'http://eslint.org/docs/rules/no-useless-call',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-useless-call',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-useless-call": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-useless-escape',
    tslintRule: 'no-useless-escape',
    category: 'Possible Errors',
    description: 'disallow unnecessary usage of escape character',
    eslintUrl: 'http://eslint.org/docs/rules/no-useless-escape',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-useless-escape',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-useless-escape": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-warning-comments',
    tslintRule: 'no-warning-comments',
    category: 'Possible Errors',
    description: 'disallow Usage of configurable warning terms in comments e.g. `TODO` or `FIXME`',
    eslintUrl: 'http://eslint.org/docs/rules/no-warning-comments',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-warning-comments',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-warning-comments": [
        true,
        {
          "terms": ["todo", "fixme", "xxx"],
          "location": "start"
        }
      ]
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'radix',
    tslintRule: 'radix',
    category: 'Possible Errors',
    description: 'require use of the second argument for `parseInt()`',
    eslintUrl: 'http://eslint.org/docs/rules/radix',
    tslintUrl: 'http://palantir.github.io/tslint/rules/radix',
    provider: 'native',
    usage: `~~~json
    "radix": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'wrap-iife',
    tslintRule: 'wrap-iife',
    category: 'Possible Errors',
    description: 'require immediate function invocation to be wrapped in parentheses',
    eslintUrl: 'http://eslint.org/docs/rules/wrap-iife',
    tslintUrl: 'http://palantir.github.io/tslint/rules/wrap-iife',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'strict',
    tslintRule: 'strict',
    category: 'Strict Mode',
    description: 'require effective use of strict mode directives',
    eslintUrl: 'http://eslint.org/docs/rules/strict',
    tslintUrl: 'http://palantir.github.io/tslint/rules/strict',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "strict": [
        true,
        "safe"
      ]
    ~~~
    
    ~~~json
    "strict": [
        true,
        "never"
      ]
    ~~~
    
    ~~~json
    "strict": [
        true,
        "global"
      ]
    ~~~
    
    ~~~json
    "strict": [
        true,
        "function"
      ]
    ~~~
    
    Variables
    
    e rules have to do with variable declarations.`,
  },
  {
    available: false,
    eslintRule: 'no-catch-shadow',
    tslintRule: 'no-catch-shadow',
    category: 'Strict Mode',
    description: 'disallow the catch clause parameter name being the same as a variable in the outer scope',
    eslintUrl: 'http://eslint.org/docs/rules/no-catch-shadow',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-catch-shadow',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-catch-shadow": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-label-var',
    tslintRule: 'no-label-var',
    category: 'Strict Mode',
    description: 'disallow labels that share a name with a variable',
    eslintUrl: 'http://eslint.org/docs/rules/no-label-var',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-label-var',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-label-var": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-shadow-restricted-names',
    tslintRule: 'no-shadow-restricted-names',
    category: 'Strict Mode',
    description: 'disallow shadowing of names such as `arguments`',
    eslintUrl: 'http://eslint.org/docs/rules/no-shadow-restricted-names',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-shadow-restricted-names',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-shadow-restricted-names": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-undef-init',
    tslintRule: 'no-undef-init',
    category: 'Strict Mode',
    description: 'disallow use of undefined when initializing variables',
    eslintUrl: 'http://eslint.org/docs/rules/no-undef-init',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-undef-init',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-undef-init": true
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'no-unused-vars',
    tslintRule: 'no-unused-variable',
    category: 'Strict Mode',
    description: 'disallow declaration of variables that are not used in the code (recommended)',
    eslintUrl: 'http://eslint.org/docs/rules/no-unused-vars',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-unused-variable',
    provider: 'native',
    usage: `~~~json
    "no-unused-variable": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'callback-return',
    tslintRule: 'callback-return',
    category: 'Node.js and CommonJS',
    description: 'enforce `return` after a callback',
    eslintUrl: 'http://eslint.org/docs/rules/callback-return',
    tslintUrl: 'http://palantir.github.io/tslint/rules/callback-return',
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
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'handle-callback-err',
    tslintRule: 'handle-callback-err',
    category: 'Node.js and CommonJS',
    description: 'enforce error handling in callbacks',
    eslintUrl: 'http://eslint.org/docs/rules/handle-callback-err',
    tslintUrl: 'http://palantir.github.io/tslint/rules/handle-callback-err',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "handle-callback-err": [
        true,
        "^(err|error|anySpecificError)$"
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-new-require',
    tslintRule: 'no-new-require',
    category: 'Node.js and CommonJS',
    description: 'disallow use of `new` operator with the `require` function',
    eslintUrl: 'http://eslint.org/docs/rules/no-new-require',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-new-require',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new-require": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-process-env',
    tslintRule: 'no-process-env',
    category: 'Node.js and CommonJS',
    description: 'disallow use of `process.env`',
    eslintUrl: 'http://eslint.org/docs/rules/no-process-env',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-process-env',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-process-env": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-restricted-modules',
    tslintRule: 'no-restricted-modules',
    category: 'Node.js and CommonJS',
    description: 'restrict Usage of specified node modules',
    eslintUrl: 'http://eslint.org/docs/rules/no-restricted-modules',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-restricted-modules',
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
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'array-bracket-spacing',
    tslintRule: 'array-bracket-spacing',
    category: 'Stylistic Issues',
    description: 'enforce spacing inside array brackets',
    eslintUrl: 'http://eslint.org/docs/rules/array-bracket-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/array-bracket-spacing',
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
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'brace-style',
    tslintRule: 'brace-style',
    category: 'Stylistic Issues',
    description: 'enforce one true brace style',
    eslintUrl: 'http://eslint.org/docs/rules/brace-style',
    tslintUrl: 'http://palantir.github.io/tslint/rules/brace-style',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'comma-spacing',
    tslintRule: 'comma-spacing',
    category: 'Stylistic Issues',
    description: 'enforce spacing before and after comma',
    eslintUrl: 'http://eslint.org/docs/rules/comma-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/comma-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "comma-spacing": [
        true,
        {
          "before": false,
          "after": true
        }
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'computed-property-spacing',
    tslintRule: 'computed-property-spacing',
    category: 'Stylistic Issues',
    description: 'require or disallow padding inside computed properties',
    eslintUrl: 'http://eslint.org/docs/rules/computed-property-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/computed-property-spacing',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'eol-last',
    tslintRule: 'eol-last',
    category: 'Stylistic Issues',
    description: 'enforce newline at the end of file, with no multiple empty lines',
    eslintUrl: 'http://eslint.org/docs/rules/eol-last',
    tslintUrl: 'http://palantir.github.io/tslint/rules/eol-last',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'func-style',
    tslintRule: 'func-style',
    category: 'Stylistic Issues',
    description: 'enforce use of function declarations or expressions',
    eslintUrl: 'http://eslint.org/docs/rules/func-style',
    tslintUrl: 'http://palantir.github.io/tslint/rules/func-style',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'id-length',
    tslintRule: 'id-length',
    category: 'Stylistic Issues',
    description: 'this option enforces minimum and maximum identifier lengths (variable names, property names etc.)',
    eslintUrl: 'http://eslint.org/docs/rules/id-length',
    tslintUrl: 'http://palantir.github.io/tslint/rules/id-length',
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
    ~~~`,
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'key-spacing',
    tslintRule: 'key-spacing',
    category: 'Stylistic Issues',
    description: 'enforce spacing between keys and values in object literal properties',
    eslintUrl: 'http://eslint.org/docs/rules/key-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/key-spacing',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'linebreak-style',
    tslintRule: 'linebreak-style',
    category: 'Stylistic Issues',
    description: "disallow mixed 'LF' and 'CRLF' as linebreaks",
    eslintUrl: 'http://eslint.org/docs/rules/linebreak-style',
    tslintUrl: 'http://palantir.github.io/tslint/rules/linebreak-style',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'max-depth',
    tslintRule: 'max-depth',
    category: 'Stylistic Issues',
    description: 'specify the maximum depth that blocks can be nested',
    eslintUrl: 'http://eslint.org/docs/rules/max-depth',
    tslintUrl: 'http://palantir.github.io/tslint/rules/max-depth',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'max-nested-callbacks',
    tslintRule: 'max-nested-callbacks',
    category: 'Stylistic Issues',
    description: 'specify the maximum depth callbacks can be nested',
    eslintUrl: 'http://eslint.org/docs/rules/max-nested-callbacks',
    tslintUrl: 'http://palantir.github.io/tslint/rules/max-nested-callbacks',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "max-nested-callbacks": [
        true,
        3
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'max-statements',
    tslintRule: 'max-statements',
    category: 'Stylistic Issues',
    description: 'specify the maximum number of statement allowed in a function',
    eslintUrl: 'http://eslint.org/docs/rulesmax-statements',
    tslintUrl: 'http://palantir.github.io/tslint/rules/max-statements',
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
    ~~~`,
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
    usage: ``,
  },
  {
    available: false,
    eslintRule: 'new-parens',
    tslintRule: 'new-parens',
    category: 'Stylistic Issues',
    description: 'disallow the omission of parentheses when invoking a constructor with no arguments',
    eslintUrl: 'http://eslint.org/docs/rules/new-parens',
    tslintUrl: 'http://palantir.github.io/tslint/rules/new-parens',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "new-parens": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'newline-before-return',
    tslintRule: 'newline-before-return',
    category: 'Stylistic Issues',
    description: 'require newline before return statement',
    eslintUrl: 'http://eslint.org/docs/rules/newline-before-return',
    tslintUrl: 'http://palantir.github.io/tslint/rules/newline-before-return',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "newline-before-return": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-array-constructor',
    tslintRule: 'no-array-constructor',
    category: 'Stylistic Issues',
    description: 'disallow use of the `Array` constructor',
    eslintUrl: 'http://eslint.org/docs/rules/no-array-constructor',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-array-constructor',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-array-constructor": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-inline-comments',
    tslintRule: 'no-inline-comments',
    category: 'Stylistic Issues',
    description: 'disallow comments inline after code',
    eslintUrl: 'http://eslint.org/docs/rules/no-inline-comments',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-inline-comments',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-inline-comments": true
    ~~~`,
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
    ~~~
    `,
    note: `When using TSLint \`ident\` rule, it will enforce the consistent use of the chosen
    indentation. The ESLint rule allows an option for Smart Tabs, but there are some open issues,
    and we're not going to support this.`,
  },
  {
    available: false,
    eslintRule: 'no-negated-condition',
    tslintRule: 'no-negated-condition',
    category: 'Stylistic Issues',
    description: 'disallow negated conditions',
    eslintUrl: 'http://eslint.org/docs/rules/no-negated-condition',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-negated-condition',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-negated-condition": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-new-object',
    tslintRule: 'no-new-object',
    category: 'Stylistic Issues',
    description: 'disallow the use of the `Object` constructor',
    eslintUrl: 'http://eslint.org/docs/rules/no-new-object',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-new-object',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-new-object": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-spaced-func',
    tslintRule: 'no-spaced-func',
    category: 'Stylistic Issues',
    description: 'disallow space between function identifier and application',
    eslintUrl: 'http://eslint.org/docs/rules/no-spaced-func',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-spaced-func',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-spaced-func": true
    ~~~`,
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-unneeded-ternary',
    tslintRule: 'no-unneeded-ternary',
    category: 'Stylistic Issues',
    description: 'disallow the use of ternary operators when a simpler alternative exists',
    eslintUrl: 'http://eslint.org/docs/rules/no-unneeded-ternary',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-unneeded-ternary',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-unneeded-ternary": [
        true,
        {
          "defaultAssignment": true
        }
      ]
    ~~~`,
  },
  {
    available: true,
    eslintRule: 'object-curly-spacing',
    tslintRule: 'object-curly-spacing',
    category: 'Stylistic Issues',
    description: 'require or disallow padding inside curly braces',
    eslintUrl: 'http://eslint.org/docs/rules/object-curly-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/object-curly-spacing',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'one-var-declaration-per-line',
    tslintRule: 'one-var-declaration-per-line',
    category: 'Stylistic Issues',
    description: 'require or disallow a newline around variable declarations',
    eslintUrl: 'http://eslint.org/docs/rules/one-var-declaration-per-line',
    tslintUrl: 'http://palantir.github.io/tslint/rules/one-var-declaration-per-line',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'operator-linebreak',
    tslintRule: 'operator-linebreak',
    category: 'Stylistic Issues',
    description: 'enforce operators to be placed before or after line breaks',
    eslintUrl: 'http://eslint.org/docs/rules/operator-linebreak',
    tslintUrl: 'http://palantir.github.io/tslint/rules/operator-linebreak',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'quote-props',
    tslintRule: 'quote-props',
    category: 'Stylistic Issues',
    description: 'require quotes around object literal property names',
    eslintUrl: 'http://eslint.org/docs/rules/quote-props',
    tslintUrl: 'http://palantir.github.io/tslint/rules/quote-props',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'require-jsdoc',
    tslintRule: 'require-jsdoc',
    category: 'Stylistic Issues',
    description: 'Require JSDoc comment',
    eslintUrl: 'http://eslint.org/docs/rules/require-jsdoc',
    tslintUrl: 'http://palantir.github.io/tslint/rules/require-jsdoc',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'semi-spacing',
    tslintRule: 'semi-spacing',
    category: 'Stylistic Issues',
    description: 'enforce spacing before and after semicolons',
    eslintUrl: 'http://eslint.org/docs/rules/semi-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/semi-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "semi-spacing": [
        true,
        {
          "before": false,
          "after": true
        }
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'sort-vars',
    tslintRule: 'sort-vars',
    category: 'Stylistic Issues',
    description: 'sort variables within the same declaration block',
    eslintUrl: 'http://eslint.org/docs/rules/sort-vars',
    tslintUrl: 'http://palantir.github.io/tslint/rules/sort-vars',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "sort-vars": [
        true,
        {
          "ignoreCase": false
        }
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'space-before-function-paren',
    tslintRule: 'space-before-function-paren',
    category: 'Stylistic Issues',
    description: 'require or disallow a space before function opening parenthesis',
    eslintUrl: 'http://eslint.org/docs/rules/space-before-function-paren',
    tslintUrl: 'http://palantir.github.io/tslint/rules/space-before-function-paren',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'space-infix-ops',
    tslintRule: 'space-infix-ops',
    category: 'Stylistic Issues',
    description: 'require spaces around operators',
    eslintUrl: 'http://eslint.org/docs/rules/space-infix-ops',
    tslintUrl: 'http://palantir.github.io/tslint/rules/space-infix-ops',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "space-infix-ops": [
        true,
        {
          "int32Hint": false
        }
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'spaced-comment',
    tslintRule: 'spaced-comment',
    category: 'Stylistic Issues',
    description: 'require or disallow a space immediately following the `//` or `/*` in a comment',
    eslintUrl: 'http://eslint.org/docs/rules/spaced-comment',
    tslintUrl: 'http://palantir.github.io/tslint/rules/spaced-comment',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'arrow-body-style',
    tslintRule: 'arrow-body-style',
    category: 'ECMAScript 6',
    description: 'require braces in arrow function body',
    eslintUrl: 'http://eslint.org/docs/rules/arrow-body-style',
    tslintUrl: 'http://palantir.github.io/tslint/rules/arrow-body-style',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'arrow-spacing',
    tslintRule: 'arrow-spacing',
    category: 'ECMAScript 6',
    description: "require space before/after arrow function's arrow",
    eslintUrl: 'http://eslint.org/docs/rules/arrow-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/arrow-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "arrow-spacing": [
        true,
        {
          "before": true,
          "after": true
        }
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'generator-star-spacing',
    tslintRule: 'generator-star-spacing',
    category: 'ECMAScript 6',
    description: 'enforce spacing around the `*` in generator functions',
    eslintUrl: 'http://eslint.org/docs/rules/generator-star-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/generator-star-spacing',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "generator-star-spacing": [
        true,
        {
          "before": true,
          "after": true
        }
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-confusing-arrow',
    tslintRule: 'no-confusing-arrow',
    category: 'ECMAScript 6',
    description: 'disallow arrow functions where they could be confused with comparisons',
    eslintUrl: 'http://eslint.org/docs/rules/no-confusing-arrow',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-confusing-arrow',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-confusing-arrow": [
        true,
        {
          "allowParens": false
        }
      ]
    ~~~`,
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
    usage: ``,
  },
  {
    available: false,
    eslintRule: 'no-duplicate-imports',
    tslintRule: 'no-duplicate-imports',
    category: 'ECMAScript 6',
    description: 'disallow duplicate module imports',
    eslintUrl: 'http://eslint.org/docs/rules/no-duplicate-imports',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-duplicate-imports',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-duplicate-imports": [
        true,
        {
          includeExports: true
        }
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-restricted-imports',
    tslintRule: 'no-restricted-imports',
    category: 'ECMAScript 6',
    description: 'restrict usage of specified modules when loaded by `import` declaration',
    eslintUrl: 'http://eslint.org/docs/rules/no-restricted-imports',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-restricted-imports',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-restricted-imports": [
        true,
        "import1",
        "import2"
      ]
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'no-useless-constructor',
    tslintRule: 'no-useless-constructor',
    category: 'ECMAScript 6',
    description: 'disallow unnecessary constructor',
    eslintUrl: 'http://eslint.org/docs/rules/no-useless-constructor',
    tslintUrl: 'http://palantir.github.io/tslint/rules/no-useless-constructor',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "no-useless-constructor": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'object-shorthand',
    tslintRule: 'object-shorthand',
    category: 'ECMAScript 6',
    description: 'require method and property shorthand syntax for object literals',
    eslintUrl: 'http://eslint.org/docs/rules/object-shorthand',
    tslintUrl: 'http://palantir.github.io/tslint/rules/object-shorthand',
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
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'prefer-const',
    tslintRule: 'prefer-const',
    category: 'ECMAScript 6',
    description: 'suggest using `const` declaration for variables that are never modified after declared',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-const',
    tslintUrl: 'http://palantir.github.io/tslint/rules/prefer-const',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-const": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'prefer-rest-params',
    tslintRule: 'prefer-rest-params',
    category: 'ECMAScript 6',
    description: 'suggest using the rest parameters instead of `arguments`',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-rest-params',
    tslintUrl: 'http://palantir.github.io/tslint/rules/prefer-rest-params',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-rest-params": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'prefer-template',
    tslintRule: 'prefer-template',
    category: 'ECMAScript 6',
    description: 'suggest using template literals instead of strings concatenation',
    eslintUrl: 'http://eslint.org/docs/rules/prefer-template',
    tslintUrl: 'http://palantir.github.io/tslint/rules/prefer-template',
    provider: 'tslint-eslint-rules',
    usage: `~~~json
    "prefer-template": true
    ~~~`,
  },
  {
    available: false,
    eslintRule: 'template-curly-spacing',
    tslintRule: 'template-curly-spacing',
    category: 'ECMAScript 6',
    description: 'enforce spacing around embedded expressions of template strings',
    eslintUrl: 'http://eslint.org/docs/rules/template-curly-spacing',
    tslintUrl: 'http://palantir.github.io/tslint/rules/template-curly-spacing',
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
    ~~~`,
  },
];

exports.categories = categories;
exports.rules = rules;
