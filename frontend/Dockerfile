# Step 1: Build the React app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve with a static file server
FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build
CMD ["serve", "-s", "build", "-l", "3000"]