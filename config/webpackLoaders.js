module.exports = {
	loaders: [
		{ test: /\.css$/, loader: 'style!css'},
		{ test: /\.sass$/, loader: 'style!css!sass?indentedSyntax'}
	]
};
