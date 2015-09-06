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
	 * Format some nice date strings, or return already-formatted date strings
	 * @param postObj - object with .date attribute
	 */
	getPostDateStrings: function (postObj) {
		var momentDate;

		if (!postObj.shortdate || !postObj.longdate) {
			momentDate = moment(postObj.date);

			// formatted dates have not yet been created
			return {
				shortdate: momentDate.format('MM-DD-YY'),
				longdate: momentDate.format('MMMM Do YYYY, h:mm:ss a')
			};
		}

		// formatted dates have already been created
		return {
			shortdate: postObj.shortdate,
			longdate: postObj.longdate
		};
	},

	/*
	 * Maintains list objects
	 * @param results: response of set of posts
	 */
	list: function (results) {
		var self = this;

		return results.map(function (postObj) {
			return self.post(postObj);
		});
	},

	/*
	 * Defines post model
	 * @param post: response of post body, with content, etc
	 */
	post: function (postObj) {
		var dateStrings,
			baseObj = {
				slug: postObj.slug,
				title: postObj.title,
				content: postObj.content
			};

		// decorate object with nice date strings
		dateStrings = this.getPostDateStrings(postObj);
		baseObj.shortdate = dateStrings.shortdate;
		baseObj.longdate = dateStrings.longdate;

		// account for API capitalization of ID attribute
		baseObj.id = postObj.ID ? postObj.ID : postObj.id;

		return baseObj;
	}
};
