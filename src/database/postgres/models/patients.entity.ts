import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './baseEntity';
import { DoctorsEntity } from './doctors.entity';

@Entity('patients')
export class PatientsEntity extends BaseEntity {
  @Column() first_name: string;
  @Column() last_name: string;
  @Column() email: string;
  @Column() status: string;
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
}
