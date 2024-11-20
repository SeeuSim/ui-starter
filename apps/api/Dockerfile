FROM node:lts-alpine AS base

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune api --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN npm i
COPY --from=builder /app/out/full .
RUN npm run build -- --filter=api

FROM base AS production
WORKDIR /app
COPY --from=installer /app/apps/api/dist ./dist
COPY --from=builder /app/out/json/ .

RUN npm ci --omit=dev
EXPOSE 8000
CMD ["node", "dist/index.js"]
