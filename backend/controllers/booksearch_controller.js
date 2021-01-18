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
<<<<<<< HEAD
        console.log("avant");
        /*result.data.items.forEach(function(element,index){

            const requestReco = recommendationURL + '?q=author:'+ this[index].volumeInfo.authors[0]+'&limit=3';
            console.log('reco' + requestReco);
           /* fetch(requestReco)
            .then(data => {return data.json()})
            .then (res => {
                    res.items.forEach(author =>{
                        book.recommendationList.push(recommandation(author));
                        System.out.println(book.recommendationList);
                    });
               });
         });*/
         console.log("apres");

=======
        // console.log(result.data.items);
>>>>>>> 92e77e01e69aa0265990b1d133115697532e8400
    } catch (error) {
        result.errors = error;
        console.log(result.errors);
    }
    return result;
};


const recommendation = async (author) => {
        const reco = {data: {item:[], totalItems:0}, errors: null};
        try{
             const recoResult = await booksCall.volumes.list({q : 'inauthor:'+ author.name, maxResults: 1});
             reco.data = recoResult.data;
             reco.data.item = reco.data.item.map(books)
             book.recommendationList.push(reco);
        }catch(error){
            reco.errors = errors.errors;
        }
        console.log('reco ' +reco.data);
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
            industryIdentifiers: data.volumeInfo.industryIdentifiers
        },
<<<<<<< HEAD
        saleInfo: {
            listPrice: {
                amount: data.saleInfo.listPrice.amount,
                currencyCode: data.saleInfo.listPrice.currencyCode
            }
        },
        recommendationList : new Listshelf()
=======
        saleInfo: data.saleInfo,
>>>>>>> 92e77e01e69aa0265990b1d133115697532e8400
    }
};



module.exports = { search };