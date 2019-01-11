exports.up = function(knex, Promise) {
    return knex.schema.createTable('likes', table => {
        table.increments().primary();
        table.timestamps();
        table
            .integer('post_id')
            .notNullable()
            .unsigned()
            .references('posts.id')
            .onDelete('CASCADE');
        table
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('users.id')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('likes');
};
