# Use a Node.js image
FROM node:22

# Create and set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app files into the container
COPY . .

# Expose ports for Metro and Expo
EXPOSE 8081 19000

