import { Knex } from 'knex';

export const seed = async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex('houses').del();

  // Inserts seed entries
  await knex('houses').insert([
    {
      name: 'Small House',
      address: '1234 Small St.',
      city: 'Austin',
      state: 'TX',
      zipcode: 78704,
      image_url:
        'https://images.unsplash.com/photo-1563127673-00fb29e7eeae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      monthly_mortgage: 1800,
      monthly_rent: 3600,
    },
    {
      name: 'Big House',
      address: '5678 Big Ln.',
      city: 'Austin',
      state: 'TX',
      zipcode: 78729,
      image_url:
        'https://images.unsplash.com/photo-1613544723157-fa0acdba2cca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
      monthly_mortgage: 2323.45,
      monthly_rent: 4321.09,
    },
  ]);
};
