FROM --platform=linux/amd64 node:20-alpine AS build

WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm i --frozen-lockfile
RUN pnpm run build



FROM --platform=linux/amd64 node:20-alpine AS deploy

WORKDIR /app

COPY --from=build /app/dist .
# COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js"]