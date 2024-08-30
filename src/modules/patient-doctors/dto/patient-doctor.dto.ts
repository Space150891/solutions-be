import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import {
  AppointmentsEntity,
  PatientsEntity,
} from 'src/database/postgres/models';
import { DoctorsDTO } from 'src/modules/doctors/dto';
import { PatientContactInfoDTO } from 'src/modules/patients/dto';
import { BasicRO } from 'src/utils';

export class ISPatientHasDoctorRO extends BasicRO {
  data: { isPatientHasDoctor: boolean };
}

export class DoctorsPatientsIdsRO extends BasicRO {
  data: { patientIds: string[] };
}

export class PatientWithDoctor implements PatientsEntity {
  @ApiHideProperty() appointments: AppointmentsEntity[];
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  date_of_birth: Date;
  contact_info: PatientContactInfoDTO;

  id: string;
  createdAt: Date;
  updatedAt: Date;

  doctor: DoctorsDTO;
}

export class AssignDoctorToPatientDTO {
  @IsUUID() doctorId: string;
  @IsUUID() patientId: string;
  @IsBoolean() @IsOptional() isReplaceDoctor: boolean;
}

export class AssignDoctorToPatientRO extends BasicRO {
  data: {
    result: boolean;
    patientWithDoctor: PatientWithDoctor;
  };
}
