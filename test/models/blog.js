var assert = require('assert'),
	model = require('../../models/blog');

context('helper methods', function () {
	describe('url', function () {
		it('gets url for list', function (done) {

			var postsUrl = model.getUrl();

			assert.equal(postsUrl,
				'https://public-api.wordpress.com/rest/v1.1/sites/somehugenumber.wordpress.com/posts/');

			done();
		});

		it('gets url for post', function (done) {
			var postsUrl = model.getUrl(22);

			assert.equal(postsUrl,
				'https://public-api.wordpress.com/rest/v1.1/sites/somehugenumber.wordpress.com/posts/22');

			done();
		});
	});

	describe('error', function () {
		var fullReponse = {body: {results: 2}};

		it('returns given error', function (done) {
			var anError = new Error('oh shit');

			assert.deepEqual(model.getError(anError, fullReponse), anError);

			done();
		});

		it('returns full response as an error if no error is given', function (done) {
			var errorFromResponse = new Error(JSON.stringify(fullReponse));

			assert.deepEqual(model.getError(undefined, fullReponse), errorFromResponse);

			done();
		});
	});
});

context('post', function () {
	describe('helper methods', function () {
		var postObj = {
			date: '2015-09-08T23:08:29.000-0700' // is a string because value comes from JSON
		};

		it('gets date strings from the undecorated post object', function (done) {
			var dateStrings = model.getPostDateStrings(postObj);

			assert.equal(dateStrings.shortdate, '09-08-15');
			assert.equal(dateStrings.longdate, 'September 8th 2015, 11:08:29 pm');

			done();
		});

		it('returns date strings already set on the decorated post object', function (done) {
			postObj.shortdate = 'this is shortdate';
			postObj.longdate = 'this is longdate';

			var dateStrings = model.getPostDateStrings(postObj);

			assert.equal(dateStrings.shortdate, 'this is shortdate');
			assert.equal(dateStrings.longdate, 'this is longdate');

			done();
		});
	});

	describe('constructor', function () {
		var postObj = {
				id: 22,
				slug: 'this is slug',
				title: 'this is title',
				content: 'this is content',
				rawdate: '2015-09-08T23:08:29.000-0700',
				date: '2015-09-08T23:08:29.000-0700'
			},
			expectedPostModel = {
				id: 22,
				slug: 'this is slug',
				title: 'this is title',
				content: 'this is content',
				shortdate: '09-08-15',
				rawdate: '2015-09-08T23:08:29.000-0700',
				longdate: 'September 8th 2015, 11:08:29 pm'
			};

		it('creates a standard post object from server-side options', function (done) {
			var postModel = model.post(postObj);

			assert.deepEqual(postModel, expectedPostModel);

			done();
		});

		it('creates a standard post object from client-side options', function (done) {
			postObj.ID = 22;

			var postModel = model.post(postObj);

			assert.deepEqual(postModel, expectedPostModel);

			done();
		});
	});
});
