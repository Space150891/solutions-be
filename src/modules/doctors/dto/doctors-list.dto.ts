import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  DoctorsEntity,
  PatientsEntity,
  SpecializationsEntity,
} from 'src/database/postgres/models';
import { BasicRO, SortByDTO } from 'src/utils';

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

  withDescription: boolean;
}

export class DoctorsListDataRO implements DoctorsEntity {
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
