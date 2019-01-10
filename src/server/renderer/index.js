import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import logger from './../logger';
import isObject from 'is-object';
import { cfg } from './../../../config';
import template from './template.js';
import build from './webpack.js';
import Loadable from 'react-loadable';

class ReactRenderer {
    constructor() {
        this.appPath = cfg.APP.SSR_BUNDLE__PATH;
    }

    async build(app) {
        logger.debug('================BUILDING REACT APP');
        const webpackApp = await build();
        logger.debug('================REACT APP BUILD SUCCESSFUL');
        // @TODO : handle client-side routes
        webpackApp.get('/', this.render.bind(this));
        app.use(webpackApp);

        // @TODO: do this elsewhere. Maybe in constructor by passing the main app as a parameter;
        const { pages } = require(this.appPath);
        pages.forEach(page => {
            app.get(
                page.pageConfig.path,
                async (req, res) => await this.render(req, res)
            );
        })
    }

    async render(req, res) {
        // @TODO: handle initialState fetching

        if (process.env.NODE_ENV === 'development') {
            delete require.cache[this.appPath];
        }

        const { default: App, pages } = require(this.appPath);

        const routeMatches = pages.filter(page => matchPath(req.url, page.pageConfig));
        const redirectPath = this._checkRedirect(req, routeMatches)
        if (redirectPath) {
            res.redirect(redirectPath);
        } else {
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
    }

    _checkRedirect(req, matches){
        const matchesConfig = matches
            .map(match => match.pageConfig);

        if (
            matchesConfig.some(match => match.authLevel === 'private') &&
            !req.isAuthenticated()
        ) {
            return ('/');
        } else if (
            matchesConfig.some(match => match.authLevel === 'public') &&
            req.isAuthenticated()
        ) {
            return ('/dashboard');
        } else {
            return undefined;
        }
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
