const path = require('path');

const cfg = Object.freeze({
    APP: Object.freeze({
        SSR_BUNDLE__PATH: path.resolve(
            __dirname,
            './../src/server/views/app.ssr.js'
        )
    }),
    LOGGER: Object.freeze({
        DIR: 'logs',
        FORMAT: printf => printf(info => `${info.level}: ${info.message}`)
    }),
    AUTH: Object.freeze({
        MODELNAME: 'User',
        PATH: '/auth',
        PRIVATE_REDIRECT_PATH: '/',
        PUBLIC_REDIRECT_PATH: '/dashboard'
    }),
    CORS: Object.freeze({
        origin: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
        exposedHeaders: 'Content-Length'
    }),
    REST: Object.freeze({
        API_PATH: '/api',
        DEFAULT_PAGE_SIZE: 30
    })
});

module.exports = cfg;
