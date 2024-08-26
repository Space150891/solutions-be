import { Column, Entity } from 'typeorm';

import { BaseEntity } from './baseEntity';

@Entity('staff')
export class StaffEntity extends BaseEntity {
  @Column() first_name: string;
  @Column() last_name: string;
  @Column({ default: '' }) description: string;
  @Column() gender: string;
  @Column() role: string;
  @Column() department: string;
  @Column({ type: 'simple-array', default: [] }) locations: string[];
  @Column() hire_date: Date;
  @Column({ type: 'numeric' }) salary: number;
  @Column() years_of_experience: number;
  @Column() shift: 'Morning' | 'Afternoon' | 'Night';
}
