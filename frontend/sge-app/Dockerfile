# Usa una imagen base de Node.js para construir el proyecto
FROM node:18 AS build

ENV PORT 80
ENV NODE_ENV production

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el código fuente del frontend
COPY . .

# Construye el proyecto para producción
RUN npm run build

# Usa una imagen base de Nginx para servir el contenido estático
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto donde corre el frontend
EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ejecuta Nginx
CMD ["nginx", "-g", "daemon off;"]
