#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { program } from 'commander';

import { checkDescriptions } from './utils.js';

program
    .description('Check for missing description attributes in JSON schema')
    .requiredOption('-i, --input <file>', 'path to the JSON schema file')
    .option('-o, --output [file]', 'Output file path for the report (otherwise print to console)')
    .option('--json', 'Output as JSON format')
    .option('--fail-on-missing', 'Exit with error code if missing descriptions are found')
    .parse();

const options = program.opts();

const inputPath = path.resolve(process.cwd(), options.input);
if (!await fs.stat(inputPath).catch(() => false)) {
    console.error(`Cannot open file ${inputPath}!`);
    process.exit(1);
}

const result = await checkDescriptions(inputPath);

let output: string;

if (options.json) {
    // JSON format output
    output = JSON.stringify(result, null, 2);
} else {
    // Human-readable format
    const lines: string[] = [];
    lines.push(`\n=== JSON Schema Description Check Report ===`);
    lines.push(`File: ${inputPath}`);
    lines.push(`Total properties checked: ${result.totalProperties}`);
    lines.push(`Missing descriptions: ${result.missingDescriptions.length}`);
    lines.push('');

    if (result.hasIssues) {
        lines.push('Properties missing descriptions:');
        lines.push('');
        for (const missing of result.missingDescriptions) {
            lines.push(` - ${missing.jsonPointer || '(root)'}`);
        }
        lines.push(`⚠️  Found ${result.missingDescriptions.length} properties without descriptions.`);
    } else {
        lines.push('✅ All properties have descriptions!');
    }

    output = lines.join('\n');
}

if (options.output) {
    // Output to the file
    const absoluteOutputPath = path.resolve(process.cwd(), options.output);
    await fs.writeFile(absoluteOutputPath, output, { encoding: 'utf8', flag: 'w' });
    console.log(`Report written to: ${absoluteOutputPath}`);
} else {
    // Output to console
    console.log(output);
}

// Exit with error if requested and issues found
if (options.failOnMissing && result.hasIssues) {
    process.exit(1);
}
