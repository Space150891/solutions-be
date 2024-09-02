import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { CryptoService } from '../../../crypto/services';
import { BaseEntity } from './baseEntity';
import { PatientMedicalRecordEntity } from './patient-medical-record.entity';

@Entity('patient-illness')
export class PatientIllnessEntity extends BaseEntity {
  private cryptoService = new CryptoService();

  @Column() illness: string;
  @Column() diagnosis: string;
  @Column() treatment: string;
  @Column() prescription: string;
  @Column() date: string;

  @OneToMany(() => PatientMedicalRecordEntity, (illness) => illness.patient)
  patient: PatientMedicalRecordEntity;

  @BeforeInsert()
  @BeforeUpdate()
  encryptData() {
    this.illness = this.cryptoService.encrypt(this.illness);
    this.diagnosis = this.cryptoService.encrypt(this.diagnosis);
    this.treatment = this.cryptoService.encrypt(this.treatment);
    this.prescription = this.cryptoService.encrypt(this.prescription);
    this.date = this.cryptoService.encrypt(this.date);
  }

  decryptData() {
    this.illness = this.cryptoService.decrypt(this.illness);
    this.diagnosis = this.cryptoService.decrypt(this.diagnosis);
    this.treatment = this.cryptoService.decrypt(this.treatment);
    this.prescription = this.cryptoService.decrypt(this.prescription);
    this.date = this.cryptoService.decrypt(this.date);
  }
}
