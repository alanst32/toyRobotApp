// karma.conf.js
var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: false,
        frameworks: ['mocha'],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack']
        },
        reporters: ['dots'],
        webpack: {
            module: {
                loaders: [
                    {
                        test: /.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ["es2015", "react", "stage-0"]
                        }
                    },
                    {
                        test: /\.css$/,
                        loader: 'style-loader'
                    },
                    {
                        test: /\.css$/,
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    {
                        test: /\.scss$/,
                        loader: "style-loader!sass-loader!css-loader"
                    },
                    {
                        test: /\.(png|jpg|gif|svg)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    outputPath: 'client/images/',
                                    name: '[name][hash].[ext]',
                                },
                            },
                        ],
                    }
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
};