#!/bin/bash

# Check if slug is provided
if [ -z "$1" ]; then
  echo "Usage: npm run new-post <slug>"
  exit 1
fi

SLUG=$1
DATE=$(date +%Y-%m-%d)
FILE="content/notes/$SLUG.mdx"

# Check if file exists
if [ -f "$FILE" ]; then
  echo "Error: File $FILE already exists."
  exit 1
fi

# Create file from template
cat > "$FILE" <<EOF
---
title: "${SLUG//-/ }"
date: "$DATE"
excerpt: "Enter a brief summary of the post here."
---

Write your content here...
EOF

echo "Created new post at $FILE"
