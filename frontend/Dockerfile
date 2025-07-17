# Stage 1: Build React app
FROM node:18-alpine as builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve build
FROM node:18-alpine
WORKDIR /app
# Use a lighter HTTP server instead of serve (uses less memory)
RUN npm install -g http-server
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["http-server", "build", "-p", "3000"]