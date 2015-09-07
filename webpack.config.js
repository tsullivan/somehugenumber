var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './public/app/modules/index.js',
	output: {
		filename: 'public/javascripts/bundle.js'
	},
	module: {
		loaders: [
		// if you're going to do both ng-cache and normal html loading, comment out the two loaders 
		// and explicitly write the loader type yourself, e.g. require('html!./blah.html') or require('ng-cache!./blah.html')
		// { test: /\.html$/, loader: 'ng-cache-loader' },
		// { test: /\.html$/, loader: 'html-loader' },
		{ test: /\.css$/, loader: 'style!css'},
		{ test: /\.scss$/, loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'},
		{ test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' },
		{ test: /\.jpg$/, loader: 'file-loader' }
		]
	},
	resolve: {
		alias: {
			lodash: path.resolve(__dirname, './public/app/bower_components/lodash/lodash.custom.min.js'),
			models: path.resolve(__dirname, './public/app/modules/common/models')
		}
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.ProvidePlugin({
			_: 'lodash'
		// }),
		// uncomment for production. comment out during dev
		// new webpack.optimize.UglifyJsPlugin({
		// 	mangle: false
		}) 
	]
};
