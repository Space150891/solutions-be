import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto';
import { DatabaseModule } from './database';
import {
  AppointmentsModule,
  DoctorsModule,
  NursesModule,
  PatientDoctorsModule,
  PatientIllnessModule,
  PatientMedicalRecordModule,
  PatientsModule,
  SpecializationsModule,
  StaffModule,
} from './modules';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    DatabaseModule,
    PatientsModule,
    DoctorsModule,
    SpecializationsModule,
    PatientDoctorsModule,
    NursesModule,
    StaffModule,
    AppointmentsModule,
    CryptoModule,
    PatientIllnessModule,
    PatientMedicalRecordModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
