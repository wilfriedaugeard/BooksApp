var express = require('express');
var router = express.Router();
var userControler = require('../controllers/user_controller')


router.post('/createAccount', userControler.registerToDB);

router.post('/login', userControler.logInUser);


router.get('/userInfo', userControler.isConnectedUser, function (req, res, next) {
    console.log(req.user)
    return res.status(200).json(req.user);
});

router.get('/readList', userControler.isConnectedUser, function(req, res, next){
    console.log("coucou")
    console.log(req.user.readList)
    return res.status(200).json(req.user.readList)
})

router.get('/favList', userControler.isConnectedUser, function(req, res, next) {
    return res.status(200).json(req.user.favList)
})

router.get('/toReadList', userControler.isConnectedUser, function(req, res, next){
    return res.status(200).json(req.user.toReadList)
})


router.get('/logout', userControler.isConnectedUser, userControler.logOutUser);

module.exports = router;
