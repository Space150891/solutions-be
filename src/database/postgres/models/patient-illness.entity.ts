import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity, TextTF } from './baseEntity';
import { DoctorsEntity } from './doctors.entity';
import { PatientMedicalRecordEntity } from './patient-medical-record.entity';

@Entity('patient-illness')
export class PatientIllnessEntity extends BaseEntity {
  @Column({ transformer: TextTF }) illness: string;
  @Column({ transformer: TextTF }) diagnosis: string;
  @Column({ transformer: TextTF }) treatment: string;
  @Column({ transformer: TextTF }) prescription: string;
  @Column({ transformer: TextTF }) date: string;

  @ManyToOne(() => PatientMedicalRecordEntity, (illness) => illness.illnesses)
  patientRecord: PatientMedicalRecordEntity;

  @ManyToOne(() => DoctorsEntity, (doctor) => doctor.illnesses)
  doctor: DoctorsEntity;
}
