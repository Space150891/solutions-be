import { DatabaseModule } from '@/database';
import { AppointmentsEntity } from '@/database/postgres/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
