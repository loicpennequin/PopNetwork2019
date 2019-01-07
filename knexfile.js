const path = require('path');
require(path.resolve(__dirname, './config/env.js'));

let cfg = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD || '',
        charset: 'utf8'
    },
    migrations: {
        directory: './tools/migrations'
    },
    seeds: {
        directory: './tools/seeds'
    }
};

module.exports = cfg;
