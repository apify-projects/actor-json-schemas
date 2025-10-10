# JSON Schema Bundler

A small CLI that bundles JSON Schemas by resolving local file $ref references into a single, self‑contained schema using $defs. It keeps external HTTP(S) references (for now) as-is and correctly scopes local anchors.

What it does
- Converts local file $ref values into in-document references under $defs.
- Recursively inlines referenced schemas and their nested references.
- Preserves external references that start with http:// or https://.
- Rewrites local-anchor references (#/...) so they continue to work after bundling.

Installation
- Local repo usage: this package is already part of the monorepo; run via npm scripts or tsx during development.
- From Node.js (>= 20) environment you can use it via npx once it’s published:

```bash
npx json-schema-bundler --help
```

CLI usage

```bash
json-schema-bundler -i <file> [-o <file>]
```

Options
- -i, --input <file>        Path to the JSON Schema file to bundle. Required.
- -o, --output [file]       Output file path. If omitted, the bundled schema is printed to stdout.

Notes
- The tool will skip bundling for external HTTP(S) $ref targets and leave them untouched.
- Definitions are placed under $defs using a stable key derived from the referenced file name and an md5 of the absolute path, to avoid key collisions.
- You can overwrite a file in-place by setting the same path for -i and -o.

Examples
- Print bundled schema to stdout

```bash
json-schema-bundler -i ./schemas/input.json
```

- Write bundled schema to file

```bash
json-schema-bundler -i ./schemas/input.json -o ./dist/input.bundled.json
```

- Overwrite existing schema in-place (careful!)

```bash
json-schema-bundler -i ./output/input.json -o ./output/input.json
```

Exit codes
- 0: Success
- 1: Input file cannot be read or another fatal error occurred

See also
- Repository helper script that uses this tool: ./scripts/bundle-json-schemas.sh
