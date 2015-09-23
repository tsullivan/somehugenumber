/*eslint-disable no-unused-vars*/
var express = require('express'),
	request = require('request'),
	moment = require('moment'),
	model = require('../models/blog')({moment: moment}),
	_ = require('lodash');

var router = express.Router();
var postsCache = {}; // simple memory cache

function fetchAndCache(callback) {
	request(model.getUrl(), function (err, response, body) {
		if (err || response.statusCode !== 200) {
			// oops, send back error
			return callback(model.getError(err, response));
		}

		var posts = model.list(JSON.parse(body).posts);

		// index and cache the successfully retrieved data
		postsCache = _.indexBy(posts, 'id');

		// pass back success data in callback
		callback(null, postsCache);
	});
}

/*
 * GET blog post content
 */
router.get(/^\/posts\/(\d+)$/, function(req, res, next) {
	var postId = req.params[0];

	// if in the cache, send it
	if (_.has(postsCache, postId)) {
		return res.json(postsCache[postId]);
	}

	fetchAndCache(function (err, posts) {
		if (err) {
			return next(err);
		}

		return res.json(posts[postId]);
	});
});

/*
 * GET blog posts list
 */
router.get('/posts', function(req, res, next) {
	function parseIndexedObject(obj) {
		return _.chain(obj)
			.sortBy('rawdate')
			.reverse()
			.value();
	}

	// serve from cache?
	if (_.keysIn(postsCache).length) {
		// defer refresh the cache
		process.nextTick(fetchAndCache.bind(null, function (err) {
			if (err) {
				postsCache = {}; // handle err by emptying cache
			}
		}));

		return res.json(parseIndexedObject(postsCache));
	}

	fetchAndCache(function (err, posts) {
		if (err) {
			return next(err);
		}

		return res.json(parseIndexedObject(posts));
	});
});

/*
 * GET blog index
 */
router.get('*', function(req, res, next) {
	res.render('blog', { title: 'Some Huge Number - Blog' });
});

module.exports = router;
