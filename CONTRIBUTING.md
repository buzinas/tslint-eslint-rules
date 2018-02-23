Contributing to TSLint-ESLint-Rules
===================================

 1. [Getting Involved](#getting-involved)
 2. [Reporting Bugs](#reporting-bugs)
 3. [Contributing Code](#contributing-code)
 4. [Improving Documentation](#improving-documentation)

## Getting Involved

Missing ESLint rules are always welcomed in this project, but you can also contribute with PRs for
fixing bugs or improving documentation or performance.

## Reporting Bugs

When opening a new [issue] please try to include the following information as this will make fixing
the issue easier and quicker.

 * tslint and typescript version.

       $ tslint --version
       5.2.0
       $ tsc --version
       Version 2.3.2

 * `tslint.json` configuration.
 * typescript code being linted.
 * actual behavior.
 * expected behavior.

## Contributing Code

If you are not yet familiar with the way Github works (forking, pull requests, etc.) please
check out this [article about forking](https://help.github.com/articles/fork-a-repo/). To get
started on a new rule or fix/improve some existing rule you can follow the instructions below.

- Pick the rule name you will be working on and add the `ter` prefix. For instance, if you will be
  working on the `no-tabs` rule, then the rule name will be `ter-no-tabs`. This is to avoid future
  name collision with native rules provided by `TSLint`.
- Create a branch with the rule name, e.g. `ter-indent`.
- If you haven't, run `npm install` to download the project dependencies.
- Create your rule tests at `./src/test/rules` and your rule in `./src/rules` with the convention:
  - Name: rule-name (hyphenated, e.g: `ter-no-if-usage`)
  - Rule File: ruleNameRule.ts (camelCased and with the `Rule` suffix, e.g: `terNoIfUsageRule.ts`)
  - Test File: ruleNameRuleTests.ts (camelCased and with the `RuleTests` suffix, e.g: `terNoIfUsageRuleTests.ts`)

  This step can be done automatically by running

  ```
  gulp new-rule --rule rule-name
  ```

  This will generate a the rule template and test template in the appropriate directories.

- Check if your rule is passing with `gulp test --single rule-name` (hyphenated, e.g ter-arrow-spacing)
  - During development you may have some linting errors that won't let you run the test. You can
    disable the linting process with the `--no-lint` flag: `gulp test --single rule-name --no-lint`.
  - If you are using the `RuleTester` utility as in the `ter-indent` rule tests you can specify a
    group of tests to run, for instance `gulp test --single ter-indent:call-expression`. If there
    is a particular rule from the group that needs to be tested you can also specify the index of
    the rule: `gulp test --single ter-indent:call-expression:0`.

- Make sure that all tests are passing with `gulp test`.
- Update the file `src/readme/rules.ts` with the rule information.
- Run `gulp readme` to generate the documentation.
- Run `npm test` to run all the tests once more and to self-lint our project files with the rules
  specified in `tslint_eslint_rules.json`.
- Finally, open a Pull Request.

### Commit conventions

Each commit should follow the following convention:

```
[feat] added use-isnan rule (closes #20)
```

Other commit messages include

- `[bug] fixed no-constant-condition rule (closes #9)`
- `[docs] improved README.md file (closes #32)`
- `[perf] improved valid-typeof rule (closes #48)`


## Improving Documentation

There are three type of files which can be edited to update the documentation.

 * `src/readme/rules.ts`: Contains the rules information used to generate the tables in the README.
 * `src/rules/<rule-name>.ts`: The metadata property of the rule is used to generate the
                               markdown file for the rule.
 * `docs/rules/<rule-name>.md`: Additional information can be appended to this file but we should
                                attempt to have all the rule documentation self contained in its
                                source file via its metadata.

### Updating the README tables

To update an entry in the README tables you can edit an entry in the file `src/readme/rules.ts`.
A sample entry looks as follows:

```ts
  {
    available: true,
    eslintRule: 'indent',
    tslintRule: 'ter-indent',
    category: 'Stylistic Issues',
    description: 'enforce consistent indentation',
    eslintUrl: 'http://eslint.org/docs/rules/indent',
    provider: 'tslint-eslint-rules'
  },
```

Since the `rules.ts` file is a typescript file this means that typescript will make sure that each
entry follows the `IRule` interface:

```ts
interface IRule {
  available: boolean;
  eslintRule: string;
  tslintRule: string;
  category: Category;
  description: string;
  eslintUrl: string;
  tslintUrl?: string;
  provider: Provider;
  usage?: string;  // deprecated: Specify in the rule metadata
  note?: string;   // deprecated: Specify in the rule doc file
}
```

Note that the interface includes optional `usage` and `note` which were added before the usage of
the rule metadata. These two values should be avoided and instead be declared in the rule metadata
or the rule doc file.

The `tslintUrl` property can be omitted when the rule is provided by `tslint-eslint-rules`. When
the rule is provided natively by TSLint then we can specify the url to the rule.

Once an entry has been added or updated we can generate the tables in the README by executing

```
gulp readme
```

This command will also update the markdown file for each of the rules provided by the project.

**WARNING:** Do not edit the README tables manually. Doing so will not only be troublesome but the
changes will get overwritten the next time `gulp readme` is executed.

### Updating the rule metadata

Each rule should define the `metadata` static property

```
public static metadata: Lint.IRuleMetadata;
```

> Why? Less files to edit. This also keeps all relevant information about the rule with its source.

Examples of files with complete metadata include `terIndentRule.ts` and `terMaxLenRule.ts`.
When making changes to this static property make sure to run `gulp readme` so that the changes
can be reflected in the markdown document for the rule.

NOTE: When adding a new rule you do not have to manually create the markdown file in
`src/docs/rules`. The gulp readme command will create it once it detects the new rule.

### Updating the rule documentation

If the rule metadata is not enough to cover all of the information we need to convey then we can
manually append this information to the end of the generated markdown file in the `src/docs/rules`
directory. Just make sure to not edit anything in the comment block.

```
<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->
... GENERATED FROM RULE METATDATA
<!-- End:AutoDoc -->
You may write more information here
```

### Releasing to NPM

If you are one of the collaborators that have access to npm you'll need to do the following
to create a release:

1. Update the the version in `package.json`.
2. Update `CHANGELOG.md` by looking <https://github.com/buzinas/tslint-eslint-rules/compare/vN.N.N...HEAD>.
   Make sure to replace `vN.N.N` with the latest version currently in npm. This link will provide you
   with a list of changes since the last release so that we can update the `CHANGELOG.md` file accordingly.
3. Once this is ready run `bash ./.bash_scripts/release.sh`. This will run all the tests and ask you to
   verify if you did steps `1` and `2`. If everything goes well it will ask you to press any key so that
   the changes can be uploaded to npm.
4. Create a new release on Github pointing to the correct changelog entry.

[issue]: https://github.com/buzinas/tslint-eslint-rules/issues
