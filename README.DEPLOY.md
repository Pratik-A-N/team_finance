Production deployment (VPS)
===========================

This file explains how to deploy the app to a VPS using Docker Compose, Postgres, and Caddy for TLS.

## Prerequisites

**On your VPS:**
- Ubuntu 22+ or similar Linux distro with SSH access
- Docker (v20+) and Docker Compose (v2) installed
- Ports 80 and 443 open in firewall (for HTTP/HTTPS)
- A domain name with an A record pointing to your VPS public IP
- (Optional) 2GB+ RAM, 10GB+ disk space

**Before you start:**
- Have your domain ready (e.g., `yourdomain.com`)
- Know your admin email (for TLS certificate notifications)
- Generate a strong database password and session secret

---

## Step-by-step VPS Setup

### 1. SSH into your VPS

```bash
ssh root@your_vps_ip_address
```

### 2. Install Docker and Docker Compose

If Docker is not installed, run:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group (optional, to avoid sudo)
sudo usermod -aG docker $USER
newgrp docker
```

Verify installation:
```bash
docker --version
docker compose version
```

### 3. Clone the repository

```bash
git clone https://github.com/your-org/Team-Finance.git
cd Team-Finance
```

### 4. Create production `.env.prod` file

Copy the example and fill in your own values:

```bash
cp .env.prod.example .env.prod
nano .env.prod
```

Edit with your settings (example):

```
POSTGRES_PASSWORD=SuperSecure123!@#
POSTGRES_DB=team_finance
SESSION_SECRET=aVeryLongRandomStringAtLeast32CharsLongForSecurity123456789
DOMAIN=yourdomain.com
EMAIL=admin@yourdomain.com
```

**Save and exit** (Ctrl+X, Y, Enter for nano)

### 5. Load environment variables and start the stack

```bash
set -a && source .env.prod && set +a
docker compose -f docker-compose.prod.yml up -d
```

This will:
- Pull the pre-built image from Docker Hub (`pratikan/team-finance:latest`)
- Start a Postgres database (`db`)
- Start the Node.js app (`app`)
- Start Caddy reverse proxy with TLS (`caddy`)

### 6. Verify the stack is running

```bash
docker compose -f docker-compose.prod.yml ps
```

You should see three containers: `db`, `app`, and `caddy` all with status `Up`.

Check logs:
```bash
docker compose -f docker-compose.prod.yml logs -f app
```

The app should log: `serving on port 5000`

### 7. Apply database migrations

Run drizzle-kit migrations to create tables:

**Option A: Build builder image on VPS and run migrations**

```bash
docker build --target builder -t team-finance-builder .
docker run --rm --network team-finance_default \
  -e DATABASE_URL="postgres://teamfin:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}" \
  team-finance-builder npx drizzle-kit push
```

**Option B: Run from external machine with VPS DB access**

If your VPS DB is accessible externally (port 5432), from your local machine:

```bash
# Set the remote database URL
export DATABASE_URL="postgres://teamfin:password@vps_ip:5432/team_finance"
npx drizzle-kit push
```

After migrations complete, you should see: `✔ Changes applied successfully`

### 8. (Optional) Import existing data from replit_dump.sql

Copy the dump file to the VPS:
```bash
scp replit_dump.sql root@your_vps_ip:/tmp/
```

Import into the DB:
```bash
docker compose -f docker-compose.prod.yml cp /tmp/replit_dump.sql db:/tmp/
docker compose -f docker-compose.prod.yml exec -it db psql -U teamfin -d ${POSTGRES_DB} -f /tmp/replit_dump.sql
docker compose -f docker-compose.prod.yml exec db rm /tmp/replit_dump.sql
```

### 9. Access the application

Open your browser and visit:
```
https://yourdomain.com
```

Caddy will automatically obtain a TLS certificate. Wait ~30 seconds for the first request.

If HTTPS shows a warning, the cert is still issuing — refresh after a minute.

If HTTP redirect fails, check Caddy logs:
```bash
docker compose -f docker-compose.prod.yml logs caddy
```

---

## Maintenance

### View logs
```bash
docker compose -f docker-compose.prod.yml logs -f app
docker compose -f docker-compose.prod.yml logs -f db
docker compose -f docker-compose.prod.yml logs -f caddy
```

### Stop the stack
```bash
docker compose -f docker-compose.prod.yml down
```

### Start the stack
```bash
cd Team-Finance
set -a && source .env.prod && set +a
docker compose -f docker-compose.prod.yml up -d
```

### Backup database
```bash
docker compose -f docker-compose.prod.yml exec db pg_dump -U teamfin ${POSTGRES_DB} > backup_$(date +%Y%m%d).sql
```

### Restore database from backup
```bash
docker compose -f docker-compose.prod.yml cp backup.sql db:/tmp/
docker compose -f docker-compose.prod.yml exec db psql -U teamfin ${POSTGRES_DB} < /tmp/backup.sql
```

### Update the app (pull new image)
```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

---

## Troubleshooting

**Caddy certificate not issuing:**
- Ensure ports 80/443 are open: `sudo ufw allow 80,443/tcp`
- Check DNS is pointing to VPS: `nslookup yourdomain.com`
- Check Caddy logs: `docker compose -f docker-compose.prod.yml logs caddy`

**Database connection error:**
- Verify `.env.prod` password matches `POSTGRES_PASSWORD`
- Check DB is healthy: `docker compose -f docker-compose.prod.yml ps`

**App not responding:**
- Check app logs: `docker compose -f docker-compose.prod.yml logs app`
- Verify database is running and healthy

---

## Security Notes

1. **Keep secrets safe:** Store `.env.prod` securely; don't commit to git.
2. **Use strong passwords:** Use `openssl rand -base64 32` to generate secrets.
3. **Firewall:** Only expose ports 80/443; restrict DB port (5432) to internal network.
4. **Regular backups:** Automate DB backups using cron or similar.
5. **HTTPS only:** Caddy redirects HTTP to HTTPS automatically.

---

Original quick reference (if you're familiar with Docker):

3. Start the stack (image is pre-built and on Docker Hub)

```bash
docker compose -f docker-compose.prod.yml up -d
```

4. Apply database migrations

The runtime image may not include migration tools. Use the builder stage to run `drizzle-kit` from the repo:

```bash
# build a temporary builder image (local)
docker build --target builder -t team-finance-builder .

# find the compose network name (usually <folder>_default)
# example: docker network ls

# run migrations from the builder container (replace NETWORK_NAME)
# ensure DATABASE_URL points to the internal db service
docker run --rm --network NETWORK_NAME \
  -e DATABASE_URL="postgres://teamfin:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}" \
  team-finance-builder npx drizzle-kit push
```

Alternatively you can run `drizzle-kit push` from a machine that has network access to the DB by setting `DATABASE_URL` accordingly.

5. (Optional) Restore data from `replit_dump.sql`

Copy the dump into the DB container and import it:

```bash
docker cp replit_dump.sql <db_container>:/tmp/replit_dump.sql
docker exec -it <db_container> psql -U teamfin -d ${POSTGRES_DB} -f /tmp/replit_dump.sql
docker exec -it <db_container> rm /tmp/replit_dump.sql
```

6. Verify

Open `https://{DOMAIN}` and confirm the app responds and logins/migrations worked.

Notes and security
- Set `SESSION_COOKIE_SECURE=true` (already set in `docker-compose.prod.yml`).
- Keep `SESSION_SECRET` and DB password secret — consider using Docker secrets or a secrets manager in production.
- If you prefer an alternate proxy, replace the `caddy` service; Caddy obtains TLS certs automatically when `DOMAIN` is set and ports 80/443 are open.

If you want, I can:
- prepare a small `systemd` unit to run `docker compose` on boot,
- build and push a release image to a registry for easier deployment,
- or perform the deploy on your VPS (you'd provide access).
