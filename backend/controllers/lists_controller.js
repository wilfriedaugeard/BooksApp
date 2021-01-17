var User = require('../models/user_model');
var Listshelf = require('../models/list_model');
var Book = require('../models/book_model');
var passport = require('passport');

function getFavList(req, res, next) {
    User.findById(req.user._id).populate('favList').exec(function (err, story) {
        if (err) { return res.status(400).json(err) }
        console.log(story);
        try {
            var list = story.books
            console.log(list);
        }
        catch(error){
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
        console.log(story);
        return res.status(200).json(story.readList);
    })
}

function getToReadList(req, res, next) {
    User.findById(req.user._id).populate('toReadList').exec(function (err, story) {
        if (err) { return res.status(400).json(err) }
        console.log(story);
        return res.status(200).json(story.toReadList);
    })
}

// function putFavList(req, res, next){
//     Book.
// }

module.exports = { getFavList, getReadList, getToReadList }