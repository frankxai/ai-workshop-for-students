# Oracle GenAI for Enterprise Workshop
**When and Why to Choose Oracle GenAI Services & Dedicated AI Clusters**

---

## Workshop Overview

This workshop helps enterprise architects and developers understand the GenAI landscape and make informed decisions about when to use public AI APIs versus Oracle GenAI Services and Dedicated AI Clusters.

**Duration**: 2 days | **Level**: Intermediate to Advanced

---

## The Enterprise AI Decision

```
┌─────────────────────────────────────────────────────────────────┐
│                 ENTERPRISE AI DECISION MATRIX                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PUBLIC AI APIS                    ORACLE GENAI                  │
│  (OpenAI, Anthropic, etc.)        (OCI Services + Clusters)     │
│                                                                  │
│  ✓ Quick to start                 ✓ Data sovereignty             │
│  ✓ Latest models                  ✓ Regulatory compliance        │
│  ✓ Pay-per-use                    ✓ Consistent performance       │
│  ✓ No infrastructure              ✓ Custom fine-tuning           │
│  ✗ Data leaves your control       ✓ OCI ecosystem integration    │
│  ✗ Rate limits                    ✓ Dedicated capacity           │
│  ✗ Compliance challenges          ✗ More initial setup           │
│  ✗ Vendor lock-in risk            ✗ Higher fixed costs           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Module 1: The AI Labs Landscape (1 hour)

### Major AI Providers Comparison

| Provider | Flagship Model | Strengths | Pricing Model |
|----------|---------------|-----------|---------------|
| **Anthropic** | Claude Opus 4 | Coding, analysis, safety | Token-based |
| **OpenAI** | GPT-4 Turbo | General purpose, ecosystem | Token-based |
| **Meta** | Llama 3.1 405B | Open weights, self-host | Compute only |
| **Cohere** | Command R+ | Enterprise RAG, search | Token-based |
| **Google** | Gemini 1.5 Pro | Multimodal, long context | Token-based |
| **xAI** | Grok 2 | Real-time data, reasoning | Token-based |
| **Mistral** | Mistral Large | European, efficient | Token-based |

### When to Use Each

**Anthropic Claude**
- Complex coding tasks
- Long document analysis
- Safety-critical applications
- When you need reliable tool use

**OpenAI GPT-4**
- General purpose tasks
- Image generation (DALL-E)
- Voice applications
- Existing ecosystem integration

**Meta Llama**
- Self-hosted requirements
- Cost-sensitive at scale
- Fine-tuning flexibility
- Academic/research use

**Cohere**
- Enterprise search
- RAG applications
- Multilingual support
- Semantic understanding

---

## Module 2: Oracle GenAI Services (1 hour)

### OCI GenAI Service Overview

Oracle GenAI Service provides:
- Pre-trained foundation models
- Generation capabilities
- Summarization
- Embedding generation
- Chat completions

### Available Models

| Model | Type | Use Case |
|-------|------|----------|
| Cohere Command | Generation | Text generation, chat |
| Cohere Embed | Embedding | Vector search, RAG |
| Meta Llama 2 | Generation | Open-source compatible |
| Meta Llama 3 | Generation | Latest open weights |

### OCI GenAI Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                        OCI GENAI SERVICE                        │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐     ┌─────────────────┐                   │
│  │   Your Apps     │────>│  GenAI Service  │                   │
│  │                 │     │  - Generation   │                   │
│  │  OCI Functions  │     │  - Embedding    │                   │
│  │  Kubernetes     │     │  - Summary      │                   │
│  │  Compute        │     │  - Chat         │                   │
│  └─────────────────┘     └────────┬────────┘                   │
│                                   │                             │
│                    ┌──────────────┴───────────────┐            │
│                    │                              │             │
│              ┌─────▼─────┐              ┌────────▼────────┐    │
│              │  Shared   │              │    Dedicated    │    │
│              │  Cluster  │              │   AI Cluster    │    │
│              │           │              │                 │    │
│              │ Pay-per   │              │ Reserved GPU    │    │
│              │ request   │              │ Fine-tuning     │    │
│              └───────────┘              │ Custom models   │    │
│                                         └─────────────────┘    │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Quick Start: OCI GenAI API

```python
# Python SDK Example
import oci

# Initialize client
config = oci.config.from_file()
genai_client = oci.generative_ai_inference.GenerativeAiInferenceClient(config)

# Generate text
response = genai_client.generate_text(
    generate_text_details=oci.generative_ai_inference.models.GenerateTextDetails(
        compartment_id="ocid1.compartment...",
        serving_mode=oci.generative_ai_inference.models.OnDemandServingMode(
            model_id="cohere.command-r-plus"
        ),
        inference_request=oci.generative_ai_inference.models.CohereLlmInferenceRequest(
            prompt="Explain enterprise AI architecture",
            max_tokens=500,
            temperature=0.7
        )
    )
)

print(response.data.generated_text)
```

---

## Module 3: Dedicated AI Clusters (2 hours)

### What is a Dedicated AI Cluster?

A Dedicated AI Cluster provides:
- **Reserved GPU capacity** - No cold starts, consistent latency
- **Custom fine-tuning** - Train on your data
- **Data isolation** - Your data never leaves your tenancy
- **Compliance** - HIPAA, SOC2, FedRAMP ready
- **Integration** - Native OCI services access

### When to Choose Dedicated Clusters

**Use Dedicated Clusters when:**

| Requirement | Why Dedicated Cluster |
|-------------|----------------------|
| Data sovereignty | Data stays in your OCI region |
| Regulatory compliance | HIPAA, SOC2, PCI-DSS requirements |
| Consistent performance | No shared infrastructure variance |
| Custom models | Fine-tune on proprietary data |
| High volume | Cost-effective at scale |
| Low latency critical | Guaranteed response times |

**Stick with Shared/Public when:**

| Scenario | Why Shared/Public |
|----------|-------------------|
| Experimentation | Lower commitment |
| Variable workloads | Pay-per-use flexibility |
| Latest models needed | Access newest releases |
| Quick prototyping | Minimal setup |

### Architecture: Dedicated AI Cluster

```
┌────────────────────────────────────────────────────────────────┐
│                  YOUR OCI TENANCY                               │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              DEDICATED AI CLUSTER                         │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │                                                   │   │  │
│  │  │   ┌─────────┐  ┌─────────┐  ┌─────────┐        │   │  │
│  │  │   │ GPU Node│  │ GPU Node│  │ GPU Node│        │   │  │
│  │  │   │ A100    │  │ A100    │  │ A100    │        │   │  │
│  │  │   └─────────┘  └─────────┘  └─────────┘        │   │  │
│  │  │                                                   │   │  │
│  │  │   ┌─────────────────────────────────────────┐   │   │  │
│  │  │   │          YOUR CUSTOM MODEL               │   │   │  │
│  │  │   │   (Fine-tuned on your data)             │   │   │  │
│  │  │   └─────────────────────────────────────────┘   │   │  │
│  │  │                                                   │   │  │
│  │  └───────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  YOUR DATA (Never leaves tenancy)                         │  │
│  │  Object Storage │ Autonomous DB │ Data Integration        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Setting Up a Dedicated AI Cluster

**Step 1: Provision Cluster**
```bash
# Using OCI CLI
oci generative-ai dedicated-ai-cluster create \
  --compartment-id $COMPARTMENT_ID \
  --display-name "MyEnterpriseCluster" \
  --unit-count 1 \
  --unit-shape "LARGE_COHERE_V2"
```

**Step 2: Fine-tune Model**
```bash
# Create fine-tuning dataset
oci generative-ai dataset create \
  --compartment-id $COMPARTMENT_ID \
  --training-data-location $OBJECT_STORAGE_URI

# Start fine-tuning job
oci generative-ai fine-tuning-job create \
  --compartment-id $COMPARTMENT_ID \
  --dedicated-ai-cluster-id $CLUSTER_ID \
  --base-model-id "cohere.command" \
  --training-dataset $DATASET_ID
```

**Step 3: Deploy and Use**
```python
# Use your fine-tuned model
response = genai_client.generate_text(
    generate_text_details=GenerateTextDetails(
        compartment_id=compartment_id,
        serving_mode=DedicatedServingMode(
            endpoint_id="ocid1.generativeaiendpoint..."
        ),
        inference_request=CohereLlmInferenceRequest(
            prompt="Your domain-specific prompt",
            max_tokens=500
        )
    )
)
```

---

## Module 4: Integration with Coding Agents (3 hours)

### Connecting OCI GenAI to Claude Code

**MCP Server for OCI GenAI**:

```typescript
// mcp-servers/oci-genai/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import * as oci from "oci-sdk";

const server = new Server({
  name: "oci-genai",
  version: "1.0.0",
});

// Tool: Generate with OCI GenAI
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "oci_generate",
    description: "Generate text using OCI GenAI",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string" },
        model: { type: "string", default: "cohere.command-r-plus" },
        maxTokens: { type: "number", default: 500 }
      },
      required: ["prompt"]
    }
  }]
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "oci_generate") {
    const client = new oci.generativeaiinference.GenerativeAiInferenceClient({
      authenticationDetailsProvider: /* your auth */
    });

    const response = await client.generateText({
      generateTextDetails: {
        compartmentId: process.env.OCI_COMPARTMENT_ID,
        servingMode: {
          servingType: "ON_DEMAND",
          modelId: request.params.arguments.model
        },
        inferenceRequest: {
          runtimeType: "COHERE",
          prompt: request.params.arguments.prompt,
          maxTokens: request.params.arguments.maxTokens
        }
      }
    });

    return {
      content: [{
        type: "text",
        text: response.generateTextResult.generatedTexts[0].text
      }]
    };
  }
});
```

### Architecture Pattern: Hybrid AI

```
┌─────────────────────────────────────────────────────────────────┐
│                    HYBRID AI ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                      ┌──────────────┐                           │
│                      │  Claude Code │                           │
│                      │  (Primary)   │                           │
│                      └──────┬───────┘                           │
│                             │                                    │
│              ┌──────────────┼──────────────┐                    │
│              │              │              │                     │
│       ┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼─────┐              │
│       │  Anthropic  │ │   OCI     │ │  OpenAI   │              │
│       │  Claude     │ │  GenAI    │ │  GPT-4    │              │
│       │  (Coding)   │ │(Enterprise)│ │(Fallback) │              │
│       └─────────────┘ └───────────┘ └───────────┘              │
│                             │                                    │
│                             ▼                                    │
│                    ┌────────────────┐                           │
│                    │ Your Enterprise│                           │
│                    │     Data       │                           │
│                    │ (Stays in OCI) │                           │
│                    └────────────────┘                           │
│                                                                  │
│  USE CASES:                                                      │
│  • Claude: Complex coding, general tasks                        │
│  • OCI GenAI: Enterprise data queries, compliance-critical      │
│  • OpenAI: Specific tasks where GPT excels                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Module 5: Enterprise Patterns (3 hours)

### RAG with OCI GenAI

```python
# RAG Pipeline with OCI AI Services
import oci
from oci.generative_ai_inference import GenerativeAiInferenceClient

# 1. Create embeddings for your documents
def create_embeddings(documents):
    embed_client = GenerativeAiInferenceClient(config)

    response = embed_client.embed_text(
        embed_text_details=EmbedTextDetails(
            inputs=documents,
            serving_mode=OnDemandServingMode(
                model_id="cohere.embed-english-v3.0"
            ),
            compartment_id=compartment_id
        )
    )
    return response.data.embeddings

# 2. Store in OCI OpenSearch or Vector DB

# 3. Query with context
def query_with_rag(question, context_docs):
    prompt = f"""Based on the following context, answer the question.

Context:
{context_docs}

Question: {question}

Answer:"""

    response = genai_client.generate_text(
        generate_text_details=GenerateTextDetails(
            serving_mode=OnDemandServingMode(
                model_id="cohere.command-r-plus"
            ),
            inference_request=CohereLlmInferenceRequest(
                prompt=prompt,
                max_tokens=1000
            ),
            compartment_id=compartment_id
        )
    )
    return response.data.generated_text
```

### Guardrails and Safety

```python
# Implement guardrails for enterprise use
class EnterpriseGuardrails:
    def __init__(self):
        self.blocked_topics = ["competitors", "legal_advice"]
        self.pii_patterns = [r"\b\d{3}-\d{2}-\d{4}\b"]  # SSN

    def pre_filter(self, prompt):
        # Check for blocked topics
        for topic in self.blocked_topics:
            if topic in prompt.lower():
                return False, f"Blocked topic: {topic}"
        return True, None

    def post_filter(self, response):
        # Remove any PII from response
        import re
        for pattern in self.pii_patterns:
            response = re.sub(pattern, "[REDACTED]", response)
        return response
```

---

## Decision Framework

### When to Use What

```
┌─────────────────────────────────────────────────────────────────┐
│                    DECISION FLOWCHART                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Does data contain PII/PHI/sensitive info?                      │
│  │                                                               │
│  ├── YES ──> Must data stay in specific region?                 │
│  │           │                                                   │
│  │           ├── YES ──> OCI Dedicated AI Cluster               │
│  │           │                                                   │
│  │           └── NO ──> OCI GenAI Service (shared)              │
│  │                                                               │
│  └── NO ──> Is consistent latency critical?                     │
│             │                                                    │
│             ├── YES ──> OCI Dedicated AI Cluster                │
│             │                                                    │
│             └── NO ──> Need latest model capabilities?          │
│                        │                                         │
│                        ├── YES ──> Public APIs (Claude/GPT)     │
│                        │                                         │
│                        └── NO ──> OCI GenAI Service             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Cost Comparison

| Scenario | Public API | OCI GenAI | Dedicated Cluster |
|----------|------------|-----------|-------------------|
| 1M tokens/month | ~$50 | ~$30 | Overkill |
| 100M tokens/month | ~$5,000 | ~$2,500 | ~$3,000 |
| 1B tokens/month | ~$50,000 | ~$20,000 | ~$15,000 |
| + Fine-tuning needed | N/A | Limited | Full support |
| + Data sovereignty | N/A | Yes | Yes (isolated) |

---

## Labs

### Lab 1: OCI GenAI API Basics
Set up and call OCI GenAI Service

### Lab 2: Build Enterprise RAG
Create a RAG pipeline with OCI services

### Lab 3: Connect to Coding Agent
Build MCP server for OCI GenAI

### Lab 4: Implement Guardrails
Add safety filters for enterprise use

---

## Resources

- [OCI GenAI Documentation](https://docs.oracle.com/en-us/iaas/Content/generative-ai/home.htm)
- [OCI AI Services](https://www.oracle.com/artificial-intelligence/)
- [FrankX Oracle Integration Guide](https://frankx.ai/oracle-genai)

---

*This workshop is part of the FrankX Enterprise AI series, helping architects make informed decisions about AI infrastructure.*
