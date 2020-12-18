import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Order', table => {
    table
      .integer('id')
      .notNullable()
      .primary();

    table.string('description').notNullable();

    table.integer('quantity').notNullable();

    table.decimal('value', 10, 2).notNullable();

    table.dateTime('createdDate').notNullable();

    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('Order');
}
