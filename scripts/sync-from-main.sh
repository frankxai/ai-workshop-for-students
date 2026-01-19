#!/bin/bash
# Sync workshop content from main FrankX repo to this dedicated repo

MAIN_REPO="../workshops"
TARGET_DIR="."

# Workshops to sync
WORKSHOPS=(
    "ai-coding-agents"
    "personal-ai-assistant-setup"
    "mcp-server-mastery"
    "prompt-engineering-mastery"
    "suno-music-creation"
    "creators-ai-toolkit"
    "oracle-genai-enterprise"
    "agentic-creator-evolution"
    "quality-gates"
    "_templates"
)

echo "Syncing workshops from $MAIN_REPO..."

for workshop in "${WORKSHOPS[@]}"; do
    if [ -d "$MAIN_REPO/$workshop" ]; then
        echo "Syncing: $workshop"
        rsync -av --delete "$MAIN_REPO/$workshop/" "$TARGET_DIR/$workshop/"
    else
        echo "Warning: $workshop not found in main repo"
    fi
done

# Sync root files
echo "Syncing root files..."
cp "$MAIN_REPO/CONTRIBUTING.md" "$TARGET_DIR/" 2>/dev/null || true

echo "Sync complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Stage changes: git add ."
echo "3. Commit: git commit -m 'chore: Sync from main repo'"
echo "4. Push: git push origin main"
