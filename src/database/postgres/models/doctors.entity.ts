import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './baseEntity';
import { PatientsEntity } from './patients.entity';
import { SpecializationsEntity } from './specializations.entity';
import { AppointmentsEntity } from './appointments.entity';

@Entity('doctors')
export class DoctorsEntity extends BaseEntity {
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
}
