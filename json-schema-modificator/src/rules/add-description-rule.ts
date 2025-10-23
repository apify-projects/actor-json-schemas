import { AbstractRule, JsonObject, ObjectPropertyInfo } from '../types.js';
import showdown from 'showdown';
import type { CheerioAPI, Node } from 'cheerio';
import * as cheerio from 'cheerio';
import { isPlainJsonObject } from '../utils.js';

export const RULE_NAME = 'AddDescription' as const;

export interface AddDescriptionRule extends AbstractRule<typeof RULE_NAME> {
    format: 'markdown';
    contentInMarkdown: string;
}

function reindent(code: string): string {
    if (!code) {
        return code;
    }

    const lines = code
        .replace(/^\n+/, '')
        .replace(/\n+ *$/, '')
        .replace(/^ *\n+$/, '')
        .split('\n');

    const firstLineSpaces = (lines[0].match(/^(\s*)/)?.[0] ?? '').length;

    const result: string[] = [];

    const reindentSpaces = new RegExp('^ {0,' + firstLineSpaces + '}');

    for (const line of lines) {
        result.push(line.replace(reindentSpaces, ''));
    }

    return result.join('\n');
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

function processAddDescriptionRule(objectPropertyInfo: ObjectPropertyInfo, rule: Omit<AddDescriptionRule, '__apply'>) {
    const propertyObject = objectPropertyInfo.value;

    if (propertyObject && isPlainJsonObject(propertyObject)) {
        const propertyObject = objectPropertyInfo.value as JsonObject;
        const reindentedContentInMarkdown = reindent(rule.contentInMarkdown);
        propertyObject['description'] = formatSimpleDescription(reindentedContentInMarkdown);
        propertyObject['x-intellij-html-description'] ??= formatInteliJDescription(reindentedContentInMarkdown);
        propertyObject['markdownDescription'] ??= formatVsCodeDescription(reindentedContentInMarkdown);
    } else {
        console.warn(`Cannot add description to "${objectPropertyInfo.jsonPointer}" (not and object type)!`);
    }
}

export function parseAddDescriptionRule($: CheerioAPI, ruleElement: Node): AddDescriptionRule | null {
    const format = $(ruleElement).attr('format');
    if (format === 'markdown') {
        const rule = {
            __type: RULE_NAME,
            __apply: processAddDescriptionRule,
            jsonPath: $(ruleElement).attr('json-path')!,
            format,
            contentInMarkdown: $(ruleElement).html()!,
        } as const;
        return {
            ...rule,
            __apply: (objectPropertyInfo: ObjectPropertyInfo) => processAddDescriptionRule(objectPropertyInfo, rule),
        }
    } else {
        console.warn(`Unknown format "${format}", skipping...`);
    }
    return null;
}
