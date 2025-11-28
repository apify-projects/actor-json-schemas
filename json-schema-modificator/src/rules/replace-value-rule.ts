import { AbstractRule, JsonObject, ObjectPropertyInfo } from '../types.js';
import type { CheerioAPI, Node } from 'cheerio';
import vm from 'vm';
import { getJsonValue } from "../utils.js";

export const RULE_NAME = 'ReplaceValue' as const;

export interface ReplaceValueRule extends AbstractRule<typeof RULE_NAME> {
    type: 'json' | 'js';
    content: string;
}

function replaceByJsonValue(objectPropertyInfo: ObjectPropertyInfo, rule: Omit<ReplaceValueRule, '__apply'>, json: JsonObject) {
    const valueHolder = getJsonValue(json, objectPropertyInfo.jsonPointer);
    valueHolder.value = JSON.parse(rule.content);
}

function replaceByJsValue(objectPropertyInfo: ObjectPropertyInfo, rule: Omit<ReplaceValueRule, '__apply'>, json: JsonObject) {
    const valueHolder = getJsonValue(json, objectPropertyInfo.jsonPointer);
    valueHolder.value = vm.runInNewContext(rule.content, {
        value: valueHolder.value,
    });
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
            __apply: (objectPropertyInfo: ObjectPropertyInfo, json: JsonObject) => replaceByJsonValue(objectPropertyInfo, rule, json),
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
            __apply: (objectPropertyInfo: ObjectPropertyInfo, json: JsonObject) => replaceByJsValue(objectPropertyInfo, rule, json),
        } satisfies ReplaceValueRule;
    } else {
        console.warn(`Unknown format "${type}", skipping...`);
    }
    return null;
}
