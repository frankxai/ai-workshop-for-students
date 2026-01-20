# MCP Server Architecture Lab
**Build Production-Grade Model Context Protocol Servers**

*Part of GenCreator Labs by Frank*

---

## 🎯 What You'll Learn

- Understand MCP protocol fundamentals
- Build your first MCP server with resources and tools
- Implement production patterns (authentication, logging)
- Deploy to production with monitoring
- Connect servers to Claude Code

---

## ⏱️ Duration

1-2 days | Intermediate | Prerequisite: AI Coding Agents Mastery

---

## 📋 Prerequisites

- Node.js 18+
- Basic TypeScript knowledge
- Claude Code or MCP client
- Completed AI Coding Agents Mastery

---

## 🛠️ Tools & Resources

### Main Tools (Follow Their Documentation)

| Tool | Purpose | Documentation |
|------|---------|---------------|
| [MCP Specification](https://modelcontextprotocol.io/specification/latest) | Protocol definition | Read first |
| [MCP SDK](https://github.com/modelcontextprotocol/sdk) | Official SDK | npm install |
| [MCP GitHub](https://github.com/modelcontextprotocol) | Source code | Explore |

### External Solutions (Best Practice)

| Topic | Resource | Why It's Great |
|-------|----------|----------------|
| MCP Servers | [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) | 100+ examples |
| MCP Blog | [Model Context Protocol Blog](https://blog.modelcontextprotocol.io/) | Latest updates |
| Protocol Version | [2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25) | Latest stable |

---

## 🧩 Frank's Unique Methods

### Frank's Production Server Template

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "production-server",
  version: "1.0.0",
}, {
  capabilities: {
    resources: {},
    tools: {}
  }
});

// Implement authentication
// Add logging
// Add error handling

export default server;
```

### Frank's Quality Gates for MCP

See [`ai-coding-agents/solutions/advanced/evolution-framework.js`](ai-coding-agents/solutions/advanced/evolution-framework.js) for:
- Type safety verification
- Test coverage requirements
- Security scanning
- Documentation checks

---

## 📁 Lab Structure

```
mcp-server-mastery/
├── README.md              # This file
├── 01-fundamentals/      # Protocol concepts
├── 02-first-server/      # Build notes server
├── 03-advanced-patterns/ # Production patterns
├── 04-production/       # Deployment
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
cd ai-workshop-for-students/mcp-server-mastery

# Install MCP SDK
npm install @modelcontextprotocol/sdk

# Start with Module 1
cd 01-fundamentals
```

---

## 📚 Learning Path

This lab is part of the GenCreator Labs ecosystem:

```
🤖 AI Coding Agents Mastery (prerequisite)
   ↓
[This Lab] ← MCP Server Architecture
   ↓
🎯 Next Labs
   → Oracle GenAI Enterprise (enterprise patterns)
   → Evolution Framework (orchestration)

🔄 Continuous Learning
   → [Discord Community](https://discord.gg/frankx)
   → [MCP Office Hours](/office-hours)
```

---

## 👨‍🏫 For Professors

### Assign This Lab

1. Share: `https://github.com/frankxai/ai-workshop-for-students/tree/main/mcp-server-mastery`
2. Students work through modules (2 days)
3. Use MCP official docs as primary reference
4. Assess using Frank's production patterns

### Prerequisites Verification

- [ ] Node.js installed
- [ ] TypeScript basics
- [ ] Claude Code access
- [ ] AI Coding Agents completed

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

**[Start with Module 1 →](01-fundamentals/)**

Questions? [Discord](https://discord.gg/frankx) | [Issues](https://github.com/frankxai/ai-workshop-for-students/issues)

---

*Part of [GenCreator Labs](https://frankx.ai/gencreator) by Frank - Transforming creators from tech-overwhelmed to AI-empowered.*
