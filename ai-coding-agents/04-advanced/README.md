# Module 4: Advanced Agent Patterns

**Duration**: 3 hours
**Level**: Intermediate-Advanced
**Prerequisites**: Completed Modules 0-3

---

## Learning Objectives

By the end of this module, you will:

1. Architect production-grade MCP servers
2. Implement multi-agent orchestration patterns
3. Build hook systems for agent behavior customization
4. Design memory and context management strategies
5. Deploy agents in production environments

---

## Overview

This module takes you from building simple agents to architecting sophisticated AI-powered systems.

```
Advanced Capabilities:
├── MCP Server Architecture
│   ├── Resources (data exposure)
│   ├── Tools (action capabilities)
│   └── Prompts (reusable templates)
├── Multi-Agent Orchestration
│   ├── Specialized agents
│   ├── Handoff patterns
│   └── Workflow coordination
├── Hook Systems
│   ├── Pre/post tool hooks
│   ├── Response filters
│   └── Context injectors
└── Production Patterns
    ├── Error handling
    ├── Monitoring
    └── Scaling
```

---

## 4.1 MCP Server Architecture

### The Three Primitives

MCP provides three primitives for AI-data integration:

| Primitive | Purpose | Example |
|-----------|---------|---------|
| **Resources** | Expose data | Database schemas, file contents |
| **Tools** | Enable actions | Query execution, API calls |
| **Prompts** | Reusable templates | Code review, analysis prompts |

### Production MCP Server Structure

```
mcp-server-myapp/
├── src/
│   ├── index.ts          # Server entry point
│   ├── resources/        # Resource handlers
│   │   ├── database.ts
│   │   └── files.ts
│   ├── tools/            # Tool implementations
│   │   ├── query.ts
│   │   └── mutation.ts
│   ├── prompts/          # Prompt templates
│   │   └── analysis.ts
│   └── utils/            # Shared utilities
│       ├── auth.ts
│       └── validation.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Building a Complete MCP Server

Create `src/index.ts`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Initialize server
const server = new Server(
  {
    name: "myapp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// =============================================================================
// RESOURCES
// =============================================================================

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "myapp://config",
        mimeType: "application/json",
        name: "Application Configuration",
        description: "Current application configuration and settings",
      },
      {
        uri: "myapp://schema",
        mimeType: "application/json",
        name: "Database Schema",
        description: "Current database schema definition",
      },
      {
        uri: "myapp://metrics",
        mimeType: "application/json",
        name: "Application Metrics",
        description: "Real-time application metrics",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "myapp://config":
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(await getConfig(), null, 2),
          },
        ],
      };

    case "myapp://schema":
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(await getSchema(), null, 2),
          },
        ],
      };

    case "myapp://metrics":
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(await getMetrics(), null, 2),
          },
        ],
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// =============================================================================
// TOOLS
// =============================================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query_database",
        description: "Execute a read-only SQL query against the database",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "SQL SELECT query to execute",
            },
            params: {
              type: "array",
              items: { type: "string" },
              description: "Query parameters for prepared statement",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "create_record",
        description: "Create a new record in a table",
        inputSchema: {
          type: "object",
          properties: {
            table: {
              type: "string",
              description: "Table name",
            },
            data: {
              type: "object",
              description: "Record data as key-value pairs",
            },
          },
          required: ["table", "data"],
        },
      },
      {
        name: "analyze_performance",
        description: "Analyze query or function performance",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Query or function to analyze",
            },
            iterations: {
              type: "number",
              description: "Number of iterations for benchmarking",
              default: 100,
            },
          },
          required: ["target"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Validate and sanitize inputs
  validateToolInput(name, args);

  try {
    switch (name) {
      case "query_database":
        const result = await executeQuery(args.query, args.params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };

      case "create_record":
        const id = await createRecord(args.table, args.data);
        return {
          content: [
            {
              type: "text",
              text: `Record created with ID: ${id}`,
            },
          ],
        };

      case "analyze_performance":
        const analysis = await analyzePerformance(args.target, args.iterations);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(analysis, null, 2),
            },
          ],
        };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function validateToolInput(name: string, args: unknown): void {
  // Implement input validation
  if (name === "query_database") {
    const query = (args as { query: string }).query.toUpperCase();
    if (query.includes("DROP") || query.includes("DELETE") || query.includes("TRUNCATE")) {
      throw new Error("Destructive queries are not allowed");
    }
  }
}

async function getConfig(): Promise<object> {
  // Return application config
  return { environment: "development", version: "1.0.0" };
}

async function getSchema(): Promise<object> {
  // Return database schema
  return { tables: ["users", "posts", "comments"] };
}

async function getMetrics(): Promise<object> {
  // Return application metrics
  return { requests: 1000, errors: 5, avgLatency: 50 };
}

async function executeQuery(query: string, params?: string[]): Promise<unknown> {
  // Execute query (implement with your database)
  return { rows: [], count: 0 };
}

async function createRecord(table: string, data: object): Promise<number> {
  // Create record (implement with your database)
  return 1;
}

async function analyzePerformance(target: string, iterations: number): Promise<object> {
  // Analyze performance
  return { avgTime: 10, minTime: 5, maxTime: 20 };
}

// =============================================================================
// START SERVER
// =============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch(console.error);
```

### Exercise 4.1.1: Build a Project-Specific MCP Server

Create an MCP server for your actual project that:

1. Exposes your database schema as a resource
2. Provides safe query execution as a tool
3. Includes at least one analysis capability

---

## 4.2 Multi-Agent Orchestration

### The Orchestration Problem

Single agents hit limitations:
- Context window constraints
- Specialized expertise needed
- Complex workflows

Solution: Multiple specialized agents with coordination.

### Orchestration Patterns

#### Pattern 1: Sequential Pipeline

```
Agent A → Agent B → Agent C → Result
(Research)  (Write)   (Review)
```

```typescript
// Sequential pipeline example
async function contentPipeline(topic: string) {
  // Step 1: Research agent gathers information
  const research = await researchAgent.execute({
    task: `Research ${topic}`,
    outputFormat: "structured_notes",
  });

  // Step 2: Writing agent creates content
  const draft = await writingAgent.execute({
    task: "Write article",
    context: research.output,
    style: "technical_blog",
  });

  // Step 3: Review agent polishes
  const final = await reviewAgent.execute({
    task: "Review and improve",
    content: draft.output,
    criteria: ["clarity", "accuracy", "engagement"],
  });

  return final.output;
}
```

#### Pattern 2: Parallel Execution

```
         ┌─→ Agent A ─→┐
Input ───┼─→ Agent B ─→┼─── Merge ─→ Result
         └─→ Agent C ─→┘
```

```typescript
// Parallel execution example
async function parallelAnalysis(code: string) {
  // Run multiple analyses in parallel
  const [security, performance, quality] = await Promise.all([
    securityAgent.analyze(code),
    performanceAgent.analyze(code),
    qualityAgent.analyze(code),
  ]);

  // Merge results
  return mergeAnalyses({
    security: security.findings,
    performance: performance.findings,
    quality: quality.findings,
  });
}
```

#### Pattern 3: Supervisor Pattern

```
        Supervisor Agent
       /       |       \
   Agent A  Agent B  Agent C
       \       |       /
        Supervisor Agent
```

```typescript
// Supervisor pattern example
class SupervisorAgent {
  private specialists: Map<string, Agent>;

  async coordinate(task: Task): Promise<Result> {
    // Supervisor analyzes task and delegates
    const plan = await this.planExecution(task);

    // Execute plan with specialists
    for (const step of plan.steps) {
      const specialist = this.specialists.get(step.agentType);
      const result = await specialist.execute(step.task);

      // Supervisor reviews and decides next steps
      if (result.needsRevision) {
        step.task = await this.revise(step.task, result.feedback);
        // Re-execute...
      }
    }

    return this.synthesize(plan.results);
  }
}
```

### Exercise 4.2.1: Build a Code Review Pipeline

Create a multi-agent code review system:

1. **Security Agent**: Checks for vulnerabilities
2. **Style Agent**: Checks coding standards
3. **Logic Agent**: Checks for bugs and edge cases
4. **Supervisor**: Coordinates and synthesizes findings

---

## 4.3 Hook Systems

### What Are Hooks?

Hooks let you intercept and modify agent behavior:

```
User Input
    ↓
[Pre-Input Hooks] ← Modify/validate input
    ↓
Agent Processing
    ↓
[Pre-Tool Hooks] ← Intercept tool calls
    ↓
Tool Execution
    ↓
[Post-Tool Hooks] ← Process results
    ↓
Agent Response
    ↓
[Post-Response Hooks] ← Modify/log output
    ↓
User Output
```

### Implementing a Hook System

```typescript
// Hook types
type HookPhase = "pre-input" | "pre-tool" | "post-tool" | "post-response";

interface Hook {
  phase: HookPhase;
  name: string;
  priority: number;
  handler: (context: HookContext) => Promise<HookResult>;
}

interface HookContext {
  input?: string;
  toolName?: string;
  toolArgs?: unknown;
  toolResult?: unknown;
  response?: string;
  metadata: Record<string, unknown>;
}

interface HookResult {
  continue: boolean;
  modified?: unknown;
  error?: string;
}

// Hook registry
class HookRegistry {
  private hooks: Map<HookPhase, Hook[]> = new Map();

  register(hook: Hook): void {
    const phaseHooks = this.hooks.get(hook.phase) || [];
    phaseHooks.push(hook);
    phaseHooks.sort((a, b) => a.priority - b.priority);
    this.hooks.set(hook.phase, phaseHooks);
  }

  async execute(phase: HookPhase, context: HookContext): Promise<HookContext> {
    const hooks = this.hooks.get(phase) || [];

    for (const hook of hooks) {
      const result = await hook.handler(context);

      if (!result.continue) {
        throw new Error(result.error || "Hook stopped execution");
      }

      if (result.modified !== undefined) {
        context = { ...context, ...result.modified };
      }
    }

    return context;
  }
}
```

### Example Hooks

```typescript
// Security hook: Prevent sensitive data exposure
const sensitiveDataHook: Hook = {
  phase: "post-response",
  name: "sensitive-data-filter",
  priority: 1,
  handler: async (context) => {
    const patterns = [
      /api[_-]?key[=:]\s*["']?[\w-]+/gi,
      /password[=:]\s*["']?[^"'\s]+/gi,
      /secret[=:]\s*["']?[\w-]+/gi,
    ];

    let response = context.response || "";
    for (const pattern of patterns) {
      response = response.replace(pattern, "[REDACTED]");
    }

    return {
      continue: true,
      modified: { response },
    };
  },
};

// Logging hook: Track all tool usage
const loggingHook: Hook = {
  phase: "post-tool",
  name: "tool-logger",
  priority: 100,
  handler: async (context) => {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      tool: context.toolName,
      args: context.toolArgs,
      resultSize: JSON.stringify(context.toolResult).length,
    }));

    return { continue: true };
  },
};

// Rate limiting hook
const rateLimitHook: Hook = {
  phase: "pre-tool",
  name: "rate-limiter",
  priority: 1,
  handler: async (context) => {
    const toolName = context.toolName;
    const count = await getToolCallCount(toolName, "1m");

    if (count > 100) {
      return {
        continue: false,
        error: `Rate limit exceeded for tool: ${toolName}`,
      };
    }

    await incrementToolCallCount(toolName);
    return { continue: true };
  },
};
```

### Exercise 4.3.1: Build a Custom Hook

Create a hook that:
1. Logs all database queries
2. Tracks execution time
3. Alerts on slow queries (>100ms)

---

## 4.4 Memory and Context Management

### The Context Problem

LLMs have limited context windows. How do you maintain:
- Long-term project knowledge?
- Conversation history?
- Learning from past interactions?

### Memory Architecture

```
┌─────────────────────────────────────────────┐
│              Working Memory                  │
│  (Current conversation, immediate context)   │
├─────────────────────────────────────────────┤
│              Short-Term Memory               │
│  (Recent sessions, cached results)           │
├─────────────────────────────────────────────┤
│              Long-Term Memory                │
│  (Knowledge base, learned patterns)          │
└─────────────────────────────────────────────┘
```

### Implementing Memory Layers

```typescript
interface Memory {
  store(key: string, value: unknown, ttl?: number): Promise<void>;
  retrieve(key: string): Promise<unknown | null>;
  search(query: string, limit?: number): Promise<SearchResult[]>;
  forget(key: string): Promise<void>;
}

class WorkingMemory implements Memory {
  private cache: Map<string, { value: unknown; expires: number }> = new Map();

  async store(key: string, value: unknown, ttl = 3600000): Promise<void> {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl,
    });
  }

  async retrieve(key: string): Promise<unknown | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  // ... other methods
}

class LongTermMemory implements Memory {
  private db: Database;

  async store(key: string, value: unknown): Promise<void> {
    // Store in persistent database with embeddings for search
    const embedding = await generateEmbedding(JSON.stringify(value));
    await this.db.insert("memories", {
      key,
      value: JSON.stringify(value),
      embedding,
      created_at: new Date(),
    });
  }

  async search(query: string, limit = 10): Promise<SearchResult[]> {
    // Semantic search using embeddings
    const queryEmbedding = await generateEmbedding(query);
    return this.db.query(`
      SELECT * FROM memories
      ORDER BY embedding <-> $1
      LIMIT $2
    `, [queryEmbedding, limit]);
  }

  // ... other methods
}
```

### Context Compression

When context gets too long, compress intelligently:

```typescript
async function compressContext(
  messages: Message[],
  maxTokens: number
): Promise<Message[]> {
  // Strategy 1: Summarize old messages
  const oldMessages = messages.slice(0, -10);
  const recentMessages = messages.slice(-10);

  if (estimateTokens(messages) <= maxTokens) {
    return messages;
  }

  // Create summary of old messages
  const summary = await summarizeMessages(oldMessages);

  return [
    { role: "system", content: `Previous conversation summary: ${summary}` },
    ...recentMessages,
  ];
}

async function summarizeMessages(messages: Message[]): Promise<string> {
  // Use a smaller model for summarization
  return await llm.complete({
    model: "claude-haiku",
    prompt: `Summarize this conversation, preserving key decisions and context:\n${
      messages.map(m => `${m.role}: ${m.content}`).join("\n")
    }`,
    maxTokens: 500,
  });
}
```

---

## 4.5 Production Deployment

### Deployment Checklist

- [ ] **Error Handling**: Graceful degradation
- [ ] **Logging**: Structured logs for debugging
- [ ] **Monitoring**: Health checks, metrics
- [ ] **Security**: Input validation, rate limiting
- [ ] **Scaling**: Stateless design, load balancing

### Docker Deployment

```dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY .claude ./config

ENV NODE_ENV=production
ENV MCP_CONFIG_PATH=/app/config

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js || exit 1

USER node

CMD ["node", "dist/index.js"]
```

### Monitoring Setup

```typescript
// Prometheus metrics
import { Counter, Histogram, Registry } from "prom-client";

const registry = new Registry();

const toolCallsCounter = new Counter({
  name: "mcp_tool_calls_total",
  help: "Total number of tool calls",
  labelNames: ["tool_name", "status"],
  registers: [registry],
});

const toolLatencyHistogram = new Histogram({
  name: "mcp_tool_latency_seconds",
  help: "Tool call latency in seconds",
  labelNames: ["tool_name"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
  registers: [registry],
});

// Wrap tool calls with metrics
async function instrumentedToolCall(
  name: string,
  handler: () => Promise<unknown>
): Promise<unknown> {
  const startTime = Date.now();
  try {
    const result = await handler();
    toolCallsCounter.inc({ tool_name: name, status: "success" });
    return result;
  } catch (error) {
    toolCallsCounter.inc({ tool_name: name, status: "error" });
    throw error;
  } finally {
    const duration = (Date.now() - startTime) / 1000;
    toolLatencyHistogram.observe({ tool_name: name }, duration);
  }
}
```

---

## Lab: Build a Production Agent System

**Duration**: 1.5 hours

### Objective
Build a complete, production-ready agent system.

### Requirements

1. **MCP Server** with:
   - 3+ resources
   - 5+ tools
   - Input validation
   - Error handling

2. **Multi-Agent Setup** with:
   - 2+ specialized agents
   - Clear handoff logic
   - Result synthesis

3. **Hook System** with:
   - Logging hook
   - Security hook
   - Rate limiting

4. **Deployment Ready**:
   - Dockerfile
   - Health check
   - Basic monitoring

### Deliverable
A GitHub repository with documented, deployable agent system.

---

## Assessment Checklist

Before moving to Module 5, verify you can:

- [ ] Build production-grade MCP servers
- [ ] Implement multi-agent orchestration
- [ ] Create custom hook systems
- [ ] Design memory management strategies
- [ ] Deploy agents to production

---

## Next Steps

You've mastered advanced patterns. In **Module 5: Evolution Framework**, you'll learn:
- The complete evolution stack
- Building reusable skill libraries
- Creating agent personas
- Designing orchestration systems

[Continue to Module 5 →](../05-evolution/)

---

## Resources

- [MCP Protocol Specification](https://spec.modelcontextprotocol.io)
- [Claude Code Architecture](https://docs.anthropic.com/claude-code/architecture)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Prometheus Metrics](https://prometheus.io/docs/concepts/metric_types/)
