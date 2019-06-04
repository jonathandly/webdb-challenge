
exports.up = function(knex) {
  return knex.schema.createTable('action', (tbl) => {
    tbl.increments('id').unique().notNullable()

    tbl.string('description', 255)

    tbl.string('notes', 255)

    tbl.boolean('completed').defaultTo(0)

    tbl
        .integer('project_id')
        .references('id')
        .inTable('project')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
    
    tbl.timestamps(true, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('action');
};
