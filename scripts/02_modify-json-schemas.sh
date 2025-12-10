#!/usr/bin/env bash
set -euo pipefail

# This script iterates over described JSON Schemas and applies modification rules
# using the json-schema-modificator CLI for each file to produce *.ide.json files.
#
# Expected layout (relative to repo root):
# - ./output/*.json                         # input schemas (after describe step)
# - ./rules/modifications/*.modification-rules.xml  # rules per schema name
# - ./output/                               # output directory

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"
INPUT_DIR="$ROOT_DIR/output" # We are using the output from previous step (JSON description) as an input for this one
RULES_DIR="$ROOT_DIR/rules/modifications"
OUTPUT_DIR="$ROOT_DIR/output"
MODIFICATOR_DIR="$ROOT_DIR/json-schema-modificator"

mkdir -p "$OUTPUT_DIR"

shopt -s nullglob
schemas=("$INPUT_DIR"/*.json)
shopt -u nullglob

if [[ ${#schemas[@]} -eq 0 ]]; then
  echo "No schemas found in $INPUT_DIR. Did the download step run?" >&2
  exit 1
fi

for input_path in "${schemas[@]}"; do
  echo "Processing $input_path ..."

  base_name="$(basename "$input_path")"           # e.g. actor.json
  name_no_ext="${base_name%.json}"                # e.g. actor
  rules_path="$RULES_DIR/$name_no_ext.modification-rules.xml"  # e.g. rules/modifications/actor.modification-rules.xml

  if [[ ! -f "$rules_path" ]]; then
    echo "Rules not found for $base_name at $rules_path. Skipping." >&2
    continue
  fi

  echo "Modifying $base_name using rules $rules_path ..."
  # Run the CLI via the package's dev script, so we don't need to build first.
  # We run it from inside the package directory to reuse its tsx entry.
  (
    cd "$MODIFICATOR_DIR"
    npm run start:dev -- -i "${OUTPUT_DIR}/${base_name}" -d "$rules_path" -o "${OUTPUT_DIR}/${name_no_ext}.ide.json"
  )

done

echo "All applicable schemas processed. Outputs are in $OUTPUT_DIR"
