# Module 1: Research Studio
**Build Your RAG-Powered Knowledge Synthesis Environment**

*Part of GenCreator Labs by Frank*

---

## 🎯 What You'll Learn

- Deploy OpenWebUI as your research command center
- Configure RAG (Retrieval-Augmented Generation) with document ingestion
- Set up knowledge bases with proper chunking and embeddings
- Integrate MCP servers for real-time research tools
- Build citation-backed research workflows
- Connect to local models (Ollama) for privacy-first research

---

## 📁 Module Structure

```
01-research-studio/
├── README.md                      # This file
├── 01-openwebui-deployment/       # OpenWebUI setup
├── 02-rag-configuration/          # RAG engine tuning
├── 03-knowledge-base-setup/       # Document management
└── 04-mcp-integration/            # MCP server connections
```

---

## 🛠️ Deployment Options

### Option A: Minimal (OpenWebUI Only)

```bash
# Single container, basic setup
docker run -d --name open-webui \
  -p 3000:8080 \
  -e WEBUI_SECRET_KEY=$(openssl rand -hex 32) \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:main
```

**Access**: http://localhost:3000

---

### Option B: Production (Full Stack)

```bash
cd docker
cp .env.example .env
# Configure all settings in .env
docker compose -f docker-compose.research.yml up -d
```

**Services**:
- OpenWebUI (port 3000)
- Qdrant Vector DB (port 6333)
- Ollama (port 11434)
- Traefik reverse proxy (port 80/443)

---

## 🔬 RAG Configuration

### Understanding the RAG Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    RAG PIPELINE                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  USER QUERY                                                     │
│      │                                                         │
│      ▼                                                         │
│  ┌─────────────────┐                                            │
│  │  Query Rewrite  │  ← Enhance query for retrieval            │
│  └────────┬────────┘                                           │
│           │                                                    │
│           ▼                                                    │
│  ┌─────────────────┐                                            │
│  │  Vector Search  │  ← Find relevant chunks                   │
│  │   (Qdrant)      │     using embeddings                     │
│  └────────┬────────┘                                           │
│           │                                                    │
│           ▼                                                    │
│  ┌─────────────────┐                                            │
│  │  Context Window │  ← Top-K chunks merged                   │
│  │    (16K-128K)   │     with conversation context            │
│  └────────┬────────┘                                           │
│           │                                                    │
│           ▼                                                    │
│  ┌─────────────────┐                                            │
│  │   LLM Response  │  ← Generate with retrieved context       │
│  │   (Ollama)      │     + citations                          │
│  └─────────────────┘                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Optimal RAG Settings for Research

```yaml
# In OpenWebUI Admin Settings → RAG

Retrieval Settings:
  Chunk Size: 2048 tokens
  Chunk Overlap: 256 tokens
  Top-K Results: 10
  Similarity Threshold: 0.7

Context Settings:
  Context Window Size: 32768 tokens
  RAG Percent of Context: 80%
  RAG Query Generator Model: llama3.2:latest

Citation Settings:
  Enable Citations: true
  Citation Style: APA
  Include Source URLs: true
```

### Handling Ollama Context Limits

**Problem**: Ollama defaults to 2048 tokens, severely limiting RAG

**Solution**: Increase context window in Ollama

```bash
# Check current context limit
curl http://localhost:11434/api/version

# For llama3.2 with 128K context
ollama run llama3.2:latest
# In the Ollama session:
/set parameter num_ctx 131072
/set parameter num_predict 4096

# Or set via environment
export OLLAMA_NUM_PARALLEL=1
export OLLAMA_NUM_CTX=131072
```

---

## 📚 Knowledge Base Management

### Document Processing Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                 DOCUMENT INGESTION                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RAW DOCUMENTS                                                  │
│  ├── PDF (research papers, reports)                            │
│  ├── Markdown (notes, docs)                                    │
│  ├── HTML (web content)                                       │
│  ├── Word documents                                            │
│  └── Audio (transcribed via Whisper)                          │
│                                                                  │
│       │                                                        │
│       ▼                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  PARSING LAYER                          │   │
│  │  • PDF → text (pdfminer, pypdf)                        │   │
│  │  • Markdown → structured text                          │   │
│  │  • HTML → cleaned text + metadata                      │   │
│  │  • Audio → Whisper transcription                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│       │                                                        │
│       ▼                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 CHUNKING LAYER                          │   │
│  │                                                         │   │
│  │  Strategy: Semantic Chunking                            │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │ Sentence 1 │ Sentence 2 │ ... │ Sentence N     │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │              │              │           │               │   │
│  │              ▼              ▼           ▼               │   │
│  │         Semantic boundaries detected by:               │   │
│  │         • Topic shifts (embedding distance)            │   │
│  │         • Paragraph breaks                            │   │
│  │         • Section headers                             │   │
│  │         • Token limits (2048 max)                     │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│       │                                                        │
│       ▼                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                EMBEDDING LAYER                          │   │
│  │                                                         │   │
│  │  Model: nomic-embed-text:latest (8192 dim)             │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │ Chunk 1: [0.23, -0.45, 0.89, ..., 0.12]        │   │   │
│  │  │ Chunk 2: [-0.12, 0.67, -0.34, ..., 0.45]        │   │   │
│  │  │ Chunk 3: [0.78, 0.23, -0.56, ..., -0.23]        │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│       │                                                        │
│       ▼                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              VECTOR STORAGE (Qdrant)                    │   │
│  │                                                         │   │
│  │  Collection: research_knowledge                         │   │
│  │  • Payload: source, title, page, chunk_id              │   │
│  │  • Index: HNSW for fast similarity search              │   │
│  │  • Distance: Cosine similarity                         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Recommended Knowledge Base Structure

```
knowledge-base/
├── research-papers/
│   ├── machine-learning/
│   │   ├── papers/
│   │   └── summaries/
│   ├── ai-safety/
│   │   ├── papers/
│   │   └── summaries/
│   └── domains/
│       ├── healthcare/
│       ├── finance/
│       └── science/
├── documentation/
│   ├── technical/
│   │   ├── api-docs/
│   │   └── architecture/
│   └── user-guides/
│       ├── how-to/
│       └── tutorials/
├── personal-notes/
│   ├── meeting-notes/
│   ├── project-docs/
│   └── journal/
└── web-archives/
    ├── saved-articles/
    └── curated-resources/
```

---

## 🔗 MCP Server Integration

### Native MCP Support (v0.6.31+)

OpenWebUI includes native MCP support. Configure in **Admin → External Tools → MCP Servers**:

```json
{
  "mcpServers": {
    "arxiv": {
      "command": "npx",
      "args": ["-y", "@openwebui/mcp-server-arxiv"],
      "env": {}
    },
    "web-search": {
      "command": "npx",
      "args": ["-y", "@openwebui/mcp-server-web-search"],
      "env": {}
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "PATH_TO_ALLOW": "/data/knowledge-base"
      }
    }
  }
}
```

### Recommended Research MCPs

| MCP Server | Purpose | Install Command |
|------------|---------|-----------------|
| arXiv | Search ML/AI papers | `npx -y @openwebui/mcp-server-arxiv` |
| Web Search | Real-time web queries | `npx -y @openwebui/mcp-server-web-search` |
| GitHub | Code search, repo access | `npx -y @modelcontextprotocol/server-github` |
| Wikipedia | Knowledge queries | `npx -y @openwebui/mcp-server-wikipedia` |
| Brave Search | Alternative web search | `npx -y @openwebui/mcp-server-brave-search` |

### Custom MCP Server Example

```typescript
// mcp-servers/research-helper/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server({
  name: "research-helper",
  version: "1.0.0",
});

server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "summarize_paper",
      description: "Summarize a research paper from URL or file",
      inputSchema: {
        type: "object",
        properties: {
          source: { type: "string", description: "URL or file path" },
          length: { type: "string", enum: ["short", "medium", "long"] }
        },
        required: ["source"]
      }
    },
    {
      name: "find_citations",
      description: "Find all citations of a paper",
      inputSchema: {
        type: "object",
        properties: {
          doi: { type: "string", description: "Paper DOI" },
          limit: { type: "number", default: 10 }
        },
        required: ["doi"]
      }
    },
    {
      name: "compare_claims",
      description: "Compare claims across multiple papers",
      inputSchema: {
        type: "object",
        properties: {
          claim: { type: "string", description: "Claim to verify" },
          papers: { type: "array", description: "Paper DOIs to check" }
        },
        required: ["claim"]
      }
    }
  ]
}));

// Implementation details...
export default server;
```

---

## 📊 Monitoring Research Quality

### Metrics to Track

| Metric | Target | Why |
|--------|--------|-----|
| Citation Accuracy | >95% | Claims backed by sources |
| Response Relevance | >85% | Retrieved context is useful |
| Chunk Utilization | >70% | Retrieved chunks used in response |
| Latency (RAG) | <5s | Research flow maintained |
| Knowledge Base Coverage | Growing | New documents added regularly |

### Setup Monitoring Dashboard

```yaml
# docker/monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'openwebui'
    static_configs:
      - targets: ['openwebui:3000']
  
  - job_name: 'qdrant'
    static_configs:
      - targets: ['qdrant:6333']
  
  - job_name: 'ollama'
    static_configs:
      - targets: ['ollama:11434']
```

---

## 🚀 Quick Start

```bash
# Start Research Studio
cd docker
docker compose -f docker-compose.research.yml up -d

# Access OpenWebUI at http://localhost:3000
# First user becomes admin

# In OpenWebUI:
# 1. Settings → Knowledge → Create knowledge base
# 2. Settings → External Tools → Configure MCP servers
# 3. Upload documents to knowledge base
# 4. Start chatting with RAG enabled
```

---

## 📚 Next Steps

**[→ Module 2: RAG Configuration →](02-rag-configuration/)**

---

*Part of [GenCreator Labs](https://frankx.ai/gencreator) by Frank*
