# Etapa 1: Build de l'aplicació Angular
FROM node:18-alpine AS build

# Directori de treball
WORKDIR /app

# Copiar fitxers de dependències
COPY package*.json ./

# Instal·lar dependències
RUN npm ci --only=production && npm cache clean --force

# Copiar el codi font
COPY . .

# Build de producció
RUN npm run build

# Etapa 2: Servir amb Nginx
FROM nginx:alpine

# Copiar configuració personalitzada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar els fitxers de build des de l'etapa anterior
COPY --from=build /app/dist/gimcana-app/browser /usr/share/nginx/html

# Exposar el port 80
EXPOSE 80

# Comando per iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
