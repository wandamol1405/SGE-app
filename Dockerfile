# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./backend/

# Establece el directorio de trabajo en el directorio 'backend'
WORKDIR /app/backend

# Instala las dependencias del backend
RUN npm install

# Copia el resto del contenido del repositorio al contenedor
COPY . .

# Verifica si la carpeta 'backend' está en el contenedor
RUN ls -la /app

# Expone el puerto (ajusta si es necesario)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
