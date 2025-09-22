import { promises as fs } from 'node:fs';
import { JsonSchemaObject, JsonSchemaValue } from './types.js';
import path from 'node:path';
import crypto from 'node:crypto';

function isPlainJsonObject(input: unknown): boolean {
    return typeof input === 'object'
        && input !== null
        && !Array.isArray(input)
        && Object.getPrototypeOf(input) === Object.prototype;
}

interface ObjectPropertyInfo<T =JsonSchemaValue> {
    key: string,
    value: T;
    jsonPointer: string;
    parent?: ObjectPropertyInfo<JsonSchemaObject>;
}

function *iterateJsonProperties(input: JsonSchemaObject, parentJsonPath = ''): Generator<ObjectPropertyInfo> {
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

function md5(input: string): string {
    return crypto.createHash('md5').update(input).digest('hex');
}

async function includeJsonByPath(absolutePath: string) {
    try {
        return JSON.parse(await fs.readFile(absolutePath, 'utf8'));
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Problem during including "${absolutePath}"!`, error.message)
        } else {
            console.error(`Problem during including "${absolutePath}"!`)
        }
        process.exit(1);
    }
}

export async function bundleJsonSchema(
    filePath: string,
    jsonSchema?: JsonSchemaObject,
): Promise<JsonSchemaObject> {
    jsonSchema ??= await includeJsonByPath(filePath);

    if (!jsonSchema) {
        throw new Error(`Cannot find schema at "${filePath}"!`);
    }

    if (!isPlainJsonObject(jsonSchema)) {
        return jsonSchema ?? {};
    }

    return scopeJsonSchema(filePath, jsonSchema, jsonSchema);
}

export async function scopeJsonSchema(
    filePath: string,
    mainJsonSchema: JsonSchemaObject,
    jsonSchema: JsonSchemaObject,
    prefix = '',
): Promise<JsonSchemaObject> {
    for (const { value, jsonPointer, parent, key } of iterateJsonProperties(jsonSchema)) {
        const REF_ATTRIBUTE = '$ref';

        if (parent?.value && Object.keys(parent.value).length === 1
            && key === REF_ATTRIBUTE && value && typeof value === 'string'
        ) {
            const [refRelativeFilePath, anchorPath] = value?.trim().split('#');

            if (!refRelativeFilePath && value.startsWith('#')) {
                // Local reference
                const [_, anchorPath] = value?.trim().split('#');
                parent.value[REF_ATTRIBUTE] = `#/${prefix}/${anchorPath}`;
                console.log("Scoping ", jsonPointer , `${prefix}#${anchorPath}`);
            } else if (refRelativeFilePath && value.startsWith('https://') || value.startsWith('http://')) {
                console.log("Skipping external resource:", jsonPointer , value);
            } else if (refRelativeFilePath) {
                // External file reference
                const externalSchemaAbsolutePath = path.resolve(path.dirname(filePath), refRelativeFilePath);
                const externalSchemaFilename = path.basename(externalSchemaAbsolutePath);

                const defKey = externalSchemaFilename
                    .replace(/\W/g, '-')
                    .replace(/^-+|-+$/g, '')
                    .concat('-', md5(externalSchemaAbsolutePath));

                mainJsonSchema.$defs ??= {};

                parent.value[REF_ATTRIBUTE] = `#/$defs/${defKey}`;
                if (anchorPath) {
                    parent.value[REF_ATTRIBUTE] += `/${anchorPath}`;
                }

                if (mainJsonSchema.$defs[defKey]) {
                    // already exists
                    continue;
                }

                const externalSchema = await includeJsonByPath(externalSchemaAbsolutePath);
                mainJsonSchema.$defs[defKey] = await scopeJsonSchema(
                    externalSchemaAbsolutePath,
                    mainJsonSchema,
                    externalSchema,
                    `${defKey}${(anchorPath ? anchorPath : '')}`,
                );
            } else {
                console.error('Invalid reference: ', jsonPointer, value);
            }
        }
    }

    return jsonSchema;
}
