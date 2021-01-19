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

router.get('/check-auth', userControler.isConnectedUser, function (req, res, next) {
    return res.status(200).json({ authenticated: true });
});

// TODO : List route ?
router.get('/userInfo', userControler.isConnectedUser, userControler.getUserInfo);

router.get('/favList', userControler.isConnectedUser, listControler.getFavList);

router.get('/readList', userControler.isConnectedUser, listControler.getReadList);

router.get('/toReadList', userControler.isConnectedUser, listControler.getToReadList);

router.put('/favList/put', userControler.isConnectedUser, listControler.putToFavList, function (req, res, next) {
    return res.status(200).json({ ok: "okPutFav" });
});

router.put('/readList/put', userControler.isConnectedUser, listControler.putToReadList,function (req, res, next){
    return res.status(200).json({ ok: "okPutRead" });
})

router.put('/toReadList/put', userControler.isConnectedUser, listControler.putToToReadList,function (req, res, next){
    return res.status(200).json({ ok: "okPutRead" });
})

router.delete('/favList/delete/:id', userControler.isConnectedUser, listControler.deleteFavList, function (req, res, next) {
    console.log(req.params);
    return res.status(200).json({ ok: "okdeleteFav" });
});

router.delete('/readList/delete/:id', userControler.isConnectedUser, listControler.deleteReadList,function (req, res, next){
    console.log(req.params);
    return res.status(200).json({ ok: "okdeleteRead" });
})

router.delete('/toReadList/delete/:id', userControler.isConnectedUser, listControler.deleteToReadList,function (req, res, next){
    console.log(req.params);
    return res.status(200).json({ ok: "okdeleteRead" });
})

module.exports = router;
