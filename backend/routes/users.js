var express = require('express');
var router = express.Router();
var User = require('../models/user_model');
var passport = require('passport');


router.post('/createAccount', function (req, res, next) {
    registerToDB(req, res);
});

router.post('/login', function (req, res, next) {
    passport.authenticate('auth', function (err, user, info) {
        if (err) { return res.status(400).json(err); }
        if (!user) { return res.status(409).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(400).json(err); }
            return res.status(200).json(user.username);
        });
    })(req, res, next);
});

router.get('/user', isConnectedUser, function (req, res, next) {
    return res.status(200).json(req.user);
});

router.get('/logout', isConnectedUser, function (req, res, next) {
    req.logout();
    return res.status(200).json({message: "Déconnecté"});
});

async function registerToDB(req, res) {
    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        creationDate: Date.now()
    });
    try {
        doc = await user.save();
        return res.status(200).json(doc);
    }
    catch (err) {
        return res.status(400).json(err)
    }

}

function isConnectedUser(req, res, next) {
    if (req.isAuthenticated())
        next();
    else return res.status(401).json({ message: 'Non connecté' });
}

module.exports = router;
