import { config } from 'dotenv';

type Environment = 'development' | 'production';

config();

const environment = process.env.ENVIRONMENT as Environment;

const knexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: __dirname + 'src/db/migrations',
    },
    seeds: {
      directory: __dirname + 'src/db/seeds',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: __dirname + 'src/db/migrations',
    },
    seeds: {
      directory: __dirname + 'src/db/seeds',
    },
  },
};

export const db = knexConfig[environment];

export default knexConfig;
