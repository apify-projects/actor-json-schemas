# Apify Actor JSON schemas

Welcome to the **non-production ready** repository for JSON schemas for Apify Actors! This project aims to provide up-to-date and 
publicly accessible JSON schemas to help developers build robust and error-free Apify Actors.

## The Problem

Apify Actors use various JSON files to define their behavior, input, and output. Manually writing or editing these 
files can be prone to errors, which can lead to issues later when the Actor is run on the Apify platform.

## Our Solution

We've created a set of JSON schemas that you can use to validate your Actor's JSON files _before_ you push them to the 
platform. By adding these schemas to your project, you gain two major benefits:

1.  **Validation:** Supported code editors can use the scheme to check your JSON file for syntax errors and schema 
    compliance. This helps you catch mistakes early.

2.  **Code Completion:** Many editors offer intelligent code completion based on the defined schemas. This means you 
    can get suggestions for keys and values as you type, making the development process faster and more efficient.

## Available schemas

We currently offer schemas for the following Apify Actor JSON files:

-   **`actor.json`**: For defining the Actor's configuration.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/actor.json?v=0.3`

-   **`dataset.json`**: For validating data in a dataset.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/dataset.json?v=0.3`

-   **`input.json`**: For the Actor's input.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/input.json?v=0.3`

-   **`key-value-store.json`**: For data within the key-value store.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/key-value-store.json?v=0.3`

-   **`output.json`**: For the Actor's output.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/output.json?v=0.3`


## How to Use a Scheme in Your Editor

Most modern code editors like VS Code, Atom, and IntelliJ IDEA support JSON schemas. The process is generally straightforward.

Simply add the **`"$schema"`** key at the top of your JSON file and set its value to the URL of the scheme you want to use.

Here's an example of how you would link the validation json schema in your `INPUT_SCHEMA.json` file:

```json
{
    "$schema": "https://apify-projects.github.io/actor-json-schemas/input.json?v=0.2",
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

Other editors may require you to install a separate plugin to use the JSON schemas for validation and 
code-completion.

## Local development

The repository contains a GitHub Actions workflow that publishes the bundled schemas to GitHub Pages.
You can run the same steps locally without relying on GitHub by using the helper scripts in the repository.

This mirrors .github/workflows/publish-to-gh-pages.yml and produces the final files into the local ./output directory.

- Quick start (one command)
  - From the repository root, run:
    - `bash ./run-all.sh`
  - This will install dependencies (if needed), download schemas, describe them, and bundle the results into `./output/`.

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
  - The list of source URLs is in json-schemas-urls.txt. To download them into ./downloaded-json-schemas:
    - `bash ./scripts/download-json-schemas.sh`

- Step 2: Apply description rules ("describe")
  - This will read the downloaded schemas, apply the rules from ./json-schemas-description/*.rules.xml, and write to ./output/:
    - `bash ./scripts/describe-json-schemas.sh`

- Step 3: Bundle the described schemas
  - This step processes the files in ./output/ to produce self-contained/bundled schemas in-place:
    - `bash ./scripts/bundle-json-schemas.sh`

- Cleaning up
  - Remove downloaded or generated files if needed:
    - `rm -rf ./downloaded-json-schemas ./output`

- Now you can find final json-schemas in the ./output/ directory

- Troubleshooting
  - No schemas found in ./downloaded-json-schemas when describing:
    - Ensure you ran the download step successfully and that json-schemas-urls.txt contains valid URLs.
  - "Rules not found" during describe step:
    - Each input schema is matched by a corresponding rules file in ./json-schemas-description with the same base name and .rules.xml extension (e.g., actor.rules.xml).
  - CLI not found or TypeScript errors:
    - Make sure you ran npm ci inside both json-schema-modificator and json-schema-bundler. Node 20+ is required.
  - Network issues when downloading:
    - The download script uses wget with retries. If your network blocks requests, try again or download the files manually into ./downloaded-json-schemas.

## Contributing

We welcome contributions! If you have suggestions for improvements, find a bug, or want to contribute a new scheme, please open an issue or submit a pull request.

This README is designed to be clear, concise, and easy for developers to use. It explains the project's purpose, provides direct links to the schemas, and includes a simple example to help developers get started.
