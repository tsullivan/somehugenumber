var express = require('express'),
	request = require('request');

var router = express.Router(),
	blogPostsUrl = 'https://public-api.wordpress.com/rest/v1.1/' +
			'sites/somehugenumber.wordpress.com/posts/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get
 * - date
 * - title
 * - content */
function parseBlogDataBody(body) {
	body = JSON.parse(body);
	return body.posts.map(function (post) {
		return {
			id: post.ID,
			slug: post.slug,
			date: post.modified,
			title: post.title,
			content: post.content
		};
	});
}

/*
 * GET blog articles data
 */
router.get('/blog-data', function(req, res, next) {
	request(blogPostsUrl, function (err, response, body) {
		if (!err && response.statusCode == 200) {
			return res.json(parseBlogDataBody(body));
		} else {
			err = err || 'Error in fetching blogs!';
			return next(err);
		}
	})
});

module.exports = router;
