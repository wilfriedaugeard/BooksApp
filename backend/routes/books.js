
var { books, auth } = require('googleapis/build/src/apis/books');
var express = require('express');
var router = express.Router();
var passport = require('passport');
noImage = 'No image';


const booksCall = books({
    version: 'v1',
    auth: 'AIzaSyCWCA8yWV-_XHrYwnOgrOxQ02BCue7qU3E'
})


const find = async (query) => {
    const result = { data: { items: [], totalItems: 0 }, errors: null };
    try {
        const requestResult = await booksCall.volumes.list(query);
        result.data = requestResult.data;
        result.data.items = result.data.items.map(book);
    } catch (error) {
        result.errors = error.errors;
    }
    return result;
};

const search = async (req, res) => {
    if (!params.q) {
        return res.status(400).json();
    }
    const result = await find(params);

    if (result.errors) {
        return res.status(400).json({ errors: result.errors });
    }
    return res.status(200).json(result.data);
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
        },
    };
};


router.get('/', search);

module.exports = router;