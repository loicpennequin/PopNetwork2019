import express from 'express';
import cors from 'cors';
import logger from './../logger';
import { wrap } from './../errorHandling';
import RESTModel from './RESTModel.js';
import RESTController from './RESTController.js';
import { cfg } from './../../../config';
import AuthService from './../auth';

const DEFAULT_OPTIONS = {
    findAll: {},
    findById: {},
    findOne: { require: true },
    create: {},
    destroy: { require: true },
    update: {},
    isPrivateRoutes: []
};

class RESTResource {
    constructor(
        { urlPath = '/', name, model, controller = {}, options = {} },
        bookshelf
    ) {
        Object.assign(this, { name, urlPath });
        this.options = Object.assign(DEFAULT_OPTIONS, options);
        this.model = new RESTModel(model, this.name, bookshelf);
        this.controller = new RESTController(
            controller,
            this.model,
            this.options
        );
        this.app = express();
        this.router = express.Router();
        this.corsOptions = cfg.CORS;
        this.middlewares = [cors(this.corsOptions)];

        this._setupRoutes();
    }

    _setupRoutes() {
        this.router.options('/', cors(this.corsOptions));
        this.router.options('/:id', cors(this.corsOptions));
        const isPrivate = route =>
            this.options.privateRoutes.indexOf(route) !== -1;

        this._addRoute('get', '/', isPrivate('findAll'), async (req, res) =>
            this.controller.findAll(req.query)
        );
        this._addRoute('get', '/:id', isPrivate('find'), async (req, res) =>
            this.controller.findById(req.params.id)
        );
        this._addRoute('post', '/', isPrivate('create'), async (req, res) =>
            this.controller.create(req.body)
        );
        this._addRoute(
            'delete',
            '/:id',
            isPrivate('destroy'),
            async (req, res) => this.controller.destroy(req.params.id)
        );
        this._addRoute('put', '/:id', isPrivate('update'), async (req, res) =>
            this.controller.update(req.params.id, req.body)
        );
    }

    async _handleRoute(req, res, fn) {
        const data = await wrap(() => fn(req, res), this._handleError);
        const status = this._setStatus(req, data);
        const ids = Array.isArray(data) ? data.map(x => x?.id) : [data?.id];
        logger.debug(`REST API RESPONSE - status: ${status}`);
        res.status(status).json(data);
    }

    _setStatus(req, data) {
        if (data === null) {
            return 204;
        } else if (data instanceof Error) {
            return data.code || 500;
        } else if (data) {
            switch (req.method) {
                case 'GET':
                case 'DELETE':
                case 'PUT':
                    return 200;
                case 'POST':
                    return 201;
            }
        } else {
            return 204;
        }
    }

    _handleError(e) {
        if (e.message === 'EmptyResponse') {
            return null;
        } else {
            logger.error(`============REST API ERROR`);
            logger.error(e.stack);
            return e;
        }
    }

    _addRoute(type, url, isPrivate, cb) {
        logger.debug(
            `RESTResource._addRoute() : ${type.toUpperCase()} - ${
                this.urlPath
            }${url} - ${isPrivate ? 'private' : 'public'}`
        );

        this.router[type](url, [this.middlewares], (req, res) => {
            if (isPrivate && !req.isAuthenticated()) {
                res.status(401).send('Unauthorized');
            } else {
                this._handleRoute(req, res, cb);
            }
        });
    }

    _logRequest(req, res, next) {
        logger.debug(`REST API REQUEST : /${req.method} ${req.url}`);
        next();
    }

    get({ url, cb, isPrivate }) {
        this_addRoute('get', url, isPrivate, cb);
    }

    post({ url, cb, isPrivate }) {
        this_addRoute('post', url, isPrivate, cb);
    }

    delete({ url, cb, isPrivate }) {
        this_addRoute('delete', url, isPrivate, cb);
    }

    put({ url, cb, isPrivate }) {
        this_addRoute('put', url, isPrivate, cb);
    }

    start(app) {
        this.app.use(this._logRequest);
        this.app.use(this.urlPath, this.router);
        app.use(cfg.REST.API_PATH, this.app);
        logger.debug(`${this.name} REST Resource initialized`);
    }
}

export default RESTResource;
