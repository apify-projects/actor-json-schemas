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

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MODIFICATOR_DIR="$ROOT_DIR/json-schema-modificator"
BUNDLER_DIR="$ROOT_DIR/json-schema-bundler"

log() {
  echo "[run-all] $*"
}

# 1) Ensure dependencies are installed
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

# 2) Download upstream JSON Schemas
log "Downloading upstream JSON Schemas ..."
bash "$ROOT_DIR/scripts/download-json-schemas.sh"

# 3) Describe JSON Schemas
log "Describing JSON Schemas ..."
bash "$ROOT_DIR/scripts/describe-json-schemas.sh"

# 4) Bundle JSON Schemas
log "Bundling JSON Schemas ..."
bash "$ROOT_DIR/scripts/bundle-json-schemas.sh"

log "All done. Find final JSON Schemas in: $ROOT_DIR/output"
