import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

import {
  AgendasEntity,
  BaseEntity,
  DoctorsEntity,
  PatientsEntity,
  SpecializationsEntity,
} from './models';

dotenv.config();

export const entities = [
  AgendasEntity,
  BaseEntity,
  DoctorsEntity,
  PatientsEntity,
  SpecializationsEntity,
];

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities,
  synchronize: false,
  migrations: [join(__dirname, '..', 'postgres/migrations/*{.js,.ts}')],
});

PostgresDataSource.initialize();
