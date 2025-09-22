import showdown from 'showdown';
import * as cheerio from 'cheerio';
import type { JsonObject } from './types.js';

function isPlainJsonObject(input: unknown): boolean {
    return typeof input === 'object' &&
        input !== null &&
        !Array.isArray(input) &&
        Object.getPrototypeOf(input) === Object.prototype;
}

interface ObjectPropertyInfo {
    key: string,
    value: JsonObject;
    jsonPointer: string;
    parent?: ObjectPropertyInfo;
}

function *iterateJsonProperties(input: JsonObject, parentJsonPath = ''): Generator<ObjectPropertyInfo> {
    if (!isPlainJsonObject(input)) {
        return;
    }

    for (const [key, value] of Object.entries(input)) {
        const jsonPointer = `${parentJsonPath}/${key}`;
        const parentKey = `${parentJsonPath}`.split(/\//g).pop()!;
        if (isPlainJsonObject(value)) {
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

function formatVsCodeDescription(markdownContent: string): string | undefined {
    return markdownContent;
}

function formatInteliJDescription(markdownContent: string): string | undefined {
    return formatHtmlDescription(markdownContent);
}

function formatHtmlDescription(markdownContent: string): string | undefined {
    const markdownToHtmlConverter = new showdown.Converter({ noHeaderId: true });

    return markdownToHtmlConverter.makeHtml(markdownContent);
}

function formatSimpleDescription(markdownContent: string): string | undefined {
    const htmlDescription = formatHtmlDescription(markdownContent);
    if (!htmlDescription) {
        return undefined;
    }
    const $ = cheerio.load(htmlDescription);

    // TODO maybe we want to evaluate more than just first paragraph?
    const descriptionElement = $('p').first();

    // Add the urls after the links text as hypertext is not supported
    descriptionElement.find('a').each((_, el) => {
        const url = $(el).attr('href');
        if (url) {
            $(el).after(` (${url})`);
        }
    });

    return descriptionElement.text().trim() || undefined;
}

function fillDescriptionIfMissing(propertyObject: any, markDownDescription: string) {
    if (propertyObject['description'] == null) {
        propertyObject['description'] = formatSimpleDescription(markDownDescription);
        propertyObject['x-intellij-html-description'] ??= formatInteliJDescription(markDownDescription);
        propertyObject['markdownDescription'] ??= formatVsCodeDescription(markDownDescription);
    }
}

function isRelatedToIndirectKey(key: string, jsonPointer: string): boolean {
    return key.startsWith('**') // if key is in-direct
        && jsonPointer.endsWith(jsonPointer.replace(/^\*\*/, ''));
}

export async function enchantJsonSchema(
    jsonSchema: JsonObject,
    parsedDescriptionFile: Record<string, string>,
): Promise<unknown> {
    if (!isPlainJsonObject(jsonSchema) || !isPlainJsonObject(parsedDescriptionFile)) {
        return jsonSchema;
    }

    jsonSchema = JSON.parse(JSON.stringify(jsonSchema)); // deep copy of validation schema

    for (const { value, jsonPointer, parent } of iterateJsonProperties(jsonSchema)) {
        let relatedMarkdownSectionContent = parsedDescriptionFile[jsonPointer]?.trim();

        if (relatedMarkdownSectionContent) { // If there was defined direct json path in Description file
            fillDescriptionIfMissing(value, relatedMarkdownSectionContent)
        } else {
            if (parent && parent.key === 'properties') {
                const descriptionFileIndirectKeyItem = Object.entries(parsedDescriptionFile).find(
                    ([fileKey]) => isRelatedToIndirectKey(fileKey, jsonPointer)
                );

                if (descriptionFileIndirectKeyItem) {
                    const [_, markdownDescription] = descriptionFileIndirectKeyItem;
                    fillDescriptionIfMissing(value, markdownDescription);
                } else {
                    console.warn(`Missing description definition for "${jsonPointer}"...`);
                }
            }
        }
    }

    return jsonSchema;
}
