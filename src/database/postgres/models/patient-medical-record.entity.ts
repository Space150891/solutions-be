import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity, TextTF } from './baseEntity';
import { PatientIllnessEntity } from './patient-illness.entity';
import { PatientsEntity } from './patients.entity';

@Entity('patient-medical-record')
export class PatientMedicalRecordEntity extends BaseEntity {
  @OneToOne(() => PatientsEntity, (patient) => patient.medicalRecord, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  patient: PatientsEntity;

  @Column({ transformer: TextTF }) firstName: string;
  @Column({ transformer: TextTF }) lastName: string;
  @Column({ transformer: TextTF }) dob: string;
  @Column({ transformer: TextTF }) sex: string;
  @Column({ transformer: TextTF }) bloodType: string;
  @Column({ transformer: TextTF }) height: string;
  @Column({ transformer: TextTF }) weight: string;
  @Column({ transformer: TextTF }) address: string;

  @OneToMany(() => PatientIllnessEntity, (illnesses) => illnesses.patientRecord)
  illnesses: PatientIllnessEntity[];
}
