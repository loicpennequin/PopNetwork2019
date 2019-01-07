exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', table => {
        table.increments().primary();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
