var express = require('express');
var router = express.Router();
var userControler = require('../controllers/user_controller')


router.post('/createAccount', userControler.registerToDB);

router.post('/login', userControler.logInUser);


router.get('/user', userControler.isConnectedUser, function (req, res, next) {
    return res.status(200).json(req.user);
});

router.get('/logout', userControler.isConnectedUser, userControler.logOutUser);

module.exports = router;
