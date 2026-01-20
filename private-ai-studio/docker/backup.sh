#!/bin/bash
# Private AI Studio Backup Script
# Usage: ./backup.sh [--all | --volumes | --configs | --rotate]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${SCRIPT_DIR}/backups/$(date +%Y-%m-%d)"
VOLUMES=(qdrant_data ollama_models openwebui_data comfyui_workflows n8n_data prometheus_data grafana_data)
ROTATE_DAYS=30

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Parse arguments
BACKUP_ALL=true
BACKUP_VOLUMES=false
BACKUP_CONFIGS=false
ROTATE=true

while [[ $# -gt 0 ]]; do
    case $1 in
        --all)
            BACKUP_ALL=true
            BACKUP_VOLUMES=false
            BACKUP_CONFIGS=false
            shift
            ;;
        --volumes)
            BACKUP_VOLUMES=true
            BACKUP_ALL=false
            shift
            ;;
        --configs)
            BACKUP_CONFIGS=true
            BACKUP_ALL=false
            shift
            ;;
        --no-rotate)
            ROTATE=false
            shift
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

mkdir -p "$BACKUP_DIR"

log_info "Starting backup at $(date)"
log_info "Backup directory: $BACKUP_DIR"

# Backup volumes
backup_volume() {
    local vol_name=$1
    local container_name="backup-${vol_name}"
    local filename="${vol_name}.tar.gz"
    
    log_info "Backing up volume: $vol_name"
    
    # Check if volume exists
    if ! docker volume inspect "$vol_name" >/dev/null 2>&1; then
        log_warn "Volume $vol_name does not exist, skipping"
        return 0
    fi
    
    # Create backup using alpine container
    if docker run --rm \
        -v "${vol_name}:/data:ro" \
        -v "$BACKUP_DIR:/backup:rw" \
        alpine:latest \
        sh -c "tar czf /backup/${filename} -C /data ." 2>/dev/null; then
        
        local size=$(du -h "$BACKUP_DIR/$filename" | cut -f1)
        log_info "  → Saved: $filename ($size)"
    else
        log_warn "  → Failed to backup $vol_name"
    fi
}

# Backup configurations
backup_configs() {
    log_info "Backing up configurations..."
    
    cp "${SCRIPT_DIR}/docker-compose.yml" "$BACKUP_DIR/" 2>/dev/null || true
    cp "${SCRIPT_DIR}/.env" "$BACKUP_DIR/.env.example" 2>/dev/null || true
    
    # Backup traefik config
    if [ -d "${SCRIPT_DIR}/traefik" ]; then
        cp -r "${SCRIPT_DIR}/traefik" "$BACKUP_DIR/" 2>/dev/null || true
    fi
    
    # Backup monitoring config
    if [ -d "${SCRIPT_DIR}/monitoring" ]; then
        cp -r "${SCRIPT_DIR}/monitoring" "$BACKUP_DIR/" 2>/dev/null || true
    fi
    
    log_info "  → Configurations backed up"
}

# Create manifest
create_manifest() {
    local timestamp=$(date -Iseconds)
    local volumes_json=$(printf '"%s"' "${VOLUMES[@]}" | tr ' ' ',')
    
    cat > "$BACKUP_DIR/manifest.json" << EOF
{
  "timestamp": "${timestamp}",
  "volumes": [${volumes_json}],
  "docker_compose": "docker-compose.yml",
  "env_file": ".env.example",
  "traefik_config": $([ -d "${SCRIPT_DIR}/traefik" ] && echo "true" || echo "false"),
  "monitoring_config": $([ -d "${SCRIPT_DIR}/monitoring" ] && echo "true" || echo "false")
}
EOF
    
    log_info "  → Manifest created"
}

# Rotate old backups
rotate_backups() {
    if [ "$ROTATE" = true ]; then
        log_info "Rotating backups older than $ROTATE_DAYS days..."
        
        find "${SCRIPT_DIR}/backups" -maxdepth 1 -type d -name "????-??-??" -mtime +$ROTATE_DAYS -exec rm -rf {} \; 2>/dev/null || true
        
        log_info "  → Rotation complete"
    fi
}

# Generate summary
generate_summary() {
    local total_size=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1 || echo "0")
    local file_count=$(find "$BACKUP_DIR" -type f | wc -l)
    
    cat > "$BACKUP_DIR/backup_summary.txt" << EOF
===========================================
PRIVATE AI STUDIO BACKUP SUMMARY
===========================================

Date: $(date)
Backup Location: $BACKUP_DIR

Contents:
- Total Size: $total_size
- File Count: $file_count

Volumes Backed Up:
$(for vol in "${VOLUMES[@]}"; do echo "  - $vol"; done)

Configurations:
- docker-compose.yml
- .env (as .env.example)
$(ls -la "$BACKUP_DIR" 2>/dev/null | head -20)

===========================================
RESTORE INSTRUCTIONS:
===========================================

1. Stop services:
   cd ${SCRIPT_DIR}
   docker compose down

2. Restore volumes:
   docker run --rm -v ${VOLUMES[0]}_data:/data -v "$BACKUP_DIR":/backup alpine sh -c "rm -rf /data/* && tar xzf /backup/${VOLUMES[0]}.tar.gz -C /data"
   ... (repeat for each volume)

3. Restore configs:
   cp "$BACKUP_DIR/docker-compose.yml" ${SCRIPT_DIR}/
   cp "$BACKUP_DIR/.env.example" ${SCRIPT_DIR}/.env

4. Restart services:
   docker compose up -d

===========================================
EOF
    
    log_info "  → Summary saved to backup_summary.txt"
}

# Main execution
if [ "$BACKUP_ALL" = true ] || [ "$BACKUP_VOLUMES" = true ]; then
    for vol in "${VOLUMES[@]}"; do
        backup_volume "$vol"
    done
fi

if [ "$BACKUP_ALL" = true ] || [ "$BACKUP_CONFIGS" = true ]; then
    backup_configs
fi

create_manifest
generate_summary
rotate_backups

log_info ""
log_info "==========================================="
log_info "Backup Complete!"
log_info "==========================================="
log_info "Location: $BACKUP_DIR"
log_info "Total Size: $(du -sh "$BACKUP_DIR" | cut -f1)"
log_info "Files: $(find "$BACKUP_DIR" -type f | wc -l)"
log_info ""
log_info "Next Steps:"
log_info "1. Verify backup: ls -la $BACKUP_DIR"
log_info "2. Copy to external storage for redundancy"
log_info "3. Test restore periodically"
log_info "==========================================="
