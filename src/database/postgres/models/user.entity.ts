import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';

import { Role } from '../../../auth/guards/roles.decorator';
import { BaseEntity } from './baseEntity';
import { DoctorsEntity } from './doctors.entity';
import { NursesEntity } from './nurses.entity';
import { PatientsEntity } from './patients.entity';
import { StaffEntity } from './staff.entity';

@Unique(['email'])
@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column() email: string;
  @Column() password: string;
  @Column({ type: 'enum', enum: Role }) role: Role;

  @OneToOne(() => PatientsEntity, (user) => user.user)
  @JoinColumn()
  patient: PatientsEntity;

  @OneToOne(() => DoctorsEntity, (user) => user.user)
  @JoinColumn()
  doctor: DoctorsEntity;

  @OneToOne(() => NursesEntity, (user) => user.user)
  @JoinColumn()
  nurse: NursesEntity;

  @OneToOne(() => StaffEntity, (user) => user.user)
  @JoinColumn()
  staff: StaffEntity;
}
