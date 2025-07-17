FROM node:18

WORKDIR /app

# Copy both frontend and backend
COPY frontend ./frontend
COPY backend ./backend

# Install backend deps
WORKDIR /app/backend
RUN npm install

# Install frontend deps
WORKDIR /app/frontend
RUN npm install

# Build frontend if needed
# RUN npm run build --prefix frontend

# Expose ports if necessary
EXPOSE 3000
EXPOSE 5000

# Start both (you may need to install concurrently globally)
RUN npm install -g concurrently

CMD concurrently "npm run dev --prefix backend" "npm run start --prefix frontend"