#!/usr/bin/env bash
set -euo pipefail

# Directory where the downloaded schemas will be stored
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"
DOWNLOAD_DIR="$ROOT_DIR/downloaded-json-schemas"

mkdir -p "$DOWNLOAD_DIR"

# json-schemas-urls.txt should contain a list of URLs (one per line)
# Download with retries and resume if partially downloaded
wget -nv --tries=5 --retry-connrefused --timeout=20 \
  -N -P "$DOWNLOAD_DIR" -i "$(dirname "$0")/json-schemas-urls.txt"

# Additionally we download the draft-07 schema as it is used during bundling phase
wget -nv --tries=5 --retry-connrefused --timeout=20 \
  -P "$DOWNLOAD_DIR" https://json-schema.org/draft-07/schema -O "$DOWNLOAD_DIR/draft-07-schema.json"

echo "Downloaded JSON Schemas into: $DOWNLOAD_DIR"
