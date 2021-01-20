var User = require('../models/user_model');
var Listshelf = require('../models/list_model');
var passport = require('passport');

async function registerToDB(req, res, next) {
    var _readList = new Listshelf();
    var _favList = new Listshelf();
    var _toReadList = new Listshelf();
    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        creationDate: Date.now(),
        readList: _readList,
        favList: _favList,
        toReadList: _toReadList,
    });
    try {
        await _readList.save();
        await _favList.save();
        await _toReadList.save();
        doc = await user.save();
        return res.status(200).json(doc);
    }
    catch (err) {
        return res.status(400).json(err)
    }
}

function logInUser(req, res, next) {
    passport.authenticate('auth', function (err, user, info) {
        if (err) { return res.status(400).json(err); }
        if (!user) { return res.status(409).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(400).json(err); }
            return res.status(200).json(user.username);
        });
    })(req, res, next);
}

function logOutUser(req, res) {
    req.logout();
    return res.status(200).json({ message: "Déconnecté" });
}

function isConnectedUser(req, res, next) {
    if (req.isAuthenticated())
        next();
    else return res.status(401).json({ authenticated: false });
}

function getUserInfo(req, res) {
    User.findById((req.user._id), function (err, obj) {
        if (err) { return res.status(400).json(err) }
        if (!obj) { return res.status(404).json({ message: "utilisateur non trouvé" }) }
        return res.status(200).json(obj);
    })
}



module.exports = { isConnectedUser, registerToDB, logInUser, logOutUser, getUserInfo }
