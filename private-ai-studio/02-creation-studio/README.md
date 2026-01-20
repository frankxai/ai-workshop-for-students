# Module 2: Creation Studio
**Build Your Visual AI Production Environment**

*Part of GenCreator Labs by Frank*

---

## 🎯 What You'll Learn

- Deploy ComfyUI for node-based visual workflows
- Integrate LobeChat for multimodal creation with TTS/STT
- Connect FLUX and Stable Diffusion for image generation
- Build reusable workflow templates
- Set up API access for programmatic generation
- Create video and audio generation pipelines

---

## 📁 Module Structure

```
02-creation-studio/
├── README.md                      # This file
├── 01-comfyui-deployment/         # ComfyUI setup
├── 02-lobechat-integration/       # LobeChat + ComfyUI
├── 03-image-workflows/            # FLUX, SDXL workflows
└── 04-video-audio-pipelines/      # Video and audio generation
```

---

## 🛠️ Deployment Options

### Option A: ComfyUI Only

```bash
# GPU-enabled (NVIDIA)
docker run -d --name comfyui \
  -p 8188:8188 \
  -v comfyui:/home/user/comfyui \
  --gpus all \
  comfyanonymous/comfyui:latest

# Access: http://localhost:8188
```

### Option B: Full Creation Stack

```bash
cd docker
docker compose -f docker-compose.creation.yml up -d
```

**Services**:
- ComfyUI (port 8188) - Visual workflow editor
- LobeChat (port 3210) - Chat interface with TTS/STT
- Automatic1111 (port 7860) - SD WebUI alternative
- FLUX API (port 8000) - FLUX.1 generation API

---

## 🎨 ComfyUI Workflows

### Understanding the Node Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMFYUI NODE ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│  │   Load Checkpoint    │    │   CLIP Text    │    │   KSampler  │        │
│  │   (Model)            │    │   (Prompt)     │    │   (Sampling)│        │
│  └────────┬────────┘    └───────┬───────┘    └──────┬────────┘        │
│           │                     │                    │                 │
│           └─────────────────────┼────────────────────┘                 │
│                                 │                                      │
│                                 ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │                     DATA FLOW                                 │   │
│  │                                                                │   │
│  │   CLIP Tokenizer ──────► Encode Prompts ──────► Sample       │   │
│  │        ▲                                        │            │   │
│  │        │                                        ▼            │   │
│  │   Positive Prompt                    ┌─────────────────┐      │   │
│  │   Negative Prompt                    │  VAE Decode     │      │   │
│  │                                      └────────┬────────┘      │   │
│  │                                               │               │   │
│  │                                               ▼               │   │
│  │                                      ┌─────────────────┐      │   │
│  │                                      │  Save Image     │      │   │
│  │                                      └─────────────────┘      │   │
│  │                                                                │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Essential Workflow Templates

#### FLUX.1 Dev Workflow

```json
{
  "nodes": [
    {
      "class_type": "FluxDevLoader",
      "inputs": {
        "name": "flux.1-dev",
        "weight_dtype": "fp16"
      }
    },
    {
      "class_type": "CLIPTextEncode",
      "inputs": {
        "text": "Cinematic photograph of a lone wolf at sunset, dramatic lighting, 8k resolution, detailed fur, epic composition",
        "clip": ["FluxDevLoader", 0]
      }
    },
    {
      "class_type": "CLIPTextEncode",
      "inputs": {
        "text": "blurry, low quality, distorted, deformed, ugly, disfigured",
        "clip": ["FluxDevLoader", 0]
      }
    },
    {
      "class_type": "SamplerCustomAdvanced",
      "inputs": {
        "noise": ["BasicGuider", 0],
        " guider": ["FluxGuidance", 0],
        "sampler": ["SamplerScheduler", 0],
        "sigmas": ["SigmaScheduler", 0],
        "latent_image": ["EmptyLatentImage", 0]
      }
    },
    {
      "class_type": "VAEDecode",
      "inputs": {
        "samples": ["SamplerCustomAdvanced", 0],
        "vae": ["FluxDevLoader", 2]
      }
    },
    {
      "class_type": "SaveImage",
      "inputs": {
        "filename_prefix": "FLUX/",
        "images": ["VAEDecode", 0]
      }
    }
  ]
}
```

#### FLUX.1 Schnell (Fast Generation)

```
Use for: Rapid prototyping, quick iterations
Steps: 4-8
Guidance: 3.0-5.0
Speed: ~2 seconds on 20GB VRAM
```

#### FLUX.1 Dev (High Quality)

```
Use for: Final outputs, detailed compositions
Steps: 20-50
Guidance: 7.0-10.0
Speed: ~15 seconds on 20GB VRAM
```

### Image-to-Image Workflow

```
INPUT IMAGE
     │
     ▼
┌─────────────────┐
│ Load Image      │ ← Upload your reference
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Resize/Scale    │────►│ CLIP Text Encode│
└────────┬────────┘     └─────────────────┘
         │                      │
         │                      ▼
         │              ┌─────────────────┐
         │              │ KSampler        │
         │              │ • Denoise: 0.7  │
         │              │ • Steps: 20     │
         └──────────────►│ • Scheduler:    │
                        │   karras        │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ Save Image      │
                        └─────────────────┘
```

### ControlNet Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                 CONTROLNET WORKFLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  REFERENCE IMAGE           PROMPT                                │
│       │                        │                                 │
│       ▼                        ▼                                 │
│  ┌──────────┐          ┌──────────────┐                         │
│  │ Load     │          │ CLIP Text    │                         │
│  │ Image    │          │ Encode       │                         │
│  └────┬─────┘          └──────┬───────┘                         │
│       │                       │                                 │
│       ▼                       │                                 │
│  ┌──────────┐                 │                                 │
│  │ Control  │◄────────────────┘                                 │
│  │ Net      │                                                  │
│  │ (Canny/  │                                                  │
│  │  Depth/  │                                                  │
│  │  Pose)   │                                                  │
│  └────┬─────┘                                                  │
│       │                                                        │
│       ▼                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      KSampler                           │   │
│  │                                                         │   │
│  │  • Control Net Weight: 0.8-1.0                          │   │
│  │  • Control Net Start: 0.0-0.3                           │   │
│  │  • Control Net End: 0.6-1.0                             │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│       │                                                        │
│       ▼                                                        │
│  ┌──────────┐                                                  │
│  │ Save     │                                                  │
│  │ Image    │                                                  │
│  └──────────┘                                                  │
│                                                                  │
│  USE CASES:                                                     │
│  • Canny: Preserve composition from reference                   │
│  • Depth: Maintain spatial structure                            │
│  • Pose: Transfer human poses                                   │
│  • SoftEdge: Flexible line guidance                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎙️ LobeChat Integration

### ComfyUI + LobeChat Setup

```yaml
# docker/docker-compose.creation.yml (partial)
lobechat:
  image: lobehub/lobe-chat:latest
  ports:
    - "3210:3210"
  environment:
    # OpenAI-compatible endpoint for ComfyUI API
    OPENAI_API_KEY: "sk-placeholder"
    OPENAI_PROXY_URL: "http://comfyui:8000/v1"
    # ComfyUI Image Generation
    IMAGE_GENERATION_API_KEY: "sk-placeholder"
    IMAGE_GENERATION_PROXY_URL: "http://comfyui:8000/image/generate"
    # TTS Settings
    NEXT_TTS_SERVICE: "openai"
    OPENAI_TTS_API_KEY: "${OPENAI_API_KEY}"
    NEXT_TTS_OPENAI_MODEL: "tts-1"
  volumes:
    - ./lobechat/.env.production.local:/app/.env.production.local
```

### LobeChat Plugins for Creation

| Plugin | Purpose | Installation |
|--------|---------|--------------|
| ComfyUI Workflow | Direct workflow execution | Plugin Store |
| Midjourney | Bridge to Midjourney | Plugin Store |
| DALL-E 3 | Alternative image gen | Built-in |
| Suno | Music generation | Plugin Store |
| Code Runner | Execute generation code | Plugin Store |

### Voice Settings (TTS/STT)

```yaml
# LobeChat Environment Variables
NEXT_TTS_SERVICE: "openai"  # or: microsoft, edge-tts,ElevenLabs
OPENAI_TTS_API_KEY: "${OPENAI_API_KEY}"
NEXT_TTS_OPENAI_MODEL: "tts-1"
NEXT_TTS_OPENAI_VOICE: "alloy"
NEXT_TTS_OPENAI_SPEED: 1.0

# Speech-to-Text
NEXT_STT_SERVICE: "openai"  # or: google, azure, whisper
OPENAI_WHISPER_API_KEY: "${OPENAI_API_KEY}"
```

---

## 🎬 Video Generation Pipeline

### ComfyUI Video Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                 VIDEO GENERATION PIPELINE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  IMAGE FRAMES                  AUDIO TRACK                      │
│       │                             │                           │
│       ▼                             ▼                           │
│  ┌─────────────┐             ┌─────────────┐                   │
│  │ Video       │             │ Audio       │                   │
│  │ Assembly    │◄────────────│ Sync        │                   │
│  │ (FPS, codec)│             │ (Lip sync?) │                   │
│  └──────┬──────┘             └─────────────┘                   │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────┐                                           │
│  │ Render      │                                           │
│  │ (H.264/AV1) │                                           │
│  └─────────────┘                                           │
│                                                                  │
│  TOOLS:                                                         │
│  • ComfyUI-VideoHelperSuite                                   │
│  • AnimateDiff for animation                                  │
│  • SVD (Stable Video Diffusion)                               │
│  • Frame Interpolation for slow-mo                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### AnimateDiff Setup

```json
{
  "nodes": [
    {
      "class_type": "AnimateDiffLoader",
      "inputs": {
        "model": "stable-video-diffusion-img2vid-xt-1-1",
        "context_length": 25,
        "context_overlap": 5
      }
    },
    {
      "class_type": "CLIPTextEncode",
      "inputs": {
        "text": "Cinematic camera movement, sunset over ocean, gentle waves, golden hour lighting",
        "clip": ["AnimateDiffLoader", 0]
      }
    },
    {
      "class_type": "LoadImage",
      "inputs": {
        "image": "input_frame_0001.png"
      }
    },
    {
      "class_type": "KSampler",
      "inputs": {
        "steps": 30,
        "cfg": 1.5,
        "sampler_name": "euler",
        "scheduler": "normal",
        "denoise": 0.65
      }
    },
    {
      "class_type": "VAEDecode",
      "inputs": {
        "samples": ["KSampler", 0],
        "vae": "auto"
      }
    },
    {
      "class_type": "VideoCombine",
      "inputs": {
        "frame_rate": 24,
        "format": "mp4",
        "images": ["VAEDecode", 0]
      }
    }
  ]
}
```

---

## 🎵 Audio Generation

### Suno via LobeChat

```yaml
# LobeChat Environment for Suno
SUNO_API_KEY: "${SUNO_API_KEY}"
SUNO_ORG_KEY: "${SUNO_ORG_KEY}"

# Prompt template for Suno in LobeChat
system_prompt: |
  When generating music prompts, use:
  1. Genre/Style: [e.g., Cinematic orchestral]
  2. Mood: [e.g., Powerful and uplifting]
  3. Instruments: [e.g., Soaring strings, epic brass]
  4. Production: [e.g., Wide stereo, film-quality]
  5. Intention: [e.g., Courage to pursue bold dreams]
  
  Example: "Cinematic orchestral, powerful and uplifting, with soaring strings, epic brass, thunderous drums, intention: courage to pursue bold dreams, building to dramatic crescendo"
```

### Voice Cloning Setup

```
AVAILABLE SERVICES:
• ElevenLabs: Best quality, voice cloning
• OpenAI TTS: Cost-effective, 6 voices
• Microsoft Edge TTS: Free, 400+ voices
• Coqui TTS: Open-source, local deployment
```

---

## 📡 API Configuration

### Expose ComfyUI as API

```python
# api/comfyui-client.py
import base64
import requests

class ComfyUIClient:
    def __init__(self, host="http://localhost:8000"):
        self.host = host
        self.client_id = "studio-client"
    
    def queue_prompt(self, workflow):
        """Submit a workflow for execution"""
        response = requests.post(
            f"{self.host}/api/prompt",
            json={"prompt": workflow, "client_id": self.client_id}
        )
        return response.json()
    
    def get_history(self, prompt_id):
        """Get execution history"""
        response = requests.get(f"{self.host}/api/history/{prompt_id}")
        return response.json()
    
    def get_image(self, filename, subfolder, folder_type):
        """Retrieve generated image"""
        response = requests.get(
            f"{self.host}/api/view",
            params={
                "filename": filename,
                "subfolder": subfolder,
                "type": folder_type
            }
        )
        return response.content
    
    def generate_image(self, prompt, negative=""):
        """Simple text-to-image generation"""
        workflow = {
            "3": {"inputs": {"text": prompt, "clip": ["4", 0]}},
            "4": {"inputs": {"ckpt_name": "flux.1-dev.safetensors"}},
            "5": {"inputs": {"text": negative, "clip": ["4", 0]}},
            "6": {"inputs": {"samples": ["7", 0], "vae": ["4", 2]}},
            "7": {"inputs": {"steps": 25, "cfg": 7.0, "sampler_name": "euler", 
                           "scheduler": "simple", "denoise": 1.0, "model": ["4", 0],
                           "positive": ["3", 0], "negative": ["5", 0],
                           "latent_image": ["8", 0]}},
            "8": {"inputs": {"width": 1024, "height": 1024, "batch_size": 1}},
            "9": {"inputs": {"filename_prefix": "API_Output/", "images": ["6", 0]}}
        }
        return self.queue_prompt(workflow)

# Usage
client = ComfyUIClient()
result = client.generate_image(
    "A cyberpunk city at night, neon lights, rain-slicked streets, 8k"
)
```

---

## 🚀 Quick Start

```bash
# Start Creation Studio
cd docker
docker compose -f docker-compose.creation.yml up -d

# Access:
# - ComfyUI: http://localhost:8188
# - LobeChat: http://localhost:3210

# In LobeChat:
# 1. Settings → Agents → Enable ComfyUI plugin
# 2. Configure API endpoint: http://comfyui:8000
# 3. Start generating!
```

---

## 📚 Next Steps

**[→ Module 3: Infrastructure →](../03-infrastructure/)**

---

*Part of [GenCreator Labs](https://frankx.ai/gencreator) by Frank*
