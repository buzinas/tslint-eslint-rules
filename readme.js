const fs = require('fs');
const ruleMod = require('./rules');

function formatUsage(usage) {
  return usage.replace(/~~~/g, '```');
}

function createRuleList() {
  const buffer = [];
  var category = null;
  ruleMod.rules.forEach((rule) => {
    if (category !== rule.category) {
      category = rule.category;
      buffer.push(`### ${category}\n\n`);
      buffer.push(`${ruleMod.categories[category]}\n`)
    }
    const note = rule.note ? `  * Note: ${rule.note}\n` : ''
    const msg = `
* [${rule.eslintRule}](${rule.eslintUrl}) => ${rule.tslintRule} (${rule.provider})
  * Description: ${rule.description}
  * Usage

    ${formatUsage(rule.usage)}

${note}`;
    buffer.push(msg);
  });
  return buffer.join('');
}

function updateReadme() {
  fs.readFile('README.md', 'utf8', (err, data) => {
    if (err) {
      return console.error(err);
    }
    const content = data.replace(
      /^<!-- Start:AutoList((.*?(\n))+.*?)End:AutoList -->$/gm,
      '<!-- Start:AutoList:: Modify `readme.js` and run `gulp readme` to update this block -->\n' +
      createRuleList() +
      '<!-- End:AutoList -->\n'
    );
    fs.writeFile('README.md', content, 'utf8', (err) => {
      if (err) {
        return console.error(err);
      }
    });
  });
}


updateReadme();
