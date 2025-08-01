import { DataSource } from 'typeorm';
import entities from './typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: 'lombardiaEventsDB',
  entities,
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
