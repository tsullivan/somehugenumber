/*eslint-disable no-unused-vars*/
var express = require('express'),
	request = require('request'),
	model = require('../models/blog');

var router = express.Router();

/*
 * GET blog post content
 */
router.get('/posts/:id', function(req, res, next) {
	request(model.getUrl(req.params.id), function (err, response, body) {
		if (!err && response.statusCode == 200) {
			// Create a model for the response and render as JSON
			return res.json(model.post(body).parsePostJson());
		}

		return next(model.getError(err, response));
	});
});

/*
 * GET blog posts list
 */
router.get('/posts', function(req, res, next) {
	request(model.getUrl(), function (err, response, body) {
		if (!err && response.statusCode == 200) {
			// Create a model for the response and render as JSON
			return res.json(model.list(body).parseListJson());
		}

		return next(model.getError(err, response));
	});
});

/*
 * GET blog index
 */
router.get('/', function(req, res, next) {
	res.render('blog', { title: 'Blog' });
});

module.exports = router;
