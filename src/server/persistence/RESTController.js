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
    async findAll(query = {}, options) {
        return await this.model
            .forge()
            .findAll({ ...query, ...this.options.findAll, ...options });
    }

    /**
     * findById - fetches one row from the model based on an id.
     *
     * @param  {Number} id the id of the Model to fetch.
     * @return {Object} the fetched row
     */
    async findById(id, options) {
        return await this.model
            .forge()
            .findById(id, this._aggregateOptions('findById', options));
    }

    /**
     * findOne - fetches on row from the model
     *
     * @param  {Object} filter a hash of key / value pairs to establish the WHERE clause
     * @return {type} the fetched row
     */
    async findOne(filter, options) {
        return await this.model
            .forge()
            .findOne(filter, this._aggregateOptions('findOne', options));
    }

    /**
     * create - creates a model and saves it to the database.
     *
     * @param  {Object} body = {} the model data
     * @return {Object} the created Model fields
     */
    async create(body = {}, options) {
        return await this.model.forge(body).create(this._aggregateOptions('create', options));
    }

    /**
     * destroy - removes a model from the database
     *
     * @param  {Number} id
     * @return {Object} empty model
     */
    async destroy(id, options) {
        return await this.model.forge({ id }).destroy(this._aggregateOptions('delete', options));
    }

    /**
     * update - Update a row
     *
     * @param  {Number} id   id to update
     * @param  {Object} body updated model data
     * @return {Objec t} the updated model information
     */
    async update(id, body, options) {
        return await this.model.forge({ id }).update(body, this._aggregateOptions('update', options));
    }

    _aggregateOptions(key, options) {
        return Object.assign(this.options[key], options);
    }
}

export default RESTController;
