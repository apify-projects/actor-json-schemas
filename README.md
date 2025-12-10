# Apify Actor JSON schemas

Welcome to the workflow repository of processing JSON Schemas for Apify Actor JSON files! This project aims to provide workflow for
up-to-date and publicly accessible JSON schemas to help developers build robust and error-free Apify Actors.

## The Problem

Apify Actors use various JSON files to define their behavior, input, and output. Manually writing or editing these 
files can be prone to errors, which can lead to issues later when the Actor is run on the Apify platform.

## Our Solution

We've created a set of JSON Schemas that you can use to validate your Actor's JSON files _before_ you push them to the 
platform. By adding these schemas to your project, you gain two major benefits:

1.  **Validation:** Supported code editors can use the schema to check your JSON file for syntax errors and schema 
    compliance. This helps you catch mistakes early.

2.  **Code Completion:** Many editors offer intelligent code completion based on the defined schemas. This means you 
    can get suggestions for keys and values as you type, making the development process faster and more efficient.

## Available schemas

We currently offer schemas for the following Apify Actor JSON files:

-   **`actor.json`**: For defining the Actor's configuration.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/actor.ide.json?v=0.5`

-   **`dataset.json`**: For validating data in a dataset.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/dataset.ide.json?v=0.5`

-   **`input.json`**: For the Actor's input.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/input.ide.json?v=0.5`

-   **`key-value-store.json`**: For data within the key-value store.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/key-value-store.ide.json?v=0.5`

-   **`output.json`**: For the Actor's output.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/output.ide.json?v=0.5`


## How to use a schema in your editor

Most modern code editors like VS Code, Atom, and IntelliJ IDEA support JSON schemas. The process is generally straightforward.

Simply add the **`"$schema"`** key at the top of your JSON file and set its value to the URL of the schema you want to use.

Here's an example of how you would link the validation JSON Schema in your `INPUT_SCHEMA.json` file:

```json
{
    "$schema": "https://apify-projects.github.io/actor-json-schemas/input.json?v=0.4",
    "type": "object",
    "schemaVersion": 1,
    "title": "Data scraper Input",
    "properties": {
        "startDate":{
            "type": "string",
            "title": "Initial Date",
            "description": "Initial date for scraping posts",
            "editor": "datepicker"
        }
    }
}
```

Other editors may require you to install a separate plugin to use the JSON Schemas for validation and 
code-completion.

## Local development

The repository contains a GitHub Actions workflow that publishes the bundled schemas to GitHub Pages.
You can run the same steps locally without relying on GitHub by using the helper scripts in the repository.

This mirrors .github/workflows/publish-to-gh-pages.yml and produces the final files into the local ./output directory.

- Quick start (one command)
  - From the repository root, run:
    - `bash ./run-all.sh`
  - This will install dependencies (if needed), download schemas, add descriptions, apply modifications, and bundle the results into `./output/`.

- Prerequisites
  - Node.js 20 or newer (required by both packages)
  - npm
  - Bash shell (macOS/Linux, or Git Bash on Windows)
  - wget (used to download the upstream schemas)

- One-time setup
  - Install dependencies for the modificator package:
    - `cd json-schema-modificator && npm ci && cd -`
  - Install dependencies for the bundler package:
    - `cd json-schema-bundler && npm ci && cd -`

- Step 1: Download upstream JSON Schemas
  - The list of source URLs is in `./scripts/json-schemas-urls.txt`. To download them into `./downloaded-json-schemas`:
    - `bash ./scripts/00_download-json-schemas.sh`

- Step 2: Apply description rules ("describe")
  - This reads the downloaded schemas, applies the rules from `./rules/add-description/*.description-rules.xml`, and writes to `./output/`:
    - `bash ./scripts/01_describe-json-schemas.sh`

- Step 3: Apply modification rules ("modify")
  - This reads the described schemas from `./output`, applies rules from `./rules/modifications/*.modification-rules.xml`, and writes IDE-focused variants `*.ide.json` to `./output/`:
    - `bash ./scripts/02_modify-json-schemas.sh`

- Step 4: Bundle the schemas
  - This step processes the `*.ide.json` files in `./output/` to produce self-contained/bundled schemas in-place:
    - `bash ./scripts/03_bundle-json-schemas.sh`

- Cleaning up
  - Remove downloaded or generated files if needed:
    - `rm -rf ./downloaded-json-schemas ./output`

- Now you can find final JSON Schemas in the `./output/` directory

- Troubleshooting
  - No schemas found in `./downloaded-json-schemas` when describing:
    - Ensure you ran the download step successfully and that `./scripts/json-schemas-urls.txt` contains valid URLs.
  - "Rules not found" during describe/modify steps:
    - For descriptions, rules live in `./rules/add-description/<name>.description-rules.xml` (e.g., `actor.description-rules.xml`).
    - For modifications, rules live in `./rules/modifications/<name>.modification-rules.xml`.
  - CLI not found or TypeScript errors:
    - Make sure you ran `npm ci` inside both `json-schema-modificator` and `json-schema-bundler`. Node 20+ is required.
  - Network issues when downloading:
    - The download script uses `wget` with retries. If your network blocks requests, try again or download the files manually into `./downloaded-json-schemas`.

## Contributing

We welcome contributions! If you have suggestions for improvements, find a bug, or want to contribute a new schema, please open an issue or submit a pull request.

This README is designed to be clear, concise, and easy for developers to use. It explains the project's purpose, provides direct links to the schemas, and includes a simple example to help developers get started.
