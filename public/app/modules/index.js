var blogModel = require('models/blog');

angular
	.module('somehugenumberApp', ['ngRoute', 'ngSanitize'])

	.controller('MainBlogController', function ($scope, $routeParams) {
		$scope.$routeParams = $routeParams;
	})

	.config(function($routeProvider) {
		$routeProvider
			.when('/:postId/:postSlug/:postDate', {
				controller: 'PostController',
				templateUrl: 'post.html'
			})
			.otherwise({
				controller: 'ListController',
				templateUrl: 'list.html'
			});
	})

	/*
	 * List blog posts
	 */
	.controller('ListController', ['$scope', '$routeParams', '$http',
			function ($scope, $routeParams, $http) {
				$scope.$routeParams = $routeParams;

				$scope.method = 'GET';
				$scope.url = '/blog/posts';
				$scope.params = '/blog/posts';

				$http({method: $scope.method, url: $scope.url}).
					then(function (response) {
						$scope.status = response.status;
						$scope.list = blogModel.list(response.data);
					}, function (response) {
						$scope.status = response.status;
						$scope.error = blogModel.getError('Request failed');
					});
			}])

	/*
	 * Show single blog post
	 */
	.controller('PostController', ['$scope', '$routeParams', '$http', '$sce',
			function ($scope, $routeParams, $http, $sce) {
				$scope.$routeParams = $routeParams;

				$scope.method = 'GET';
				$scope.url = '/blog/posts/' + $routeParams.postId;

				$http({method: $scope.method, url: $scope.url}).
					then(function (response) {
						$scope.status = response.status;
						$scope.post = blogModel.post(response.data);
						$scope.post.content = $sce.trustAsHtml(response.data.content);
					}, function (response) {
						$scope.status = response.status;
						$scope.error = blogModel.getError('Request failed');
					});
			}]);

