var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'public', 'build');
var bowerPath = path.resolve(__dirname, 'app', 'bower_components');

var config = {
	devtool: 'eval',
	entry: {
		app: [
			path.resolve(__dirname, 'app', 'main.js')
		],
		vendor: [
			path.resolve(bowerPath, 'angular', 'angular.min.js'),
			path.resolve(bowerPath, 'angular-route', 'angular-route.min.js'),
			path.resolve(bowerPath, 'angular-sanitize', 'angular-sanitize.min.js')
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
			'models': path.resolve(__dirname, 'models')
		}
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
	]
};

module.exports = config;
