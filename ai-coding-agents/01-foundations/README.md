# Module 1: Foundations
**Time**: 1 hour | **Difficulty**: Beginner to Intermediate

---

## Learning Objectives

By completing this module, you will:
- [ ] Understand how AI coding agents work internally
- [ ] Know the difference between LLMs, agents, and tools
- [ ] Understand context windows and their implications
- [ ] Recognize different agent architectures
- [ ] Understand the MCP protocol and why it matters

---

## What is an AI Coding Agent?

An AI coding agent is more than a chatbot that writes code. It's an autonomous system that can:

```
┌─────────────────────────────────────────────────────────────┐
│                    AI CODING AGENT                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │ PERCEIVE │───>│  REASON  │───>│   ACT    │             │
│   │          │    │          │    │          │             │
│   │ Read code│    │ Understand│   │ Write    │             │
│   │ See files│    │ Plan     │    │ Execute  │             │
│   │ Get input│    │ Decide   │    │ Modify   │             │
│   └──────────┘    └──────────┘    └──────────┘             │
│        │                                │                   │
│        └────────────────────────────────┘                   │
│                    FEEDBACK LOOP                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Key Capabilities

| Capability | What It Means | Example |
|------------|---------------|---------|
| **File Operations** | Read, write, edit files | Modify source code |
| **Command Execution** | Run terminal commands | Execute tests, build |
| **Code Understanding** | Parse and analyze code | Find bugs, suggest fixes |
| **Planning** | Break down complex tasks | Multi-step refactoring |
| **Tool Use** | Invoke external tools | Search, web fetch, APIs |

---

## The Anatomy of an Agent

### 1. The LLM Core

At the heart of every coding agent is a Large Language Model:

```
┌─────────────────────────────────────────────────────────┐
│                         LLM                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │                 CAPABILITIES                     │   │
│  │                                                  │   │
│  │  • Code generation (all languages)              │   │
│  │  • Natural language understanding               │   │
│  │  • Pattern recognition                          │   │
│  │  • Reasoning and planning                       │   │
│  │  • Error analysis                               │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │                 LIMITATIONS                      │   │
│  │                                                  │   │
│  │  • No persistent memory (within context)        │   │
│  │  • Knowledge cutoff date                        │   │
│  │  • Can hallucinate                              │   │
│  │  • Limited context window                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2. The Tool System

Tools extend what the LLM can do:

```typescript
// Example: Tool definition structure
interface Tool {
  name: string;           // "read_file"
  description: string;    // What the tool does
  parameters: Schema;     // Input parameters
  execute: Function;      // Actual implementation
}

// The agent decides when to use tools
// LLM: "I need to read main.ts to understand the code"
// → Calls: read_file({ path: "main.ts" })
// → Gets file contents
// → Continues reasoning
```

### 3. The Context Window

The context window is the agent's "working memory":

```
┌─────────────────────────────────────────────────────────┐
│                   CONTEXT WINDOW                         │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ System Prompt                           [1K]   │    │
│  ├────────────────────────────────────────────────┤    │
│  │ Project Context (CLAUDE.md, etc.)      [5K]   │    │
│  ├────────────────────────────────────────────────┤    │
│  │ Conversation History                   [50K]  │    │
│  ├────────────────────────────────────────────────┤    │
│  │ Current Task + Code Context           [100K]  │    │
│  ├────────────────────────────────────────────────┤    │
│  │ Available for Generation               [44K]  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Total: 200K tokens (Claude) / 128K tokens (GPT-4)     │
└─────────────────────────────────────────────────────────┘
```

**Why Context Matters**:
- More context = Better understanding of your codebase
- But: More context = More expensive, potentially slower
- Best practice: Provide relevant context, not everything

---

## Agent Architectures

### ReAct (Reasoning + Acting)

Most coding agents use the ReAct pattern:

```
User: "Fix the bug in the login function"

Agent:
  THOUGHT: I need to find the login function first
  ACTION: Search for "login" in the codebase
  OBSERVATION: Found login() in src/auth.ts

  THOUGHT: Now I'll read the function to understand the bug
  ACTION: Read src/auth.ts
  OBSERVATION: [file contents]

  THOUGHT: I see the issue - missing null check on line 45
  ACTION: Edit src/auth.ts to add null check
  OBSERVATION: File updated successfully

  THOUGHT: I should verify the fix works
  ACTION: Run tests
  OBSERVATION: All tests passing

  RESPONSE: Fixed the bug by adding a null check...
```

### Tool Use Pattern

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│   LLM    │───>│  Tool    │───>│  Result  │
│ decides  │    │ executes │    │ returned │
│  what    │    │  action  │    │ to LLM   │
└──────────┘    └──────────┘    └──────────┘
      │                              │
      └──────────────────────────────┘
              Continues reasoning
```

### Planning Pattern

For complex tasks, agents plan first:

```
User: "Refactor the authentication system to use JWT"

Agent Planning:
1. [ ] Analyze current auth implementation
2. [ ] Research JWT best practices
3. [ ] Design new token structure
4. [ ] Update user service
5. [ ] Update middleware
6. [ ] Update API routes
7. [ ] Write migration script
8. [ ] Update tests
9. [ ] Document changes

Then executes each step...
```

---

## The MCP Protocol

### What is MCP?

Model Context Protocol (MCP) is an open standard for connecting AI models to data sources:

```
┌─────────────────────────────────────────────────────────┐
│                    MCP ARCHITECTURE                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────┐         ┌────────────┐                  │
│  │   Claude   │◄───────►│ MCP Server │                  │
│  │   (Host)   │  MCP    │            │                  │
│  └────────────┘ Protocol└────────────┘                  │
│                              │                           │
│                              ▼                           │
│                    ┌──────────────────┐                 │
│                    │  Data Sources    │                 │
│                    │  • Databases     │                 │
│                    │  • APIs          │                 │
│                    │  • File systems  │                 │
│                    │  • Services      │                 │
│                    └──────────────────┘                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### MCP Components

| Component | Purpose | Example |
|-----------|---------|---------|
| **Resources** | Expose data to the model | Database schemas, files |
| **Tools** | Let model take actions | Query database, send email |
| **Prompts** | Reusable prompt templates | Code review prompt |

### Why MCP Matters

Before MCP:
```
App 1 ──┐
App 2 ──┼── Custom integrations for each ──┬── Data Source 1
App 3 ──┤                                   ├── Data Source 2
App 4 ──┘                                   └── Data Source 3
```

After MCP:
```
App 1 ──┐                              ┌── Data Source 1
App 2 ──┼── Standard MCP Protocol ────┼── Data Source 2
App 3 ──┤                              └── Data Source 3
App 4 ──┘
```

**Benefits**:
- Write once, use everywhere
- Security built into protocol
- Growing ecosystem of servers
- Enterprise-ready authentication

---

## Practical Implications

### Choosing the Right Model

| Use Case | Recommended Model | Why |
|----------|-------------------|-----|
| Daily coding | Claude 3.5 Sonnet | Best balance of speed/quality/cost |
| Complex architecture | Claude Opus 4 | Superior reasoning |
| Quick tasks | Claude Haiku | Fast and cheap |
| Multi-model | Mix | Use right tool for job |

### Context Management Strategies

1. **Project Context Files** (CLAUDE.md)
   - Put essential info at the top
   - Keep concise but complete

2. **Selective File Reading**
   - Don't read everything
   - Let agent search first

3. **Summarization**
   - For long conversations
   - Auto-compression helps

### When Agents Struggle

| Problem | Solution |
|---------|----------|
| Hallucinating APIs | Provide documentation |
| Wrong file structure | Clear CLAUDE.md |
| Infinite loops | Better prompts, limits |
| Security issues | Review before executing |

---

## Assessment

### Quick Quiz

1. What's the main limitation of LLM context windows?
2. Name two components of the MCP protocol
3. What pattern do most coding agents use?
4. Why is MCP important for enterprise adoption?

### Practical Exercise

Write a description of how you'd explain AI coding agents to a colleague who's never used one. Include:
- What it can do
- What it can't do
- When to use it vs. manual coding

---

## Key Takeaways

```
FOUNDATIONS SUMMARY
═══════════════════

1. AGENTS = LLM + TOOLS + CONTEXT
   └─ More than just a chatbot

2. CONTEXT WINDOW is finite
   └─ Manage it wisely

3. ReAct PATTERN: Think → Act → Observe
   └─ How agents solve problems

4. MCP PROTOCOL standardizes AI-to-data
   └─ The future of integration

5. CHOOSE MODELS for the task
   └─ Not all tasks need the biggest model
```

---

## Next Steps

Ready to set up your first coding agent?

**[Module 2: Setup Guides →](../02-setup-guides/)**

---

*Estimated time: 1 hour | Next: Setup Guides*
