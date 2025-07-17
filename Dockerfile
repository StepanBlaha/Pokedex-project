FROM node:18

# Backend setup
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

# Frontend setup
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .

# Expose ports (Railway only exposes one port, so backend should listen on 0.0.0.0:PORT env variable)
EXPOSE 3000
EXPOSE 5000

# Run both backend and frontend concurrently
WORKDIR /app

# Use 'concurrently' package to run both at the same time (install globally)
RUN npm install -g concurrently

CMD concurrently "cd backend && npm run dev" "cd frontend && npm run start"