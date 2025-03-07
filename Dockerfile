# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia todos los archivos al contenedor
COPY . .

# Establece el directorio de trabajo en backend
WORKDIR /app/backend

# Instala las dependencias del backend
RUN npm install

# Exponer el puerto si es necesario (por defecto 3000)
EXPOSE 3000

# Ejecuta la aplicación
CMD ["npm", "start"]
