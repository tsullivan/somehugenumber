/*eslint-disable no-unused-vars*/
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Some Huge Number' });
});


module.exports = router;
