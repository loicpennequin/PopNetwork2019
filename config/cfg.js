const cfg = Object.freeze({
    LOGGER: Object.freeze({
        DIR: 'logs',
        FORMAT: printf => printf(info => `${info.level}: ${info.message}`)
    }),
    AUTH: Object.freeze({
        MODELNAME: 'User',
        PATH: '/auth'
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

export default cfg;
