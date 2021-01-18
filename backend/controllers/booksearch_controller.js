const fetch = require("node-fetch");
var { books, auth } = require('googleapis/build/src/apis/books');
var Listshelf = require('../models/list_model');
let authorsList = null;

noImage = '/assets/not-available.png';

const booksCall = books({
    version: 'v1',
    auth: auth.fromAPIKey(process.env.BOOK_API_KEY),
});

const recommendationURL = "https://tastedive.com/api/similar";

const search = async (req, res) => {
    //console.log('request :', req.query);
    const result = await find(req.query);
    if (result.errors) {
        return res.status(400).json({ errors: result.errors });
    }
    //console.log(result.data);
    return res.status(200).json(result.data);
};

const find = async (query) => {
    const name = (query.name === undefined) ? '' : 'intitle:' + query.name;
    const inauthor = (query.inauthor === undefined) ? '' : 'inauthor:' + query.inauthor;
    const connector = (inauthor === '' || name === '') ? '' : '+'
    const searchQ = name + connector + inauthor;
    const result = { data: { items: [], totalItems: 0 }, errors: null };
    console.log(query);
    try {
        const requestResult = await booksCall.volumes.list({ q: searchQ, maxResults: 10 });
        result.data = requestResult.data;
        result.data.items = result.data.items.map(book);
        result.data.items = result.data.items.map(addRecommendation);
    } catch (error) {
        result.errors = error;
        console.log("querry"+result.errors);
    }
    return result;
};

const addRecommendation = (element) => {
            try{
            getA(element);
            console.log('apres getA'+authorsList);
            if (authorsList.length > 0 ) element = getR(element);
            }catch(error){
            // AJOUT APPEL FONCTION RECHERCHE PAR CAT
                console.log("PAS DE REC" + error.errors);
            }
            return element;
};


function getA (element){
    const requestReco = recommendationURL + '?q=author:'+ element.volumeInfo.authors[0]+'&limit=3&k=399707-BookApp-84QCOFAE';
    fetch(requestReco)
        .then(data => data.json())
        .then (res => authorsList = res)
        .catch(error => console.error());
}


function getR(element) {
    authorsList.forEach(author =>{
        const bookR =  recommendationByAuthor(author);
        const rand =  Math.floor(Math.random() * Math.floor(5));
        console.log(bookR.data);
        if(! bookR.errors && bookR.data) {
            console.log(bookR.data.items[rand]);
            element.recommendationList.books.push(bookR.data.items[rand]);
        }
    });

    return element;
}

const recommendationByAuthor = async (author) => {
        const result = { data: { items: [], totalItems: 0 }, errors: null };
        try{
             const searchQ = 'inauthor:'+author.Name;
             const requestResult = await booksCall.volumes.list({ q: searchQ, maxResults: 5 });
             result.data = requestResult.data;
             result.data.items = result.data.items.map(book);
        }catch(error){
            result.errors = error.errors;
        }
        console.log("AVANT : "+ result.data);
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
        recommendationList : new Listshelf(),
    }
};




module.exports = { search };