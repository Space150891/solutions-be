import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import {
  AppointmentsEntity,
  DoctorsEntity,
  PatientsEntity,
} from 'src/database/postgres/models';
import { BasicRO, DeletedRO, UpdatedRO } from 'src/utils';

export class PatientAdditionalInfo {
  [x: string]: string;
  @ApiProperty() first_name: string;
  @ApiProperty() last_name: string;
  @ApiProperty() email: string;
  @ApiProperty() phone: string;
}

export class AppointmentsCreateDTO implements AppointmentsEntity {
  @IsDateString() timeFrom: Date;
  @IsDateString() timeTo: Date;
  @IsString() location: string;

  @IsString() @Length(10, 3000) description: string; // long client's description

  @IsUUID('4') doctorId: string;
  @IsOptional() @IsUUID('4') patientId: string;

  // TODO: check if patient is registered flow
  @IsOptional() additional_info: PatientAdditionalInfo;

  @ApiHideProperty() status: string; // defined on back-end 'pending'
  @ApiHideProperty() doctor: DoctorsEntity;
  @ApiHideProperty() patient: PatientsEntity;
  @ApiHideProperty() id: string;
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class AppointmentsUpdateDTO implements Partial<AppointmentsCreateDTO> {
  @IsOptional() @IsDateString() timeFrom: Date;
  @IsOptional() @IsDateString() timeTo: Date;
  @IsOptional() @IsString() location: string;

  @IsOptional() additional_info: PatientAdditionalInfo;

  @IsOptional() @IsString() @Length(10, 3000) description: string; // long client's description

  @ApiProperty({
    required: false,
    default: 'pending',
    description: 'status of appointment',
  })
  @IsOptional()
  status: string;
}

export class AppointmentsCreateRO extends BasicRO {
  data: AppointmentsEntity;
}

export class AppointmentGetRO extends BasicRO {
  data: AppointmentsEntity;
}

export class AppointmentsUpdateRO extends UpdatedRO {
  data: AppointmentsEntity;
}

export class AppointmentsDeleteRO extends DeletedRO {}
