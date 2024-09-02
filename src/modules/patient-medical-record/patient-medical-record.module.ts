import { DatabaseModule } from '@/database';
import { PatientMedicalRecordEntity } from '@/database/postgres/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientMedicalRecordController } from './patient-medical-record.controller';
import { PatientMedicalRecordService } from './patient-medical-record.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([PatientMedicalRecordEntity]),
  ],
  controllers: [PatientMedicalRecordController],
  providers: [PatientMedicalRecordService],
})
export class PatientMedicalRecordModule {}
