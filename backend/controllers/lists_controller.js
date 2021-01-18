var User = require('../models/user_model');
var Listshelf = require('../models/list_model');
var Book = require('../models/book_model');
var passport = require('passport');
const { exists } = require('../models/user_model');

function getFavList(req, res, next) {
    User.findById(req.user._id).populate('favList').exec(function (err, story) {
        if (err) { return res.status(400).json(err) }
        console.log(story);
        try {
            var list = story.books
            console.log(list);
        }
        catch (error) {
            console.log(error);
        }
        // Listshelf.populate(list, {'books'}).exec(function (err, story2) {
        //     console.log(story2);
        // });
        return res.status(200).json(story.favList);
    })
}

function getReadList(req, res, next) {
    User.findById(req.user._id).populate('readList').exec(function (err, story) {
        if (err) { return res.status(400).json(err) }
        // console.log(story);
        return res.status(200).json(story.readList);
    })
}

function getToReadList(req, res, next) {
    User.findById(req.user._id).populate('toReadList').exec(function (err, story) {
        if (err) { return res.status(400).json(err) }
        // console.log(story);
        return res.status(200).json(story.toReadList);
    })
}

async function putToFavList(req, res, next) {
    var bookToSave = await findOrSaveBook(req);
    
    next();
}

async function findOrSaveBook(req){
    var whichBook;
    await Book.findOne({ id: req.body.id }).exec(async function (err, obj) {
        if (err) { return res.status(400).json(err) }
        if (obj) {
            whichBook = obj;
            // console.log("oui oui" + bookToSave);
        }
        else {
            var mybook = new Book({
                id: req.body.id,
                volumeInfo: {
                    authors: req.body.volumeInfo.authors ? req.body.volumeInfo.authors : ['unknown'],
                    categories: req.body.volumeInfo.categories ? req.body.volumeInfo.categories : ['unknown'],
                    subtitle: req.body.volumeInfo.subtitle ? req.body.volumeInfo.subtitle : 'No subtitle',
                    thumbnail: req.body.volumeInfo.thumbnail ? req.body.volumeInfo.thumbnail : 'unknown',
                    title: req.body.volumeInfo.title ? req.body.volumeInfo.title : 'No title',
                    description: req.body.volumeInfo.description ? req.body.volumeInfo.description : 'No description',
                    pageCount: req.body.volumeInfo.pageCount ? req.body.volumeInfo.pageCount : 'Unknown',
                    publishedDate: req.body.volumeInfo.publishedDate ? req.body.volumeInfo.publishedDate : 'Unknown',
                    publisher: req.body.volumeInfo.publisher ? req.body.volumeInfo.publisher : 'Unknown',
                    industryIdentifiers: req.body.volumeInfo.industryIdentifiers ? req.body.volumeInfo.industryIdentifiers : [{type:'Unkown', identifier: 'Unknown'}],
                },
                saleInfo: {
                    listPrice: req.body.saleInfo.listPrice ? req.body.saleInfo.listPrice : { amount: -1, currencyCode: 'unknown' },
                },
            })
            // console.log("oui" + mybook);
            try {
                await mybook.save();
                whichBook = mybook;
            }
            catch (err) {
                console.log(err);
            }
        }
        console.log(whichBook);
        return whichBook;
    })
}

module.exports = { getFavList, getReadList, getToReadList, putToFavList }