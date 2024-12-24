# Stage 1: Set up the Backend
FROM node:18 AS backend

# Set working directory for backend
WORKDIR /app/backend

# Copy backend package.json and package-lock.json
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Install concurrently to run both frontend and backend
RUN npm install -g concurrently

# Copy backend source code
COPY backend/ .

# Expose backend port
EXPOSE 4001

# Stage 2: Set up the Frontend in Development Mode
FROM node:18-alpine AS frontend

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ .

# Expose frontend port for development (Vite default port)
EXPOSE 5173

# Stage 3: Combine both frontend and backend
FROM node:18 AS app

# Set working directory for the combined app
WORKDIR /app

# Copy the frontend and backend from their respective stages
COPY --from=frontend /app/frontend /app/frontend
COPY --from=backend /app/backend /app/backend

# Expose the ports for both frontend and backend
EXPOSE 5173 4001

# Install concurrently to run both frontend and backend
RUN npm install -g concurrently

# Command to run both frontend and backend concurrently
CMD ["concurrently", "\"npm run dev --prefix /app/frontend\"", "\"npm start --prefix /app/backend\""]
