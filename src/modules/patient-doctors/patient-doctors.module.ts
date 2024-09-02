import { DatabaseModule } from '@/database';
import { DoctorsEntity, PatientsEntity } from '@/database/postgres/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientsModule } from '../patients/patients.module';
import { PatientDoctorController } from './patient-doctors.controller';
import { PatientDoctorService } from './patient-doctors.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([DoctorsEntity, PatientsEntity]),
    PatientsModule,
  ],
  controllers: [PatientDoctorController],
  providers: [PatientDoctorService],
})
export class PatientDoctorsModule {}
