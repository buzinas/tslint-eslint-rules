/*
Utility for using existing eslint rules without duplicating configs.

```js
import { CLIEngine } from "eslint";
import { getTslintEslintRulesList } from "tslint-eslint-rules/dist/tools/convertEslintConfig";

const engine = new CLIEngine();
const config = engine.getConfigForFile("./src");

const rules = getTslintEslintRulesList(config);
```
*/

import { IRule, Provider, rules } from '../readme/rules';

function findMetaForEslintRule(eslintRuleName: string): IRule | undefined {
  const possible = rules.filter(r => r.eslintRule === eslintRuleName);
  if (possible.length === 1) {
    return possible[0];
  }
  return undefined;
}

function getRulesList(config: any, provider: Provider) {
  const rules = config.rules;

  const tslintRules = {};
  Object.keys(rules).forEach(eslintRuleName => {
    const meta = findMetaForEslintRule(eslintRuleName);

    if (meta && meta.provider === provider && meta.available && meta.tslintRule && meta.tslintRule !== 'Not applicable') {
      tslintRules[meta.tslintRule] = rules[eslintRuleName];
    }
  });

  return tslintRules;
}

export function getNativeRulesList(config: any) {
  return getRulesList(config, 'native');
}

export function getTslintEslintRulesList(config: any) {
  return getRulesList(config, 'tslint-eslint-rules');
}
