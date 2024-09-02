import { BasicRO, DeletedRO, UpdatedRO } from '@/utils';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import {
  PatientIllnessEntity,
  PatientMedicalRecordEntity,
  PatientsEntity,
} from '../../../database/postgres/models';

export class PatientMedicalRecordDTO extends PatientMedicalRecordEntity {
  firstName: string;
  lastName: string;
  dob: string;
  sex: string;
  bloodType: string;
  height: string;
  weight: string;
  address: string;

  id: string;
  createdAt: Date;
  updatedAt: Date;

  @ApiHideProperty() patient: PatientsEntity;
  @ApiHideProperty() illnesses: PatientIllnessEntity[];
}

export class PatientMedicalRecordCreateDTO
  implements Partial<PatientMedicalRecordDTO>
{
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsString() dob: string;
  @IsString() sex: string;
  @IsString() bloodType: string;
  @IsString() height: string;
  @IsString() weight: string;
  @IsString() address: string;
}

export class PatientMedicalRecordUpdateDTO extends PatientMedicalRecordCreateDTO {
  @IsOptional() @IsString() firstName: string;
  @IsOptional() @IsString() lastName: string;
  @IsOptional() @IsString() dob: string;
  @IsOptional() @IsString() sex: string;
  @IsOptional() @IsString() bloodType: string;
  @IsOptional() @IsString() height: string;
  @IsOptional() @IsString() weight: string;
  @IsOptional() @IsString() address: string;
}

export class PatientMedicalRecordListRO extends BasicRO {
  data: PatientMedicalRecordDTO[];
  count: number;
}

export class PatientMedicalRecordRO extends BasicRO {
  data: PatientMedicalRecordDTO;
}

export class PatientMedicalRecordOneRO extends BasicRO {
  data: PatientMedicalRecordDTO;
}

export class PatientMedicalRecordCreateRO extends BasicRO {
  data: PatientMedicalRecordDTO;
}

export class PatientMedicalRecordUpdateRO extends UpdatedRO {
  data: PatientMedicalRecordDTO;
}

export class PatientMedicalRecordDeleteRO extends DeletedRO {}
