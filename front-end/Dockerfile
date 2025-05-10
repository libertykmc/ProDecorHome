# Dockerfile for React app
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Serve the app with a simple server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose port
EXPOSE 5000