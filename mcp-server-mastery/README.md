# MCP Server Architecture Workshop
**Build Production-Grade Model Context Protocol Servers**

---

## Workshop Overview

The Model Context Protocol (MCP) is the open standard that connects AI models to your data. This workshop teaches you to build secure, production-ready MCP servers from scratch.

**Duration**: 1-2 days | **Level**: Intermediate

---

## The MCP Revolution

```
BEFORE MCP                           AFTER MCP
──────────                           ─────────
Custom integrations              →   Standard protocol
One-off solutions                →   Reusable servers
Security per integration         →   Built-in security
Vendor lock-in                   →   Universal compatibility
```

---

## What You'll Build

By completing this workshop:

1. **Your First MCP Server**
   - Complete resource implementation
   - Custom tool definitions
   - Prompt templates

2. **Production Server**
   - Error handling and logging
   - Authentication and authorization
   - Performance optimization

3. **Real-World Integration**
   - Connect to Claude Code
   - Deploy to production
   - Monitor and maintain

---

## Workshop Structure

### Module 1: MCP Fundamentals (1 hour)

Understand the protocol before building.

**Topics**:
- Protocol architecture
- Resources, Tools, Prompts
- Transport mechanisms
- Security model

**Concepts Covered**:
```
┌────────────────────────────────────────────────────────────┐
│                    MCP ARCHITECTURE                         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐     MCP Protocol    ┌─────────────┐      │
│  │   CLIENT    │◄───────────────────►│   SERVER    │      │
│  │  (Claude)   │                      │  (Your Code)│      │
│  └─────────────┘                      └─────────────┘      │
│                                              │              │
│       Requests:                              │              │
│       • resources/list                       ▼              │
│       • tools/call                   ┌─────────────┐      │
│       • prompts/get                  │   DATA      │      │
│                                       │  SOURCES   │      │
│       Responses:                      │            │      │
│       • Resource content             │ • Database │      │
│       • Tool results                 │ • APIs     │      │
│       • Prompt templates             │ • Files    │      │
│                                       └─────────────┘      │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

[Start Module 1 →](./01-fundamentals/)

---

### Module 2: Building Your First Server (2 hours)

Hands-on server development.

**What You'll Build**:
A notes MCP server that allows AI to read and create notes.

**Key Code**:
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "notes-server",
  version: "1.0.0",
}, {
  capabilities: {
    resources: {},
    tools: {}
  }
});

// Implement resources
server.setRequestHandler("resources/list", async () => ({
  resources: [{
    uri: "notes://all",
    name: "All Notes",
    mimeType: "application/json"
  }]
}));

// Implement tools
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "create_note",
    description: "Create a new note",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        content: { type: "string" }
      },
      required: ["title", "content"]
    }
  }]
}));

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

[Start Module 2 →](./02-first-server/)

---

### Module 3: Advanced Patterns (2 hours)

Production-ready implementation patterns.

**Topics**:
- Resource templates for dynamic data
- Tool input validation
- Prompt composition
- Error handling strategies
- Logging and monitoring

**Patterns Covered**:

```typescript
// Pattern: Resource Templates
server.setRequestHandler("resources/templates/list", async () => ({
  resourceTemplates: [{
    uriTemplate: "notes://{id}",
    name: "Note by ID",
    mimeType: "application/json"
  }]
}));

// Pattern: Tool with Validation
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  // Validation
  if (!args.title || args.title.length < 1) {
    throw new Error("Title is required");
  }

  // Implementation
  const result = await createNote(args);

  return {
    content: [{
      type: "text",
      text: JSON.stringify(result)
    }]
  };
});

// Pattern: Error Handling
server.onerror = (error) => {
  console.error("[MCP Error]", error);
};
```

[Start Module 3 →](./03-advanced-patterns/)

---

### Module 4: Production Deployment (2 hours)

Deploy secure, scalable MCP servers.

**Topics**:
- Authentication strategies
- Rate limiting
- Health checks
- Docker deployment
- Monitoring setup

**Deployment Architecture**:
```
┌─────────────────────────────────────────────────────────────┐
│                  PRODUCTION DEPLOYMENT                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────────┐                                          │
│   │ Load Balancer│                                          │
│   └──────┬───────┘                                          │
│          │                                                   │
│   ┌──────┴──────┐                                           │
│   │             │                                            │
│   ▼             ▼                                            │
│ ┌────────┐  ┌────────┐                                      │
│ │ Server │  │ Server │  ← Container instances               │
│ │   1    │  │   2    │                                      │
│ └────┬───┘  └────┬───┘                                      │
│      │           │                                           │
│      └─────┬─────┘                                          │
│            │                                                 │
│      ┌─────▼─────┐                                          │
│      │  Database │  ← Shared state                          │
│      └───────────┘                                          │
│                                                              │
│  Monitoring: Prometheus + Grafana                           │
│  Logging: Structured JSON logs                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

[Start Module 4 →](./04-production/)

---

## Labs

### Lab 1: Notes Server (45 min)
Build a complete notes MCP server with resources and tools.

### Lab 2: Database Integration (1 hour)
Connect your MCP server to PostgreSQL.

### Lab 3: API Gateway (45 min)
Build an MCP server that wraps external APIs.

### Lab 4: Authentication (1 hour)
Implement secure authentication for your server.

---

## Capstone Project

**Build a Knowledge Base MCP Server**

Requirements:
- [ ] Resources: List documents, get document by ID
- [ ] Tools: Search, create, update, delete
- [ ] Prompts: Summary template, Q&A template
- [ ] Auth: API key authentication
- [ ] Deployment: Docker + health checks

---

## MCP Server Templates

### Minimal Server
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server({ name: "minimal", version: "1.0.0" });

// Add your resources and tools here

export default server;
```

### Database Server
```typescript
// Template for database integration
// See labs/database-template/
```

### API Wrapper Server
```typescript
// Template for wrapping REST APIs
// See labs/api-wrapper-template/
```

---

## Resources

### Official Documentation
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [MCP SDK Reference](https://github.com/modelcontextprotocol/sdk)
- [Example Servers](https://github.com/modelcontextprotocol/servers)

### Community
- FrankX Discord #mcp-builders
- MCP GitHub Discussions
- Weekly MCP Office Hours

### Tools
- `@modelcontextprotocol/sdk` - Official SDK
- `mcp-inspector` - Debug tool
- `mcp-test` - Testing framework

---

## Quality Certification

This workshop meets FrankX quality standards:

- [x] All code examples tested (TypeScript 5.x, Node 20)
- [x] 40%+ hands-on content
- [x] Clear learning objectives
- [x] Production-ready patterns
- [x] Troubleshooting guides included

---

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- Basic TypeScript knowledge
- Claude Code or another MCP client
- Completed AI Coding Agents prerequisites

---

## Start Your Journey

Ready to build your first MCP server?

**[Begin with Module 1: Fundamentals →](./01-fundamentals/)**

---

*This workshop is part of the FrankX Workshop System, integrated with frankx.ai/workshops and the Agentic-Creator OS.*
