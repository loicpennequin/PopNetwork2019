import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './../../../webpack.config.js';
import logger from './../logger';
import express from 'express';

async function build() {
    logger.debug('Building React app...');
    const webpackApp = express();
    let instance, compiler;
    const _build = () =>
        new Promise(resolve => {
            compiler = webpack(
                webpackConfig({
                    NODE_ENV: process.env.NODE_ENV,
                    PORT: process.env.PORT
                })
            );

            instance = webpackDevMiddleware(compiler, {
                noInfo: false,
                publicPath: '/',
                quiet: false,
                stats: 'errors-only',
                writeToDisk: true,
                serverSideRender: true
            });

            instance.waitUntilValid(() => {
                console.log('React app build done.');
                resolve();
            });
        });

    await _build();

    webpackApp.use(instance);
    webpackApp.use(webpackHotMiddleware(compiler));
    const port = parseInt(process.env.PORT, 10) + 1;
    webpackApp.listen(port, () => {
        console.log('webpack dev middleware listening on port ' + port);
    });

    return webpackApp;
}

export default build;
