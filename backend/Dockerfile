# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code to the container
COPY . .

# Expose the port your backend uses
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "dev"]