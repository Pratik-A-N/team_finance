# Containerization & VPS deploy

This repository is set up to build both the Vite client and the Express server into a single production image.

Quick steps (build on your VPS or CI):

1. Build the image locally on the VPS:

```bash
docker build -t team-finance:latest .
```

2. Run with Docker:

```bash
docker run -d --name team-finance -p 5000:5000 \
  -e NODE_ENV=production \
  -e PORT=5000 \
  --restart unless-stopped \
  team-finance:latest
```

Or use docker-compose:

```bash
docker-compose up -d --build
```

Notes:
- The build step runs `npm run build` which uses `vite` to produce the client into `dist/public` and `esbuild` to bundle the server into `dist/index.cjs`.
- The runtime image only installs production dependencies and runs `node dist/index.cjs`.
- Set environment variables (database URL, session secret, etc.) in the Docker run command or via a Compose `.env` file.

Recommended VPS flow:
- SSH into your VPS.
- Clone repository or copy project files.
- Install Docker and Docker Compose on the VPS.
- Build and run using the commands above.

If you prefer separate containers (reverse-proxy, separate frontend), I can add an Nginx service and a small change to output client static into a separate image.
