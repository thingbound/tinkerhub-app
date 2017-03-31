const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        proxy: {
            '/v1': process.env.API || 'http://localhost:10000'
        }
    },
    entry: [
        path.join(__dirname, '../index.web.js')
    ],
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(react-)).*/,
                include: [
                    path.resolve(__dirname, '../shared'),
                    path.resolve(__dirname, '../')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                loader: 'url-loader',
                query: { name: '[name].[hash:16].[ext]' }
            },
            {
                test: /\.ttf$/,
                loader: 'url-loader',
                include: path.resolve(__dirname, '../node_modules/react-native-vector-icons')
            }
        ]
    },
    output: {
        path: path.join(__dirname, '../static/build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../app')
        ],
        alias: {
            'react-native': 'react-native-web'
        },
        extensions: [ '.web.js', '.js' ]
    }
}
