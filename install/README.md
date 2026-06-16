# Installation Guide — Bahmni Standard (Docker)

> Step-by-step guide to install Bahmni Standard on Windows using Docker Desktop with data stored on an external SSD.

## 📋 Prerequisites

| Requirement | Minimum | Recommended |
|---|---|---|
| **OS** | Windows 10 (21H2+) | Windows 11 |
| **RAM** | 8 GB | 16–24 GB |
| **CPU** | Quad-core x86_64 | 8-core |
| **Storage** | 20 GB free on SSD | 50+ GB free on SSD |
| **Software** | WSL2 enabled | WSL2 + Ubuntu installed |

## 🔧 Step 1: Install Docker Desktop

### 1.1 Download Docker Desktop

Download the installer from [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) or use PowerShell:

```powershell
Invoke-WebRequest -Uri "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe" `
  -OutFile "D:\Bahmni\DockerDesktopInstaller.exe"
```

### 1.2 Install to External SSD

To store Docker data on the external SSD instead of C:\, install with custom paths:

```cmd
# Run as Administrator
"D:\Bahmni\DockerDesktopInstaller.exe" install --accept-license ^
  --installation-dir="D:\Bahmni\Docker" ^
  --wsl-default-data-root="D:\Bahmni\Docker\wsl"
```

### 1.3 Configure Docker Desktop

After installation, open Docker Desktop and configure:

1. **Settings → General**: Ensure "Use the WSL 2 based engine" is checked
2. **Settings → Resources → Advanced**: Set memory limit to **8 GB** minimum
3. **Settings → Resources → WSL Integration**: Enable integration with your Ubuntu distribution

## 📦 Step 2: Clone Bahmni Docker Repository

```bash
cd D:\Bahmni
git clone https://github.com/Bahmni/bahmni-docker.git
cd bahmni-docker
```

## ⚙️ Step 3: Configure Bahmni Standard

Navigate to the standard distribution:

```bash
cd bahmni-standard
```

Edit the `.env` file:

```env
# Set timezone
TZ=Europe/Madrid

# Enable all standard profiles
COMPOSE_PROFILES=emr,elis,odoo,reports
```

## 🚀 Step 4: Start Bahmni

```bash
docker compose pull
docker compose up -d
```

**First startup takes 15–25 minutes** as all services initialize their databases.

Monitor progress:
```bash
docker compose logs -f
```

## ✅ Step 5: Verify Installation

### Check all containers are running:
```bash
docker compose ps
```

Expected services (Bahmni Standard):
- `proxy` (nginx reverse proxy)
- `bahmni-web` (EMR frontend)
- `openmrs` (OpenMRS backend)
- `openmrsdb` (MySQL for OpenMRS)
- `bahmni-config` (configuration)
- `odoo` (ERP/Pharmacy)
- `odoodb` (PostgreSQL for Odoo)
- `openelis` (Laboratory)
- `openelisdb` (PostgreSQL for OpenELIS)
- `reports` (Bahmni Reports)
- `reportsdb` (MySQL for Reports)

### Access the web interface:

| Service | URL | Credentials |
|---|---|---|
| **Bahmni EMR** | http://localhost/ | superman / Admin123 |
| **OpenMRS Admin** | http://localhost/openmrs/ | superman / Admin123 |
| **Odoo** | http://localhost:8069/ | admin / admin |

## 🛑 Step 6: Stop / Restart

```bash
# Stop all services
docker compose stop

# Start again
docker compose start

# Full reset (WARNING: deletes all data!)
docker compose down -v
```

## 🔍 Troubleshooting

### Containers fail to start (out of memory)
- Open Docker Desktop → Settings → Resources → increase memory to 8+ GB
- Restart Docker Desktop

### Port 80 already in use
- Check: `netstat -ano | findstr :80`
- Stop conflicting service or change Bahmni's port in docker-compose.yml

### OpenMRS takes very long to start
- Normal on first run (database initialization)
- Check logs: `docker compose logs -f openmrs`
- Wait for "Started OpenMRS" message

### External SSD disconnected
- Docker will lose access to all volumes
- Reconnect SSD and restart Docker Desktop
- Run `docker compose start` to resume

## 📊 Disk Usage Estimate

| Component | Estimated Size |
|---|---|
| Docker Desktop (engine) | ~2 GB |
| Bahmni Docker images | ~8-10 GB |
| Database volumes (empty) | ~2 GB |
| Database volumes (with data) | ~3-5 GB |
| **Total** | **~15-19 GB** |
