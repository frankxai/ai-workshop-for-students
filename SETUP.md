# Setting Up the Dedicated Workshops Repository

This document explains how to set up the `frankx-ai/workshops` GitHub repository.

## Step 1: Create the Repository

1. Go to GitHub and create a new repository:
   - **Name**: `workshops`
   - **Owner**: `frankx-ai` organization
   - **Visibility**: Public
   - **Initialize**: Don't add README (we have our own)

2. Copy the repository URL:
   ```
   git@github.com:frankx-ai/workshops.git
   ```

## Step 2: Initialize Local Repository

```bash
# Navigate to the workshops-repo directory
cd /mnt/c/Users/Frank/FrankX/workshops-repo

# Initialize git
git init

# Add the remote
git remote add origin git@github.com:frankx-ai/workshops.git
```

## Step 3: Copy Workshop Content

```bash
# Copy all workshop directories from main repo
cp -r ../workshops/ai-coding-agents .
cp -r ../workshops/personal-ai-assistant-setup .
cp -r ../workshops/mcp-server-mastery .
cp -r ../workshops/prompt-engineering-mastery .
cp -r ../workshops/suno-music-creation .
cp -r ../workshops/creators-ai-toolkit .
cp -r ../workshops/oracle-genai-enterprise .
cp -r ../workshops/agentic-creator-evolution .
cp -r ../workshops/quality-gates .
cp -r ../workshops/_templates .
```

## Step 4: Initial Commit and Push

```bash
# Stage all files
git add .

# Initial commit
git commit -m "feat: Initial workshops repository setup

Includes:
- AI Coding Agents Mastery
- Personal AI Assistant Setup
- MCP Server Architecture
- Prompt Engineering Mastery
- Suno AI Music Creation
- Creator's AI Toolkit
- Oracle GenAI Enterprise
- Agentic Creator Evolution
- Quality Gates
- Templates"

# Push to GitHub
git push -u origin main
```

## Step 5: Configure Repository Settings

On GitHub, configure:

1. **About**: "Free, hands-on workshops for creators and developers mastering AI"
2. **Website**: `https://frankx.ai/workshops`
3. **Topics**: `ai`, `workshops`, `education`, `claude`, `mcp`, `coding-agents`
4. **Features**:
   - Enable Issues
   - Enable Discussions
   - Disable Wiki (we use markdown docs)

## Step 6: Update Links

Update the following in the main FrankX repo:

1. **app/workshops/page.tsx**: GitHub links
2. **app/workshops/[slug]/page.tsx**: GitHub links
3. **workshops/README.md**: GitHub links

Replace all instances of:
```
https://github.com/frankx-ai/workshops/tree/main/
```

## Step 7: Sync Workflow

To keep repos in sync:

1. Make changes in dedicated workshops repo
2. Run sync script to update main repo (if needed)
3. Or maintain workshops only in dedicated repo

## Repository URLs

- **Repository**: https://github.com/frankx-ai/workshops
- **Website**: https://frankx.ai/workshops
- **Issues**: https://github.com/frankx-ai/workshops/issues
- **Discussions**: https://github.com/frankx-ai/workshops/discussions
