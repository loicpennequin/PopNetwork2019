/**
 * Main app file.
 * Configure the app and load various modules.
 * @author Daria <lo.pennequin@gmail.com>
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import logger from './logger';
import passport from 'passport';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import AuthService from './auth';
import RestService from './persistence';
import WebsocketService from './websockets';
import user from './user';

/*====================================================
Init Express App
====================================================*/
const app = express();
const server = http.createServer(app);

/*====================================================
App configuration
====================================================*/
app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

/*====================================================
Authentication configuration
====================================================*/
AuthService.addStrategy('local').start(app);

/*====================================================
REST Modules
====================================================*/
user();
RestService.start(app);

/*====================================================
Websockets
====================================================*/
WebsocketService.start(server);

/**
 * Starts the server
 * @param {number} port - the port to start the server on
 * @callback onListen
 */
app.start = (port = 8000, onListen) => {
    server.listen(port, () => {
        onListen();
    });
};

export default app;
