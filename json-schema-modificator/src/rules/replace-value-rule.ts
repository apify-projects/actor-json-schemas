import { AbstractRule, ObjectPropertyInfo } from '../types.js';
import type { CheerioAPI, Node } from 'cheerio';
import vm from 'vm';

const RULE_NAME = 'ReplaceValue' as const;

export interface ReplaceValueRule extends AbstractRule<typeof RULE_NAME> {
    type: 'json' | 'js';
    content: string;
}

function replaceByJsonValue(objectPropertyInfo: ObjectPropertyInfo, rule: Omit<ReplaceValueRule, '__apply'>) {
    if (objectPropertyInfo.parent?.value) {
        objectPropertyInfo.parent.value[objectPropertyInfo.key] = JSON.parse(rule.content);
    }
}

function replaceByJsValue(objectPropertyInfo: ObjectPropertyInfo, rule: Omit<ReplaceValueRule, '__apply'>) {
    if (objectPropertyInfo.parent?.value) {
        objectPropertyInfo.parent.value[objectPropertyInfo.key] = vm.runInNewContext(rule.content, {
            value: objectPropertyInfo.value,
        });
    }
}

export function parseReplaceValueRule($: CheerioAPI, ruleElement: Node): ReplaceValueRule | null {
    const type = $(ruleElement).attr('type');

    if (type === 'json') {
        const rule = {
            __type: RULE_NAME,
            jsonPath: $(ruleElement).attr('json-path')!,
            type,
            content: $(ruleElement).text()!,
        } as const;
        return {
            ...rule,
            __apply: (objectPropertyInfo: ObjectPropertyInfo) => replaceByJsonValue(objectPropertyInfo, rule),
        } satisfies ReplaceValueRule;
    } else if (type === 'js') {
        const rule = {
            __type: RULE_NAME,
            jsonPath: $(ruleElement).attr('json-path')!,
            type,
            content: $(ruleElement).text()!,
        } as const;
        return {
            ...rule,
            __apply: (objectPropertyInfo: ObjectPropertyInfo) => replaceByJsValue(objectPropertyInfo, rule),
        } satisfies ReplaceValueRule;
    } else {
        console.warn(`Unknown format "${type}", skipping...`);
    }
    return null;
}
