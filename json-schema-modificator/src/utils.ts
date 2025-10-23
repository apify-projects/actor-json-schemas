import { JsonObject, JsonValue, ObjectPropertyInfo, Rule } from './types.js';

export function isPlainJsonObject(input: unknown): boolean {
    return typeof input === 'object' &&
        input !== null &&
        !Array.isArray(input) &&
        Object.getPrototypeOf(input) === Object.prototype;
}

function isIterable(input: unknown): boolean {
    return isPlainJsonObject(input) || Array.isArray(input)
}

function *iterateJsonProperties(input: JsonObject, parentJsonPath = ''): Generator<ObjectPropertyInfo> {
    if (Array.isArray(input)) {
        for (let i = 0; i < input.length; i++) {
            const jsonPointer = `${parentJsonPath}/${i}`;
            for (const result of iterateJsonProperties(input[i], jsonPointer)) {
                yield result;
            }
        }
        return;
    }

    if (!isPlainJsonObject(input)) {
        return;
    }

    for (const [key, value] of Object.entries(input)) {
        const jsonPointer = `${parentJsonPath}/${key}`;
        const parentKey = `${parentJsonPath}`.split(/\//g).pop()!;

        if (isIterable(value)) {
            const objectValue = value as JsonObject;
            yield ({
                key,
                value: objectValue,
                jsonPointer,
                parent: parentJsonPath ? {
                    key: parentKey,
                    value: input,
                    jsonPointer: parentJsonPath,
                } : undefined
            });

            for (const result of iterateJsonProperties(objectValue, jsonPointer)) {
                yield result;
            }
        } else {
            const objectValue = value as JsonValue;
            yield ({
                key,
                value: objectValue,
                jsonPointer,
                parent: {
                    key: parentKey,
                    value: input,
                    jsonPointer: parentJsonPath ?? '/',
                }
            });
        }
    }
}

export function parseJsonContent(jsonContent: string): JsonObject {
    try {
        return JSON.parse(jsonContent); // Check if the file contains parsable JSON.
    } catch (e) {
        throw new Error(`Problem during parsing JSON file!`);
    }
}

function matchesJsonPointer(ruleJsonPointer: string, attributteJsonPointer: string): boolean {
    return ruleJsonPointer === attributteJsonPointer
        // Basic support for using wildcard symbols
        || (
            ruleJsonPointer.startsWith('**')
            && attributteJsonPointer.endsWith(ruleJsonPointer.replace(/^\*\*/, ''))
        );
}

export async function enchantJsonSchema(
    jsonSchema: JsonObject,
    enchantmentRules: Rule[],
): Promise<unknown> {
    if (!isIterable(jsonSchema)) {
        return jsonSchema;
    }

    jsonSchema = JSON.parse(JSON.stringify(jsonSchema)); // deep copy of validation schema

    for (const jsonPropertyInfo of iterateJsonProperties(jsonSchema)) {
        const { value, jsonPointer, parent } = jsonPropertyInfo;

        const relatedRules = enchantmentRules
            .filter((enchantmentRule) => matchesJsonPointer(enchantmentRule.jsonPath, jsonPointer));

        for (const relatedRule of relatedRules) {
            relatedRule.__apply(jsonPropertyInfo);
        }
    }

    return jsonSchema;
}
