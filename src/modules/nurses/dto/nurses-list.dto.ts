import { NursesEntity, PatientsEntity } from '@/database/postgres/models';
import { BasicRO, SortByDTO } from '@/utils';
import { ApiHideProperty } from '@nestjs/swagger';

export class NursesSearchDTO extends SortByDTO implements NursesEntity {
  description: string;
  gender: string;
  rank: string;
  department: string;
  location: string;
  @ApiHideProperty() hire_date: Date;
  @ApiHideProperty() salary: number;
  @ApiHideProperty() years_of_experience: number;
  first_name: string;
  last_name: string;

  @ApiHideProperty() patients: PatientsEntity[];
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // additional properties
  hireDates: { from: Date; to: Date };
  salaryRange: { from: number; to: number };
  experienceRange: { from: number; to: number };
  withDescription: boolean;
}

export class NursesListDataRO implements NursesEntity {
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

export class NursesListsRO extends BasicRO {
  data: NursesListDataRO[];
}
