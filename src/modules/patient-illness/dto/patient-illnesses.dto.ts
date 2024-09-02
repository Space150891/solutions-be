import { BasicRO, DeletedRO, UpdatedRO } from '@/utils';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import {
  PatientIllnessEntity,
  PatientMedicalRecordEntity,
} from '../../../database/postgres/models';

export class PatientIllnessesDTO extends PatientIllnessEntity {
  illness: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  date: string;
  @ApiHideProperty() patientRecord: PatientMedicalRecordEntity;
  @ApiHideProperty() id: string;
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class PatientIllnessesCreateDTO extends PatientIllnessesDTO {
  @IsString() illness: string;
  @IsString() diagnosis: string;
  @IsString() treatment: string;
  @IsString() prescription: string;
  date: string; // '2021-01-01'

  @ApiHideProperty() patient: PatientMedicalRecordEntity;
  @ApiHideProperty() id: string;
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class PatientIllnessesUpdateDTO extends PatientIllnessesCreateDTO {
  @IsString() @IsOptional() illness: string;
  @IsString() @IsOptional() diagnosis: string;
  @IsString() @IsOptional() treatment: string;
  @IsString() @IsOptional() prescription: string;
}

export class PatientIllnessesListRO extends BasicRO {
  data: PatientIllnessesDTO[];
  total: number;
}

export class PatientIllnessesOneRO extends BasicRO {
  data: PatientIllnessesDTO;
}

export class PatientIllnessesCreateRO extends BasicRO {
  data: PatientIllnessesDTO;
}

export class PatientIllnessesUpdateRO extends UpdatedRO {
  data: PatientIllnessesDTO;
}

export class PatientIllnessesDeleteRO extends DeletedRO {}
