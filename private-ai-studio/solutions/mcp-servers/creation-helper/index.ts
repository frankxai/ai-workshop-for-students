/**
 * Creation Helper MCP Server
 * 
 * Provides tools for AI creation tasks:
 * - Generate ComfyUI workflows programmatically
 * - Queue and monitor image generations
 * - Manage workflow templates
 * - Audio/video generation coordination
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server({
  name: "creation-helper",
  version: "1.0.0",
});

// ComfyUI API endpoint (configured via environment)
const COMFYUI_URL = process.env.COMFYUI_URL || "http://comfyui:8000";

// Tool definitions
const tools = [
  {
    name: "generate_image",
    description: "Generate an image using FLUX.1 or SDXL via ComfyUI",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string", description: "Positive prompt" },
        negative_prompt: { type: "string", description: "Negative prompt" },
        model: { type: "string", default: "flux.1-dev", description: "Model to use" },
        width: { type: "number", default: 1024, description: "Image width" },
        height: { type: "number", default: 1024, description: "Image height" },
        steps: { type: "number", default: 25, description: "Sampling steps" },
        cfg: { type: "number", default: 7.0, description: "CFG scale" }
      },
      required: ["prompt"]
    }
  },
  {
    name: "queue_workflow",
    description: "Queue a ComfyUI workflow from JSON template",
    inputSchema: {
      type: "object",
      properties: {
        workflow_name: { type: "string", description: "Name of saved workflow" },
        workflow_json: { type: "object", description: "Direct workflow JSON" },
        parameters: { type: "object", description: "Parameters to override" }
      },
      required: []
    }
  },
  {
    name: "list_workflows",
    description: "List available ComfyUI workflow templates",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "get_generation_status",
    description: "Check status of a queued generation",
    inputSchema: {
      type: "object",
      properties: {
        prompt_id: { type: "string", description: "Prompt ID from queue" }
      },
      required: ["prompt_id"]
    }
  },
  {
    name: "get_images",
    description: "Retrieve generated images",
    inputSchema: {
      type: "object",
      properties: {
        prompt_id: { type: "string", description: "Prompt ID" },
        filename: { type: "string", description: "Specific filename" }
      },
      required: ["prompt_id"]
    }
  },
  {
    name: "list_models",
    description: "List available models in ComfyUI",
    inputSchema: {
      type: "object",
      properties: {
        type: { 
          type: "string", 
          enum: ["checkpoints", "loras", "controlnet", "all"],
          default: "all"
        }
      }
    }
  },
  {
    name: "generate_video",
    description: "Generate video using AnimateDiff or SVD",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string", description: "Video prompt" },
        model: { 
          type: "string", 
          enum: ["animatediff", "svd", "stable-video"],
          default: "animatediff"
        },
        frames: { type: "number", default: 25, description: "Frame count" },
        fps: { type: "number", default: 24, description: "Frames per second" }
      },
      required: ["prompt"]
    }
  }
];

// Pre-defined workflow templates
const workflowTemplates: Record<string, object> = {
  "flux-dev": {
    class_type: "FluxDevLoader",
    inputs: { name: "flux.1-dev", weight_dtype: "fp16" }
  },
  "flux-schnell": {
    class_type: "FluxSchnellLoader",
    inputs: { name: "flux.1-schnell", weight_dtype: "fp16" }
  },
  "sdxl-base": {
    class_type: "CheckpointLoaderSimple",
    inputs: { ckpt_name: "sdxl_base.safetensors" }
  }
};

// Helper function to call ComfyUI API
async function callComfyUI(endpoint: string, data?: object): Promise<any> {
  try {
    const response = await fetch(`${COMFYUI_URL}${endpoint}`, {
      method: data ? "POST" : "GET",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined
    });
    return await response.json();
  } catch (error) {
    throw new Error(`ComfyUI API error: ${error}`);
  }
}

// Tool handlers
async function generateImage(args: {
  prompt: string;
  negative_prompt?: string;
  model?: string;
  width?: number;
  height?: number;
  steps?: number;
  cfg?: number;
}): Promise<string> {
  const workflow = {
    "3": {
      class_type: "CLIPTextEncode",
      inputs: {
        text: args.prompt,
        clip: ["4", 0]
      }
    },
    "4": {
      class_type: args.model?.includes("flux") ? "FluxDevLoader" : "CheckpointLoaderSimple",
      inputs: args.model?.includes("flux")
        ? { name: args.model, weight_dtype: "fp16" }
        : { ckpt_name: args.model || "flux.1-dev.safetensors" }
    },
    "5": args.negative_prompt ? {
      class_type: "CLIPTextEncode",
      inputs: {
        text: args.negative_prompt,
        clip: ["4", 0]
      }
    } : undefined,
    "6": {
      class_type: "KSampler",
      inputs: {
        steps: args.steps || 25,
        cfg: args.cfg || 7.0,
        sampler_name: "euler",
        scheduler: "simple",
        denoise: 1.0,
        model: ["4", 0],
        positive: ["3", 0],
        negative: args.negative_prompt ? ["5", 0] : ["4", 0],
        latent_image: ["8", 0]
      }
    },
    "8": {
      class_type: "EmptyLatentImage",
      inputs: {
        width: args.width || 1024,
        height: args.height || 1024,
        batch_size: 1
      }
    },
    "9": {
      class_type: "VAEDecode",
      inputs: {
        samples: ["6", 0],
        vae: ["4", 2]
      }
    },
    "10": {
      class_type: "SaveImage",
      inputs: {
        filename_prefix: "MCP_Generated",
        images: ["9", 0]
      }
    }
  };

  const result = await callComfyUI("/api/prompt", {
    prompt: workflow,
    client_id: "mcp-server"
  });

  return `[Image Generation Queued]
  
  Prompt: ${args.prompt}
  Model: ${args.model || "flux.1-dev"}
  Size: ${args.width || 1024}x${args.height || 1024}
  Steps: ${args.steps || 25}
  CFG: ${args.cfg || 7.0}
  
  Prompt ID: ${result.prompt_id}
  
  Check status with: get_generation_status(prompt_id="${result.prompt_id}")`;
}

async function queueWorkflow(args: {
  workflow_name?: string;
  workflow_json?: object;
  parameters?: object;
}): Promise<string> {
  const workflow = args.workflow_json || workflowTemplates[args.workflow_name || ""];
  
  if (!workflow) {
    return `[Error] Unknown workflow: ${args.workflow_name}`;
  }

  // Merge parameters if provided
  const mergedWorkflow = args.parameters
    ? { ...workflow, ...args.parameters }
    : workflow;

  const result = await callComfyUI("/api/prompt", {
    prompt: mergedWorkflow,
    client_id: "mcp-server"
  });

  return `[Workflow Queued]
  
  Workflow: ${args.workflow_name || "custom"}
  Prompt ID: ${result.prompt_id}`;
}

async function listWorkflows(): Promise<string> {
  const workflows = Object.keys(workflowTemplates);
  return `[Available Workflow Templates]
  
  ${workflows.map((w, i) => `${i + 1}. ${w}`).join("\n")}
  
  Total: ${workflows.length} templates
  
  Use: queue_workflow(workflow_name="<name>")`;
}

async function getGenerationStatus(args: { prompt_id: string }): Promise<string> {
  const result = await callComfyUI(`/api/history/${args.prompt_id}`);
  const status = result[args.prompt_id]?.status || "pending";
  
  return `[Generation Status]
  
  Prompt ID: ${args.prompt_id}
  Status: ${status}
  
  ${status === "completed" ? "Images ready for retrieval" : "Still processing..."}`;
}

async function getImages(args: { prompt_id: string; filename?: string }): Promise<string> {
  const result = await callComfyUI(`/api/history/${args.prompt_id}`);
  const outputs = result[args.prompt_id]?.outputs || {};
  
  const images = Object.values(outputs).flatMap((output: any) => 
    output.images?.map((img: any) => ({
      filename: img.filename,
      type: img.type,
      subfolder: img.subfolder
    })) || []
  );

  return `[Generated Images]
  
  ${images.length} images found:
  
  ${images.map((img, i) => 
    `${i + 1}. ${img.filename}\n` +
    `   Type: ${img.type}\n` +
    `   Subfolder: ${img.subfolder || "root"}\n` +
    `   URL: ${COMFYUI_URL}/api/view?filename=${img.filename}&type=${img.type}&subfolder=${img.subfolder || ""}`
  ).join("\n\n")}
  
  Use: Get images via API or download from ComfyUI interface`;
}

async function listModels(args: { type?: string }): Promise<string> {
  const models = await callComfyUI("/api/model");
  const type = args.type || "all";
  
  return `[Available Models]
  
  Type: ${type}
  
  Checkpoints:
  ${models.checkpoints?.join("\n") || "Loading..."}
  
  Loras:
  ${models.loras?.join("\n") || "Loading..."}
  
  ControlNet:
  ${models.controlnet?.join("\n") || "Loading..."}`;
}

async function generateVideo(args: {
  prompt: string;
  model?: string;
  frames?: number;
  fps?: number;
}): Promise<string> {
  return `[Video Generation Queued]
  
  Prompt: ${args.prompt}
  Model: ${args.model || "animatediff"}
  Frames: ${args.frames || 25}
  FPS: ${args.fps || 24}
  
  Note: Video generation requires AnimateDiff or SVD nodes.
  This is a placeholder for the video generation workflow.
  
  For production, configure:
  1. AnimateDiffLoader node
  2. VideoCombine node
  3. Appropriate model (animatediff-motion-lora)`;
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
      case "generate_image":
        result = await generateImage(args as any);
        break;
      case "queue_workflow":
        result = await queueWorkflow(args as any);
        break;
      case "list_workflows":
        result = await listWorkflows();
        break;
      case "get_generation_status":
        result = await getGenerationStatus(args as any);
        break;
      case "get_images":
        result = await getImages(args as any);
        break;
      case "list_models":
        result = await listModels(args as any);
        break;
      case "generate_video":
        result = await generateVideo(args as any);
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
  console.log("Creation Helper MCP Server running on stdio");
}

main().catch(console.error);
