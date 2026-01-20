# Module 3: Infrastructure
**Shared Services, Monitoring, and DevOps**

*Part of GenCreator Labs by Frank*

---

## 🎯 What You'll Learn

- Deploy a unified Docker infrastructure for both studios
- Configure Traefik reverse proxy with automatic HTTPS
- Set up Qdrant vector database for RAG
- Implement monitoring and logging
- Design backup and recovery strategies
- Build GPU-optimized deployments

---

## 📁 Module Structure

```
03-infrastructure/
├── README.md                      # This file
├── 01-docker-stack/               # Core services
├── 02-model-serving/              # Ollama, vLLM
├── 03-monitoring/                 # Prometheus, Grafana
└── 04-backup-recovery/            # Backup strategies
```

---

## 🐳 Docker Compose Stack

### Main Configuration

```yaml
# docker/docker-compose.yml
version: '3.8'

services:
  # ==================== REVERSE PROXY ====================
  traefik:
    image: traefik:v3.0
    container_name: traefik
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.email=${LETSENCRYPT_EMAIL}"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik/letsencrypt:/letsencrypt
    labels:
      - "traefik.enable=true"
    networks:
      - ai-network

  # ==================== VECTOR DATABASE ====================
  qdrant:
    image: qdrant/qdrant:v1.7.0
    container_name: qdrant
    volumes:
      - qdrant_data:/qdrant/storage
    ports:
      - "6333:6333"
      - "6334:6334"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.qdrant.rule=Host(`qdrant.${DOMAIN}`)"
    networks:
      - ai-network

  # ==================== MODEL SERVING ====================
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    volumes:
      - ollama_models:/root/.ollama
    ports:
      - "11434:11434"
    environment:
      - OLLAMA_NUM_PARALLEL=2
      - OLLAMA_KEEP_ALIVE=24h
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.ollama.rule=Host(`ollama.${DOMAIN}`)"
    networks:
      - ai-network

  # ==================== RESEARCH STUDIO ====================
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: openwebui
    depends_on:
      - ollama
    volumes:
      - openwebui_data:/app/backend/data
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
      - WEBUI_SECRET_KEY=${WEBUI_SECRET_KEY}
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.openwebui.rule=Host(`ai.${DOMAIN}`)"
      - "traefik.http.routers.openwebui.tls.certresolver=letsencrypt"
    networks:
      - ai-network

  # ==================== CREATION STUDIO ====================
  comfyui:
    image: comfyanonymous/comfyui:latest
    container_name: comfyui
    volumes:
      - comfyui_output:/home/user/comfyui/output
      - comfyui_workflows:/home/user/comfyui/userworkflows
      - ./comfyui/custom_nodes:/home/user/comfyui/custom_nodes
    ports:
      - "8188:8188"
    environment:
      - COMFYUI_PORT=8188
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.comfyui.rule=Host(`create.${DOMAIN}`)"
      - "traefik.http.routers.comfyui.tls.certresolver=letsencrypt"
    networks:
      - ai-network

  lobechat:
    image: lobehub/lobe-chat:latest
    container_name: lobechat
    depends_on:
      - comfyui
    volumes:
      - ./lobechat/.env.production.local:/app/.env.production.local
    ports:
      - "3210:3210"
    environment:
      - OPENAI_PROXY_URL=http://comfyui:8000/v1
      - OPENAI_API_KEY=sk-placeholder
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.lobechat.rule=Host(`chat.${DOMAIN}`)"
      - "traefik.http.routers.lobechat.tls.certresolver=letsencrypt"
    networks:
      - ai-network

  # ==================== AUTOMATION ====================
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    volumes:
      - n8n_data:/home/node/.n8n
      - ./n8n/local_files:/files
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - WEBHOOK_URL=https://automate.${DOMAIN}/
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.n8n.rule=Host(`automate.${DOMAIN}`)"
      - "traefik.http.routers.n8n.tls.certresolver=letsencrypt"
    networks:
      - ai-network

  # ==================== MONITORING ====================
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.prometheus.rule=Host(`monitor.${DOMAIN}`)"
    networks:
      - ai-network

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    depends_on:
      - prometheus
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.grafana.rule=Host(`monitor.${DOMAIN}`)"
      - "traefik.http.routers.grafana.tls.certresolver=letsencrypt"
    networks:
      - ai-network

# ==================== VOLUMES ====================
volumes:
  qdrant_data:
  ollama_models:
  openwebui_data:
  comfyui_output:
  comfyui_workflows:
  n8n_data:
  prometheus_data:
  grafana_data:

# ==================== NETWORKS ====================
networks:
  ai-network:
    driver: bridge
```

### Environment Variables

```bash
# docker/.env.example
DOMAIN=yourdomain.com
LETSENCRYPT_EMAIL=you@example.com

# Security
WEBUI_SECRET_KEY=$(openssl rand -hex 32)
N8N_PASSWORD=$(openssl rand -hex 16)
GRAFANA_PASSWORD=$(openssl rand -hex 16)

# API Keys (for cloud services)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
SUNO_API_KEY=...
ELEVENLABS_API_KEY=...

# GPU Settings (optional)
NVIDIA_VISIBLE_DEVICES=all
```

---

## 📊 Monitoring Setup

### Prometheus Configuration

```yaml
# docker/monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: []

scrape_configs:
  # OpenWebUI Metrics
  - job_name: 'openwebui'
    static_configs:
      - targets: ['openwebui:3000']
    metrics_path: /metrics

  # Ollama Metrics
  - job_name: 'ollama'
    static_configs:
      - targets: ['ollama:11434']
    metrics_path: /api/metrics

  # Qdrant Metrics
  - job_name: 'qdrant'
    static_configs:
      - targets: ['qdrant:6333']
    metrics_path: /metrics

  # Docker Metrics
  - job_name: 'docker'
    static_configs:
      - targets: ['localhost:9323']

  # Node Exporter
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
```

### Grafana Dashboards

```json
{
  "dashboard": {
    "title": "AI Studio Overview",
    "panels": [
      {
        "title": "GPU Utilization",
        "type": "graph",
        "targets": [
          {
            "expr": "nvidia_gpu_utilization{gpu=~\'.*\'}",
            "legendFormat": "{{gpu}}"
          }
        ]
      },
      {
        "title": "Memory Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "ollama_memory_used_bytes / 1024 / 1024 / 1024",
            "legendFormat": "OLLAMA (GB)"
          }
        ]
      },
      {
        "title": "RAG Query Latency",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(rag_query_duration_bucket[5m]))",
            "legendFormat": "P95"
          },
          {
            "expr": "histogram_quantile(0.50, rate(rag_query_duration_bucket[5m]))",
            "legendFormat": "P50"
          }
        ]
      },
      {
        "title": "Generation Count",
        "type": "stat",
        "targets": [
          {
            "expr": "increase(comfyui_generation_total[1h])",
            "legendFormat": "Last Hour"
          }
        ]
      }
    ]
  }
}
```

---

## 💾 Backup Strategy

### Backup Script

```bash
#!/bin/bash
# docker/backup.sh

BACKUP_DIR="./backups/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"

echo "Starting backup at $(date)"

# Backup Volumes
echo "→ Backing up Qdrant..."
docker run --rm -v qdrant_data:/data -v "$BACKUP_DIR":/backup \
  alpine tar czf /backup/qdrant.tar.gz -C /data .
echo "  Saved to $BACKUP_DIR/qdrant.tar.gz"

echo "→ Backing up Ollama models..."
docker run --rm -v ollama_models:/data -v "$BACKUP_DIR":/backup \
  alpine tar czf /backup/ollama.tar.gz -C /data .
echo "  Saved to $BACKUP_DIR/ollama.tar.gz"

echo "→ Backing up OpenWebUI..."
docker run --rm -v openwebui_data:/data -v "$BACKUP_DIR":/backup \
  alpine tar czf /backup/openwebui.tar.gz -C /data .
echo "  Saved to $BACKUP_DIR/openwebui.tar.gz"

echo "→ Backing up ComfyUI workflows..."
docker run --rm -v comfyui_workflows:/data -v "$BACKUP_DIR":/backup \
  alpine tar czf /backup/comfyui-workflows.tar.gz -C /data .
echo "  Saved to $BACKUP_DIR/comfyui-workflows.tar.gz"

# Backup Docker configs
echo "→ Backing up configurations..."
cp docker-compose.yml "$BACKUP_DIR/"
cp -r docker/traefik "$BACKUP_DIR/"
cp -r docker/monitoring "$BACKUP_DIR/"
cp -r docker/.env "$BACKUP_DIR/"

# Create manifest
cat > "$BACKUP_DIR/manifest.json" << EOF
{
  "date": "$(date -Iseconds)",
  "volumes": ["qdrant", "ollama_models", "openwebui_data", "comfyui_workflows"],
  "config_files": ["docker-compose.yml", "traefik", "monitoring", ".env"]
}
EOF

echo "→ Backup complete: $BACKUP_DIR"
echo "Size: $(du -sh "$BACKUP_DIR" | cut -f1)"
```

### Restore Script

```bash
#!/bin/bash
# docker/restore.sh

BACKUP_DIR=$1

if [ -z "$BACKUP_DIR" ]; then
  echo "Usage: $0 <backup-directory>"
  exit 1
fi

echo "Restoring from $BACKUP_DIR"

# Stop services
docker compose down

# Restore volumes
for vol in qdrant ollama_models openwebui_data comfyui_workflows; do
  if [ -f "$BACKUP_DIR/${vol}.tar.gz" ]; then
    echo "→ Restoring $vol..."
    docker run --rm -v ${vol}_data:/data -v "$BACKUP_DIR":/backup \
      alpine sh -c "rm -rf /data/* && tar xzf /backup/${vol}.tar.gz -C /data"
  fi
done

# Restore configs
echo "→ Restoring configurations..."
cp "$BACKUP_DIR/docker-compose.yml" docker/
cp -r "$BACKUP_DIR/traefik" docker/
cp -r "$BACKUP_DIR/monitoring" docker/
cp "$BACKUP_DIR/.env" docker/

# Restart services
echo "→ Restarting services..."
docker compose up -d

echo "Restore complete!"
```

---

## 🔒 Security Best Practices

### Network Security

```yaml
# docker/traefik/traefik.yml
global:
  checkNewVersion: false
  sendAnonymousUsage: false

api:
  dashboard: true
  insecure: false  # Secure the dashboard

entryPoints:
  web:
    address: :80
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: :443
    http:
      tls:
        certresolver: letsencrypt

providers:
  docker:
    network: ai-network
    exposedbydefault: false
    watch: true

# Rate limiting
http:
  middlewares:
    rate-limit:
      rateLimit:
        average: 100
        burst: 200
```

### Authentication

```yaml
# Protect services with basic auth
labels:
  - "traefik.http.middlewares.auth.basicauth.users=admin:$$apr1$$H6uskkkW$$IgXLP6ewTrSuBkTrqE8jw/"
```

---

## 🚀 Deployment Commands

```bash
# First time setup
cd docker
cp .env.example .env
# Edit .env with your settings

# Start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Update services
docker compose pull
docker compose up -d

# Stop all services
docker compose down

# Complete reset (WARNING: deletes all data)
docker compose down -v
docker compose up -d
```

---

## 📚 Next Steps

**[→ Lab Overview](../README.md)**

---

*Part of [GenCreator Labs](https://frankx.ai/gencreator) by Frank*
