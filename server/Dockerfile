
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install --production

COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose backend port
EXPOSE 9000

# Start server
CMD ["npm", "start"]
