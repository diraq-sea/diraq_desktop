#!/usr/bin/env sh

set -u

OUTDATED=`npm outdated`

set -e

if [ -n "$OUTDATED" ]; then
  TEXT=`printf "$OUTDATED" | tr '\n' '\\' | sed 's/\\\\/\\\\n/g'`
  curl -X POST --data-urlencode \
  'payload={ "attachments": [{ "color": "#d10c20", "text": "```'"$TEXT"'```" }]}' \
  $WEBHOOK_URL
fi
