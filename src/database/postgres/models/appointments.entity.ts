import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './baseEntity';
import { DoctorsEntity } from './doctors.entity';
import { PatientsEntity } from './patients.entity';

@Entity('appointments')
export class AppointmentsEntity extends BaseEntity {
  @Column({ type: 'timestamp' }) timeFrom: Date;
  @Column({ type: 'timestamp' }) timeTo: Date;

  // TODO: add locations and attach to doctor
  @Column() location: string;

  // In case if patient is not registered
  @Column({ type: 'jsonb', default: {} }) additional_info: {
    [key: string]: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  @Column() description: string;
  @Column({ default: 'pending' }) status: string;

  @ManyToOne(() => DoctorsEntity, (doctor) => doctor.appointments)
  doctor: DoctorsEntity;

  @ManyToOne(() => PatientsEntity, (patient) => patient.appointments)
  patient: PatientsEntity;
}
