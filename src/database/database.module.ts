import { Logger, Module } from '@nestjs/common';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { PostgresDataSource } from './postgres';

@Module({
  imports: [TypeOrmModule.forRoot(PostgresDataSource.options)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  private readonly logger = new Logger(DatabaseModule.name);
  constructor(
    @InjectDataSource(PostgresDataSource)
    private postgresDataSource: DataSource,
  ) {}

  async onModuleInit() {
    await this.postgresDataSource
      .runMigrations()
      .then((migrations) => {
        this.logger.log('Postgres migrations:', { migrations });
      })
      .catch((err) => {
        this.logger.error('Postgres migrations error:', err);
      });
  }
}
