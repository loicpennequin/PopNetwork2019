/**
 * Common cofiguration between client-side and SSR bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */
const loaders = require('./loaders/common.js');
const plugins = require('./plugins/common.js');
const path = require('path');

module.exports = env => ({
    mode: env.NODE_ENV,
    devtool: 'inline-source-maps',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
            'daria-store': path.resolve(
                __dirname,
                './../../src/client/components/Store'
            ),
            'components': path.resolve(
                __dirname,
                './../../src/client/components'
            ),
            'resources': path.resolve(
                __dirname,
                './../../src/client/resources'
            ),
            'pages': path.resolve(
                __dirname,
                './../../src/client/pages'
            ),
        }
    },
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: loaders(env)
    },
    plugins: plugins(env),
    stats: 'minimal'
});
