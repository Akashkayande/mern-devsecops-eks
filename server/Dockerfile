
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install --production

COPY . .

# Expose backend port
EXPOSE 9000

# Start server
CMD ["npm", "start"]
