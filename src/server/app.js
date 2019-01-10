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
import Renderer from './renderer';

import user from './_user';
import comment from './_comment';
import friendship from './_friendship';
import message from './_message';
import post from './_post';
import publication from './_publication';

/*====================================================
Init Express App
====================================================*/
const app = express();
const server = http.createServer(app);

/**
 * Starts the server
 * @param {number} port - the port to start the server on
 * @callback onListen
 */
app.start = async (port = 8000, onListen) => {
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
    Renderer configuration
    ====================================================*/
    if (process.env.NODE_ENV === 'development') {
        await Renderer.build(app);
    } else {
        app.get('/', (req, res) => {
            Renderer.render();
        });
    }

    /*====================================================
    Authentication configuration
    ====================================================*/
    AuthService.addStrategy('local').start(app);

    /*====================================================
    REST Modules
    ====================================================*/
    comment();
    friendship();
    message();
    post();
    publication();
    user();
    RestService.start(app);

    /*====================================================
    Websockets
    ====================================================*/
    WebsocketService.start(server);

    server.listen(port, () => {
        onListen();
    });
};

export default app;
