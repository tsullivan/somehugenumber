var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './public/app/modules/index.js',
	output: {
		filename: 'public/javascripts/bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style!css'},
			{ test: /\.scss$/, loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'},
			{ test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' },
			{ test: /\.jpg$/, loader: 'file-loader' }
		]
	},
	resolve: {
		alias: {
			'angular-ui-bootstrap': path.resolve(__dirname, './public/app/bower_components/angular-bootstrap'),
			models: path.resolve(__dirname, './models')
		}
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.ProvidePlugin({
			_: 'lodash'
		})
	]
};
