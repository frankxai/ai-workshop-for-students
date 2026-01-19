# Personal AI Assistant Setup Workshop
**Build Your Customized AI Development Environment**

---

## Workshop Overview

Set up a complete, personalized AI assistant environment from scratch. By the end, you'll have a fully configured system tailored to YOUR workflow, with custom skills, agents, and integrations.

**Duration**: 1 day | **Level**: Beginner | **Perfect First Workshop**

---

## The Transformation

```
BEFORE                              AFTER
──────                              ─────
Generic AI chat               →    Personalized assistant
Manual repetitive tasks       →    Automated workflows
No project context            →    AI that knows your codebase
Scattered tools               →    Unified AI environment
Starting over each session    →    Persistent knowledge
```

---

## What You'll Build

Your personal AI system with:

1. **Claude Code Configuration**
   - Optimized settings
   - Custom shortcuts
   - Project templates

2. **CLAUDE.md Files**
   - Personal CLAUDE.md
   - Project templates
   - Team conventions

3. **Custom Skills**
   - Your domain expertise packaged
   - Reusable knowledge units
   - Personal best practices

4. **MCP Server Connections**
   - File system access
   - Browser automation
   - Custom data sources

5. **Workflow Automations**
   - Git commit helpers
   - Code review patterns
   - Documentation generators

---

## Workshop Structure

### Module 1: Foundation Setup (1.5 hours)

Get Claude Code running perfectly.

**Step 1: Install Claude Code**
```bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Or with Bun (recommended)
bun install -g @anthropic-ai/claude-code
```

**Step 2: Configure API Key**
```bash
# Add to your shell profile (~/.bashrc or ~/.zshrc)
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# Reload shell
source ~/.bashrc
```

**Step 3: First Launch**
```bash
# Navigate to any project
cd ~/projects/my-project

# Start Claude Code
claude
```

**Step 4: Verify Setup**
```bash
# Inside Claude Code, try:
> "What model are you using?"
> "Can you see the files in this directory?"
> "Read the package.json file"
```

[Start Module 1 →](./01-foundation-setup/)

---

### Module 2: Personal CLAUDE.md (1 hour)

Create your personal AI context file.

**Personal CLAUDE.md Template**:

```markdown
# [Your Name]'s AI Context

## About Me
- Role: [Your profession/role]
- Expertise: [Your specialties]
- Current projects: [What you're working on]

## My Preferences

### Communication Style
- Direct and concise responses
- Code examples over theory
- Explain the "why" behind suggestions

### Code Conventions
- Language: [TypeScript/Python/etc.]
- Frameworks: [What you use]
- Testing: [Your testing approach]
- Documentation: [Your style]

### Tools I Use
- Editor: [VS Code/Cursor/etc.]
- Terminal: [Your terminal]
- Package manager: [npm/pnpm/bun]

## Current Focus
[What you're building right now]

## Things to Remember
- [Important context]
- [Personal preferences]
- [Common patterns you use]
```

**Where to Place It**:
```
~/.claude/
├── CLAUDE.md         # Your personal context (global)
├── settings.json     # Global settings
└── mcp_servers.json  # MCP configurations

~/projects/
├── project-a/
│   └── CLAUDE.md     # Project-specific (overrides global)
└── project-b/
    └── CLAUDE.md     # Different project context
```

[Start Module 2 →](./02-personal-claude-md/)

---

### Module 3: Custom Skills (1.5 hours)

Package your expertise into reusable skills.

**Identifying Your Skills**:

Ask yourself:
- What do I explain to others repeatedly?
- What are my coding patterns?
- What best practices do I follow?
- What domain knowledge do I have?

**Skill Structure**:
```markdown
---
name: [Skill Name]
description: [One-line description]
---

# [Skill Name]

## Purpose
What this skill helps with.

## Core Principles
The main concepts/rules.

## Examples
Real code examples.

## When to Use
Activation conditions.

## Common Pitfalls
What to avoid.
```

**Example: React Component Skill**
```markdown
---
name: react-component-patterns
description: My preferred React component patterns
---

# React Component Patterns

## Purpose
Consistent React component creation following my conventions.

## Core Principles

### 1. Always Use TypeScript
```tsx
type Props = {
  title: string;
  onAction: () => void;
};

export function MyComponent({ title, onAction }: Props) {
  // ...
}
```

### 2. Composition Over Props
Prefer children and render props over complex prop drilling.

### 3. Custom Hooks for Logic
Extract business logic into custom hooks.

## When to Use
- Creating new React components
- Refactoring existing components
- Code review for React code
```

[Start Module 3 →](./03-custom-skills/)

---

### Module 4: MCP Connections (1 hour)

Connect Claude to your tools and data.

**Essential MCP Servers**:

| Server | Purpose | Use Case |
|--------|---------|----------|
| **Filesystem** | Read/write files | Project access |
| **Playwright** | Browser automation | Testing, scraping |
| **Memory** | Persistent storage | Knowledge base |
| **GitHub** | Repo management | PR automation |

**Configuration**:
```json
// ~/.claude/mcp_servers.json
{
  "servers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token"
      }
    }
  }
}
```

**Verifying Connections**:
```bash
# In Claude Code
/mcp

# Should show:
# Connected servers:
# - memory (2 tools available)
# - github (5 tools available)
```

[Start Module 4 →](./04-mcp-connections/)

---

### Module 5: Workflow Automations (1.5 hours)

Create your personal automation library.

**Automation 1: Smart Git Commits**
```markdown
# In your CLAUDE.md

## Git Commit Convention
When I ask you to commit:
1. Stage relevant files (not all)
2. Generate message following: [type]: [description]
3. Types: feat, fix, docs, style, refactor, test
4. Keep messages under 72 characters
5. Add Co-Authored-By line
```

**Automation 2: Code Review**
```markdown
## Code Review Protocol
When reviewing code:
1. Check for security issues first
2. Look for performance problems
3. Suggest improvements, don't criticize
4. Note what's done well
5. Format as actionable items
```

**Automation 3: Documentation**
```markdown
## Documentation Generation
When documenting code:
1. Use JSDoc format for TypeScript
2. Include usage examples
3. Note edge cases
4. Keep concise but complete
```

**Creating Slash Commands**:
```markdown
<!-- .claude/commands/review.md -->
# Code Review Command

Review the specified code for:
- Security vulnerabilities
- Performance issues
- Code quality
- Best practices

Format output as:
## Summary
## Critical Issues
## Suggestions
## Positive Notes
```

[Start Module 5 →](./05-workflow-automations/)

---

## Labs

### Lab 1: Complete Setup (30 min)
Install and configure Claude Code with your API key.

### Lab 2: Personal CLAUDE.md (30 min)
Create your personalized AI context file.

### Lab 3: First Custom Skill (30 min)
Package one piece of your expertise as a skill.

### Lab 4: MCP Integration (30 min)
Connect one MCP server to your setup.

### Lab 5: Custom Command (30 min)
Create a slash command for common tasks.

---

## Capstone: Your Personal AI System

Build a complete personal AI environment:

- [ ] Claude Code installed and configured
- [ ] Global CLAUDE.md with your preferences
- [ ] At least 2 project CLAUDE.md files
- [ ] 3 custom skills based on your expertise
- [ ] 2 MCP servers connected
- [ ] 2 custom slash commands
- [ ] Documentation of your setup

---

## Configuration Templates

### Minimalist Setup
For those who want simplicity:
```
~/.claude/
├── CLAUDE.md         # Personal context
└── settings.json     # Basic settings
```

### Power User Setup
For maximum productivity:
```
~/.claude/
├── CLAUDE.md
├── settings.json
├── mcp_servers.json
├── commands/
│   ├── commit.md
│   ├── review.md
│   └── docs.md
└── skills/
    ├── typescript.md
    ├── react.md
    └── testing.md
```

### Team Setup
For collaborative environments:
```
project/
├── CLAUDE.md         # Team conventions
├── .claude/
│   ├── commands/     # Shared commands
│   └── skills/       # Shared expertise
└── docs/
    └── ai-guide.md   # Team AI guidelines
```

---

## Troubleshooting

### "Claude Code not found"
```bash
# Verify installation
which claude

# Reinstall if needed
npm install -g @anthropic-ai/claude-code
```

### "API key not working"
```bash
# Check key is set
echo $ANTHROPIC_API_KEY | head -c 10

# Verify it starts with sk-ant-
```

### "MCP server not connecting"
```bash
# Check server exists
npx -y @modelcontextprotocol/server-memory --version

# Check config syntax
cat ~/.claude/mcp_servers.json | jq .
```

---

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [MCP Server Directory](https://github.com/modelcontextprotocol/servers)
- [FrankX Skills Library](https://github.com/frankx-ai/claude-skills)

---

## Next Steps

After completing this workshop:
1. **AI Coding Agents Workshop** - Advanced agent patterns
2. **MCP Server Mastery** - Build custom servers
3. **Evolution Framework** - skill.md → agent.md → orchestration

---

## Start Building

Ready to create your personalized AI environment?

**[Begin with Module 1: Foundation Setup →](./01-foundation-setup/)**

---

*This workshop is the perfect starting point for your AI-augmented journey.*
