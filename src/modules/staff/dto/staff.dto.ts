import { StaffEntity } from '@/database/postgres/models';
import { BasicRO, DeletedRO, UpdatedRO } from '@/utils';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class StaffDTO implements StaffEntity {
  first_name: string;
  last_name: string;
  description: string;
  gender: string;
  role: string;
  department: string;
  locations: string[];
  hire_date: Date;
  salary: number;
  years_of_experience: number;
  shift: 'Morning' | 'Afternoon' | 'Night';
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class StaffCreateDTO implements StaffEntity {
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsString() @IsOptional() description: string;
  @IsString() gender: string;
  @IsString() role: string;
  @IsString() department: string;
  @IsArray() locations: string[];
  @IsString() hire_date: Date;
  @IsNumber() salary: number;
  @IsNumber() years_of_experience: number;
  @ApiProperty({
    type: 'string',
    enum: ['Morning', 'Afternoon', 'Night'],
  })
  @IsString()
  shift: 'Morning' | 'Afternoon' | 'Night';

  @ApiHideProperty() id: string;
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class StaffUpdateDTO implements Partial<StaffCreateDTO> {
  @IsString() @IsOptional() first_name: string;
  @IsString() @IsOptional() last_name: string;
  @IsString() @IsOptional() description: string;
  @IsString() @IsOptional() gender: string;
  @IsString() @IsOptional() role: string;
  @IsString() @IsOptional() department: string;
  @IsArray() @IsOptional() locations: string[];
  @IsString() @IsOptional() hire_date: Date;
  @IsNumber() @IsOptional() salary: number;
  @IsNumber() @IsOptional() years_of_experience: number;
  @IsString() @IsOptional() shift: 'Morning' | 'Afternoon' | 'Night';

  @ApiHideProperty() id: string;
  @ApiHideProperty() createdAt: Date;
  @ApiHideProperty() updatedAt: Date;
}

export class GetStaffsRO extends BasicRO {
  data: StaffDTO[];
}

export class GetStaffRO extends BasicRO {
  data: StaffDTO;
}

export class CreateStaffRO extends BasicRO {
  data: StaffDTO;
}

export class UpdateStaffRO extends UpdatedRO {
  data: StaffDTO;
}

export class DeleteStaffRO extends DeletedRO {}
