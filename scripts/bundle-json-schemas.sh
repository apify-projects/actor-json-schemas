#!/usr/bin/env bash
set -euo pipefail

# This script iterates over described JSON Schemas in ./output and bundles them
# using the json-schema-bundler CLI for each file.
#
# Expected layout (relative to repo root):
# - ./output/*.json                 # input + output schemas (already described)
# - ./json-schema-bundler           # package with the CLI (uses tsx start:dev)

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
OUTPUT_DIR="$ROOT_DIR/output"
BUNDLER_DIR="$ROOT_DIR/json-schema-bundler"

mkdir -p "$OUTPUT_DIR"

shopt -s nullglob
schemas=("$OUTPUT_DIR"/*.json)
shopt -u nullglob

if [[ ${#schemas[@]} -eq 0 ]]; then
  echo "No schemas found in $OUTPUT_DIR. Did the describe step run?" >&2
  exit 1
fi

for output_path in "${schemas[@]}"; do
  base_name="$(basename "$output_path")"  # e.g. actor.json
  echo "Bundling $base_name ..."
  (
    cd "$BUNDLER_DIR"
    npm run start:dev -- -i "../${output_path#$ROOT_DIR/}" -o "../${output_path#$ROOT_DIR/}"
  )
 done

echo "Bundling completed for ${#schemas[@]} file(s). Outputs remain in $OUTPUT_DIR"
