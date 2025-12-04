import { DataSource } from 'typeorm';
import entities from './database/typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: configService.get<string>('DATABASE_NAME')!,
  entities,
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
