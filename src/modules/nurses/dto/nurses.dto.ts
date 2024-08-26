import { ApiHideProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { NursesEntity } from 'src/database/postgres/models';
import { BasicRO, DeletedRO, UpdatedRO } from 'src/utils';

export class NursesDTO implements NursesEntity {
  gender: string;
  rank: string;
  department: string;
  location: string;
  hire_date: Date;
  salary: number;
  years_of_experience: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  first_name: string;
  last_name: string;
  description: string;
}

export class NurseCreateDTO implements NursesEntity {
  @IsString() gender: string;
  @IsString() rank: string;
  @IsString() department: string;
  @IsString() location: string;
  @IsDateString() hire_date: Date;
  @IsNumber() salary: number;
  @IsNumber() years_of_experience: number;

  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsString() @IsOptional() description: string;

  @ApiHideProperty() id: string;
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class NurseUpdateDTO implements Partial<NurseCreateDTO> {}

export class GetNursesRO extends BasicRO {
  data: NursesDTO[];
}

export class GetNurseRO extends BasicRO {
  data: NursesDTO;
}

export class CreateNurseRO extends BasicRO {
  data: NursesDTO;
}

export class UpdateNurseRO extends UpdatedRO {
  data: NursesDTO;
}

export class DeleteNurseRO extends DeletedRO {}
