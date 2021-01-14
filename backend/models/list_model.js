var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const list = new Schema({
    books:[{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }]
})

module.exports = mongoose.model('Listshelf', list);