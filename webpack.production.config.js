/*
 * Build config for production
 * Overrides config for dev environment
 */
var config = require('./webpack.config');
var path = require('path');
var bowerPath = path.resolve(__dirname, 'app', 'bower_components');

// turn off source maps
config.devtool = false;

// use "pre-minified" library code
config.entry.vendor = [
	path.resolve(bowerPath, 'angular', 'angular.js'),
	path.resolve(bowerPath, 'angular-route', 'angular-route.js'),
	path.resolve(bowerPath, 'angular-sanitize', 'angular-sanitize.js')
];

module.exports = config;
