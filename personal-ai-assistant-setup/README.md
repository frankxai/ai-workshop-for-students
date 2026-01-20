# Personal AI Assistant Setup Lab
**Build Your Customized AI Development Environment**

*Part of GenCreator Labs by Frank*

---

## 🎯 What You'll Learn

- Install and configure Claude Code with optimal settings
- Create your personal CLAUDE.md context file
- Build custom skills based on your expertise
- Connect MCP servers for extended capabilities
- Automate workflows with custom commands

---

## ⏱️ Duration

1 day | Beginner | **Perfect Starting Lab**

---

## 📋 Prerequisites

- Computer with internet
- API key (Claude, free tier available)
- Basic terminal knowledge

---

## 🛠️ Tools & Resources

### Main Tools (Follow Their Documentation)

| Tool | Purpose | Documentation |
|------|---------|---------------|
| [Claude Code](https://docs.anthropic.com/claude-code) | Primary AI coding agent | Official docs |
| [Claude Code 101](https://www.claudeCode101.com) | Tutorial for beginners | Quick start guide |

### External Solutions (Best Practice)

| Topic | Resource | Why It's Great |
|-------|----------|----------------|
| Claude Code Tips | [Claude Code Best Practices](https://anthropic.com/engineering/claude-code-best-practices) | Anthropic's official tips |
| MCP Servers | [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) | Curated list |

---

## 🧩 Frank's Unique Methods

### Frank's Personal Claude Code Configuration

```json
{
  "temperature": 0.1,
  "max_tokens": 4096,
  "system_prompt": "You are an expert developer. Think step by step. Always verify your changes.",
  "tools": {
    "Bash": { "enabled": true },
    "Read": { "enabled": true },
    "Write": { "enabled": true },
    "Glob": { "enabled": true },
    "Grep": { "enabled": true },
    "Edit": { "enabled": true },
    "LS": { "enabled": true }
  }
}
```

### Frank's CLAUDE.md Template

See [`templates/CLAUDE.md`](templates/CLAUDE.md) in the repo root for Frank's complete template with:
- Project context structure
- Code style preferences
- Communication guidelines
- Development workflow

### Frank's Skill Structure

See [`templates/skill.md`](templates/skill.md) for Frank's framework on:
- Identifying your skills
- Structuring domain expertise
- Creating reusable knowledge units

---

## 📁 Lab Structure

```
personal-ai-assistant-setup/
├── README.md              # This file
├── 01-foundation-setup/  # Claude Code installation
├── 02-personal-claude-md/ # Personal context file
├── 03-custom-skills/     # Your expertise packages
├── 04-mcp-connections/   # Server integrations
├── 05-workflow-automations/ # Automation commands
├── templates/            # Downloadable templates
│   ├── CLAUDE.md
│   ├── skill.md
│   └── agent.md
└── solutions/            # Frank's implementations
    ├── basic/
    └── advanced/
```

---

## 🚀 Quick Start

```bash
# Clone this lab
git clone https://github.com/frankxai/ai-workshop-for-students.git
cd ai-workshop-for-students/personal-ai-assistant-setup

# Install Claude Code
npm install -g @anthropic-ai/claude-code
# OR with Bun
bun install -g @anthropic-ai/claude-code

# Set API key
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# Start Claude Code
claude
```

---

## 📚 Learning Path

This lab is part of the GenCreator Labs ecosystem:

```
🤖 Getting Started (You are here)
   ↓
[This Lab] ← Personal AI Assistant Setup
   ↓
🎯 Next Labs
   → AI Coding Agents Mastery (expand your setup)
   → MCP Server Architecture (build custom servers)
   → Prompt Engineering Mastery (improve interactions)

🔄 Continuous Learning
   → [Discord Community](https://discord.gg/frankx)
   → [Progress Tracking](/progress)
```

---

## 👨‍🏫 For Professors

### Assign This Lab

1. Share: `https://github.com/frankxai/ai-workshop-for-students/tree/main/personal-ai-assistant-setup`
2. Students complete modules at their pace
3. Use external Claude Code docs as supplementary
4. Assess using Frank's configuration templates

### Customization

Fork and adapt for your curriculum:
```bash
git clone https://github.com/frankxai/ai-workshop-for-students.git
# Customize, add your institution's standards
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](https://github.com/frankxai/ai-workshop-for-students/blob/main/CONTRIBUTING.md)

---

## 📜 License

- **Documentation**: CC BY 4.0
- **Code**: MIT
- **Frank's Unique Methods**: See individual files

---

## 🏁 Ready?

**[Start with Module 1 →](01-foundation-setup/)**

Questions? [Discord](https://discord.gg/frankx) | [Issues](https://github.com/frankxai/ai-workshop-for-students/issues)

---

*Part of [GenCreator Labs](https://frankx.ai/gencreator) by Frank - Transforming creators from tech-overwhelmed to AI-empowered.*
