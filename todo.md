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

- [x] 1. **Création du Projet Nuxt 3**
- [x] 2. **Configuration de Docker**
- [x] 3. **Configuration Initiale Nuxt (`nuxt.config.ts`)**
- [x] 4. **Structure de Dossiers**
- [x] 5. **Lancement Initial**

---

## Phase 2 : Développement Frontend (Interface Utilisateur)

**Objectif :** Construire l'intégralité de l'interface utilisateur décrite, sans la logique backend. Utiliser des données statiques ou des placeholders pour simuler le contenu dynamique.

- [✅] 1.  **Mise en Page Principale (`layouts/default.vue`) :**
  - [✅] - Créer la structure à trois colonnes : Panneau Gauche (25%), Zone Centrale (50%), Panneau Droit (25%). Utiliser Flexbox ou CSS Grid.
  - [✅] - Implémenter la `TopBar` en haut.
  - [✅] - S'assurer que les panneaux latéraux occupent toute la hauteur.
  - [✅] - Appliquer des styles de base (couleurs de fond, bordures) pour délimiter les zones.
- [✅] 2.  **Composant `TopBar` (`components/TopBar.vue`) :**
  - [✅] - Afficher un nom d'utilisateur placeholder (ex: "PlayerOne").
  - [✅] - Afficher un compteur de points (ex: "Points: 0").
  - [✅] - Ajouter un bouton "Déconnexion".
  - [✅] - Ajouter une icône "Paramètres".
  - [🚧] - Styliser la barre (pixel art - initial pass).
- [✅] 3.  **Composant `LeftPanel` (`components/LeftPanel.vue`) :**
  - [✅] - Implémenter la fonctionnalité "refermable".
  - [✅] - Afficher une liste statique d'agents (via API `predefined`).
  - [✅] - Rendre chaque agent de la liste _draggable_.
  - [✅] - Ajouter un bouton/icône 'Info' pour afficher les détails de l'agent prédéfini.
  - [🚧] - Styliser le panneau et la liste (pixel art - initial pass).
- [✅] 4.  **Composant `MainWorkspace` (`components/MainWorkspace.vue`) :**
  - [✅] - Définir cette zone comme une _dropzone_.
  - [✅] - Lorsqu'un agent est déposé :
      - [✅] - Afficher une représentation de l'agent (`AgentRobot`) à l'endroit du drop (via store).
      - [✅] - Passer des props au `AgentRobot`.
  - [✅] - Gérer l'état des agents présents via Pinia (`agentStore`).
  - [🚧] - Styliser la zone (grille de fond appliquée, style vaisseau spatial TBD).
- [✅] 5.  **Composant `AgentRobot` (`components/AgentRobot.vue`) :**
  - [✅] - Accepter des props (id, nom, image, x, y).
  - [✅] - Afficher l'image du robot.
  - [✅] - Implémenter une animation simple (mouvement aléatoire).
  - [✅] - Rendre le robot cliquable (émet événement `selected`).
- [✅] 6.  **Composant `RightPanel` (`components/RightPanel.vue`) :**
  - [✅] - Implémenter la fonctionnalité "refermable".
  - [✅] - S'affiche ou se met à jour lorsque le panel est ouvert (via store `selectedAgentId`).
  - [✅] - Afficher les détails de l'agent sélectionné (nom, modèle, tâche via store).
  - [✅] - Ajouter les boutons : "Supprimer Agent", "Créer Tâche", "Éditer Tâche".
  - [🚧] - Styliser le panneau (pixel art - initial pass).
- [✅] 7.  **Composant `TaskModal` (`components/TaskModal.vue`) :**
  - [✅] - Créer un composant modal (`v-dialog`).
  - [✅] - Le modal contient un formulaire pour :
      - [✅] - Éditer/Créer le nom/prompt (textarea).
      - [🚧] - Sélectionner un modèle d'IA (dropdown statique - API dynamique non fonctionnelle).
      - [✅] - Sélectionner des services (checkboxes statiques).
  - [✅] - Ajouter des boutons "Sauvegarder" et "Annuler".
  - [✅] - Le modal est contrôlé par `RightPanel` (`isVisible`, `editingTask` props, `@close`, `@save` emits).
  - [✅] - La sauvegarde appelle l'action du store `updateAgentTask`.
  - [ ] - (REQUIERT INTERVENTION MANUELLE) Intégrer le chargement dynamique de la liste des modèles d'IA (tentatives via outillage automatisé échouées).
  - [🚧] - Styliser le modal (pixel art - initial pass).
- [✅] 8.  **Routing et Authentification (UI Seulement) :**
  - [✅] - Créer les pages `pages/login.vue` et `pages/register.vue`.
  - [✅] - Implémenter des formulaires simples (email, mot de passe).
  - [✅] - Configurer le routing via `pages/`.
  - [✅] - Créer un layout `layouts/auth.vue` pour ces pages.
  - [✅] - Implémenter une redirection simulée après "login"/"register".
- [✅] 9.  **Styling Global et Pixel Art :**
  - [ ] - Choisir une palette de couleurs rétro SF.
  - [✅] - Police pixel art 'Press Start 2P' intégrée globalement.
  - [ ] - Utiliser des bordures, ombres et éléments UI typiques du pixel art.
  - [ ] - S'assurer de la cohérence du style sur tous les composants.
  - [ ] - Utiliser des assets (images de robots, icônes) au format pixel art.

---

## Phase 3 : Développement Backend et Intégration

**Objectif :** Implémenter la logique serveur, la gestion des données (configurations, utilisateurs) et connecter le Frontend au Backend.

- [ ] 1.  **Configuration des Agents (Backend) :**
  - [✅] - Créer un dossier `/agents` (ou un emplacement configurable) à la racine du projet (ou dans `/server`).
  - [✅] - Créer quelques fichiers de configuration JSON (ou YAML) pour les agents prédéfinis.
      - [ ] - Exemple `agent-alpha.json`: `{ "name": "AlphaBot", "modelName": "GPT-4o", "modelProvider": "OpenAI", "image": "/images/robots/alpha.png", "prompt": "Tu es AlphaBot, un assistant généraliste.", "services": [] }`
  - [✅] - Développer une API endpoint (`server/api/agents/predefined.get.ts`) qui lit les fichiers dans `/agents` et retourne la liste.
  - [✅] - Créer un dossier `/agentcustom` (ou similaire) pour les agents personnalisés.
  - [ ] - Développer des API endpoints pour les agents custom (`server/api/agents/custom.get.ts`, `server/api/agents/custom.post.ts`, `server/api/agents/custom/[id].put.ts`, `server/api/agents/custom/[id].delete.ts`).
      - [ ] - La route POST/PUT doit gérer la logique : si l'édition concerne un agent prédéfini (basé sur un ID/nom spécial ?), elle crée un nouvel agent dans `/agentcustom`. Si elle concerne un agent déjà custom, elle modifie le fichier existant.
- [ ] 2.  **Configuration des Modèles et Services (Backend) :**
  - [✅] - Créer des fichiers de configuration (ex: `server/config/models.json`, `server/config/services.json`) listant les modèles d'IA disponibles et les services connectables.
  - [✅] - Créer des API endpoints pour lire ces configurations (models.get.ts done; services.get.ts done).
- [ ] 3.  **Authentification (Backend) :**
  - [ ] - Choisir une stratégie d'authentification (ex: `nuxt-auth`, ou gestion manuelle avec sessions/JWT).
  - [ ] - Implémenter les endpoints API (`server/api/auth/register.post.ts`, `server/api/auth/login.post.ts`, `server/api/auth/logout.post.ts`, `server/api/auth/session.get.ts`).
  - [ ] - Mettre en place une base de données (ex: SQLite pour commencer, PostgreSQL/MongoDB dans Docker pour plus de robustesse) pour stocker les utilisateurs.
- [ ] 4.  **Gestion des Clés API (Backend & Frontend) :**
  - [✅] - Créer une section "Paramètres" dans l'interface (accessible via l'icône de la TopBar, ouvre SettingsModal).
  - [🚧] - Créer une page ou un composant modal pour les paramètres (SettingsModal.vue structure créée).
  - [🚧] - Styliser SettingsModal.vue (pixel art - initial pass).
  - [ ] - Permettre à l'utilisateur de saisir et sauvegarder ses clés API pour les différents services/modèles d'IA.
  - [ ] - Créer des endpoints API (`server/api/settings/apikeys.get.ts`, `server/api/settings/apikeys.post.ts`) pour gérer les clés API.
  - [🚧] - **Sécurité :** Stocker les clés API de manière sécurisée côté serveur (variables d'environnement chiffrées ou base de données sécurisée). **Ne jamais les exposer côté client.**
- [ ] 5.  **Intégration API Externe (Core Logic) :**
  - [🚧] - Développer la logique serveur pour interagir avec les API des modèles d'IA (ex: OpenAI API).
  - [✅] - Créer un endpoint API (ex: `server/api/agents/[id]/invoke.post.ts`) qui prend une tâche/prompt, récupère la configuration de l'agent, utilise la clé API de l'utilisateur et appelle l'API externe.
  - [🚧] - Gérer les réponses et les erreurs des API externes.
- [ ] 6.  **Connexion Frontend <-> Backend :**
  - [🚧] - Remplacer toutes les données statiques et placeholders du frontend par des appels aux API endpoints créés (`useFetch`, `useAsyncData` de Nuxt).
  - [✅] - Gérer l'état de chargement (`pending`) et les erreurs (`error`) retournés par les appels API pour fournir un feedback à l'utilisateur (messages d'erreur, indicateurs de chargement).
  - [🚧] - Connecter les formulaires (Login, Register, TaskModal, Settings) pour qu'ils soumettent les données aux API backend.
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

  - [✅] - **Qualité du Code :** `ESLint`, `Prettier`, `Husky`, `lint-staged` intégrés.
  - [ ] - **Architecture CSS :** Préciser l'approche.
  - [ ] - **Développement Isolé des Composants :** Utiliser `Storybook` ou `Histoire`.

- [ ] 2.  **Phase 2 (Frontend) : Expérience Utilisateur et Robustesse**

  - [✅] - **Gestion d'État Avancée :** `Pinia` utilisé et structuré (`agentStore`).
  - [ ] - **Composants Réutilisables :** Créer `BaseButton`, `BasePanel`, `BaseModal`.
  - [ ] - **Performance des Animations et Interactions**
  - [ ] - **Accessibilité (a11y)**
  - [ ] - **Game Feel / Sandbox**
  - [ ] - **Responsive Design**
  - [ ] - **Tests Frontend**

- [ ] 3.  **Phase 3 (Intégration) : Feedback Utilisateur**
  - [🚧] - **Gestion Fine des Erreurs**
  - [🚧] - **Indicateurs de Chargement**
  - [ ] - **Optimistic UI**

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
  - [✅] - **Gestion de la Configuration (Backend) :** Utiliser `.env` (non commités) pour les secrets. Différencier les environnements.
  - [ ] - **Scalabilité :** Penser "stateless" pour le backend. Identifier les potentiels goulots d'étranglement.

- [ ] 3.  **Phase 4 (Futur) et Scalabilité :**
  - [ ] - **WebSockets :** Essentiel pour gamification temps réel / monitoring.
  - [ ] - **Monitoring :** Intégrer des outils (Sentry, Prometheus/Grafana) pour la production.

---
