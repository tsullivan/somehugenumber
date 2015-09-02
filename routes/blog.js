/*eslint-disable no-unused-vars*/
var express = require('express'),
	request = require('request');

var router = express.Router(),
	postsUrl = 'https://public-api.wordpress.com/rest/v1.1/' +
			'sites/somehugenumber.wordpress.com/posts/';

/* Get
 * - date
 * - title
 * - content */
function parseBlogDataBody(body) {
	body = JSON.parse(body);
	return body.posts.map(function (post) {
		var postDate = new Date(post.modified);
		return {
			id: post.ID,
			slug: post.slug,
			date: [postDate.getFullYear(), postDate.getMonth() + 1, postDate.getDate()].join('-'),
			title: post.title,
			content: post.content
		};
	});
}

/*
 * GET blog articles data
 */
router.get('/data', function(req, res, next) {
	request(postsUrl, function (err, response, body) {
		if (!err && response.statusCode == 200) {
			return res.json(parseBlogDataBody(body));
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
