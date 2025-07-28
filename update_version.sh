#!/bin/bash

# Check if a version argument is provided
if [ -z "$1" ]; then
  echo "Usage: ./update_version.sh <version_number>"
  echo "Example: ./update_version.sh \"1.3\""
  exit 1
fi

VERSION_NUMBER="$1"

# Get the latest Git commit hash (short version)
COMMIT_ID=$(git rev-parse --short HEAD)

# Update _data/version.yml with the new commit ID
echo "commit_id: $COMMIT_ID" > _data/version.yml

# Update _includes/footer.html with the new version number
# Use sed to replace the version string, being careful with special characters
# The pattern looks for 'vX.X (commit:' and replaces 'vX.X' part
sed -i '' "s/v[0-9]\+\.[0-9]\+ (commit:/v${VERSION_NUMBER} (commit:/g" _includes/footer.html

echo "Updated _data/version.yml with commit ID: $COMMIT_ID"
echo "Updated _includes/footer.html with version: v${VERSION_NUMBER}"