/*eslint-disable no-unused-vars*/
var express = require('express'),
	request = require('request');

var router = express.Router();

function getUrl(id) {
	var baseUrl = 'https://public-api.wordpress.com/rest/v1.1/' +
			'sites/somehugenumber.wordpress.com/posts/';

	if (id) {
		return baseUrl + id;
	}

	return baseUrl;
}

/*
 * Parse response body for post list
 */
function parsePostList(body) {
	body = JSON.parse(body);
	return body.posts.map(function (post) {
		var postDate = new Date(post.modified);
		return {
			id: post.ID,
			slug: post.slug,
			date: [postDate.getFullYear(), postDate.getMonth() + 1, postDate.getDate()].join('-'),
			title: post.title
		};
	});
}

/*
 * Parse response body for single post
 */
function parsePost(body) {
	body = JSON.parse(body);
	return {
		id: body.ID,
		slug: body.slug,
		date: body.modified,
		title: body.title,
		content: body.content
	};
}

/*
 * GET blog post content
 */
router.get('/posts/:id', function(req, res, next) {
	request(getUrl(req.params.id), function (err, response, body) {
		if (!err && response.statusCode == 200) {
			return res.json(parsePost(body));
		} else {
			err = err || 'Error in fetching blogs!';
			return next(err);
		}
	});
});

/*
 * GET blog posts list
 */
router.get('/posts', function(req, res, next) {
	request(getUrl(), function (err, response, body) {
		if (!err && response.statusCode == 200) {
			return res.json(parsePostList(body));
		} else {
			err = err || 'Error in fetching blogs!';
			return next(err);
		}
	});
});

/*
 * GET blog index
 */
router.get('/', function(req, res, next) {
	res.render('blog', { title: 'Blog' });
});

module.exports = router;
