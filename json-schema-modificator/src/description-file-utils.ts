import { Rule } from './types.js';
import { load as cheerioLoad } from 'cheerio';
import { parseAddDescriptionRule } from './rules/add-description-rule.js';
import { parseReplaceValueRule } from './rules/replace-value-rule.js';

enum RuleType {
    AddDescription = 'AddDescription',
    ReplaceValue = 'ReplaceValue',
}

export function parseRuleFile(ruleFileContent: string): Rule[] {
    const supportedRules: Rule[] = [];

    const $ = cheerioLoad(ruleFileContent, { xml: true });

    $('Enchantments > *').each((_, ruleElement) => {
        const tagName = $(ruleElement).get(0).tagName;

        let rule: Rule | null = null;
        switch (tagName) {
            case RuleType.AddDescription:
                rule = parseAddDescriptionRule($, ruleElement);
                break;
            case RuleType.ReplaceValue:
                rule = parseReplaceValueRule($, ruleElement);
                break;
            default:
                console.warn(`Unknown Rule "${tagName}", skipping...`);
        }

        if (rule) {
            supportedRules.push(rule);
        }
    });

    return supportedRules;
}
