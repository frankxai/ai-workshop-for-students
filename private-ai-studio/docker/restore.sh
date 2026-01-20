#!/bin/bash
# Private AI Studio Restore Script
# Usage: ./restore.sh <backup-directory> [--volumes | --configs | --all]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VOLUMES=(qdrant_data ollama_models openwebui_data comfyui_workflows n8n_data prometheus_data grafana_data)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Parse arguments
BACKUP_DIR="$1"
RESTORE_ALL=true
RESTORE_VOLUMES=false
RESTORE_CONFIGS=false

shift
while [[ $# -gt 0 ]]; do
    case $1 in
        --volumes)
            RESTORE_VOLUMES=true
            RESTORE_ALL=false
            shift
            ;;
        --configs)
            RESTORE_CONFIGS=true
            RESTORE_ALL=false
            shift
            ;;
        *)
            shift
            ;;
    esac
done

if [ -z "$BACKUP_DIR" ]; then
    echo "Usage: $0 <backup-directory> [--volumes | --configs | --all]"
    echo ""
    echo "Available backups:"
    ls -la "${SCRIPT_DIR}/backups/" 2>/dev/null || echo "  No backups found in ${SCRIPT_DIR}/backups/"
    exit 1
fi

if [ ! -d "$BACKUP_DIR" ]; then
    log_error "Backup directory not found: $BACKUP_DIR"
    exit 1
fi

log_info "==========================================="
log_info "PRIVATE AI STUDIO RESTORE"
log_info "==========================================="
log_info "Backup directory: $BACKUP_DIR"
log_info ""

# Confirm before proceeding
log_warn "This will STOP all running services and OVERWRITE existing data!"
read -p "Do you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    log_info "Restore cancelled"
    exit 0
fi

# Stop services
log_info "Stopping services..."
cd "$SCRIPT_DIR"
docker compose down 2>/dev/null || true
log_info "  → Services stopped"

# Restore volumes
restore_volume() {
    local vol_name=$1
    local filename="${vol_name}.tar.gz"
    local backup_file="$BACKUP_DIR/$filename"
    
    if [ -f "$backup_file" ]; then
        log_info "Restoring volume: $vol_name"
        
        # Check if volume exists
        if ! docker volume inspect "$vol_name" >/dev/null 2>&1; then
            log_info "  → Creating volume: $vol_name"
            docker volume create "$vol_name" >/dev/null
        fi
        
        # Clear existing data and restore
        docker run --rm \
            -v "${vol_name}:/data" \
            -v "$BACKUP_DIR:/backup:ro" \
            alpine:latest \
            sh -c "rm -rf /data/* && tar xzf /backup/${filename} -C /data"
        
        local size=$(du -h "$backup_file" | cut -f1)
        log_info "  → Restored: $filename ($size)"
    else
        log_warn "  → Backup file not found: $filename"
    fi
}

# Restore configurations
restore_configs() {
    log_info "Restoring configurations..."
    
    if [ -f "$BACKUP_DIR/docker-compose.yml" ]; then
        cp "$BACKUP_DIR/docker-compose.yml" "$SCRIPT_DIR/"
        log_info "  → docker-compose.yml restored"
    fi
    
    if [ -f "$BACKUP_DIR/.env.example" ]; then
        cp "$BACKUP_DIR/.env.example" "$SCRIPT_DIR/.env"
        log_info "  → .env restored (from .env.example)"
    fi
    
    if [ -d "$BACKUP_DIR/traefik" ]; then
        rm -rf "$SCRIPT_DIR/traefik" 2>/dev/null || true
        cp -r "$BACKUP_DIR/traefik" "$SCRIPT_DIR/"
        log_info "  → traefik configuration restored"
    fi
    
    if [ -d "$BACKUP_DIR/monitoring" ]; then
        rm -rf "$SCRIPT_DIR/monitoring" 2>/dev/null || true
        cp -r "$BACKUP_DIR/monitoring" "$SCRIPT_DIR/"
        log_info "  → monitoring configuration restored"
    fi
}

# Main restore
if [ "$RESTORE_ALL" = true ] || [ "$RESTORE_VOLUMES" = true ]; then
    log_info "Restoring volumes..."
    for vol in "${VOLUMES[@]}"; do
        restore_volume "$vol"
    done
fi

if [ "$RESTORE_ALL" = true ] || [ "$RESTORE_CONFIGS" = true ]; then
    restore_configs
fi

# Restart services
log_info "Starting services..."
docker compose up -d

# Wait for services to be ready
log_info "Waiting for services to be ready..."
sleep 10

# Check status
log_info ""
log_info "Service Status:"
docker compose ps

log_info ""
log_info "==========================================="
log_info "Restore Complete!"
log_info "==========================================="
log_info ""
log_info "Next Steps:"
log_info "1. Verify services: docker compose ps"
log_info "2. Check logs: docker compose logs -f"
log_info "3. Test interfaces:"
log_info "   - OpenWebUI: http://localhost:3000"
log_info "   - ComfyUI: http://localhost:8188"
log_info "   - LobeChat: http://localhost:3210"
log_info "   - n8n: http://localhost:5678"
log_info "==========================================="
