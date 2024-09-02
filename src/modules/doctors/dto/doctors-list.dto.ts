import {
  AppointmentsEntity,
  DoctorsEntity,
  PatientIllnessEntity,
  PatientsEntity,
  SpecializationsEntity,
} from '@/database/postgres/models';
import { BasicRO, SortByDTO } from '@/utils';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class SpecializationDTO implements SpecializationsEntity {
  @ApiProperty() id: string;
  @ApiProperty() specialization: string;

  @ApiHideProperty() doctors: DoctorsEntity[];
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class DoctorsWithSpecializationDTO extends SortByDTO {}

export class DoctorsSearchDTO
  extends DoctorsWithSpecializationDTO
  implements DoctorsEntity
{
  @ApiHideProperty() illnesses: PatientIllnessEntity[];
  first_name: string;
  last_name: string;
  description: string;
  email: string;
  status: string;

  @ApiProperty({ type: SpecializationDTO }) specialization: SpecializationDTO;

  @ApiHideProperty() patients: PatientsEntity[];
  @ApiHideProperty() id: string;
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;

  @ApiHideProperty() appointments: AppointmentsEntity[];

  withDescription: boolean;
}

export class DoctorsListDataRO implements DoctorsEntity {
  @ApiHideProperty() illnesses: PatientIllnessEntity[];
  @ApiHideProperty() appointments: AppointmentsEntity[];
  specialization: SpecializationDTO;
  @ApiHideProperty() patients: PatientsEntity[];

  id: string;
  createdAt: Date;
  updatedAt: Date;
  first_name: string;
  last_name: string;
  description: string;
}

export class DoctorsListsRO extends BasicRO {
  data: DoctorsListDataRO[];
}
