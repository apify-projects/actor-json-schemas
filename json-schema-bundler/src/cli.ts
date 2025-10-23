#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { program } from 'commander';

import { bundleJsonSchema } from './utils.js';

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

const enchantedJsonSchema = await bundleJsonSchema(inputPath);
const output = JSON.stringify(enchantedJsonSchema, null, 2);

if (options.output) {
    // Output to the file
    const absoluteOutputPath = path.resolve(process.cwd(), options.output);
    await fs.writeFile(absoluteOutputPath, output, { encoding: 'utf8', flag: 'w' });
} else {
    // Output to console
    console.log(output);
}
