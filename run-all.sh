#!/usr/bin/env bash
set -euo pipefail

# Orchestrates the whole local build to produce final schemas into ./output
# Steps:
#  1) Install deps for subpackages (if needed)
#  2) Download upstream JSON Schemas into ./downloaded-json-schemas
#  3) Describe schemas into ./output using rules in ./json-schemas-description
#  4) Bundle described schemas in-place in ./output
#
# Prereqs: Node.js 20+, npm, bash, wget

ROOT_DIR="$(dirname "$0")"
MODIFICATOR_DIR="$ROOT_DIR/json-schema-modificator"
BUNDLER_DIR="$ROOT_DIR/json-schema-bundler"

log() {
  echo "[run-all] $*"
}

# Ensure dependencies are installed
if [[ ! -d "$MODIFICATOR_DIR/node_modules" ]]; then
  log "Installing dependencies in json-schema-modificator ..."
  (cd "$MODIFICATOR_DIR" && npm ci)
else
  log "json-schema-modificator dependencies already installed."
fi

if [[ ! -d "$BUNDLER_DIR/node_modules" ]]; then
  log "Installing dependencies in json-schema-bundler ..."
  (cd "$BUNDLER_DIR" && npm ci)
else
  log "json-schema-bundler dependencies already installed."
fi

# Download upstream JSON Schemas
log "Downloading upstream JSON Schemas ..."
bash "$ROOT_DIR/scripts/00_download-json-schemas.sh"

# Describe JSON Schemas
log "Describing JSON Schemas ..."
bash "$ROOT_DIR/scripts/01_describe-json-schemas.sh"

# At this point the raw schemas are described

# Modify JSON Schemas
log "Modifying JSON Schemas ..."
bash "$ROOT_DIR/scripts/02_modify-json-schemas.sh"

# Modify JSON Schemas
log "Modifying JSON Schemas ..."
bash "$ROOT_DIR/scripts/03_bundle-json-schemas.sh"

log "All done. Find final JSON Schemas in: $ROOT_DIR/output"
