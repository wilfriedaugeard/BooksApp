const fetch = require("node-fetch");
var { books, auth } = require('googleapis/build/src/apis/books');
var Listshelf = require('../models/list_model');

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
                const requestReco = recommendationURL + '?q=author:'+ element.volumeInfo.authors[0]+'&limit=3';
                fetch(requestReco)
                .then(data => {return data.json()})
                .then (res => {
                    if(res.Similar){
                        res.Similar.Results.forEach(author =>{
                            const bookR =  recommendationByAuthor(author);
                            if(bookR.item) element.recommendationList.books.push(bookR.item[0]);
                        });
                    }
                });
            }catch(error){
                console.log("author"+ error.errors);
            }
            return element;
};

const recommendationByAuthor = async (author) => {
        const reco = {data: {item:[], totalItems:0}, errors: null};
        try{
             const recoResult = await booksCall.volumes.list({q : 'inauthor:'+ author.Name, maxResults: 5});
             reco.data = recoResult.data;
             reco.data.item = reco.data.item.map(book);
        }catch(error){
            reco.errors = error.errors;
        }
        return reco;
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