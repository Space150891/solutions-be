import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database';
import { NursesEntity } from 'src/database/postgres/models';

import { NursesController } from './nurses.controller';
import { NursesService } from './nurses.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([NursesEntity])],
  controllers: [NursesController],
  providers: [NursesService],
})
export class NursesModule {}
