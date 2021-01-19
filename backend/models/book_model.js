var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const book = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    volumeInfo: {
        authors: { type: [String] },
        categories: { type: [String] },
        subtitle: { type: String },
        thumbnail: { type: String },
        title: { type: String },
        description: { type: String },
        pageCount: { type: Number },
        publishedDate: { type: String },
        publisher: { type: String },
        industryIdentifiers: {
            type: [{
                type: { type: String },
                identifier: { type: String }
            }]
        },
    },
    saleInfo: {
        listPrice: {
            amount: { type: Number },
            currencyCode: { type: String }
        }
    },

    //recommendationList: { type: Schema.Types.ObjectId, ref: 'Listshelf' },
    recommendationList:  [{type: Schema.Types.ObjectId, ref: 'Book'}] ,
})
module.exports = mongoose.model('Book', book);