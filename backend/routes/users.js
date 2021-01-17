var express = require('express');
const { authenticate } = require('passport');
var router = express.Router();
var userControler = require('../controllers/user_controller');
var listControler = require('../controllers/lists_controller');
const user_model = require('../models/user_model');
// var User = require('../models/user_model');


router.post('/createAccount', userControler.registerToDB);

router.post('/login', userControler.logInUser);

router.get('/logout', userControler.isConnectedUser, userControler.logOutUser);

router.get('/check-auth', userControler.isConnectedUser, function(req, res, next){
    return res.status(200).json({authenticated : true});
});

router.get('/userInfo', userControler.isConnectedUser, userControler.getUserInfo);

router.get('/readList', userControler.isConnectedUser, listControler.getReadList);

router.get('/favList', userControler.isConnectedUser, listControler.getFavList);

router.get('/toReadList', userControler.isConnectedUser, listControler.getToReadList);

router.put('/favList/put', userControler.isConnectedUser, function(req, res, next){
    console.log(req);
    console.log(res);
    return res.status(200);
})



module.exports = router;
