import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DatabaseModule } from './database';
import {
  DoctorsModule,
  PatientDoctorsModule,
  PatientsModule,
  SpecializationsModule,
} from './modules';

@Module({
  imports: [
    DatabaseModule,
    PatientsModule,
    DoctorsModule,
    SpecializationsModule,
    PatientDoctorsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
