/**
 * Webpack config for the bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    return {
        mode: 'development',
        target: 'web',
        devtool: 'inline-source-maps',
        entry: {
            profile: path.resolve(__dirname, 'profile/index.js'),
            dashboard: path.resolve(__dirname, 'dashboard/index.js'),
        },
        output: {
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            historyApiFallback: {
                rewrites: [
                    { from: /^\/$/, to: '/dashboard.html' },
                    { from: /^\/profile/, to: '/profile.html' }
                ]
            },
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true
                        }
                    }
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.sass$/,
                    use: [
                        'css-hot-loader',
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['public/*']),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'profile/profile.html'),
                filename: 'profile.html',
                inject: 'body',
                chunks: ['profile']
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'dashboard/dashboard.html'),
                filename: 'dashboard.html',
                inject: 'body',
                chunks: ['dashboard']
            }),
        ]
    };
};
