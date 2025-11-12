FROM node:20-alpine AS base

# Install dependencies for potential future use (Ghostscript, qpdf)
# Currently not used, but available for advanced PDF operations
RUN apk add --no-cache \
    ghostscript \
    qpdf

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.12.0

# Install dependencies
FROM base AS deps
COPY . .
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Production stage
FROM base AS runner
ENV NODE_ENV=production

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Create tmp directory
RUN mkdir -p /app/tmp

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "dist/index.js"]
