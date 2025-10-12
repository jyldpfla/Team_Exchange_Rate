# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# 패키지 먼저 복사 → 캐시 최적화
COPY package*.json ./
RUN npm ci --omit=dev

# 소스 복사 후 빌드
COPY . .
# Vite 빌드 (기본 명령: npm run build)
RUN npm run build

# ---------- Runtime (Nginx) ----------
FROM nginx:alpine
# 빌드 산출물 복사
COPY --from=build /app/dist /usr/share/nginx/html
# Nginx 프록시 설정
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# (선택) 헬스체크
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1/ || exit 1
