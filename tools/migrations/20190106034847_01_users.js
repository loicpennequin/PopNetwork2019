exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments().primary();
        table.timestamps();
        table
            .string('username')
            .notNullable()
            .unique();
        table
            .string('email')
            .notNullable()
            .unique();
        table.string('password').notNullable();
        table.string('description').nullable();
        table.string('github').nullable();
        table.string('facebook').nullable();
        table.string('twitter').nullable();
        table.string('linkedin').nullable();
        table.integer('friends_count').defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
