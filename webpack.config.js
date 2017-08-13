'use strict';

const path = require('path');

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = './src/index.js'
    config.output = {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    };

    config.devtool = 'inline-source-map';

    config.module = {
        rules: [{
		        test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: /node_modules/
        },
        {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
        },
        {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
        },
        {
                test: /\.html$/,
                loader: 'raw-loader'
        }]
    };

    config.plugins = [
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        })
    ];

	config.plugins.push(
          new HtmlWebpackPlugin({
              template: './src/index.html',
              inject: 'body'
          }),

          // Reference: https://github.com/webpack/extract-text-webpack-plugin
          // Extract css files
          // Disabled when in test mode or not in build mode
          new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true})
    );

    config.devServer = {
        contentBase: './src',
        stats: 'minimal'
    };

    return config;
}();