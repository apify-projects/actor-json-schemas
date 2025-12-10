#!/usr/bin/env bash
set -euo pipefail

# This script iterates over downloaded JSON Schemas and applies description rules
# using the json-schema-modificator CLI for each file.
#
# Expected layout (relative to repo root):
# - ./downloaded-json-schemas/*.json         # input schemas (downloaded earlier)
# - ./rules/add-description/*.description-rules.xml   # rules per schema name
# - ./output/                                # output directory

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"
INPUT_DIR="$ROOT_DIR/downloaded-json-schemas"
RULES_DIR="$ROOT_DIR/rules/add-description"
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
  base_name="$(basename "$input_path")"           # e.g. actor.json
  name_no_ext="${base_name%.json}"                # e.g. actor
  rules_path="$RULES_DIR/$name_no_ext.description-rules.xml"  # e.g. rules/add-description/actor.rules.xml
  output_path="$OUTPUT_DIR/$base_name"            # e.g. output/actor.json

  if [[ ! -f "$rules_path" ]]; then
    echo "Rules not found for $base_name at $rules_path. Skipping." >&2
    continue
  fi

  echo "Describing $base_name using rules $rules_path ..."
  # Run the CLI via the package's dev script, so we don't need to build first.
  # We run it from inside the package directory to reuse its tsx entry.
  (
    cd "$MODIFICATOR_DIR"
    npm run start:dev -- -i "../${input_path#$ROOT_DIR/}" -d "../${rules_path#$ROOT_DIR/}" -o "../${output_path#$ROOT_DIR/}"
  )

done

echo "All applicable schemas processed. Outputs are in $OUTPUT_DIR"
