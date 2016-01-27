'use strict';

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
module.exports = {
	entry: [
		path.resolve(__dirname, 'static/js/index.js')
	],
	resolve: {
        alias: {
          'react': pathToReact
        }
    },
	output: {
		path: path.resolve(__dirname, 'static/js'),
		filename: 'bundle.js',
		publicPath: '/static/js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/, // Only .css files
			loader: 'style!css' // Run both loaders
		}],
		noParse: [pathToReact]
	}
};
