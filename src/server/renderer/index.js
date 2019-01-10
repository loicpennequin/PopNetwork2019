import React from 'react';
import { renderToString } from 'react-dom/server';
import logger from './../logger';
import isObject from 'is-object';
import { cfg } from './../../../config';
import template from './template.js';
import build from './webpack.js';
import Loadable from 'react-loadable';

class ReactRenderer {
    constructor() {
        this.appPath = cfg.APP.SSR_BUNDLE__PATH;
        // config.routes.forEach(route => {
        //     this.app.get(
        //         route.path,
        //         async (req, res) => await this.render(req, res)
        //     );
        // });
        // this.config = config;
    }

    async build(app) {
        logger.debug('================BUILDING REACT APP');
        const webpackApp = await build();
        logger.debug('================REACT APP BUILD SUCCESSFUL');
        // @TODO : handle client-side routes
        webpackApp.get('/', this.render.bind(this));
        app.use(webpackApp);
    }

    async render(req, res) {
        // @TODO: handle initialState fetching
        // @TODO : handle client-side routes
        // @TODO: redirect if route is protected and request isn't authenticated

        if (process.env.NODE_ENV === 'development') {
            delete require.cache[this.appPath];
        }

        const { default: App } = require(this.appPath);
        const assets = this._getAssets(res.locals);
        const routes = [];
        const loadables = [];
        const markup = renderToString(
            <Loadable.Capture report={moduleName => loadable.push(moduleName)}>
                <App location={req.url} context={{}} routes={routes} />
                {/* // initialData: initialData, */}
            </Loadable.Capture>
        );
        res.send(await template(markup, assets, loadables));
    }

    _getAssets({ webpackStats, fs }) {
        function normalizeAssets(assets) {
            if (isObject(assets)) {
                return Object.values(assets);
            }
            return Array.isArray(assets) ? assets : [assets];
        }
        const assetsByChunkName = webpackStats.toJson().children[0]
            .assetsByChunkName;
        const outputPath = webpackStats.toJson().outputPath;
        const normalizedAssets = normalizeAssets(assetsByChunkName['app']);
        return {
            css: normalizedAssets
                .filter(path => path.endsWith('.css'))
                .map(path => `<link rel="stylesheet" href="${path}">`)
                .join('\n'),
            js: normalizedAssets
                .filter(path => path.endsWith('.js'))
                .map(path => `<script src="${path}"></script>`)
                .join('\n')
        };
    }
}

export default new ReactRenderer();
