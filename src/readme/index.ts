import { Promise } from 'es6-promise';
import * as fs from 'fs';
import * as path from 'path';
import { IRule, categories, rules, ruleTSMap, toCamelCase } from './rules';

function formatUsage(usage) {
  return usage.replace(/~~~/g, '```').replace(/(^[ \t]*\n)/gm, '\n').replace(/^    /mg, '');
}

function createRuleTable() {
  const buffer = [];
  let category = null;
  rules.forEach((rule) => {
    if (category !== rule.category) {
      category = rule.category;
      buffer.push(`\n### ${category}\n\n`);
      buffer.push(`${categories[category]}\n\n`);
      buffer.push('| :grey_question: | ESLint | TSLint | Description |\n');
      buffer.push('| :---            | :---:  | :---:  | :---        |\n');
    }

    let available;
    if (rule.available) {
      available = rule.provider === 'native' ? ':ballot_box_with_check:' : ':white_check_mark:';
    } else {
      available = rule.tslintRule === 'Not applicable' ? ':no_entry_sign:' : ':x:';
    }
    const tsRuleName = rule.tslintUrl ? `[${rule.tslintRule}](${rule.tslintUrl})` : rule.tslintRule;
    const tsRule = rule.tslintRule === 'Not applicable' ? 'Not applicable' : tsRuleName;
    buffer.push('|');
    buffer.push(`${available}|`);
    buffer.push(`[${rule.eslintRule}](${rule.eslintUrl})|`);
    buffer.push(`${tsRule}|`);
    buffer.push(`${rule.description}|`);
    buffer.push('\n');
  });
  return buffer.join('');
}

function updateReadme(cb: Function) {
  fs.readFile('README.md', 'utf8', (readErr, data) => {
    if (readErr) {
      return console.error(readErr);
    }
    let content = data.replace(
      /^<!-- Start:AutoTable((.*?(\n))+.*?)End:AutoTable -->$/gm,
      '<!-- Start:AutoTable:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->\n' +
      createRuleTable() +
      '<!-- End:AutoTable -->'
    );
    fs.writeFile('README.md', content, 'utf8', (writeErr) => {
      if (writeErr) {
        return console.error(writeErr);
      }
      console.log('[DONE] updating README.md ...');
      cb();
    });
  });
}

function createRuleContent(rule: IRule) {
  const ruleName = toCamelCase(rule.tslintRule);
  const moduleName = `../rules/${ruleName}Rule.js`;
  const module = require(moduleName);
  const metaData = module.Rule.metadata;
  const srcBase = 'https://github.com/buzinas/tslint-eslint-rules/blob/master/src';
  const ruleBadge = 'https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg';
  const testBadge = 'https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg';
  if (metaData) {
    // Checking that the rule name and description match
    if (metaData.ruleName !== rule.tslintRule) {
      console.warn('[WARNING]: metadata.ruleName !== rule.tslintRule');
      console.warn(`           ${metaData.ruleName} !== ${rule.tslintRule}`);
    }
    if (metaData.description !== rule.description) {
      console.warn('[WARNING]: metadata.description !== rule.description');
      console.warn(`           ${metaData.description} !== ${rule.description}`);
    }
    const examples = metaData.optionExamples.map(
      x => ['```json', x, '```'].join('')
    ).join('\n\n');
    const schema = [
      '```json',
      JSON.stringify(metaData.options, null, 2),
      '```'
    ].join('\n');
    return [
      `## ${rule.tslintRule} (ESLint: [${rule.eslintRule}](${rule.eslintUrl}))`,
      `[![rule_source](${ruleBadge})](${srcBase}/rules/${ruleName}Rule.ts)`,
      `[![test_source](${testBadge})](${srcBase}/test/rules/${ruleName}RuleTests.ts)`,
      '',
      `${rule.description}\n`,
      `#### Rationale\n${metaData.rationale}`,
      `### Config\n${metaData.optionsDescription}`,
      `#### Examples\n\n${examples}`,
      `#### Schema\n\n${schema}`
    ].join('\n');
  }

  // TODO: Remove the next statements once every rule in this project have metadata.
  const usage = rule.usage ? `\n\n### Usage\n\n${formatUsage(rule.usage)}` : '';
  const note = rule.note ? `\n\n### Note\n\n${rule.note}\n` : '';
  return `## ${rule.tslintRule} (ESLint: [${rule.eslintRule}](${rule.eslintUrl}))
[![rule_source](${ruleBadge})](${srcBase}/rules/${ruleName}Rule.ts)
[![test_source](${testBadge})](${srcBase}/test/rules/${ruleName}RuleTests.ts)

${rule.description}${usage}${note}
`;
}

function updateRuleFile(name: string, rule: IRule) {
  const baseUrl = 'https://github.com/buzinas/tslint-eslint-rules/blob/master';
  const docFileName = `src/docs/rules/${name}Rule.md`;
  return new Promise((fulfill, reject) => {
    fs.readFile(docFileName, 'utf8', (readErr, data) => {
      rule.tslintUrl = rule.tslintUrl || `${baseUrl}/${docFileName}`;
      let content = readErr || !data ? '<!-- Start:AutoDoc\n End:AutoDoc -->' : data;
      content = content.replace(
        /^<!-- Start:AutoDoc((.*?(\n))+.*?)End:AutoDoc -->$/gm,
        [
          '<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->\n',
          createRuleContent(rule),
          '\n<!-- End:AutoDoc -->' + (readErr ? '\n' : '')
        ].join('')
      );
      fs.writeFile(docFileName, content, 'utf8', (writeErr) => {
        if (writeErr) {
          return reject(writeErr);
        }
        console.log(` - ${name}`);
        fulfill();
      });
    });
  });
}

function updateRuleFiles(cb: Function) {
  const ruleDir = 'src/rules/';
  const allFiles = fs.readdirSync(ruleDir).filter(
    file => fs.lstatSync(path.join(ruleDir, file)).isFile()
  );
  const ruleNames = allFiles
    .filter(name => /\.ts$/.test(name))
    .map(name => name.substr(0, name.length - 7));
  const allPromises = [];
  ruleNames.forEach((name) => {
    allPromises.push(updateRuleFile(name, ruleTSMap[name]));
  });
  // Only do the callback when all the promises have been resolved.
  Promise.all(allPromises).then(() => {
    console.log('[DONE] processing rule files ...');
    cb();
  });
}

export {
  formatUsage,
  updateReadme,
  updateRuleFiles
};
