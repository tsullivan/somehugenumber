angular
	.module('somehugenumberApp', ['ngRoute'])
	.controller('somehugenumberAppTest', function ($scope) {
		$scope.a = 1;
		$scope.b = 2;
	})
	.controller('somehugenumberAppPosts', ['$scope', '$http',
			function ($scope, $http) {
				$scope.method = 'GET';
				$scope.url = '/blog/data';
				$scope.code = null;
				$scope.response = null;

				$http({method: $scope.method, url: $scope.url}).
					then(function (response) {
						$scope.status = response.status;
						$scope.posts = response.data;
					}, function (response) {
						$scope.status = response.status;
						$scope.data = response.data || 'Request failed';
					});
			}]);
