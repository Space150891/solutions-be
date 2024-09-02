import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { CryptoService } from '../../../crypto/services';
import { BaseEntity } from './baseEntity';
import { PatientIllnessEntity } from './patient-illness.entity';
import { PatientsEntity } from './patients.entity';

@Entity('patient-medical-record')
export class PatientMedicalRecordEntity extends BaseEntity {
  @OneToOne(() => PatientsEntity) @JoinColumn() patient: PatientsEntity;

  @Column() firstName: string;
  @Column() lastName: string;
  @Column() dob: string;
  @Column() sex: string;
  @Column() bloodType: string;
  @Column() height: string;
  @Column() weight: string;
  @Column() address: string;

  private cryptoService = new CryptoService();

  @OneToMany(() => PatientIllnessEntity, (illnesses) => illnesses.patient)
  illnesses: PatientIllnessEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  encryptData() {
    this.firstName = this.cryptoService.encrypt(this.firstName);
    this.lastName = this.cryptoService.encrypt(this.lastName);
    this.dob = this.cryptoService.encrypt(this.dob);
    this.sex = this.cryptoService.encrypt(this.sex);
    this.bloodType = this.cryptoService.encrypt(this.bloodType);
    this.height = this.cryptoService.encrypt(this.height);
    this.weight = this.cryptoService.encrypt(this.weight);
    this.address = this.cryptoService.encrypt(this.address);
  }

  decryptData() {
    this.firstName = this.cryptoService.decrypt(this.firstName);
    this.lastName = this.cryptoService.decrypt(this.lastName);
    this.dob = this.cryptoService.decrypt(this.dob);
    this.sex = this.cryptoService.decrypt(this.sex);
    this.bloodType = this.cryptoService.decrypt(this.bloodType);
    this.height = this.cryptoService.decrypt(this.height);
    this.weight = this.cryptoService.decrypt(this.weight);
    this.address = this.cryptoService.decrypt(this.address);
  }
}
