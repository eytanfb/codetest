# Stage 1: Build the React application
FROM node:21 as build-stage

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* /app/

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . /app

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable

# Copy built assets from build-stage to Nginx server
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]

