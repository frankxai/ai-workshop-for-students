# Module 3: Building Your First Agent

**Duration**: 2 hours
**Level**: Beginner-Intermediate
**Prerequisites**: Completed Modules 0-2

---

## Learning Objectives

By the end of this module, you will:

1. Configure a coding agent with personalized settings
2. Create your first prompt templates
3. Build simple but powerful automations
4. Connect to local databases for context
5. Understand the agent development workflow

---

## Overview

This is where theory becomes practice. You'll build a functional AI coding assistant configured specifically for YOUR workflow.

```
What You'll Build:
├── Personalized Claude Code configuration
├── 3 custom prompt templates
├── Git commit automation
├── Local SQLite knowledge base
└── Your first /commands
```

---

## 3.1 Agent Configuration Deep Dive

### Understanding Configuration Layers

Claude Code (and similar agents) have multiple configuration layers:

```
Global Config (~/.claude/settings.json)
    ↓ overrides
Project Config (.claude/settings.json)
    ↓ overrides
Session Settings (runtime flags)
    ↓ overrides
Prompt Instructions (in-conversation)
```

### Essential Configuration Settings

Create or update your project's `.claude/settings.json`:

```json
{
  "model": "claude-sonnet-4-20250514",
  "permissions": {
    "allow_bash": true,
    "allow_file_write": true,
    "allow_mcp": true
  },
  "context": {
    "max_tokens": 100000,
    "include_git_context": true,
    "include_file_tree": true
  },
  "behavior": {
    "auto_approve_safe_commands": false,
    "verbose_mode": false,
    "streaming": true
  }
}
```

### Exercise 3.1.1: Configure Your Agent

1. Create a new project directory
2. Initialize with `git init`
3. Create `.claude/settings.json` with your preferences
4. Test different configurations

**Checkpoint**: Run `claude --version` and verify your settings are loaded.

---

## 3.2 Prompt Template System

### Why Templates Matter

```
Without Templates:
"fix the bug" → unpredictable results

With Templates:
/fix-bug → consistent, high-quality fixes every time
```

### Creating Your First Template

Create `.claude/templates/code-review.md`:

```markdown
# Code Review Template

## Context
You are reviewing code for quality, security, and maintainability.

## Instructions
1. Check for security vulnerabilities (OWASP Top 10)
2. Verify error handling is complete
3. Assess code clarity and naming
4. Check for potential performance issues
5. Suggest improvements (if any)

## Output Format
### Summary
[1-2 sentence overview]

### Issues Found
- [x] Critical: [description]
- [ ] Warning: [description]
- [ ] Suggestion: [description]

### Recommendations
[Numbered list of improvements]

## File to Review
{{file_path}}
```

### Exercise 3.2.1: Build Three Templates

Create templates for your most common tasks:

1. **Code Review** (provided above)
2. **Documentation Generator**
3. **Test Writer**

Save them in `.claude/templates/`.

**Example Documentation Template**:

```markdown
# Documentation Generator

## Context
You generate clear, comprehensive documentation for code.

## Instructions
1. Analyze the code structure
2. Identify public APIs and exports
3. Document parameters and return types
4. Include usage examples
5. Note any edge cases or limitations

## Output Format
Generate documentation in this structure:
- Overview (what it does)
- Installation (if applicable)
- Usage examples
- API reference
- Troubleshooting

## Target
{{file_or_directory}}
```

---

## 3.3 Building Simple Automations

### The Automation Mindset

Good automations follow the UNIX philosophy:
- Do one thing well
- Compose with other tools
- Fail gracefully

### Automation 1: Smart Git Commits

Create `.claude/commands/commit.md`:

```markdown
# Smart Commit Command

Analyze staged changes and create a well-formatted commit message.

## Process
1. Run `git diff --staged` to see changes
2. Analyze the nature of the changes:
   - New feature (feat:)
   - Bug fix (fix:)
   - Refactoring (refactor:)
   - Documentation (docs:)
   - Tests (test:)
   - Chores (chore:)
3. Write a commit message following Conventional Commits
4. Present the message for approval
5. If approved, execute the commit

## Commit Message Format
```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Important
- Never commit secrets or credentials
- Ask for confirmation before committing
```

### Automation 2: Quick Documentation

Create `.claude/commands/doc.md`:

```markdown
# Quick Documentation Command

Generate documentation for the current file or selection.

## Parameters
- target: File path or "selection" for current selection

## Process
1. Read the target code
2. Identify:
   - Functions and their parameters
   - Classes and their methods
   - Exports and their types
3. Generate JSDoc/TSDoc comments
4. Add README section if generating for a module

## Output
Insert documentation comments directly into the code.
```

### Exercise 3.3.1: Create Your Workflow Automation

Build an automation for something you do repeatedly:

1. Identify a repetitive task
2. Break it into steps
3. Create a command file
4. Test with edge cases
5. Refine based on results

---

## 3.4 Connecting to Local Data

### Why Local Data Matters

Your agent becomes dramatically more useful when it understands:
- Your project history
- Your coding patterns
- Your documentation
- Your database schemas

### Setting Up SQLite Knowledge Base

Create a local knowledge base:

```bash
# Create the database
sqlite3 ~/.claude/knowledge.db <<EOF
CREATE TABLE IF NOT EXISTS snippets (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    language TEXT,
    code TEXT NOT NULL,
    description TEXT,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learnings (
    id INTEGER PRIMARY KEY,
    topic TEXT NOT NULL,
    insight TEXT NOT NULL,
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_snippets_tags ON snippets(tags);
CREATE INDEX idx_learnings_topic ON learnings(topic);
EOF
```

### Simple MCP Server for Knowledge Base

Create `mcp-servers/knowledge-base/index.ts`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import Database from "better-sqlite3";
import { homedir } from "os";
import { join } from "path";

const db = new Database(join(homedir(), ".claude", "knowledge.db"));

const server = new Server({
  name: "knowledge-base",
  version: "1.0.0",
});

// List available tools
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "search_snippets",
      description: "Search code snippets by tag or description",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
          language: { type: "string", description: "Filter by language" },
        },
        required: ["query"],
      },
    },
    {
      name: "save_snippet",
      description: "Save a code snippet to knowledge base",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          code: { type: "string" },
          language: { type: "string" },
          description: { type: "string" },
          tags: { type: "string" },
        },
        required: ["name", "code"],
      },
    },
    {
      name: "get_learnings",
      description: "Get learnings on a topic",
      inputSchema: {
        type: "object",
        properties: {
          topic: { type: "string" },
        },
        required: ["topic"],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "search_snippets": {
      const stmt = db.prepare(`
        SELECT * FROM snippets
        WHERE name LIKE ? OR description LIKE ? OR tags LIKE ?
        ${args.language ? "AND language = ?" : ""}
        ORDER BY created_at DESC
        LIMIT 10
      `);
      const query = `%${args.query}%`;
      const params = args.language
        ? [query, query, query, args.language]
        : [query, query, query];
      const results = stmt.all(...params);
      return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
    }

    case "save_snippet": {
      const stmt = db.prepare(`
        INSERT INTO snippets (name, code, language, description, tags)
        VALUES (?, ?, ?, ?, ?)
      `);
      stmt.run(args.name, args.code, args.language, args.description, args.tags);
      return { content: [{ type: "text", text: "Snippet saved successfully!" }] };
    }

    case "get_learnings": {
      const stmt = db.prepare(`
        SELECT * FROM learnings
        WHERE topic LIKE ?
        ORDER BY created_at DESC
      `);
      const results = stmt.all(`%${args.topic}%`);
      return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Exercise 3.4.1: Build Your Knowledge Base

1. Create the SQLite database
2. Add 5 useful code snippets
3. Add 3 learnings from this workshop
4. Query them through Claude Code

---

## 3.5 Putting It All Together

### The Development Flow

```
1. Start session with context
   claude --resume or claude with CLAUDE.md

2. Work with agent assistance
   Use templates, commands, MCP tools

3. Save learnings
   Add insights to knowledge base

4. Commit changes
   Use /commit automation

5. Review and iterate
   Refine configurations based on experience
```

### Exercise 3.5.1: Complete Project Setup

Create a fully configured project:

1. **Project structure**:
   ```
   my-project/
   ├── .claude/
   │   ├── settings.json
   │   ├── CLAUDE.md
   │   ├── templates/
   │   │   ├── code-review.md
   │   │   ├── documentation.md
   │   │   └── test-writer.md
   │   └── commands/
   │       ├── commit.md
   │       └── doc.md
   ├── mcp-servers/
   │   └── knowledge-base/
   └── src/
   ```

2. **Test each component**:
   - Configuration loads correctly
   - Templates produce expected output
   - Commands execute properly
   - MCP server connects and responds

3. **Document your setup** in the project README

---

## Lab: Build a Personal Coding Assistant

**Duration**: 45 minutes

### Objective
Build a personalized coding assistant that knows your preferences.

### Requirements
1. Custom CLAUDE.md with your:
   - Coding style preferences
   - Frequently used patterns
   - Project conventions

2. At least 2 custom templates for:
   - Your most common coding tasks

3. At least 1 automation for:
   - A repetitive workflow

4. Knowledge base with:
   - 5+ useful snippets
   - 3+ learnings

### Deliverable
A working project setup that you'll actually use.

---

## Assessment Checklist

Before moving to Module 4, verify you can:

- [ ] Configure agent settings at project level
- [ ] Create and use prompt templates
- [ ] Build simple command automations
- [ ] Connect to local data sources
- [ ] Establish a productive development workflow

---

## Next Steps

You've built your first agent. In **Module 4: Advanced Patterns**, you'll learn:
- Multi-agent orchestration
- Complex MCP server development
- Hook systems and middleware
- Production deployment patterns

[Continue to Module 4 →](../04-advanced/)

---

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [MCP Protocol Specification](https://spec.modelcontextprotocol.io)
- [Conventional Commits](https://www.conventionalcommits.org)
- [SQLite Documentation](https://sqlite.org/docs.html)
