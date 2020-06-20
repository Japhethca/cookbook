import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_NAME, DB_PASSWORD } = process.env;

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number.parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/db/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  subscribers: ['src/db/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
};

export default connectionOptions;
