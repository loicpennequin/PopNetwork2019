const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        __ENV__: '"' + env.NODE_ENV + '"',
        __PORT__: env.port
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fr/),
    new CleanWebpackPlugin(['public', 'src/server/views'], {
        root: path.join(__dirname, '../../../')
    })
];
