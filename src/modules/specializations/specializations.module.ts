import { DatabaseModule } from '@/database';
import { SpecializationsEntity } from '@/database/postgres/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecializationsController } from './specializations.controller';
import { SpecializationsService } from './specializations.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([SpecializationsEntity])],
  controllers: [SpecializationsController],
  providers: [SpecializationsService],
})
export class SpecializationsModule {}
