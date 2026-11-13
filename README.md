# PLANIT AI

PLANIT AI est une application web qui transforme un brief en plan de développement grâce à une API d’intelligence artificielle. Elle permet de suivre les projets et de gérer leurs tâches dans un tableau Kanban.

## Fonctionnalités

### Dashboard — `index.html`

Le Dashboard affiche les projets sous forme de cartes avec leur nom, leur description, le nombre total de tâches, les tâches terminées et restantes, ainsi qu’une barre de progression.

Il permet de créer un projet, d’accéder à son Task Board et de le supprimer après confirmation.

Si aucun projet n’existe, le message suivant apparaît :

> Aucun projet pour le moment, créez-en un pour générer votre premier plan.

Le header contient le logo **PLANIT AI**, les liens **Dashboard** et **Nouveau projet**, ainsi que l’accès aux **Paramètres IA**.

### Création de projet — `new-project.html`

Le formulaire contient les champs suivants :

- Nom du projet
- Description
- Brief complet
- Durée en jours
- Nombre de développeurs
- Technologies
- Niveau de difficulté : Beginner, Intermediate ou Advanced

La validation s’effectue en temps réel avec les événements `input` et `submit` et des expressions régulières. Les champs obligatoires doivent être renseignés. La durée et le nombre de développeurs doivent être des entiers supérieurs ou égaux à 1.

Chaque erreur apparaît sous le champ concerné. Le bouton **Générer le plan de développement** reste désactivé tant que le formulaire est invalide.

Une fois le formulaire validé, l’application construit le prompt et l’envoie à l’API. Un panneau indique l’état de la génération :

- **idle** : prêt à générer le plan.
- **loading** : spinner et bouton désactivé pour éviter les doubles envois.
- **success** : redirection vers le Task Board.
- **error** : message explicite et bouton **Réessayer**.

L’application doit toujours permettre de sortir d’un état de chargement ou d’erreur.

### Task Board — `project.html?id=...`

Le Task Board présente le nom du projet, sa durée, son équipe, les heures estimées, la capacité disponible et sa progression.

Les tâches sont réparties dans trois colonnes :

- **To Do**
- **In Progress**
- **Done**

Chaque carte affiche l’identifiant, le titre, la priorité, la taille, le temps estimé, la deadline et les dépendances de la tâche. Un clic ouvre sa fenêtre de détail.

### Détail et gestion d’une tâche

La fenêtre de détail affiche toutes les informations de la tâche : description, user stories, critères d’acceptation, priorité, importance, taille, temps estimé, deadline, statut et dépendances.

L’utilisateur peut modifier le titre, la description, la priorité, la taille, la deadline et le statut. La suppression nécessite une confirmation.

Les modifications sont conservées après le rechargement de la page.

### Paramètres IA

Une fenêtre accessible depuis le header permet de saisir la clé API dans un champ de type `password`. La clé est enregistrée uniquement dans `sessionStorage`.

Le bouton **Mode démo** charge le fichier `data/sample-plan.json` avec une requête Fetch `GET`, pour utiliser l’application sans appeler l’IA.

## Règles de gestion

- La progression correspond au nombre de tâches **Done** divisé par le nombre total de tâches, multiplié par 100. Elle dépend uniquement des statuts.
- Une tâche ne peut pas passer à **Done** si une de ses dépendances n’est pas terminée. Un message explique le blocage.
- Supprimer une tâche retire également son identifiant des dépendances des autres tâches.
- Le plan reçu de l’IA est parsé et validé avant tout affichage.
- La validation vérifie les champs obligatoires, les valeurs autorisées, l’existence des dépendances et les deadlines comprises dans la durée du projet.
- Les modifications manuelles des tâches sont sauvegardées localement pour être conservées après rechargement.

## Modèle de données d’une tâche

- `id` : identifiant unique dans le projet, par exemple `TASK-001`.
- `title` : titre clair et précis.
- `description` : description détaillée du travail à réaliser.
- `userStories` : tableau des besoins du point de vue de l’utilisateur.
- `acceptanceCriteria` : tableau de conditions testables pour valider la tâche.
- `priority` : `Low`, `Medium`, `High` ou `Critical`.
- `importance` : `Low`, `Medium` ou `High`.
- `size` : `XS`, `S`, `M`, `L` ou `XL`.
- `estimatedTime` : temps estimé en heures, sous forme de nombre.
- `deadline` : jour prévu pour terminer la tâche, par exemple `Day 1`.
- `status` : `To Do`, `In Progress` ou `Done`.
- `dependencies` : tableau des identifiants des tâches à terminer avant celle-ci, vide si aucune dépendance.

## Utilisation

1. Ouvrir l’application avec un serveur local pour permettre le chargement du fichier JSON avec Fetch.
2. Saisir une clé API dans les paramètres ou activer le **Mode démo**.
3. Créer un projet et compléter le formulaire.
4. Générer le plan de développement.
5. Consulter et mettre à jour les tâches depuis le Task Board.
