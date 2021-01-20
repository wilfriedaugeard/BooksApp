const fetch = require("node-fetch");

var { books, auth } = require('googleapis/build/src/apis/books');
noImage = '/assets/not-available.png';

const booksCall = books({
    version: 'v1',
    auth: auth.fromAPIKey(process.env.BOOK_API_KEY_BACK3),
});


const recommendationURL = "https://tastedive.com/api/similar";
const NB_BOOK_RESULT = 13;
const NB_RECOMMENDATION_RESULT = 10;
const NB_AUTHORS_RECOMMENDATION = 3;
const NB_RECOMMENDATION_PER_BOOK = 3;




const search = async (req, res) => {
    let result = await find(req.query);
    if (result.errors) {
        console.log(result.errors);
        return res.status(result.errors.code ? result.errors.code : 400).json(result.errors);
    }
    if (result.data.totalItems == 0) {
        return res.status(404).json({ message: 'aucun resultat' })
    }
    result = await findBookRecommendation(result);
    return res.status(200).json(result.data);
};

const find = async (query) => {
    const name = (query.name === undefined) ? '' : 'intitle:' + query.name;
    const inauthor = (query.inauthor === undefined) ? '' : 'inauthor:' + query.inauthor;
    const connector = (inauthor === '' || name === '') ? '' : '+'
    const searchQ = name + connector + inauthor;
    const result = { data: { items: [], totalItems: 0 }, errors: null };
    try {
        const requestResult = await booksCall.volumes.list({ q: searchQ, maxResults: NB_BOOK_RESULT });
        result.data = requestResult.data;
        if (!result.data.items) {
            return result;
        }
        result.data.items = result.data.items.map(book);
        // console.log(result.data.items);
    } catch (error) {
        result.errors = error;
        // console.log(result.errors);
    }
    return result;
};


const findBookRecommendation = async (result) => {
    try {
        const firstBook = result.data.items[0];
        let recommendedBooks = [];
            const byAuthorRequest = (firstBook.volumeInfo.authors) ? recommendationURL + '?q=author:' + firstBook.volumeInfo.authors[0] + '&limit=' + NB_AUTHORS_RECOMMENDATION + '&k=' + process.env.BOOK_RECO_KEY : '';
            const byGenreRequest = (firstBook.volumeInfo.categories) ? 'subject:' + firstBook.volumeInfo.categories[0] : '';
            const queryResult = await getRecommendationList(byAuthorRequest, byGenreRequest);
            recommendedBooks = queryResult;
        
        if(recommendedBooks.length > 0){
            for (const book of result.data.items) {
                for (let ind = 0; ind < NB_RECOMMENDATION_PER_BOOK; ind++) {
                    const rand = Math.floor(Math.random() * Math.floor(recommendedBooks.length));
                    book.recommendationList.push(recommendedBooks[rand]);
                }
            }
        }
    } catch (error) {
        result.error = error.errors;
    }

    return result;
};

const getRecommendationList = async (byAuthorRequest, byGenreRequest) => {
    
    const result = (byAuthorRequest === '') ? null : await authorQuery(byAuthorRequest);
    const books = [];
    if (!result || result.Similar.Results.length === 0 && byGenreRequest !== '') {
        const recommendedBooks = await recommendationByQuery(byGenreRequest);
        if (recommendedBooks.data && recommendedBooks.data.items) {
            for (let ind = 0; ind < recommendedBooks.data.items.length; ind++) {
                books.push(recommendedBooks.data.items[ind]);
            }
        }
    } else {
        for (const author of result.Similar.Results) {
            const searchQ = 'inauthor:' + author.Name;
            const recommendedBooks = await recommendationByQuery(searchQ);
            if (recommendedBooks.data && recommendedBooks.data.items) {
                for (let ind = 0; ind < recommendedBooks.data.items.length; ind++) {
                    books.push(recommendedBooks.data.items[ind]);
                }
            }
        }
    }
    return books;
};

const authorQuery = async (query) => {
    try {
        const result = await fetch(query);
        const authors = await result.json();
        return authors;

    } catch (error) {
        console.log(error.errors);
    }

};

const recommendationByQuery = async (searchQ) => {
    const result = { data: { items: [], totalItems: 0 }, errors: null };
    try {
        const requestResult = await booksCall.volumes.list({ q: searchQ, maxResults: NB_RECOMMENDATION_RESULT });
        result.data = requestResult.data;
        if (!result.data.items) {
            return result;
        }
        result.data.items = result.data.items.map(book);
    } catch (error) {
        result.errors = error;
    }
    return result;
};

const book = (data) => {
    const images = data.volumeInfo.imageLinks;

    const imageLink = images ? images.extraLarge || images.large || images.medium || images.thumbnail : noImage;

    return {
        id: data.id,
        volumeInfo: {
            authors: data.volumeInfo.authors,
            categories: data.volumeInfo.categories,
            subtitle: data.volumeInfo.subtitle,
            thumbnail: imageLink,
            title: data.volumeInfo.title,
            description: data.volumeInfo.description,
            pageCount: data.volumeInfo.pageCount,
            publishedDate: data.volumeInfo.publishedDate,
            publisher: data.volumeInfo.publisher,
            industryIdentifiers: data.volumeInfo.industryIdentifiers,
        },
        saleInfo: data.saleInfo,
        recommendationList: [],
    }
};

module.exports = { search };