# syntax=docker/dockerfile:1

# ---------- Stage 1: build the static site ----------
FROM node:20-alpine AS build
WORKDIR /app

# Build-time settings. Vite inlines VITE_* values into the bundle, so they must be present at build time.
#   VITE_APP_URL   optional app host: "Open account" and "Log in" go there (unset: CTAs scroll to the lead form)
#   VITE_SITE_URL  optional public origin of this page, used for absolute Open Graph URLs
ARG VITE_APP_URL=""
ARG VITE_SITE_URL=""
ENV VITE_APP_URL=$VITE_APP_URL \
    VITE_SITE_URL=$VITE_SITE_URL

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- Stage 2: serve dist with nginx on port 80 ----------
FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# 127.0.0.1, not localhost: localhost can resolve to IPv6 ::1 while nginx listens on IPv4.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
