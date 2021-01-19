var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const user = new Schema({
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    creationDate: { type: Date, require: true },
    readList: { type: Schema.Types.ObjectId, ref: 'Listshelf' },
    favList: { type: Schema.Types.ObjectId, ref: 'Listshelf' },
    toReadList: { type: Schema.Types.ObjectId, ref: 'Listshelf' },

});

user.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

user.methods.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User', user);