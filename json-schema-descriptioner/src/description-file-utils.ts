export function parseDescriptionFile(descriptionFileContent: string): Record<string, string> {
    const sectionContentRegexp = /\[\s*]\s*\(\s*([^!].*?)\s*\)\s*(.*?)\s*\[\s*]\s*\(\s*!\s*\1\s*\)/sg;

    const result: Record<string, string> = {};
    for (const matchedSection of descriptionFileContent.matchAll(sectionContentRegexp)) {
        const [_, sectionPointer, sectionContent] = matchedSection;
        if (!result[sectionPointer]) {
            result[sectionPointer] = sectionContent;
        } else {
            console.warn(`Found second description Section for property "${sectionPointer}", skipping...`);
        }
    }

    return result;
}
