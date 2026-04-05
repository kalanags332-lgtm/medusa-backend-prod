FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install native dependencies needed for Medusa
RUN apk add --no-cache python3 make g++ 

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci --include=dev

# Copy project files
COPY . .

# Build the Medusa project
RUN npm run build

# Start the Medusa backend
CMD ["npm", "run", "start"]
