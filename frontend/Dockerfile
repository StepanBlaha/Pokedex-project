# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY . .

# Expose the port your frontend dev server uses (usually 3000)
EXPOSE 3000

# Start the frontend dev server
CMD ["npm", "start"]