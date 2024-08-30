import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  AppointmentsEntity,
  DoctorsEntity,
  PatientsEntity,
} from 'src/database/postgres/models';
import { BasicRO } from 'src/utils';

export class AppointmentsDTO implements AppointmentsEntity {
  @ApiProperty() additional_info: {
    [key: string]: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  @ApiHideProperty() timeFrom: Date;
  @ApiHideProperty() timeTo: Date;
  location: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  description: string;
  status: string;

  @ApiHideProperty() doctor: DoctorsEntity;
  @ApiHideProperty() patient: PatientsEntity;

  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AppointmentsListDataRO implements AppointmentsEntity {
  @ApiProperty() additional_info: {
    [key: string]: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  @ApiProperty() timeFrom: Date;
  @ApiProperty() timeTo: Date;
  @ApiProperty() location: string;

  @ApiProperty() id: string;
  @ApiProperty() description: string;
  @ApiProperty() status: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;

  @ApiHideProperty() doctor: DoctorsEntity;
  @ApiHideProperty() patient: PatientsEntity;
}

export class AppointmentsListRO extends BasicRO {
  data: AppointmentsListDataRO[];
}
