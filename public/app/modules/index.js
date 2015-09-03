angular
	.module('somehugenumberApp', ['ngRoute', 'ngSanitize'])

	.controller('somehugenumberAppTest', function ($scope) {
		$scope.a = 1;
		$scope.b = 2;
	})

	.controller('MainBlogController', function ($scope, $route, $routeParams, $location) {
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
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
						$scope.posts = response.data;
					}, function (response) {
						$scope.status = response.status;
						$scope.error = 'Request failed';
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
						$scope.post = response.data;
						$scope.postContent = $sce.trustAsHtml(response.data.content);
					}, function (response) {
						$scope.status = response.status;
						$scope.error = 'Request failed';
					});
			}])

	.config(function($routeProvider) {
		$routeProvider
			.when('/:postId/:postDate/:postSlug', {
				controller: 'PostController',
				template: '<div ng-bind-html="postContent"></div>'
			});
	});
