var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const book = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    volumeInfo: {
        authors: {type: [String]},
        categories: {type: [String]},
        subtitle: {type: String},
        thumbnail: {type: String},
        title: data.volumeInfo.title,
        description: data.volumeInfo.description,
        pageCount: data.volumeInfo.pageCount,
        publishedDate: data.volumeInfo.publishedDate,
        publisher: data.volumeInfo.publisher,
        industryIdentifiers: data.volumeInfo.industryIdentifiers,
    }
})