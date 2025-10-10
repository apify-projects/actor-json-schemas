#!/usr/bin/env bash
set -euo pipefail

# Directory where the downloaded schemas will be stored
DOWNLOAD_DIR="./downloaded-json-schemas"

mkdir -p "$DOWNLOAD_DIR"

# json-schemas-urls.txt should contain a list of URLs (one per line)
# Download with retries and resume if partially downloaded
wget -nv --tries=5 --retry-connrefused --continue --timeout=20 \
  -P "$DOWNLOAD_DIR" -i json-schemas-urls.txt

echo "Downloaded JSON Schemas into: $DOWNLOAD_DIR"
