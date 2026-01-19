# Module 5: Evolution Path
**Time**: 3 hours | **Difficulty**: Intermediate to Advanced

---

## Learning Objectives

By completing this module, you will:
- [ ] Understand the evolution from basic prompts to full orchestration
- [ ] Create skill.md files for domain expertise
- [ ] Build agent.md configurations for specialized behaviors
- [ ] Master CLAUDE.md project instructions
- [ ] Implement plugins and MCP servers for extensibility

---

## The Evolution Framework

Your journey from AI assistant user to AI system architect:

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE EVOLUTION STACK                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  LEVEL 5: ORCHESTRATION                                         │
│  ├── Multi-agent systems                                        │
│  ├── Agent handoffs and routing                                 │
│  ├── Workflow automation                                        │
│  └── Production deployments                                     │
│                                                                  │
│  LEVEL 4: PLUGINS & MCP                                         │
│  ├── Custom MCP servers                                         │
│  ├── Plugin development                                         │
│  ├── External integrations                                      │
│  └── Tool ecosystems                                            │
│                                                                  │
│  LEVEL 3: agent.md                                              │
│  ├── Agent personas                                             │
│  ├── Behavioral rules                                           │
│  ├── Specialized knowledge                                      │
│  └── Response patterns                                          │
│                                                                  │
│  LEVEL 2: skill.md                                              │
│  ├── Domain expertise                                           │
│  ├── Best practices                                             │
│  ├── Code patterns                                              │
│  └── Methodology                                                │
│                                                                  │
│  LEVEL 1: CLAUDE.md                                             │
│  ├── Project context                                            │
│  ├── Codebase instructions                                      │
│  ├── Team conventions                                           │
│  └── Current focus                                              │
│                                                                  │
│  LEVEL 0: BASIC PROMPTS                                         │
│  └── Simple questions and commands                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Level 0: Basic Prompts

Where everyone starts:

```bash
> "Write a function to validate email addresses"
> "Fix the bug on line 45"
> "Explain what this code does"
```

**Limitations**:
- No persistent context
- Agent doesn't know your patterns
- Same questions repeated
- No accumulated knowledge

---

## Level 1: CLAUDE.md - Project Context

Your first evolution: teaching the agent about your project.

### Structure

```markdown
# Project Name

## Overview
One-paragraph description of what this project does.

## Tech Stack
- Language: TypeScript 5.x
- Framework: Next.js 15 (App Router)
- Database: PostgreSQL with Drizzle ORM
- Styling: Tailwind CSS
- Testing: Vitest

## Project Structure
```
src/
├── app/           # Next.js pages
├── components/    # React components
├── lib/           # Utility functions
├── services/      # Business logic
└── types/         # TypeScript types
```

## Conventions
- Use functional components with hooks
- Prefer named exports over default exports
- Tests live alongside source files (*.test.ts)
- Use absolute imports (@/...)

## Current Focus
We're implementing user authentication with JWT.

## Important Notes
- Never commit .env files
- Run `pnpm lint` before committing
- Database migrations in /drizzle folder
```

### Placement

```
your-project/
├── CLAUDE.md          # Root level for project context
├── src/
│   └── CLAUDE.md      # Optional: per-directory context
├── package.json
└── ...
```

### Impact

With CLAUDE.md, the agent:
- Knows your tech stack
- Follows your conventions
- Understands project structure
- Stays focused on current work

---

## Level 2: skill.md - Domain Expertise

Package your knowledge into reusable skills.

### What is a Skill?

A skill is documented expertise the agent can invoke:

```markdown
# TypeScript Best Practices Skill

## Purpose
Guide for writing clean, type-safe TypeScript code.

## Core Principles

### 1. Strict Mode Always
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. Prefer Type Inference
```typescript
// Good - inferred
const user = { name: "Frank", age: 30 };

// Unnecessary - explicit when obvious
const user: { name: string; age: number } = { name: "Frank", age: 30 };
```

### 3. Use Type Guards
```typescript
function isUser(value: unknown): value is User {
  return typeof value === 'object'
    && value !== null
    && 'name' in value;
}
```

## Common Patterns
[Pattern examples...]

## Anti-Patterns to Avoid
[What not to do...]

## Activation
Use this skill when:
- Writing new TypeScript code
- Reviewing TypeScript PRs
- Refactoring JavaScript to TypeScript
```

### Creating Skills

1. **Identify repeated expertise** - What do you explain often?
2. **Document best practices** - What works?
3. **Include examples** - Show, don't just tell
4. **Define activation** - When should it apply?

### Skill Organization

```
.claude-skills/
├── technical/
│   ├── typescript-best-practices/
│   │   └── CLAUDE.md
│   ├── react-patterns/
│   │   └── CLAUDE.md
│   └── testing-strategies/
│       └── CLAUDE.md
├── business/
│   └── api-design/
│       └── CLAUDE.md
└── README.md
```

### Invoking Skills

```bash
# In Claude Code
/skill typescript-best-practices

# The agent now applies this knowledge
> "Review this TypeScript code"
# Agent applies best practices from skill
```

---

## Level 3: agent.md - Agent Personas

Create specialized agents with distinct behaviors.

### Agent Configuration Structure

```markdown
# Code Reviewer Agent

## Identity
You are a meticulous senior code reviewer focused on code quality,
security, and maintainability.

## Personality
- Thorough but not pedantic
- Explains the "why" behind suggestions
- Prioritizes critical issues over style nits
- Encouraging when code is good

## Behaviors

### On Code Review Request
1. First, understand the full context
2. Check for security vulnerabilities
3. Review logic and edge cases
4. Assess maintainability
5. Note positive aspects too

### Response Format
```markdown
## Review Summary
[Overall assessment]

## Critical Issues
[Must fix before merge]

## Suggestions
[Nice to have improvements]

## Positive Notes
[What's done well]
```

## Tools to Use
- Read: Always read full file context
- Grep: Search for similar patterns
- Web: Check for known vulnerabilities

## Tools to Avoid
- Write: Don't auto-fix, suggest instead
- Bash: No command execution during review

## Example Interactions

User: "Review this authentication code"
Agent: [Reads code, provides structured review]
```

### Multiple Agents

```
.claude/agents/
├── code-reviewer.md
├── architect.md
├── documentation-writer.md
└── test-generator.md
```

### Switching Agents

```bash
# Activate specific agent
/agent code-reviewer

# Now reviews use this persona
> "Review the latest PR"
```

---

## Level 4: Plugins & MCP Servers

Extend capabilities with custom integrations.

### Plugin System

```yaml
# .claude/plugins/git-enhanced.yaml
name: git-enhanced
version: 1.0.0
description: Enhanced git operations

commands:
  - name: smart-commit
    description: Generate commit message and commit
    handler: ./handlers/smart-commit.ts

  - name: pr-summary
    description: Generate PR summary from commits
    handler: ./handlers/pr-summary.ts

permissions:
  - bash
  - read
  - write
```

### Custom MCP Server

```typescript
// mcp-servers/notes-server/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server({
  name: "notes-server",
  version: "1.0.0",
});

// Resource: List all notes
server.setRequestHandler("resources/list", async () => ({
  resources: [
    {
      uri: "notes://all",
      name: "All Notes",
      mimeType: "application/json"
    }
  ]
}));

// Tool: Create note
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
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
    }
  ]
}));

// Run server
server.run();
```

### MCP Server Registration

```json
// ~/.claude/mcp_servers.json
{
  "servers": {
    "notes": {
      "command": "node",
      "args": ["./mcp-servers/notes-server/index.js"],
      "env": {}
    },
    "database": {
      "command": "npx",
      "args": ["@mcp/postgres-server"],
      "env": {
        "DATABASE_URL": "postgresql://..."
      }
    }
  }
}
```

---

## Level 5: Orchestration

The pinnacle: coordinating multiple agents and systems.

### Multi-Agent Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR                             │
│  Routes tasks, manages handoffs, aggregates results        │
├────────────────────────────────────────────────────────────┤
│                           │                                 │
│      ┌────────────────────┼────────────────────┐           │
│      │                    │                    │           │
│  ┌───▼───┐          ┌────▼────┐         ┌────▼────┐       │
│  │ Coder │          │Reviewer │         │  Tester │       │
│  │ Agent │          │  Agent  │         │  Agent  │       │
│  └───────┘          └─────────┘         └─────────┘       │
│                                                            │
│  Skills: TypeScript, React    Security, Performance    Vitest│
│  Tools: Write, Execute        Read, Analyze            Bash │
└────────────────────────────────────────────────────────────┘
```

### Workflow Definition

```yaml
# workflows/feature-development.yaml
name: Feature Development
description: Full feature implementation workflow

steps:
  - agent: architect
    task: "Design the feature architecture"
    output: design.md

  - agent: coder
    task: "Implement based on {design.md}"
    output: implementation/

  - agent: reviewer
    task: "Review {implementation/}"
    output: review.md
    gate:
      condition: "no critical issues"

  - agent: tester
    task: "Write tests for {implementation/}"
    output: tests/

  - agent: documenter
    task: "Document the feature"
    output: docs/

on_complete:
  - create PR
  - notify team
```

### Handoff Patterns

```typescript
// Example handoff logic
async function developFeature(request: string) {
  // Step 1: Architecture
  const design = await runAgent('architect', {
    task: `Design: ${request}`,
    context: await getProjectContext()
  });

  // Step 2: Implementation
  const code = await runAgent('coder', {
    task: 'Implement this design',
    context: design,
    skills: ['typescript', 'react']
  });

  // Step 3: Review
  const review = await runAgent('reviewer', {
    task: 'Review this implementation',
    context: code
  });

  // Step 4: Gate check
  if (review.hasCriticalIssues) {
    return developFeature(request); // Recurse
  }

  // Step 5: Tests
  const tests = await runAgent('tester', {
    task: 'Write tests',
    context: code
  });

  return { design, code, review, tests };
}
```

---

## Practical Lab: Build Your Evolution Stack

### Lab 5.1: Create Your CLAUDE.md (15 min)

1. Choose a project
2. Create CLAUDE.md with:
   - Project overview
   - Tech stack
   - Conventions
   - Current focus
3. Test by asking the agent about your project

### Lab 5.2: Build Your First Skill (30 min)

1. Identify expertise you share often
2. Create `.claude-skills/your-skill/CLAUDE.md`
3. Include:
   - Purpose
   - Core principles
   - Examples
   - When to use
4. Test the skill

### Lab 5.3: Configure an Agent (30 min)

1. Create `.claude/agents/your-agent.md`
2. Define:
   - Identity and personality
   - Behaviors
   - Tools permissions
3. Test the agent persona

### Lab 5.4: Build an MCP Server (45 min)

1. Scaffold MCP server with template
2. Implement one resource
3. Implement one tool
4. Register with Claude Code
5. Test integration

---

## Assessment

### Evolution Quiz

1. What problem does CLAUDE.md solve?
2. When should you create a skill vs agent?
3. What are the three MCP primitives?
4. What's the benefit of multi-agent orchestration?

### Practical Assessment

Create a complete evolution stack for a sample project:
- [ ] CLAUDE.md with full project context
- [ ] One skill for a technical domain
- [ ] One agent configuration
- [ ] Verification that all work together

---

## Key Takeaways

```
EVOLUTION SUMMARY
═════════════════

LEVEL 0: Basic Prompts
└── Starting point, no persistence

LEVEL 1: CLAUDE.md
└── Project context persists across sessions

LEVEL 2: skill.md
└── Package expertise into reusable knowledge

LEVEL 3: agent.md
└── Specialized behaviors and personas

LEVEL 4: Plugins & MCP
└── Extend capabilities with integrations

LEVEL 5: Orchestration
└── Coordinate multiple agents for complex tasks

THE PRINCIPLE: Each level builds on previous
└── Start simple, evolve as needed
```

---

## Resources

### Templates

- [CLAUDE.md Template](../resources/templates/CLAUDE.md.template)
- [skill.md Template](../resources/templates/skill.md.template)
- [agent.md Template](../resources/templates/agent.md.template)
- [MCP Server Template](../resources/templates/mcp-server/)

### Examples

- [FrankX Skills Library](https://github.com/frankx-ai/claude-skills)
- [Oh-My-OpenCode](https://github.com/opencode-ai/oh-my-opencode)
- [MCP Server Examples](https://github.com/modelcontextprotocol/servers)

### Community

- FrankX Workshop Discord
- Weekly Evolution Showcases
- GitHub Discussions

---

## Next Steps

Congratulations! You've completed the Evolution module.

**Continue your journey**:
- [Labs: Hands-On Practice](../labs/)
- [Projects: Capstone Challenges](../projects/)
- [Oracle GenAI Workshop](../../oracle-genai-enterprise/)

---

*Estimated time: 3 hours | You've reached the Evolution milestone!*
