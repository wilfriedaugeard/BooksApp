# Programmation Web - Projet

- [Installation et lancement](#installation-et-lancement)
  * [Avec Docker](#avec-docker)
  * [Sans Docker](#sans-docker)
- [Présentation projet](#presentation-projet---prog-web)
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

## Installation et lancement
**POUR LANCER L'APPLICATION VOUS DEVEZ METTRE DANS UN FICHIER .ENV LES CLEF EST URL DES API
LE `.env` EST DEJA PRESENT DANS L'ARCHIVE DONNEE POUR LE RENDU MAIS EST ABSENT SUR LE GITHUB. IL Y A UN EXAMPLE DANS LE FICHIER `.env.example`**
### Avec Docker
```sh
docker-compose up
```
Se diriger sur le port 8888.

### Sans Docker

#### Instalation

```sh
cd frontend; npm install
```
```sh
cd backend/ ; npm run install
```

#### Lancement

```sh
cd frontend; npm start
```
```sh
cd backend/ ; npm run start
```
Se diriger sur le port 4200.

## Description du projet

Le projet consiste à créer une SPA où un utilisateur peut chercher des informations sur un livre comme le titre, l'auteur, la maison d'édition, le résumé et le prix et avoir des recommandations. Nous pouvons distinguer deux cas d'utilisation: un utilisateur connecté avec son compte préalablement créé et un utilisateur non connecté.

L'utilisateur non connecté pourra:

- Chercher un livre grâce à une barre de recherche et voir ses informations
- Voir des recommandations de livre en fonction de sa recherche

L'utilisateur connecté pourra:

- Faire tout ce qu'un utilisateur non connecté peut faire
- Ajouter un livre recherché dans plusieurs catégories: "Lu", "A lire", "Favoris"


## API Tierce

### Google Books APIs

Google Books APIs permet de chercher une liste de livre à partir d'un titre, auteur, maison d'édition, sujet, nuémro ISBN du livre etc. 

> note: les requêtes de type GET n'ont pas besoin de clé d'authentification. Une limite de 1000 requêtes par jour est applicable sans clé.



#### EndPoint

Chaque requête doit etre de la forme:

```http
https://www.googleapis.com/books/v1/volumes?q=search+terms
```

On peut spécifier les champs de recherche comme le titre ou l'auteur. D'après la documentation voici les champs que l'on peut spécifier:

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

TasteDive est une API permettant de trouver des recommandations de musiques, films, livres, autheurs etc.

> Note: les requêtes n'ont pas besoin de clé d'authentification. Mais cela limite le nombre de requêtes à 300 par heure.



#### EndPoint

Chaque requête doit etre de la forme:

```http
https://tastedive.com/api/similar?q=parameters
```

On peut spécifier les champs de recherche en paramètre. D'après la documentation voici les champs que l'on peut spécifier:

- `q`: ce que l'on veut chercher (au moins un obligatoire)
- `type`: book, band, show, podcast, movie, author
- `info`: s'il est sur 1, alors on a des informations complémentaires pour chaque item trouvé
- `limit`: le nombre maximum de recommandations (20 par défaut)
- `k`: la clé d'accès API (non obligatoire)
- `callback`: utile quand on utilise JSONP pour spécifier la fonction de retour à appeler



#### Requete:

Exemple:

Si on veut 2 recommandations pour Harry Potter et les reliques de la mort

```http
GET https://tastedive.com/api/similar?q=Harry+Potter+and+the+Deathly+Hallows&type=book&info=1&limit=2
```



#### Reponse

Si on reprend la précédente, on obtient ce résultat:

```json
{
  "Similar": {
    "Info": [
      {
        "Name": "Harry Potter And The Deathly Hallows",
        "Type": "book",
        "wTeaser": "Harry Potter and the Deathly Hallows is a fantasy novel written by British author J. K. Rowling and the seventh and final novel of the Harry Potter series. It was released on 21 July 2007 in the United Kingdom by Bloomsbury Publishing, in the United States by Scholastic, and in Canada by Raincoast Books. The novel chronicles the events directly following Harry Potter and the Half-Blood Prince (2005) and the final confrontation between the wizards Harry Potter and Lord Voldemort.Deathly Hallows shattered sales records upon release, surpassing marks set by previous titles of the Harry Potter series. It holds the Guinness World Record for most novels sold within 24 hours of release, with 8.3 million sold in the US and 2.65 million in the UK. Generally well received by critics, the book won the 2008 Colorado Blue Spruce Book Award, and the American Library Association named it the \"Best Book for Young Adults\". A film adaptation of the novel was released in two parts: Harry Potter and the Deathly Hallows – Part 1 in November 2010 and Part 2 in July 2011.",
        "wUrl": "http://en.wikipedia.org/wiki/Harry_potter_and_the_deathly_hallows",
        "yUrl": null,
        "yID": null
      }
    ],
    "Results": [
      {
        "Name": "Harry Potter And The Order Of The Phoenix",
        "Type": "book",
        "wTeaser": "Harry Potter and the Order of the Phoenix is a fantasy novel written by British author J. K. Rowling and the fifth novel in the Harry Potter series. It follows Harry Potter's struggles through his fifth year at Hogwarts School of Witchcraft and Wizardry, including the surreptitious return of the antagonist Lord Voldemort, O.W.L. exams, and an obstructive Ministry of Magic. The novel was published on 21 June 2003 by Bloomsbury in the United Kingdom, Scholastic in the United States, and Raincoast in Canada. It sold five million copies in the first 24 hours of publication. It is the longest book of the series.Harry Potter and the Order of the Phoenix won several awards, including the American Library Association Best Book Award for Young Adults in 2003. The book was also made into a 2007 film and a video game by Electronic Arts.",
        "wUrl": "http://en.wikipedia.org/wiki/Harry_Potter_and_the_Order_of_the_Phoenix",
        "yUrl": null,
        "yID": null
      },
      {
        "Name": "Harry Potter And The Prisoner Of Azkaban",
        "Type": "book",
        "wTeaser": "Harry Potter and the Prisoner of Azkaban is a fantasy novel written by British author J.K. Rowling and is the third in the Harry Potter series. The book follows Harry Potter, a young wizard, in his third year at Hogwarts School of Witchcraft and Wizardry. Along with friends Ronald Weasley and Hermione Granger, Harry investigates Sirius Black, an escaped prisoner from Azkaban, the wizard prison, believed to be one of Lord Voldemort's old allies.The book was published in the United Kingdom on 8 July 1999 by Bloomsbury and in the United States on 8 September 1999 by Scholastic, Inc. Rowling found the book easy to write, finishing it just a year after she began writing it. The book sold 68,000 copies in just three days after its release in the United Kingdom and since has sold over three million in the country. The book won the 1999 Whitbread Children's Book Award, the Bram Stoker Award, and the 2000 Locus Award for Best Fantasy Novel and was short-listed for other awards, including the Hugo.",
        "wUrl": "http://en.wikipedia.org/wiki/Harry_Potter_and_the_Prisoner_of_Azkaban",
        "yUrl": null,
        "yID": null
      }
    ]
  }
}
```



On peut voir qu'il y a 3 résultats. Le premier correspond au livre recherché, le deux suivant correspondent aux livres recommandés.  Pour chaque résultat on y trouve:

- Le nom du livre
- Le type
- Une description
- Le lien wikipedia du livre
- Un lien vers un clip youtube (musique/film/show)
- L'ID youtube du clip (musique/film/show)



## Notre API

Elle permet d'effectuer les actions suivantes:

- Création de compte
- Gestion de l’authentification
- Récupérer des informations sur un livre cherché via une barre de recherche
- Ajouter/supprimer un livre à une liste (lu, favoris, a lire)

https://app.swaggerhub.com/apis-docs/Exyos/BooksAPI/3.0.1-oas3









## Client

Techno: framework Angular + lib Bootstrap

Lorsqu'un utilisteur ouvre l'app, il aura la possibilité de:

- pouvoir se connecter/déconnecter
- pouvoir créer un compte utilisateur
- pouvoir rechercher dans une barre de recherche le titre et/ou dans une autre l’auteur d’un livre
- afficher des previews des livres correspondants à la recherche (titre et première de couverture)
- lors d’un clique sur un livre afficher le détail des informations (prix (eur), description, auteur, année d’édition, éditeur, isbn, nb de pages, catégories (fiction, théâtre …) )  ainsi que les livres recommendés avec leur informations respectives.
- pouvoir ajouter un livre à sa liste de favoris
- pouvoir ajouter un livre à sa liste de ‘Lu’
- pouvoir ajouter un livre à sa liste de ‘A lire’
- pourvoir déplacer un livre d'une liste à une autre et le supprimer d'une liste.



## Serveur

Techno: NodeJS + MongoDB

Le serveur doit:

- Gérer la création de compte utilisateur
- Gérer la connexion/déconnexion des comptes utilisateurs
- Gérer la recherche:
  - Récupérer les informations entrées par l’utilisateur dans la barre de recherche
  - Appeler l’API google pour récupérer les livres correspondants à la recherche
  - Appeler l’API tasteDive pour récupérer les auteurs recommandés pour l'auteur du livre recherché
  - Appeler l'API google pour récupérer les différents livres proposées pour les auteurs donnés par l'API tasteDive afin de créer une liste de recommandation.
  - Affecter les livres de la liste aux différentes listes de recommandatation des livres trouvés pour la recherche de l'utilisateur
  - Créer un JSON avec les infos pertinentes (voir front) et le renvoyer
- Récupérer en BDD les listes de livre enregistrés par l’utilisateur
- Ajouter un livre à sa liste de favoris à la BDD
- Ajouter un livre à sa liste de ‘Lu’ à la BDD
- Ajouter un livre à sa liste de ‘A lire’ à la BDD
- Supprimer un livre à sa liste de favoris à la BDD
- Supprimer un livre à sa liste de ‘Lu’ à la BDD
- Supprimer un livre à sa liste de ‘A lire’ à la BDD



