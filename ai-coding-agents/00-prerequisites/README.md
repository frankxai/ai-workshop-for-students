# Module 0: Prerequisites
**Time**: 30 minutes | **Difficulty**: Beginner

---

## Learning Objectives

By completing this module, you will:
- [ ] Have a working development environment
- [ ] Understand API key requirements
- [ ] Have all necessary tools installed
- [ ] Be ready to install your first AI coding agent

---

## Required Tools

### 1. Terminal Environment

**macOS/Linux**: Use your built-in terminal or iTerm2
```bash
# Verify terminal works
echo "Terminal is ready!"
```

**Windows**: Use Windows Terminal with WSL2
```bash
# Install WSL2 (PowerShell as Admin)
wsl --install

# After restart, set up Ubuntu
wsl --set-default-version 2
```

### 2. Node.js 18+ or Bun

**Option A: Node.js (Recommended for beginners)**
```bash
# macOS (using Homebrew)
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows (using winget)
winget install OpenJS.NodeJS.LTS

# Verify installation
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
```

**Option B: Bun (Faster, recommended for advanced users)**
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# Verify installation
bun --version  # Should show 1.x or higher
```

### 3. Git

```bash
# macOS
brew install git

# Ubuntu/Debian
sudo apt-get install git

# Windows
winget install Git.Git

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Verify
git --version
```

### 4. Code Editor

**VS Code (Recommended)**
```bash
# macOS
brew install --cask visual-studio-code

# Ubuntu
sudo snap install code --classic

# Windows
winget install Microsoft.VisualStudioCode
```

**Essential VS Code Extensions**:
- Claude Code extension (if using VS Code integration)
- GitHub Copilot (optional, for comparison)
- GitLens

---

## API Keys

### Anthropic API Key (Required for Claude Code)

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new key
5. Copy and save securely

```bash
# Set environment variable (add to ~/.bashrc or ~/.zshrc)
export ANTHROPIC_API_KEY="your-key-here"

# Or for the session only
ANTHROPIC_API_KEY="your-key-here"
```

### OpenAI API Key (Optional, for multi-model setups)

1. Visit [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new key

```bash
export OPENAI_API_KEY="your-key-here"
```

### Cost Considerations

| Provider | Model | Input Cost | Output Cost | Context |
|----------|-------|------------|-------------|---------|
| Anthropic | Claude 3.5 Sonnet | $3/1M tokens | $15/1M tokens | 200K |
| Anthropic | Claude Opus 4 | $15/1M tokens | $75/1M tokens | 200K |
| OpenAI | GPT-4 Turbo | $10/1M tokens | $30/1M tokens | 128K |
| OpenAI | GPT-4o | $5/1M tokens | $15/1M tokens | 128K |

**Budget Tip**: Start with Claude 3.5 Sonnet for excellent quality at lower cost.

---

## Verification Checklist

Run these commands to verify your setup:

```bash
# 1. Node.js or Bun
node --version || bun --version

# 2. Git
git --version

# 3. API Key (should not print the key, just confirm it exists)
[ -n "$ANTHROPIC_API_KEY" ] && echo "Anthropic key configured" || echo "Missing Anthropic key"

# 4. Terminal functionality
echo "All systems ready!"
```

**Expected Output**:
```
v20.10.0
git version 2.43.0
Anthropic key configured
All systems ready!
```

---

## Troubleshooting

### "Command not found" errors
```bash
# Reload your shell configuration
source ~/.bashrc  # or ~/.zshrc for macOS
```

### WSL2 not working on Windows
```powershell
# Enable virtualization in BIOS, then:
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
wsl --set-default-version 2
```

### API key not being recognized
```bash
# Verify the variable is set
echo $ANTHROPIC_API_KEY | head -c 10
# Should show first 10 characters

# If empty, re-export and restart terminal
```

---

## Next Steps

With your environment ready, proceed to:

**[Module 1: Foundations →](../01-foundations/)**

---

## Quick Reference Card

```
PREREQUISITES CHECKLIST
═══════════════════════

□ Terminal working
  └─ Windows: WSL2 installed

□ Node.js 18+ or Bun installed
  └─ Verify: node --version OR bun --version

□ Git configured
  └─ Verify: git config user.name

□ VS Code installed
  └─ Extensions: Claude Code (optional)

□ Anthropic API Key
  └─ Set: export ANTHROPIC_API_KEY="..."
  └─ Verify: echo $ANTHROPIC_API_KEY | head -c 10

□ Optional: OpenAI API Key
  └─ For multi-model setups
```

---

*Estimated time: 30 minutes | Next: Foundations*
