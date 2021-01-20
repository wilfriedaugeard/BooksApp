var Listshelf = require('../models/list_model');
var Book = require('../models/book_model');


function getFavList(req, res) {
    Listshelf.findById(req.user.favList).populate('books').exec(function (err, story) {
        if (err) {
            return res.status(400).json(err)
        }
        return res.status(200).json(story);
    })
}

function getReadList(req, res) {
    Listshelf.findById(req.user.readList).populate('books').exec(function (err, story) {
        if (err) {
            return res.status(400).json(err)
        }
        return res.status(200).json(story);
    })
}

function getToReadList(req, res) {
    Listshelf.findById(req.user.toReadList).populate('books').exec(function (err, story) {
        if (err) {
            return res.status(400).json(err)
        }
        return res.status(200).json(story);
    })
}

async function putToFavList(req, res) {
    await findOrSaveBook(req, async function (err, obj) {
        if (err) { return res.status(400).json(err) }
        await Listshelf.findByIdAndUpdate(req.user.favList._id, { $addToSet: { books: obj } });
        return res.status(200).json({ok : 'ok'})
    });
}

async function putToReadList(req, res) {
    await findOrSaveBook(req, async function (err, obj) {
        if (err) { return res.status(400).json(err) }
        Listshelf.find({ _id: req.user.toReadList, books:{$in :[obj._id]}}).countDocuments(async function (err, nb){
            await Listshelf.findByIdAndUpdate(req.user.toReadList._id, { $pull: { books: obj._id } });
        })
        await Listshelf.findByIdAndUpdate(req.user.readList._id, { $addToSet: { books: obj } });
        return res.status(200).json({ok : 'ok'})
    });
}

async function putToToReadList(req, res) {
    await findOrSaveBook(req, async function (err, obj) {
        if (err) { return res.status(400).json(err) }
        Listshelf.find({ _id: req.user.readList, books:{$in :[obj._id]}}).countDocuments(async function (err, nb){
            await Listshelf.findByIdAndUpdate(req.user.readList._id, { $pull: { books: obj._id } });
        })
        await Listshelf.findByIdAndUpdate(req.user.toReadList._id, { $addToSet: { books: obj } });
        return res.status(200).json({ok : 'ok'})
    });
}

async function deleteFavList(req, res, next) {
    try{
    await Listshelf.findByIdAndUpdate(req.user.favList._id, { $pull: { books: req.params.id } });
    }
    catch(error){
        return res.status(400).json(error);
    }
    next();
}

async function deleteReadList(req, res, next) {
    try{
    await Listshelf.findByIdAndUpdate(req.user.readList._id, { $pull: { books: req.params.id } });
    }
    catch(error){
        return res.status(400).json(error);
    }
    next();
}

async function deleteToReadList(req, res, next) {
    try{
    await Listshelf.findByIdAndUpdate(req.user.toReadList._id, { $pull: { books: req.params.id } });
    }
    catch(error){
        return res.status(400).json(error);
    }
    next();
}


async function findOrSaveBook(req, callback) {
    await Book.findOne({ id: req.body.id }, async function (err, obj) {
        if (err) { return callback(err, null); }
        if (obj) { return callback(null, obj); }
        else {
            try {
                const mybook = new Book({
                    id: req.body.id,
                    volumeInfo: {
                        authors: req.body.volumeInfo.authors ? req.body.volumeInfo.authors : ['unknown'],
                        categories: req.body.volumeInfo.categories ? req.body.volumeInfo.categories : ['unknown'],
                        subtitle: req.body.volumeInfo.subtitle ? req.body.volumeInfo.subtitle : 'No subtitle',
                        thumbnail: req.body.volumeInfo.thumbnail ? req.body.volumeInfo.thumbnail : 'unknown',
                        title: req.body.volumeInfo.title ? req.body.volumeInfo.title : 'No title',
                        description: req.body.volumeInfo.description ? req.body.volumeInfo.description : 'No description',
                        pageCount: req.body.volumeInfo.pageCount ? req.body.volumeInfo.pageCount : -1,
                        publishedDate: req.body.volumeInfo.publishedDate ? req.body.volumeInfo.publishedDate : 'Unknown',
                        publisher: req.body.volumeInfo.publisher ? req.body.volumeInfo.publisher : 'Unknown',
                        industryIdentifiers: req.body.volumeInfo.industryIdentifiers ? req.body.volumeInfo.industryIdentifiers : [{ type: 'Unkown', identifier: 'Unknown' }],
                    },
                    saleInfo: {
                        listPrice: req.body.saleInfo.listPrice ? req.body.saleInfo.listPrice : { amount: -1, currencyCode: 'unknown' },
                    },
                })
                await mybook.save();
                return callback(null, mybook);
            }
            catch (err) {
                return callback(err, null);
            }
        }
    });
}

module.exports = { getFavList, getReadList, getToReadList, putToFavList, putToReadList, putToToReadList, deleteFavList, deleteReadList, deleteToReadList }