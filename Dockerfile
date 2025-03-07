# Usa una imagen base
FROM node:18

# Define el directorio de trabajo
WORKDIR /app

# Copia todos los archivos del proyecto a /app
COPY . /app

# Instala dependencias
RUN npm ci

# Establece el comando de inicio
CMD ["npm", "start"]
