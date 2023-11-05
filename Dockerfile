# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .



# Build the React app
# RUN npm run build

# Expose port 8001
EXPOSE 8001

# Start the application
CMD ["node", "server.js"]