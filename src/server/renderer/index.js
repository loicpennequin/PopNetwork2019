import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import logger from './../logger';
import isObject from 'is-object';
import { cfg } from './../../../config';
import template from './template.js';
import build from './webpack.js';
import Loadable from 'react-loadable';
import prefetcher from './prefetcher.js';
import AuthService from './../auth';

class ReactRenderer {
    constructor() {
        this.appPath = cfg.APP.SSR_BUNDLE__PATH;
    }

    async build(app) {
        logger.debug('===========BUILDING REACT APP');
        const webpackApp = await build();
        logger.debug('===========REACT APP BUILD SUCCESSFUL');
        // @TODO : handle client-side routes
        webpackApp.get('/', this.render.bind(this));
        app.use(webpackApp);

        // @TODO: do this elsewhere. Maybe in constructor by passing the main app as a parameter;
        const { pages } = require(this.appPath);
        pages.forEach(page => {
            app.get(
                page.pageConfig.path,
                this._handleRedirect.bind(this),
                async (req, res) => await this.render(req, res)
            );
        });
    }

    async render(req, res) {
        // @TODO: handle initialState fetching

        const { default: App } = require(this.appPath);

        const assets = this._getAssets(res.locals);
        const routes = [];
        const loadables = [];
        const { pageConfig } = this._getRouteMatches(req)[0];
        const initialData = await this._prefetch(pageConfig.name, req);
        const markup = renderToString(
            <Loadable.Capture report={moduleName => loadable.push(moduleName)}>
                <App
                    location={req.url}
                    context={{}}
                    routes={routes}
                    initialData={initialData}
                />
            </Loadable.Capture>
        );
        res.send(await template(markup, assets, loadables, initialData));
    }

    _getSSRBundle() {
        // @FIXME : still a problem with require cache even when doing this.
        if (process.env.NODE_ENV === 'development') {
            delete require.cache[this.appPath];
        }
        return require(this.appPath);
    }

    _getRouteMatches(req) {
        const { pages } = this._getSSRBundle();
        return pages.filter(page => matchPath(req.url, page.pageConfig));
    }

    _handleRedirect(req, res, next) {
        const matches = this._getRouteMatches(req);
        if (
            matches.some(match => match.pageConfig.authLevel === 'private') &&
            !req.isAuthenticated()
        ) {
            logger.debug('should redirect');
            res.redirect(cfg.AUTH.PRIVATE_REDIRECT_PATH);
        } else if (
            matches.some(match => match.pageConfig.authLevel === 'public') &&
            req.isAuthenticated()
        ) {
            logger.debug('should redirect');
            res.redirect(cfg.AUTH.PUBLIC_REDIRECT_PATH);
        } else {
            next();
        }
    }

    async _prefetch(key, req) {
        return {
            authenticated: AuthService.get('local').isLoggedIn(req),
            needPrefetch: false,
            ...(await prefetcher[key](req))
        };
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
        const normalizedAssets = normalizeAssets(assetsByChunkName['app']);
        return {
            css: normalizedAssets
                .filter(path => path.endsWith('.css'))
                .map(path => `<link rel="stylesheet" href="${path}">`)
                .join('\n'),
            js: normalizedAssets
                .filter(path => path.endsWith('.js'))
                .map(path => `<script src="/${path}"></script>`)
                .join('\n')
        };
    }
}

export default new ReactRenderer();
