import { DatabaseModule } from '@/database';
import {
  DoctorsEntity,
  PatientsEntity,
  SpecializationsEntity,
} from '@/database/postgres/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      DoctorsEntity,
      PatientsEntity,
      SpecializationsEntity,
    ]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
