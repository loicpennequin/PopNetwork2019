const path = require('path');
const webpack = require('webpack');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

const loaders = require('./loaders/client.js');
const plugins = require('./plugins/client.js');

const entryPath = env => ({
    development: [
        `webpack-hot-middleware/client?path=http://localhost:${parseInt(
            env.port,
            10
        ) + 1}/__webpack_hmr`,
        path.resolve(__dirname, '../../src/client/index.js')
    ],
    production: path.resolve(__dirname, '../../src/client/index.js')
});

module.exports = env => ({
    target: 'web',
    entry: {
        app: entryPath(env)[env.NODE_ENV]
    },
    output: {
        path: path.resolve(__dirname, '../../public'),
        chunkFilename: '[name].js'
    },
    module: {
        rules: loaders(env)
    },
    plugins: plugins(env),
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            env.NODE_ENV === 'production' &&
                new UglifyWebpackPlugin({
                    uglifyOptions: {
                        compress: {
                            collapse_vars: false
                        }
                    }
                })
        ].filter(plugin => plugin !== false)
    }
});
