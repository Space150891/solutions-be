import { DatabaseModule } from '@/database';
import { NursesEntity } from '@/database/postgres/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NursesController } from './nurses.controller';
import { NursesService } from './nurses.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([NursesEntity])],
  controllers: [NursesController],
  providers: [NursesService],
})
export class NursesModule {}
