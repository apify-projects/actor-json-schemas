import { Rule } from './types.js';
import { load as cheerioLoad } from 'cheerio';
import * as addDescriptionRule from './rules/add-description-rule.js';
import * as replaceValueRule from './rules/replace-value-rule.js';
import * as removeValueRule from './rules/remove-value-rule.js';

export function parseRuleFile(ruleFileContent: string): Rule[] {
    const supportedRules: Rule[] = [];

    const $ = cheerioLoad(ruleFileContent, { xml: true });

    $('Enchantments > *').each((_, ruleElement) => {
        const tagName = $(ruleElement).get(0).tagName;

        let rule: Rule | null = null;
        switch (tagName) {
            case addDescriptionRule.RULE_NAME:
                rule = addDescriptionRule.parseAddDescriptionRule($, ruleElement);
                break;
            case replaceValueRule.RULE_NAME:
                rule = replaceValueRule.parseReplaceValueRule($, ruleElement);
                break;
            case removeValueRule.RULE_NAME:
                rule = removeValueRule.parseReplaceValueRule($, ruleElement);
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
