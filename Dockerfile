FROM node:20-alpine AS builder
WORKDIR /app

# Install build-time deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the repository and build (this runs both client and server builds)
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package.json package-lock.json* ./
RUN npm ci --production

# Copy build artifacts from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/index.cjs"]
