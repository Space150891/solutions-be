import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DatabaseModule } from './database';
import {
  DoctorsModule,
  NursesModule,
  PatientDoctorsModule,
  PatientsModule,
  SpecializationsModule,
  StaffModule,
} from './modules';

@Module({
  imports: [
    DatabaseModule,
    PatientsModule,
    DoctorsModule,
    SpecializationsModule,
    PatientDoctorsModule,
    NursesModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
