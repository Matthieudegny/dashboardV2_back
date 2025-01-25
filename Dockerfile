# Utiliser une image Node.js comme base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port sur lequel l'application sera servie
EXPOSE 3000

# Commande pour lancer l'application
CMD ["node", "dist/main"]