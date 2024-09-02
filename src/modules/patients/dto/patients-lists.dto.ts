import {
  AppointmentsEntity,
  DoctorsEntity,
  PatientMedicalRecordEntity,
  PatientsEntity,
  SpecializationsEntity,
} from '@/database/postgres/models';
import { BasicRO, SortByDTO } from '@/utils';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

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
  @ApiHideProperty() appointments: AppointmentsEntity[];
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
  @ApiHideProperty() medicalRecord: PatientMedicalRecordEntity;
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

  @ApiProperty({ type: DoctorPart }) doctor: DoctorPart;
  @ApiHideProperty() appointments: AppointmentsEntity[];
}

export class PatientsListsRO extends BasicRO {
  data: PatientsListsPart[];
}
