/*eslint-disable no-unused-vars*/
var express = require('express'),
	request = require('request'),
	moment = require('moment'),
	model = require('../models/blog')({moment: moment}),
	_ = require('lodash');

var router = express.Router();
var postsCache = {}; // simple memory cache

function loadCache() {
	request(model.getUrl(), function (err, response, body) {
		var posts;

		if (!err && response.statusCode == 200) {
			// Retrive the data objects and cache them
			posts = model.list(JSON.parse(body).posts);
			postsCache = _.indexBy(posts, 'id');
		}
	});
}

/*
 * GET blog post content
 */
router.get(/^\/posts\/(\d+)$/, function(req, res, next) {
	var postId = req.params[0];

	// if in the cache, return early
	if (_.has(postsCache, postId)) {
		return res.json(postsCache[postId]);
	}

	request(model.getUrl(postId), function (err, response, body) {
		var post;

		if (!err && response.statusCode == 200) {
			// Retrive the data object and construct post object
			post = model.post(JSON.parse(body));

			// Create a model for the response and render as JSON
			postsCache[postId] = post;
			return res.json(post);
		}

		return next(model.getError(err, response));
	});
});

/*
 * GET blog posts list
 */
router.get('/posts', function(req, res, next) {
	// after response is sent, make a API request and cache results
	process.nextTick(loadCache);

	// serve from cache?
	if (_.keysIn(postsCache).length) {
		var cachedResponse = _.chain(postsCache).sortBy('rawdate').reverse().value();
		return res.json(cachedResponse);
	}

	// serve directly from api response, or error
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
