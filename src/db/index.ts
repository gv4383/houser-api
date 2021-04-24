import knex from 'knex';

import knexConfig from '../../knexfile';

type Environment = 'development' | 'production';

const environment = process.env.ENVIRONMENT as Environment;

const db = knex(knexConfig[environment]);

export default db;
