FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ 

COPY package.json yarn.lock* ./

RUN yarn install --network-timeout 1000000

COPY . .

# Set NODE_ENV to production during build
ENV NODE_ENV=production

# Run build and check for admin directory
RUN yarn build

# Verify that the build actually succeeded
RUN ls -la .medusa/server/public/admin/index.html || (echo "ADMIN BUILD FAILED. Listing generated files:" && ls -R .medusa/server && exit 1)

CMD npx medusa db:migrate && yarn start

