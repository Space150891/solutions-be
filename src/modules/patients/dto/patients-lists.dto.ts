import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  DoctorsEntity,
  PatientsEntity,
  SpecializationsEntity,
} from 'src/database/postgres/models';
import { BasicRO, SortByDTO } from 'src/utils';

export class SpecializationDTO implements SpecializationsEntity {
  @ApiProperty({ type: 'string' }) id: string;
  @ApiProperty({ type: 'string' }) specialization: string;

  @ApiHideProperty() doctors: DoctorsEntity[];
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class DoctorPart implements DoctorsEntity {
  @ApiProperty() id: string;
  @ApiProperty() first_name: string;
  @ApiProperty() last_name: string;
  @ApiProperty() description: string;
  @ApiProperty({ type: SpecializationDTO }) specialization: SpecializationDTO;

  @ApiHideProperty() patients: PatientsEntity[];
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class PatientsListsDTO
  extends SortByDTO
  implements Partial<PatientsEntity>
{
  first_name: string;
  last_name: string;
  status: string;
  gender: string;

  @ApiProperty({ example: { from: Date, to: Date } })
  born: { from: Date; to: Date };

  @ApiProperty({ type: DoctorPart }) doctor: DoctorPart;
}

export class PatientsListsPart implements PatientsEntity {
  @ApiProperty() id: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() email: string;
  @ApiProperty() gender: string;
  @ApiProperty() date_of_birth: Date;
  @ApiProperty() contact_info: {
    address: string;
    mobile: string;
    city: string;
  };
  @ApiProperty() first_name: string;
  @ApiProperty() last_name: string;
  @ApiProperty() status: string;

  @ApiProperty({ type: DoctorPart }) doctor: DoctorPart;
}

export class PatientsListsRO extends BasicRO {
  data: PatientsListsPart[];
}
