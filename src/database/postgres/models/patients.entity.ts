import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { AppointmentsEntity } from './appointments.entity';
import { BaseEntity } from './baseEntity';
import { DoctorsEntity } from './doctors.entity';
import { PatientMedicalRecordEntity } from './patient-medical-record.entity';
import { UsersEntity } from './user.entity';

@Entity('patients')
export class PatientsEntity extends BaseEntity {
  @OneToOne(() => UsersEntity, (user) => user.patient)
  @JoinColumn()
  user: UsersEntity;

  @Column() first_name: string;
  @Column() last_name: string;
  @Column() email: string;
  @Column() gender: string;
  @Column() date_of_birth: Date;

  @Column({ type: 'jsonb' }) contact_info: {
    address: string;
    mobile: string;
    city: string;
  };

  @ManyToOne(() => DoctorsEntity, (doctor) => doctor.patients, {
    onDelete: 'SET NULL',
  })
  doctor: DoctorsEntity;

  @ManyToMany(() => AppointmentsEntity, (appointment) => appointment.patient, {
    onDelete: 'SET NULL',
  })
  appointments: AppointmentsEntity[];

  @OneToOne(() => PatientMedicalRecordEntity, (record) => record.patient, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  medicalRecord: PatientMedicalRecordEntity;
}
