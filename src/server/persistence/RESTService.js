import path from 'path';
import dbConfig from './../../../knexfile.js';
import knex from 'knex';
import bookshelf from 'bookshelf';
import RESTResource from './RESTResource.js';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import logger from './../logger';

// const validator = require('validator');

// validator.isRequired = val => val != null && val != undefined;

class RestService {
    constructor() {
        this.knex = knex(dbConfig);
        this.bookshelf = bookshelf(this.knex);
        this.bookshelf.plugin('registry');
        this.bookshelf.plugin('pagination');
        this.bookshelf.plugin(bookshelfBcrypt);

        this.resources = {};
    }

    createRestResource(resourceDef) {
        const resource = new RESTResource(resourceDef, this.bookshelf);
        this.resources[resourceDef.name] = resource;
        return resource;
    }

    get(name) {
        return this.resources[name].controller;
    }

    start(app) {
        logger.debug('RESTService.start()');
        Object.values(this.resources).forEach(resource => {
            resource.start(app);
        });
    }
    // endpoints = () =>
    //     Object.entries(this.resources).reduce(
    //         (acc, [key, resource]) => ({ ...acc, [key]: resource.endpoints }),
    //         {}
    //     );
}

export default new RestService();
