# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the remaining app files to the container
COPY . .

# Build the app
RUN npm run build

# Serve the app on port 80
EXPOSE 3000

# Start the app
CMD ["npm","run", "dev"]