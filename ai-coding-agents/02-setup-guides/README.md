# Module 2: Setup Guides
**Time**: 2 hours | **Difficulty**: Beginner to Intermediate

---

## Learning Objectives

By completing this module, you will:
- [ ] Install and configure at least one AI coding agent
- [ ] Understand the differences between popular agents
- [ ] Know when to use which agent
- [ ] Have a working development environment

---

## Agent Comparison Matrix

| Feature | Claude Code | OpenCode | Cline | Roo Code | Kilo Code |
|---------|-------------|----------|-------|----------|-----------|
| **Official Support** | Anthropic | Community | Community | Community | Community |
| **Best Model** | Claude | Any | Any | Any | Any |
| **Interface** | CLI | CLI | VS Code | VS Code | Terminal |
| **MCP Support** | Excellent | Growing | Limited | Good | Basic |
| **Customization** | High | Very High | Medium | Medium | Low |
| **Learning Curve** | Medium | Medium | Low | Low | Low |
| **Best For** | Claude users | Power users | VS Code users | Multi-model | Quick tasks |

---

## 1. Claude Code (Recommended Primary)

Claude Code is Anthropic's official CLI for Claude, offering the best integration with Claude models.

### Installation

```bash
# macOS/Linux
npm install -g @anthropic-ai/claude-code

# Or with Bun (faster)
bun install -g @anthropic-ai/claude-code

# Windows (PowerShell)
npm install -g @anthropic-ai/claude-code
```

### Initial Setup

```bash
# First run - will prompt for API key
claude

# Or set API key first
export ANTHROPIC_API_KEY="your-key-here"
claude
```

### Configuration

Create `~/.claude/settings.json`:
```json
{
  "theme": "dark",
  "model": "claude-sonnet-4-20250514",
  "maxTokens": 8192,
  "autoApprove": false
}
```

### Key Commands

```bash
# Start interactive session
claude

# Start in a specific directory
claude /path/to/project

# Resume previous session
claude --resume

# Run with specific model
claude --model claude-opus-4

# Built-in commands (inside session)
/help          # Show all commands
/clear         # Clear conversation
/compact       # Compress context
/model         # Switch models
/mcp           # Manage MCP servers
```

### Project Configuration

Create `CLAUDE.md` in your project root:
```markdown
# Project Name

## Overview
Brief description of this project.

## Tech Stack
- Language: TypeScript
- Framework: Next.js 15
- Database: PostgreSQL

## Important Patterns
- We use functional components
- Tests go in __tests__ folders
- Use pnpm for package management

## Current Focus
Working on user authentication feature.
```

### Verification

```bash
# Run Claude Code
claude

# Try a simple task
> "What is 2 + 2?"

# Should respond with 4 and no errors
```

---

## 2. OpenCode (Open Source Alternative)

OpenCode is a powerful open-source coding agent with extensive customization options.

### Installation

```bash
# Using npm
npm install -g @opencode-ai/cli

# Using Bun
bun install -g @opencode-ai/cli

# From source
git clone https://github.com/opencode-ai/opencode
cd opencode
bun install
bun link
```

### Configuration

Create `.opencode/config.yaml`:
```yaml
# OpenCode Configuration
version: "1.0"

# Model settings
model:
  provider: anthropic  # or openai, ollama
  name: claude-3-5-sonnet-20241022
  temperature: 0.7

# Project settings
project:
  include:
    - "src/**/*.ts"
    - "*.md"
  exclude:
    - "node_modules"
    - ".git"

# Permissions
permissions:
  fileWrite: prompt
  shellExec: prompt
  networkAccess: deny
```

### Oh-My-OpenCode (Extensions)

Install the community extension pack:
```bash
# Install oh-my-opencode
opencode plugin install oh-my-opencode

# Includes:
# - Enhanced git integration
# - Code review automation
# - Project scaffolding
# - Custom prompts library
```

### Agent Configuration

Create `.opencode/agents/coder.md`:
```markdown
# Coder Agent

## Persona
You are a senior software engineer focused on clean, maintainable code.

## Behaviors
- Always write tests for new functions
- Use TypeScript strict mode
- Follow existing patterns in the codebase

## Tools Available
- file_read
- file_write
- terminal
- web_search
```

### Verification

```bash
opencode

# Test with a simple task
> "Show me the project structure"
```

---

## 3. Cline (VS Code Extension)

Cline provides AI coding assistance directly in VS Code with visual feedback.

### Installation

1. Open VS Code
2. Go to Extensions (Cmd/Ctrl + Shift + X)
3. Search for "Cline"
4. Click Install

### Configuration

Open VS Code Settings (Cmd/Ctrl + ,) and search for "Cline":

```json
{
  "cline.apiProvider": "anthropic",
  "cline.anthropicApiKey": "your-key-here",
  "cline.defaultModel": "claude-3-5-sonnet-20241022",
  "cline.autoApprove": false,
  "cline.showDiffView": true
}
```

### Usage

1. Open Command Palette (Cmd/Ctrl + Shift + P)
2. Type "Cline: Start Chat"
3. Chat panel opens in sidebar
4. Type your request

### Key Features

- **Visual Diffs**: See changes before applying
- **File Explorer Integration**: Click to add files to context
- **Terminal Integration**: Execute commands with approval
- **History**: Browse previous conversations

### Verification

1. Open a project in VS Code
2. Start Cline chat
3. Ask: "What files are in this project?"

---

## 4. Roo Code (Multi-Model)

Roo Code excels at switching between different AI models.

### Installation

```bash
# VS Code Extension
# Search "Roo Code" in Extensions

# Or CLI version
npm install -g roo-code-cli
```

### Configuration

```json
{
  "roo.providers": {
    "anthropic": {
      "apiKey": "your-key",
      "models": ["claude-3-5-sonnet", "claude-3-opus"]
    },
    "openai": {
      "apiKey": "your-key",
      "models": ["gpt-4-turbo", "gpt-4o"]
    },
    "ollama": {
      "baseUrl": "http://localhost:11434",
      "models": ["llama3.1", "codellama"]
    }
  },
  "roo.defaultProvider": "anthropic",
  "roo.defaultModel": "claude-3-5-sonnet"
}
```

### Multi-Model Workflow

```bash
# Start with fast model for simple tasks
roo --model gpt-4o "fix this typo"

# Switch to powerful model for complex tasks
roo --model claude-3-opus "refactor authentication system"

# Use local model for privacy
roo --model ollama/llama3.1 "review this code"
```

---

## 5. Kilo Code (Lightweight)

Kilo Code is minimalist and fast, perfect for quick tasks.

### Installation

```bash
# Simple npm install
npm install -g kilo-code

# Or single binary
curl -fsSL https://kilo.dev/install.sh | bash
```

### Configuration

Minimal config in `~/.kilorc`:
```bash
KILO_API_KEY=your-anthropic-key
KILO_MODEL=claude-3-5-sonnet
KILO_CONTEXT_SIZE=medium
```

### Usage

```bash
# Quick question
kilo "what does this function do?" src/utils.ts

# Quick fix
kilo fix src/buggy.ts

# Quick test
kilo test src/utils.ts

# Quick docs
kilo docs src/api/
```

### Best For
- One-off questions
- Quick fixes
- Fast documentation
- Low resource usage

---

## Recommended Setup Strategy

### For Beginners
1. Start with **Claude Code** (official, well-documented)
2. Add **Cline** for VS Code integration
3. Learn fundamentals before adding more tools

### For Power Users
1. **Claude Code** as primary CLI
2. **OpenCode** with oh-my-opencode for customization
3. **Roo Code** for multi-model experiments

### For Enterprise
1. **Claude Code** with strict permissions
2. Custom **MCP servers** for internal data
3. **OpenCode** for self-hosted option

---

## Verification Checklist

Run through this checklist to verify your setup:

```bash
# 1. Claude Code
claude --version
claude "Hello, verify you're working"

# 2. OpenCode (if installed)
opencode --version
opencode "Hello, verify you're working"

# 3. Check VS Code extensions
code --list-extensions | grep -i "cline\|roo"
```

Expected results:
- [ ] Claude Code responds to queries
- [ ] API key is recognized
- [ ] Project context loads correctly
- [ ] File operations work (with approval)

---

## Troubleshooting

### "API key not found"
```bash
# Verify key is set
echo $ANTHROPIC_API_KEY | head -c 10

# Re-export if needed
export ANTHROPIC_API_KEY="sk-ant-..."
```

### "Rate limited"
- Wait and retry
- Consider upgrading API tier
- Use a smaller model for frequent tasks

### "Context too large"
- Use `/compact` command
- Be more selective with file reading
- Clear conversation with `/clear`

### "Permission denied"
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
npm install -g @anthropic-ai/claude-code
```

---

## Lab Exercise

### Lab 2.1: Install and Configure Claude Code

1. Install Claude Code
2. Set up API key
3. Create CLAUDE.md for a test project
4. Run a simple query
5. Verify file operations work

**Success Criteria**:
- [ ] Claude responds to queries
- [ ] Can read files in project
- [ ] Project context is understood

---

## Next Steps

With your agent installed, let's build your first AI assistant:

**[Module 3: First Agent →](../03-first-agent/)**

---

*Estimated time: 2 hours | Next: First Agent*
