/**
 * Webpack config for the bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */

const path = require('path');
const merge = require('webpack-merge');
const cfg = {
    common: require(path.join(__dirname, 'config/webpack/webpack.common.js')),
    client: require(path.join(__dirname, 'config/webpack/webpack.client.js'))
};
const dotenv = require('dotenv');

dotenv.config({
    path: './config/.env'
});

module.exports = env => {
    const wpEnv = { ...env, port: process.env.PORT || 8000 };

    return merge(cfg.common(wpEnv), cfg.client(wpEnv));
};
