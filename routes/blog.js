/*eslint-disable no-unused-vars*/
var express = require('express'),
	request = require('request'),
	model = require('../models/blog');

var router = express.Router();

/*
 * GET blog post content
 */
router.get(/^\/posts\/(\d+)$/, function(req, res, next) {
	var postId = req.params[0];
	request(model.getUrl(postId), function (err, response, body) {
		var post;

		if (!err && response.statusCode == 200) {
			// Retrive the data object and construct post object
			post = model.post(JSON.parse(body));

			// Create a model for the response and render as JSON
			return res.json(post);
		}

		return next(model.getError(err, response));
	});
});

/*
 * GET blog posts list
 */
router.get('/posts', function(req, res, next) {
	request(model.getUrl(), function (err, response, body) {
		var posts;

		if (!err && response.statusCode == 200) {
			// Retrive the data objects
			posts = JSON.parse(body).posts;

			// Create a model for the response and render as JSON
			return res.json(model.list(posts));
		}

		return next(model.getError(err, response));
	});
});

/*
 * GET blog index
 */
router.get('*', function(req, res, next) {
	res.render('blog', { title: 'Some Huge Number - Blog' });
});

module.exports = router;
