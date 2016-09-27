import * as https from 'https';
import { ruleTSMap, ruleESMap, toCamelCase } from './rules';

function camelCaseToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function arrayDiff(source, target) {
  return source.filter(item => target.indexOf(item) === -1);
}

function requestFromGithub(path, callback) {
  const options = {
    path,
    host: 'api.github.com',
    headers: {
      'User-Agent': 'tslint-eslint-rules'
    }
  };
  https.get(options, (resp) => {
    resp.setEncoding('utf8');
    const buffer = [];
    resp.on('data', (chunk) => {
      buffer.push(chunk);
    });
    resp.on('end', () => {
      const data = JSON.parse(buffer.join(''));
      callback(data);
    });
  }).on('error', (e) => {
    console.error(e);
  });
}

function compareToESLint() {
  return new Promise((fulfill, reject) => {
    requestFromGithub('/repos/eslint/eslint/contents/lib/rules', (data) => {
      const rules = data
        .filter(obj => obj.name.endsWith('.js'))
        .map(obj => obj.name.substring(0, obj.name.length - 3));

      const esRules = Object.keys(ruleESMap);
      const missing = arrayDiff(rules.map(x => toCamelCase(x)), esRules);
      const deprecated = arrayDiff(esRules, rules.map(x => toCamelCase(x)));
      const buffer = [];

      if (missing.length) {
        buffer.push('Missing ESLint rules (http://eslint.org/docs/rules):');
        missing.forEach((rule) => {
          const name = camelCaseToDash(rule);
          buffer.push(`- ${name}`);
        });
      }

      if (deprecated.length) {
        buffer.push('Deprecated ESLint rules:');
        deprecated.forEach((rule) => {
          const name = camelCaseToDash(rule);
          buffer.push(`- ${name}`);
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

function compareToTSLint() {
  return new Promise((fulfill, reject) => {
    requestFromGithub('/repos/palantir/tslint/contents/src/rules', (data) => {
      const rules = data
        .filter(obj => obj.name.endsWith('.ts'))
        .map(obj => obj.name.substring(0, obj.name.length - 7));

      const notInUse = require('../../src/readme/unusedTSLintRules.json');
      notInUse.forEach((name) => {
        const camel = toCamelCase(name);
        const index = rules.indexOf(camel);
        if (index > -1) {
          rules.splice(index, 1);
        }
      });

      const tsRules = Object.keys(ruleTSMap);
      const missing = arrayDiff(rules, tsRules);
      const buffer = [];

      if (missing.length) {
        buffer.push('Missing TSLint rules (http://palantir.github.io/tslint/rules):');
        missing.forEach((rule) => {
          const name = camelCaseToDash(rule);
          buffer.push(`- ${name}`);
        });
      } else {
        buffer.push('TSLint rules are in sync!');
      }
      console.log(buffer.join('\n'), '\n');
      fulfill();
    });
  });
}

export {
  compareToESLint,
  compareToTSLint,
};
