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
            'react-contextual': path.resolve(__dirname, './../../tools/forks/react-contextual')
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
    stats: 'minimal',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
});
