"use strict";
var es6_promise_1 = require("es6-promise");
var https = require("https");
var rules_1 = require("./rules");
function camelCaseToDash(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function arrayDiff(source, target) {
    return source.filter(function (item) { return target.indexOf(item) === -1; });
}
function requestFromGithub(path, callback) {
    var options = {
        path: path,
        host: 'api.github.com',
        headers: {
            'User-Agent': 'tslint-eslint-rules'
        }
    };
    https.get(options, function (resp) {
        resp.setEncoding('utf8');
        var buffer = [];
        resp.on('data', function (chunk) {
            buffer.push(chunk);
        });
        resp.on('end', function () {
            var data = JSON.parse(buffer.join(''));
            callback(data);
        });
    }).on('error', function (e) {
        console.error(e);
    });
}
function compareToESLint() {
    return new es6_promise_1.Promise(function (fulfill) {
        requestFromGithub('/repos/eslint/eslint/contents/lib/rules', function (data) {
            var rules = data
                .filter(function (obj) { return obj.name.endsWith('.js'); })
                .map(function (obj) { return obj.name.substring(0, obj.name.length - 3); });
            var esRules = Object.keys(rules_1.ruleESMap);
            var missing = arrayDiff(rules.map(function (x) { return rules_1.toCamelCase(x); }), esRules);
            var deprecated = arrayDiff(esRules, rules.map(function (x) { return rules_1.toCamelCase(x); }));
            var buffer = [];
            if (missing.length) {
                buffer.push('Missing ESLint rules (http://eslint.org/docs/rules):');
                missing.forEach(function (rule) {
                    var name = camelCaseToDash(rule);
                    buffer.push("- " + name);
                });
            }
            if (deprecated.length) {
                buffer.push('Deprecated ESLint rules:');
                deprecated.forEach(function (rule) {
                    var name = camelCaseToDash(rule);
                    buffer.push("- " + name);
                });
            }
            if (missing.length + deprecated.length === 0) {
                buffer.push('ESLint rules are in sync!');
            }
            console.log(buffer.join('\n'), '\n');
            fulfill();
        });
    });
}
exports.compareToESLint = compareToESLint;
function compareToTSLint() {
    return new es6_promise_1.Promise(function (fulfill) {
        requestFromGithub('/repos/palantir/tslint/contents/src/rules', function (data) {
            var rules = data
                .filter(function (obj) { return obj.name.endsWith('.ts'); })
                .map(function (obj) { return obj.name.substring(0, obj.name.length - 7); });
            var notInUse = require('../../src/readme/unusedTSLintRules.json');
            notInUse.forEach(function (name) {
                var camel = rules_1.toCamelCase(name);
                var index = rules.indexOf(camel);
                if (index > -1) {
                    rules.splice(index, 1);
                }
            });
            var tsRules = Object.keys(rules_1.ruleTSMap);
            var missing = arrayDiff(rules, tsRules);
            var buffer = [];
            if (missing.length) {
                buffer.push('Missing TSLint rules (http://palantir.github.io/tslint/rules):');
                missing.forEach(function (rule) {
                    var name = camelCaseToDash(rule);
                    buffer.push("- " + name);
                });
            }
            else {
                buffer.push('TSLint rules are in sync!');
            }
            console.log(buffer.join('\n'), '\n');
            fulfill();
        });
    });
}
exports.compareToTSLint = compareToTSLint;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUExQyxDQUEwQyxDQUFDLENBQUM7WUFFMUQsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7WUFDcEUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0JBQ3BCLElBQU0sS0FBSyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVMsQ0FBQyxDQUFDO1lBQ3ZDLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDMUMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRWxCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLGdFQUFnRSxDQUFDLENBQUM7Z0JBQzlFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO29CQUNuQixJQUFNLElBQUksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBSyxJQUFNLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckMsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUlDLDBDQUFlIiwiZmlsZSI6InJlYWRtZS9mZXRjaC5qcyIsInNvdXJjZVJvb3QiOiJDOlxcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
