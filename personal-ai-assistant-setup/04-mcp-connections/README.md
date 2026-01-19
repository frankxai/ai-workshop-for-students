# Module 4: MCP Connections

**Duration**: 1 hour
**Level**: Beginner
**Prerequisites**: Completed Modules 1-3

---

## Learning Objectives

By the end of this module, you will:

1. Understand what MCP servers do and why they matter
2. Configure essential MCP servers for your workflow
3. Connect Claude to your file system, databases, and APIs
4. Verify MCP connections are working correctly
5. Troubleshoot common connection issues

---

## What is MCP?

**MCP (Model Context Protocol)** is how Claude connects to your data.

```
Without MCP:
Claude can only see what you paste into the conversation

With MCP:
Claude can access your files, databases, APIs, and more
```

### How MCP Works

```
┌─────────────┐     MCP Protocol     ┌─────────────┐
│             │ ←──────────────────→ │             │
│  Claude     │     stdio/SSE        │ MCP Server  │
│  (Client)   │                      │ (Your Data) │
│             │                      │             │
└─────────────┘                      └─────────────┘
```

MCP servers expose:
- **Resources**: Data Claude can read (files, schemas, configs)
- **Tools**: Actions Claude can take (queries, writes, API calls)
- **Prompts**: Reusable templates

---

## 4.1 Essential MCP Servers

### The Starter Pack

These MCP servers cover 90% of common use cases:

| Server | What It Does | Use Case |
|--------|--------------|----------|
| **filesystem** | Read/write files | Working with your codebase |
| **postgres** | Query PostgreSQL | Database access |
| **fetch** | Make HTTP requests | API integrations |
| **memory** | Persistent memory | Long-term context |
| **git** | Git operations | Version control |

### Installing MCP Servers

Most servers are npm packages:

```bash
# Official MCP servers
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-postgres
npm install -g @modelcontextprotocol/server-fetch
npm install -g @modelcontextprotocol/server-memory
npm install -g @modelcontextprotocol/server-git
```

---

## 4.2 Configuring MCP in Claude Code

### Configuration File Location

```
~/.claude/claude_desktop_config.json   # For Claude Desktop
~/.claude/settings.json                 # For Claude Code CLI
```

### Configuration Structure

```json
{
  "mcpServers": {
    "server-name": {
      "command": "path/to/server",
      "args": ["arg1", "arg2"],
      "env": {
        "ENV_VAR": "value"
      }
    }
  }
}
```

### Example: Full Configuration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/you/projects",
        "/Users/you/documents"
      ]
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:pass@localhost:5432/mydb"
      }
    },
    "fetch": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch"
      ]
    },
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory"
      ]
    },
    "git": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-git",
        "--repository",
        "/Users/you/projects/my-repo"
      ]
    }
  }
}
```

---

## 4.3 Server-by-Server Setup

### Filesystem Server

**Purpose**: Let Claude read and write files in specified directories.

**Configuration**:
```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/path/to/allowed/directory1",
      "/path/to/allowed/directory2"
    ]
  }
}
```

**Security Note**: Only include directories you want Claude to access!

**Verification**:
```
You: List the files in my projects directory
Claude: [Uses filesystem server to list files]
```

### PostgreSQL Server

**Purpose**: Let Claude query your PostgreSQL databases.

**Configuration**:
```json
{
  "postgres": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-postgres"
    ],
    "env": {
      "POSTGRES_CONNECTION_STRING": "postgresql://user:password@host:5432/database"
    }
  }
}
```

**For Local Development**:
```json
{
  "env": {
    "POSTGRES_CONNECTION_STRING": "postgresql://localhost:5432/myapp_dev"
  }
}
```

**Verification**:
```
You: What tables exist in my database?
Claude: [Uses postgres server to query information_schema]
```

### Fetch Server

**Purpose**: Let Claude make HTTP requests to APIs.

**Configuration**:
```json
{
  "fetch": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-fetch"
    ]
  }
}
```

**Verification**:
```
You: Fetch the current Bitcoin price from CoinGecko API
Claude: [Uses fetch server to make API request]
```

### Memory Server

**Purpose**: Give Claude persistent memory across sessions.

**Configuration**:
```json
{
  "memory": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-memory"
    ]
  }
}
```

**Usage**:
```
You: Remember that my preferred deployment target is Vercel
Claude: [Stores this in memory server]

[Later session]
You: Where should I deploy this?
Claude: [Retrieves from memory] You prefer Vercel for deployments
```

### Git Server

**Purpose**: Let Claude perform Git operations.

**Configuration**:
```json
{
  "git": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-git",
      "--repository",
      "/path/to/repo"
    ]
  }
}
```

**Verification**:
```
You: What's the git status of my project?
Claude: [Uses git server to run git status]
```

---

## 4.4 Exercise: Set Up Your MCP Stack

### Step 1: Create Configuration File

```bash
# Create the configuration directory
mkdir -p ~/.claude

# Create the configuration file
touch ~/.claude/settings.json
```

### Step 2: Add Basic Configuration

Start with filesystem and memory:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "YOUR_HOME_DIR/projects"
      ]
    },
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory"
      ]
    }
  }
}
```

Replace `YOUR_HOME_DIR` with your actual home directory path.

### Step 3: Verify Connection

1. Restart Claude Code
2. Ask: "What MCP servers do you have access to?"
3. Ask: "List files in my projects directory"

### Step 4: Add Database (Optional)

If you have PostgreSQL:

```json
{
  "mcpServers": {
    "filesystem": { ... },
    "memory": { ... },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "your-connection-string"
      }
    }
  }
}
```

---

## 4.5 Troubleshooting

### Server Not Starting

**Symptoms**: Claude says it doesn't have access to the server.

**Solutions**:
1. Check the path to `npx` is correct
2. Verify the package name is spelled correctly
3. Check the args array syntax
4. Try running the command manually:
   ```bash
   npx -y @modelcontextprotocol/server-filesystem /your/path
   ```

### Permission Denied

**Symptoms**: Claude can see the server but can't access files.

**Solutions**:
1. Check directory permissions
2. Verify the paths in your config are correct
3. Use absolute paths, not relative

### Database Connection Failed

**Symptoms**: PostgreSQL server fails to connect.

**Solutions**:
1. Test connection string with psql first
2. Check if database is running
3. Verify credentials
4. Check for SSL requirements

### Server Crashes

**Symptoms**: Server starts but crashes during use.

**Solutions**:
1. Check server logs (usually in ~/.claude/logs/)
2. Update to latest server version
3. Check for conflicting configurations

### Common Configuration Mistakes

```json
// WRONG: Missing args array
"filesystem": {
  "command": "npx @modelcontextprotocol/server-filesystem"
}

// RIGHT: Args as array
"filesystem": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
}
```

```json
// WRONG: Relative path
"args": ["./projects"]

// RIGHT: Absolute path
"args": ["/Users/you/projects"]
```

```json
// WRONG: Trailing comma
{
  "mcpServers": {
    "filesystem": { ... },  // <-- trailing comma before closing brace
  }
}

// RIGHT: No trailing comma
{
  "mcpServers": {
    "filesystem": { ... }
  }
}
```

---

## 4.6 Security Best Practices

### Principle of Least Privilege

Only give Claude access to what it needs:

```json
// TOO BROAD - gives access to entire filesystem
"args": ["/"]

// BETTER - only specific directories
"args": [
  "/Users/you/projects/current-project",
  "/Users/you/documents/specs"
]
```

### Database Access

For development:
```json
{
  "env": {
    "POSTGRES_CONNECTION_STRING": "postgresql://localhost:5432/myapp_dev"
  }
}
```

For production (DON'T DO THIS):
```json
// NEVER put production credentials in MCP config!
{
  "env": {
    "POSTGRES_CONNECTION_STRING": "postgresql://user:pass@prod-db.example.com/prod"
  }
}
```

### API Keys

Don't store API keys in MCP config. Use environment variables:

```bash
# In your shell profile (.bashrc, .zshrc)
export MY_API_KEY="your-key"
```

Then reference in config:
```json
{
  "env": {
    "API_KEY": "${MY_API_KEY}"
  }
}
```

---

## Lab: Build Your MCP Stack

**Duration**: 20 minutes

### Objective
Set up a production-ready MCP configuration.

### Requirements

1. **Filesystem Server**
   - Configure for your projects directory
   - Verify file listing works

2. **Memory Server**
   - Configure persistent memory
   - Store and retrieve a test memory

3. **One Additional Server** (choose one):
   - PostgreSQL (if you use databases)
   - Fetch (if you use APIs)
   - Git (if you want Git integration)

### Verification Checklist

- [ ] Can list files in configured directories
- [ ] Can store and retrieve memories
- [ ] Third server responds correctly
- [ ] No permission errors
- [ ] Configuration is clean and commented

---

## Assessment

Before moving to Module 5, verify you can:

- [ ] Explain what MCP servers do
- [ ] Configure basic MCP servers
- [ ] Troubleshoot connection issues
- [ ] Follow security best practices
- [ ] Verify servers are working

---

## Next Steps

Claude can now access your data. In **Module 5: Workflow Automations**, you'll create powerful automations that combine MCP capabilities with custom commands.

[Continue to Module 5 →](../05-workflow-automations/)

---

## Resources

- [MCP Protocol Specification](https://spec.modelcontextprotocol.io)
- [Official MCP Servers](https://github.com/modelcontextprotocol/servers)
- [MCP Server Registry](https://mcpservers.org)
- [Building Custom MCP Servers](../../../mcp-server-mastery/)
