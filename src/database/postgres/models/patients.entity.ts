import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

import { AppointmentsEntity } from './appointments.entity';
import { BaseEntity } from './baseEntity';
import { DoctorsEntity } from './doctors.entity';
import { PatientMedicalRecordEntity } from './patient-medical-record.entity';

@Entity('patients')
export class PatientsEntity extends BaseEntity {
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

  @OneToOne(() => PatientMedicalRecordEntity)
  medicalRecord: PatientMedicalRecordEntity;
}
