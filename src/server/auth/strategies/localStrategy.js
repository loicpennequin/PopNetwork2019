import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import RESTService from './../../persistence';
import { cfg } from './../../../../config';
import bcrypt from 'bcrypt';
import logger from './../../logger';

const comparePassword = (password, user, done) => {
    return bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            logger.error(`============AUTHENTICATION API ERROR`);
            logger.error(err.stack);
        }
        return result !== true ? done(null, false) : done(null, user.id);
    });
};

const getUser = async (field, value) => {
    const module = RESTService.get(cfg.AUTH.MODELNAME);
    return await module.findOne(
        { [field]: value },
        { serialize: { visibility: false } }
    );
};

const authenticate = async (username, password, done) => {
    try {
        const user = await getUser('username', username);
        if (user) {
            logger.debug('AuthService - user found');
            logger.debug(
                `username: ${user.username}, password: ${user.password}`
            );
        }
        return user ? comparePassword(password, user, done) : done(null, user);
    } catch (err) {
        return done(err);
    }
};

module.exports = (config = {}) => {
    passport.use(
        'local',
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            function(username, password, done) {
                authenticate(username, password, done);
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser(async (id, done) =>
        done(null, await getUser('id', id))
    );

    return {
        login: (req, res) => {
            logger.debug(`AUTHSERVICE : ${config.name} strategy - LOGIN`);
            if (config.onLogin) {
                return config.onLogin(req, res);
            }
            res.json(req.user);
        },
        logout: (req, res) => {
            logger.debug(`AUTHSERVICE : ${config.name} strategy - LOGOUT`);
            req.logout();
            req.session.destroy();
            if (config.onLogout) {
                return config.onLogout(req, res);
            }
            res.status(200).send();
        },
        isLoggedIn: (req, res, next) => {
            logger.debug(`AUTHSERVICE : ${config.name} strategy - ISLOGGEDIN`);
            return req.isAuthenticated();
        }
    };
};
