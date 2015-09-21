var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'public', 'build');
var bowerPath = path.resolve(__dirname, 'app', 'bower_components');

var config = {
	devtool: false,
	entry: {
		app: path.resolve(__dirname, 'app', 'main.js'),
		vendor: [
			path.resolve(bowerPath, 'angular', 'angular.js'),
			path.resolve(bowerPath, 'angular-route', 'angular-route.js'),
			path.resolve(bowerPath, 'angular-sanitize', 'angular-sanitize.js')
		]
	},
	output: {
		path: buildPath,
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module: require('./config/webpackLoaders'),
	resolve: {
		alias: {
			'angular-ui-bootstrap': path.resolve(bowerPath, 'angular-bootstrap'),
			'models': path.resolve(__dirname, 'models')
		}
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
	]
};

module.exports = config;
