import * as fs from 'fs';
import * as ruleMod from './rules';

function formatUsage(usage) {
  return usage.replace(/~~~/g, '```').replace(/(^[ \t]*\n)/gm, '\n');
}

function createRuleList() {
  const buffer = [];
  let category = null;
  ruleMod.rules.forEach((rule) => {
    if (category !== rule.category) {
      category = rule.category;
      buffer.push(`\n### ${category}\n\n`);
      buffer.push(`${ruleMod.categories[category]}\n`);
    }
    const todo = rule.available ? '' : ' [TODO]()';
    const usage = rule.usage ? `\n  * Usage\n\n    ${formatUsage(rule.usage)}\n` : '\n';
    const note = rule.note ? `  * Note: ${rule.note}\n` : '';
    const tsRule = rule.tslintRule === 'Not applicable' ? 'Not applicable to TypeScript' : `${rule.tslintRule} (${rule.provider})${todo}`;
    const msg = `
* [${rule.eslintRule}](${rule.eslintUrl}) => ${tsRule}
  * Description: ${rule.description}${usage}${note}`;
    buffer.push(msg);
  });
  return buffer.join('');
}

function createRuleTable() {
  const buffer = [
    '| :grey_question: | Eslint | Tslint | Description |\n',
    '| :---         | :---:  | :---:  | :---        |\n'
  ];
  ruleMod.rules.forEach((rule) => {
    let available;
    if (rule.available) {
      available = rule.provider === 'native' ? ':ballot_box_with_check:' : ':white_check_mark:';
    } else {
      available = ':x:';
    }
    const tsRule = rule.tslintRule === 'Not applicable' ? 'Not applicable' : `[${rule.tslintRule}](${rule.tslintUrl})`;
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
      /^<!-- Start:AutoList((.*?(\n))+.*?)End:AutoList -->$/gm,
      '<!-- Start:AutoList:: Modify `rules.js` and run `gulp readme` to update this block -->' +
      createRuleList() +
      '<!-- End:AutoList -->'
    );
    content = content.replace(
      /^<!-- Start:AutoTable((.*?(\n))+.*?)End:AutoTable -->$/gm,
      '<!-- Start:AutoTable:: Modify `rules.js` and run `gulp readme` to update this block -->\n' +
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

export {
  updateReadme,
};
