#!/bin/bash
# Post-Edit (async): Run ESLint on edited JS/TS files
input=$(cat)
file=$(echo "$input" | node -e "try{const d=JSON.parse(require('fs').readFileSync(0,'utf8'));console.log(d.tool_input?.file_path||d.tool_result?.file_path||'')}catch{}" 2>/dev/null)
if [ -n "$file" ] && [ -f "$file" ]; then
  case "$file" in
    *.ts|*.tsx|*.js|*.jsx)
      if [ -f "node_modules/.bin/eslint" ]; then
        errors=$(npx eslint --no-warn-ignored --format compact "$file" 2>/dev/null | grep -c "Error" || echo 0)
        if [ "$errors" -gt 0 ]; then
          echo "" >&2
          echo "## ESLINT CHECK" >&2
          echo "  ESLint found issues in $(basename "$file")" >&2
          echo "  Run: npx eslint $file" >&2
          echo "" >&2
        fi
      fi
      ;;
  esac
fi
echo "$input"