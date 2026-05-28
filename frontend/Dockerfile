# ─── Stage 1: Build ───────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json primeiro para cachear dependências
COPY package*.json ./
RUN npm ci

# Copia o código fonte e compila para produção
COPY . .
RUN npm run build -- --configuration production

# ─── Stage 2: Runtime ─────────────────────────────────────────────
FROM nginx:alpine

# Remove a config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a config customizada
COPY nginx.conf /etc/nginx/conf.d/

# Copia o build do Angular para o diretório do Nginx
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
