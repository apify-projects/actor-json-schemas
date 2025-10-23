# JSON Schema Modificator

A CLI that applies transformation rules to a JSON Schema. It is primarily used in this repo to enrich upstream schemas with human‑readable descriptions and to tweak values before publishing.

What it does
- Reads an input JSON Schema.
- Loads a rules file and applies each rule to matching JSON Pointer locations in the schema.
- Writes the modified schema to a file or prints it to stdout.

CLI usage

```bash
markdown-to-json-schema-generator -i <file> [-d <rules-file>] [-o <file>]
```

Options
- -i, --input <file>          Path to the JSON Schema to modify. Required.
- -d, --description <file>    Path to the rules file. If omitted, defaults to <input>.description.md in the same directory. In this repo we use .rules.xml files and pass them explicitly via -d.
- -o, --output [file]         Output file path. If omitted, prints the modified schema to stdout.

Exit codes
- 0: Success
- 1: Input or rules file cannot be read or another fatal error occurred

Rules file format (XML)
The tool expects an XML document with the root element Enchantments. It currently supports two rule types:

1) AddDescription
- Adds description fields to an object/property using Markdown.
- Attributes:
  - json-path: JSON Pointer of the target (for example: /properties/startUrls). Supports a simple wildcard: if the path starts with **, it matches any pointer that ends with the remainder (e.g., **/description matches every node whose pointer ends with /description).
  - format: must be markdown.
- Behavior:
  - Sets description (plain text extracted from the first paragraph of the Markdown),
  - x-intellij-html-description (full HTML for JetBrains IDEs),
  - markdownDescription (for VS Code),
  on the targeted JSON object.

Example
```xml
<Enchantments>
  <AddDescription json-path="/properties/startUrls" format="markdown">
    Start URLs to begin the crawl. You can provide a list of absolute URLs or relative paths.

    See the docs: https://docs.example.com/crawling
  </AddDescription>
</Enchantments>
```

2) ReplaceValue
- Replaces the value at the matched JSON Pointer.
- Attributes:
  - json-path: JSON Pointer of the target (supports the same ** suffix wildcard behavior as above).
  - type: json | js
- Behavior:
  - type="json": the element text is parsed as JSON and used as the new value.
  - type="js": the element text is treated as a JavaScript expression and evaluated in a sandbox with a single variable available: value (the current value at the path). The expression result becomes the new value.

Examples
JSON replacement
```xml
<Enchantments>
  <ReplaceValue json-path="/properties/maxResults/default" type="json">100</ReplaceValue>
</Enchantments>
```

JS replacement
```xml
<Enchantments>
  <!-- Replaces the original value with a string "Example value: my-original-value" -->
  <ReplaceValue json-path="/properties/slug/example" type="js">`Example value: ${value.replace(/\W+/g, '-')}`</ReplaceValue>
</Enchantments>
```

Notes
- json-path must be an exact JSON Pointer (e.g., /properties/foo/type). Arrays are addressed by 0‑based indices (e.g., /items/0/type).
- Wildcard matching is very simple: only paths that start with ** are treated as "match any prefix" and then must end with the remainder. There is no full globbing.
- The tool deep‑copies the input schema internally before applying changes.

Examples (CLI)
- Print modified schema to stdout using an explicit rules file

```bash
markdown-to-json-schema-generator -i ./downloaded-json-schemas/input.json -d ./json-schemas-description/input.rules.xml
```

- Write output to a file

```bash
markdown-to-json-schema-generator -i ./downloaded-json-schemas/input.json -d ./json-schemas-description/input.rules.xml -o ./output/input.json
```

- Overwrite in-place

```bash
markdown-to-json-schema-generator -i ./output/input.json -d ./json-schemas-description/input.rules.xml -o ./output/input.json
```

See also
- Repository helper script that uses this tool: ./scripts/describe-json-schemas.sh
