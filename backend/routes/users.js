var express = require('express');
var router = express.Router();
var userControler = require('../controllers/user_controller');
var listControler = require('../controllers/lists_controller');



router.post('/createAccount', userControler.registerToDB);

router.post('/login', userControler.logInUser);

router.get('/logout', userControler.isConnectedUser, userControler.logOutUser);

router.get('/check-auth', userControler.isConnectedUser, function (req, res, next) {
    return res.status(200).json({ authenticated: true });
});


router.get('/userInfo', userControler.isConnectedUser, userControler.getUserInfo);

router.get('/favList', userControler.isConnectedUser, listControler.getFavList);

router.get('/readList', userControler.isConnectedUser, listControler.getReadList);

router.get('/toReadList', userControler.isConnectedUser, listControler.getToReadList);

router.put('/favList', userControler.isConnectedUser, listControler.putToFavList);

router.put('/readList', userControler.isConnectedUser, listControler.putToReadList);

router.put('/toReadList', userControler.isConnectedUser, listControler.putToToReadList);

router.delete('/favList/:id', userControler.isConnectedUser, listControler.deleteFavList, function (req, res, next) {
    console.log(req.params);
    return res.status(200).json({ ok: "okdeleteFav" });
});

router.delete('/readList/:id', userControler.isConnectedUser, listControler.deleteReadList,function (req, res, next){
    console.log(req.params);
    return res.status(200).json({ ok: "okdeleteRead" });
})

router.delete('/toReadList/:id', userControler.isConnectedUser, listControler.deleteToReadList,function (req, res, next){
    console.log(req.params);
    return res.status(200).json({ ok: "okdeleteRead" });
})

module.exports = router;
