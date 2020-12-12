var express = require('express');
var router = express.Router();
var passport = require('passport');
var bookSearchController = require('../controllers/booksearch_controller')

router.get('/search', bookSearchController.search);

module.exports = router;