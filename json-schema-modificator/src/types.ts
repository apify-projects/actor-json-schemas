import { AddDescriptionRule } from './rules/add-description-rule.js';
import { ReplaceValueRule } from './rules/replace-value-rule.js';
import { RemoveValueRule } from "./rules/remove-value-rule.js";

type Primitive = string | number | boolean | null | undefined;

interface Arr extends Array<JsonValue> {}

export type JsonValue = Primitive | JsonObject | Arr;

export interface JsonObject {
    [member: string]: JsonValue;
}

export interface ObjectPropertyInfo<VALUE = JsonValue> {
    key?: string,
    value: VALUE;
    jsonPointer: string;
    parent?: ObjectPropertyInfo<JsonObject>;
}

export interface AbstractRule<TYPE extends string> {
    __type: TYPE;
    __apply: (objectPropertyInfo: ObjectPropertyInfo, json: JsonObject) => void
    jsonPath: string;
}

// RULES
export type Rule = AddDescriptionRule | ReplaceValueRule | RemoveValueRule;
