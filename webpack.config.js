var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		app: './public/app/modules/index.js',
		vendor: [
			'./public/app/bower_components/angular/angular.min.js',
			'./public/app/bower_components/angular-route/angular-route.min.js',
			'./public/app/bower_components/angular-sanitize/angular-sanitize.min.js'
		]
	},
	output: {
		filename: 'public/javascripts/bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style!css'}
		]
	},
	resolve: {
		alias: {
			'angular-ui-bootstrap': path.resolve(__dirname, './public/app/bower_components/angular-bootstrap'),
			'models': path.resolve(__dirname, './models')
		}
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'public/javascripts/vendor.js')
	]
};
