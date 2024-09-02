import {
  AppointmentsEntity,
  DoctorsEntity,
  PatientIllnessEntity,
  PatientsEntity,
  SpecializationsEntity,
} from '@/database/postgres/models';
import { BasicRO, DeletedRO, UpdatedRO } from '@/utils';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DoctorsDTO implements DoctorsEntity {
  @ApiHideProperty() illnesses: PatientIllnessEntity[];
  @ApiHideProperty() appointments: AppointmentsEntity[];
  @ApiHideProperty() specialization: SpecializationsEntity;
  @ApiHideProperty() patients: PatientsEntity[];

  id: string;
  createdAt: Date;
  updatedAt: Date;
  first_name: string;
  last_name: string;
  description: string;
}

export class DoctorCreateDTO implements Partial<DoctorsEntity> {
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsString() @IsOptional() description: string;
}

export class DoctorUpdateDTO implements Partial<DoctorsEntity> {
  @IsString() @IsOptional() first_name: string;
  @IsString() @IsOptional() last_name: string;
}

export class GetDoctorsRO extends BasicRO {
  data: DoctorsDTO[];
}

export class GetDoctorRO extends BasicRO {
  data: DoctorsDTO;
}

export class CreateDoctorRO extends BasicRO {
  data: DoctorsDTO;
}

export class UpdateDoctorRO extends UpdatedRO {
  data: DoctorsDTO;
}

export class DeleteDoctorRO extends DeletedRO {}
