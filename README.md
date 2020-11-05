# Présenation projet - Porg Web



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



#### Requête:

Exemple:

```http
GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes
```



#### Réponse

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



### TasteDive

TasteDiv est une API permettant de trouver des recommandations de musiques, films, livres etc.

> Note: les requêtes n'ont pas besoin de clé d'authentification.



#### EndPoint

Chaque requête doit etre de la forme:

```http
https://tastedive.com/api/similar?q=parameters
```









## Notre API



## Client



## Serveur

