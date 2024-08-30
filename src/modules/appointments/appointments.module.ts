import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database';
import { AppointmentsEntity } from 'src/database/postgres/models';

import {
  AppointmentsController,
  AppointmentsListsController,
} from './controllers';
import { AppointmentsListsService, AppointmentsService } from './services';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([AppointmentsEntity])],
  controllers: [AppointmentsController, AppointmentsListsController],
  providers: [AppointmentsService, AppointmentsListsService],
  exports: [],
})
export class AppointmentsModule {}
