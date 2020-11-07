# Presentation projet - Prog Web

- [Présentation projet - Porg Web](#presentation-projet---prog-web)
  * [Description du projet](#description-du-projet)
  * [API Tierce](#api-tierce)
    + [Google Books APIs](#google-books-apis)
      - [EndPoint](#endpoint)
      - [Requête:](#requete)
      - [Réponse](#reponse)
    + [TasteDive](#tastedive)
      - [EndPoint](#endpoint)
  * [Notre API](#notre-api)
  * [Client](#client)
  * [Serveur](#serveur)

## Description du projet

Le projet consiste à créer une SPA où un utilisateur peut chercher des informations sur un livre comme le titre, l'auteur, la maison d'édition, le résumé et le prix et proposer des recommandations. Nous pouvons distinguer deux cas d'utilisation: un utilisateur connecté avec son compte préalablement créé et un utilisateur non connecté.

L'utilisateur non connecté pourra:

- Chercher un livre grâce à une barre de recherche et voir ses informations
- Voir des recommandations de livre en fonction de sa recherche

L'utilisateur connecté pourra:

- Faire tout ce qu'un utilisateur non connecté peut faire
- Personnaliser ses préférences (auteur, style/genre, maison d'édition) dans son profil
- En plus des recommandations de recherche, l'utilisateur aura 3 recommandations en fonction de ses préférences
- Ajouter un livre recherché dans plusieurs catégories: "Lu", "A lire", "Favoris"
- Avoir accès aux statistiques personnelles de l'utilisateur: nombre de livre lu avec la liste, nombre de favoris avec la liste, nombre de livre à lire avec la liste, pourcentage d'interet pour le genre (en fonctions des livres ajoutés aux listes)



## API Tierce

### Google Books APIs

Google Books APIs permet de chercher une liste de livre à partir d'un titre, auteur, maison d'édition, sujet, nuémro ISBN du livre etc. 

> note: les requêtes de type GET n'ont pas besoin de clé d'authentification.



#### EndPoint

Chaque requête doit etre de la forme:

```http
https://www.googleapis.com/books/v1/volumes?q=search+terms
```

On peut spécifier les champs de rechercher comme le titre ou l'auteur. D'près la documentation voici les champs que l'on peut spécifier:

- `intitle`:  le titre du livre
- `inauthor`: le nom de l'auteur
- `inpublisher`: le nom de la maison d'édition
- `subject`: sujet principal du livre
- `isbn`: le numéro ISBN
- `lccn`:  le Numéro de contrôle de la Bibliothèque du Congrès
- `oclc`:  Online Computer Library Center number



#### Requete:

Exemple:

```http
GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes
```



#### Reponse

Si on reprend la précédente, on obtient ce résultat:

```json
{
 "kind": "books#volumes",
 "items": [
  {
   "kind": "books#volume",
   "id": "_ojXNuzgHRcC",
   "etag": "OTD2tB19qn4",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/_ojXNuzgHRcC",
   "volumeInfo": {
    "title": "Flowers",
    "authors": [
     "Vijaya Khisty Bodach"
    ],
   ...
  },
  {
   "kind": "books#volume",
   "id": "RJxWIQOvoZUC",
   "etag": "NsxMT6kCCVs",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/RJxWIQOvoZUC",
   "volumeInfo": {
    "title": "Flowers",
    "authors": [
     "Gail Saunders-Smith"
    ],
    ...
  },
  {
   "kind": "books#volume",
   "id": "zaRoX10_UsMC",
   "etag": "pm1sLMgKfMA",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/zaRoX10_UsMC",
   "volumeInfo": {
    "title": "Flowers",
    "authors": [
     "Paul McEvoy"
    ],
    ...
  },
  "totalItems": 3
}
```



On peut voir qu'il y a 3  résultats correspondants à la recherche. Pour chaque résultat on y trouve:

- Le genre de la recherche (livre)
- L'id du resultat (id du livre)
- etag: ??
- Un lien vers les informations détaillées du livre
- Dans volumes infos: Les informations du livre contenant dans le lien cité au précédent point



### TasteDive

TasteDiv est une API permettant de trouver des recommandations de musiques, films, livres etc.

> Note: les requêtes n'ont pas besoin de clé d'authentification.



#### EndPoint

Chaque requête doit etre de la forme:

```http
https://tastedive.com/api/similar?q=parameters
```







## Notre API

Elle permet d'effectuer les actions suivantes:

- Création de compte
- Gestion de l’authentification
- Récupérer des informations sur un livre cherché via une barre de recherche
- Ajouter un livre à une liste (lu, favoris, a lire)
- Récupérer les stats utilisateur (listes + info à l’inscription)







## Client

Lorsqu'un utilisteur ouvre l'app, il aura la possibilité de:

- pouvoir se connecter/déconnecter
- pouvoir créer un compte utilisateur
- pouvoir rechercher dans une barre de recherche le titre et/ou dans une autre l’auteur d’un livre
- afficher des previews des livres correspondants à la recherche (titre, auteur, image, maison d’édition)
- lors d’un clique sur un livre afficher le détail des informations (prix (eur), description, auteur, année d’édition, éditeur, isbn, nb de pages, catégories (fiction, théâtre …) ) 
- pouvoir ajouter un livre à sa liste de favoris
- pouvoir ajouter un livre à sa liste de ‘Lu’
- pouvoir ajouter un livre à sa liste de ‘A lire’
- pouvoir afficher les stats de l’utilisateur connecté (listes de livre par caté)



## Serveur

Le serveur doit:

- Gérer la création de compte utilisateur
- Gérer la connexion/déconnexion des comptes utilisateurs
- Gérer la recherche:
  - Récupérer les informations entrées par l’utilisateur dans la barre de recherche
  - Appeler l’API google pour récupérer les livres correspondants à la recherche
  - Appeler l’API tasteDive pour récupérer les recommandations pour tous les livres trouvés par la recherche
  - Créer un JSON avec les infos pertinentes (voir front) et le renvoyer
- Récupérer en BDD les listes de livre enregistrés par l’utilisateur
- Ajouter un livre à sa liste de favoris à la BDD
- Ajouter un livre à sa liste de ‘Lu’ à la BDD
- Ajouter un livre à sa liste de ‘A lire’ à la BDD
- Supprimer un livre à sa liste de favoris à la BDD
- Supprimer un livre à sa liste de ‘Lu’ à la BDD
- Supprimer un livre à sa liste de ‘A lire’ à la BDD



