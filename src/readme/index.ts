import * as fs from 'fs';
import * as path from 'path';
import { IRule, categories, rules, ruleMap } from './rules';

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

function updateReadme() {
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
    });
  });
}

function createRuleContent(rule: IRule) {
  const usage = rule.usage ? `\n\n### Usage\n\n${formatUsage(rule.usage)}` : '';
  const note = rule.note ? `\n\n### Note\n\n${rule.note}\n` : '';
  return `## ${rule.tslintRule} (ESLint: [${rule.eslintRule}](${rule.eslintUrl}))

${rule.description}${usage}${note}
`;
}

function updateRuleFile(name: string, rule: IRule) {
  const baseUrl = 'https://github.com/buzinas/tslint-eslint-rules/blob/master';
  const docFileName = `src/docs/rules/${name}Rule.md`;
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
        return console.error(writeErr);
      }
    });
  });
}

function updateRuleFiles() {
  const ruleDir = 'src/rules/';
  const allFiles = fs.readdirSync(ruleDir).filter(
    file => fs.lstatSync(path.join(ruleDir, file)).isFile()
  );
  const ruleNames = allFiles
    .filter(name => name.endsWith('.ts'))
    .map(name => name.substr(0, name.length - 7));
  ruleNames.forEach((name) => {
    updateRuleFile(name, ruleMap[name]);
  });
}

export {
  formatUsage,
  updateReadme,
  updateRuleFiles,
};
