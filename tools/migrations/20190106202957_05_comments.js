exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', table => {
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
        table.text('body').notNullable();
        table.integer('comments_count').defaultTo(0);
        table.integer('likes_count').defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments');
};
