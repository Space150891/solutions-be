import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database';
import { StaffEntity } from 'src/database/postgres/models';

import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([StaffEntity])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
