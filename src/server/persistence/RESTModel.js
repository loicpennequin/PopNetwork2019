/**
 * RESTResource Model configuration.
 * add helper methods to standard Bookshelf Model Instance to perform CRUD operations.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */
import { cfg } from './../../../config';

export default function(modelDef, name, bookshelf) {
    const DEFAULT_MODEL = {
        hasTimestamps: true,
        /**
         * findAll - Fetches paginated rows from the model.
         *
         * @param {Object} obj
         * @param {number} obj.page - The page to fetch.
         * @param {number} obj.pageSize - How many rows per pages
         * @param {...Object} obj.opts - the rest of the options
         * @return {Object} the rows and metadatas concerning pagination
         */

        findAll: async function({
            page = 1,
            pageSize = cfg.REST.DEFAULT_PAGE_SIZE,
            ...opts
        } = {}) {
            const data = (await this.fetchPage({
                page,
                pageSize,
                ...opts
            })).toJSON();
            const totalRows = await this.count();
            const pageCount = Math.ceil(totalRows / pageSize);
            const isLastPage = page >= pageCount;

            return { data, totalRows, pageCount, isLastPage };
        },
        /**
         * findOne - fetches one row from the model.
         *
         * @param  {Object} filter {[column_name] : [value]}
         * @param  {Object} options
         * @return {Object}
         */

        findOne: async function(filter, options) {
            options = Object.assign({ require: true }, options);
            return (await this.where(filter).fetch(options)).toJSON(
                options.serialize
            );
        },
        /**
         * findById - fetches one row from the model by id.
         *
         * @param  {number} id
         * @param  {Object} options
         * @return {Object}
         */

        findById: async function(id, options) {
            return await this.findOne({ [this.idAttribute]: id }, options);
        },
        /**
         * create - saves the model to the database
         *
         * @param  {Object} options
         * @return {Object}
         */

        create: async function(options) {
            return (await this.save(null, options)).toJSON();
        },
        /**
         * delete - delete the model from the database
         *
         * @param  {Object} options
         * @return {Object} empty object
         */

        delete: async function(options) {
            options = Object.assign({ require: true }, options);
            return (await this.destroy(options)).toJSON();
        },
        /**
         * update - update the model on the database
         *
         * @param  {object} data the new fields to save
         * @return {Object} the updated model
         */

        update: async function(data) {
            return (await this.save(data, { method: 'update' })).toJSON();
        }
    };

    const model = bookshelf.model(name, { ...DEFAULT_MODEL, ...modelDef });

    return model;
}
