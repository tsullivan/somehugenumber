require('./blog');

angular
	.module('somehugenumberApp')

	.controller('MainBlogController', function ($scope, $route, $routeParams, $location) {
		$scope.$route = $route;
		$scope.$location = $location;
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
	});
