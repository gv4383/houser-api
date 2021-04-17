import { Knex } from 'knex';
import db from '../db';

(async () => {
  try {
    await db.schema.withSchema('public').createTable('houses', (table: Knex.CreateTableBuilder) => {
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
    console.log('Created houser database!');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
