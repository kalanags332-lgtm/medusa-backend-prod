FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++ 
COPY package*.json ./
RUN yarn install --network-timeout 1000000
COPY . .
RUN yarn build
CMD ["yarn", "start"]
