var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var user = new Schema({
    email: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    creationDate: { type: Date, require: true }
});

user.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

user.methods.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User', user);