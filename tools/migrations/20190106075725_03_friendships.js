exports.up = function(knex, Promise) {
    return knex.schema.createTable('friendships', table => {
        table.increments().primary();
        table.timestamps();
        table.integer('status').defaultTo(1);
        table
            .integer('sender_id')
            .unsigned()
            .notNullable()
            .references('users.id')
            .onDelete('CASCADE');
        table
            .integer('sendee_id')
            .notNullable()
            .unsigned()
            .references('users.id')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('friendships');
};
