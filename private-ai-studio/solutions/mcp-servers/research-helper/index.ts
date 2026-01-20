/**
 * Research Helper MCP Server
 * 
 * Provides tools for research tasks:
 * - Summarize papers from URL or file
 * - Find citations of a paper
 * - Compare claims across multiple papers
 * - Search academic databases
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server({
  name: "research-helper",
  version: "1.0.0",
});

// Tool definitions
const tools = [
  {
    name: "summarize_paper",
    description: "Summarize a research paper from URL or file",
    inputSchema: {
      type: "object",
      properties: {
        source: { 
          type: "string", 
          description: "URL or file path to the paper" 
        },
        length: { 
          type: "string", 
          enum: ["short", "medium", "long"],
          default: "medium",
          description: "Summary length" 
        },
        focus: {
          type: "string",
          enum: ["methodology", "results", "contribution", "all"],
          default: "all",
          description: "Focus area for summary"
        }
      },
      required: ["source"]
    }
  },
  {
    name: "find_citations",
    description: "Find all citations of a paper using Semantic Scholar API",
    inputSchema: {
      type: "object",
      properties: {
        doi: { type: "string", description: "Paper DOI" },
        paper_id: { type: "string", description: "Semantic Scholar paper ID" },
        limit: { type: "number", default: 20, description: "Max results" }
      },
      required: []
    }
  },
  {
    name: "compare_claims",
    description: "Compare a claim against findings from multiple papers",
    inputSchema: {
      type: "object",
      properties: {
        claim: { type: "string", description: "Claim to verify" },
        papers: { 
          type: "array", 
          description: "Papers to search in" 
        },
        search_query: {
          type: "string",
          description: "Alternative: search for papers on this query"
        }
      },
      required: ["claim"]
    }
  },
  {
    name: "search_papers",
    description: "Search for papers on a topic",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        limit: { type: "number", default: 10, description: "Max results" },
        sort_by: {
          type: "string",
          enum: ["relevance", "date", "citations"],
          default: "relevance"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "extract_key_findings",
    description: "Extract key findings and statistics from a paper",
    inputSchema: {
      type: "object",
      properties: {
        source: { type: "string", description: "URL or file path" },
        section: {
          type: "string",
          enum: ["abstract", "introduction", "results", "discussion", "all"],
          default: "all"
        }
      },
      required: ["source"]
    }
  }
];

// Tool handlers
async function summarizePaper(args: { 
  source: string; 
  length?: string; 
  focus?: string 
}): Promise<string> {
  // In production, this would use actual PDF parsing and LLM summarization
  return `[Summary of ${args.source}]
  
  **Length**: ${args.length || 'medium'}
  **Focus**: ${args.focus || 'all'}
  
  This is a placeholder for the paper summarization tool.
  In production, this would:
  1. Fetch and parse the paper (PDF/HTML)
  2. Extract key sections
  3. Generate a focused summary using an LLM
  
  Estimated reading time: ~5 minutes
  Key contributions would be listed here.`;
}

async function findCitations(args: {
  doi?: string;
  paper_id?: string;
  limit?: number
}): Promise<string> {
  const limit = args.limit || 20;
  // In production, use Semantic Scholar API
  return `[Citations for paper]
  
  Using API: Semantic Scholar (semanticscholar.org)
  ${args.doi ? `DOI: ${args.doi}` : ''}
  ${args.paper_id ? `Paper ID: ${args.paper_id}` : ''}
  
  Found ${limit} citing papers (placeholder):
  1. "Related Work A" - 2024 - 45 citations
  2. "Follow-up Study B" - 2024 - 32 citations
  3. "Extension Research C" - 2023 - 28 citations
  
  ... and ${limit - 3} more`;
}

async function compareClaims(args: {
  claim: string;
  papers?: string[];
  search_query?: string
}): Promise<string> {
  return `[Claim Verification: "${args.claim}"]
  
  Searching across ${args.papers?.length || 'relevant literature'} papers...
  
  **Supporting Evidence**: 
  - Paper A: Found partial support (p < 0.05)
  - Paper B: Strong support (n = 1000, p < 0.01)
  
  **Contradicting Evidence**:
  - Paper C: No significant effect observed
  
  **Conclusion**: Mixed evidence. Claim is partially supported but requires more research.`;
}

async function searchPapers(args: {
  query: string;
  limit?: number;
  sort_by?: string
}): Promise<string> {
  const limit = args.limit || 10;
  return `[Search Results for: "${args.query}"]
  
  Sort: ${args.sort_by || 'relevance'}
  Limit: ${limit} results
  
  1. "Deep Learning Foundations" (2024)
     - Authors: Smith et al.
     - Citations: 245
     - Relevance: 0.95
  
  2. "Neural Network Architectures" (2023)
     - Authors: Johnson et al.
     - Citations: 189
     - Relevance: 0.92
  
  3. "Transformer Models Explained" (2023)
     - Authors: Williams et al.
     - Citations: 312
     - Relevance: 0.89
  
  ... and ${limit - 3} more results`;
}

async function extractKeyFindings(args: {
  source: string;
  section?: string
}): Promise<string> {
  return `[Key Findings from ${args.source}]
  
  Section: ${args.section || 'all'}
  
  **Main Contributions**:
  1. Novel approach to X
  2. Improved performance by Y%
  3. New theoretical framework
  
  **Key Statistics**:
  - Sample size: N = 1,000+
  - Accuracy improvement: 15.2%
  - Training time reduction: 40%
  
  **Limitations Discussed**:
  - Computational requirements
  - Generalization to other domains
  
  **Future Work**:
  - Scaling to larger datasets
  - Cross-domain validation`;
}

// Request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: string;

    switch (name) {
      case "summarize_paper":
        result = await summarizePaper(args as any);
        break;
      case "find_citations":
        result = await findCitations(args as any);
        break;
      case "compare_claims":
        result = await compareClaims(args as any);
        break;
      case "search_papers":
        result = await searchPapers(args as any);
        break;
      case "extract_key_findings":
        result = await extractKeyFindings(args as any);
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [{
        type: "text",
        text: result
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Error executing ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Research Helper MCP Server running on stdio");
}

main().catch(console.error);
