FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Use npm ci for a clean, reproducible install
RUN npm ci

COPY . .

# Set NODE_ENV to production during build
ENV NODE_ENV=production

# Build the backend (admin is disabled so this is fast)
RUN npm run build

# Run migrations then start the server
CMD npx medusa db:migrate && npm start
