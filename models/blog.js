var moment = require('moment');

module.exports = {
	getUrl: function (id) {
		var baseUrl = 'https://public-api.wordpress.com/rest/v1.1/' +
				'sites/somehugenumber.wordpress.com/posts/';

		if (id) {
			// fetch specific blog post
			return baseUrl + id;
		}

		// fetch set of blog posts
		return baseUrl;
	},

	getError: function (err, response) {
		if (err) {
			return err;
		}

		return new Error(JSON.stringify(response));
	},

	/*
	 * Maintains list objects
	 * @param results: response of set of posts
	 */
	list: function (results) {
		var self = this;

		return {
			parseListJson: function () {
				results = JSON.parse(results);

				return results.posts.map(function (postObj) {
					return self.post(postObj).parsePost();
				});
			}
		};
	},

	/*
	 * Maintains post objects
	 * @param post: response of post body, with content, etc
	 */
	post: function (postObj) {
		return {
			parsePostJson: function () {
				postObj = JSON.parse(postObj);
				return this.parsePost();
			},

			parsePost: function() {
				return {
					id: postObj.ID,
					slug: postObj.slug,
					shortdate: moment(postObj.date).format('MM-DD-YY'),
					date: moment(postObj.date).format('MMMM Do YYYY, h:mm:ss a'),
					title: postObj.title,
					content: postObj.content
				};
			}
		};
	}
};
