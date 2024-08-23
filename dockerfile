FROM node:20-alpine AS builder
COPY . /app
WORKDIR /app
RUN npm ci && npm run build

FROM node:20-alpine
COPY --from=builder /app/dist /app
COPY package*.json /app/
WORKDIR /app
RUN npm ci --omit=dev
ENTRYPOINT ["node", "main.js"]