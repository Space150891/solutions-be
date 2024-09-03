import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from './baseEntity';
import { UsersEntity } from './user.entity';

@Entity('staff')
export class StaffEntity extends BaseEntity {
  @OneToOne(() => UsersEntity, (user) => user.staff)
  @JoinColumn()
  user: UsersEntity;

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
