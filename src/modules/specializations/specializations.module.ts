import { Module } from '@nestjs/common';
import { SpecializationsController } from './specializations.controller';
import { SpecializationsService } from './specializations.service';
import { DatabaseModule } from 'src/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationsEntity } from 'src/database/postgres/models';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([SpecializationsEntity])],
  controllers: [SpecializationsController],
  providers: [SpecializationsService],
})
export class SpecializationsModule {}
