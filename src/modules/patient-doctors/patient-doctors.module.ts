import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database';
import { DoctorsEntity, PatientsEntity } from 'src/database/postgres/models';
import { PatientDoctorController } from './patient-doctors.controller';
import { PatientDoctorService } from './patient-doctors.service';
import { PatientsModule } from '../patients/patients.module';

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
