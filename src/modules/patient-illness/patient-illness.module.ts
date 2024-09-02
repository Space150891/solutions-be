import { DatabaseModule } from '@/database';
import { PatientIllnessEntity } from '@/database/postgres/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([PatientIllnessEntity])],
  controllers: [],
  providers: [],
})
export class PatientIllnessModule {}
