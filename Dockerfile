FROM node:18-alpine AS deps

WORKDIR /app
COPY package*.json ./

# Installer toutes les dépendances (incluant dev) pour les tests
RUN npm ci

FROM node:18-alpine AS test
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Exécuter les tests pendant l'étape de build (échoue si les tests ne passent pas)
RUN npm test

FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./

# Installer uniquement les dépendances de production pour une image finale plus légère
RUN npm ci --only=production
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
