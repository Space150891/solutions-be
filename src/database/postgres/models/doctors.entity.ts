import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AppointmentsEntity } from './appointments.entity';
import { BaseEntity } from './baseEntity';
import { PatientIllnessEntity } from './patient-illness.entity';
import { PatientsEntity } from './patients.entity';
import { SpecializationsEntity } from './specializations.entity';
import { UsersEntity } from './user.entity';

@Entity('doctors')
export class DoctorsEntity extends BaseEntity {
  @OneToOne(() => UsersEntity, (user) => user.doctor)
  @JoinColumn()
  user: UsersEntity;

  @Column() first_name: string;
  @Column() last_name: string;
  @Column({ default: '' }) description: string;

  @ManyToOne(
    () => SpecializationsEntity,
    (specializations) => specializations.doctors,
  )
  specialization: SpecializationsEntity;

  @OneToMany(() => PatientsEntity, (patient) => patient.doctor, {
    onDelete: 'SET NULL',
  })
  patients: PatientsEntity[];

  @OneToMany(() => AppointmentsEntity, (appointment) => appointment.doctor)
  appointments: AppointmentsEntity[];

  @OneToMany(() => PatientIllnessEntity, (illness) => illness.doctor)
  illnesses: PatientIllnessEntity[];
}
