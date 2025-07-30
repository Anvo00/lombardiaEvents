import { DataSource } from 'typeorm';
import entities from './users/typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'nestjsuser',
  password: 'MyR00tPassw0rd',
  database: 'lombardiaEventsDB',
  entities,
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
