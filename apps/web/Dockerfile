FROM node:lts-alpine AS base

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo

COPY . .
RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN npm i

COPY --from=builder /app/out/full .
RUN npm run build -- --filter=web

FROM nginx:stable-alpine AS production

COPY --from=installer /app/apps/web/build /usr/share/nginx/html

COPY --from=builder /app/out/full/apps/web/nginx.conf.template /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
