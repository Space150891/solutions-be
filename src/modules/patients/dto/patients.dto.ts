import { ApiHideProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import {
  AppointmentsEntity,
  DoctorsEntity,
  PatientsEntity,
} from 'src/database/postgres/models';
import { BasicRO, DeletedRO, UpdatedRO } from 'src/utils';

export class PatientContactInfoDTO {
  @IsString() @IsOptional() address: string;
  @IsString() @IsOptional() mobile: string;
  @IsString() @IsOptional() city: string;
}

export class PatientsDTO implements PatientsEntity {
  @IsString() id: string;
  @IsString() createdAt: Date;
  @IsString() updatedAt: Date;
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsString() email: string;
  @IsString() gender: string;
  @IsDateString() date_of_birth: Date;

  contact_info: PatientContactInfoDTO;

  @ApiHideProperty() doctor: DoctorsEntity;
  @ApiHideProperty() appointments: AppointmentsEntity[];
}

export class UpdatePatientsDTO extends PatientsDTO {
  @IsString() @IsOptional() first_name: string;
  @IsString() @IsOptional() last_name: string;
  @IsString() @IsOptional() email: string;
  @IsString() @IsOptional() status: string;
  @IsString() @IsOptional() gender: string;
  @IsDateString() @IsOptional() date_of_birth: Date;

  contactInfo: PatientContactInfoDTO;
}

export class IPatient implements PatientsEntity {
  code: string;
  data: PatientsEntity;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  gender: string;
  date_of_birth: Date;
  patient_id: string;
  doctor: DoctorsEntity;
  contact_info: PatientContactInfoDTO;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  appointments: AppointmentsEntity[];
}

export class PatientsGetRO extends BasicRO {
  data: PatientsDTO[];
}

export class PatientGetRO extends BasicRO {
  data: PatientsDTO;
}

export class UpdatePatient extends UpdatedRO {
  data: PatientsDTO;
}

export class DeletePatient extends DeletedRO {}
