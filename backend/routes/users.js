var express = require('express');
var router = express.Router();
var User = require('../models/user_model');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/createAccount', function(req, res, next){
  registerToDB(req, res);
});

async function registerToDB(req, res){
  var user = new User({
      email : req.body.email,
      username : req.body.username,
      password : User.hashPassword(req.body.password),
      creationDate : Date.now()
  });

  try{
    doc = await user.save();
    return res.status(200).json(doc);
  }
  catch(err){
    return res.status(400).json(err)
  }

}

module.exports = router;
