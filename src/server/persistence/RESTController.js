/**
 * RESTController
 * handles communication between the RESTModel and the RESTResource
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

import logger from './../logger';

class RESTController {
    /**
     * constructor
     *
     * @param  {Object} ctrlDef custom Controller efinition provided when creating the RESTResource
     * @param  {RESTModel} model the RESTResource model
     * @param  {Object} options
     */
    constructor(ctrlDef, model, options) {
        Object.assign(this, { ...ctrlDef, model, options });
    }

    /**
     * findAll - default method to find paginated rows from a RESTModel
     *
     * @param  {Object} query = {} the query parameters from the url
     * @return {Object} the fetched rows and metadatas concerning pagination in JSON format
     */
    findAll(query = {}) {
        logger.info('RESTController.findAll()');
        return this.model
            .forge()
            .findAll({ ...query, ...this.options.findAll });
    }

    /**
     * findById - fetches one row from the model based on an id.
     *
     * @param  {Number} id the id of the Model to fetch.
     * @return {Object} the fetched row
     */
    findById(id) {
        logger.info('RESTController.findById()');
        return this.model.forge().findById(id, this.options.findById);
    }

    /**
     * findOne - fetches on row from the model
     *
     * @param  {Object} filter a hash of key / value pairs to establish the WHERE clause
     * @return {type} the fetched row
     */
    findOne(filter) {
        logger.info('RESTController.findOne()');
        return this.model.forge().findOne(body, this.options.findOne);
    }

    /**
     * create - creates a model and saves it to the database.
     *
     * @param  {Object} body = {} the model data
     * @return {Object} the created Model fields
     */
    create(body = {}) {
        logger.info('RESTController.create()');
        return this.model.forge(body).create(this.options.create);
    }


    /**
     * destroy - removes a model from the database
     *
     * @param  {Number} id
     * @return {Object} empty model
     */
    destroy(id) {
        logger.info('RESTController.destroy()');
        return this.model.forge({ id }).destroy(this.options.delete);
    }

    /**
     * update - Update a row
     *
     * @param  {Number} id   id to update
     * @param  {Object} body updated model data
     * @return {Objec t} the updated model information
     */
    update(id, body) {
        logger.info('RESTController.update()');
        return this.model.forge({ id }).update(body, this.options.update);
    }
}

export default RESTController;
