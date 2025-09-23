# Apify Actor JSON schemas

Welcome to the official repository for JSON schemas for Apify Actors! This project aims to provide up-to-date and 
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

    -   URL: `https://apify-projects.github.io/actor-json-schemas/actor.schema.json?v=0.1`

-   **`dataset.json`**: For validating data in a dataset.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/dataset.schema.json?v=0.1`

-   **`input.json`**: For the Actor's input.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/input.schema.json?v=0.1`

-   **`key_value_store.json`**: For data within the key-value store.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/key_value_store.schema.json?v=0.1`

-   **`output.json`**: For the Actor's output.

    -   URL: `https://apify-projects.github.io/actor-json-schemas/output.schema.json?v=0.1`


## How to Use a Scheme in Your Editor

Most modern code editors like VS Code, Atom, and IntelliJ IDEA support JSON schemas. The process is generally straightforward.

Simply add the **`"$schema"`** key at the top of your JSON file and set its value to the URL of the scheme you want to use.

Here's an example of how you would link the `input.schema.json` scheme in your `input.json` file:

```json
{
    "$schema": "https://apify-projects.github.io/actor-json-schemas/input.schema.json?v=0.1",
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

## Contributing

We welcome contributions! If you have suggestions for improvements, find a bug, or want to contribute a new scheme, please open an issue or submit a pull request.

This README is designed to be clear, concise, and easy for developers to use. It explains the project's purpose, provides direct links to the schemas, and includes a simple example to help developers get started.
