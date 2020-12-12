var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var user = new Schema({
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    creationDate: { type: Date, require: true },
    Readbooks: [{ type: Schema.Types.ObjectId}],
    favBooks: [{ type: Schema.Types.ObjectId}],
    toReadBooks: [{ type: Schema.Types.ObjectId}],

});

user.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

user.methods.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User', user);