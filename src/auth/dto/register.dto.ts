import { UsersEntity } from '@/database/postgres/models';
import { DoctorCreateDTO } from '@/modules/doctors/dto';
import { NurseCreateDTO } from '@/modules/nurses/dto';
import { PatientsDTO } from '@/modules/patients/dto';
import { StaffCreateDTO } from '@/modules/staff/dto';
import { BasicRO } from '@/utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}

export class RegisterPatientDTO extends RegisterDTO {
  @ApiProperty({ type: PatientsDTO }) patient: PatientsDTO;
}

export class RegisterDoctorDTO extends RegisterDTO {
  @ApiProperty({ type: DoctorCreateDTO }) doctor: DoctorCreateDTO;
}

export class RegisterNurseDTO extends RegisterDTO {
  @ApiProperty({ type: NurseCreateDTO }) nurse: NurseCreateDTO;
}

export class RegisterStaffDTO extends RegisterDTO {
  @ApiProperty({ type: StaffCreateDTO }) staff: StaffCreateDTO;
}

export class TokensDTO {
  @ApiProperty() accessToken: string;
  @ApiProperty() refreshToken: string;
}

export class RegisterRO extends BasicRO {
  @ApiProperty({ type: TokensDTO }) tokens: TokensDTO;
  @ApiProperty({ type: UsersEntity }) data: UsersEntity;
}
