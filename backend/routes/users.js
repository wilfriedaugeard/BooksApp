var express = require('express');
const { authenticate } = require('passport');
var router = express.Router();
var userControler = require('../controllers/user_controller')


router.post('/createAccount', userControler.registerToDB);

router.post('/login', userControler.logInUser);

router.get('/logout', userControler.isConnectedUser, userControler.logOutUser);

router.get('/check-auth', userControler.isConnectedUser, function(req, res, next){
    return res.status(200).json({authenticated : true});
});

router.get('/userInfo', userControler.isConnectedUser, function (req, res, next) {
    console.log(req.user)
    return res.status(200).json(req.user);
});

router.get('/readList', userControler.isConnectedUser, function(req, res, next){
    console.log(req.user.readList)
    return res.status(200).json(req.user.readList)
})

router.get('/favList', userControler.isConnectedUser, function(req, res, next) {
    return res.status(200).json(req.user.favList)
})

router.get('/toReadList', userControler.isConnectedUser, function(req, res, next){
    return res.status(200).json(req.user.toReadList)
})



module.exports = router;
