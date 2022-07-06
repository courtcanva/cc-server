# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build
RUN npm run migrate-up
# The server listens at PORT 8080
EXPOSE 8080

# Start the server using the production build
CMD ["node", "dist/src/main"]

