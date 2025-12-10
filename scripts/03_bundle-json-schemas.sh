#!/usr/bin/env bash
set -euo pipefail

# This script iterates over described JSON Schemas in ./output and bundles them
# using the json-schema-bundler CLI for each file.
#
# Expected layout (relative to repo root):
# - ./output/*.json                 # input + output schemas (already described)
# - ./json-schema-bundler           # package with the CLI (uses tsx start:dev)

ROOT_DIR="$(dirname "$0")/.."

OUTPUT_DIR="$ROOT_DIR/output" # also used for input
BUNDLER_DIR="$ROOT_DIR/json-schema-bundler"

mkdir -p "$OUTPUT_DIR"

shopt -s nullglob
schemas=("$OUTPUT_DIR"/*.ide.json)
shopt -u nullglob

if [[ ${#schemas[@]} -eq 0 ]]; then
  echo "No schemas found in $OUTPUT_DIR. Did the describe step run?" >&2
  exit 1
fi

for output_path in "${schemas[@]}"; do
  base_name="$(basename "$output_path")"  # e.g. actor.ide.json
  echo "Bundling $base_name ..."
  (
    cd "$BUNDLER_DIR"
    npm run start:dev -- -i "$OUTPUT_DIR/$base_name" -o "$OUTPUT_DIR/$base_name"
  )
 done

echo "Bundling completed for ${#schemas[@]} file(s). Outputs remain in $OUTPUT_DIR"
