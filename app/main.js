require('!style!css!less!./custom-bootstrap.less'); // bootstrap custom theme
require('./style.css'); // site-wide style

var blogModel = require('models/blog');

angular
	.module('somehugenumberApp', ['ngRoute', 'ngSanitize'])

	.controller('MainBlogController', function ($scope, $routeParams) {
		var vm = this;
		require('./blog.sass'); // blog-specific style
		vm.$routeParams = $routeParams;
	})

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/:postId/:postSlug/:postDate', {
				controller: 'PostController as post',
				templateUrl: 'post.html'
			})
			.otherwise({
				controller: 'ListController as list',
				templateUrl: 'list.html'
			});

			$locationProvider.html5Mode(true);
	})

	/*
	 * List blog posts
	 */
	.controller('ListController', ['$scope', '$routeParams', '$http',
			function ($scope, $routeParams, $http) {
				var vm = this;
				vm.$routeParams = $routeParams;

				vm.method = 'GET';
				vm.url = '/blog/posts';
				vm.params = '/blog/posts';

				$http({method: vm.method, url: vm.url}).
					then(function (response) {
						vm.status = response.status;
						vm.list = blogModel.list(response.data);
					}, function (response) {
						vm.status = response.status;
						vm.error = blogModel.getError('Request failed');
					});
			}])

	/*
	 * Show single blog post
	 */
	.controller('PostController', ['$scope', '$routeParams', '$http', '$sce',
			function ($scope, $routeParams, $http, $sce) {
				var vm = this;
				vm.$routeParams = $routeParams;

				vm.method = 'GET';
				vm.url = '/blog/posts/' + $routeParams.postId;

				$http({method: vm.method, url: vm.url}).
					then(function (response) {
						var post = blogModel.post(response.data);
						vm.status = response.status;
						vm.title = post.title;
						vm.longdate = post.longdate;
						vm.content = $sce.trustAsHtml(response.data.content);
					}, function (response) {
						vm.status = response.status;
						vm.error = blogModel.getError('Request failed');
					});
			}]);

