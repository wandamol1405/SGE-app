# Usamos una imagen base de Node.js
FROM node:18

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos todo el contenido del repositorio
COPY . .

# Verificamos si la carpeta backend está dentro del contenedor
RUN ls -la /app/backend

# Establecemos el directorio de trabajo a /app/backend
WORKDIR /app/backend

# Instalamos las dependencias de backend
RUN npm install

# Exponemos el puerto que usará la app
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
