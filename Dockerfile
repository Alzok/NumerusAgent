# Use a Node.js LTS version
FROM node:20-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Nuxt port
EXPOSE 3000

# Set the default command to run the development server
# We bind to 0.0.0.0 to make it accessible from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 