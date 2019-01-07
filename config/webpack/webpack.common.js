/**
 * Common cofiguration between client-side and SSR bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */
const loaders = require('./loaders/common.js');
const plugins = require('./plugins/common.js');

module.exports = env => ({
    mode: env.NODE_ENV,
    devtool: 'inline-source-maps',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
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
