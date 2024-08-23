import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database';
import {
  DoctorsEntity,
  PatientsEntity,
  SpecializationsEntity,
} from 'src/database/postgres/models';

import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PatientsEntity,
      DoctorsEntity,
      SpecializationsEntity,
    ]),
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
