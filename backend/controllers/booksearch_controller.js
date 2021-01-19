const fetch = require("node-fetch");

var { books, auth } = require('googleapis/build/src/apis/books');
noImage = '/assets/not-available.png';

const booksCall = books({
    version: 'v1',
    auth: auth.fromAPIKey(process.env.BOOK_API_KEY_BACK2),
});


const recommendationURL = "https://tastedive.com/api/similar";

const search = async (req, res) => {
    let result = await find(req.query);
    if (result.errors) {
        console.log(result.errors);
        return res.status(result.errors.code?result.errors.code:400).json(result.errors);    }
    if (result.data.totalItems == 0) {
        return res.status(404).json({ message: 'aucun resultat' })
    }
    result = await findBookReco(result);
    console.log(result);
    return res.status(200).json(result.data);
};

const find = async (query) => {
    const name = (query.name === undefined) ? '' : 'intitle:' + query.name;
    const inauthor = (query.inauthor === undefined) ? '' : 'inauthor:' + query.inauthor;
    const connector = (inauthor === '' || name === '') ? '' : '+'
    const searchQ = name + connector + inauthor;
    const result = { data: { items: [], totalItems: 0 }, errors: null };
    try {
        const requestResult = await booksCall.volumes.list({ q: searchQ, maxResults: 12 });
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



const findBookReco = async (result) => {
    try{
        const book = result.data.items[0];
        let recommendationBookList = [];
        if(book.volumeInfo.authors){
            const byAuthorRequest = recommendationURL + '?q=author:'+ book.volumeInfo.authors[0]+'&limit=3&k=399707-BookApp-84QCOFAE';
            const byGenreRequest = (book.volumeInfo.categories)? 'subject:'+book.volumeInfo.categories[0]: '';
            const recommendationBookList2 = await getRecommendationList(byAuthorRequest, byGenreRequest);
            recommendationBookList = recommendationBookList2;
        }

        for(const book of result.data.items){
            /*if(book.volumeInfo.authors){
                const byAuthorRequest = recommendationURL + '?q=author:'+ book.volumeInfo.authors[0]+'&limit=3&k=399707-BookApp-84QCOFAE';
                const byGenreRequest = (book.volumeInfo.categories)? 'subject:'+book.volumeInfo.categories[0]: '';
                const recommendationBookList = await getRecommendationList(byAuthorRequest, byGenreRequest);
                book.recommendationList=recommendationBookList;
            }*/
            for(let ind =0; ind < 3 ; ind++){

                const rand =  Math.floor(Math.random() * Math.floor(recommendationBookList.length));
                book.recommendationList.push(recommendationBookList[rand]);
            }
        }
    }catch(error){
        result.error = error.errors;
    }

    return result;
};

const getRecommendationList = async (byAuthorRequest,byGenreRequest) => {
        const result = await authorQuery(byAuthorRequest);
        const books = [];
        if(result.Similar.Results.length === 0 && byGenreRequest !==''){
            const book = await recommendationByQuery(byGenreRequest);
            if(book.data && book.data.items){
                /*for(let ind =0 ; ind <3 && ind!=book.data.items.length; ind++){
                    books.push(book.data.items[ind]);
                }*/
                for(let ind =0; ind < book.data.items.length ; ind++){
                    books.push(book.data.items[ind]);
                }

            }
        }else{

            for(const author of result.Similar.Results){
                const searchQ = 'inauthor:'+author.Name;
                const book =  await recommendationByQuery(searchQ);
                if(book.data && book.data.items){
                   // const rand =  Math.floor(Math.random() * Math.floor(book.data.items.length));
                    //books.push(book.data.items[rand]);
                    for(let ind =0; ind < book.data.items.length ; ind++){
                        books.push(book.data.items[ind]);
                    }
                }
            }
        }
        return books;
};

const authorQuery = async (query) => {
    try{
    const res = await fetch(query);
    const authors = await res.json();
    return authors;

    }catch (error){
        console.log(error.errors);
    }
        
};

const recommendationByQuery = async (searchQ) => {
    const result = { data: { items: [], totalItems: 0 }, errors: null };
    try {
        const requestResult = await booksCall.volumes.list({ q: searchQ, maxResults: 5});
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