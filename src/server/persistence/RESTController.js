/**
 * RESTController
 * handles communication between the RESTModel and the RESTResource
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

import logger from './../logger';

class RESTController {
    constructor(ctrlDef, model, options) {
        Object.assign(this, { ...ctrlDef, model, options });
    }

    findAll(query = {}) {
        logger.info('RESTController.findAll()');
        return this.model
            .forge()
            .findAll({ ...query, ...this.options.findAll });
    }

    findById(id) {
        logger.info('RESTController.findById()');
        return this.model.forge().findById(id, this.options.findById);
    }

    findOne(body, options) {
        logger.info('RESTController.findById()');
        return this.model.forge().findOne(body, this.options.findById);
    }

    create(body = {}) {
        logger.info('RESTController.create()');
        return this.model.forge(body).create(this.options.create);
    }

    destroy(id) {
        logger.info('RESTController.destroy()');
        return this.model.forge({ id }).destroy(this.options.delete);
    }

    update(id, body) {
        logger.info('RESTController.update()');
        return this.model.forge({ id }).update(body, this.options.update);
    }
}

export default RESTController;
