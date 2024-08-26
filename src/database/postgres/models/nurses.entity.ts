import { Column, Entity } from 'typeorm';

import { BaseEntity } from './baseEntity';

@Entity('nurses')
export class NursesEntity extends BaseEntity {
  @Column() first_name: string;
  @Column() last_name: string;
  @Column({ default: '' }) description: string;
  @Column() gender: string;
  @Column() rank: string;
  @Column() department: string;
  @Column() location: string;
  @Column() hire_date: Date;
  @Column({ type: 'numeric' }) salary: number;
  @Column() years_of_experience: number;
}
