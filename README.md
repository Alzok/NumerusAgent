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

## État Actuel et Prochaines Étapes (YYYY-MM-DD)

Le projet intègre maintenant Nuxt 3, Vuetify 3, et Pinia pour la gestion d'état.

**Fonctionnalités Implémentées Récemment:**

*   **Agents Drag & Drop:** Les agents peuvent être glissés depuis le `LeftPanel` et déposés dans le `MainWorkspace`. Leur position initiale est calculée correctement et ils utilisent un `workspaceId` unique.
*   **Animation des Agents:** Les agents se déplacent de manière aléatoire dans l'espace de travail (logique de base implémentée).
*   **Sélection et Détails:** Cliquer sur un agent dans l'espace de travail le sélectionne et affiche ses détails (Nom, Modèle IA) dans le `RightPanel` via le store Pinia.
*   **Gestion des Tâches (UI + Store):**
    *   Le store `agentStore` gère une propriété `task` pour chaque `WorkspaceAgent`.
    *   Le `RightPanel` permet d'ouvrir un modal (`TaskModal`) pour "Créer Tâche" ou "Éditer Tâche" (si une tâche existe).
    *   Le `TaskModal` se pré-remplit en mode édition.
    *   La sauvegarde depuis le modal met à jour la tâche de l'agent sélectionné dans le store.
*   **Authentification (UI):** Des pages et un layout (`/login`, `/register`, `layouts/auth.vue`) ont été créés pour la connexion/inscription (sans logique backend).

**Problèmes Corrigés Récemment:**

*   Erreurs de type/linter suite à la réinstallation des dépendances.
*   Erreurs lors du dépôt du premier agent dans `MainWorkspace` (calcul des coordonnées, accès aux refs DOM via `$el`).
*   Utilisation incohérente des ID (`id` vs `workspaceId`) corrigée.

**Prochaine Étape Principale:**

1.  **Pré-édition des Agents depuis `LeftPanel`:**
    *   Ajouter un bouton/icône "Éditer" à chaque agent dans `LeftPanel.vue`.
    *   Définir la logique pour que cliquer sur ce bouton "sélectionne" l'agent *avant* le drop, permettant de voir/modifier ses détails/tâche dans `RightPanel`.
    *   Clarifier comment cette "pré-sélection" interagit avec le drag & drop standard.

**Autres Tâches Potentielles:**

*   Implémenter la logique backend pour l'authentification.
*   Affiner la logique de déplacement des agents.
*   Connecter la sélection du modèle IA et des services dans `TaskModal` à une logique réelle.
*   Persistance de l'état des agents (localStorage, backend...).

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
