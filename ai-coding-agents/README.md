# AI Coding Agents Mastery Workshop
**From Zero to AI-Powered Developer in 3 Days**

---

## 🎯 What You'll Learn

- Install and configure multiple AI coding agents (Claude Code, OpenCode, Cline, Roo Code)
- Build custom skills, agents, and MCP servers
- Create your personal evolution framework (CLAUDE.md → skill.md → agent.md → orchestration)
- Master multi-agent orchestration patterns
- Apply Frank's quality gates for AI-generated code

---

## ⏱️ Duration

3 days | 6 modules | 40%+ hands-on

---

## 📋 Prerequisites

- VS Code or terminal environment
- Git configured
- API keys (Claude, OpenAI - free tiers available)
- Node.js 18+ or Bun installed

---

## 🛠️ Tools & Resources

### Main Tools (Follow Their Documentation)

| Tool | Purpose | Documentation |
|------|---------|---------------|
| [Claude Code](https://docs.anthropic.com/claude-code) | Primary AI coding agent | Official docs |
| [OpenCode](https://github.com/opencode-ai/opencode) | Open-source alternative | README |
| [Cline](https://github.com/cline/cline) | VS Code native | Wiki |
| [Roo Code](https://github.com/RooCodeInc/RooCode) | Multi-model support | Setup guide |
| [Kilo Code](https://github.com/kilo-code/kilo-code) | Lightweight option | Quick start |

### External Solutions (Learn from the Best)

| Topic | Resource | Why It's Great |
|-------|----------|----------------|
| Claude Code Tips | [claude-code-tips](https://github.com/someone/awesome-claude) | Community curated |
| VS Code + AI | [awesome-ai-agents](https://github.com/punkpeye/awesome-ai-agents) | Curated list |
| MCP Examples | [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | 100+ implementations |
| AI Coding Patterns | [ai-coding-handbook](https://github.com/someone/handbook) | Best practices |

> 💡 **Frank's Tip**: Start with official docs, then explore these resources for advanced patterns.

---

## 🧩 Frank's Unique Methods

### The Evolution Framework

The complete progression from basic prompts to multi-agent orchestration:

```
Level 5: Ecosystem Architect
         Full system design, agent teams
              ↑
Level 4: Orchestration
         Multi-agent workflows, handoffs
              ↑
Level 3: agent.md
         Agent behaviors, personas, specializations
              ↑
Level 2: skill.md
         Domain knowledge, best practices, patterns
              ↑
Level 1: CLAUDE.md
         Project context, codebase instructions
              ↑
Level 0: Basic Usage
         Prompts, simple commands
```

### Frank's Claude Code Configuration

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

### Quality Gates for AI Code

```typescript
// Frank's quality gate system
const qualityGates = [
  {
    name: 'Type Safety',
    check: (code) => hasNoTypeErrors(code),
    threshold: 1.0
  },
  {
    name: 'Test Coverage',
    check: (code) => testCoverage(code) >= 80,
    threshold: 0.8
  },
  {
    name: 'Linting',
    check: (code) => lintScore(code) >= 9,
    threshold: 9
  },
  {
    name: 'Security',
    check: (code) => noVulnerabilities(code),
    threshold: 1.0
  }
]
```

---

## 📁 Workshop Structure

```
ai-coding-agents/
├── README.md              # This file
├── 00-prerequisites/      # What you need before starting
├── 01-foundations/        # Core concepts
├── 02-setup-guides/       # Tool configuration
├── 03-first-agent/        # Build your first agent
├── 04-advanced/           # MCP, orchestration
├── 05-evolution/          # Complete framework
├── templates/             # Downloadable starting points
│   ├── CLAUDE.md          # Project context template
│   ├── skill.md           # Domain expertise template
│   └── agent.md           # Agent behavior template
└── solutions/             # Frank's implementations
    ├── basic-agent/       # Simple implementation
    └── orchestration/     # Multi-agent system
```

---

## 🚀 Quick Start

```bash
# Clone this workshop
git clone https://github.com/frankxai/ai-workshop-for-students.git
cd ai-workshop-for-students/ai-coding-agents

# Start with prerequisites
cd 00-prerequisites
# Follow the guide...
```

---

## 📚 Learning Path

This workshop is part of the FrankX learning ecosystem:

```
🤖 Getting Started
   ↓
[This Workshop] ← You are here
   ↓
🎯 Next Workshops
   → MCP Server Architecture (deepen extensibility)
   → Oracle GenAI Enterprise (enterprise patterns)

🔄 Continuous Learning
   → [Discord Community](https://discord.gg/frankx)
   → [Office Hours](/office-hours)
   → [Progress Tracking](/progress)
```

---

## 👨‍🏫 For Professors

### Assign This Workshop

1. Share: `https://github.com/frankxai/ai-workshop-for-students/tree/main/ai-coding-agents`
2. Students follow at their pace (3 days)
3. Link to external resources for deeper exploration
4. Use Frank's evolution framework as the main assessment

### Assessment Ideas

- Have students compare Claude Code with OpenCode
- Assign improvements to Frank's quality gate system
- Create derivative agents using templates

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

**[Start with Prerequisites →](00-prerequisites/)**

Questions? [Discord](https://discord.gg/frankx) | [Issues](https://github.com/frankxai/ai-workshop-for-students/issues)

---

*Part of [FrankX](https://frankx.ai) - Transforming creators from tech-overwhelmed to AI-empowered.*
