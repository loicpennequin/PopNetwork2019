import React from 'react';
import { renderToString } from '@hot-loader/react-dom/server';
import logger from './../logger';
// import isObject from 'is-object';

import template from './template.js';
import build from './webpack.js';
import Loadable from 'react-loadable';

class ReactRenderer {
    constructor() {
        // config.routes.forEach(route => {
        //     this.app.get(
        //         route.path,
        //         async (req, res) => await this.render(req, res)
        //     );
        // });
        // this.config = config;
    }

    async build(app) {
        logger.debug('ReactRenderer.build()');
        const webpackApp = await build();
        webpackApp.use(this.render);
        app.use(webpackApp);
    }

    async render(req, res) {
        res.send(template());
        // const { AppComponent: App, routes } = this.config;
        // if (this.config.private && !req.user) {
        //     res.redirect('/');
        // } else {
        //     const modules = [];
        //     const assets = this._getAssets(res.locals);
        //     const markup = renderToString(
        //         <Loadable.Capture
        //             report={moduleName => modules.push(moduleName)}
        //         >
        //             <App location={req.url} context={{}} routes={routes} />
        //             {/* // initialData: initialData, */}
        //         </Loadable.Capture>
        //     );
        //     res.send(await template(markup, modules, assets));
        // }
    }

    _getAssets({ webpackStats, fs }) {
        // function normalizeAssets(assets) {
        //     if (isObject(assets)) {
        //         return Object.values(assets);
        //     }
        //     return Array.isArray(assets) ? assets : [assets];
        // }
        //
        // const assetsByChunkName = webpackStats.toJson().assetsByChunkName;
        // const outputPath = webpackStats.toJson().outputPath;
        // const normalizedAssets = normalizeAssets(
        //     assetsByChunkName[this.config.namespace]
        // );
        // return {
        //     css: normalizedAssets
        //         .filter(path => path.endsWith('.css'))
        //         .map(path => `<link rel="stylesheet" href="${path}">`)
        //         .join('\n'),
        //     js: normalizedAssets
        //         .filter(path => path.endsWith('.js'))
        //         .map(path => `<script src="${path}"></script>`)
        //         .join('\n')
        // };
        //
        // return {
        //     css: `<link rel="stylesheet" href="/assets/${
        //         this.config.namespace
        //     }.css">`,
        //     js: `<script src="/assets/runtime.js"></script>\n<script src="/assets/vendors.js"></script>\n<script src="/assets/${
        //         this.config.namespace
        //     }.js"></script>`
        // };
    }
}

export default new ReactRenderer();
