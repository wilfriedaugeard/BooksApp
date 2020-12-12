var User = require('../models/user_model');

async function registerToDB(req, res, next) {
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

module.exports = { isConnectedUser, registerToDB }
