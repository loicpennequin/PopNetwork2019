import LocalStrategy from './strategies/localStrategy';
import passport from 'passport';
import express from 'express';
import logger from './../logger';
import { cfg } from './../../../config';

const STRATEGIES = {
    local: config => ({
        module: LocalStrategy({ ...config, name: 'Local' }),
        path: '',
        key: 'local'
    })
};

class AuthService {
    constructor() {
        this.strategies = [];
        this.router = express.Router();
    }

    _setupAuthRoutes() {
        this.strategies.forEach(({ module, path, key }) => {
            this.router.post(
                `${path}/login`,
                passport.authenticate(key),
                module.login
            );
            this.router.get(`${path}/logout`, module.logout);
            this.router.get(`${path}/isloggedin`, (req, res) => {
                const loggedin = module.isLoggedIn(req, res);
                res.status(loggedin ? 200 : 401).send(loggedin);
            });
        });
    }

    addStrategy(strategy, config) {
        if (!STRATEGIES[strategy]) {
            logger.error(`============AUTHENTICATION API ERROR`);
            logger.error(`This strategy is not supported yet. Please chose one of :
${Object.keys(STRATEGIES).reduce((str, key) => str + `_${key}\n`, '')}`);
            return this;
        }
        this.strategies.push(STRATEGIES[strategy](config));
        return this;
    }

    get(key) {
        return this.strategies.find(s => s.key === key).module;
    }

    start(app) {
        this._setupAuthRoutes();
        app.use(cfg.AUTH.PATH, this.router);
    }
}

export default new AuthService();
