import { Knex } from 'knex';

export const up = (knex: Knex): Promise<void> => {
  return knex.schema
    .withSchema('public')
    .createTable('houses', (table: Knex.CreateTableBuilder) => {
      table.increments();
      table.string('name');
      table.string('address');
      table.string('city');
      table.string('state');
      table.integer('zipcode');
      table.string('image_url');
      table.float('monthly_mortgage');
      table.float('monthly_rent');
    });
};

export const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('houses');
};
