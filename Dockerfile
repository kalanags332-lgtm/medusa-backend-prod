FROM node:20-slim

WORKDIR /app

# Copy pre-built output and package files
COPY .medusa/server/package.json .medusa/server/package-lock.json* ./
COPY .medusa/server ./

# Install only production dependencies (fast, no dev deps)
RUN npm install --omit=dev --no-audit --no-fund

# Enforce production mode and bind to all external interfaces
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Run migrations then start using the local package script
CMD npx medusa db:migrate && npm run start
