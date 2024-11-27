FROM node:lts-alpine AS base
RUN yarn global add turbo

FROM base AS resolver
WORKDIR /app
COPY . .
RUN turbo prune web-ssr --docker

FROM base AS dev-deps
WORKDIR /app
COPY --from=resolver /app/out/json/ .
RUN npm ci

FROM base AS prod-deps
WORKDIR /app
COPY --from=resolver /app/out/json/ .
RUN npm ci --omit=dev

FROM base AS builder
WORKDIR /app 
COPY --from=dev-deps /app/node_modules ./node_modules
COPY --from=resolver /app/out/full .
COPY --from=resolver /app/out/json .
RUN npm run build -- --filter=web-ssr

FROM base AS prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/apps/web-ssr/build ./build
COPY --from=builder /app/apps/web-ssr/entrypoint.sh .
RUN chmod +x entrypoint.sh
EXPOSE 3000
CMD ["/bin/sh", "entrypoint.sh"]
