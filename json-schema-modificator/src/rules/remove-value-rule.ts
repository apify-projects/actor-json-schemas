import { AbstractRule, ObjectPropertyInfo } from '../types.js';
import type { CheerioAPI, Node } from 'cheerio';

export const RULE_NAME = 'RemoveValue' as const;

export interface RemoveValueRule extends AbstractRule<typeof RULE_NAME> {}

function removeValue(objectPropertyInfo: ObjectPropertyInfo) {
    if (objectPropertyInfo.parent?.value !== undefined) {
        objectPropertyInfo.parent.value[objectPropertyInfo.key] = undefined;
    }
}

export function parseReplaceValueRule($: CheerioAPI, ruleElement: Node): RemoveValueRule | null {
    return {
        __type: RULE_NAME,
        jsonPath: $(ruleElement).attr('json-path')!,
        __apply: (objectPropertyInfo: ObjectPropertyInfo) => removeValue(objectPropertyInfo),
    } satisfies RemoveValueRule;
}
