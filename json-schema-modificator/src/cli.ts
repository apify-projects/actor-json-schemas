#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { program } from 'commander';

import { enchantJsonSchema, parseJsonContent } from './utils.js';
import { parseRuleFile } from './description-file-utils.js';

program
    .description('Generate a JSON-schema with property descriptions based on markdown file')
    .requiredOption('-i, --input <file>', 'path to the JSON-schema file')
    .option('-d, --description <file>', 'Path to the Description markdown file')
    .option('-o, --output [file]', 'Output file path for the resulted json-schema (otherwise just print to the console)')
    .parse();

const options = program.opts();

const inputPath = path.resolve(process.cwd(), options.input);
if (!await fs.stat(inputPath).catch(() => false)) {
    console.error(`Cannot open file ${inputPath}!`);
    process.exit(1);
}

const parsedInputPath = path.parse(inputPath);

const jsonSchemaFileContent = await fs.readFile(inputPath, 'utf8');
const jsonSchemaParsed = parseJsonContent(jsonSchemaFileContent);

const DEFAULT_DESCRIPTION_FILEPATH = `${parsedInputPath.dir}/${parsedInputPath.name}`
    + `.description.md`;
const descriptionFilepath = path.resolve(process.cwd(), options.description ?? DEFAULT_DESCRIPTION_FILEPATH);

if (!await fs.stat(descriptionFilepath).catch(() => false)) {
    console.error(`Cannot open input schema at "${descriptionFilepath}"!`);
    process.exit(1);
}

const enchantmentsRules = parseRuleFile(await fs.readFile(descriptionFilepath, 'utf8'));

const enchantedJsonSchema = await enchantJsonSchema(jsonSchemaParsed, enchantmentsRules);
const output = JSON.stringify(enchantedJsonSchema, null, 4)

if (options.output) {
    // Output to the file
    const absoluteOutputPath = path.resolve(process.cwd(), options.output);
    await fs.writeFile(absoluteOutputPath, output, { encoding: 'utf8' });
} else {
    // Output to console
    console.log(output);
}
