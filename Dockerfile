# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia todo el contenido del repositorio al contenedor
COPY . .

# Establece el directorio de trabajo en el directorio 'backend'
WORKDIR /app/backend

# Instala las dependencias del backend
RUN npm install

# Expone el puerto (ajusta si es necesario)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
