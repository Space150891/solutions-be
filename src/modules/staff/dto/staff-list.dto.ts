import { ApiHideProperty } from '@nestjs/swagger';
import { StaffEntity } from 'src/database/postgres/models';
import { BasicRO, SortByDTO } from 'src/utils';

export class StaffSearchDTO extends SortByDTO implements StaffEntity {
  first_name: string;
  last_name: string;
  description: string;
  gender: string;
  role: string;
  department: string;
  @ApiHideProperty() locations: string[];
  @ApiHideProperty() hire_date: Date;
  @ApiHideProperty() salary: number;
  @ApiHideProperty() years_of_experience: number;
  shift: 'Morning' | 'Afternoon' | 'Night';
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // additional properties
  hireDates: { from: Date; to: Date };
  salaryRange: { from: number; to: number };
  experienceRange: { from: number; to: number };
  withDescription: boolean;
  location: string;
}

export class StaffListDataRO implements StaffEntity {
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

export class StaffListsRO extends BasicRO {
  data: StaffListDataRO[];
}
