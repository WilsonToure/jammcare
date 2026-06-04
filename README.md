# JammCare Rural — Starter monorepo

Ceci est un squelette initial pour JammCare Rural en local avec MySQL (Prisma).

Principaux dossiers:
- api/  -> backend Node + Express + Prisma (MySQL)
- web/  -> frontend React + Vite + TypeScript + Tailwind (design tokens)

Quickstart (développement):
1. Copier `.env.example` dans `api/.env` et remplir `DATABASE_URL` (ex: mysql://root:rootpassword@localhost:3306/jammcare)
2. docker-compose up --build
   - MySQL exposé sur 3306
   - API sur 4000
   - Frontend Vite sur 5173
3. Dans le container api ou localement: `npx prisma generate` puis `npx prisma db push` pour créer le schéma.

Générer le zip final:
- Sur GitHub: bouton Code -> Download ZIP
- Ou localement: `git archive --format zip --output jammcare.zip HEAD`

Notes:
- Ce scaffold est volontairement minimal pour permettre un démarrage rapide. Il contient des routes d'exemple, le schéma Prisma adapté à MySQL, et une configuration Docker Compose.
- Remplacez les secrets dans `api/.env` avant mise en production.
