# NumerusAgent

# Plan de Développement : Gestionnaire d'Agents IA

# Gestionnaire d'Agents IA - Plan de Développement

---

> ⚠️ **DIRECTIVES ESSENTIELLES POUR L'ASSISTANT IA** ⚠️
>
> Avant de commencer et tout au long du développement, veuillez impérativement respecter les principes suivants pour assurer la réussite et la qualité de ce projet :
>
> 1.  **Analyse Globale Préalable :**
>     - **Compréhension Complète :** Avant toute implémentation, analysez en profondeur l'intégralité de ce `README.md` (le plan de développement détaillé) **ET** le document `# Analyse et Suggestions d'Experts pour le Projet Gestionnaire d'Agents IA`. Il est crucial de bien saisir l'objectif global, l'architecture cible, les choix techniques et les points d'attention soulevés par les experts.
> 2.  **Exécution Méthodique et Séquentielle :**
>     - **Pas à Pas :** Procédez de manière **rigoureusement séquentielle**, en suivant le plan étape par étape et sous-tâche par sous-tâche. Ne vous précipitez pas et ne sautez pas d'étapes.
>     - **Cohérence :** Assurez-vous constamment que chaque ajout ou modification est **cohérent** avec les objectifs généraux, les phases précédentes et les choix d'architecture définis (y compris les suggestions des experts).
> 3.  **Auto-Vérification Systématique (Après CHAQUE Sous-Tâche) :**
>     - **Cycle de Validation :** Avant de considérer une sous-tâche comme terminée et de passer à la suivante, effectuez impérativement le cycle de vérification suivant :
>       - a. **Rappel du Besoin :** Quels étaient les objectifs spécifiques et les exigences précises de _cette_ sous-tâche (en se référant au plan et aux suggestions d'experts si pertinent) ?
>       - b. **Implémentation Réalisée :** Qu'est-ce qui a été concrètement codé, configuré ou modifié ?
>       - c. **Adéquation et Justification :** En quoi l'implémentation réalisée répond-elle _précisément_ aux besoins listés en (a) ? Expliquez brièvement la correspondance.
>       - d. **Correction Immédiate :** Si une divergence, une erreur ou une amélioration évidente est identifiée lors de cette vérification, **corrigez-la immédiatement** avant de poursuivre.
> 4.  **Qualité, Modernité et Performance :**
>     - **Excellence Technique :** Visez un code de **haute qualité**, propre, lisible, maintenable et utilisant les meilleures pratiques actuelles pour la stack Nuxt 3 / Vue 3 / TypeScript / Docker.
>     - **Utilisation de Vuetify :** Pour toute la partie structure HTML et style CSS, **utilisez systématiquement les composants Vuetify** (`v-container`, `v-row`, `v-col`, `v-card`, `v-btn`, etc.) afin de garantir la cohérence visuelle et de bénéficier des fonctionnalités intégrées. Le style spécifique (pixel art) sera appliqué par-dessus ou en personnalisant le thème Vuetify lorsque nécessaire.
>     - **Performance et Scalabilité :** Gardez constamment à l'esprit l'objectif de **performance** (interface rapide et fluide) et de **scalabilité** (capacité à gérer de nombreux utilisateurs et agents simultanément). Appliquez les optimisations et les choix d'architecture (jobs asynchrones, gestion d'état efficace, etc.) décrits dans le plan et les suggestions.
>
> **Le respect scrupuleux de ces directives est essentiel pour minimiser les erreurs, garantir la qualité du produit final et assurer une progression efficace du développement.**

**Objectif Général :** Créer une application web avec Nuxt 3 et Vue 3, conteneurisée avec Docker, pour manager une équipe d'agents IA. L'interface adoptera un style pixel art rétro SF et intégrera des éléments interactifs comme le drag-and-drop et des animations.

**Stack Technique Principale :**

- Frontend : Nuxt 3, Vue 3
- Styling : CSS (potentiellement Tailwind CSS ou framework similaire adapté au pixel art)
- Conteneurisation : Docker, Docker Compose
- Backend : Nuxt 3 Server Engine (ou un backend séparé si préféré plus tard), Système de fichiers pour la configuration (initialement), Base de données (pour utilisateurs, agents custom, clés API - à déterminer)

---

## Phase 1 : Initialisation du Projet et Configuration de Base

**Objectif :** Mettre en place la structure du projet, les dépendances et l'environnement Docker.

- [x] 1. **Création du Projet Nuxt 3 :**
  - [x] - Commande : `npx nuxi@latest init .` (Adapté pour initialiser dans le dossier courant)
  - [x] - Installer les dépendances : `npm install`
- [x] 2. **Configuration de Docker :**
  - [x] - Créer un `Dockerfile` à la racine pour l'application Nuxt.
      - [x] - Basé sur une image Node.js appropriée (`node:20-alpine`).
      - [x] - Copier `package.json`, `package-lock.json`.
      - [x] - Installer les dépendances (`npm install`).
      - [x] - Copier le reste du code source (respecte `.dockerignore`).
      - [x] - Exposer le port (3000).
      - [x] - Définir la commande de démarrage (`CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]` pour le développement).
  - [x] - Créer un fichier `.dockerignore`.
  - [x] - Créer un fichier `docker-compose.yml`.
      - [x] - Définir un service `app` basé sur le `Dockerfile`.
      - [x] - Mapper les volumes pour le développement (`.:/app`, exclusion `/app/node_modules`, `/app/.nuxt`, `/app/.output`).
      - [x] - Mapper les ports (`3000:3000`).
      - [x] - Configurer les variables d'environnement (`NODE_ENV=development`).
- [x] 3. **Configuration Initiale Nuxt (`nuxt.config.ts`) :**
  - [x] - Vérifier les configurations de base.
  - [ ] - Ajouter des modules Nuxt vuetify
- [x] 4. **Structure de Dossiers :**
  - [x] - Vérifier les dossiers standards : `server`, `public` présents. `components`, `pages`, `layouts`, `assets` seront créés au besoin.
- [ ] 5. **Lancement Initial :**
  - [x] - Expliquer la commande `docker-compose up --build`.
  * - [ ] Vérifier que l'application Nuxt de base est accessible dans le navigateur (À faire par l'utilisateur).

---

## Phase 2 : Développement Frontend (Interface Utilisateur)

**Objectif :** Construire l'intégralité de l'interface utilisateur décrite, sans la logique backend. Utiliser des données statiques ou des placeholders pour simuler le contenu dynamique.

- [ ] 1.  **Mise en Page Principale (`layouts/default.vue`) :**
  - [ ] - Créer la structure à trois colonnes : Panneau Gauche (25%), Zone Centrale (50%), Panneau Droit (25%). Utiliser Flexbox ou CSS Grid.
  - [ ] - Implémenter la `TopBar` en haut.
  - [ ] - S'assurer que les panneaux latéraux occupent toute la hauteur.
  - [ ] - Appliquer des styles de base (couleurs de fond, bordures) pour délimiter les zones, en pensant au thème rétro SF / pixel art.
- [ ] 2.  **Composant `TopBar` (`components/TopBar.vue`) :**
  - [ ] - Afficher un nom d'utilisateur placeholder (ex: "PlayerOne").
  - [ ] - Afficher un compteur de points (ex: "Points: 0").
  - [ ] - Ajouter un bouton "Déconnexion" (sans fonctionnalité pour l'instant).
  - [ ] - Ajouter une icône "Paramètres" (roue crantée, style pixel art).
  - [ ] - Styliser la barre (pixel art, couleurs rétro SF).
- [ ] 3.  **Composant `LeftPanel` (`components/LeftPanel.vue`) :**
  - [ ] - Implémenter la fonctionnalité "refermable" (bouton pour masquer/afficher).
  - [ ] - Afficher une liste statique d'agents (ex: "Agent Alpha", "Agent Beta", "Agent Vierge"). Chaque item doit avoir une petite icône de robot pixel art.
  - [ ] - Rendre chaque agent de la liste _draggable_. Utiliser l'API HTML5 Drag and Drop ou une librairie Vue (ex: `vue-draggable-next`).
  - [ ] - Styliser le panneau et la liste (pixel art).
- [ ] 4.  **Composant `MainWorkspace` (`components/MainWorkspace.vue`) :**
  - [ ] - Définir cette zone comme une _dropzone_ pour les agents venant du `LeftPanel`.
  - [ ] - Lorsqu'un agent est déposé :
      - [ ] - Afficher une représentation de l'agent (un composant `AgentRobot`) à l'endroit du drop (ou à une position gérée).
      - [ ] - Passer des props au `AgentRobot` (ex: type d'agent, image).
  - [ ] - Gérer l'état des agents présents dans la zone (utiliser `useState` de Nuxt ou Pinia pour une gestion d'état simple).
  - [ ] - Styliser la zone (peut-être une grille de fond, style vaisseau spatial).
- [ ] 5.  **Composant `AgentRobot` (`components/AgentRobot.vue`) :**
  - [ ] - Accepter des props (nom, image, état, etc.).
  - [ ] - Afficher l'image du robot mignon (pixel art).
  - [ ] - Implémenter une animation simple (ex: idle, clignotement). Utiliser CSS ou une librairie d'animation.
  - [ ] - Rendre le robot cliquable. Le clic doit émettre un événement pour indiquer qu'il est sélectionné.
  - [ ] - (Optionnel - Sandbox) Permettre un léger déplacement aléatoire ou contrôlé du robot dans la `MainWorkspace`.
- [ ] 6.  **Composant `RightPanel` (`components/RightPanel.vue`) :**
  - [ ] - Implémenter la fonctionnalité "refermable".
  - [ ] - S'affiche ou se met à jour lorsque le panel est ouvert (suite à un clic sur un `AgentRobot` ou un drop).
  - [ ] - Afficher les détails de l'agent sélectionné (nom, tâche actuelle - placeholders initialement).
  - [ ] - Ajouter les boutons : "Supprimer Tâche", "Changer Tâche", "Éditer Tâche", "Créer Tâche".
  - [ ] - Styliser le panneau (pixel art).
- [ ] 7.  **Composant `TaskModal` (`components/TaskModal.vue`) :**
  - [ ] - Créer un composant modal (pop-in).
  - [ ] - Le modal doit contenir un formulaire pour :
      - [ ] - Éditer/Créer le nom ou le prompt de la tâche (textarea).
      - [ ] - Sélectionner un modèle d'IA (dropdown avec options statiques : "Modèle X (OpenAI)", "Modèle Y (Anthropic)").
      - [ ] - Sélectionner des services à connecter (checkboxes/liste statique : "Service Mail", "Service Calendrier").
  - [ ] - Ajouter des boutons "Sauvegarder" et "Annuler".
  - [ ] - Le modal doit pouvoir être affiché/masqué (contrôlé par le `RightPanel`).
  - [ ] - Styliser le modal (pixel art).
- [ ] 8.  **Routing et Authentification (UI Seulement) :**
  - [ ] - Créer les pages `pages/login.vue` et `pages/register.vue`.
  - [ ] - Implémenter des formulaires simples (email, mot de passe) sans logique de soumission réelle.
  - [ ] - Configurer le routing dans `nuxt.config.ts` ou via la structure de `pages/`.
  - [ ] - Créer une redirection simple (simulée) vers la page principale après un "login" réussi.
- [ ] 9.  **Styling Global et Pixel Art :**
  - [ ] - Choisir une palette de couleurs rétro SF.
  - [ ] - Trouver/Créer une police pixel art et l'intégrer (`@font-face`).
  - [ ] - Utiliser des bordures, ombres et éléments UI typiques du pixel art.
  - [ ] - S'assurer de la cohérence du style sur tous les composants.
  - [ ] - Utiliser des assets (images de robots, icônes) au format pixel art.

---

## Phase 3 : Développement Backend et Intégration

**Objectif :** Implémenter la logique serveur, la gestion des données (configurations, utilisateurs) et connecter le Frontend au Backend.

- [ ] 1.  **Configuration des Agents (Backend) :**
  - [ ] - Créer un dossier `/agents` (ou un emplacement configurable) à la racine du projet (ou dans `/server`).
  - [ ] - Créer quelques fichiers de configuration JSON (ou YAML) pour les agents prédéfinis.
      - [ ] - Exemple `agent-alpha.json`: `{ "name": "AlphaBot", "modelName": "GPT-4o", "modelProvider": "OpenAI", "image": "/images/robots/alpha.png", "prompt": "Tu es AlphaBot, un assistant généraliste.", "services": [] }`
  - [ ] - Créer un dossier `/agentcustom` (ou similaire) pour les agents personnalisés.
  - [ ] - Développer une API endpoint (`server/api/agents/predefined.get.ts`) qui lit les fichiers dans `/agents` et retourne la liste.
  - [ ] - Développer des API endpoints pour les agents custom (`server/api/agents/custom.get.ts`, `server/api/agents/custom.post.ts`, `server/api/agents/custom/[id].put.ts`, `server/api/agents/custom/[id].delete.ts`).
      - [ ] - La route POST/PUT doit gérer la logique : si l'édition concerne un agent prédéfini (basé sur un ID/nom spécial ?), elle crée un nouvel agent dans `/agentcustom`. Si elle concerne un agent déjà custom, elle modifie le fichier existant.
- [ ] 2.  **Configuration des Modèles et Services (Backend) :**
  - [ ] - Créer des fichiers de configuration (ex: `server/config/models.json`, `server/config/services.json`) listant les modèles d'IA disponibles et les services connectables.
  - [ ] - Créer des API endpoints pour lire ces configurations (`server/api/config/models.get.ts`, `server/api/config/services.get.ts`).
- [ ] 3.  **Authentification (Backend) :**
  - [ ] - Choisir une stratégie d'authentification (ex: `nuxt-auth`, ou gestion manuelle avec sessions/JWT).
  - [ ] - Implémenter les endpoints API (`server/api/auth/register.post.ts`, `server/api/auth/login.post.ts`, `server/api/auth/logout.post.ts`, `server/api/auth/session.get.ts`).
  - [ ] - Mettre en place une base de données (ex: SQLite pour commencer, PostgreSQL/MongoDB dans Docker pour plus de robustesse) pour stocker les utilisateurs.
- [ ] 4.  **Gestion des Clés API (Backend & Frontend) :**
  - [ ] - Créer une section "Paramètres" dans l'interface (accessible via l'icône de la `TopBar`).
  - [ ] - Créer une page ou un composant modal pour les paramètres.
  - [ ] - Permettre à l'utilisateur de saisir et sauvegarder ses clés API pour les différents services/modèles d'IA.
  - [ ] - Créer des endpoints API (`server/api/settings/apikeys.get.ts`, `server/api/settings/apikeys.post.ts`) pour gérer les clés API.
  - [ ] - **Sécurité :** Stocker les clés API de manière sécurisée côté serveur (variables d'environnement chiffrées ou base de données sécurisée). **Ne jamais les exposer côté client.**
- [ ] 5.  **Intégration API Externe (Core Logic) :**
  - [ ] - Développer la logique serveur pour interagir avec les API des modèles d'IA (ex: OpenAI API).
  - [ ] - Créer un endpoint API (ex: `server/api/agents/[id]/invoke.post.ts`) qui prend une tâche/prompt, récupère la configuration de l'agent, utilise la clé API de l'utilisateur et appelle l'API externe.
  - [ ] - Gérer les réponses et les erreurs des API externes.
- [ ] 6.  **Connexion Frontend <-> Backend :**
  - [ ] - Remplacer toutes les données statiques et placeholders du frontend par des appels aux API endpoints créés (`useFetch`, `useAsyncData` de Nuxt).
  - [ ] - Gérer l'état de chargement (`pending`) et les erreurs (`error`) retournés par les appels API pour fournir un feedback à l'utilisateur (messages d'erreur, indicateurs de chargement).
  - [ ] - Connecter les formulaires (Login, Register, TaskModal, Settings) pour qu'ils soumettent les données aux API backend.
  - [ ] - Utiliser le middleware Nuxt ou des vérifications dans les pages/layouts pour protéger les routes qui nécessitent une authentification.
- [ ] 7.  **Persistance des Agents sur le Workspace :**
  - [ ] - Sauvegarder l'état du `MainWorkspace` (quels agents sont présents et où) côté serveur, probablement lié au compte utilisateur. Mettre à jour cet état via des appels API lors des actions de drag-and-drop, suppression, etc.

---

## Phase 4 : Améliorations et Fonctionnalités Futures

- [ ] - **Gamification :** Implémenter la logique du système de points. Définir comment les points sont gagnés. Afficher le classement ?
- [ ] - **Sandbox Amélioré :** Ajouter des interactions plus complexes entre les agents dans la zone centrale. Permettre des déplacements plus élaborés.
- [ ] - **Gestion des Tâches Complexes :** Permettre des workflows de tâches, des dépendances entre agents.
- [ ] - **Monitoring des Agents :** Afficher l'état en temps réel des agents (occupé, en erreur, terminé).
- [ ] - **Tests :** Ajouter des tests unitaires et d'intégration.
- [ ] - **Optimisations :** Optimiser les performances frontend et backend.

# Analyse et Suggestions d'Experts pour le Projet "Gestionnaire d'Agents IA"

Ce document détaille les points d'amélioration et d'attention suggérés par des experts Frontend et Fullstack, basés sur la description initiale du projet. Il peut servir de complément au plan de développement étape par étape.

---

## Perspective d'un Expert Frontend (UI/UX, Performance, Maintenabilité)

- [ ] 1.  **Phase 1 (Setup) : Qualité et Outillage**

  - [x] - **Qualité du Code :** Intégrer dès le début `ESLint` (linting), `Prettier` (formatage), `Husky` et `lint-staged` (pre-commit hooks) pour garantir la cohérence et prévenir les erreurs.
  - [ ] - **Architecture CSS :** Préciser l'approche. Envisager :
      - [ ] - **Variables CSS :** Pour la palette de couleurs, polices pixel, etc., facilitant le theming.
      - [ ] - **CSS Modules** ou **Scoped CSS (Vue)** : Pour l'encapsulation et éviter les conflits, crucial pour un thème fort.
      - [ ] - Évaluer Tailwind CSS pour l'agencement rapide, en complément.
  - [ ] - **Développement Isolé des Composants :** Utiliser `Storybook` ou `Histoire`. Essentiel pour développer, tester et documenter les composants UI complexes (robots, panneaux) en isolation.

- [ ] 2.  **Phase 2 (Frontend) : Expérience Utilisateur et Robustesse**

  - [ ] - **Gestion d'État Avancée :** Recommander fortement `Pinia` pour gérer l'état complexe (panneaux, agent sélectionné, agents sur workspace, modales). Structurer les stores logiquement (`uiStore`, `agentStore`, `userStore`).
  - [ ] - **Composants Réutilisables :** Insister sur la création de composants de base stylisés "pixel art" (`BaseButton`, `BasePanel`, `BaseModal`) pour la cohérence et la réutilisabilité.
  - [ ] - **Performance des Animations et Interactions :**
      - [ ] - **Drag and Drop / Animations :** Considérer la performance si beaucoup d'éléments. Privilégier `transform`/`opacity` CSS. Envisager `SVG` ou `<canvas>` pour animations très complexes.
      - [ ] - **Listes Longues :** Penser à la virtualisation ("windowing") pour la liste d'agents si elle peut s'allonger.
  - [ ] - **Accessibilité (a11y) :**
      - [ ] - Intégrer dès le début : Navigation clavier, attributs ARIA (D&D, modales, panneaux), contrastes de couleurs (vigilance avec pixel art).
      - [ ] - Utiliser des outils d'audit d'accessibilité.
  - [ ] - **Game Feel / Sandbox :**
      - [ ] - Définir _précisément_ le comportement sandbox (grille ? libre ? collisions ?).
      - [ ] - Planifier les animations des robots tôt (idle, travail, erreur...).
  - [ ] - **Responsive Design :** Penser à une adaptation minimale pour les écrans plus petits (panneaux en overlay ?).
  - [ ] - **Tests Frontend :** Recommander d'ajouter des tests unitaires/composants (Vitest + Vue Testing Library) au fil de l'eau.

- [ ] 3.  **Phase 3 (Intégration) : Feedback Utilisateur**
  - [ ] - **Gestion Fine des Erreurs :** Système de notifications utilisateur (toasts) pour les erreurs API/succès. Intercepteur global pour les erreurs HTTP.
  - [ ] - **Indicateurs de Chargement :** Spinners, "skeleton screens" stylisés partout où des données sont chargées.
  - [ ] - **Optimistic UI :** Envisager pour les actions rapides (déplacer agent, assigner tâche simple), avec gestion des échecs.

---

## Perspective d'un Expert Fullstack (Architecture, Sécurité, Scalabilité)

- [ ] 1.  **Phase 1 (Setup) : Environnement Robuste**

  - [ ] - **Docker Compose :** Inclure les services dépendants dès le début (BDD, Redis) pour standardiser l'environnement.
  - [ ] - **Logging :** Configurer un logging structuré (JSON) pour une meilleure exploitation.

- [ ] 2.  **Phase 3 (Backend) : Architecture et Sécurité**

  - [ ] - **API Design :** Adopter une convention claire (RESTful). Documenter avec OpenAPI/Swagger. Réponses d'erreur standardisées. Pagination.
  - [ ] - **Gestion de la Configuration des Agents :**
      - [ ] - **Pré-définis :** Fichiers JSON/YAML ou seed dans la BDD.
      - [ ] - **Custom :** **Utiliser la base de données** (table `custom_agents` liée à l'utilisateur). Éviter les fichiers individuels.
  - [ ] - **Sécurité Approfondie :**
      - [ ] - **Authentification :** JWT avec refresh tokens (HttpOnly cookies).
      - [ ] - **Autorisation :** Vérifications systématiques côté serveur.
      - [ ] - **Validation des Données :** Validation _côté serveur_ de toutes les entrées (Zod/Valibot).
      - [ ] - **Stockage Sécurisé des Clés API Utilisateur :** **Chiffrement dans la BDD**.
      - [ ] - **Protection API :** Rate limiting, headers de sécurité (Helmet).
  - [ ] - **Exécution des Tâches IA :**
      - [ ] - **Jobs Asynchrones :** Utiliser une file d'attente (BullMQ + Redis) pour les appels API longs. Ne pas bloquer la requête HTTP.
      - [ ] - **Feedback Temps Réel :** Réponse API immédiate ("Tâche acceptée"). Notification au frontend via **Polling** ou **WebSockets**.
  - [ ] - **Base de Données :**
      - [ ] - Justifier le choix (PostgreSQL/MongoDB). Utiliser un **ORM** (Prisma) pour migrations, requêtes sécurisées.
      - [ ] - Définir les schémas clairement.
  - [ ] - **Gestion de la Configuration (Backend) :** Utiliser `.env` (non commités) pour les secrets. Différencier les environnements.
  - [ ] - **Scalabilité :** Penser "stateless" pour le backend. Identifier les potentiels goulots d'étranglement.

- [ ] 3.  **Phase 4 (Futur) et Scalabilité :**
  - [ ] - **WebSockets :** Essentiel pour gamification temps réel / monitoring.
  - [ ] - **Monitoring :** Intégrer des outils (Sentry, Prometheus/Grafana) pour la production.

---
