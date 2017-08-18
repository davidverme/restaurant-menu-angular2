'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;

const rootDir = path.resolve(__dirname, '..');

module.exports = {
    debug: true,
    devServer: {
        contentBase: path.resolve(rootDir, 'dist'),
        port: 9000,
        inline: true
    },
    devtool: 'source-map',
    entry: {
        app: [ path.resolve(rootDir, 'src', 'bootstrap') ],
        vendor: [ path.resolve(rootDir, 'src', 'vendor') ]
    },
    module: {
        loaders: [
            { loader: 'raw', test: /\.(css|html)$/ },
            { exclude: /node_modules/, loader: 'ts', test: /\.ts$/ },
            { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, 'dist')
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new ChunkWebpack({
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
            name: 'vendor'
        }),
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(rootDir, 'src', 'index.html')
        })
    ],
    resolve: {
        extensions: [ '', '.js', '.ts']
    }
};