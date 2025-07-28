#!/bin/bash

# Get the latest Git commit hash (short version)
COMMIT_ID=$(git rev-parse --short HEAD)

# Update _data/version.yml with the new commit ID
echo "commit_id: $COMMIT_ID" > _data/version.yml

echo "Updated _data/version.yml with commit ID: $COMMIT_ID"