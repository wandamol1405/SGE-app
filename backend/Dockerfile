# Usa una imagen base de Node.js
FROM node:18

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si los tienes)
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código del backend
COPY . .

# Expone el puerto donde corre tu backend
EXPOSE 5000

# Define el comando para iniciar el backend
CMD ["npm", "start"]

