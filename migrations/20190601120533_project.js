
exports.up = function(knex) {
  return knex.schema.createTable('project', (tbl) => {
    tbl.increments('id').unique().notNullable()

    tbl.string('name', 255)

    tbl.string('description', 255)

    tbl.boolean('completed')
    
    tbl.timestamps(true, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('project');
};
