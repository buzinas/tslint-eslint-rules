"use strict";
var es6_promise_1 = require("es6-promise");
var fs = require("fs");
var path = require("path");
var rules_1 = require("./rules");
function formatUsage(usage) {
    return usage.replace(/~~~/g, '```').replace(/(^[ \t]*\n)/gm, '\n').replace(/^    /mg, '');
}
exports.formatUsage = formatUsage;
function createRuleTable() {
    var buffer = [];
    var category = null;
    rules_1.rules.forEach(function (rule) {
        if (category !== rule.category) {
            category = rule.category;
            buffer.push("\n### " + category + "\n\n");
            buffer.push(rules_1.categories[category] + "\n\n");
            buffer.push('| :grey_question: | ESLint | TSLint | Description |\n');
            buffer.push('| :---            | :---:  | :---:  | :---        |\n');
        }
        var available;
        if (rule.available) {
            available = rule.provider === 'native' ? ':ballot_box_with_check:' : ':white_check_mark:';
        }
        else {
            available = rule.tslintRule === 'Not applicable' ? ':no_entry_sign:' : ':x:';
        }
        var tsRuleName = rule.tslintUrl ? "[" + rule.tslintRule + "](" + rule.tslintUrl + ")" : rule.tslintRule;
        var tsRule = rule.tslintRule === 'Not applicable' ? 'Not applicable' : tsRuleName;
        buffer.push('|');
        buffer.push(available + "|");
        buffer.push("[" + rule.eslintRule + "](" + rule.eslintUrl + ")|");
        buffer.push(tsRule + "|");
        buffer.push(rule.description + "|");
        buffer.push('\n');
    });
    return buffer.join('');
}
function updateReadme(cb) {
    fs.readFile('README.md', 'utf8', function (readErr, data) {
        if (readErr) {
            return console.error(readErr);
        }
        var content = data.replace(/^<!-- Start:AutoTable((.*?(\n))+.*?)End:AutoTable -->$/gm, '<!-- Start:AutoTable:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->\n' +
            createRuleTable() +
            '<!-- End:AutoTable -->');
        fs.writeFile('README.md', content, 'utf8', function (writeErr) {
            if (writeErr) {
                return console.error(writeErr);
            }
            console.log('[DONE] updating README.md ...');
            cb();
        });
    });
}
exports.updateReadme = updateReadme;
function createRuleContent(rule) {
    var ruleName = rules_1.toCamelCase(rule.tslintRule);
    var moduleName = "../rules/" + ruleName + "Rule.js";
    var module = require(moduleName);
    var metaData = module.Rule.metadata;
    var srcBase = 'https://github.com/buzinas/tslint-eslint-rules/blob/master/src';
    var ruleBadge = 'https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg';
    var testBadge = 'https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg';
    if (metaData) {
        if (metaData.ruleName !== rule.tslintRule) {
            console.warn('[WARNING]: metadata.ruleName !== rule.tslintRule');
            console.warn("           " + metaData.ruleName + " !== " + rule.tslintRule);
        }
        if (metaData.description !== rule.description) {
            console.warn('[WARNING]: metadata.description !== rule.description');
            console.warn("           " + metaData.description + " !== " + rule.description);
        }
        var examples = metaData.optionExamples.map(function (x) { return ['```json', x, '```'].join(''); }).join('\n\n');
        var schema = [
            '```json',
            JSON.stringify(metaData.options, null, 2),
            '```'
        ].join('\n');
        return [
            "## " + rule.tslintRule + " (ESLint: [" + rule.eslintRule + "](" + rule.eslintUrl + "))",
            "[![rule_source](" + ruleBadge + ")](" + srcBase + "/rules/" + ruleName + "Rule.ts)",
            "[![test_source](" + testBadge + ")](" + srcBase + "/test/rules/" + ruleName + "RuleTests.ts)",
            '',
            rule.description + "\n",
            "#### Rationale\n" + metaData.rationale,
            "### Config\n" + metaData.optionsDescription,
            "#### Examples\n\n" + examples,
            "#### Schema\n\n" + schema
        ].join('\n');
    }
    var usage = rule.usage ? "\n\n### Usage\n\n" + formatUsage(rule.usage) : '';
    var note = rule.note ? "\n\n### Note\n\n" + rule.note + "\n" : '';
    return "## " + rule.tslintRule + " (ESLint: [" + rule.eslintRule + "](" + rule.eslintUrl + "))\n[![rule_source](" + ruleBadge + ")](" + srcBase + "/rules/" + ruleName + "Rule.ts)\n[![test_source](" + testBadge + ")](" + srcBase + "/test/rules/" + ruleName + "RuleTests.ts)\n\n" + rule.description + usage + note + "\n";
}
function updateRuleFile(name, rule) {
    var baseUrl = 'https://github.com/buzinas/tslint-eslint-rules/blob/master';
    var docFileName = "src/docs/rules/" + name + "Rule.md";
    return new es6_promise_1.Promise(function (fulfill, reject) {
        fs.readFile(docFileName, 'utf8', function (readErr, data) {
            rule.tslintUrl = rule.tslintUrl || baseUrl + "/" + docFileName;
            var content = readErr || !data ? '<!-- Start:AutoDoc\n End:AutoDoc -->' : data;
            content = content.replace(/^<!-- Start:AutoDoc((.*?(\n))+.*?)End:AutoDoc -->$/gm, [
                '<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->\n',
                createRuleContent(rule),
                '\n<!-- End:AutoDoc -->' + (readErr ? '\n' : '')
            ].join(''));
            fs.writeFile(docFileName, content, 'utf8', function (writeErr) {
                if (writeErr) {
                    return reject(writeErr);
                }
                console.log(" - " + name);
                fulfill();
            });
        });
    });
}
function updateRuleFiles(cb) {
    var ruleDir = 'src/rules/';
    var allFiles = fs.readdirSync(ruleDir).filter(function (file) { return fs.lstatSync(path.join(ruleDir, file)).isFile(); });
    var ruleNames = allFiles
        .filter(function (name) { return /\.ts$/.test(name); })
        .map(function (name) { return name.substr(0, name.length - 7); });
    var allPromises = [];
    ruleNames.forEach(function (name) {
        allPromises.push(updateRuleFile(name, rules_1.ruleTSMap[name]));
    });
    es6_promise_1.Promise.all(allPromises).then(function () {
        console.log('[DONE] processing rule files ...');
        cb();
    });
}
exports.updateRuleFiles = updateRuleFiles;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFNLEVBQUUsVUFBQyxRQUFRO2dCQUNsRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFCLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFNLElBQU0sQ0FBQyxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCx5QkFBeUIsRUFBWTtJQUNuQyxJQUFNLE9BQU8sR0FBRyxZQUFZLENBQUM7SUFDN0IsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQzdDLFVBQUEsSUFBSSxJQUFJLE9BQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUEvQyxDQUErQyxDQUN4RCxDQUFDO0lBQ0YsSUFBTSxTQUFTLEdBQUcsUUFBUTtTQUN2QixNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFsQixDQUFrQixDQUFDO1NBQ2xDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztJQUNoRCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7UUFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGlCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0lBRUgscUJBQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNoRCxFQUFFLEVBQUUsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUtDLDBDQUFlIiwiZmlsZSI6InJlYWRtZS9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9Xb3JrL0RldmVsb3BtZW50L3dvcmtzcGFjZS90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
