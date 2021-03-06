import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './../../../webpack.config.js';
import express from 'express';
import Loadable from 'react-loadable';
import logger from './../logger';

async function build() {
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
                publicPath: '/',
                serverSideRender: true,
                stats: 'minimal',
                writeToDisk: filePath => filePath.endsWith('ssr.js')
            });

            instance.waitUntilValid(() => {
                resolve();
            });
        });

    await _build();

    webpackApp.use(instance);
    webpackApp.use(webpackHotMiddleware(compiler));

    await Loadable.preloadAll();

    const port = parseInt(process.env.PORT, 10) + 1;
    webpackApp.listen(port, () => {
        logger.debug(
            '===========webpack dev middleware listening on port ' + port
        );
    });

    return webpackApp;
}

export default build;
