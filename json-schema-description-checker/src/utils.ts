import { promises as fs } from 'node:fs';
import { JsonSchemaObject, JsonSchemaValue, MissingDescription, CheckResult } from './types.js';

function isPlainJsonObject(input: unknown): boolean {
    return typeof input === 'object'
        && input !== null
        && !Array.isArray(input)
        && Object.getPrototypeOf(input) === Object.prototype;
}

interface ObjectPropertyInfo<T = JsonSchemaValue> {
    key: string;
    value: T;
    jsonPointer: string;
    parent?: ObjectPropertyInfo<JsonSchemaObject>;
}

function* iterateJsonProperties(input: JsonSchemaObject, parentJsonPath = ''): Generator<ObjectPropertyInfo> {
    if (isPlainJsonObject(input)) {
        for (const [key, value] of Object.entries(input)) {
            const jsonPointer = `${parentJsonPath}/${key}`;
            const parentKey = `${parentJsonPath}`.split(/\//g).pop()!;

            for (const val of [value].flatMap(v => v)) {
                const objectValue = val as JsonSchemaObject;
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
            }
        }
    }
}

async function loadJsonSchema(filePath: string): Promise<JsonSchemaObject> {
    try {
        if (/^https?:\/\//.test(filePath)) {
            const res = await fetch(filePath);
            if (!res.ok) {
                console.error(`Problem during fetching "${filePath}" HTTP ${res.status} ${res.statusText}!`);
                process.exit(1);
            }
            return await res.json();
        }
        return JSON.parse(await fs.readFile(filePath, 'utf8'));
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Problem during loading "${filePath}"!`, error.message);
        } else {
            console.error(`Problem during loading "${filePath}"!`);
        }
        process.exit(1);
    }
}

export async function checkDescriptions(filePath: string): Promise<CheckResult> {
    const jsonSchema = await loadJsonSchema(filePath);

    if (!isPlainJsonObject(jsonSchema)) {
        return {
            totalProperties: 0,
            missingDescriptions: [],
            hasIssues: false,
        };
    }

    const missingDescriptions: MissingDescription[] = [];
    let totalProperties = 0;

    // Check root schema description
    if (!jsonSchema.description) {
        missingDescriptions.push({
            jsonPointer: '',
            propertyName: '<root>',
            parentPath: '',
        });
    }

    // Iterate through all properties
    for (const { value, jsonPointer, parent, key } of iterateJsonProperties(jsonSchema)) {
        // Check if this is a property definition within a "properties" object
        if (parent?.key === 'properties' && isPlainJsonObject(value)) {
            totalProperties++;

            const propertySchema = value as JsonSchemaObject;

            // Check if the property has a description
            if (!propertySchema.description || propertySchema.description.trim() === '') {
                missingDescriptions.push({
                    jsonPointer,
                    propertyName: key,
                    parentPath: parent.jsonPointer || '<root>',
                });
            }
        }

        // Also check items in arrays (for array type properties)
        if (key === 'items' && isPlainJsonObject(value)) {
            const itemSchema = value as JsonSchemaObject;
            if (!itemSchema.description || itemSchema.description.trim() === '') {
                missingDescriptions.push({
                    jsonPointer,
                    propertyName: 'items',
                    parentPath: parent?.jsonPointer || '<root>',
                });
            }
        }

        // Check definitions/components
        if ((parent?.key === 'definitions' || parent?.key === '$defs' || parent?.key === 'components')
            && isPlainJsonObject(value)) {
            const defSchema = value as JsonSchemaObject;
            if (!defSchema.description || defSchema.description.trim() === '') {
                missingDescriptions.push({
                    jsonPointer,
                    propertyName: key,
                    parentPath: parent.jsonPointer || '<root>',
                });
            }
        }
    }

    return {
        totalProperties,
        missingDescriptions,
        hasIssues: missingDescriptions.length > 0,
    };
}
