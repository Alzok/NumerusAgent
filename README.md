# NumerusAgent - Gestionnaire d'Agents IA

![Project Status](https://img.shields.io/badge/status-en%20développement-yellow)

Application web pour manager une équipe d'agents IA, développée avec Nuxt 3 et Vue 3, et conteneurisée avec Docker. L'interface utilisateur vise un style pixel art rétro SF et intégrera des éléments interactifs.

Ce projet suit un plan de développement détaillé disponible dans `todo.md`.

## Objectif Général

Créer une interface web permettant de :

- Visualiser et organiser des agents IA (prédéfinis et personnalisés).
- Configurer les tâches des agents (modèles, prompts, services connectés).
- Gérer les clés API nécessaires.
- Interagir avec les agents via une interface ludique (style "sandbox" pixel art).

## Stack Technique Principale

- **Frontend Framework :** [Nuxt 3](https://nuxt.com/)
- **UI Framework :** [Vuetify 3](https://vuetifyjs.com/)
- **Langage :** TypeScript
- **Conteneurisation :** Docker, Docker Compose
- **Qualité du Code :** ESLint, Prettier, Husky, lint-staged
- **Backend (Initial) :** Nuxt 3 Server Engine

## Statut Actuel

- **Phase 1 : Initialisation et Configuration de Base** - Terminé ✅
  - Projet Nuxt 3 initialisé.
  - Environnement Docker et Docker Compose configuré pour le développement.
  - Outils de qualité du code (ESLint, Prettier, Husky, lint-staged) intégrés.
  - Framework UI Vuetify 3 ajouté et configuré.
- **Phase 2 : Développement Frontend** - À venir ⏳
- **Phase 3 : Développement Backend et Intégration** - À venir ⏳
- **Phase 4 : Améliorations et Fonctionnalités Futures** - À venir ⏳

## Démarrage Rapide (Développement)

L'environnement de développement principal repose sur Docker.

**Prérequis :**

- [Docker](https://docs.docker.com/get-docker/) et Docker Compose (généralement inclus avec Docker Desktop)
- Node.js et npm/pnpm/yarn (optionnel, principalement pour gérer `package.json` localement si besoin)

**Lancement :**

1.  Clonez ce dépôt (si ce n'est pas déjà fait).
2.  Ouvrez un terminal à la racine du projet.
3.  Construisez et démarrez les conteneurs Docker :

    ```bash
    docker-compose up --build
    ```

    (Utilisez `docker compose up --build` si votre version de Compose l'exige).

4.  Une fois le build terminé et le serveur Nuxt démarré (surveillez les logs dans le terminal), l'application sera accessible à l'adresse :
    **[http://localhost:3000](http://localhost:3000)**

**Arrêt :**

Pour arrêter les conteneurs :

```bash
docker-compose down
```

Pour arrêter les conteneurs ET supprimer les volumes associés (utile pour repartir d'un état propre) :

```bash
docker-compose down -v
```

## Qualité du Code

- **Linting & Formatage :** ESLint et Prettier sont configurés.
- **Pre-commit Hooks :** Husky et lint-staged sont configurés pour vérifier et formater automatiquement le code avant chaque commit.

## Liens Utiles

- [Documentation Nuxt 3](https://nuxt.com/docs)
- [Documentation Vuetify 3](https://vuetifyjs.com/en/introduction/getting-started/)
- [Documentation Docker](https://docs.docker.com/)
- [Icônes Material Design (utilisées par Vuetify)](https://pictogrammers.com/library/mdi/)

---

_(Ce README sera mis à jour au fur et à mesure de l'avancement du projet)_
