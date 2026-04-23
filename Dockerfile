# Stage 1: build
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: production
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app .

ENV NODE_ENV=production

EXPOSE 3005

CMD ["node", "app.js"]