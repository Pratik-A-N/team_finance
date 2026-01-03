#!/bin/bash
# team-finance VPS deployment script

set -e

echo "================================"
echo "Team Finance VPS Setup"
echo "================================"

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    echo "ERROR: .env.prod not found!"
    echo "Copy .env.prod.example to .env.prod and fill in your values."
    exit 1
fi

echo "Loading environment variables..."
set -a && source .env.prod && set +a

echo "Starting Docker Compose stack..."
docker compose -f docker-compose.prod.yml up -d

echo ""
echo "Waiting for database to be healthy..."
sleep 5

echo "Running database migrations..."
docker build --target builder -t team-finance-builder . > /dev/null 2>&1
docker run --rm --network $(basename $(pwd))_default \
  -e DATABASE_URL="postgres://teamfin:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}" \
  team-finance-builder npx drizzle-kit push

echo ""
echo "✓ Stack is running!"
echo ""
echo "Services:"
docker compose -f docker-compose.prod.yml ps
echo ""
echo "Next steps:"
echo "1. Wait 30-60 seconds for Caddy to obtain TLS certificate"
echo "2. Open: https://${DOMAIN}"
echo "3. Check logs: docker compose -f docker-compose.prod.yml logs -f"
echo ""
echo "To stop: docker compose -f docker-compose.prod.yml down"
echo "To view logs: docker compose -f docker-compose.prod.yml logs -f app"
