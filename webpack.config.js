var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
		template: __dirname + '/src/template.html',
		filename: 'index.html',
		inject: 'body'
	});

var config = {
	entries: process.env.NODE_ENV === 'production' ?
		[
			'./src/index'
		] : [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			'./src/index'
		],
	path: process.env.NODE_ENV === 'production' ? path.join(__dirname, 'dist') : path.join(__dirname, 'build'),
	jsloaders: process.env.NODE_ENV === 'production' ? ['babel'] : ['react-hot', 'babel'],
	plugins: process.env.NODE_ENV === 'production' ?
		[
			HTMLWebpackPluginConfig
		] : [
			HTMLWebpackPluginConfig,
			new webpack.HotModuleReplacementPlugin()
		]
};

console.log(config.entries);

module.exports = {
	devtool: 'eval',
	entry: config.entries,
	output: {
		path: config.path,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: config.jsloaders,
				include: path.join(__dirname, 'src')
			},
			{test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=./fonts/[hash].[ext]'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&&name=./fonts/[hash].[ext]'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=./fonts/[hash].[ext]'}
		]
	},
	plugins: config.plugins
};
