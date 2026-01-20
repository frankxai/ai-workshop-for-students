# Private AI Studio Lab
**Build Your Self-Hosted Research & Creation Ecosystem**

*Part of GenCreator Labs by Frank*

---

## 🎯 What You'll Learn

- Design and deploy a private AI studio with two specialized environments
- **Research Studio**: RAG-powered knowledge synthesis with citations
- **Creation Studio**: Visual AI workflows for images, video, and audio
- Implement MCP (Model Context Protocol) for unified agent communication
- Deploy with Docker for full offline capability and privacy
- Connect open-source interfaces: OpenWebUI, LobeChat, LibreChat, ComfyUI, n8n

---

## ⏱️ Duration

3 days | Intermediate to Advanced | **For Builders Who Want Full Control**

---

## 📋 Prerequisites

- Basic Docker and containerization knowledge
- Familiarity with AI/LLM concepts (completion of Personal AI Assistant Setup recommended)
- A machine with 16GB+ RAM and preferably GPU for local models
- Comfort with command line and configuration files

---

## 🏗️ The Private AI Studio Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     PRIVATE AI STUDIO                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    ORCHESTRATION LAYER                           │   │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │   │
│  │   │   Traefik   │  │   Cloudflare│  │   Unified Auth      │    │   │
│  │   │   Reverse   │  │   Tunnel    │  │   (OAuth/LDAP)      │    │   │
│  │   │   Proxy     │  │             │  │                     │    │   │
│  │   └─────────────┘  └─────────────┘  └─────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                  │                                        │
│           ┌──────────────────────┼──────────────────────┐                │
│           │                      │                      │                 │
│           ▼                      ▼                      ▼                 │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐        │
│  │ RESEARCH STUDIO │   │  CREATION STUDIO│   │  AUTOMATION     │        │
│  │                 │   │                 │   │                 │        │
│  │ • OpenWebUI     │   │ • ComfyUI       │   │ • n8n           │        │
│  │ • RAGFlow/R2R   │   │ • LobeChat      │   │ • Langflow      │        │
│  │ • Qdrant        │   │ • Automatic1111 │   │ • Flowise       │        │
│  │ • Knowledge Base│   │ • FLUX API      │   │                 │        │
│  └─────────────────┘   └─────────────────┘   └─────────────────┘        │
│           │                      │                      │                 │
│           └──────────────────────┼──────────────────────┘                 │
│                                  │                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    MODEL LAYER                                   │   │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │   │
│  │   │   Ollama    │  │   vLLM      │  │   API Gateways      │    │   │
│  │   │   (LLMs)    │  │   (High perf│  │   (OpenAI compat)   │    │   │
│  │   └─────────────┘  └─────────────┘  └─────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Frank's Unique Methods

### The Studio Separation Principle

```
┌─────────────────────────────────────────────────────────────────┐
│                    STUDIO SEPARATION                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   RESEARCH STUDIO              CREATION STUDIO                   │
│   ─────────────────            ─────────────────                 │
│   • Deep thinking             • Rapid iteration                  │
│   • Citation-critical         • Inspiration-first                │
│   • Document-heavy            • Visual-first                     │
│   • Linear workflows          • Branching workflows              │
│   • Accuracy paramount        • Exploration encouraged           │
│   • RAG & synthesis           • Creative experimentation        │
│                                                                  │
│   SEPARATE BUT CONNECTED:                                      │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │   Research informs creation, creation inspires research │  │
│   │   → Share knowledge bases                                │  │
│   │   → Cross-reference outputs                              │  │
│   │   → Unified MCP ecosystem                                │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### The MCP Hub Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│                    MCP HUB ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                      ┌──────────────┐                           │
│                      │  OpenWebUI   │                           │
│                      │  (MCP Hub)   │                           │
│                      └──────┬───────┘                           │
│                             │                                    │
│         ┌───────────────────┼───────────────────┐               │
│         │                   │                   │                │
│         ▼                   ▼                   ▼                │
│   ┌──────────┐       ┌──────────┐       ┌──────────┐           │
│   │ Research │       │ Creation │       │Auto-     │           │
│   │  MCPs    │       │  MCPs    │       │mation    │           │
│   │          │       │          │       │          │           │
│   │• arXiv   │       │• FLUX    │       │• GitHub  │           │
│   │• Search  │       │• ComfyUI │       │• Notion  │           │
│   │• VectorDB│       │• Audio   │       │• Slack   │           │
│   └──────────┘       └──────────┘       └──────────┘           │
│                                                                  │
│   BENEFITS:                                                      │
│   • Single source of truth                                      │
│   • Consistent authentication                                   │
│   • Cross-studio workflows                                      │
│   • Easy to add new tools                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Lab Structure

```
private-ai-studio/
├── README.md                      # This file
├── 01-research-studio/            # RAG-powered research environment
│   ├── README.md
│   ├── 01-openwebui-deployment/
│   ├── 02-rag-configuration/
│   ├── 03-knowledge-base-setup/
│   └── 04-mcp-integration/
├── 02-creation-studio/            # Visual AI creation environment
│   ├── README.md
│   ├── 01-comfyui-deployment/
│   ├── 02-lobechat-integration/
│   ├── 03-image-workflows/
│   └── 04-video-audio-pipelines/
├── 03-infrastructure/             # Shared infrastructure
│   ├── README.md
│   ├── 01-docker-stack/
│   ├── 02-model-serving/
│   ├── 03-monitoring/
│   └── 04-backup-recovery/
├── docker/                        # Docker configurations
│   ├── docker-compose.yml
│   ├── traefik/
│   └── monitoring/
└── solutions/                     # Frank's implementations
    ├── docker-compose.override.yml
    └── mcp-servers/
```

---

## 🚀 Quick Start

```bash
# Clone this lab
git clone https://github.com/frankxai/ai-workshop-for-students.git
cd ai-workshop-for-students/private-ai-studio

# Minimal setup (just OpenWebUI)
cd docker
cp .env.example .env
# Edit .env with your API keys and settings
docker compose up -d openwebui

# Access at http://localhost:3000
```

---

## 📚 Learning Path

This lab is part of the GenCreator Labs ecosystem:

```
🏗️ Infrastructure (You are here)
   ↓
[This Lab] ← Private AI Studio
   ↓
🎯 Recommended After
   → Personal AI Assistant Setup (understand AI agents)
   → MCP Server Mastery (build custom MCP servers)

🔄 Continuous Learning
   → [Discord Community](https://discord.gg/frankx)
   → [Progress Tracking](/progress)
```

---

## 🛠️ Tools & Resources

### Primary Tools

| Tool | Purpose | Documentation |
|------|---------|---------------|
| [OpenWebUI](https://openwebui.com) | Research chat interface | Official docs |
| [ComfyUI](https://github.com/comfyanonymous/ComfyUI) | Visual workflow editor | Official docs |
| [LobeChat](https://chat.lobehub.com) | Multimodal creation chat | Official docs |
| [n8n](https://n8n.io) | Workflow automation | Official docs |
| [Ollama](https://ollama.com) | Local model runner | Official docs |

### Infrastructure Tools

| Tool | Purpose | Documentation |
|------|---------|---------------|
| [Traefik](https://traefik.io) | Reverse proxy | Official docs |
| [Qdrant](https://qdrant.tech) | Vector database | Official docs |
| [Docker](https://docker.com) | Containerization | Official docs |

### External Resources

| Topic | Resource | Why It's Great |
|-------|----------|----------------|
| MCP Protocol | [MCP Spec](https://modelcontextprotocol.io/specification/latest) | Standard protocol |
| Docker Setup | [Docker Docs](https://docs.docker.com) | Container best practices |
| Self-hosted AI | [Self-Hosted AI Guide](https://github.com/marshmallow-code/awesome-selfhosted-ai) | Community curated list |

---

## 👨‍🏫 For Professors

### Assign This Lab

1. Share: `https://github.com/frankxai/ai-workshop-for-students/tree/main/private-ai-studio`
2. Students complete modules at their pace
3. Provide compute resources (GPU access if possible)
4. Assess using deployed studio and working integrations

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

**[Start with Module 1 →](01-research-studio/)**

Questions? [Discord](https://discord.gg/frankx) | [Issues](https://github.com/frankxai/ai-workshop-for-students/issues)

---

*Part of [GenCreator Labs](https://frankx.ai/gencreator) by Frank - Transforming creators from tech-overwhelmed to AI-empowered.*
